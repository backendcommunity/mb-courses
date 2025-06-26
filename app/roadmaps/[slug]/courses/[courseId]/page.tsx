"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCoursePreviewPage } from "@/components/pages/roadmap-course-preview";
import { getRoadmapById } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface RoadmapDetailPageRouteProps {
  roadmapId: string;
  courseId: string;
}

export default function RoadmapDetailPageRoute() {
  const { roadmapId, courseId } = useParams as RoadmapDetailPageRouteProps;
  const router = useRouter();
  const roadmap = getRoadmapById(roadmapId);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCoursePreviewPage
        roadmapId={roadmapId}
        milestoneId={`${"m1"}`}
        courseId={courseId}
        onBack={() => router.back()}
        onEnroll={() => {}}
        onStartWatching={() => {}}
      />
    </DashboardLayout>
  );
}
