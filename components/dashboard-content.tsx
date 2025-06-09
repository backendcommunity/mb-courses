"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Code,
  Trophy,
  Users,
  Calendar,
  TrendingUp,
  Play,
  CheckCircle,
  Clock,
  Star,
  Target,
  Zap,
} from "lucide-react"

interface DashboardContentProps {
  onNavigate: (path: string) => void
}

export function DashboardContent({ onNavigate }: DashboardContentProps) {
  const stats = [
    {
      title: "Courses Completed",
      value: "12",
      change: "+2 this month",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Projects Built",
      value: "8",
      change: "+3 this month",
      icon: Code,
      color: "text-green-600",
    },
    {
      title: "XP Earned",
      value: "2,450",
      change: "+340 this week",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "Study Streak",
      value: "15 days",
      change: "Keep it up!",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentActivity = [
    {
      type: "course",
      title: "Completed Node.js Fundamentals",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      type: "project",
      title: "Started REST API Project",
      time: "1 day ago",
      icon: Play,
      color: "text-blue-600",
    },
    {
      type: "quiz",
      title: "Aced JavaScript Quiz",
      time: "2 days ago",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      type: "bootcamp",
      title: "Joined Full-Stack Bootcamp",
      time: "3 days ago",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  const quickActions = [
    {
      title: "Continue Learning",
      description: "Resume your current course",
      action: () => onNavigate("/dashboard/courses"),
      icon: BookOpen,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Start Project",
      description: "Build something new",
      action: () => onNavigate("/dashboard/projects"),
      icon: Code,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Take Interview",
      description: "Practice your skills",
      action: () => onNavigate("/dashboard/interviews"),
      icon: Target,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Join Community",
      description: "Connect with others",
      action: () => onNavigate("/dashboard/community"),
      icon: Users,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  const currentGoals = [
    {
      title: "Complete React Mastery",
      progress: 75,
      target: "End of month",
      color: "bg-blue-500",
    },
    {
      title: "Build 3 Projects",
      progress: 66,
      target: "This quarter",
      color: "bg-green-500",
    },
    {
      title: "Earn 5000 XP",
      progress: 49,
      target: "This month",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back! 👋</h1>
        <p className="text-muted-foreground text-sm md:text-base">Ready to continue your backend mastery journey?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <Icon className={`h-6 w-6 md:h-8 md:w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Jump into your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 justify-start hover:shadow-md transition-all"
                      onClick={action.action}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className={`p-2 rounded-lg ${action.color} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">{action.title}</p>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest achievements and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Icon className={`h-5 w-5 ${activity.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals & Progress */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Current Goals
              </CardTitle>
              <CardDescription>Track your learning objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{goal.title}</p>
                    <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{goal.target}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming
              </CardTitle>
              <CardDescription>Don't miss these events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg border border-dashed border-muted-foreground/25">
                <p className="text-sm font-medium">Live Coding Session</p>
                <p className="text-xs text-muted-foreground">Tomorrow at 2:00 PM</p>
              </div>
              <div className="p-3 rounded-lg border border-dashed border-muted-foreground/25">
                <p className="text-sm font-medium">Project Deadline</p>
                <p className="text-xs text-muted-foreground">In 3 days</p>
              </div>
              <div className="p-3 rounded-lg border border-dashed border-muted-foreground/25">
                <p className="text-sm font-medium">Bootcamp Week 2</p>
                <p className="text-xs text-muted-foreground">Next Monday</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
