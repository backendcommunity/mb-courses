"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Code2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

interface BootcampWeekPageProps {
  bootcampId: string;
  weekId: string;
  onNavigate?: (route: string) => void;
}

export function BootcampWeekPage({
  bootcampId,
  weekId,
  onNavigate,
}: BootcampWeekPageProps) {
  const store = useAppStore();
  const bootcamp = store.getBootcamps().find((b) => b.id === bootcampId);

  // Mock week data
  const weekData = {
    "1": {
      title: "Foundations",
      description: "JavaScript ES6+, Node.js Basics, Git & GitHub",
      lessons: [
        {
          id: "1",
          title: "JavaScript ES6+ Features",
          type: "video",
          duration: "45 min",
          completed: true,
          slug: "javascript-es6-features",
          week: 1,
        },
        {
          id: "2",
          title: "Node.js Introduction",
          type: "video",
          duration: "60 min",
          completed: true,
          slug: "nodejs-introduction",
          week: 1,
        },
        {
          id: "3",
          title: "Git & GitHub Workflow",
          type: "video",
          duration: "40 min",
          completed: false,

          slug: "git-github-workflow",
          week: 1,
        },
        {
          id: "4",
          title: "Week 1 Project",
          type: "project",
          duration: "2 hours",
          completed: false,
          slug: "week-1-project",
          week: 1,
        },
      ],
    },
    "2": {
      title: "Backend Fundamentals",
      description: "Express.js, RESTful APIs, Middleware",
      lessons: [
        {
          id: "1",
          title: "Express.js Setup",
          type: "video",
          duration: "30 min",
          completed: false,
          slug: "expressjs-setup",
          week: 2,
        },
        {
          id: "2",
          title: "Routing & Middleware",
          type: "video",
          duration: "50 min",
          completed: false,
          slug: "routing-middleware",
          week: 2,
        },
        {
          id: "3",
          title: "Building REST APIs",
          type: "video",
          duration: "70 min",
          completed: false,
          slug: "building-rest-apis",
          week: 2,
        },
        {
          id: "4",
          title: "API Project",
          type: "project",
          duration: "3 hours",
          completed: false,
          slug: "api-project",
          week: 2,
        },
      ],
    },
  };

  const week = weekData[weekId as keyof typeof weekData];

  if (!bootcamp || !week) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Week not found</h1>
          <Button
            onClick={() => onNavigate?.(`/bootcamps/${bootcampId}/dashboard`)}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bootcamp
          </Button>
        </div>
      </div>
    );
  }

  const handleStart = (lesson: any) => {
    if (lesson.type?.toLowerCase() === "quiz") return onNavigate?.("");
    if (lesson.type?.toLowerCase() === "project")
      return onNavigate?.(`/projects/${lesson?.slug}`);

    return onNavigate?.(
      `/bootcamps/${bootcampId}/weeks/${lesson.week}/${lesson?.slug}`
    );
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate?.(`/bootcamps/${bootcampId}/dashboard`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Week {weekId}: {week.title}
          </h1>
          <p className="text-muted-foreground">{bootcamp.title}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Week Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Week Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{week.description}</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {week.lessons.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Lessons
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {week.lessons.filter((l) => l.completed).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      (week.lessons.filter((l) => l.completed).length /
                        week.lessons.length) *
                        100
                    )}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>Week {weekId} Lessons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {week.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`border rounded-lg p-4 ${
                    lesson.completed ? "border-green-500/10" : "" //bg-green-500/10
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            {lesson.type === "video" ? (
                              <Play className="h-4 w-4" />
                            ) : lesson.type === "project" ? (
                              <Code2 className="h-4 w-4" />
                            ) : (
                              <BookOpen className="h-4 w-4" />
                            )}
                            <span>{lesson.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.completed ? (
                        <>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Completed
                          </Badge>

                          <Button
                            variant={"secondary"}
                            onClick={() => handleStart(lesson)}
                            size="sm"
                          >
                            Review
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => handleStart(lesson)} size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Week Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Week Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Lessons Completed</span>
                  <span>
                    {week.lessons.filter((l) => l.completed).length}/
                    {week.lessons.length}
                  </span>
                </div>
                <Progress
                  value={
                    (week.lessons.filter((l) => l.completed).length /
                      week.lessons.length) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Bootcamp Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bootcamp Weeks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
                <div
                  key={week}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted ${
                    week.toString() === weekId ? "border border-blue-200" : ""
                  }`}
                  onClick={() =>
                    onNavigate?.(`/bootcamps/${bootcampId}/weeks/${week}`)
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    {week <= 2 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <span>{week}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Week {week}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
