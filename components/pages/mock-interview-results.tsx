"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Download,
  Share2,
  Star,
  Target,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Clock,
  XCircle,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

// Types
interface TranscriptEntry {
  role: "interviewer" | "candidate";
  content: string;
  timestamp: string;
}

interface TopicBreakdown {
  topic: string;
  score: number;
  feedback?: string;
}

interface SessionReport {
  id: string;
  sessionId: string;
  overallScore: number;
  result: "PASS" | "FAIL" | "BORDERLINE";
  topicBreakdown: TopicBreakdown[];
  strengths: string[];
  weaknesses: string[];
  recommendations: Array<{
    title: string;
    description: string;
    resources?: string[];
  }>;
  summary?: string;
  interview?: {
    position?: string;
    company?: string;
    difficulty?: string;
    duration?: number;
  };
  status?: string;
}

interface MockInterviewResultsProps {
  sessionId: string;
  onNavigate: (path: string) => void;
}

type ReportStatus =
  | "loading"
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "skipped";

// Helper functions
function getGradeFromScore(score: number): string {
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 85) return "B+";
  if (score >= 80) return "B";
  if (score >= 75) return "C+";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function getGradeColor(grade: string): string {
  switch (grade) {
    case "A+":
    case "A":
      return "text-green-600";
    case "B+":
    case "B":
      return "text-blue-600";
    case "C+":
    case "C":
      return "text-yellow-600";
    default:
      return "text-red-600";
  }
}

function getPerformanceMessage(
  score: number,
  result: string
): { title: string; description: string } {
  if (result === "PASS" || score >= 80) {
    return {
      title: "Excellent Performance!",
      description:
        "You demonstrated strong technical skills and clear communication throughout the interview.",
    };
  }
  if (result === "BORDERLINE" || score >= 60) {
    return {
      title: "Good Effort!",
      description:
        "You showed solid understanding in several areas. Review the feedback below to improve.",
    };
  }
  return {
    title: "Keep Practicing!",
    description:
      "There's room for improvement. Focus on the areas highlighted in the feedback.",
  };
}

// Loading State Component
function LoadingState() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Loader2 className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-lg font-semibold mt-6">Loading results...</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Please wait while we fetch your interview results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Processing State Component
function ProcessingState({ attempts }: { attempts?: number }) {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-10 h-10 text-primary animate-pulse" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-6">
            Analyzing Your Interview
          </h2>
          <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">
            Our AI is reviewing your responses and generating detailed feedback.
            This usually takes 1-2 minutes.
          </p>
          <div className="flex items-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            <div
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          {attempts && attempts > 0 && (
            <p className="text-xs text-muted-foreground mt-4">
              Processing attempt {attempts}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Failed State Component
function FailedState({
  error,
  onRetry,
  isRetrying,
  onNavigate,
}: {
  error?: string;
  onRetry: () => void;
  isRetrying: boolean;
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold mt-6">
            Report Generation Failed
          </h2>
          <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">
            {error ||
              "We encountered an issue while generating your report. Please try again."}
          </p>
          <div className="flex items-center gap-3 mt-6">
            <Button variant="outline" onClick={() => onNavigate("/mock-interviews")}>
              Back to Interviews
            </Button>
            <Button onClick={onRetry} disabled={isRetrying}>
              {isRetrying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Skipped State Component
function SkippedState({
  reason,
  onNavigate,
}: {
  reason?: string;
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold mt-6">
            Insufficient Data for Report
          </h2>
          <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">
            {reason ||
              "The interview session didn't have enough conversation data to generate a meaningful report. Please complete a full interview session."}
          </p>
          <Button className="mt-6" onClick={() => onNavigate("/mock-interviews")}>
            <Trophy className="w-4 h-4 mr-2" />
            Start New Interview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Results Page Component
export function MockInterviewResultsPage({
  sessionId,
  onNavigate,
}: MockInterviewResultsProps) {
  const store = useAppStore();

  // State
  const [report, setReport] = useState<SessionReport | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [status, setStatus] = useState<ReportStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // Fetch report with polling
  const fetchReport = useCallback(async () => {
    try {
      const data = await store.getSessionReport(sessionId);

      if (!data) {
        setStatus("failed");
        setError("Session not found");
        return false;
      }

      // Check status from response
      const reportStatus = data.status?.toUpperCase();

      if (reportStatus === "PENDING" || reportStatus === "PROCESSING") {
        setStatus(reportStatus.toLowerCase() as ReportStatus);
        setAttempts(data.attempts || 0);
        return true; // Continue polling
      }

      if (reportStatus === "SKIPPED") {
        setStatus("skipped");
        setError(data.reason || null);
        return false;
      }

      if (reportStatus === "FAILED") {
        setStatus("failed");
        setError(data.error || null);
        setAttempts(data.attempts || 0);
        return false;
      }

      // Status is COMPLETED or report exists
      setReport(data);
      setStatus("completed");

      // Also fetch transcript
      try {
        const transcriptData = await store.getSessionTranscript(sessionId);
        if (transcriptData?.transcript) {
          setTranscript(transcriptData.transcript);
        }
      } catch (transcriptErr) {
        console.error("Failed to fetch transcript:", transcriptErr);
      }

      return false; // Stop polling
    } catch (err: any) {
      console.error("Failed to fetch report:", err);

      // If 202, it's still processing
      if (err?.response?.status === 202) {
        const data = err.response.data?.data;
        setStatus((data?.status?.toLowerCase() || "processing") as ReportStatus);
        setAttempts(data?.attempts || 0);
        return true; // Continue polling
      }

      setStatus("failed");
      setError(
        err?.response?.data?.message || err?.message || "Failed to fetch report"
      );
      return false;
    }
  }, [sessionId, store]);

  // Initial fetch and polling
  useEffect(() => {
    let pollTimeout: NodeJS.Timeout;
    let isMounted = true;

    const poll = async () => {
      if (!isMounted) return;

      const shouldContinue = await fetchReport();

      if (shouldContinue && isMounted) {
        // Poll every 5 seconds
        pollTimeout = setTimeout(poll, 5000);
      }
    };

    poll();

    return () => {
      isMounted = false;
      clearTimeout(pollTimeout);
    };
  }, [fetchReport]);

  // Handle retry
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await store.retryReportGeneration(sessionId);
      setStatus("pending");
      setError(null);
      // Restart polling
      fetchReport();
    } catch (err: any) {
      console.error("Failed to retry:", err);
      setError(err?.response?.data?.message || "Failed to retry");
    } finally {
      setIsRetrying(false);
    }
  };

  // Render based on status
  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "pending" || status === "processing") {
    return <ProcessingState attempts={attempts} />;
  }

  if (status === "skipped") {
    return <SkippedState reason={error || undefined} onNavigate={onNavigate} />;
  }

  if (status === "failed" || !report) {
    return (
      <FailedState
        error={error || undefined}
        onRetry={handleRetry}
        isRetrying={isRetrying}
        onNavigate={onNavigate}
      />
    );
  }

  // Extract data from report
  const grade = getGradeFromScore(report.overallScore);
  const performance = getPerformanceMessage(report.overallScore, report.result);

  // Calculate category scores from topicBreakdown or use defaults
  const topicScores = report.topicBreakdown || [];
  const technicalScore =
    topicScores.find((t) => t.topic?.toLowerCase().includes("technical"))
      ?.score ||
    topicScores[0]?.score ||
    report.overallScore;
  const communicationScore =
    topicScores.find((t) => t.topic?.toLowerCase().includes("communication"))
      ?.score ||
    topicScores[1]?.score ||
    Math.max(report.overallScore - 5, 0);
  const problemSolvingScore =
    topicScores.find((t) => t.topic?.toLowerCase().includes("problem"))
      ?.score ||
    topicScores[2]?.score ||
    Math.max(report.overallScore - 3, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Interview Results</h1>
          <p className="text-muted-foreground">
            {report.interview?.position || "Mock Interview"} •{" "}
            {report.interview?.company || "Practice Session"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline" disabled>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => onNavigate("/mock-interviews")}>
            Back to Interviews
          </Button>
        </div>
      </div>

      {/* Overall Score Card */}
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getGradeColor(grade)}`}>
                {grade}
              </div>
              <p className="text-sm text-muted-foreground">Overall Grade</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-primary">
                {report.overallScore}
              </div>
              <p className="text-sm text-muted-foreground">Score</p>
            </div>
            <div className="text-center">
              <Badge
                variant={
                  report.result === "PASS"
                    ? "default"
                    : report.result === "BORDERLINE"
                    ? "secondary"
                    : "destructive"
                }
                className="text-lg px-4 py-1"
              >
                {report.result}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">Result</p>
            </div>
          </div>
          <CardTitle className="text-2xl">{performance.title}</CardTitle>
          <CardDescription>{performance.description}</CardDescription>
          {report.summary && (
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              {report.summary}
            </p>
          )}
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Technical Skills
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicalScore}%</div>
            <Progress value={technicalScore} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communication</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communicationScore}%</div>
            <Progress value={communicationScore} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Problem Solving
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{problemSolvingScore}%</div>
            <Progress value={problemSolvingScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feedback" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="topics">Topic Analysis</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                {report.strengths && report.strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {report.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No specific strengths identified yet.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <TrendingUp className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                {report.weaknesses && report.weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {report.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No specific areas for improvement identified.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Topic Analysis Tab */}
        <TabsContent value="topics" className="space-y-4">
          {topicScores.length > 0 ? (
            <div className="space-y-4">
              {topicScores.map((topic, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{topic.topic}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            topic.score >= 80
                              ? "default"
                              : topic.score >= 60
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {topic.score}%
                        </Badge>
                        {topic.score >= 80 ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {topic.feedback && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {topic.feedback}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  Detailed topic analysis is not available for this session.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Transcript Tab */}
        <TabsContent value="transcript" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Interview Transcript
              </CardTitle>
              <CardDescription>
                Complete conversation log from your interview session
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transcript.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {transcript.map((entry, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Badge
                          variant={
                            entry.role === "interviewer"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {entry.role === "interviewer" ? "AI" : "You"}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{entry.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No transcript available for this session.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          {report.recommendations && report.recommendations.length > 0 ? (
            <div className="space-y-4">
              {report.recommendations.map((recommendation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {recommendation.title}
                    </CardTitle>
                    <CardDescription>
                      {recommendation.description}
                    </CardDescription>
                  </CardHeader>
                  {recommendation.resources &&
                    recommendation.resources.length > 0 && (
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-medium">Recommended Resources:</h4>
                          <ul className="space-y-1">
                            {recommendation.resources.map(
                              (resource, resourceIndex) => (
                                <li
                                  key={resourceIndex}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                  <span className="text-sm">{resource}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </CardContent>
                    )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  No specific recommendations available for this session.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="flex items-center justify-center gap-4 py-6">
          <Button onClick={() => onNavigate("/mock-interviews")}>
            <Trophy className="h-4 w-4 mr-2" />
            Book Another Interview
          </Button>
          <Button variant="outline" onClick={() => onNavigate("/courses")}>
            <BookOpen className="h-4 w-4 mr-2" />
            Explore Courses
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default MockInterviewResultsPage;
