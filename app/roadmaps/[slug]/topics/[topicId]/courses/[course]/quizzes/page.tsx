"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseQuizzesPage } from "@/components/pages/roadmap-course-quizzes";
import { useParams, useRouter } from "next/navigation";

type RoadmapCourseQuizzesPageRouteProps = {
  slug: string;
  course: string;
  topicId: string;
};

export default function RoadmapCourseQuizzesPageRoute() {
  const router = useRouter();
  const { slug, course, topicId } =
    useParams() as RoadmapCourseQuizzesPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseQuizzesPage
        roadmapId={slug}
        courseId={course}
        topicId={topicId}
        onNavigate={handleNavigate}
        onStartQuiz={() => {}}
      />
    </DashboardLayout>
  );
}
