import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Node (22+) ships its own experimental `globalThis.localStorage` getter,
// which shadows jsdom's working implementation: vitest's environment only
// copies window properties that are absent from `global` OR already on its
// hardcoded allowlist, and "localStorage" predates that Node global so it's
// not on the list. Without this, `localStorage` is `undefined` in every
// test (see https://github.com/vitest-dev/vitest/issues — Node global
// storage vs jsdom). Polyfill it with a tiny in-memory Storage so code
// under test (and tests themselves) can use localStorage normally.
if (typeof localStorage === "undefined" || typeof localStorage?.setItem !== "function") {
  class MemoryStorage implements Storage {
    private store = new Map<string, string>();
    get length() {
      return this.store.size;
    }
    clear() {
      this.store.clear();
    }
    getItem(key: string) {
      return this.store.has(key) ? this.store.get(key)! : null;
    }
    key(index: number) {
      return Array.from(this.store.keys())[index] ?? null;
    }
    removeItem(key: string) {
      this.store.delete(key);
    }
    setItem(key: string, value: string) {
      this.store.set(key, String(value));
    }
  }
  Object.defineProperty(globalThis, "localStorage", {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
}

afterEach(() => {
  cleanup();
});
