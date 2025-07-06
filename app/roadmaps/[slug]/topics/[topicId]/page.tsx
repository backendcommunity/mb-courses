"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapWatchPage } from "@/components/pages/roadmap-watch";
import { useParams, useRouter } from "next/navigation";

export default function RoadmapWatchPageRoute({}) {
  const { slug, topicId } = useParams() as { slug: string; topicId: string };
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapWatchPage
        slug={slug}
        topicId={topicId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
