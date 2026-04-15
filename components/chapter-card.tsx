"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface Video {
  title: string;
  duration?: string;
  mb?: number;
}

export interface ProcessedChapter {
  num: number;
  title: string;
  summary: string;
  videos: Video[];
  lessons: string[];
}

function VideoRow({ title, duration, mb }: Video) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white transition-colors group">
      {/* Brand play icon — black square with white triangle */}
      <div className="w-6 h-6 rounded-sm bg-[#0B152A] flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-2.5 h-2.5 ml-0.5"
        >
          <polygon points="2,1 11,6 2,11" fill="white" />
        </svg>
      </div>

      <span className="flex-1 text-[13px] text-slate-600 leading-snug group-hover:text-slate-800 transition-colors truncate">
        {title}
      </span>

      {/* {duration && (
        <span className="text-[11px] text-slate-400 shrink-0 mr-2 tabular-nums">
          {duration}
        </span>
      )} */}

      {/* MB badge */}

      <span className="text-[8px] font-black text-white bg-[#0B152A] px-1.5 py-[3px] rounded tracking-[0.18em] shrink-0 leading-none">
        {mb} MB
      </span>
    </div>
  );
}

export function ChapterCard({
  chapter,
  courseAppUrl,
}: {
  chapter: ProcessedChapter;
  courseAppUrl?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasContent = chapter.videos.length > 0 || chapter.lessons.length > 0;
  const videoCount = chapter.videos.length || chapter.lessons.length;

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Card header */}
      <div className="p-6">
        {/* Number + title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#0B152A] text-white flex items-center justify-center font-bold text-[13px] shrink-0 tabular-nums">
            {String(chapter.num).padStart(2, "0")}
          </div>
          <h3 className="font-bold text-slate-800 text-[15px] leading-snug">
            {chapter.title}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-4" />

        {/* Summary */}
        {chapter.summary && (
          <p className="text-[13px] text-slate-500 leading-relaxed mb-5">
            {chapter.summary.substring(0, 300)}{" "}
            {chapter.summary.length > 300 && "…"}
          </p>
        )}

        {/* Actions row */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700 hover:text-[#13AECE] transition-colors"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Hide Details" : "View Details"}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <Button
            className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 text-xs h-8 px-5 rounded-md shadow-sm"
            asChild
          >
            <Link
              href={courseAppUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Chapter
            </Link>
          </Button>
        </div>
      </div>

      {/* Expanded video list */}
      {isExpanded && hasContent && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] px-3 mb-2">
            {chapter.videos.length > 0 ? "Videos" : "Lessons"} in this chapter
          </p>
          <div className="space-y-0.5">
            {chapter.videos.length > 0
              ? chapter.videos.map((v, i) => (
                  <VideoRow
                    key={i}
                    title={v.title}
                    duration={v.duration}
                    mb={v.mb}
                  />
                ))
              : chapter.lessons.map((l, i) => <VideoRow key={i} title={l} />)}
          </div>
        </div>
      )}
    </div>
  );
}
