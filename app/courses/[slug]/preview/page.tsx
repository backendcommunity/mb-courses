"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CoursePreviewPage } from "@/components/pages/course-preview";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type CoursePreviewPageRouteProps = {
  slug: string;
};

export default function CoursePreviewPageRoute() {
  const router = useRouter();
  const { slug } = useParams() as CoursePreviewPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CoursePreviewPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
