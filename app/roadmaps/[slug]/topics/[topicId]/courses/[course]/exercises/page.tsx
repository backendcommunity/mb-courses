"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseExercisesPage } from "@/components/pages/roadmap-course-exercises";
import { useParams, useRouter } from "next/navigation";

type RoadmapCourseExercisesPageRouteProps = {
  slug: string;
  topicId: string;
  course: string;
};

export default function RoadmapCourseExercisesPageRoute() {
  const { course, slug, topicId } =
    useParams() as RoadmapCourseExercisesPageRouteProps;
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseExercisesPage
        roadmapId={slug}
        courseId={course}
        topicId={topicId}
        onNavigate={handleNavigate}
        onStartExercise={() => {}}
      />
    </DashboardLayout>
  );
}
