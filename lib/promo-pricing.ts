export interface PromoPricingInput {
  isNaira: boolean;
  hasReferral: boolean;
  usdPromoPrice: number;
}

export interface PromoPricingDisplay {
  currencySymbol: string;
  regular: string;
  discounted: string;
  savingsLabel: string;
}

const NAIRA_REGULAR = 150_000;
const NAIRA_DISCOUNTED_NO_REFERRAL = 100_000;
const NAIRA_DISCOUNTED_WITH_REFERRAL = 50_000;
const USD_REGULAR = 150;

function savingsLabel(regular: number, discounted: number): string {
  const pct = Math.round((1 - discounted / regular) * 100);
  return `Save ${pct}%`;
}

export function getPromoPricing({
  isNaira,
  hasReferral,
  usdPromoPrice,
}: PromoPricingInput): PromoPricingDisplay {
  if (isNaira) {
    const discountedAmount = hasReferral
      ? NAIRA_DISCOUNTED_WITH_REFERRAL
      : NAIRA_DISCOUNTED_NO_REFERRAL;
    return {
      currencySymbol: "₦",
      regular: `₦${NAIRA_REGULAR.toLocaleString()}`,
      discounted: discountedAmount.toLocaleString(),
      savingsLabel: savingsLabel(NAIRA_REGULAR, discountedAmount),
    };
  }

  return {
    currencySymbol: "$",
    regular: `$${USD_REGULAR}`,
    discounted: usdPromoPrice.toFixed(2),
    savingsLabel: savingsLabel(USD_REGULAR, usdPromoPrice),
  };
}
