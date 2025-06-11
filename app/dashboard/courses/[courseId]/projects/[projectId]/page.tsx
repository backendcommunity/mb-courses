"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseProjectPage } from "@/components/pages/course-project";
import { useRouter } from "next/navigation";

interface CourseProjectPageRouteProps {
  params: {
    courseId: string;
    projectId: string;
  };
}

export default function CourseProjectPageRoute({
  params,
}: CourseProjectPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseProjectPage
        courseId={params.courseId}
        onNavigate={handleNavigate}
        projectId={params.projectId}
      />
    </DashboardLayout>
  );
}
