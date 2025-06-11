"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCoursePreviewPage } from "@/components/pages/roadmap-course-preview";
import { getRoadmapById } from "@/lib/data";
import { useRouter } from "next/navigation";

interface RoadmapDetailPageRouteProps {
  params: {
    roadmapId: string;
    courseId: string;
  };
}

export default function RoadmapDetailPageRoute({
  params,
}: RoadmapDetailPageRouteProps) {
  const router = useRouter();
  const roadmap = getRoadmapById(params.roadmapId);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCoursePreviewPage
        roadmapId={params.roadmapId}
        milestoneId={`${"m1"}`}
        courseId={params.courseId}
        onBack={() => router.back()}
        onEnroll={() => {}}
        onStartWatching={() => {}}
      />
    </DashboardLayout>
  );
}
