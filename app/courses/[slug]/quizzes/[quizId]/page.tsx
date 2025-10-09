"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseQuizPage } from "@/components/pages/course-quiz";
import { useParams, useRouter } from "next/navigation";

type CourseQuizPageRouteProps = {
  slug: string;
  quizId: string;
};

export default function CourseQuizPageRoute() {
  const router = useRouter();
  const { slug, quizId } = useParams() as CourseQuizPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseQuizPage
        courseId={slug}
        onNavigate={handleNavigate}
        quizId={quizId}
        handleQuizSubmit={() => {}}
      />
    </DashboardLayout>
  );
}
