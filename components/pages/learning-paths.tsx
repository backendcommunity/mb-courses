"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  BookOpen,
  Code,
  Users,
  Star,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { routes } from "@/lib/routes";
// import { WIP } from "../WIP";
import { Loader } from "../ui/loader";
import { Roadmap } from "@/lib/data";
import { useEffect, useState } from "react";

interface LearningPathsPageProps {
  onNavigate?: (url: string) => void;
}

export function LearningPathsPage({ onNavigate }: LearningPathsPageProps) {
  const store = useAppStore();
  const [paths, setPaths] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPaths = async () => {
      setLoading(true);
      try {
        const roadmaps = await store.getRoadmaps({ size: 20, skip: 0 });
        setPaths(roadmaps || []);
      } catch (error) {
        console.error("Failed to load learning paths as roadmaps:", error);
        setPaths([]);
      } finally {
        setLoading(false);
      }
    };

    loadPaths();
  }, [store]);

  if (loading) return <Loader isLoader={true} />;

  return (
    <div className="flex-1 space-y-6 relative text-white">
      {/* <WIP /> */}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Paths</h1>
          <p className="text-slate-300 max-w-xl">
            Structured journeys that map roadmaps into clear steps, from beginner to expert.
          </p>
        </div>
        <Button className="h-10 bg-slate-700 text-white hover:bg-slate-600">
          <Target className="mr-2 h-4 w-4" />
          Create Custom Path
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-xl border border-slate-800 bg-slate-900 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Paths</CardTitle>
            <Target className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paths.filter((p) => p.enrolled).length}
            </div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-slate-800 bg-slate-900 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-violet-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                paths.filter(
                  (p) => (p.progress || 0) > 0 && (p.progress || 0) < 100,
                ).length
              }
            </div>
            <p className="text-xs text-slate-300">Actively learning</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-slate-800 bg-slate-900 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paths.filter((p) => (p.progress || 0) >= 100).length}
            </div>
            <p className="text-xs text-slate-300">Paths completed</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-slate-800 bg-slate-900 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paths</CardTitle>
            <Target className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paths.length}</div>
            <p className="text-xs text-muted-foreground">Available</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => {
          const courseCount = path.topics?.flatMap((topic: any) => topic.courses || []).length || 0;
          const projectCount = path.topics?.flatMap((topic: any) => topic.projects || []).length || 0;
          const roadmapId = path.slug || path.id;

          return (
            <Card key={roadmapId} className="overflow-hidden h-full min-h-[420px] border border-slate-800 bg-slate-900 rounded-xl shadow-lg text-white transition-all hover:shadow-2xl hover:-translate-y-0.5">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <Target className="h-12 w-12 mx-auto mb-2" />
                  <h3 className="text-lg font-bold">Learning Path</h3>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      path?.level === "Advanced"
                        ? "destructive"
                        : path?.level === "Intermediate"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {path?.level || path?.difficulty || "Beginner"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{path.estimatedTime || path.timeframe || "TBD"}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{path.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {path.summary || path.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-slate-300" />
                    <span className="text-slate-300">{courseCount} courses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4 text-slate-300" />
                    <span className="text-slate-300">{projectCount} projects</span>
                  </div>
                </div>

                {path.enrolled ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress || 0} className="h-2" />
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => onNavigate?.(routes.pathContinue(roadmapId))}
                    >
                      Continue Learning
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-600">
                        Free
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Full access included
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => onNavigate?.(routes.pathDetail(roadmapId))}
                    >
                      Start Learning Path
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Removed Featured Path section to avoid dummy content */}
    </div>
  );
}
