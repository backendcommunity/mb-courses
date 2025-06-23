"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseQuizzesPage } from "@/components/pages/roadmap-course-quizzes";
import { useRouter } from "next/navigation";

interface RoadmapCourseQuizzesPageRouteProps {
  params: {
    roadmapId: string;
    courseId: string;
  };
}

export default function RoadmapCourseQuizzesPageRoute({
  params,
}: RoadmapCourseQuizzesPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseQuizzesPage
        roadmapId={params.roadmapId}
        courseId={params.courseId}
        milestoneId="m1"
        onBack={() => router.back()}
        onStartQuiz={() => {}}
      />
    </DashboardLayout>
  );
}
