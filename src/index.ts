import cache from "./cache/index.ts";
import fakeRouter from "./fakeRouter/index.ts";

// creating a cache instance with default TTL
const tinyCache = cache<string>();

try {
  // Initial request - will not hit cache and therefore be slow
  console.time("runExpensiveRequest");
  const resultRequest = await fakeRouter(tinyCache);
  console.log(resultRequest);
  console.timeEnd("runExpensiveRequest");

  // Cache hit - result is cached
  for (let x = 0; x < 10; x++) {
    console.time("runCachedRequest");
    const resultCache = await fakeRouter(tinyCache);
    console.log(resultCache, x);
    console.timeEnd("runCachedRequest");
  }

  // Waiting for some time to pass
  await new Promise((resolve) => setTimeout(resolve, 6000));

  // Cache miss - entry is over it's TTL
  console.time("runTTLRequest");
  const resultTTL = await fakeRouter(tinyCache);
  console.log(resultTTL);
  console.timeEnd("runTTLRequest");
} catch (error) {
  throw error;
} finally {
  tinyCache.stop();
}
