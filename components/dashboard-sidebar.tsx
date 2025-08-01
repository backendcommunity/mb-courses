"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Code2,
  Trophy,
  Users,
  Briefcase,
  Star,
  Zap,
  Target,
  TrendingUp,
  Sparkles,
  Crown,
  Gift,
  Award,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { useUser } from "@/hooks/use-user";
import { useLevel } from "@/hooks/use-level";
import { logout } from "@/lib/auth";

interface DashboardSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isMobile: boolean;
}

const navigationData = {
  learn: [
    {
      title: "Courses",
      url: routes.courses,
      icon: BookOpen,
      active: true,
    },
    {
      title: "Bootcamps",
      url: routes.bootcamps,
      icon: Zap,
      active: false,
    },
    {
      title: "Learning Paths",
      url: routes.paths,
      icon: Target,
      active: false,
    },
    {
      title: "Roadmaps",
      url: routes.roadmaps,
      icon: TrendingUp,
      active: true,
    },
  ],
  build: [
    {
      title: "MB Projects",
      url: routes.projects,
      icon: Code2,
      active: true,
    },
    {
      title: "Project30",
      url: routes.project30,
      icon: Sparkles,
      active: true,
    },
    {
      title: "MB Lands",
      url: routes.lands,
      icon: Trophy,
      active: false,
    },
  ],
  grow: [
    {
      title: "MB Interviews",
      url: routes.interviews,
      icon: Briefcase,
      active: false,
    },
    {
      title: "Mock Interviews",
      url: routes.mockInterviews,
      icon: Users,
      active: false,
    },
    {
      title: "Certifications",
      url: "/certifications",
      icon: Award,
      active: false,
    },
    {
      title: "Community",
      url: routes.community,
      icon: Users,
      active: false,
    },
  ],
};

export function DashboardSidebar({
  currentPath,
  onNavigate,
  isMobile,
}: DashboardSidebarProps) {
  const [mounted, setMounted] = useState(true);
  const user = useUser();
  const level = useLevel();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex fixed w-72 flex-col h-full bg-sidebar border-r border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => onNavigate(routes.dashboard)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 rounded-lg transition-colors w-full"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <span className="text-sm font-bold">MB</span>
          </div>
          {/* <BrandLogo /> */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Masteringbackend
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Career Platform
            </span>
          </div>
        </button>

        {/* User Progress Card */}
        <div className="mt-4 rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">
              Level {user?.level} Engineer
            </span>
            {user?.isPremium ? (
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 text-yellow-600 border-yellow-400/30 dark:text-yellow-400"
              >
                <Crown className="h-3 w-3 mr-1" />
                {user?.subscription?.name}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 text-yellow-600 border-yellow-400/30 dark:text-yellow-400"
              >
                Free
              </Badge>
            )}
          </div>
          <Progress
            value={(user?.points / user?.xpToNextLevel) * 100}
            className="h-2 mb-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{user?.points?.toLocaleString()} MB</span>
            <span>
              {level?.mbToNextLevel?.toLocaleString()} MB to Level{" "}
              {user?.level + 1}
            </span>
          </div>
        </div>

        {/* MB Balance */}
        <div className="mt-3">
          <Button
            variant="outline"
            className="w-full justify-between border-border hover:bg-primary/10 hover:border-primary/50 transition-colors"
            onClick={() => onNavigate(routes.xpStore)}
          >
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-primary" />
              <span className="text-primary">
                {user?.points?.toLocaleString()} MB
              </span>
            </div>
            <span className="text-xs text-primary">Redeem</span>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Learn Section */}
        <div className="px-3 py-2">
          <h3 className="px-4 text-xs font-medium text-muted-foreground mb-1">
            Learn
          </h3>
          <div className="space-y-1">
            {navigationData.learn.map((item) => (
              <button
                key={item.title}
                onClick={() => onNavigate(item.url)}
                className={`flex w-full items-center justify-between px-4 py-2 rounded-md hover:bg-primary/10 transition-colors ${
                  currentPath === item.url || currentPath.startsWith(item.url)
                    ? "bg-primary/15 text-primary"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>

                  {!item.active && <Badge variant={"secondary"}>WIP</Badge>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Build Section */}
        <div className="px-3 py-2">
          <h3 className="px-4 text-xs font-medium text-muted-foreground mb-1">
            Build
          </h3>
          <div className="space-y-1">
            {navigationData.build.map((item) => (
              <button
                key={item.title}
                onClick={() => onNavigate(item.url)}
                className={`flex w-full items-center justify-between px-4 py-2 rounded-md hover:bg-primary/10 transition-colors ${
                  currentPath === item.url || currentPath.startsWith(item.url)
                    ? "bg-primary/15 text-primary"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {!item.active && <Badge variant="secondary">WIP</Badge>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grow Section */}
        <div className="px-3 py-2">
          <h3 className="px-4 text-xs font-medium text-muted-foreground mb-1">
            Grow
          </h3>
          <div className="space-y-1">
            {navigationData.grow.map((item) => (
              <button
                key={item.title}
                onClick={() => onNavigate(item.url)}
                className={`flex w-full items-center justify-between px-4 py-2 rounded-md hover:bg-primary/10 transition-colors ${
                  currentPath === item.url || currentPath.startsWith(item.url)
                    ? "bg-primary/15 text-primary"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {!item.active && <Badge variant="secondary">WIP</Badge>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage
                src={user?.avatar || "/placeholder.svg"}
                alt={user?.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              await logout();
              onNavigate(routes.logout);
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
