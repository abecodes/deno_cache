export default <T>(cache: Map<string, T>, key: string) => cache.delete(key);
