"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseExercisesPage } from "@/components/pages/roadmap-course-exercises";
import { useRouter } from "next/navigation";

interface RoadmapCourseExercisesPageRouteProps {
  params: {
    roadmapId: string;
    courseId: string;
  };
}

export default function RoadmapCourseExercisesPageRoute({
  params,
}: RoadmapCourseExercisesPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseExercisesPage
        roadmapId={params.roadmapId}
        courseId={params.courseId}
        milestoneId="m1"
        onBack={() => router.back()}
        onStartExercise={() => {}}
      />
    </DashboardLayout>
  );
}
