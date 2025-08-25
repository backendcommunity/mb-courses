"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BootcampWatchPage } from "@/components/pages/bootcamp-video-watch";

import { useRouter } from "next/navigation";

interface BootcampWatchPageRouteProps {
  params: {
    bootcampId: string;
    weekId: string;
    slug: string;
  };
}

export default function BootcampWatchPageRoute({
  params,
}: BootcampWatchPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <BootcampWatchPage
        slug={params.bootcampId}
        chapterId={params.weekId}
        videoId={params.slug}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
