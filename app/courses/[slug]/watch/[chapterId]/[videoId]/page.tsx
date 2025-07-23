"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseWatchPage } from "@/components/pages/course-watch";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type CourseWatchPageRouteProps = {
  slug: string;
  chapterId: string;
  videoId: string;
};

export default function CourseWatchPageRoute() {
  const router = useRouter();

  const { slug, chapterId, videoId } = useParams() as CourseWatchPageRouteProps;

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
