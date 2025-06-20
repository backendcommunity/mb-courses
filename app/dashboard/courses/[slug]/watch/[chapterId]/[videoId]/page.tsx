"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseWatchPage } from "@/components/pages/course-watch";
import { useRouter } from "next/navigation";
import React from "react";

interface CourseWatchPageRouteProps {
  params: {
    slug: string;
    chapterId: string;
    videoId: string;
  };
}

export default function CourseWatchPageRoute({
  params,
}: CourseWatchPageRouteProps) {
  const router = useRouter();

  const { slug, chapterId, videoId } = React.use(params);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseWatchPage
        slug={slug}
        chapterId={chapterId}
        videoId={videoId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
