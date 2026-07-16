"use client";

import Link from "next/link";
import { stripHtml } from "@/lib/utils";
import { BarChart2, Users, BookOpen, Target, ArrowRight } from "lucide-react";

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
            <span>{course.hours} hrs</span>
            <span className="text-slate-300">|</span>
            <span>{course.chapters ?? 0} chapters</span>
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
      <div className="bg-white h-full rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
        <div className="relative h-44 overflow-hidden bg-slate-100">
          {roadmap.banner ? (
            <img
              src={roadmap.banner}
              alt={roadmap.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0e2036] to-[#13AECE]/30">
              <Target className="w-12 h-12 text-white/30" />
            </div>
          )}
          {roadmap.isWaiting && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-md bg-amber-500 text-white text-[10px] font-bold tracking-wide uppercase">
                Coming Soon
              </span>
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h4 className="text-base font-bold text-[#0B152A] mb-2 leading-tight group-hover:text-[#13AECE] transition-colors line-clamp-2">
            {roadmap.title}
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1 mb-4">
            {stripHtml(
              roadmap.summary ??
                roadmap.description ??
                "Comprehensive learning roadmap",
            )}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {roadmap.totalContent ?? 0} courses
            </span>
            <ArrowRight className="w-4 h-4 text-[#13AECE] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
