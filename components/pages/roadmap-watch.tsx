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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Target,
  BookOpen,
  Code2,
  Play,
  Calendar,
  Trophy,
  Users,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { routes } from "@/lib/routes";

interface RoadmapWatchPageProps {
  roadmapId: string;
  onNavigate?: (route: string) => void;
}

export function RoadmapWatchPage({
  roadmapId,
  onNavigate,
}: RoadmapWatchPageProps) {
  const store = useAppStore();
  const roadmap = store.getRoadmaps().find((r) => r.id === roadmapId);

  if (!roadmap) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Roadmap not found</h1>
          <Button onClick={() => onNavigate?.("roadmaps")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Roadmaps
          </Button>
        </div>
      </div>
    );
  }

  // Mock current milestone data
  const currentMilestone = {
    id: 3,
    title: "System Design Mastery",
    description: "Learn to design scalable, distributed systems",
    progress: 65,
    tasks: [
      {
        id: 1,
        title: "Complete System Design Course",
        completed: true,
        type: "course",
      },
      {
        id: 2,
        title: "Design a URL Shortener",
        completed: true,
        type: "project",
      },
      {
        id: 3,
        title: "Build Distributed Cache",
        completed: false,
        type: "project",
      },
      {
        id: 4,
        title: "System Design Interview Prep",
        completed: false,
        type: "assessment",
      },
    ],
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate?.(`${routes.roadmaps}/${roadmap.id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Watch: {roadmap.title}
          </h1>
          <p className="text-muted-foreground">
            Milestone {roadmap.currentMilestone} of 8 • {roadmap.progress}%
            Complete
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-[#0E1F33] to-[#13AECE] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Current Milestone: {currentMilestone.title}
          </CardTitle>
          <CardDescription className="text-blue-100">
            {currentMilestone.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Milestone Progress</span>
              <span>{currentMilestone.progress}%</span>
            </div>
            <Progress value={currentMilestone.progress} className="h-3" />

            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {roadmap.currentMilestone}
                </div>
                <div className="text-xs text-blue-100">Current Milestone</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {roadmap.completedMilestones}
                </div>
                <div className="text-xs text-blue-100">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-blue-100">Tasks Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-blue-100">Tasks Left</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Milestone Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Milestone Tasks</CardTitle>
              <CardDescription>
                Complete these tasks to advance to the next milestone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentMilestone.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-4 ${
                    task.completed ? "bg-green-50 border-green-200" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.completed}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {task.type === "course" && (
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        )}
                        {task.type === "project" && (
                          <Code2 className="h-4 w-4 text-green-600" />
                        )}
                        {task.type === "assessment" && (
                          <Target className="h-4 w-4 text-purple-600" />
                        )}
                        <span
                          className={`font-medium ${
                            task.completed
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.completed ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Completed
                        </Badge>
                      ) : (
                        <Button size="sm">
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
          {/* Next Task */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-sm">Build Distributed Cache</h4>
                <p className="text-xs text-muted-foreground">
                  Implement Redis-based caching system
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Code2 className="h-3 w-3 text-green-600" />
                  <span className="text-xs">Project • Est. 6 hours</span>
                </div>
              </div>
              <Button className="w-full" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Start Project
              </Button>
            </CardContent>
          </Card>

          {/* Milestone Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Milestone Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Tasks Completed</span>
                  <span>2/4</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Time Invested</span>
                  <span>12/20 hours</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{currentMilestone.progress}%</span>
                </div>
                <Progress value={currentMilestone.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Others on this milestone
                </span>
                <span>234</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Completed this milestone
                </span>
                <span>1,089</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Join Discussion
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                View All Resources
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Target className="mr-2 h-4 w-4" />
                Set Daily Goal
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Study Time
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
