"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Loader2, Zap } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PricingSectionProps {
  coursePrice?: number | null;
  courseTitle?: string;
  courseAppUrl?: string;
  detectedCountry?: string;
  /** Paddle price ID for the promo offer (international users) */
  paddlePromoId?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SUBSCRIPTION_FEATURES = [
  "Unlimited access to all courses & paths",
  "Every new course added automatically",
  "Community forum & peer support",
  "Project submission & mentor feedback",
  "Certificate on every completion",
  "Cancel anytime — no lock-in",
];

// All African ISO 3166-1 alpha-2 country codes
const AFRICA_CODES = new Set([
  "NG",
  "GH",
  "KE",
  "ZA",
  "ET",
  "EG",
  "TZ",
  "UG",
  "CM",
  "SN",
  "RW",
  "CI",
  "AO",
  "MZ",
  "MG",
  "BF",
  "ML",
  "MW",
  "NE",
  "ZM",
  "TD",
  "SO",
  "ZW",
  "GN",
  "SS",
  "BJ",
  "TN",
  "BI",
  "SL",
  "TG",
  "LY",
  "ER",
  "MR",
  "CF",
  "NA",
  "GM",
  "BW",
  "LS",
  "GW",
  "LR",
  "SZ",
  "DJ",
  "KM",
  "CV",
  "ST",
  "SC",
  "MU",
  "RE",
  "YT",
  "EH",
  "SD",
  "CG",
  "CD",
  "GQ",
  "GA",
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isAfrican(countryCode?: string) {
  return !!countryCode && AFRICA_CODES.has(countryCode.toUpperCase());
}

function pathFeatures(pathName: string) {
  return [
    `Lifetime access to ${pathName}`,
    "All course materials & code samples",
    "Certificate of completion",
    "Free updates forever",
    "Community access included",
  ];
}

function isDev() {
  return process.env.NODE_ENV !== "production";
}

// ─── Countdown hook ───────────────────────────────────────────────────────────

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setRemaining((s) => (s <= 1 ? seconds : s - 1));
    }, 1000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [seconds]);

  return {
    h: String(Math.floor(remaining / 3600)).padStart(2, "0"),
    m: String(Math.floor((remaining % 3600) / 60)).padStart(2, "0"),
    s: String(remaining % 60).padStart(2, "0"),
  };
}

// ─── PromoCard ────────────────────────────────────────────────────────────────

function PromoCard({
  isNaira,
  price,
  courseTitle,
  courseAppUrl,
  paddlePromoId,
  couponCode,
}: {
  isNaira: boolean;
  price: number;
  courseTitle?: string;
  courseAppUrl?: string;
  paddlePromoId?: string;
  couponCode?: string;
}) {
  const pathName = courseTitle || "this learning path";
  const { h, m, s } = useCountdown(4 * 60 * 60);
  const features = pathFeatures(pathName);
  const segments = [
    { val: h, label: "HRS" },
    { val: m, label: "MIN" },
    { val: s, label: "SEC" },
  ];

  const paddle = useRef<Paddle | null>(null);
  const [loading, setLoading] = useState(false);
  // AsyncPay email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Initialize Paddle for international users
  useEffect(() => {
    if (isNaira) return;
    const token = process.env.NEXT_PUBLIC_PADDLE_TOKEN;
    if (!token) return;

    initializePaddle({
      token,
      environment: isDev() ? "sandbox" : "production",
      eventCallback(event) {
        if (event.name === "checkout.completed") onPaymentSuccess();
        if (event.name === "checkout.closed") setLoading(false);
      },
    }).then((instance) => {
      if (instance) paddle.current = instance;
    });
  }, [isNaira]);

  function onPaymentSuccess() {
    const returnUrl = courseAppUrl ?? "https://app.masteringbackend.com";
    const separator = returnUrl.includes("?") ? "&" : "?";
    window.location.href = `${returnUrl}${separator}payment=true`;
  }

  function handleCTAClick() {
    if (isNaira) {
      // AsyncPay needs email first — show modal
      setShowEmailModal(true);
    } else {
      // Paddle — open checkout directly, no email needed
      handlePaddleCheckout();
    }
  }

  function handlePaddleCheckout() {
    if (!paddlePromoId) {
      window.location.href = courseAppUrl ?? "https://app.masteringbackend.com";
      return;
    }
    setLoading(true);
    paddle.current?.Checkout.open({
      discountCode: couponCode || "PRESALE",
      items: [{ priceId: paddlePromoId, quantity: 1 }],
    });
  }

  async function handleAsyncPay() {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setEmailError("");
    setLoading(true);
    setShowEmailModal(false);

    try {
      const { AsyncpayCheckout } = await import("@asyncpay/checkout");
      AsyncpayCheckout({
        publicKey: process.env.NEXT_PUBLIC_ASYNCPAY_KEY ?? "",
        customer: {
          firstName: trimmed.split("@")[0],
          lastName: trimmed.split("@")[0],
          email: trimmed,
        },
        amount: 50000, // ₦50,000 in naira
        metadata: {
          course: courseTitle || "Unknown Course",
        },
        onSuccess: () => {
          setLoading(false);
          onPaymentSuccess();
        },
        onCancel: () => setLoading(false),
        onClose: () => setLoading(false),
      });
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[520px] mx-auto w-full">
      <div className="relative bg-[#111A2C] rounded-[2rem] p-10 flex flex-col shadow-2xl border border-[#13AECE]/30 overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#13AECE]/10 blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="flex items-center gap-1.5 w-fit bg-[#13AECE]/15 border border-[#13AECE]/30 text-[#13AECE] text-[11px] font-bold px-3 py-1.5 rounded-full mb-5">
          <Zap className="w-3 h-3" />
          Limited Time Offer
        </div>

        {/* Countdown timer */}
        <div className="flex items-center gap-2 mb-6">
          {segments.map(({ val, label }, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="bg-white/[0.07] border border-white/10 rounded-lg px-3 py-2 min-w-[52px] text-center">
                  <span className="text-[28px] font-black text-white leading-none tabular-nums font-mono">
                    {val}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-slate-500 tracking-widest mt-1">
                  {label}
                </span>
              </div>
              {i < 2 && (
                <span className="text-[22px] font-black text-[#13AECE] leading-none mb-4">
                  :
                </span>
              )}
            </div>
          ))}
          <p className="text-slate-400 text-[12px] leading-tight ml-1 self-start mt-1">
            Offer ends
            <br />
            in this session
          </p>
        </div>

        {/* Path label */}
        <p className="text-[#13AECE] text-[11px] font-bold uppercase tracking-widest mb-2">
          {pathName}
        </p>

        <h3 className="text-[26px] font-bold text-white leading-tight mb-3">
          Get lifetime access to this path at a special price
        </h3>
        <p className="text-slate-400 text-[14px] mb-8 leading-relaxed">
          One payment. No subscription. Everything inside{" "}
          <span className="text-slate-200 font-medium">{pathName}</span> is
          yours to keep — including all future updates.
        </p>

        <ul className="space-y-3 mb-10">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#13AECE] shrink-0 mt-0.5" />
              <span className="text-[14px] text-slate-300 leading-relaxed">
                {f}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <p className="text-[13px] text-slate-500 mb-1">
            Regular price:{" "}
            <span className="line-through">
              {isNaira ? "₦150,000" : "$150"}
            </span>
          </p>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-2xl font-bold text-white self-start mt-2">
              {isNaira ? "₦" : "$"}
            </span>
            <span className="text-[60px] font-black text-white leading-none tracking-tight">
              {isNaira ? "50,000" : price.toLocaleString()}
            </span>
          </div>
          <p className="text-[13px] text-slate-400 mb-6">
            one-time · promo price · yours forever
          </p>

          <button
            onClick={handleCTAClick}
            disabled={loading}
            className="w-full bg-[#1EAEDB] hover:bg-[#1a9bc4] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl mb-3 transition-colors shadow-lg shadow-[#1EAEDB]/20 text-[15px] flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Processing..." : "Claim This Offer"}
          </button>

          <p className="text-[11px] text-center italic text-slate-500">
            {isNaira ? "Secured by AsyncPay." : "Secured by Paddle."} Promo
            pricing. No subscription needed.
          </p>
        </div>
      </div>

      {/* AsyncPay email modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEmailModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
            <h3 className="text-[18px] font-bold text-[#0B152A] mb-1">
              One last step
            </h3>
            <p className="text-slate-500 text-[13px] mb-6">
              Enter your email to receive your access after payment.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAsyncPay()}
              placeholder="you@example.com"
              autoFocus
              className="w-full border border-slate-200 text-[#0B152A] placeholder-slate-400 text-[14px] rounded-xl px-4 py-3 outline-none focus:border-[#13AECE] focus:ring-2 focus:ring-[#13AECE]/20 transition-colors mb-2"
            />
            {emailError && (
              <p className="text-red-500 text-[12px] mb-3">{emailError}</p>
            )}
            <button
              onClick={handleAsyncPay}
              disabled={loading}
              className="w-full bg-[#1EAEDB] hover:bg-[#1a9bc4] disabled:opacity-60 text-white font-bold py-3 rounded-xl mt-2 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Continue to Payment
            </button>
            <button
              onClick={() => setShowEmailModal(false)}
              className="w-full text-slate-400 text-[13px] mt-3 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PricingSection ───────────────────────────────────────────────────────────

export function PricingSection({
  coursePrice,
  courseTitle,
  courseAppUrl,
  detectedCountry,
  paddlePromoId,
}: PricingSectionProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const searchParams = useSearchParams();

  const isPromo = searchParams.get("mode") === "promo";
  const promoPrice = Number(searchParams.get("price") ?? 150);
  const couponCode = searchParams.get("coupon") ?? undefined;

  // ?country= overrides server-detected country (useful for ad targeting tests)
  const effectiveCountry = searchParams.get("country") || detectedCountry;
  const isNaira = isPromo && isAfrican(effectiveCountry);

  const yearlySavings = (19.99 * 12 - 199).toFixed(0);
  const onetimeFeatures = pathFeatures(courseTitle || "this course");

  if (isPromo) {
    return (
      <section className="py-24 px-4 bg-[#F6F6F6]">
        <div className="container mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#0B152A] mb-4">
              Special Offer Just for You
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
              We&apos;ve unlocked a special price for your region. One payment,
              lifetime access — no subscription.
            </p>
          </div>
          <PromoCard
            isNaira={isNaira}
            price={promoPrice}
            courseTitle={courseTitle}
            courseAppUrl={courseAppUrl}
            paddlePromoId={paddlePromoId}
            couponCode={couponCode}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-[#F6F6F6]">
      <div className="container mx-auto max-w-[900px]">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#0B152A] mb-4">
            Start learning today
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Full platform access or just this course — pick the plan that works
            for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-[850px] mx-auto items-stretch">
          {/* ── Subscription (dark) ── */}
          <div className="bg-[#111A2C] rounded-[2rem] p-10 flex flex-col shadow-xl">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-[24px] font-bold text-white leading-tight">
                Subscription
              </h3>
              <div className="flex bg-white/[0.07] rounded-full p-1 border border-white/10 shrink-0">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
                    billing === "monthly"
                      ? "bg-[#13AECE] text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling("yearly")}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
                    billing === "yearly"
                      ? "bg-[#13AECE] text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {billing === "yearly" && (
              <div className="mb-4 mt-2 w-fit bg-[#13AECE]/15 border border-[#13AECE]/30 text-[#13AECE] text-[11px] font-bold px-3 py-1 rounded-full">
                Save ${yearlySavings} vs monthly
              </div>
            )}

            <div className="flex-1 mt-4 mb-8">
              <ul className="space-y-3">
                {SUBSCRIPTION_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#13AECE] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-slate-300 leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <div className="flex items-end gap-1 mb-1">
                <span className="text-xl font-bold text-white self-start mt-3">
                  $
                </span>
                <span className="text-[56px] font-black text-white leading-none tracking-tight">
                  {billing === "monthly" ? "19" : "199"}
                </span>
                {billing === "monthly" && (
                  <span className="text-xl font-bold text-white self-start mt-3">
                    .99
                  </span>
                )}
                {billing === "yearly" && (
                  <span className="text-sm font-bold text-slate-500 line-through self-end mb-2 ml-1">
                    $240
                  </span>
                )}
              </div>
              <p className="text-[13px] text-slate-400 mb-6">
                {billing === "monthly" ? "per month" : "per year, billed once"}
              </p>
              <Link
                href={courseAppUrl ?? "https://app.masteringbackend.com"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full bg-[#1EAEDB] hover:bg-[#1a9bc4] text-white font-bold py-4 rounded-xl mb-3 transition-colors shadow-lg shadow-[#1EAEDB]/20">
                  Get Started
                </button>
              </Link>
              <p className="text-[11px] text-center italic text-slate-500">
                Cancel anytime. No questions asked.
              </p>
            </div>
          </div>

          {/* ── Lifetime Access (light) ── */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-10 flex flex-col shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-[24px] font-bold text-[#0B152A] leading-tight mb-6">
              Lifetime Access
            </h3>

            <div className="flex-1 mb-8">
              <ul className="space-y-3">
                {onetimeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-[14px] text-slate-500 leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              {coursePrice ? (
                <>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-xl font-bold text-[#0B152A] self-start mt-3">
                      $
                    </span>
                    <span className="text-[56px] font-black text-[#0B152A] leading-none tracking-tight">
                      {coursePrice}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-500 mb-6">
                    one-time payment
                  </p>
                </>
              ) : (
                <div className="mb-8">
                  <p className="text-[15px] text-slate-500 leading-relaxed mb-2">
                    Prefer to own just this course?
                  </p>
                  <p className="text-[13px] text-slate-400">
                    Contact us for individual course pricing.
                  </p>
                </div>
              )}
              <Link
                href={courseAppUrl ?? "https://app.masteringbackend.com"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full bg-[#f4f6f8] border border-[#0B152A] text-[#0B152A] font-bold py-4 rounded-xl mb-3 hover:bg-slate-100 transition-colors">
                  {coursePrice ? "Buy Now" : "Contact Us"}
                </button>
              </Link>
              <p className="text-[11px] text-center italic text-slate-400">
                {coursePrice
                  ? "One-time payment. Yours forever."
                  : "We'll get back to you within 24 hours."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
