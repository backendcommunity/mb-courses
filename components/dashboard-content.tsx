"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code2, Trophy, Users, Star, Clock, Award, ArrowRight, Play, CheckCircle, Flame } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { routes } from "@/lib/routes"

export function DashboardContent() {
  const router = useRouter()
  const store = useAppStore()
  const user = store.getUser()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  // Mock data for dashboard
  const stats = {
    coursesCompleted: 12,
    totalCourses: 45,
    projectsBuilt: 8,
    xpEarned: user.xp,
    currentStreak: 7,
    certificatesEarned: 3,
  }

  const recentActivity = [
    {
      id: 1,
      type: "course",
      title: "Completed Node.js Fundamentals",
      description: "Chapter 5: Express.js Routing",
      time: "2 hours ago",
      xp: 150,
      icon: BookOpen,
    },
    {
      id: 2,
      type: "project",
      title: "Built REST API Project",
      description: "E-commerce Backend API",
      time: "1 day ago",
      xp: 300,
      icon: Code2,
    },
    {
      id: 3,
      type: "challenge",
      title: "Completed Daily Challenge",
      description: "Algorithm: Binary Search",
      time: "2 days ago",
      xp: 100,
      icon: Trophy,
    },
  ]

  const quickActions = [
    {
      title: "Continue Learning",
      description: "Resume your current course",
      icon: Play,
      action: () => handleNavigate(routes.courses),
      color: "bg-blue-500",
    },
    {
      title: "Start Project",
      description: "Build something new",
      icon: Code2,
      action: () => handleNavigate(routes.projects),
      color: "bg-green-500",
    },
    {
      title: "Take Challenge",
      description: "Test your skills",
      icon: Trophy,
      action: () => handleNavigate(routes.lands),
      color: "bg-purple-500",
    },
    {
      title: "Join Community",
      description: "Connect with peers",
      icon: Users,
      action: () => handleNavigate(routes.community),
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Ready to continue your backend engineering journey?</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10">
            <Flame className="h-3 w-3 mr-1 text-orange-500" />
            {stats.currentStreak} day streak
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.coursesCompleted}/{stats.totalCourses}
            </div>
            <Progress value={(stats.coursesCompleted / stats.totalCourses) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Built</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projectsBuilt}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Earned</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.xpEarned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Level {user.level} Engineer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
            <p className="text-xs text-muted-foreground">Industry recognized</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary/5"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest achievements and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border">
                <div className="p-2 rounded-lg bg-primary/10">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
                <Badge variant="secondary">+{activity.xp} XP</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Path Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Current Learning Path</CardTitle>
            <CardDescription>Backend Engineering Mastery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>65%</span>
              </div>
              <Progress value={65} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Node.js Fundamentals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Database Design</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full border-2 border-primary bg-primary/20" />
                <span className="text-sm font-medium">System Architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded-full border-2 border-muted" />
                <span className="text-sm text-muted-foreground">Microservices</span>
              </div>
            </div>

            <Button className="w-full" onClick={() => handleNavigate(routes.paths)}>
              Continue Learning Path
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
