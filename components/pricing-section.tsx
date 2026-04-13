"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Loader2, X, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PricingSectionProps {
  coursePrice?: number | null;
  courseTitle?: string;
  courseAppUrl?: string;
  detectedCountry?: string;
  /** Paddle price ID for one-time / promo offers (from roadmap.paddle_price_id) */
  paddlePromoId?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PADDLE_MONTHLY_ID = "pri_01k13rejzzwb1pawgtrqcjyzca";
const PADDLE_YEARLY_ID = "pri_01k13rh3kr5y95cy9c5njy0w5k";

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

// ─── Email modal (AsyncPay only) ──────────────────────────────────────────────

function EmailModal({
  onSubmit,
  onClose,
  loading,
}: {
  onSubmit: (email: string) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    onSubmit(trimmed);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

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
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="you@example.com"
          autoFocus
          className="w-full border border-slate-200 text-[#0B152A] placeholder-slate-400 text-[14px] rounded-xl px-4 py-3 outline-none focus:border-[#13AECE] focus:ring-2 focus:ring-[#13AECE]/20 transition-colors mb-2"
        />
        {error && <p className="text-red-500 text-[12px] mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#1EAEDB] hover:bg-[#1a9bc4] disabled:opacity-60 text-white font-bold py-3 rounded-xl mt-2 transition-colors flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

// ─── PromoCard ────────────────────────────────────────────────────────────────

function PromoCard({
  isNaira,
  price,
  courseTitle,
  loading,
  onClaim,
}: {
  isNaira: boolean;
  price: number;
  courseTitle?: string;
  loading: boolean;
  onClaim: () => void;
}) {
  const pathName = courseTitle || "this learning path";
  const { h, m, s } = useCountdown(4 * 60 * 60);
  const features = pathFeatures(pathName);
  const segments = [
    { val: h, label: "HRS" },
    { val: m, label: "MIN" },
    { val: s, label: "SEC" },
  ];

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
          <p className="text-[13px] text-slate-400 mb-7">
            one-time · promo price · yours forever
          </p>

          <button
            onClick={onClaim}
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
    </div>
  );
}

// ─── PricingSection ───────────────────────────────────────────────────────────

export function PricingSection({
  courseTitle,
  courseAppUrl,
  detectedCountry,
  paddlePromoId,
}: PricingSectionProps) {
  const searchParams = useSearchParams();

  const isPromo = searchParams.get("mode") === "promo";
  const promoPrice = Number(searchParams.get("price") ?? 150);
  const coupon = searchParams.get("coupon") ?? undefined;

  const effectiveCountry = searchParams.get("country") || detectedCountry;
  const african = isAfrican(effectiveCountry);
  const isNaira = african;

  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);
  const [emailModal, setEmailModal] = useState<
    ((email: string) => void) | null
  >(null);

  const paddle = useRef<Paddle | null>(null);

  // ── Paddle init ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (african) return; // African users pay via AsyncPay
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
  }, [african]);

  // ── Shared helpers ───────────────────────────────────────────────────────────

  function onPaymentSuccess() {
    const base = courseAppUrl ?? "https://app.masteringbackend.com";
    window.location.href = `${base}${base.includes("?") ? "&" : "?"}payment=true`;
  }

  function openPaddle(priceId: string, discountCode?: string) {
    setLoading(true);
    const options: Parameters<
      NonNullable<typeof paddle.current>["Checkout"]["open"]
    >[0] = {
      items: [{ priceId, quantity: 1 }],
    };
    if (discountCode) options.discountCode = discountCode;
    paddle.current?.Checkout.open(options);
  }

  async function runAsyncPay(
    email: string,
    amountNaira: number,
    meta?: Record<string, string>,
  ) {
    setLoading(true);
    try {
      const { AsyncpayCheckout } = await import("@asyncpay/checkout");
      AsyncpayCheckout({
        publicKey: process.env.NEXT_PUBLIC_ASYNCPAY_KEY ?? "",
        customer: {
          firstName: email.split("@")[0],
          lastName: email.split("@")[0],
          email,
        },
        amount: amountNaira,
        ...(meta ? { metadata: meta } : {}),
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

  // Collect email then fire AsyncPay
  function promptAsyncPay(amountNaira: number, meta?: Record<string, string>) {
    setEmailModal(() => (email: string) => {
      setEmailModal(null);
      runAsyncPay(email, amountNaira, meta);
    });
  }

  // ── Payment handlers ─────────────────────────────────────────────────────────

  const meta = { course: courseTitle ?? "Unknown" };

  function handlePromo() {
    if (isNaira) {
      promptAsyncPay(50000, meta);
    } else {
      if (!paddlePromoId) {
        window.location.href =
          courseAppUrl ?? "https://app.masteringbackend.com";
        return;
      }
      openPaddle(paddlePromoId, coupon ?? "PRESALE");
    }
  }

  function handleLifetime() {
    if (isNaira) {
      promptAsyncPay(150000, meta);
    } else {
      if (!paddlePromoId) {
        window.location.href =
          courseAppUrl ?? "https://app.masteringbackend.com";
        return;
      }
      openPaddle(paddlePromoId, coupon ?? "PRESALE");
    }
  }

  function handleSubscription() {
    if (isNaira) {
      const amount = billing === "monthly" ? 15000 : 150000;
      promptAsyncPay(amount, { ...meta, plan: billing });
    } else {
      const priceId =
        billing === "monthly" ? PADDLE_MONTHLY_ID : PADDLE_YEARLY_ID;
      openPaddle(priceId); // no discount on subscriptions
    }
  }

  // ── Pricing display ──────────────────────────────────────────────────────────

  const subMonthlyPrice = isNaira ? "₦15,000" : "$19.99";
  const subYearlyPrice = isNaira ? "₦150,000" : "$199";
  const subYearlySavings = isNaira
    ? "₦30,000"
    : `$${(19.99 * 12 - 199).toFixed(0)}`;
  const subOriginalYearly = isNaira ? "₦180,000" : "$240";

  const lifetimeNowPrice = isNaira ? "₦150,000" : "$150";
  const lifetimeRegularPrice = isNaira ? "₦250,000" : "$250";

  // ── Promo layout ─────────────────────────────────────────────────────────────

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
            loading={loading}
            onClaim={handlePromo}
          />
        </div>

        {emailModal && (
          <EmailModal
            loading={loading}
            onSubmit={emailModal}
            onClose={() => setEmailModal(null)}
          />
        )}
      </section>
    );
  }

  // ── Default layout ────────────────────────────────────────────────────────────

  const onetimeFeatures = pathFeatures(courseTitle || "this course");

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
                Save {subYearlySavings} vs monthly
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
                <span className="text-[56px] font-black text-white leading-none tracking-tight">
                  {billing === "monthly" ? subMonthlyPrice : subYearlyPrice}
                </span>
                {billing === "yearly" && (
                  <span className="text-sm font-bold text-slate-500 line-through self-end mb-2 ml-2">
                    {subOriginalYearly}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-slate-400 mb-6">
                {billing === "monthly" ? "per month" : "per year, billed once"}
              </p>
              <button
                onClick={handleSubscription}
                disabled={loading}
                className="w-full bg-[#1EAEDB] hover:bg-[#1a9bc4] disabled:opacity-60 text-white font-bold py-4 rounded-xl mb-3 transition-colors shadow-lg shadow-[#1EAEDB]/20 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Processing..." : "Get Started"}
              </button>
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
              <p className="text-[13px] text-slate-400 mb-1">
                Regular price:{" "}
                <span className="line-through">{lifetimeRegularPrice}</span>
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-[56px] font-black text-[#0B152A] leading-none tracking-tight">
                  {lifetimeNowPrice}
                </span>
              </div>
              <p className="text-[13px] text-slate-500 mb-6">
                one-time payment
              </p>

              <button
                onClick={handleLifetime}
                disabled={loading}
                className="w-full bg-[#f4f6f8] border border-[#0B152A] text-[#0B152A] font-bold py-4 rounded-xl mb-3 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Processing..." : "Buy Now"}
              </button>
              <p className="text-[11px] text-center italic text-slate-400">
                One-time payment. Yours forever.
              </p>
            </div>
          </div>
        </div>
      </div>

      {emailModal && (
        <EmailModal
          loading={loading}
          onSubmit={emailModal}
          onClose={() => setEmailModal(null)}
        />
      )}
    </section>
  );
}
