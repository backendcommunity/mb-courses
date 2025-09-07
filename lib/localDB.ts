import { dataStore } from "./data";

const isBrowser = typeof window !== "undefined";
// const user = dataStore.user;
const PREFIX = `mb_`;

export const localDB = {
  set<T>(key: string, value: T): void {
    if (!isBrowser) return;
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(`${PREFIX}${key}`, stringValue);
    } catch (err) {
      console.error(
        `Error setting item [${PREFIX}${key}] in localStorage`,
        err
      );
    }
  },

  get<T>(key: string, defaultValue: T): T {
    if (!isBrowser) return defaultValue;
    try {
      const value = localStorage.getItem(`${PREFIX}${key}`);
      if (value === null) return defaultValue;
      return JSON.parse(value) as T;
    } catch (err) {
      console.error(
        `Error parsing item [${PREFIX}${key}] from localStorage`,
        err
      );
      return defaultValue;
    }
  },

  remove(key: string): void {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(`${PREFIX}${key}`);
    } catch (err) {
      console.error(
        `Error removing item [${PREFIX}${key}] from localStorage`,
        err
      );
    }
  },

  clear(): void {
    if (!isBrowser) return;
    try {
      const keysToRemove: string[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(PREFIX)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => this.remove(key));
    } catch (err) {
      console.error("Error clearing localStorage", err);
    }
  },

  has(key: string): boolean {
    if (!isBrowser) return false;
    return localStorage.getItem(`${PREFIX}${key}`) !== null;
  },

  update<T>(key: string, data: T): void {
    if (!this.has(`${PREFIX}${key}`)) {
      this.set(key, data);
      return;
    }

    this.remove(`${PREFIX}${key}`);
    this.set(key, data);
  },
};
