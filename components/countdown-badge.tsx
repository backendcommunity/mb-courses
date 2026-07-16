"use client";

import { useCountdown } from "@/components/use-countdown";

export function CountdownBadge({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const { h, m, s } = useCountdown();
  const segments = [
    { val: h, label: "HRS" },
    { val: m, label: "MIN" },
    { val: s, label: "SEC" },
  ];

  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-1.5 bg-white/[0.07] border border-white/10 rounded-full px-3 py-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
          Offer ends
        </span>
        <span className="text-[13px] font-black text-white tabular-nums font-mono">
          {h}:{m}:{s}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
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
  );
}
