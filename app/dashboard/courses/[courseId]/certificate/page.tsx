"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseCertificatePage } from "@/components/pages/course-certificate";
import { useRouter } from "next/navigation";

interface CourseCertificatePageRouteProps {
  params: {
    courseId: string;
  };
}

export default function CourseCertificatePageRoute({
  params,
}: CourseCertificatePageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseCertificatePage
        courseId={params.courseId}
        onNavigate={handleNavigate}
      />
    </DashboardLayout>
  );
}
