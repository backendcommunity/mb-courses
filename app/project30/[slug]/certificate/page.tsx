"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Project30CertificatePage } from "@/components/pages/Project30CertificatePage";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type CourseCertificatePageRouteProps = {
  slug: string;
};

export default function CourseCertificatePageRoute() {
  const router = useRouter();
  const { slug } = useParams() as CourseCertificatePageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <Project30CertificatePage slug={slug} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
