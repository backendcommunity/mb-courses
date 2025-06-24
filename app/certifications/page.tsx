"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CommunityPage } from "@/components/pages/community";
import { useRouter } from "next/navigation";

interface CertificationRouteProps {
  params: {};
}

export default function CertificationRoute({
  params,
}: CertificationRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CommunityPage />
    </DashboardLayout>
  );
}
