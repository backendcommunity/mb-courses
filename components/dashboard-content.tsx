"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Trophy, Users, Zap, Calendar, Star, TrendingUp } from "lucide-react"
import { routes } from "@/lib/routes"

interface DashboardContentProps {
  onNavigate: (path: string) => void
}

export function DashboardContent({ onNavigate }: DashboardContentProps) {
  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome back, Developer! 👋
        </h1>
        <p className="text-muted-foreground">Continue your backend mastery journey</p>
      </div>

      {/* Quick Stats - Clean card design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Points</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2,847</div>
            <p className="text-xs text-muted-foreground">+180 from last week</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">3 in progress</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Built</CardTitle>
            <Code className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8</div>
            <p className="text-xs text-muted-foreground">2 this month</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Trophy className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">15 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning Section - Clean layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Node.js Advanced Concepts</h4>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  In Progress
                </Badge>
              </div>
              <Progress value={68} className="h-2" />
              <p className="text-sm text-muted-foreground">Chapter 8: Event Loop Deep Dive</p>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={() => onNavigate(routes.courseWatch("nodejs-advanced", "event-loop"))}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-accent" />
              Current Project
            </CardTitle>
            <CardDescription>Your active project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">E-commerce API</h4>
                <Badge variant="outline" className="border-accent/30 text-accent">
                  Day 12/30
                </Badge>
              </div>
              <Progress value={40} className="h-2" />
              <p className="text-sm text-muted-foreground">Building authentication system</p>
              <Button
                size="sm"
                variant="outline"
                className="border-accent/30 text-accent hover:bg-accent/10"
                onClick={() => onNavigate(routes.project30Detail("ecommerce-api"))}
              >
                Continue Building
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Minimal design */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-border hover:bg-primary/5 hover:border-primary/30"
              onClick={() => onNavigate(routes.courses)}
            >
              <BookOpen className="h-6 w-6 text-primary" />
              Browse Courses
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-border hover:bg-accent/5 hover:border-accent/30"
              onClick={() => onNavigate(routes.project30)}
            >
              <Calendar className="h-6 w-6 text-accent" />
              30-Day Projects
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-border hover:bg-yellow-500/5 hover:border-yellow-500/30"
              onClick={() => onNavigate(routes.lands)}
            >
              <Trophy className="h-6 w-6 text-yellow-500" />
              MB Lands
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-border hover:bg-green-500/5 hover:border-green-500/30"
              onClick={() => onNavigate(routes.community)}
            >
              <Users className="h-6 w-6 text-green-500" />
              Community
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity - Clean list design */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Completed quiz: "Database Indexing Strategies"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                +50 XP
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Started new course: "Microservices Architecture"</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Deployed project: "Real-time Chat App"</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                +200 XP
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements - Clean grid layout */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-medium">Code Warrior</p>
                <p className="text-sm text-muted-foreground">Complete 10 coding challenges</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Knowledge Seeker</p>
                <p className="text-sm text-muted-foreground">Complete 5 courses</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">Community Helper</p>
                <p className="text-sm text-muted-foreground">Help 10 community members</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
