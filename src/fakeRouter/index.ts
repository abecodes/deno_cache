import { ICache } from "../cache/cache.d.ts";

const realSlowDatabaseCall = (): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve("Hello World"), 5000));

export default (cache: ICache<string>) =>
  new Promise((resolve) => {
    const result = cache.get("realSlowDatabaseCall");

    if (result) return resolve(result);

    realSlowDatabaseCall().then((result) => {
      cache.set("realSlowDatabaseCall", result);
      resolve(result);
    });
  });
