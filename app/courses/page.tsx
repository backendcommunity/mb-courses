"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CoursesPage } from "@/components/pages/courses";
import { Course, CourseFilterOptions } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursesPageRoute() {
  const router = useRouter();
  const store = useAppStore();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    store.getCourses();
    store.getUserCourses();
  }, []);

  const handleFilter = async (filters: CourseFilterOptions) => {
    if (filters.tab?.includes("my-courses")) {
      await store.getUserCourses({ filters });
      return;
    }

    if (filters.tab?.includes("new")) filters.sortBy = "createdAt";

    await store.getCourses({ filters });
  };

  return (
    <DashboardLayout>
      <CoursesPage onNavigate={handleNavigate} onFilter={handleFilter} />
    </DashboardLayout>
  );
}
