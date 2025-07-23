"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Project30DayPage } from "@/components/pages/project30-day";
import { useParams, useRouter } from "next/navigation";

type Project30DayPageRouteProps = {
  slug: string;
  dayNumber: string;
};

export default function Project30DayPageRoute() {
  const { slug, dayNumber } = useParams() as Project30DayPageRouteProps;
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <Project30DayPage
        slug={slug}
        dayNumber={dayNumber}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
