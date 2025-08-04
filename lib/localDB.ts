// storage.ts

const isBrowser = typeof window !== "undefined";

export const localDB = {
  set<T>(key: string, value: T): void {
    if (!isBrowser) return;
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (err) {
      console.error(`Error setting item [${key}] in localStorage`, err);
    }
  },

  get<T>(key: string, defaultValue: T): T {
    if (!isBrowser) return defaultValue;
    try {
      const value = localStorage.getItem(key);
      if (value === null) return defaultValue;
      return JSON.parse(value) as T;
    } catch (err) {
      console.error(`Error parsing item [${key}] from localStorage`, err);
      return defaultValue;
    }
  },

  remove(key: string): void {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing item [${key}] from localStorage`, err);
    }
  },

  clear(): void {
    if (!isBrowser) return;
    try {
      localStorage.clear();
    } catch (err) {
      console.error("Error clearing localStorage", err);
    }
  },

  has(key: string): boolean {
    if (!isBrowser) return false;
    return localStorage.getItem(key) !== null;
  },
};
