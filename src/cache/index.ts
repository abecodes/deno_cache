import _initialize from "./_initialize.ts";
import _set from "./_set.ts";
import _get from "./_get.ts";
import _delete from "./_delete.ts";

export default <T>(ttl: number = 2000): ICache<T> => {
  const CACHE = _initialize<ICacheEntry<T>>();
  let CLEANUP = setInterval(() =>
    CACHE.forEach((entry, key) => {
      if (entry._created + ttl < Date.now()) {
        CACHE.delete(key);
      }
    }), ttl);

  return {
    set: (key: string, value: T) =>
      _set(CACHE, key, { value, _created: Date.now() }),
    get: (key: string) => {
      const result = _get(CACHE, key);
      if (result && result._created + ttl > Date.now()) {
        return result.value;
      }
      return undefined;
    },
    delete: (key: string) => _delete(CACHE, key),
    flush: () => CACHE.clear(),
    stop: () => {
      clearInterval(CLEANUP);
      CACHE.clear();
    },
  };
};
