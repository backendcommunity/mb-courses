"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Project30ListingPage } from "@/components/pages/project30-listing";
import { useRouter } from "next/navigation";

export default function Project30PageRoute() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <DashboardLayout>
      <Project30ListingPage onNavigate={handleNavigate} />
    </DashboardLayout>
  );
}
