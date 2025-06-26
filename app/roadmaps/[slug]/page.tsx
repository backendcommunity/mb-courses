"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapDetailPage } from "@/components/pages/roadmap-detail";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface RoadmapDetailPageRouteProps {
  params: {
    slug: string;
  };
}

export default function RoadmapDetailPageRoute({
  params,
}: RoadmapDetailPageRouteProps) {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapDetailPage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
