"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, CheckCircle2, Users, Target, Trophy, Calendar } from "lucide-react"
import { useAppStore } from "@/lib/store"

interface BootcampDashboardPageProps {
  bootcampId: string
  onNavigate?: (route: string) => void
}

export function BootcampDashboardPage({ bootcampId, onNavigate }: BootcampDashboardPageProps) {
  const store = useAppStore()
  const bootcamp = store.getBootcamps().find((b) => b.id === bootcampId)

  if (!bootcamp) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bootcamp not found</h1>
          <Button onClick={() => onNavigate?.("/dashboard/bootcamps")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bootcamps
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => onNavigate?.(`/dashboard/bootcamps/${bootcampId}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{bootcamp.title} Dashboard</h1>
          <p className="text-muted-foreground">Week 4 of 12 • 33% Complete</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-[#0E1F33] to-[#13AECE] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Your Bootcamp Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Overall Progress</span>
              <span>33%</span>
            </div>
            <Progress value={33} className="h-3" />
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-xs text-blue-100">Current Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-blue-100">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-blue-100">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">48</div>
                <div className="text-xs text-blue-100">Hours Invested</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Week */}
          <Card>
            <CardHeader>
              <CardTitle>Current Week: Backend Fundamentals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { title: "Express.js Setup", completed: true, type: "video" },
                  { title: "Routing & Middleware", completed: true, type: "video" },
                  { title: "Building REST APIs", completed: false, type: "video", current: true },
                  { title: "API Project", completed: false, type: "project" },
                ].map((lesson, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      lesson.current ? "border-blue-200 bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{lesson.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {lesson.type}
                      </Badge>
                    </div>
                    {lesson.current && <Button size="sm">Continue</Button>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "Live Q&A Session",
                  date: "Tomorrow, 2:00 PM EST",
                  type: "Live Session",
                },
                {
                  title: "Project Review",
                  date: "Friday, 10:00 AM EST",
                  type: "Review",
                },
                {
                  title: "Career Workshop",
                  date: "Next Monday, 1:00 PM EST",
                  type: "Workshop",
                },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Attendance Rate</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Assignment Score</span>
                  <span className="font-medium">88%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Peer Ranking</span>
                  <span className="font-medium">#12 of 25</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Days Until Graduation</span>
                  <span className="font-medium">56 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cohort */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Cohort
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">25</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Still Active</div>
              </div>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Join Study Group
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { title: "Week 3 Completed", icon: "🎯" },
                { title: "Perfect Attendance", icon: "📅" },
                { title: "Top Performer", icon: "⭐" },
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                  <span className="text-lg">{achievement.icon}</span>
                  <span className="text-sm font-medium">{achievement.title}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
