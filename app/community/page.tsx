"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CommunityPage } from "@/components/pages/community";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CommunityPageRoute() {
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
