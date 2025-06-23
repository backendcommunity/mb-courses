"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapDetailPage } from "@/components/pages/roadmap-detail";
import { useRouter } from "next/navigation";
import React from "react";

interface RoadmapDetailPageRouteProps {
  params: {
    roadmapId: string;
  };
}

export default function RoadmapDetailPageRoute({
  params,
}: RoadmapDetailPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const { roadmapId } = React.use(params);

  return (
    <DashboardLayout>
      <RoadmapDetailPage roadmapId={roadmapId} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
