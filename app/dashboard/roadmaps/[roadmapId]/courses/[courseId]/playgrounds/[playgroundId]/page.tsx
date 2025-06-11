"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCoursePlaygroundPage } from "@/components/pages/roadmap-course-playground";
import { useRouter } from "next/navigation";

interface RoadmapCoursePlaygroundPageProps {
  params: {
    roadmapId: string;
    playgroundId: string;
    courseId: string;
  };
}

export default function RoadmapCoursePlaygroundPageRoute({
  params,
}: RoadmapCoursePlaygroundPageProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCoursePlaygroundPage
        roadmapId={params.roadmapId}
        playgroundId={params.playgroundId}
        courseId={params.courseId}
        milestoneId={"m1"}
        onBack={() => router.back()}
        onComplete={() => {}}
      />
    </DashboardLayout>
  );
}
