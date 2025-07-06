"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCoursePreviewPage } from "@/components/pages/roadmap-course-preview";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type RoadmapDetailPageRouteProps = {
  slug: string;
  course: string;
  topicId: string;
};

export default function RoadmapDetailPageRoute() {
  const { slug, course, topicId } = useParams() as RoadmapDetailPageRouteProps;
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCoursePreviewPage
        onNavigate={handleNavigate}
        roadmapId={slug}
        topicId={topicId}
        slug={course}
        onBack={() => router.back()}
        onEnroll={() => {}}
        onStartWatching={() => {}}
      />
    </DashboardLayout>
  );
}
