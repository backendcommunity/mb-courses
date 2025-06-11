"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Project30DayPage } from "@/components/pages/project30-day";
import { useRouter } from "next/navigation";

interface Project30DayPageRouteProps {
  params: {
    courseId: string;
    dayNumber: string;
  };
}

export default function Project30DayPageRoute({
  params,
}: Project30DayPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <Project30DayPage
        dayNumber={params.dayNumber}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
