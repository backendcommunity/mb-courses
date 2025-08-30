"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BootcampVideoWatchPage } from "@/components/pages/bootcamp-video-watch";

import { useParams, useRouter } from "next/navigation";

type BootcampWatchPageRouteProps = {
  bootcampId: string;
  cohort: string;
  weekId: string;
  slug: string;
};

export default function BootcampWatchPageRoute() {
  const router = useRouter();

  const { bootcampId, weekId, slug, cohort } =
    useParams() as BootcampWatchPageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <BootcampVideoWatchPage
        slug={slug}
        weekId={weekId}
        cohort={cohort}
        id={bootcampId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
