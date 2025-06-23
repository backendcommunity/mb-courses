"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseProjectsPage } from "@/components/pages/course-projects";
import { useRouter } from "next/navigation";

interface CourseProjectsPageRouteProps {
  params: {
    courseId: string;
  };
}

export default function CourseProjectsPageRoute({
  params,
}: CourseProjectsPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseProjectsPage
        courseId={params.courseId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
