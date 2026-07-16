import { describe, it, expect } from "vitest";
import { MIN_CREDIBLE_LEARNERS, isCredibleLearnerCount, formatLearnerCount } from "./social-proof";

describe("isCredibleLearnerCount", () => {
  it("false below threshold", () => {
    expect(isCredibleLearnerCount(MIN_CREDIBLE_LEARNERS - 1)).toBe(false);
    expect(isCredibleLearnerCount(0)).toBe(false);
  });
  it("true at or above threshold", () => {
    expect(isCredibleLearnerCount(MIN_CREDIBLE_LEARNERS)).toBe(true);
    expect(isCredibleLearnerCount(2400)).toBe(true);
  });
});

describe("formatLearnerCount", () => {
  it("adds thousands separators and a plus sign", () => {
    expect(formatLearnerCount(2400)).toBe("2,400+");
    expect(formatLearnerCount(150)).toBe("150+");
  });
});
