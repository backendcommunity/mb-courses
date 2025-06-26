"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapVideoWatchPage } from "@/components/pages/roadmap-video-watch";
import { useParams, useRouter } from "next/navigation";

export default function RoadmapVideoWatchRoute({}) {
  const router = useRouter();
  const { slug, videoId } = useParams() as { slug: string; videoId: string };
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapVideoWatchPage
        slug={slug}
        videoId={videoId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
