"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CheckoutPage } from "@/components/pages/checkout";
import { useRouter } from "next/navigation";

interface CheckoutPageRouteProps {
  params: {};
}

export default function CheckoutPageRoute({ params }: CheckoutPageRouteProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <CheckoutPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
