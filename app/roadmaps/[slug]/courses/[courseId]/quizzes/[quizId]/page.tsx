"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseQuizPage } from "@/components/pages/roadmap-course-quiz";
import { useRouter } from "next/navigation";

interface RoadmapCourseQuizPageRouteProps {
  params: {
    roadmapId: string;
    courseId: string;
    quizId: string;
  };
}

export default function RoadmapCourseQuizPageRoute({
  params,
}: RoadmapCourseQuizPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseQuizPage
        roadmapId={params.roadmapId}
        courseId={params.courseId}
        milestoneId="m1"
        onBack={() => router.back()}
        onComplete={() => {}}
        quizId={params.quizId}
      />
    </DashboardLayout>
  );
}
