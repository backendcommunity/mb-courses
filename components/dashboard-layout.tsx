"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { NavigationBar } from "@/components/navigation-bar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { useMobile } from "@/hooks/use-mobile";
import { KapAIAssistant } from "./kap-ai-assistant";
import { useAppStore } from "@/lib/store";
import { updateUser, User } from "@/lib/data";
import ProfitWellScript from "./ProfitWellScript";
import { Loader } from "./ui/loader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useMobile();
  const store = useAppStore();
  const pathname = usePathname();
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  async function load() {
    setLoading(true);
    const user = await store.getUser();
    if (!user) return;

    setUser(user);
    updateUser(user);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  if (loading || !user) return <Loader />;

  return (
    <>
      <ProfitWellScript userEmail={user?.email!} />
      <div className="flex min-h-screen bg-background">
        {/* Sidebar - conditionally shown based on sidebarOpen state */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-72 md:translate-x-0 z-40 transition-transform duration-300 ease-in-out`}
        >
          <DashboardSidebar
            currentPath={pathname}
            onNavigate={handleNavigate}
            isMobile={isMobile}
          />
        </div>

        {/* Overlay for mobile sidebar */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-72">
          <NavigationBar
            onNavigate={handleNavigate}
            onMenuToggle={toggleSidebar}
            isMobile={isMobile}
          />
          <main className="flex-1 overflow-auto p-8">{children}</main>
          <KapAIAssistant />
        </div>
      </div>
    </>
  );
}
