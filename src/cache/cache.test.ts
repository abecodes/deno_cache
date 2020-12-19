import {
  assert,
  assertEquals,
  assertMatch,
  assertNotEquals,
  assertThrows,
  equal,
  unimplemented,
  unreachable,
} from "../deps.ts";

import cache from "./index.ts";
import * as types from "./cache.d.ts";

Deno.test("Test initialization", () => {
  const CACHE = cache<string>();

  assertEquals(
    CACHE.get("no_valid_entry"),
    undefined,
    "Invalid key request should return undefined",
  );
  CACHE.stop();
});

Deno.test("Test Set Cache Entry", async () => {
  const CACHE = cache<string>();

  CACHE.set("Hello", "World");
  assertEquals(
    CACHE.get("Hello"),
    "World",
    "Should return world",
  );
  CACHE.stop();
});

Deno.test("Test TTL", async () => {
  const CACHE = cache<string>(200);

  CACHE.set("Hello", "World");

  await new Promise((resolve) => setTimeout(resolve, 500));
  assertEquals(
    CACHE.get("Hello"),
    undefined,
    "Should return world",
  );
  CACHE.stop();
});
