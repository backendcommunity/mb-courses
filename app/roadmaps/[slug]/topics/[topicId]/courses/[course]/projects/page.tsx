"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { RoadmapCourseProjectsPage } from "@/components/pages/roadmap-course-projects";
import { useRouter } from "next/navigation";

interface RoadmapCourseProjectsPageRouteProps {
  params: {
    roadmapId: string;
    courseId: string;
  };
}

export default function RoadmapCourseProjectsPageRoute({
  params,
}: RoadmapCourseProjectsPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <RoadmapCourseProjectsPage
        roadmapId={params.roadmapId}
        courseId={params.courseId}
        milestoneId="m1"
        onBack={() => router.back()}
        onStartProject={() => {}}
      />
    </DashboardLayout>
  );
}
