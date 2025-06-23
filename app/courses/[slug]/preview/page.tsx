"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CoursePreviewPage } from "@/components/pages/course-preview";
import { useRouter } from "next/navigation";
import React from "react";

interface CoursePreviewPageRouteProps {
  params: {
    slug: string;
  };
}

export default function CoursePreviewPageRoute({
  params,
}: CoursePreviewPageRouteProps) {
  const router = useRouter();
  const { slug } = React.use(params);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CoursePreviewPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
