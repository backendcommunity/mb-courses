"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { MockInterviewsPage } from "@/components/pages/mock-interviews"
import { useRouter } from "next/navigation"

export default function MockInterviewsPageRoute() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <MockInterviewsPage onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
