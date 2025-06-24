"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapWatchPage } from "@/components/pages/roadmap-watch";
import { useRouter } from "next/navigation";

interface RoadmapWatchPageRouteProps {
  params: {
    roadmapId: string;
  };
}

export default function RoadmapWatchPageRoute({
  params,
}: RoadmapWatchPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapWatchPage
        roadmapId={params.roadmapId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
