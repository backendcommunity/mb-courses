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
import { Roadmap } from "@/lib/data";
import { Loader } from "../ui/loader";
import { useEffect, useState } from "react";

interface LearningPathContinuePageProps {
  pathId: string;
  onNavigate?: (route: string) => void;
}

export function LearningPathContinuePage({
  pathId,
  onNavigate,
}: LearningPathContinuePageProps) {
  const store = useAppStore();
  const [path, setPath] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPath = async () => {
      setLoading(true);
      try {
        let roadmap = await store.getRoadmapBySlug(pathId);

        if (!roadmap) {
          const allRoadmaps = await store.getRoadmaps({ size: 20, skip: 0 });
          roadmap = allRoadmaps.find(
            (r: any) => r.slug === pathId || r.id === pathId,
          );
        }

        setPath(roadmap || null);
      } catch (error) {
        console.error("Failed to load learning path continue:", error);
        setPath(null);
      } finally {
        setLoading(false);
      }
    };

    loadPath();
  }, [pathId, store]);

  if (loading) return <Loader isLoader={true} />;

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

  const milestones = (path as any).milestones || (path as any).topics || [];
  const totalSteps = milestones?.length || 0;
  const currentIndex =
    typeof path.currentMilestone === "number" && path.currentMilestone >= 0
      ? Math.min(path.currentMilestone, Math.max(0, totalSteps - 1))
      : Math.max(0, milestones.findIndex((m: any) => !m.completed));
  const currentMilestone =
    totalSteps > 0 ? milestones[Math.max(0, currentIndex)] : null;
  const completedMilestones = milestones.filter((m: any) => m.completed);
  const upcomingMilestones =
    totalSteps > 0 ? milestones.slice(currentIndex + 1, currentIndex + 4) : [];
  const nextMilestone = upcomingMilestones[0] || null;

  return (
    <div className="flex-1 space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Continue: {path.title}</h1>
          <p className="text-slate-300">
            {totalSteps > 0
              ? `Milestone ${Math.min(currentIndex + 1, totalSteps)} of ${totalSteps} • ${path.progress}% Complete`
              : `${path.progress}% Complete`}
          </p>
        </div>
        <Button variant="secondary" className="h-10 px-4" onClick={() => onNavigate?.(`/paths/${path.id}`)}>
          Back to path details
        </Button>
      </div>

      {/* Progress Overview */}
      <Card className="bg-slate-900 border border-slate-800 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="h-5 w-5 text-cyan-300" />
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

            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold">{completedMilestones.length}</div>
                <div className="text-xs text-slate-300">Milestones Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalSteps}</div>
                <div className="text-xs text-slate-300">Total Milestones</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{path.progress}%</div>
                <div className="text-xs text-slate-300">Completion Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Step */}
          <Card className="border border-slate-800 bg-slate-900">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {Math.min(currentIndex + 1, Math.max(1, totalSteps))}
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {currentMilestone ? `Current: ${currentMilestone.title}` : "Current Milestone"}
                  </CardTitle>
                  <CardDescription>
                    {currentMilestone?.description || "Continue your learning journey"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Milestone Progress</span>
                  <span className="text-sm">{currentMilestone?.duration || "—"}</span>
                </div>
                <Progress value={currentMilestone?.progress ?? path.progress} className="h-2" />

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => onNavigate?.(`/paths/${path.id}`)}>
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
                {completedMilestones.length === 0 ? (
                  <div className="text-sm text-slate-300">No milestones completed yet.</div>
                ) : (
                  completedMilestones.map((m: any, index: number) => (
                    <div
                      key={m.id || index}
                      className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-violet-300" />
                          <span className="font-medium text-white">{m.title}</span>
                        </div>
                        <span className="text-sm text-slate-300">
                          {m.duration || "—"}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-green-300 border-green-500"
                      >
                        Completed
                      </Badge>
                    </div>
                  ))
                )}
              </div>

              {/* Current Step */}
              <div className="space-y-3">
                <h4 className="font-medium text-cyan-300">→ Current</h4>
                <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <Play className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-cyan-300" />
                      <span className="font-medium">
                        Advanced Node.js Concepts
                      </span>
                    </div>
                    <span className="text-sm text-slate-300">
                      8 hours • 3 of 8 lessons
                    </span>
                    <Progress value={37.5} className="h-1 mt-2" />
                  </div>
                  <Badge className="bg-blue-600">In Progress</Badge>
                </div>
              </div>

              {/* Upcoming Steps */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-300">⏳ Upcoming</h4>
                {upcomingMilestones.length === 0 ? (
                  <div className="text-sm text-slate-300">No upcoming milestones.</div>
                ) : (
                  upcomingMilestones.map((m: any, index: number) => (
                    <div
                      key={m.id || index}
                      className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg"
                    >
                      <Lock className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-slate-200">
                            {m.title}
                          </span>
                        </div>
                        <span className="text-sm text-slate-300">
                          {m.duration || "—"}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-slate-300 border-slate-600">
                        Locked
                      </Badge>
                    </div>
                  ))
                )}
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
                  <span className="text-sm">Completion Rate</span>
                  <span className="font-medium">{path.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Milestones Completed</span>
                  <span className="font-medium">{completedMilestones.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Est. Time</span>
                  <span className="font-medium">{path.estimatedTime}</span>
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
              <div className="p-3 bg-slate-800 rounded-lg">
                <h4 className="font-medium text-sm text-white">
                  {nextMilestone ? nextMilestone.title : "You're on the final milestone"}
                </h4>
                <p className="text-xs text-slate-300">
                  {nextMilestone?.description || "Keep going to complete the path"}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-3 w-3 text-slate-300" />
                  <span className="text-xs">{nextMilestone?.duration || "—"}</span>
                </div>
              </div>
              <Button className="w-full" size="sm" onClick={() => onNavigate?.(`/paths/${path.id}`)}>
                <Play className="mr-2 h-4 w-4" />
                Continue
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
                <div className="text-center p-4 border border-slate-700 bg-slate-900 rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <h3 className="font-medium text-white">Certificate</h3>
                  <p className="text-sm text-slate-300">
                    Industry-recognized completion certificate
                  </p>
                </div>
                <div className="text-center p-4 border border-slate-700 bg-slate-900 rounded-lg">
                  <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-cyan-600 text-white flex items-center justify-center text-sm font-bold">
                    MB
                  </div>
                  <h3 className="font-medium">MB Points</h3>
                  <p className="text-sm text-slate-300">
                    Earn experience points on completion
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
