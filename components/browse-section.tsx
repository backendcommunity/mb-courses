"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { stripHtml } from "@/lib/utils";
import {
  BookOpen,
  Code,
  ArrowRight,
  Target,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Users,
  Layers,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { RoadmapBanner } from "@/components/roadmap-banner";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://demo.masteringbackend.com/api/v3";

const PATH_LIST = [
  "Backend Engineering",
  "Cybersecurity for Engineers",
  "Product Engineering",
  "Blockchain Engineering",
  "AI Engineering",
  "Cloud Engineering",
  "DevOps Engineering",
  "Data Engineering",
  "Platform Engineering",
];

const CATEGORY_LIST = [
  "Backend",
  "Cybersecurity",
  "Product",
  "Blockchain",
  "AI",
  "Cloud",
  "DevOps",
  "Data",
  "Platform",
];

const LEVEL_LIST = ["Basic", "Intermediate", "Advanced"];

const ITEMS_PER_PAGE = 6;

function mapCourse(c: any) {
  return {
    slug: c.slug,
    id: c.id,
    title: c.title,
    level: c.level || "Intermediate",
    users: c.totalStudents || 0,
    desc: stripHtml(c.summary || c.description || ""),
    category: c.category || "Software Development",
    hours: c.totalDuration || 0,
    chapters: c.chapters?.length || 0,
    banner: c.banner,
    isPremium: c.isPremium,
  };
}

function PaginationBar({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPage,
}: {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onPage: (n: number) => void;
}) {
  if (totalPages <= 1) return null;
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={onPrev}
        className="flex items-center text-sm font-semibold text-[#13AECE] mr-3 hover:text-[#0f8b9e] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
            p === currentPage
              ? "bg-[#0B152A] text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={onNext}
        className="flex items-center text-sm font-semibold text-[#13AECE] ml-3 hover:text-[#0f8b9e] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        Next <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}

interface BrowseSectionProps {
  initialRoadmaps: any[];
  initialCourses: any[];
}

export function BrowseSection({
  initialRoadmaps,
  initialCourses,
}: BrowseSectionProps) {
  const [coursesList, setCoursesList] = useState(initialCourses);
  const [roadmapsList, setRoadmapsList] = useState(initialRoadmaps);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLearningPaths, setSelectedLearningPaths] = useState<string[]>(
    [],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [showMoreLearningPath, setShowMoreLearningPath] = useState(false);
  const [showMoreCategory, setShowMoreCategory] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [coursePage, setCoursePage] = useState(1);
  const [roadmapPage, setRoadmapPage] = useState(1);

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const isFirstRender = useRef(true);
  const prevSearch = useRef("");

  const loadData = useCallback(
    async (filters: {
      terms?: string;
      level?: string;
      category?: string;
      path?: string;
    }) => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      const { signal } = abortRef.current;

      setRoadmapLoading(true);
      setCourseLoading(true);

      try {
        const params = new URLSearchParams();
        if (filters.terms) params.set("terms", filters.terms);
        if (filters.level) params.set("level", filters.level);
        if (filters.category) params.set("category", filters.category);
        if (filters.path) params.set("path", filters.path);
        const query = params.toString() ? `?${params.toString()}` : "";

        const [roadmapsRes, coursesRes] = await Promise.all([
          fetch(`${API_URL}/public/roadmaps${query}`, { signal }),
          fetch(`${API_URL}/public/courses${query}`, { signal }),
        ]);
        if (signal.aborted) return;

        const roadmapsData = roadmapsRes.ok ? await roadmapsRes.json() : {};
        const coursesData = coursesRes.ok ? await coursesRes.json() : {};

        setRoadmapsList(roadmapsData.roadmaps ?? []);
        setCoursesList((coursesData.courses ?? []).map(mapCourse));
        setCoursePage(1);
        setRoadmapPage(1);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
      } finally {
        if (!abortRef.current?.signal.aborted) {
          setRoadmapLoading(false);
          setCourseLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const searchChanged = searchQuery !== prevSearch.current;
    prevSearch.current = searchQuery;

    const filters = {
      terms: searchQuery || undefined,
      level: selectedLevels.join(",") || undefined,
      category: selectedCategories.join(",") || undefined,
      path: selectedLearningPaths.join(",") || undefined,
    };

    setRoadmapPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => loadData(filters),
      searchChanged ? 400 : 0,
    );

    return () => clearTimeout(debounceRef.current);
  }, [
    searchQuery,
    selectedLevels,
    selectedCategories,
    selectedLearningPaths,
    loadData,
  ]);

  const toggleFilter = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const clearAll = () => {
    setSearchQuery("");
    setSelectedLearningPaths([]);
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const filteredRoadmapsList =
    selectedLearningPaths.length === 0
      ? roadmapsList
      : roadmapsList.filter((r: any) =>
          selectedLearningPaths.some((p) =>
            r.title?.toLowerCase().includes(p.toLowerCase().split(" ")[0]),
          ),
        );

  const roadmapTotalPages = Math.max(
    1,
    Math.ceil(filteredRoadmapsList.length / ITEMS_PER_PAGE),
  );
  const courseTotalPages = Math.max(
    1,
    Math.ceil(coursesList.length / ITEMS_PER_PAGE),
  );
  const paginatedRoadmaps = filteredRoadmapsList.slice(
    (roadmapPage - 1) * ITEMS_PER_PAGE,
    roadmapPage * ITEMS_PER_PAGE,
  );
  const paginatedCourses = coursesList.slice(
    (coursePage - 1) * ITEMS_PER_PAGE,
    coursePage * ITEMS_PER_PAGE,
  );

  const hasActiveFilters =
    !!searchQuery ||
    selectedLearningPaths.length > 0 ||
    selectedCategories.length > 0 ||
    selectedLevels.length > 0;

  return (
    <section className="py-20 px-4 bg-[#F8FAFC] text-slate-900">
      <div className="container mx-auto">
        <div className="mb-10">
          <h2 className="text-[2rem] font-extrabold text-[#0B152A] mb-3">
            Our &ldquo;Learn&rdquo; Approach
          </h2>
          <p className="text-slate-500 text-base max-w-2xl">
            Structured learning paths to guide your tech engineering career
            transformation. Each learning path is defense-based, practical, and
            designed for a transformation.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <button
              onClick={() => setSidebarOpen((p) => !p)}
              className="lg:hidden w-full mb-4 flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 w-2 h-2 rounded-full bg-[#13AECE]" />
                )}
              </span>
              {sidebarOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <div
              className={`${sidebarOpen ? "block" : "hidden"} lg:block space-y-1`}
            >
              <Button
                onClick={clearAll}
                variant="outline"
                className="w-full mb-6 border-slate-300 text-slate-700 bg-white"
              >
                Clear All Filters
                {hasActiveFilters && (
                  <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-[#0B152A] text-white">
                    {selectedLearningPaths.length +
                      selectedCategories.length +
                      selectedLevels.length +
                      (searchQuery ? 1 : 0)}
                  </span>
                )}
              </Button>

              <div className="space-y-8 bg-white border border-slate-200 rounded-xl p-5">
                {/* Learning Paths */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                    Learning Paths
                  </h3>
                  <div className="space-y-3">
                    {(showMoreLearningPath
                      ? PATH_LIST
                      : PATH_LIST.slice(0, 4)
                    ).map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLearningPaths.includes(item)}
                          onChange={() =>
                            toggleFilter(setSelectedLearningPaths, item)
                          }
                          className="w-4 h-4 rounded border-slate-300 accent-[#0A101D]"
                        />
                        <span className="text-sm text-slate-600">{item}</span>
                      </label>
                    ))}
                  </div>
                  {PATH_LIST.length > 4 && (
                    <button
                      onClick={() =>
                        setShowMoreLearningPath(!showMoreLearningPath)
                      }
                      className="text-sm font-semibold text-[#13AECE] flex items-center gap-1 mt-3 hover:text-[#0f8b9e]"
                    >
                      {showMoreLearningPath ? "Show Less" : "Show More"}
                      {showMoreLearningPath ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                <hr className="border-slate-100" />

                {/* Category */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                    Category
                  </h3>
                  <div className="space-y-3">
                    {(showMoreCategory
                      ? CATEGORY_LIST
                      : CATEGORY_LIST.slice(0, 4)
                    ).map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(item)}
                          onChange={() =>
                            toggleFilter(setSelectedCategories, item)
                          }
                          className="w-4 h-4 rounded border-slate-300 accent-[#0A101D]"
                        />
                        <span className="text-sm text-slate-600">{item}</span>
                      </label>
                    ))}
                  </div>
                  {CATEGORY_LIST.length > 4 && (
                    <button
                      onClick={() => setShowMoreCategory(!showMoreCategory)}
                      className="text-sm font-semibold text-[#13AECE] flex items-center gap-1 mt-3 hover:text-[#0f8b9e]"
                    >
                      {showMoreCategory ? "Show Less" : "Show More"}
                      {showMoreCategory ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                <hr className="border-slate-100" />

                {/* Level */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                    Skill Level
                  </h3>
                  <div className="space-y-3">
                    {LEVEL_LIST.map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLevels.includes(item)}
                          onChange={() => toggleFilter(setSelectedLevels, item)}
                          className="w-4 h-4 rounded border-slate-300 accent-[#0A101D]"
                        />
                        <span className="text-sm text-slate-600">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses and roadmaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A101D]/20 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCoursePage(1);
                    setRoadmapPage(1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Roadmaps */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#13AECE]" />
                  <h3 className="text-lg font-bold text-[#0B152A]">
                    Learning Paths
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                  {filteredRoadmapsList.length}
                </span>
              </div>

              {roadmapLoading ? (
                <div className="flex flex-col items-center justify-center py-14 text-slate-400">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-[#13AECE] rounded-full animate-spin mb-3" />
                  <span className="text-sm">Loading roadmaps…</span>
                </div>
              ) : paginatedRoadmaps.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Target className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    {hasActiveFilters
                      ? "No roadmaps match your filters."
                      : "No roadmaps available yet."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {paginatedRoadmaps.map((roadmap: any) => (
                      <Link
                        href={`/${roadmap.slug ?? roadmap.id}`}
                        key={roadmap.id}
                      >
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
                            {/* <div className="absolute top-3 left-3">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#13AECE] text-white text-[10px] font-bold tracking-wide uppercase">
                                <Layers className="w-3 h-3" />
                                Roadmap
                              </span>
                            </div> */}
                            {/* {roadmap.isPremium && (
                              <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 rounded-md bg-[#A855F7] text-white text-[10px] font-bold tracking-wide uppercase">
                                  Premium
                                </span>
                              </div>
                            )} */}
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
                    ))}
                  </div>
                  <PaginationBar
                    currentPage={roadmapPage}
                    totalPages={roadmapTotalPages}
                    onPrev={() => setRoadmapPage((p) => Math.max(1, p - 1))}
                    onNext={() =>
                      setRoadmapPage((p) => Math.min(roadmapTotalPages, p + 1))
                    }
                    onPage={setRoadmapPage}
                  />
                </>
              )}
            </div>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-start">
                <span className="pr-4 bg-[#F8FAFC] text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  All Courses
                </span>
              </div>
            </div>

            {/* Courses */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#13AECE]" />
                  <h3 className="text-lg font-bold text-[#0B152A]">Courses</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                  {coursesList.length}
                </span>
              </div>

              {courseLoading ? (
                <div className="flex flex-col items-center justify-center py-14 text-slate-400">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-[#13AECE] rounded-full animate-spin mb-3" />
                  <span className="text-sm">Loading courses…</span>
                </div>
              ) : paginatedCourses.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    {hasActiveFilters
                      ? "No courses match your filters."
                      : "No courses available yet."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-5">
                    {paginatedCourses.map((course: any, idx: number) => (
                      <Link
                        href={`/courses/${course.slug ?? course.id}`}
                        key={course.id ?? idx}
                      >
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
                                {course.users?.toLocaleString?.() ??
                                  course.users}
                              </div>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                              {course.desc}
                            </p>
                            <div className="text-xs text-slate-400">
                              {course.category}
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
                    ))}
                  </div>
                  <PaginationBar
                    currentPage={coursePage}
                    totalPages={courseTotalPages}
                    onPrev={() => setCoursePage((p) => Math.max(1, p - 1))}
                    onNext={() =>
                      setCoursePage((p) => Math.min(courseTotalPages, p + 1))
                    }
                    onPage={setCoursePage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
