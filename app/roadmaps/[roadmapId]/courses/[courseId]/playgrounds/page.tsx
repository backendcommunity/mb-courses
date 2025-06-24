"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCoursePlaygroundsPage } from "@/components/pages/roadmap-course-playgrounds";
import { useRouter } from "next/navigation";
import React from "react";

interface RoadmapCoursePlaygroundsPageRouteProps {
  params: {
    roadmapId: string;
    courseId: string;
  };
}

export default function RoadmapCoursePlaygroundsPageRoute({
  params,
}: RoadmapCoursePlaygroundsPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCoursePlaygroundsPage
        roadmapId={params.roadmapId}
        courseId={params.courseId}
        milestoneId="m1"
        onBack={() => router.back()}
        onStartPlayground={() => {}}
      />
    </DashboardLayout>
  );
}
