"use client"

import type React from "react"
import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NavigationBar } from "@/components/navigation-bar"
import { useMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPath: string
  onNavigate: (path: string) => void
}

export function DashboardLayout({ children, currentPath, onNavigate }: DashboardLayoutProps) {
  const isMobile = useMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Close sidebar when navigating on mobile
  const handleNavigate = (path: string) => {
    onNavigate(path)
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen flex w-full">
      {isMobile ? (
        <>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent side="left" className="p-0 w-[280px]">
              <DashboardSidebar currentPath={currentPath} onNavigate={handleNavigate} />
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex flex-col min-w-0">
            <NavigationBar onNavigate={onNavigate} onMenuToggle={() => setIsSidebarOpen(true)} />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </>
      ) : (
        <SidebarProvider>
          <DashboardSidebar currentPath={currentPath} onNavigate={onNavigate} />
          <SidebarInset className="flex-1 flex flex-col min-w-0">
            <NavigationBar onNavigate={onNavigate} />
            <main className="flex-1 overflow-auto">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      )}
    </div>
  )
}
