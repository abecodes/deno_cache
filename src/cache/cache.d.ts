interface ICache<T> {
  set: (key: string, value: T) => void;
  get: (key: string) => T | undefined;
  delete: (key: string) => boolean;
  flush: () => void;
  stop: () => void;
}

interface ICacheEntry<T> {
  value: T;
  _created: number;
}
