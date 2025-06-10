"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardContent } from "@/components/dashboard-content"
import { CoursesPage } from "@/components/pages/courses"
import { BootcampsPage } from "@/components/pages/bootcamps"
import { LearningPathsPage } from "@/components/pages/learning-paths"
import { RoadmapsPage } from "@/components/pages/roadmaps"
import { ProjectsPage } from "@/components/pages/projects"
import { Project30Page } from "@/components/pages/project30"
import { InterviewsPage } from "@/components/pages/interviews"
import { CommunityPage } from "@/components/pages/community"
import { routes } from "@/lib/routes"

export default function Dashboard() {
  const [currentPath, setCurrentPath] = useState(routes.dashboard)

  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path)
    setCurrentPath(path)
  }

  const renderContent = () => {
    if (currentPath === routes.dashboard) {
      return <DashboardContent onNavigate={handleNavigate} />
    } else if (currentPath === routes.courses || currentPath.startsWith(routes.courses)) {
      return <CoursesPage onNavigate={handleNavigate} />
    } else if (currentPath === routes.bootcamps || currentPath.startsWith(routes.bootcamps)) {
      return <BootcampsPage onNavigate={handleNavigate} />
    } else if (currentPath === routes.paths || currentPath.startsWith(routes.paths)) {
      return <LearningPathsPage onNavigate={handleNavigate} />
    } else if (currentPath === routes.roadmaps || currentPath.startsWith(routes.roadmaps)) {
      return <RoadmapsPage onNavigate={handleNavigate} />
    } else if (currentPath === routes.projects || currentPath.startsWith(routes.projects)) {
      return <ProjectsPage onNavigate={handleNavigate} />
    } else if (currentPath === routes.project30 || currentPath.startsWith(routes.project30)) {
      return <Project30Page onNavigate={handleNavigate} />
    } else if (currentPath === routes.interviews || currentPath.startsWith(routes.interviews)) {
      return <InterviewsPage onNavigate={handleNavigate} />
    } else if (currentPath === routes.community || currentPath.startsWith(routes.community)) {
      return <CommunityPage onNavigate={handleNavigate} />
    }

    // Default to dashboard
    return <DashboardContent onNavigate={handleNavigate} />
  }

  return (
    <DashboardLayout currentPath={currentPath} onNavigate={handleNavigate}>
      {renderContent()}
    </DashboardLayout>
  )
}
