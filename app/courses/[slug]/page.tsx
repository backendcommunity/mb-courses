"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseDetailPage } from "@/components/pages/course-detail";
import { useRouter } from "next/navigation";
import React from "react";

interface CourseDetailPageRouteProps {
  params: {
    slug: string;
  };
}

export default function CourseDetailPageRoute({
  params,
}: CourseDetailPageRouteProps) {
  const router = useRouter();
  const { slug } = React.use(params);
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseDetailPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
