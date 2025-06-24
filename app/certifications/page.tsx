"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
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
      <div>test</div>
    </DashboardLayout>
  );
}
