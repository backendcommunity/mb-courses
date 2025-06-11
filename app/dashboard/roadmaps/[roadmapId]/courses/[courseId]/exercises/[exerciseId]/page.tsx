"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseExercisePage } from "@/components/pages/roadmap-course-exercise";
import { useRouter } from "next/navigation";

interface RoadmapCourseExercisePageProps {
  params: {
    roadmapId: string;
    exerciseId: string;
    courseId: string;
  };
}

export default function RoadmapCourseExercisePageRoute({
  params,
}: RoadmapCourseExercisePageProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseExercisePage
        roadmapId={params.roadmapId}
        exerciseId={params.exerciseId}
        courseId={params.courseId}
        milestoneId={"m1"}
        onBack={() => router.back()}
        onComplete={() => {}}
      />
    </DashboardLayout>
  );
}
