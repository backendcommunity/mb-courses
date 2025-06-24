"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { SubscriptionPlansPage } from "@/components/pages/subscription-plans";
import { useRouter } from "next/navigation";

interface SubscriptionPlansPageRouteProps {
  params: {};
}

export default function SubscriptionPlansPageRoute({
  params,
}: SubscriptionPlansPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <SubscriptionPlansPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
