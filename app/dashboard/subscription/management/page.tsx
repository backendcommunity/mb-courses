"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { SubscriptionManagementPage } from "@/components/pages/subscription-management";
import { useRouter } from "next/navigation";

interface SubscriptionManagementPageRouteProps {
  params: {};
}

export default function SubscriptionManagementPageRoute({
  params,
}: SubscriptionManagementPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <SubscriptionManagementPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
