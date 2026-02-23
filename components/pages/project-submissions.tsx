"use client";

import { useState, useEffect } from "react";
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
import { useAppStore } from "@/lib/store";
import { Loader } from "../ui/loader";

interface ProjectSubmissionsPageProps {
  onNavigate?: (path: string) => void;
}

export function ProjectSubmissionsPage({
  onNavigate,
}: ProjectSubmissionsPageProps) {
  const store = useAppStore();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Fetch submissions
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setLoading(true);
        const data = await store.getProjectSubmissions({
          status: statusFilter === "all" ? undefined : statusFilter,
          mine: true,
          page: currentPage,
          pageSize,
        });
        setSubmissions(data?.solutions || data || []);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, [statusFilter, currentPage]);

  // Fetch stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await store.getSubmissionStats({ mine: true });
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    }

    fetchStats();
  }, []);

  const filteredSubmissions = submissions.filter((submission) => {
    if (!searchQuery) return true;
    const matchesSearch = submission.project?.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
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

  // Calculate stats from API or use provided stats
  const displayStats = stats || {
    total: submissions.length,
    approved: submissions.filter((s) => s.status === "approved").length,
    pending: submissions.filter((s) => s.status === "pending").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
    averageScore:
      submissions.filter((s) => s.score).reduce((acc, s) => acc + s.score, 0) /
      submissions.filter((s) => s.score).length || 0,
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader isLoader={true} />
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
            <div className="text-2xl font-bold">{displayStats.total}</div>
            <p className="text-xs text-muted-foreground">submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.approved}</div>
            <p className="text-xs text-muted-foreground">projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.pending}</div>
            <p className="text-xs text-muted-foreground">in review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.rejected}</div>
            <p className="text-xs text-muted-foreground">to revise</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.averageScore.toFixed(0)}%</div>
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
