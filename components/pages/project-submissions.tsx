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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Search,
  Trophy,
  XCircle,
  Calendar,
  Star,
} from "lucide-react";

interface ProjectSubmissionsPageProps {
  onNavigate?: (path: string) => void;
}

const DUMMY_SUBMISSIONS = [
  {
    id: "1",
    project: {
      title: "Build a REST API with Rate Limiting",
      slug: "rest-api-rate-limiting",
      level: "intermediate",
    },
    submittedAt: "2026-02-01T10:30:00Z",
    status: "approved",
    score: 95,
    feedback: "Excellent implementation! Great use of Redis for rate limiting.",
    repositoryUrl: "https://github.com/user/rest-api-rate-limiting",
    liveUrl: "https://api-demo.example.com",
    technologies: ["Node.js", "Express", "Redis", "PostgreSQL"],
  },
  {
    id: "2",
    project: {
      title: "Real-time Chat Application",
      slug: "realtime-chat-app",
      level: "advance",
    },
    submittedAt: "2026-01-28T14:20:00Z",
    status: "approved",
    score: 92,
    feedback: "Well-structured WebSocket implementation. Consider adding message persistence.",
    repositoryUrl: "https://github.com/user/realtime-chat",
    liveUrl: "https://chat-demo.example.com",
    technologies: ["Node.js", "Socket.io", "MongoDB", "Docker"],
  },
  {
    id: "3",
    project: {
      title: "Task Queue System",
      slug: "task-queue-system",
      level: "advance",
    },
    submittedAt: "2026-01-25T09:15:00Z",
    status: "pending",
    score: null,
    feedback: null,
    repositoryUrl: "https://github.com/user/task-queue",
    liveUrl: null,
    technologies: ["Python", "Celery", "RabbitMQ", "Redis"],
  },
  {
    id: "4",
    project: {
      title: "Authentication Service with OAuth",
      slug: "oauth-auth-service",
      level: "intermediate",
    },
    submittedAt: "2026-01-20T16:45:00Z",
    status: "approved",
    score: 88,
    feedback: "Good OAuth implementation. Add more comprehensive error handling.",
    repositoryUrl: "https://github.com/user/oauth-service",
    liveUrl: "https://auth.example.com",
    technologies: ["Node.js", "Passport.js", "JWT", "PostgreSQL"],
  },
  {
    id: "5",
    project: {
      title: "File Upload Service with S3",
      slug: "file-upload-s3",
      level: "beginners",
    },
    submittedAt: "2026-01-18T11:00:00Z",
    status: "rejected",
    score: 65,
    feedback: "Missing proper file validation and security measures. Please review the requirements.",
    repositoryUrl: "https://github.com/user/file-upload",
    liveUrl: null,
    technologies: ["Node.js", "AWS S3", "Multer"],
  },
  {
    id: "6",
    project: {
      title: "GraphQL API with DataLoader",
      slug: "graphql-dataloader",
      level: "advance",
    },
    submittedAt: "2026-01-15T13:30:00Z",
    status: "approved",
    score: 97,
    feedback: "Outstanding! Excellent use of DataLoader for N+1 query optimization.",
    repositoryUrl: "https://github.com/user/graphql-api",
    liveUrl: "https://graphql.example.com",
    technologies: ["Node.js", "GraphQL", "DataLoader", "PostgreSQL"],
  },
];

export function ProjectSubmissionsPage({
  onNavigate,
}: ProjectSubmissionsPageProps) {
  const [submissions] = useState<any[]>(DUMMY_SUBMISSIONS);
  const [loading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = submission.project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      beginners: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
      intermediate: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
      advance: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    };
    return (
      <Badge className={colors[level as keyof typeof colors] || ""}>
        {level}
      </Badge>
    );
  };

  const stats = {
    total: submissions.length,
    approved: submissions.filter((s) => s.status === "approved").length,
    pending: submissions.filter((s) => s.status === "pending").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
    averageScore:
      submissions.filter((s) => s.score).reduce((acc, s) => acc + s.score, 0) /
        submissions.filter((s) => s.score).length || 0,
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => onNavigate?.("/projects")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
          <p className="text-muted-foreground">
            Track your project submissions and feedback
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">in review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">to revise</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">average</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search submissions..."
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">
                        {submission.project.title}
                      </CardTitle>
                      {getLevelBadge(submission.project.level)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                      {submission.score && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-600" />
                          Score: {submission.score}%
                        </div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {submission.technologies.map((tech: string) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      <Code2 className="h-3 w-3 mr-1" />
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Feedback */}
                {submission.feedback && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Reviewer Feedback:</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.feedback}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {submission.repositoryUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={submission.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View Repository
                      </a>
                    </Button>
                  )}
                  {submission.liveUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={submission.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onNavigate?.(`/projects/${submission.project.slug}`)
                    }
                  >
                    View Project Details
                  </Button>
                  {submission.status === "rejected" && (
                    <Button size="sm">Resubmit Project</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredSubmissions.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Start working on projects to see your submissions here"}
                </p>
                <Button onClick={() => onNavigate?.("/projects")}>
                  Browse Projects
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
    </div>
  );
}
