"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseQuizzesPage } from "@/components/pages/course-quizzes";
import { useRouter } from "next/navigation";

interface CourseQuizzesPageRouteProps {
  params: {
    courseId: string;
  };
}

export default function CourseQuizzesPageRoute({
  params,
}: CourseQuizzesPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseQuizzesPage
        courseId={params.courseId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
