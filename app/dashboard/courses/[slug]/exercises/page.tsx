"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseExercisesPage } from "@/components/pages/course-exercises";
import { useRouter } from "next/navigation";

interface CourseExercisesPageRouteProps {
  params: {
    courseId: string;
  };
}

export default function CourseExercisesPageRoute({
  params,
}: CourseExercisesPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseExercisesPage
        courseId={params.courseId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
