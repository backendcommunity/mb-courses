"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseQuizPage } from "@/components/pages/course-quiz";
import { useRouter } from "next/navigation";

interface CourseQuizPageRouteProps {
  params: {
    roadmapId: string;
    courseId: string;
    quizId: string;
  };
}

export default function CourseQuizPageRoute({
  params,
}: CourseQuizPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseQuizPage
        courseId={params.courseId}
        onNavigate={handleNavigate}
        quizId={params.quizId}
      />
    </DashboardLayout>
  );
}
