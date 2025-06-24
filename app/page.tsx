"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardContent } from "@/components/dashboard-content";
import { KapAIAssistant } from "@/components/kap-ai-assistant";

export default function DashboardPage() {
  console.log("Hi Dashboard");
  return (
    <DashboardLayout>
      <DashboardContent />
      <KapAIAssistant />
    </DashboardLayout>
  );
}
