"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseWatchPage } from "@/components/pages/roadmap-course-watch";
import { useRouter } from "next/navigation";

interface RoadmapVideoPageRouteProps {
  params: {
    roadmapId: string;
    videoId: string;
    courseId: string;
    chapterId: string;
  };
}

export default function RoadmapVideoWatchRoute({
  params,
}: RoadmapVideoPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseWatchPage
        roadmapId={params.roadmapId}
        videoId={params.videoId}
        courseId={params.courseId}
        milestoneId={"m1"}
        chapterId={params.chapterId}
        onBack={() => router.back()}
        onNavigateToExercise={() => {}}
        onNavigateToPlayground={() => {}}
        onNavigateToQuiz={() => {}}
      />
    </DashboardLayout>
  );
}
