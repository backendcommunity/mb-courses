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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Code2,
  Clock,
  Calendar,
  Search,
  Play,
  CheckCircle2,
  Users,
  Trophy,
  DownloadCloud,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { WIP } from "../WIP";
import { useEffect, useState } from "react";
import { Meta, Project } from "@/lib/data";
import { useDebounce } from "@/hooks/use-debounce";
import { Loader } from "../ui/loader";

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const store = useAppStore();
  const [projects, setProjects] = useState<Project[]>();
  const [meta, setMeta] = useState<Meta>();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (
        selectedStatus.includes("all") &&
        selectedLevel.includes("all")
        //&& !debouncedSearch.trim()
      )
        return;

      setLoading(true);
      const projects = await store.getProjects({
        page: 20,
        size: 0,
        filters: {
          terms: debouncedSearch,
          level: selectedLevel,
          category: selectedStatus,
        },
      });

      if (!cancelled) {
        setProjects(projects.projects);
        setMeta(projects.meta);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, selectedLevel, selectedStatus, store]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const projects = await store.getProjects({
        page: 20,
        size: 0,
        filters: {},
      });
      if (!cancelled) {
        setProjects(projects.projects);
        setMeta(projects.meta);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [store]);

  if (loading) return <Loader isLoader={false} />;

  return (
    <div className="flex-1 space-y-4 md:space-y-6 relative">
      {/* <WIP /> */}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            MB Projects
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Build real-world projects to strengthen your backend development
            skills
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            className="w-full md:w-auto" 
            variant={"outline"}
            onClick={() => onNavigate("/projects/leaderboard")}
          >
            <Trophy className="mr-2 h-4 w-4" />
            Global Leaderboard
          </Button>

          <Button 
            className="w-full md:w-auto"
            onClick={() => onNavigate("/projects/submissions")}
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            My Submissions
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Total Projects
            </CardTitle>
            <Code2 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{meta?.total}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {projects?.filter((p) => p?.userProject?.completed)?.length}
            </div>
            <p className="text-xs text-muted-foreground">67% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              In Progress
            </CardTitle>
            <Play className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {
                projects?.filter(
                  (p) => p?.userProject && !p?.userProject?.completed
                )?.length
              }
            </div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">
              Avg. Time
            </CardTitle>
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">2.5w</div>
            <p className="text-xs text-muted-foreground">Per project</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-[120px] md:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginners">Beginners</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advance">Advance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[120px] md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.slug} className="overflow-hidden">
            <div className="aspect-video bg-muted">
              <img
                src={project?.banner || "/placeholder.svg"}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant={
                    project?.level === "advance"
                      ? "destructive"
                      : project?.level === "intermediate"
                      ? "default"
                      : "secondary"
                  }
                  className="text-xs capitalize"
                >
                  {project?.level}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    project?.userProject && project?.userProject?.completed
                      ? "border-green-600 text-green-600"
                      : !project?.userProject?.completed
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-600 text-gray-600"
                  }`}
                >
                  {!project?.userProject
                    ? "Not Started"
                    : project?.userProject?.completed
                    ? "Completed"
                    : "In Progress"}
                </Badge>
              </div>
              <CardTitle className="line-clamp-2 text-sm md:text-base">
                {project.title}
              </CardTitle>
              <CardDescription
                dangerouslySetInnerHTML={{ __html: project.summary }}
                className="line-clamp-2 text-xs md:text-sm [&>p>*>span]:text-muted-foreground"
              ></CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 pt-0">
              <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 md:h-4 md:w-4" />
                  {project.timeframe}
                </div>

                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  {project.students}
                </div>
              </div>

              {project.enrolled && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {project?.technologies?.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project?.technologies?.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project?.technologies?.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 text-xs md:text-sm"
                  onClick={() => onNavigate(`/projects/${project.slug}`)}
                >
                  {project.enrolled ? "Continue Project" : "Start Project"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate(`/projects/${project.slug}/leaderboard`)}
                  title="View Project Leaderboard"
                >
                  <Trophy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
