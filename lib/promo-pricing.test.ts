import { describe, it, expect } from "vitest";
import { getPromoPricing } from "./promo-pricing";

describe("getPromoPricing", () => {
  it("Naira, no referral: 150k -> 100k, 33% off", () => {
    const r = getPromoPricing({ isNaira: true, hasReferral: false, usdPromoPrice: 99.99 });
    expect(r.currencySymbol).toBe("₦");
    expect(r.regular).toBe("₦150,000");
    expect(r.discounted).toBe("100,000");
    expect(r.savingsLabel).toBe("Save 33%");
  });

  it("Naira, with referral: 150k -> 50k, 67% off", () => {
    const r = getPromoPricing({ isNaira: true, hasReferral: true, usdPromoPrice: 99.99 });
    expect(r.discounted).toBe("50,000");
    expect(r.savingsLabel).toBe("Save 67%");
  });

  it("USD uses the usdPromoPrice input, ignores hasReferral", () => {
    const r = getPromoPricing({ isNaira: false, hasReferral: true, usdPromoPrice: 99.99 });
    expect(r.currencySymbol).toBe("$");
    expect(r.regular).toBe("$150");
    expect(r.discounted).toBe("99.99");
    expect(r.savingsLabel).toBe("Save 33%");
  });

  it("USD formats to 2 decimal places", () => {
    const r = getPromoPricing({ isNaira: false, hasReferral: false, usdPromoPrice: 75 });
    expect(r.discounted).toBe("75.00");
    expect(r.savingsLabel).toBe("Save 50%");
  });
});
