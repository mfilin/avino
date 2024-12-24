class XJSON {
  keys = {
    [undefined as any]: null,
  };

  undefineValue = null;

  constructor(undefineValue = null) {
    this.undefineValue = undefineValue;
    this.keys['undefined'] = undefineValue;
  }

  stringify(val) {
    return JSON.stringify(val, this.parser.bind(this));
  }

  copy(input) {
    return JSON.parse(this.stringify(input));
  }

  parser(key, val) {
    return this.getVal(val);
  }

  getVal(val) {
    const out = {
      [this.undefineValue]: this.undefineValue,
      [undefined as any]: val,
    };
    return out[this.keys[val]];
  }
}

class TheNumber {
  val = 0;
  min = 0;
  max = 0;

  constructor() {
    Object.defineProperty(this, Symbol.toPrimitive, {
      get() {
        return () => Number(this.val);
      },
    });
  }

  setIfMin(num) {
    this.min = Math.min(this.min, num);
  }

  setIfMax(num) {
    this.max = Math.max(this.max, num);
    // const a = this.val;
    // const b = num;
    // const c = a - b;
    // const k = (c >> 31) & 0x1;
    // this.max = a - k * c;
  }

  set(value) {
    this.setIfMin(value);
    this.setIfMax(value);
    this.val = value;
    return this;
  }

  increment(count = 1) {
    const nextVal = this.val + count;
    this.setIfMin(nextVal);
    this.setIfMax(nextVal);
    this.val = nextVal;
    return this;
  }

  toString() {
    return `${this.val}`;
  }

  toJSON() {
    return this.val;
  }

  valueOf() {
    return this.val;
  }
}

class TheIndexer {
  index = {};
  handlers = {};

  constructor(defaultHandler, valBuilder) {
    this.handlers[undefined as any] = (val) => {
      this.index[val] = val;
      const getter = defaultHandler(val, valBuilder);
      this.handlers[val] = (val) => {
        return getter(val);
      };
      const res = getter(val);
      return res;
    };
  }

  forKey(key) {
    return this.handlers[this.index[key]](key);
  }
}

class ValCheck {
  noval = {
    [undefined as any]: 'noval',
  };
  withval = {
    noval: 'noval',
    [undefined as any]: 'withval',
  };

  check(val) {
    return this.withval[this.noval[val]];
  }
}

class ProxyStruct {
  constructor(parent?: any, parentKey?: string) {
    const thisIndex = {
      [Symbol.toPrimitive]: Symbol.toPrimitive,
      toString: 'toString',
      toJSON: 'toJSON',
      valueOf: 'valueOf',
      asArray: 'asArray',
      asNumber: 'asNumber',
    };

    const UNDEFINED = '@__undefined';

    const setters = {
      [UNDEFINED]: (target, index, val, receiver) => {
        target[undefined as any] = val;
      },
      undefined: (target, index, val, receiver) => {
        target[index] = val;
      },
    };
    const setterKeys = {
      [UNDEFINED]: UNDEFINED,
      toJSON: 'undefined',
      toString: 'undefined',
      valueOf: 'undefined',
      asArray: 'undefined',
      asNumber: 'undefined',
      [undefined as any]: 'undefined',
    };
    const getters = {
      [UNDEFINED]: (target, index) => {
        return target[undefined as any];
      },
      undefined: (target, index) => {
        return target[index];
      },
    };

    const shadow = {};
    const shadowProxy = new Proxy(shadow, {
      set(target, index, val, receiver) {
        setters[setterKeys[index]](target, index, val, receiver);
        return true;
      },
      get(target, index) {
        return getters[setterKeys[index]](target, index);
      },
    });

    const indexerConstructor = (val, valBuilder) => {
      shadowProxy[val] = valBuilder();
      thisIndex[val] = val;

      if (parent) {
        parent[parentKey][val] = shadowProxy[val];
      }

      const getter = (val) => {
        return shadowProxy[val];
      };
      setup[val] = getter;
      return getter;
    };

    const numbersIndexer = new TheIndexer(
      indexerConstructor,
      () => new TheNumber(),
    );
    const arraysIndexer = new TheIndexer(indexerConstructor, () => []);
    const xjs = new XJSON();

    const setup = {
      toString: () => {
        return () => {
          return xjs.stringify(shadow);
        };
      },
      toJSON: () => {
        return () => {
          return xjs.copy(shadow);
        };
      },
      valueOf: () => {
        return () => {
          return xjs.copy(shadow);
        };
      },
      [Symbol.toPrimitive]: () => {
        return (hint) => {
          switch (hint) {
            case 'string':
              return xjs.stringify(shadow);
          }

          return { ...shadow };
        };
      },
      asNumber: (key) => {
        return (val) => {
          return numbersIndexer.forKey(val);
        };
      },
      asArray: (key) => {
        return (val) => {
          return arraysIndexer.forKey(val);
        };
      },
    };

    const setupUndefinedPropWithVal = (val) => {
      const nextStruct = new ProxyStruct(shadowProxy, val);
      thisIndex[val] = val;

      shadowProxy[val] = {};

      if (parent) {
        parent[parentKey] = shadowProxy;
      }

      setup[val] = (val) => {
        return nextStruct;
      };

      return setup[val](val);
    };

    const valDepend = {
      withval: (val) => setupUndefinedPropWithVal(val),
      noval: (val) => {
        return setupUndefinedPropWithVal(UNDEFINED);
      },
    };

    const vc = new ValCheck();

    Object.defineProperty(setup, 'undefined', {
      get: () => {
        return (val) => {
          return valDepend[vc.check(val)](val);
        };
      },
      set: (val) => {
        setup[UNDEFINED] = val;
        return true;
      },
    });

    return new Proxy(this, {
      get(target, index) {
        const selector = {
          [index]: index,
          [undefined as any]: UNDEFINED,
        };
        const indexStr = selector[index as any];
        return setup[thisIndex[indexStr]](indexStr);
      },
      set(target, index, val, receiver) {
        const indexStr = index;
        shadowProxy[indexStr] = val;
        parent[parentKey][indexStr] = val;
        setup[thisIndex[indexStr]][indexStr] = val;
        return true;
      },
      ownKeys(target) {
        return Object.keys(shadow);
      },
      getOwnPropertyDescriptor(target, prop) {
        return {
          configurable: true,
          enumerable: true,
        };
      },
    });
  }
}

export default ProxyStruct;
