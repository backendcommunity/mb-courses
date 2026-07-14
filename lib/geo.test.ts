import { describe, it, expect } from "vitest";
import { isAfrican } from "./geo";

describe("isAfrican", () => {
  it("returns true for African country codes", () => {
    expect(isAfrican("NG")).toBe(true);
    expect(isAfrican("KE")).toBe(true);
  });
  it("is case-insensitive", () => {
    expect(isAfrican("ng")).toBe(true);
  });
  it("returns false for non-African codes", () => {
    expect(isAfrican("US")).toBe(false);
    expect(isAfrican("GB")).toBe(false);
  });
  it("returns false for undefined", () => {
    expect(isAfrican(undefined)).toBe(false);
  });
});
