const OBJECT_TYPE = '[object Object]';
const ARRAY_TYPE = '[object Array]';
const SET_TYPE = '[object Set]';
const MAP_TYPE = '[object Map]';
const STRING_TYPE = '[object String]';

export class QSerialize {
  constructor(
    private joinKey: string = '@',
    private arrayJoinKey: string = '|',
  ) {}

  encode(obj: object) {
    const result = this.flat(obj);

    const res = {};

    for (const key in result) {
      const value = result[key];
      const type = this.typeOf(value);

      switch (type) {
        case SET_TYPE:
          res[key] = Array.from(value).join(this.arrayJoinKey);
          break;
        case ARRAY_TYPE:
          res[key] = value.join(this.arrayJoinKey);
          break;
        default:
          res[key] = String(value);
      }
    }

    return res;
  }

  decode(obj: object) {
    const acc = {};

    for (let key in obj) {
      const value = obj[key]?.replaceAll('[[:and]]', '&');
      this.accumulate(key, value, acc);
    }

    return acc;
  }

  fromQueryString<T = any>(encodedQueryString: string): T {
    const restoredObject = Array.from(
      new URLSearchParams(encodedQueryString).entries(),
    ).reduce((acc, entry) => {
      acc[entry[0]] = entry[1];
      return acc;
    }, {});

    return this.decode(restoredObject) as T;
  }

  private typeOf(obj: object | string | number) {
    return Object.prototype.toString.call(obj);
  }

  private accumulate(key: string, value: string, acc: object) {
    const isArray = key.endsWith('[]');
    const finalValue = Boolean(value) ? value : isArray ? '' : {};
    const val = isArray
      ? (finalValue as string).split(this.arrayJoinKey)
      : finalValue;
    const name = isArray ? key.substr(0, key.length - 2) : key;
    const addr = name.split(this.joinKey).filter(Boolean);
    const maxKey = addr.length - 1;
    let cptr = acc;
    for (let j = 0; j < maxKey; j++) {
      const k = addr[j];
      cptr[k] = cptr[k] || {};
      cptr = cptr[k];
    }

    const topKey = addr[maxKey];

    cptr[topKey] = cptr[topKey] || (isArray ? new Set() : {});

    if (isArray) {
      cptr[topKey] = new Set(
        Array.from(cptr[topKey]).concat(val).filter(Boolean),
      );
    } else {
      cptr[topKey] = finalValue;
    }
  }

  private flat(
    obj: object | string,
    path: string = undefined,
    result = {},
    isArray = false,
  ) {
    const type = this.typeOf(obj);

    switch (type) {
      case OBJECT_TYPE:
        for (const key in obj as object) {
          if (!Object.hasOwnProperty.call(obj, key)) continue;
          const val = obj[key];
          if (val == null) continue;
          this.flat(obj[key], this.join(path, key), result, false);
        }
        break;
      case SET_TYPE:
        Array.from(obj as Array<string>).forEach((key) =>
          this.flat(key, `${path}[]`, result, true),
        );
        break;
      case ARRAY_TYPE:
        (obj as Array<string>).forEach((key) =>
          this.flat(key, `${path}[]`, result, true),
        );
        break;
      default:
        const value = String(obj).replace('&', '[[:and]]');
        if (isArray) {
          result[path] = result[path] || new Set();
          result[path].add(value);
        } else {
          result[path] = value;
        }
    }

    return result;
  }

  private join(path, key) {
    return path != null ? `${path}${this.joinKey}${key}` : key;
  }
}
