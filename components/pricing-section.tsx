"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

interface PricingSectionProps {
  coursePrice?: number | null;
  courseTitle?: string;
  courseAppUrl?: string;
}

const SUBSCRIPTION_FEATURES = [
  "Unlimited access to all courses & paths",
  "Every new course added automatically",
  "Community forum & peer support",
  "Project submission & mentor feedback",
  "Certificate on every completion",
  "Cancel anytime — no lock-in",
];

export function PricingSection({
  coursePrice,
  courseTitle,
  courseAppUrl,
}: PricingSectionProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const onetimeFeatures = [
    `Lifetime access to ${courseTitle || "this course"}`,
    "All course materials & code samples",
    "Certificate of completion",
    "Free updates forever",
    "Community access included",
  ];

  const yearlySavings = (19.99 * 12 - 199).toFixed(0);

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
          {/* ── Box 1: Subscription (dark) ── */}
          <div className="bg-[#111A2C] rounded-[2rem] p-10 flex flex-col shadow-xl">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-[24px] font-bold text-white leading-tight">
                Subscription
              </h3>

              {/* Billing toggle */}
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
                {SUBSCRIPTION_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
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

              <Link href={courseAppUrl ?? "/auth/register"} target="_blank" rel="noopener noreferrer">
                <button className="w-full bg-[#1EAEDB] hover:bg-[#1a9bc4] text-white font-bold py-4 rounded-xl mb-3 transition-colors shadow-lg shadow-[#1EAEDB]/20">
                  Get Started
                </button>
              </Link>
              <p className="text-[11px] text-center italic text-slate-500">
                Cancel anytime. No questions asked.
              </p>
            </div>
          </div>

          {/* ── Box 2: One-time (white) ── */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-10 flex flex-col shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-[24px] font-bold text-[#0B152A] leading-tight mb-6">
              Lifetime Access
            </h3>

            <div className="flex-1 mb-8">
              <ul className="space-y-3">
                {onetimeFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
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

              <Link href={courseAppUrl ?? "/auth/register"} target="_blank" rel="noopener noreferrer">
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
