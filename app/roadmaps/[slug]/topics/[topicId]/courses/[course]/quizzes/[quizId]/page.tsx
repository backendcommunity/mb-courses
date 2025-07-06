"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseQuizPage } from "@/components/pages/roadmap-course-quiz";
import { useParams, useRouter } from "next/navigation";

type RoadmapCourseQuizPageRouteProps = {
  slug: string;
  course: string;
  quizId: string;
};

export default function RoadmapCourseQuizPageRoute() {
  const router = useRouter();
  const { course, quizId, slug } =
    useParams() as RoadmapCourseQuizPageRouteProps;
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseQuizPage
        onNavigate={handleNavigate}
        roadmapId={slug}
        handleQuizSubmit={() => {}}
        courseId={course}
        quizId={quizId}
      />
    </DashboardLayout>
  );
}
