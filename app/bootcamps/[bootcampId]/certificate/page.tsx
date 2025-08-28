"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BootcampCertificatePage } from "@/components/pages/bootcamp-certificate";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type BootcampCertificatePageRouteProps = {
  bootcampId: string;
};

export default function BootcampCertificatePageRoute() {
  const router = useRouter();
  const { bootcampId } = useParams() as BootcampCertificatePageRouteProps;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <BootcampCertificatePage id={bootcampId} onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
