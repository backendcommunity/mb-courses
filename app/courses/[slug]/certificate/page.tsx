"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CourseCertificatePage } from "@/components/pages/course-certificate";
import { useRouter } from "next/navigation";
import React from "react";

interface CourseCertificatePageRouteProps {
  params: {
    slug: string;
  };
}

export default function CourseCertificatePageRoute({
  params,
}: CourseCertificatePageRouteProps) {
  const router = useRouter();
  const { slug } = React.use(params);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CourseCertificatePage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
