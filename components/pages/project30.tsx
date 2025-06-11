"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlayCircle,
  CalendarIcon,
  Trophy,
  Target,
  Clock,
  Users,
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
  Code2,
  Database,
  Globe,
  Shield,
  Zap,
  FileText,
  Settings,
  Smartphone,
  Cloud,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

interface Project30PageProps {
  courseId?: string;
  onNavigate: (path: string) => void;
}

export function Project30Page({
  courseId = "backend-fundamentals",
  onNavigate,
}: Project30PageProps) {
  const store = useAppStore();
  const user = store.getUser();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  // Mock subscription data
  const subscription = {
    plan: "Pro",
    status: "active",
    xpBalance: 2450,
  };

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
    enrolled: subscription.plan !== "Free",
  };

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
        {
          day: 3,
          title: "User Registration API",
          description: "Build user registration with validation",
          duration: "35 min",
          technologies: ["Express", "bcrypt", "Joi"],
          difficulty: "Beginner",
          xpReward: 75,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Users className="h-4 w-4" />,
        },
        {
          day: 4,
          title: "Authentication System",
          description: "Implement JWT-based authentication",
          duration: "40 min",
          technologies: ["JWT", "bcrypt", "Middleware"],
          difficulty: "Intermediate",
          xpReward: 100,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          day: 5,
          title: "CRUD Operations",
          description: "Build complete CRUD API for blog posts",
          duration: "45 min",
          technologies: ["Express", "MongoDB", "REST"],
          difficulty: "Intermediate",
          xpReward: 100,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          day: 6,
          title: "Input Validation",
          description: "Add comprehensive input validation and sanitization",
          duration: "30 min",
          technologies: ["Joi", "express-validator"],
          difficulty: "Intermediate",
          xpReward: 75,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <CheckCircle2 className="h-4 w-4" />,
        },
        {
          day: 7,
          title: "Error Handling",
          description: "Implement global error handling middleware",
          duration: "35 min",
          technologies: ["Express", "Error Middleware"],
          difficulty: "Intermediate",
          xpReward: 75,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Settings className="h-4 w-4" />,
        },
      ],
    },
    {
      week: 2,
      title: "Intermediate APIs",
      description: "Build more complex API features",
      days: [
        {
          day: 8,
          title: "File Upload Service",
          description: "Handle file uploads with Multer and cloud storage",
          duration: "40 min",
          technologies: ["Multer", "Cloudinary", "Sharp"],
          difficulty: "Intermediate",
          xpReward: 100,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Cloud className="h-4 w-4" />,
        },
        {
          day: 9,
          title: "Email Service",
          description: "Send emails with Nodemailer and templates",
          duration: "35 min",
          technologies: ["Nodemailer", "Handlebars"],
          difficulty: "Intermediate",
          xpReward: 85,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          day: 10,
          title: "Password Reset Flow",
          description: "Implement secure password reset functionality",
          duration: "45 min",
          technologies: ["JWT", "Nodemailer", "Crypto"],
          difficulty: "Intermediate",
          xpReward: 100,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          day: 11,
          title: "API Rate Limiting",
          description: "Protect your API with rate limiting",
          duration: "30 min",
          technologies: ["express-rate-limit", "Redis"],
          difficulty: "Intermediate",
          xpReward: 75,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          day: 12,
          title: "Search & Pagination",
          description: "Add search functionality and pagination",
          duration: "40 min",
          technologies: ["MongoDB", "Aggregation"],
          difficulty: "Intermediate",
          xpReward: 100,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <Database className="h-4 w-4" />,
        },
        {
          day: 13,
          title: "API Documentation",
          description: "Document your API with Swagger/OpenAPI",
          duration: "35 min",
          technologies: ["Swagger", "OpenAPI"],
          difficulty: "Beginner",
          xpReward: 75,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <BookOpen className="h-4 w-4" />,
        },
        {
          day: 14,
          title: "Testing Setup",
          description: "Write unit and integration tests",
          duration: "50 min",
          technologies: ["Jest", "Supertest"],
          difficulty: "Intermediate",
          xpReward: 125,
          status: project30Data.enrolled ? "completed" : "locked",
          icon: <CheckCircle2 className="h-4 w-4" />,
        },
      ],
    },
    {
      week: 3,
      title: "Real-time & Advanced",
      description: "Build real-time features and advanced APIs",
      days: [
        {
          day: 15,
          title: "Real-time Chat API",
          description: "Build WebSocket-based chat with rooms",
          duration: "50 min",
          technologies: ["Socket.io", "Redis"],
          difficulty: "Advanced",
          xpReward: 150,
          status: project30Data.enrolled ? "in-progress" : "locked",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          day: 16,
          title: "Push Notifications",
          description: "Implement push notifications service",
          duration: "40 min",
          technologies: ["FCM", "Web Push"],
          difficulty: "Advanced",
          xpReward: 125,
          status: "locked",
          icon: <Smartphone className="h-4 w-4" />,
        },
        {
          day: 17,
          title: "Payment Integration",
          description: "Integrate Stripe payment processing",
          duration: "45 min",
          technologies: ["Stripe", "Webhooks"],
          difficulty: "Advanced",
          xpReward: 150,
          status: "locked",
          icon: <CreditCard className="h-4 w-4" />,
        },
        {
          day: 18,
          title: "GraphQL API",
          description: "Build a GraphQL API with Apollo Server",
          duration: "55 min",
          technologies: ["GraphQL", "Apollo"],
          difficulty: "Advanced",
          xpReward: 175,
          status: "locked",
          icon: <Code2 className="h-4 w-4" />,
        },
        {
          day: 19,
          title: "Caching Strategy",
          description: "Implement Redis caching for performance",
          duration: "40 min",
          technologies: ["Redis", "Cache Patterns"],
          difficulty: "Advanced",
          xpReward: 125,
          status: "locked",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          day: 20,
          title: "Background Jobs",
          description: "Process background tasks with Bull Queue",
          duration: "45 min",
          technologies: ["Bull", "Redis", "Cron"],
          difficulty: "Advanced",
          xpReward: 150,
          status: "locked",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          day: 21,
          title: "Microservices Basics",
          description: "Split monolith into microservices",
          duration: "60 min",
          technologies: ["Docker", "API Gateway"],
          difficulty: "Advanced",
          xpReward: 175,
          status: "locked",
          icon: <Globe className="h-4 w-4" />,
        },
      ],
    },
    {
      week: 4,
      title: "Production & Deployment",
      description: "Deploy and scale your applications",
      days: [
        {
          day: 22,
          title: "Docker Containerization",
          description: "Containerize your Node.js application",
          duration: "45 min",
          technologies: ["Docker", "Docker Compose"],
          difficulty: "Intermediate",
          xpReward: 125,
          status: "locked",
          icon: <Cloud className="h-4 w-4" />,
        },
        {
          day: 23,
          title: "CI/CD Pipeline",
          description: "Set up automated deployment pipeline",
          duration: "50 min",
          technologies: ["GitHub Actions", "Docker"],
          difficulty: "Advanced",
          xpReward: 150,
          status: "locked",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          day: 24,
          title: "AWS Deployment",
          description: "Deploy to AWS with EC2 and RDS",
          duration: "55 min",
          technologies: ["AWS", "EC2", "RDS"],
          difficulty: "Advanced",
          xpReward: 175,
          status: "locked",
          icon: <Cloud className="h-4 w-4" />,
        },
        {
          day: 25,
          title: "Monitoring & Logging",
          description: "Add application monitoring and logging",
          duration: "40 min",
          technologies: ["Winston", "Morgan", "PM2"],
          difficulty: "Intermediate",
          xpReward: 125,
          status: "locked",
          icon: <Target className="h-4 w-4" />,
        },
        {
          day: 26,
          title: "Security Hardening",
          description: "Implement security best practices",
          duration: "45 min",
          technologies: ["Helmet", "CORS", "Security"],
          difficulty: "Advanced",
          xpReward: 150,
          status: "locked",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          day: 27,
          title: "Performance Optimization",
          description: "Optimize API performance and database queries",
          duration: "50 min",
          technologies: ["Indexing", "Query Optimization"],
          difficulty: "Advanced",
          xpReward: 150,
          status: "locked",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          day: 28,
          title: "Load Balancing",
          description: "Scale with load balancers and clustering",
          duration: "45 min",
          technologies: ["Nginx", "PM2 Cluster"],
          difficulty: "Advanced",
          xpReward: 150,
          status: "locked",
          icon: <Globe className="h-4 w-4" />,
        },
      ],
    },
    {
      week: 5,
      title: "Final Projects",
      description: "Build comprehensive final projects",
      days: [
        {
          day: 29,
          title: "E-commerce API",
          description: "Build a complete e-commerce backend",
          duration: "90 min",
          technologies: ["All Previous", "Stripe", "Inventory"],
          difficulty: "Expert",
          xpReward: 250,
          status: "locked",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          day: 30,
          title: "Social Media API",
          description: "Create a social media platform backend",
          duration: "90 min",
          technologies: ["All Previous", "Real-time", "Media"],
          difficulty: "Expert",
          xpReward: 250,
          status: "locked",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
  ];

  const dailyLessons = [
    {
      day: 15,
      title: "Building a Real-time Chat API",
      description:
        "Learn how to create a WebSocket-based chat API with rooms and user presence",
      duration: "32 minutes",
      technologies: ["Node.js", "Socket.io", "Redis"],
      status: project30Data.enrolled ? "in-progress" : "locked",
      xpReward: 100,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      day: 16,
      title: "File Upload Service",
      description: "Create a secure file upload service with image processing",
      duration: "28 minutes",
      technologies: ["Node.js", "Multer", "Sharp"],
      status: "locked",
      xpReward: 85,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      day: 14,
      title: "JWT Authentication System",
      description:
        "Implement secure JWT-based authentication with refresh tokens",
      duration: "35 minutes",
      technologies: ["Node.js", "JWT", "bcrypt"],
      status: project30Data.enrolled ? "completed" : "locked",
      xpReward: 75,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", lessons: 15, xp: 1450, streak: 15 },
    { rank: 2, name: "Sarah Kim", lessons: 15, xp: 1420, streak: 12 },
    { rank: 3, name: "Mike Johnson", lessons: 15, xp: 1380, streak: 15 },
    { rank: 42, name: "You", lessons: 14, xp: 1250, streak: 7 },
  ];

  const achievements = [
    {
      id: "1",
      title: "Week Warrior",
      description: "Complete 7 consecutive days",
      icon: "🔥",
      unlocked: true,
      progress: 100,
    },
    {
      id: "2",
      title: "API Master",
      description: "Complete 10 API lessons",
      icon: "🚀",
      unlocked: true,
      progress: 100,
    },
    {
      id: "3",
      title: "Halfway Hero",
      description: "Reach day 15",
      icon: "⭐",
      unlocked: true,
      progress: 100,
    },
    {
      id: "4",
      title: "Final Sprint",
      description: "Complete the last 5 days",
      icon: "🏆",
      unlocked: false,
      progress: 0,
    },
  ];

  const handlePurchase = (method: "subscription" | "individual" | "xp") => {
    switch (method) {
      case "subscription":
        onNavigate("/dashboard/subscription-plans");
        break;
      case "individual":
        onNavigate(`/dashboard/checkout?type=project30&id=${courseId}`);
        break;
      case "xp":
        onNavigate(`/dashboard/xp-store?redeem=project30&id=${courseId}`);
        break;
    }
    setShowPaymentDialog(false);
  };

  const getXPCost = (price: number) => {
    return Math.round(price * 50);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Advanced":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Expert":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-600" />;
      default:
        return <Lock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex-1 space-y-4 md:space-y-6 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PlayCircle className="h-5 w-5 md:h-6 md:w-6 text-[#F2C94C]" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Project30
            </h1>
            <Badge
              variant="outline"
              className="bg-[#F2C94C]/10 text-[#F2C94C] border-[#F2C94C]/20 text-xs"
            >
              Day {project30Data.currentDay}
            </Badge>
            {subscription.plan !== "Free" && (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 border-green-200 text-xs"
              >
                <Crown className="mr-1 h-3 w-3" />
                Included
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            Learn to build 30 projects in 30 days with step-by-step video
            tutorials.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() =>
              onNavigate(`/dashboard/project30/${courseId}/leaderboard`)
            }
            className="w-full sm:w-auto"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </Button>
          {project30Data.enrolled ? (
            <Button
              onClick={() =>
                onNavigate(
                  `/dashboard/project30/day/${project30Data.currentDay}`
                )
              }
              className="w-full sm:w-auto"
            >
              <Play className="mr-2 h-4 w-4" />
              Today's Lesson
            </Button>
          ) : (
            <Dialog
              open={showPaymentDialog}
              onOpenChange={setShowPaymentDialog}
            >
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Lock className="mr-2 h-4 w-4" />
                  Get Access
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-base md:text-lg">
                    Get Access to Project30
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    Choose how you'd like to access this 30-day challenge
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 md:space-y-4">
                  <Card
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handlePurchase("subscription")}
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-center gap-3">
                        <Crown className="h-6 w-6 md:h-8 md:w-8 text-[#F2C94C] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm md:text-base">
                            Upgrade to Pro
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            Get unlimited access to all Project30 challenges
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm md:text-base">
                            $39.99/mo
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Best value
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handlePurchase("individual")}
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 md:h-8 md:w-8 text-[#13AECE] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm md:text-base">
                            Buy This Challenge
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            One-time purchase for lifetime access
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm md:text-base">
                            ${project30Data.price}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            One-time
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handlePurchase("xp")}
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-center gap-3">
                        <Gift className="h-6 w-6 md:h-8 md:w-8 text-[#EB5757] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm md:text-base">
                            Redeem with XP
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            Use your earned XP points
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm md:text-base">
                            {getXPCost(project30Data.price).toLocaleString()} XP
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Balance: {subscription.xpBalance.toLocaleString()}{" "}
                            XP
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
                <Lock className="h-6 w-6 md:h-8 md:w-8 text-[#F2C94C] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    Unlock Project30 Challenge
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Get access to 30 days of hands-on project building with
                    expert guidance
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowPaymentDialog(true)}
                className="w-full md:w-auto"
              >
                Get Access
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Overview */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#F2C94C]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Current Day
            </CardTitle>
            <CalendarIcon className="h-3 w-3 md:h-4 md:w-4 text-[#F2C94C]" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {project30Data.enrolled ? project30Data.currentDay : "—"}/30
            </div>
            <p className="text-xs text-muted-foreground">
              {project30Data.enrolled
                ? `${
                    project30Data.totalDays - project30Data.currentDay
                  } days remaining`
                : "Enroll to start"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#13AECE]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Instructor
            </CardTitle>
            <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-[#13AECE]" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {project30Data.instructor}
            </div>
            <p className="text-xs text-muted-foreground">
              Senior Backend Engineer
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#EB5757]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Lessons Completed
            </CardTitle>
            <Video className="h-3 w-3 md:h-4 md:w-4 text-[#EB5757]" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {project30Data.enrolled ? project30Data.completedLessons : "—"}
            </div>
            <p className="text-xs text-muted-foreground">
              {project30Data.enrolled
                ? "93% completion rate"
                : "Start learning"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#347474]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Leaderboard Rank
            </CardTitle>
            <Trophy className="h-3 w-3 md:h-4 md:w-4 text-[#347474]" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {project30Data.enrolled ? `#${project30Data.rank}` : "—"}
            </div>
            <p className="text-xs text-muted-foreground">
              {project30Data.enrolled
                ? `of ${project30Data.totalParticipants} participants`
                : "Join to compete"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview" className="text-xs md:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="curriculum" className="text-xs md:text-sm">
            Curriculum
          </TabsTrigger>
          <TabsTrigger value="calendar" className="text-xs md:text-sm">
            Calendar
          </TabsTrigger>
          <TabsTrigger value="achievements" className="text-xs md:text-sm">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="community" className="text-xs md:text-sm">
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Current Lesson */}
          {project30Data.enrolled ? (
            <Card className="bg-gradient-to-r from-[#F2C94C]/10 to-[#F2C94C]/5 border-[#F2C94C]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Target className="h-4 w-4 md:h-5 md:w-5 text-[#F2C94C]" />
                  Today's Lesson - Day {project30Data.currentDay}
                </CardTitle>
                <CardDescription className="text-sm">
                  Watch today's video to learn how to build a new project
                </CardDescription>
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
                        <PlayCircle className="h-8 w-8 md:h-12 md:w-12 text-white opacity-80" />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="font-semibold text-base md:text-lg">
                        {dailyLessons[0].title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
                        {dailyLessons[0].description}
                      </p>

                      <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 md:h-4 md:w-4" />
                          {dailyLessons[0].duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 md:h-4 md:w-4" />
                          {dailyLessons[0].xpReward} XP
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {dailyLessons[0].technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() =>
                      onNavigate(
                        `/dashboard/project30/day/${project30Data.currentDay}`
                      )
                    }
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
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Lock className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                  Project30 Challenge Preview
                </CardTitle>
                <CardDescription className="text-sm">
                  Get access to unlock 30 days of project-based learning
                </CardDescription>
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
                        <Lock className="h-8 w-8 md:h-12 md:w-12 text-white" />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="font-semibold text-base md:text-lg">
                        {dailyLessons[0].title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
                        {dailyLessons[0].description}
                      </p>

                      <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 md:h-4 md:w-4" />
                          {dailyLessons[0].duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 md:h-4 md:w-4" />
                          {dailyLessons[0].xpReward} XP
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {dailyLessons[0].technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setShowPaymentDialog(true)}
                  >
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
              <CardTitle className="text-base md:text-lg">
                Recent Lessons
              </CardTitle>
              <CardDescription className="text-sm">
                Your latest Project30 lessons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyLessons.map((lesson) => (
                  <div
                    key={lesson.day}
                    className="flex items-center space-x-4 rounded-lg border p-3"
                  >
                    <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                      {lesson.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                      ) : lesson.status === "in-progress" ? (
                        <Play className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                      ) : (
                        <Lock className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <p className="text-xs md:text-sm font-medium">
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
                          className="text-xs w-fit"
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
                      <p className="text-xs text-muted-foreground">
                        {lesson.description}
                      </p>
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
                      className="flex-shrink-0"
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
                <CardTitle className="text-base md:text-lg">
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project30Data.enrolled ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span>Overall Progress</span>
                        <span>
                          {Math.round(
                            (project30Data.currentDay /
                              project30Data.totalDays) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (project30Data.currentDay / project30Data.totalDays) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span>Completion Rate</span>
                        <span>
                          {Math.round(
                            (project30Data.completedLessons /
                              project30Data.currentDay) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (project30Data.completedLessons /
                            project30Data.currentDay) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-sm md:text-base">
                      Unlock Your Progress
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4">
                      Get access to track your daily progress and compete with
                      others
                    </p>
                    <Button
                      onClick={() => setShowPaymentDialog(true)}
                      className="w-full md:w-auto"
                    >
                      Get Access
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Course Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project30Data.enrolled ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Total XP Earned
                      </span>
                      <span className="font-semibold text-sm md:text-base">
                        {project30Data.totalXP.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Average XP/Day
                      </span>
                      <span className="font-semibold text-sm md:text-base">
                        {Math.round(
                          project30Data.totalXP / project30Data.completedLessons
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Best Streak
                      </span>
                      <span className="font-semibold text-sm md:text-base">
                        {project30Data.streak} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Days Remaining
                      </span>
                      <span className="font-semibold text-sm md:text-base">
                        {project30Data.totalDays - project30Data.currentDay}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Course Price
                      </span>
                      <span className="font-semibold text-sm md:text-base">
                        ${project30Data.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        XP Cost
                      </span>
                      <span className="font-semibold text-sm md:text-base">
                        {getXPCost(project30Data.price).toLocaleString()} XP
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Your XP Balance
                      </span>
                      <span className="font-semibold text-sm md:text-base">
                        {subscription.xpBalance.toLocaleString()} XP
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Total Participants
                      </span>
                      <span className="font-semibold text-sm md:text-base">
                        {project30Data.totalParticipants.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                30-Day Curriculum
              </CardTitle>
              <CardDescription className="text-sm">
                Complete curriculum breakdown with weekly themes and daily
                projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {curriculum.map((week) => (
                  <AccordionItem key={week.week} value={`week-${week.week}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full mr-4">
                        <div className="text-left">
                          <h3 className="font-semibold text-sm md:text-base">
                            Week {week.week}: {week.title}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {week.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {week.days.length} days
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {week.days.reduce(
                              (total, day) => total + day.xpReward,
                              0
                            )}{" "}
                            XP
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-4">
                        {week.days.map((day) => (
                          <div
                            key={day.day}
                            className={`flex items-center space-x-4 rounded-lg border p-3 md:p-4 transition-colors ${
                              project30Data.enrolled && day.status !== "locked"
                                ? "hover:bg-muted/50 cursor-pointer"
                                : "opacity-60"
                            }`}
                            onClick={() => {
                              if (
                                project30Data.enrolled &&
                                day.status !== "locked"
                              ) {
                                onNavigate(
                                  `/dashboard/project30/day/${day.day}`
                                );
                              } else if (!project30Data.enrolled) {
                                setShowPaymentDialog(true);
                              }
                            }}
                          >
                            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                              {getStatusIcon(day.status)}
                            </div>
                            <div className="flex-1 space-y-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs md:text-sm font-medium text-muted-foreground">
                                  Day {day.day}
                                </span>
                                <Badge
                                  className={`${getDifficultyColor(
                                    day.difficulty
                                  )} text-xs`}
                                  variant="outline"
                                >
                                  {day.difficulty}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {day.xpReward} XP
                                </Badge>
                              </div>
                              <h4 className="font-medium text-sm md:text-base">
                                {day.title}
                              </h4>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {day.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {day.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                  {day.icon}
                                  <span>{day.technologies.join(", ")}</span>
                                </div>
                              </div>
                            </div>
                            {project30Data.enrolled &&
                            day.status !== "locked" ? (
                              <ChevronRight className="h-4 w-4 flex-shrink-0" />
                            ) : !project30Data.enrolled ? (
                              <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            ) : (
                              <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Course Calendar
                </CardTitle>
                <CardDescription className="text-sm">
                  Track your daily progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project30Data.enrolled ? (
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border w-full"
                  />
                ) : (
                  <div className="text-center py-8">
                    <Lock className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-sm md:text-base">
                      Calendar Locked
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4">
                      Get access to track your daily progress
                    </p>
                    <Button
                      onClick={() => setShowPaymentDialog(true)}
                      className="w-full md:w-auto"
                    >
                      Unlock Calendar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Calendar Legend
                </CardTitle>
                <CardDescription className="text-sm">
                  Understanding your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-green-500"></div>
                  <span className="text-xs md:text-sm">Completed Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-blue-500"></div>
                  <span className="text-xs md:text-sm">Current Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-300"></div>
                  <span className="text-xs md:text-sm">Upcoming Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-500"></div>
                  <span className="text-xs md:text-sm">Missed Lessons</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">
                Achievements
              </CardTitle>
              <CardDescription className="text-sm">
                Unlock badges as you progress through Project30
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project30Data.enrolled ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center space-x-4 rounded-lg border p-3 md:p-4 ${
                        achievement.unlocked
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="text-xl md:text-2xl">
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-base">
                          {achievement.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {!achievement.unlocked && (
                          <div className="mt-2">
                            <Progress
                              value={achievement.progress}
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-sm md:text-base">
                    Achievements Locked
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    Get access to unlock achievements and track your progress
                  </p>
                  <Button
                    onClick={() => setShowPaymentDialog(true)}
                    className="w-full md:w-auto"
                  >
                    Unlock Achievements
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Trophy className="h-4 w-4 md:h-5 md:w-5 text-[#F2C94C]" />
                  Top Performers
                </CardTitle>
                <CardDescription className="text-sm">
                  See how you rank against other participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project30Data.enrolled ? (
                  <div className="space-y-3">
                    {leaderboard.map((entry) => (
                      <div
                        key={entry.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          entry.name === "You"
                            ? "bg-[#F2C94C]/10 border border-[#F2C94C]/20"
                            : "bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-muted text-xs md:text-sm font-semibold">
                            #{entry.rank}
                          </div>
                          <div>
                            <p className="font-medium text-sm md:text-base">
                              {entry.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {entry.lessons} lessons • {entry.streak} day
                              streak
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm md:text-base">
                            {entry.xp} XP
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() =>
                        onNavigate(
                          `/dashboard/project30/${courseId}/leaderboard`
                        )
                      }
                    >
                      View Full Leaderboard
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-sm md:text-base">
                      Leaderboard Locked
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4">
                      Get access to compete with other learners
                    </p>
                    <Button
                      onClick={() => setShowPaymentDialog(true)}
                      className="w-full md:w-auto"
                    >
                      Join Competition
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-[#13AECE]" />
                  Community Stats
                </CardTitle>
                <CardDescription className="text-sm">
                  Project30 community insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Total Participants
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    {project30Data.totalParticipants.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Active Today
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    847
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Projects Built
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    15,420
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Completion Rate
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    73%
                  </span>
                </div>
                {project30Data.enrolled ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onNavigate("/dashboard/project30/community")}
                  >
                    Join Community Discussion
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowPaymentDialog(true)}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Unlock Community Access
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
