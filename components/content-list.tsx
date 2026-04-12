"use client";

import Link from "next/link";

export interface ProcessedContentItem {
  num: number;
  title: string;
  type:
    | "course"
    | "quiz"
    | "exercise"
    | "project"
    | "mock-interview"
    | "bootcamp"
    | string;
  slug?: string;
  summary?: string;
  stageNum: number;
  stageTitle: string;
}

// ── type config ──────────────────────────────────────────────────────────────

interface TypeConfig {
  label: string;
  dotColor: string;
  badgeColor: string;
}

function getTypeConfig(type: string): TypeConfig {
  switch (type) {
    case "course":
      return {
        label: "COURSE",
        dotColor: "bg-[#0B152A]",
        badgeColor: "text-[#0B152A] bg-slate-100",
      };
    case "quiz":
    case "exercise":
      return {
        label: "SKILL ASSESSMENT",
        dotColor: "bg-[#6366f1]",
        badgeColor: "text-[#6366f1] bg-indigo-50",
      };
    case "project":
      return {
        label: "PROJECT",
        dotColor: "bg-[#10b981]",
        badgeColor: "text-[#10b981] bg-emerald-50",
      };
    case "mock-interview":
      return {
        label: "MOCK INTERVIEW",
        dotColor: "bg-[#f59e0b]",
        badgeColor: "text-[#f59e0b] bg-amber-50",
      };
    case "bootcamp":
      return {
        label: "BOOTCAMP",
        dotColor: "bg-[#8b5cf6]",
        badgeColor: "text-[#8b5cf6] bg-violet-50",
      };
    default:
      return {
        label: type.toUpperCase(),
        dotColor: "bg-slate-400",
        badgeColor: "text-slate-500 bg-slate-100",
      };
  }
}

// ── main component ───────────────────────────────────────────────────────────

export function ContentList({
  items,
  roadmapAppUrl,
}: {
  items: ProcessedContentItem[];
  roadmapAppUrl?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="relative">
      {items.map((item) => {
        const { label, dotColor, badgeColor } = getTypeConfig(item.type);
        const isCourse = item.type === "course";

        return (
          <div key={item.num} className="relative flex gap-4">
            {/* Left rail: dot + line — line always continues into the certificate below */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-3 h-3 rounded-full ${dotColor} ring-4 ring-white shrink-0 mt-5 z-10`}
              />
              <div className="w-px flex-1 bg-slate-200 mt-1" />
            </div>

            {/* Card */}
            <div className="flex-1 pb-4">
              <Link
                href={roadmapAppUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow group"
              >
                <span
                  className={`inline-block text-[9px] font-black uppercase tracking-[0.14em] px-2 py-[3px] rounded-full leading-none mb-3 ${badgeColor}`}
                >
                  {label}
                </span>

                <div className="flex items-center gap-3">
                  {isCourse && (
                    <div
                      className={`w-7 h-7 rounded-full ${dotColor} text-white flex items-center justify-center font-bold text-[12px] shrink-0 tabular-nums`}
                    >
                      {String(item.stageNum).padStart(2, "0")}
                    </div>
                  )}
                  <h4 className="font-bold text-slate-800 text-[14px] leading-snug group-hover:text-[#13AECE] transition-colors">
                    {item.title}
                  </h4>
                </div>

                {item.summary && (
                  <>
                    <div className="h-px bg-slate-100 my-3" />
                    <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </>
                )}
              </Link>
            </div>
          </div>
        );
      })}

      {/* Terminal dot — the line lands here, certificate card sits to the right */}
      <div className="flex gap-4 items-start">
        <div className="flex flex-col items-center shrink-0">
          <div className="w-5 h-5 rounded-full bg-[#13AECE] ring-4 ring-white shrink-0 mt-3 z-10 shadow-sm shadow-[#13AECE]/30" />
        </div>
        <p className="text-[11px] font-bold text-[#13AECE] uppercase tracking-[0.14em] mt-3.5">
          Complete all items to earn your certificate
        </p>
      </div>
    </div>
  );
}
