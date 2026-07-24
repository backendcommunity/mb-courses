"use client";

import Link from "next/link";
import { stripHtml } from "@/lib/utils";
import { BarChart2, Users, BookOpen } from "lucide-react";

export interface CourseCardData {
  slug: string;
  title: string;
  level: string;
  users: number;
  desc: string;
  category: string;
  hours: number;
  chapters: number;
  banner?: string;
  isPremium?: boolean;
  tags?: string[];
}

export function CourseCard({
  course,
  href,
}: {
  course: CourseCardData;
  href?: string;
}) {
  return (
    <Link href={href ?? `/courses/${course.slug ?? (course as any).id ?? ""}`}>
      <div className="bg-white h-full rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-shadow hover:shadow-md cursor-pointer group">
        <div className="p-6 flex-1 flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">
            Course
          </span>
          <h4 className="text-xl font-bold text-[#0B152A] mb-3 leading-tight group-hover:text-[#13AECE] transition-colors line-clamp-2">
            {course.title}
          </h4>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <BarChart2 className="w-4 h-4" />
              {course.level}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <Users className="w-4 h-4" />
              {course.users?.toLocaleString?.() ?? course.users}
            </div>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-1">
            {course.desc}
          </p>
          <div className="text-xs text-slate-400">
            <a href={`/topic/${course.category?.toLowerCase()}`}>
              {course.category}
            </a>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
            <img
              src="/logo.png"
              alt="mb"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>{course.hours} {course.hours === 1 ? "hr" : "hrs"}</span>
            <span className="text-slate-300">|</span>
            <span>
              {course.chapters ?? 0}{" "}
              {course.chapters === 1 ? "chapter" : "chapters"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export interface TrackCardData {
  id: string;
  slug?: string;
  title: string;
  summary?: string;
  description?: string;
  banner?: string;
  totalContent?: number;
  isWaiting?: boolean;
}

export function TrackCard({
  roadmap,
  href,
}: {
  roadmap: TrackCardData;
  href?: string;
}) {
  return (
    <Link href={href ?? `/${roadmap.slug ?? roadmap.id}`}>
      <div className="bg-white h-full rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-shadow hover:shadow-md cursor-pointer group">
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              Learning Path
            </span>
            {roadmap.isWaiting && (
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[10px] font-bold tracking-wide uppercase">
                Coming Soon
              </span>
            )}
          </div>
          <h4 className="text-xl font-bold text-[#0B152A] mb-3 leading-tight group-hover:text-[#13AECE] transition-colors line-clamp-2">
            {roadmap.title}
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-1">
            {stripHtml(
              roadmap.summary ??
                roadmap.description ??
                "Comprehensive learning roadmap",
            )}
          </p>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
            <img
              src="/logo.png"
              alt="mb"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {roadmap.totalContent ?? 0}{" "}
              {roadmap.totalContent === 1 ? "course" : "courses"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
