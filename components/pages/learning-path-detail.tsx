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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Code2,
  Target,
  CheckCircle2,
  Users,
  Star,
  Play,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Course, Project, Roadmap } from "@/lib/data";
import { Loader } from "../ui/loader";
import { useEffect, useState } from "react";

interface LearningPathDetailPageProps {
  pathId: string;
  onNavigate?: (route: string) => void;
}

export function LearningPathDetailPage({
  pathId,
  onNavigate,
}: LearningPathDetailPageProps) {
  const store = useAppStore();
  const [path, setPath] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

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
        console.error("Failed to load learning path detail:", error);
        setPath(null);
      } finally {
        setLoading(false);
      }
    };

    loadPath();
  }, [pathId, store]);

  useEffect(() => {
    const loadAux = async () => {
      try {
        const loadedCourses = await store.getCourses({
          page: "1",
          size: "20",
          filters: {},
        } as any);
        const normalizedCourses = Array.isArray(loadedCourses)
          ? loadedCourses
          : loadedCourses?.courses ?? [];
        setCourses(normalizedCourses || []);
      } catch {}
      try {
        const loadedProjects = await store.getProjects({
          page: 1,
          size: 20,
          filters: {},
        } as any);
        const normalizedProjects = Array.isArray(loadedProjects)
          ? loadedProjects
          : loadedProjects?.projects ?? loadedProjects;
        setProjects(normalizedProjects || []);
      } catch {}
    };
    loadAux();
  }, [store]);

  if (loading) return <Loader isLoader={true} />;

  if (!path) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Learning Path not found</h1>
          <Button onClick={() => onNavigate?.("/paths")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Paths
          </Button>
        </div>
      </div>
    );
  }

  const topicCourses = path.topics?.flatMap((topic: any) => topic.courses || []) || [];
  const courseCount = topicCourses.length;
  const projectCount = path.topics?.flatMap((topic: any) => topic.projects || [])?.length || 0;

  return (
    <div className="flex-1 space-y-6 text-slate-100">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">{path.title}</h1>
            <p className="text-slate-300 max-w-2xl">{path.description}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => onNavigate?.("/paths")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Paths
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card (if enrolled) */}
          {path.enrolled && (
            <Card className="bg-slate-900 border border-slate-800 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-3" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Courses</span>
                      </div>
                      <Progress value={Math.min(100, path.progress)} className="h-2" />
                      <span className="text-xs text-slate-300">
                        {Math.round(path.progress / 100 * courseCount)} of {courseCount} completed
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        <span className="text-sm">Projects</span>
                      </div>
                      <Progress value={Math.min(100, path.progress)} className="h-2" />
                      <span className="text-xs text-slate-300">
                        {Math.round((path.progress / 100) * projectCount)} of {projectCount} completed
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      "Master backend development fundamentals",
                      "Build scalable APIs and microservices",
                      "Implement database design and optimization",
                      "Deploy applications to cloud platforms",
                      "Apply DevOps and CI/CD practices",
                      "Develop production-ready applications",
                    ].map((objective, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>{objective}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Path Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg bg-slate-800">
                      <div className="text-2xl font-bold text-cyan-400">
                        {courseCount}
                      </div>
                      <div className="text-sm text-slate-300">
                        Courses
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-slate-800">
                      <div className="text-2xl font-bold text-emerald-400">
                        {projectCount}
                      </div>
                      <div className="text-sm text-slate-300">
                        Projects
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-slate-800">
                      <div className="text-2xl font-bold text-violet-400">
                        {path.estimatedTime}
                      </div>
                      <div className="text-sm text-slate-300">
                        Est. Time
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Courses ({courseCount})</CardTitle>
                  <CardDescription>
                    Core courses in this learning path
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(topicCourses || []).map((course: any, index: number) => {
                    const courseData = courses.find(
                      (c: Course) => c.id === course.id,
                    );
                    const courseItem = courseData || course;
                    if (!courseItem) return null;

                    return (
                      <div key={courseItem.id} className="border border-slate-700 bg-slate-900 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{courseItem.title}</h4>
                              <p className="text-sm text-slate-300">
                                {courseItem.summary || courseItem.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{courseItem?.level || "N/A"}</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                onNavigate?.(`/courses/${courseItem.id}`)
                              }
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-cyan-300" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4 text-cyan-300" />
                            {course.chapters?.length || 0} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {course.rating}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Hands-on Projects ({projectCount})
                  </CardTitle>
                  <CardDescription>
                    Build real-world applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projectCount > 0 ? (
                    (path.topics?.flatMap((topic: any) => topic.projects || []) || []).map((projectId: any, index: number) => {
                      const project = projects.find((p) => p.id === projectId);
                      if (!project) return null;

                    return (
                      <div key={projectId} className="border border-slate-700 bg-slate-900 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{project.title}</h4>
                              <p className="text-sm text-slate-300">
                                {project.description}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-slate-300 border-slate-600">{project.difficulty}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(project.technologies || []).map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })
                  ) : (
                    <div className="text-sm text-slate-300">
                      No projects available in this path yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Community</CardTitle>
                  <CardDescription>
                    Connect with fellow learners
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-slate-300">
                    Community stats and discussions will appear here when available.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    path?.level === "Advanced" ? "destructive" : "default"
                  }
                >
                  {path?.level}
                </Badge>
                <div className="flex items-center gap-1 text-slate-300">
                  <Clock className="h-4 w-4 text-cyan-300" />
                  <span className="text-sm">{path.estimatedTime}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {path.enrolled ? (
                <div className="space-y-3">
                  <Badge
                    variant="outline"
                    className="w-full justify-center bg-slate-800 text-emerald-300 border-slate-700"
                  >
                    Enrolled - {path.progress}% Complete
                  </Badge>
                  <Button
                    className="w-full"
                    onClick={() => onNavigate?.(`/paths/${path.id}/continue`)}
                  >
                    Continue Learning
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Certificate
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() => store.enrollInPath(path.id)}
                  >
                    Start Learning Path
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
