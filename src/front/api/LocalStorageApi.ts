export default class LocalStorageApi {
  private storage;
  constructor() {
    this.storage =
      typeof window === 'undefined'
        ? {
            setItem: () => void 0,
            getItem: () => void 0,
            removeItem: () => void 0,
          }
        : localStorage;
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  get(key: string): string | null {
    const result = this.storage.getItem(key);
    return result === 'undefined' ? undefined : result;
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }
}
