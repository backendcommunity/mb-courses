"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { InterviewDetailPage } from "@/components/pages/interview-detail"
import { useRouter } from "next/navigation"

interface InterviewDetailPageRouteProps {
  params: {
    interviewId: string
  }
}

export default function InterviewDetailPageRoute({ params }: InterviewDetailPageRouteProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <DashboardLayout>
      <InterviewDetailPage interviewId={params.interviewId} onNavigate={handleNavigate} />
    </DashboardLayout>
  )
}
