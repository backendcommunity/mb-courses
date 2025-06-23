"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { InterviewsPage } from "@/components/pages/interviews"
import { useRouter } from "next/navigation"

export default function InterviewsPageRoute() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <InterviewsPage onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
