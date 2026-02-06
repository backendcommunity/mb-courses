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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Star,
  Trophy,
  Users,
} from "lucide-react";

interface DeveloperPortfolioPageProps {
  userId: string;
  onNavigate?: (path: string) => void;
}

// Dummy portfolio data
const DUMMY_PORTFOLIO = {
  user: {
    name: "Sarah Johnson",
    title: "Senior Backend Engineer",
    location: "San Francisco, CA",
    createdAt: "2024-01-15T00:00:00Z",
    bio: "Passionate backend developer with 5+ years of experience building scalable applications. Specialized in Node.js, Python, and cloud architecture.",
    email: "sarah.johnson@example.com",
    github: "https://github.com/sarahjohnson",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    website: "https://sarahjohnson.dev",
  },
  completedProjects: [
    {
      id: "1",
      title: "Build a REST API with Rate Limiting",
      summary: "<p>Implemented a production-ready REST API with Redis-based rate limiting</p>",
      technologies: ["Node.js", "Express", "Redis", "PostgreSQL", "Docker"],
      repositoryUrl: "https://github.com/sarahjohnson/rest-api-rate-limiting",
    },
    {
      id: "2",
      title: "Real-time Chat Application",
      summary: "<p>Built a scalable real-time chat system using WebSockets</p>",
      technologies: ["Node.js", "Socket.io", "MongoDB", "Docker"],
      repositoryUrl: "https://github.com/sarahjohnson/realtime-chat",
    },
    {
      id: "3",
      title: "GraphQL API with DataLoader",
      summary: "<p>Optimized GraphQL API with N+1 query resolution</p>",
      technologies: ["Node.js", "GraphQL", "DataLoader", "PostgreSQL"],
      repositoryUrl: "https://github.com/sarahjohnson/graphql-api",
    },
  ],
  inProgressProjects: [
    {
      id: "4",
      title: "Microservices Architecture",
      summary: "<p>Building a microservices-based e-commerce platform</p>",
      technologies: ["Node.js", "Kubernetes", "RabbitMQ", "MongoDB"],
      progress: 65,
    },
  ],
  stats: {
    totalPoints: 15420,
    completedProjects: 12,
    inProgressProjects: 1,
    rank: 1,
  },
  skills: [
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "GraphQL",
    "REST APIs",
    "Microservices",
    "System Design",
  ],
  achievements: [
    {
      id: "1",
      title: "Top Contributor",
      description: "Completed 10+ projects with 90%+ scores",
    },
    {
      id: "2",
      title: "Fast Learner",
      description: "Completed 3 advanced projects in one month",
    },
    {
      id: "3",
      title: "Community Helper",
      description: "Helped 50+ developers in the community",
    },
  ],
};

export function DeveloperPortfolioPage({
  userId,
  onNavigate,
}: DeveloperPortfolioPageProps) {
  const [portfolio] = useState<any>(DUMMY_PORTFOLIO);

  if (!portfolio) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Portfolio not found</h1>
          <Button onClick={() => onNavigate?.("/projects")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => onNavigate?.("/projects")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Developer Portfolio
          </h1>
          <p className="text-muted-foreground">
            Showcase of completed projects and achievements
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg"
                    alt={portfolio?.user?.name}
                  />
                  <AvatarFallback>
                    {portfolio?.user?.name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl">
                    {portfolio?.user?.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {portfolio?.user?.title || "Backend Developer"}
                  </CardDescription>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    {portfolio?.user?.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {portfolio?.user?.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(portfolio?.user?.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {portfolio?.user?.bio || "Passionate backend developer building scalable applications"}
              </p>
              <div className="flex flex-wrap gap-2">
                {portfolio?.user?.email && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${portfolio?.user?.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                )}
                {portfolio?.user?.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={portfolio?.user?.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                {portfolio?.user?.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={portfolio?.user?.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {portfolio?.user?.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={portfolio?.user?.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Projects Tabs */}
          <Tabs defaultValue="completed" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="completed">
                Completed Projects ({portfolio?.completedProjects?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="in-progress">
                In Progress ({portfolio?.inProgressProjects?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4">
                {portfolio?.completedProjects?.map((project: any) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription
                            dangerouslySetInnerHTML={{ __html: project.summary }}
                            className="line-clamp-2"
                          />
                        </div>
                        <Badge variant="outline" className="border-green-600 text-green-600">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {project?.technologies?.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      {project?.repositoryUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            View Repository
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {(!portfolio?.completedProjects || portfolio?.completedProjects?.length === 0) && (
                  <Card>
                    <CardContent className="text-center py-8 text-muted-foreground">
                      No completed projects yet
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-4">
              <div className="grid gap-4">
                {portfolio?.inProgressProjects?.map((project: any) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription
                            dangerouslySetInnerHTML={{ __html: project.summary }}
                            className="line-clamp-2"
                          />
                        </div>
                        <Badge variant="outline" className="border-blue-600 text-blue-600">
                          In Progress
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{project?.progress || 0}%</span>
                        </div>
                        <Progress value={project?.progress || 0} className="h-2" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project?.technologies?.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(!portfolio?.inProgressProjects || portfolio?.inProgressProjects?.length === 0) && (
                  <Card>
                    <CardContent className="text-center py-8 text-muted-foreground">
                      No projects in progress
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Total Points</span>
                </div>
                <span className="font-bold">{portfolio?.stats?.totalPoints || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Completed</span>
                </div>
                <span className="font-bold">{portfolio?.stats?.completedProjects || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">In Progress</span>
                </div>
                <span className="font-bold">{portfolio?.stats?.inProgressProjects || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Rank</span>
                </div>
                <span className="font-bold">#{portfolio?.stats?.rank || "N/A"}</span>
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {portfolio?.skills?.map((skill: string) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
                {(!portfolio?.skills || portfolio?.skills?.length === 0) && (
                  <p className="text-sm text-muted-foreground">No skills listed</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Achievements Card */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {portfolio?.achievements?.map((achievement: any) => (
                <div key={achievement.id} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
              {(!portfolio?.achievements || portfolio?.achievements?.length === 0) && (
                <p className="text-sm text-muted-foreground">No achievements yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
