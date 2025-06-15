"use client";
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
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Code2,
  Target,
  CheckCircle2,
  Play,
  Lock,
  Trophy,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

interface LearningPathContinuePageProps {
  pathId: string;
  onNavigate?: (route: string) => void;
}

export function LearningPathContinuePage({
  pathId,
  onNavigate,
}: LearningPathContinuePageProps) {
  const store = useAppStore();
  const path = store.getLearningPaths().find((p) => p.id === pathId);

  if (!path) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Learning Path not found</h1>
          <Button
            onClick={() => onNavigate?.("learning-paths")}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Paths
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate?.(`learning-path-detail/${path.id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Continue: {path.title}
          </h1>
          <p className="text-muted-foreground">
            Step 3 of 12 • {path.progress}% Complete
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-[#0E1F33] to-[#13AECE] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Overall Progress</span>
              <span>{path.progress}%</span>
            </div>
            <Progress value={path.progress} className="h-3" />

            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-blue-100">Courses Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-blue-100">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-blue-100">Assessments Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-blue-100">Days Streak</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Step */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Current: Advanced Node.js Concepts
                  </CardTitle>
                  <CardDescription>
                    Learn about streams, clusters, and performance optimization
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Lesson Progress</span>
                  <span className="text-sm">3 of 8 lessons</span>
                </div>
                <Progress value={37.5} className="h-2" />

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Play className="mr-2 h-4 w-4" />
                    Continue Lesson
                  </Button>
                  <Button variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Resources
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Path Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Timeline</CardTitle>
              <CardDescription>
                Your progress through the learning path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Completed Steps */}
              <div className="space-y-3">
                <h4 className="font-medium text-green-600">✓ Completed</h4>
                {[
                  {
                    type: "course",
                    title: "JavaScript Fundamentals",
                    duration: "4 hours",
                  },
                  {
                    type: "course",
                    title: "Node.js Basics",
                    duration: "6 hours",
                  },
                  {
                    type: "project",
                    title: "REST API Project",
                    duration: "8 hours",
                  },
                  {
                    type: "assessment",
                    title: "Backend Fundamentals Quiz",
                    duration: "30 min",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {item.type === "course" && (
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        )}
                        {item.type === "project" && (
                          <Code2 className="h-4 w-4 text-green-600" />
                        )}
                        {item.type === "assessment" && (
                          <Target className="h-4 w-4 text-purple-600" />
                        )}
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.duration}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200"
                    >
                      Completed
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Current Step */}
              <div className="space-y-3">
                <h4 className="font-medium text-blue-600">→ Current</h4>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <Play className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">
                        Advanced Node.js Concepts
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      8 hours • 3 of 8 lessons
                    </span>
                    <Progress value={37.5} className="h-1 mt-2" />
                  </div>
                  <Badge className="bg-blue-600">In Progress</Badge>
                </div>
              </div>

              {/* Upcoming Steps */}
              <div className="space-y-3">
                <h4 className="font-medium text-muted-foreground">
                  ⏳ Upcoming
                </h4>
                {[
                  {
                    type: "course",
                    title: "Database Design & Optimization",
                    duration: "10 hours",
                  },
                  {
                    type: "project",
                    title: "E-commerce Backend",
                    duration: "12 hours",
                  },
                  {
                    type: "course",
                    title: "Microservices Architecture",
                    duration: "8 hours",
                  },
                  {
                    type: "assessment",
                    title: "Advanced Backend Assessment",
                    duration: "45 min",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Lock className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {item.type === "course" && (
                          <BookOpen className="h-4 w-4 text-gray-400" />
                        )}
                        {item.type === "project" && (
                          <Code2 className="h-4 w-4 text-gray-400" />
                        )}
                        {item.type === "assessment" && (
                          <Target className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="font-medium text-gray-600">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.duration}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-gray-500">
                      Locked
                    </Badge>
                  </div>
                ))}
              </div>
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
                  <span className="text-sm">Time Invested</span>
                  <span className="font-medium">24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Streak</span>
                  <span className="font-medium">12 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completion Rate</span>
                  <span className="font-medium">{path.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Est. Time Left</span>
                  <span className="font-medium">2.1 months</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Up */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-sm">
                  Advanced Node.js - Lesson 4
                </h4>
                <p className="text-xs text-muted-foreground">
                  Event Loop & Performance
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">45 minutes</span>
                </div>
              </div>
              <Button className="w-full" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Start Next Lesson
              </Button>
            </CardContent>
          </Card>

          {/* Achievement Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Path Completion Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <h3 className="font-medium">Certificate</h3>
                  <p className="text-sm text-muted-foreground">
                    Industry-recognized completion certificate
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-[#13AECE] text-white flex items-center justify-center text-sm font-bold">
                    MB
                  </div>
                  <h3 className="font-medium">500 MB</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience points for completion
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
