import { describe, it, expect } from "vitest";
import { isAffizyReady, readReferralCode, type AffizyWindow } from "./affizy-ready";

describe("isAffizyReady", () => {
  it("false when Affizy is missing", () => {
    expect(isAffizyReady({} as AffizyWindow)).toBe(false);
  });
  it("false when Affizy exists but getReferral is not a function", () => {
    expect(isAffizyReady({ Affizy: {} } as AffizyWindow)).toBe(false);
  });
  it("true when getReferral is a function", () => {
    expect(isAffizyReady({ Affizy: { getReferral: () => "X" } } as AffizyWindow)).toBe(true);
  });
});

describe("readReferralCode", () => {
  it("returns the code when ready", () => {
    expect(readReferralCode({ Affizy: { getReferral: () => "ABC" } } as AffizyWindow)).toBe("ABC");
  });
  it("returns empty string when not ready", () => {
    expect(readReferralCode({} as AffizyWindow)).toBe("");
  });
  it("returns empty string when getReferral itself returns falsy", () => {
    expect(readReferralCode({ Affizy: { getReferral: () => "" } } as AffizyWindow)).toBe("");
  });
});
