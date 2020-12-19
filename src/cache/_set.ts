export default <T>(
  cache: Map<string, T>,
  key: string,
  value: T,
) => cache.set(key, value);
