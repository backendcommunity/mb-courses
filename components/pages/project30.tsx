"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  PlayCircle,
  CalendarIcon,
  Trophy,
  Target,
  Clock,
  Video,
  CheckCircle2,
  Play,
  Lock,
  BookOpen,
  Star,
  ChevronRight,
  Crown,
  Gift,
  CreditCard,
  Database,
  Globe,
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useState } from "react"

interface Project30PageProps {
  courseId?: string
  onNavigate: (path: string) => void
}

export function Project30Page({ courseId = "backend-fundamentals", onNavigate }: Project30PageProps) {
  const store = useAppStore()
  const user = store.getUser()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  // Mock subscription data
  const subscription = {
    plan: "Pro", // Free, Pro, Enterprise
    status: "active",
    xpBalance: 2450,
  }

  // Mock Project30 data
  const project30Data = {
    currentDay: 15,
    totalDays: 30,
    streak: 7,
    completedLessons: 14,
    totalXP: 1250,
    rank: 42,
    totalParticipants: 1250,
    startDate: new Date("2024-05-20"),
    endDate: new Date("2024-06-18"),
    isActive: true,
    nextDeadline: "23:45:12",
    instructor: "Sarah Johnson",
    price: 49.99,
    enrolled: subscription.plan !== "Free", // Auto-enrolled if subscribed
  }

  // Complete 30-day curriculum
  const curriculum = [
    {
      week: 1,
      title: "Foundation Week",
      description: "Build your backend development foundation",
      days: [
        {
          day: 1,
          title: "Hello World API",
          description: "Create your first REST API with Express.js",
          duration: "25 min",
          technologies: ["Node.js", "Express"],
          difficulty: "Beginner",
          xpReward: 50,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          day: 2,
          title: "Database Connection",
          description: "Connect your API to MongoDB database",
          duration: "30 min",
          technologies: ["MongoDB", "Mongoose"],
          difficulty: "Beginner",
          xpReward: 75,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Database className="h-4 w-4" />,
        },
        // ... other days
      ],
    },
    // ... other weeks
  ]

  const dailyLessons = [
    {
      day: 15,
      title: "Building a Real-time Chat API",
      description: "Learn how to create a WebSocket-based chat API with rooms and user presence",
      duration: "32 minutes",
      technologies: ["Node.js", "Socket.io", "Redis"],
      status: project30Data.enrolled ? "in-progress" : "locked",
      xpReward: 100,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    // ... other lessons
  ]

  const leaderboard = [
    { rank: 1, name: "Alex Chen", lessons: 15, xp: 1450, streak: 15 },
    { rank: 2, name: "Sarah Kim", lessons: 15, xp: 1420, streak: 12 },
    { rank: 3, name: "Mike Johnson", lessons: 15, xp: 1380, streak: 15 },
    { rank: 42, name: "You", lessons: 14, xp: 1250, streak: 7 },
  ]

  const achievements = [
    {
      id: "1",
      title: "Week Warrior",
      description: "Complete 7 consecutive days",
      icon: "🔥",
      unlocked: true,
      progress: 100,
    },
    // ... other achievements
  ]

  const handlePurchase = (method: "subscription" | "individual" | "xp") => {
    switch (method) {
      case "subscription":
        onNavigate("/dashboard/subscription-plans")
        break
      case "individual":
        onNavigate(`/dashboard/checkout?type=project30&id=${courseId}`)
        break
      case "xp":
        onNavigate(`/dashboard/xp-store?redeem=project30&id=${courseId}`)
        break
    }
    setShowPaymentDialog(false)
  }

  const getXPCost = (price: number) => {
    return Math.round(price * 50) // 1 dollar = 50 XP
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Advanced":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Expert":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-600" />
      default:
        return <Lock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <PlayCircle className="h-6 w-6 text-[#F2C94C]" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Project30</h1>
            <Badge variant="outline" className="bg-[#F2C94C]/10 text-[#F2C94C] border-[#F2C94C]/20">
              Day {project30Data.currentDay}
            </Badge>
            {subscription.plan !== "Free" && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                <Crown className="mr-1 h-3 w-3" />
                Included
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Learn to build 30 projects in 30 days with step-by-step video tutorials.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => onNavigate(`/dashboard/project30/${courseId}/leaderboard`)}
          >
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </Button>
          {project30Data.enrolled ? (
            <Button
              className="w-full md:w-auto"
              onClick={() => onNavigate(`/dashboard/project30/day/${project30Data.currentDay}`)}
            >
              <Play className="mr-2 h-4 w-4" />
              Today's Lesson
            </Button>
          ) : (
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                  <Lock className="mr-2 h-4 w-4" />
                  Get Access
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Get Access to Project30</DialogTitle>
                  <DialogDescription>Choose how you'd like to access this 30-day challenge</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handlePurchase("subscription")}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Crown className="h-8 w-8 text-[#F2C94C]" />
                        <div className="flex-1">
                          <h3 className="font-semibold">Upgrade to Pro</h3>
                          <p className="text-sm text-muted-foreground">
                            Get unlimited access to all Project30 challenges
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">$39.99/mo</div>
                          <div className="text-xs text-muted-foreground">Best value</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handlePurchase("individual")}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-[#13AECE]" />
                        <div className="flex-1">
                          <h3 className="font-semibold">Buy This Challenge</h3>
                          <p className="text-sm text-muted-foreground">One-time purchase for lifetime access</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${project30Data.price}</div>
                          <div className="text-xs text-muted-foreground">One-time</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50" onClick={() => handlePurchase("xp")}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Gift className="h-8 w-8 text-[#EB5757]" />
                        <div className="flex-1">
                          <h3 className="font-semibold">Redeem with XP</h3>
                          <p className="text-sm text-muted-foreground">Use your earned XP points</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{getXPCost(project30Data.price).toLocaleString()} XP</div>
                          <div className="text-xs text-muted-foreground">
                            Balance: {subscription.xpBalance.toLocaleString()} XP
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Access Banner for Free Users */}
      {!project30Data.enrolled && (
        <Card className="bg-gradient-to-r from-[#F2C94C]/10 to-[#F2C94C]/5 border-[#F2C94C]/20">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className="h-8 w-8 text-[#F2C94C]" />
                <div>
                  <h3 className="font-semibold">Unlock Project30 Challenge</h3>
                  <p className="text-sm text-muted-foreground">
                    Get access to 30 days of hands-on project building with expert guidance
                  </p>
                </div>
              </div>
              <Button className="w-full md:w-auto" onClick={() => setShowPaymentDialog(true)}>
                Get Access
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#F2C94C]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Day</CardTitle>
            <CalendarIcon className="h-4 w-4 text-[#F2C94C]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project30Data.enrolled ? project30Data.currentDay : "—"}/30</div>
            <p className="text-xs text-muted-foreground">
              {project30Data.enrolled
                ? `${project30Data.totalDays - project30Data.currentDay} days remaining`
                : "Enroll to start"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#13AECE]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instructor</CardTitle>
            <BookOpen className="h-4 w-4 text-[#13AECE]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project30Data.instructor}</div>
            <p className="text-xs text-muted-foreground">Senior Backend Engineer</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#EB5757]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <Video className="h-4 w-4 text-[#EB5757]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project30Data.enrolled ? project30Data.completedLessons : "—"}</div>
            <p className="text-xs text-muted-foreground">
              {project30Data.enrolled ? "93% completion rate" : "Start learning"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#347474]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <Trophy className="h-4 w-4 text-[#347474]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project30Data.enrolled ? `#${project30Data.rank}` : "—"}</div>
            <p className="text-xs text-muted-foreground">
              {project30Data.enrolled ? `of ${project30Data.totalParticipants} participants` : "Join to compete"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full overflow-x-auto flex-nowrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Current Lesson */}
          {project30Data.enrolled ? (
            <Card className="bg-gradient-to-r from-[#F2C94C]/10 to-[#F2C94C]/5 border-[#F2C94C]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#F2C94C]" />
                  Today's Lesson - Day {project30Data.currentDay}
                </CardTitle>
                <CardDescription>Watch today's video to learn how to build a new project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative rounded-md overflow-hidden w-full md:w-1/3">
                      <img
                        src={dailyLessons[0].thumbnail || "/placeholder.svg"}
                        alt="Video thumbnail"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-white opacity-80" />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="font-semibold text-lg">{dailyLessons[0].title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{dailyLessons[0].description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {dailyLessons[0].duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {dailyLessons[0].xpReward} XP
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {dailyLessons[0].technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => onNavigate(`/dashboard/project30/day/${project30Data.currentDay}`)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Today's Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-gray-500" />
                  Project30 Challenge Preview
                </CardTitle>
                <CardDescription>Get access to unlock 30 days of project-based learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 opacity-60">
                    <div className="relative rounded-md overflow-hidden w-full md:w-1/3">
                      <img
                        src={dailyLessons[0].thumbnail || "/placeholder.svg"}
                        alt="Video thumbnail"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Lock className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="font-semibold text-lg">{dailyLessons[0].title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{dailyLessons[0].description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {dailyLessons[0].duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {dailyLessons[0].xpReward} XP
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {dailyLessons[0].technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => setShowPaymentDialog(true)}>
                    <Crown className="mr-2 h-4 w-4" />
                    Get Access to Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Lessons</CardTitle>
              <CardDescription>Your latest Project30 lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyLessons.map((lesson) => (
                  <div key={lesson.day} className="flex items-center space-x-4 rounded-lg border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      {lesson.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : lesson.status === "in-progress" ? (
                        <Play className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          Day {lesson.day}: {lesson.title}
                        </p>
                        <Badge
                          variant={
                            lesson.status === "completed"
                              ? "default"
                              : lesson.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {lesson.status === "completed"
                            ? "Completed"
                            : lesson.status === "in-progress"
                              ? "In Progress"
                              : project30Data.enrolled
                                ? "Locked"
                                : "Premium"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{lesson.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={lesson.status === "locked"}
                      onClick={() =>
                        project30Data.enrolled
                          ? onNavigate(`/dashboard/project30/day/${lesson.day}`)
                          : setShowPaymentDialog(true)
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project30Data.enrolled ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{Math.round((project30Data.currentDay / project30Data.totalDays) * 100)}%</span>
                      </div>
                      <Progress value={(project30Data.currentDay / project30Data.totalDays) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Completion Rate</span>
                        <span>{Math.round((project30Data.completedLessons / project30Data.currentDay) * 100)}%</span>
                      </div>
                      <Progress
                        value={(project30Data.completedLessons / project30Data.currentDay) * 100}
                        className="h-2"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Unlock Your Progress</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get access to track your daily progress and compete with others
                    </p>
                    <Button onClick={() => setShowPaymentDialog(true)}>Get Access</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project30Data.enrolled ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total XP Earned</span>
                      <span className="font-semibold">{project30Data.totalXP.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average XP/Day</span>
                      <span className="font-semibold">
                        {Math.round(project30Data.totalXP / project30Data.completedLessons)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Best Streak</span>
                      <span className="font-semibold">{project30Data.streak} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Days Remaining</span>
                      <span className="font-semibold">{project30Data.totalDays - project30Data.currentDay}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Course Price</span>
                      <span className="font-semibold">${project30Data.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">XP Cost</span>
                      <span className="font-semibold">{getXPCost(project30Data.price).toLocaleString()} XP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Your XP Balance</span>
                      <span className="font-semibold">{subscription.xpBalance.toLocaleString()} XP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Participants</span>
                      <span className="font-semibold">{project30Data.totalParticipants.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs content would go here */}
      </Tabs>
    </div>
  )
}
