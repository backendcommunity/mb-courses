"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapVideoWatchPage } from "@/components/pages/roadmap-video-watch";
import { useRouter } from "next/navigation";

interface RoadmapVideoPageRouteProps {
  params: {
    roadmapId: string;
    videoId: string;
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
      <RoadmapVideoWatchPage
        roadmapId={params.roadmapId}
        videoId={params.videoId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
