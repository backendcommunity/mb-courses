"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseQuizzesPage } from "@/components/pages/course-quizzes";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function CourseQuizzesPageRoute() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseQuizzesPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
