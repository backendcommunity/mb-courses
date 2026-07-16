// components/hero-price.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useReferralCode } from "@/components/use-referral-code";
import { getPromoPricing } from "@/lib/promo-pricing";
import { isAfrican } from "@/lib/geo";

export function HeroPrice({ detectedCountry }: { detectedCountry?: string }) {
  const searchParams = useSearchParams();
  const effectiveCountry = searchParams.get("country") || detectedCountry;
  const isNaira = isAfrican(effectiveCountry);
  const usdPromoPrice = Number(searchParams.get("price") ?? 99.99);

  const { referralCode, ready } = useReferralCode();
  const pricing = getPromoPricing({
    isNaira,
    hasReferral: !!referralCode,
    usdPromoPrice,
  });

  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-slate-500 line-through text-base">{pricing.regular}</span>
        <span className="text-3xl font-extrabold text-white tabular-nums">
          {pricing.currencySymbol}
          {pricing.discounted}
        </span>
        <span className="bg-[#13AECE]/15 border border-[#13AECE]/30 text-[#13AECE] text-[11px] font-bold px-2.5 py-1 rounded-full">
          {pricing.savingsLabel}
        </span>
      </div>
      {ready && referralCode && (
        <p className="text-emerald-400 text-xs mt-2">
          Exclusive partner discount applied — code {referralCode}
        </p>
      )}
    </div>
  );
}
