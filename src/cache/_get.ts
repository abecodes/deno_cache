export default <T>(cache: Map<string, T>, key: string) => cache.get(key);
