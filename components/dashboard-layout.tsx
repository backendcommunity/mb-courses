"use client"

import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NavigationBar } from "@/components/navigation-bar"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPath: string
  onNavigate: (path: string) => void
}

export function DashboardLayout({ children, currentPath, onNavigate }: DashboardLayoutProps) {
  const isMobile = useMobile()

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar currentPath={currentPath} onNavigate={onNavigate} />
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <NavigationBar onNavigate={onNavigate} />
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
