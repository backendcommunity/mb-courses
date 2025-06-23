"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseExercisePage } from "@/components/pages/course-exercise";
import { useRouter } from "next/navigation";

interface CourseExercisePageProps {
  params: {
    exerciseId: string;
    courseId: string;
  };
}

export default function CourseExercisePageRoute({
  params,
}: CourseExercisePageProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseExercisePage
        exerciseId={params.exerciseId}
        courseId={params.courseId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
