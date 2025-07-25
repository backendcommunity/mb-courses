"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseWatchPage } from "@/components/pages/x_roadmap-course-watch";
import { useParams, useRouter } from "next/navigation";

type RoadmapVideoPageRouteProps = {
  roadmapId: string;
  videoId: string;
  courseId: string;
  chapterId: string;
};

export default function RoadmapVideoWatchRoute({}) {
  const router = useRouter();
  const { roadmapId, videoId, courseId, chapterId } =
    useParams() as RoadmapVideoPageRouteProps;
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseWatchPage
        roadmapId={roadmapId}
        videoId={videoId}
        courseId={courseId}
        milestoneId={"m1"}
        chapterId={chapterId}
        onBack={() => router.back()}
        onNavigateToExercise={() => {}}
        onNavigateToPlayground={() => {}}
        onNavigateToQuiz={() => {}}
      />
    </DashboardLayout>
  );
}
