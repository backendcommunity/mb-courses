"use client";

import { useState } from "react";
import { CourseCard, TrackCard, type CourseCardData, type TrackCardData } from "@/components/content-card";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

const LEVELS = ["Basic", "Intermediate", "Advanced"];
const PER_PAGE = 6;
const norm = (s?: string) => String(s ?? "").trim().toLowerCase();

export function TopicBrowse({
  tagLabel, courses, tracks,
}: { tagLabel: string; courses: CourseCardData[]; tracks: TrackCardData[] }) {
  const [levels, setLevels] = useState<string[]>([]);
  const [minH, setMinH] = useState<number | "">("");
  const [maxH, setMaxH] = useState<number | "">("");
  const [page, setPage] = useState(1);

  const filtered = courses.filter((c) => {
    if (levels.length && !levels.some((l) => norm(c.level).startsWith(norm(l)))) return false;
    if (minH !== "" && c.hours < Number(minH)) return false;
    if (maxH !== "" && c.hours > Number(maxH)) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageCourses = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const toggleLevel = (l: string) =>
    setLevels((p) => (p.includes(l) ? p.filter((x) => x !== l) : [...p, l]));
  const clear = () => { setLevels([]); setMinH(""); setMaxH(""); setPage(1); };

  return (
    <section className="bg-[#F8FAFC] text-slate-900 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-[2rem] font-extrabold text-[#0B152A] mb-8">
          Browse {tagLabel} courses and tracks
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <button
              onClick={clear}
              className="w-full mb-6 flex items-center justify-center gap-2 border border-slate-300 text-slate-700 bg-white rounded-md py-2 text-sm font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" /> Clear All
            </button>
            <div className="space-y-8 bg-white border border-slate-200 rounded-xl p-5">
              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Skill Level</h3>
                <div className="space-y-3">
                  {LEVELS.map((l) => (
                    <label key={l} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={levels.includes(l)}
                        onChange={() => { toggleLevel(l); setPage(1); }}
                        className="w-4 h-4 rounded border-slate-300 accent-[#0A101D]"
                      />
                      <span className="text-sm text-slate-600">{l}</span>
                    </label>
                  ))}
                </div>
              </div>
              <hr className="border-slate-100" />
              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Duration (hours)</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number" min={0} placeholder="min" value={minH}
                    onChange={(e) => { setMinH(e.target.value === "" ? "" : Number(e.target.value)); setPage(1); }}
                    className="w-20 px-2 py-1.5 border border-slate-200 rounded text-sm"
                  />
                  <span className="text-slate-400">–</span>
                  <input
                    type="number" min={0} placeholder="max" value={maxH}
                    onChange={(e) => { setMaxH(e.target.value === "" ? "" : Number(e.target.value)); setPage(1); }}
                    className="w-20 px-2 py-1.5 border border-slate-200 rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-8">
            {tracks.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tracks.map((t) => <TrackCard key={t.id} roadmap={t} />)}
              </div>
            )}
            {pageCourses.length === 0 ? (
              <p className="text-center py-12 text-slate-400 text-sm">
                No {tagLabel} courses match these filters — clear filters to see all.
              </p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-5">
                  {pageCourses.map((c) => <CourseCard key={c.slug} course={c} />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-8">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="flex items-center text-sm font-semibold text-[#13AECE] mr-3 hover:text-[#0f8b9e] disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${p === page ? "bg-[#0B152A] text-white" : "text-slate-600 hover:bg-slate-100"}`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="flex items-center text-sm font-semibold text-[#13AECE] ml-3 hover:text-[#0f8b9e] disabled:opacity-40"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
