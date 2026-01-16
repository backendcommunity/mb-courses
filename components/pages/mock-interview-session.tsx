"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useConnectionState,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { ConnectionState } from "livekit-client";
import {
  getMockInterviewById,
  getInterviewQuestions,
} from "@/lib/mock-interview-data";
import { useUser } from "@/hooks/use-user";
import { useAppStore } from "@/lib/store";

// Custom Components
import { CustomInterviewStage } from "./mock-interviews/custom-interview-stage";
import { CustomMediaControls } from "./mock-interviews/custom-media-controls";
import { InterviewTranscriptPanel } from "./mock-interviews/interview-transcript-panel";
import { InterviewHeader } from "./mock-interviews/interview-header";
import { InterviewQuestionCard } from "./mock-interviews/interview-question-card";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Loader2,
  MessageSquare,
  HelpCircle,
  FileText,
} from "lucide-react";

interface MockInterviewSessionProps {
  interviewId: string;
  onNavigate: (path: string) => void;
}

// Inner component that uses LiveKit hooks
function InterviewRoom({
  interviewId,
  interview,
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  timeRemaining,
  onNavigate,
}: {
  interviewId: string;
  interview: any;
  questions: any[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number | ((prev: number) => number)) => void;
  timeRemaining: number;
  onNavigate: (path: string) => void;
}) {
  const connectionState = useConnectionState();
  const isConnected = connectionState === ConnectionState.Connected;
  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleEndInterview();
    }
  };

  const handleEndInterview = () => {
    onNavigate(`/mock-interviews/${interviewId}/results`);
  };

  const handleBack = () => {
    onNavigate("/mock-interviews");
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <InterviewHeader
        interviewTitle={interview?.type?.name || "Mock Interview"}
        interviewType={interview?.type?.difficulty || "Technical Interview"}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        isConnected={isConnected}
        onBack={handleBack}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Video Stage */}
        <div className="flex-1 flex flex-col p-4 gap-4 min-w-0">
          {/* Video Area */}
          <div className="flex-1 relative min-h-0">
            <CustomInterviewStage className="w-full h-full" />

            {/* Media Controls - Floating at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <CustomMediaControls onEndInterview={handleEndInterview} />
            </div>
          </div>

          {/* Question Card - Below Video */}
          <div className="flex-shrink-0">
            <InterviewQuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
            />
          </div>
        </div>

        {/* Right Panel - Sidebar */}
        <div className="w-[380px] flex-shrink-0 border-l border-border bg-card/50 hidden lg:flex flex-col">
          <Tabs defaultValue="transcript" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4 pt-2">
              <TabsTrigger
                value="transcript"
                className="data-[state=active]:bg-secondary rounded-lg gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                className="data-[state=active]:bg-secondary rounded-lg gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Tips
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-secondary rounded-lg gap-2"
              >
                <FileText className="w-4 h-4" />
                Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transcript" className="flex-1 m-0 p-0">
              <InterviewTranscriptPanel className="h-full border-0 rounded-none" />
            </TabsContent>

            <TabsContent value="tips" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  <InterviewTips questionType={currentQuestion?.type} />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="notes" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <InterviewNotes />
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Audio Renderer */}
      <RoomAudioRenderer />
    </div>
  );
}

export function MockInterviewSessionPage({
  interviewId,
  onNavigate,
}: MockInterviewSessionProps) {
  const user = useUser();
  const store = useAppStore();
  const [interview] = useState(() => getMockInterviewById(interviewId));
  const [questions] = useState(() => getInterviewQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutes
  const [token, setToken] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize session - get token from backend
  const initializeSession = useCallback(async () => {
    if (!interviewId || !user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data } = await store.getMockInterviewSessionToken(interviewId);

      setToken(data.token);
      setUrl(data.wsUrl || "wss://mock-interview-up2y2ttf.livekit.cloud");
    } catch (err: any) {
      console.error("Failed to initialize session:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to initialize interview session. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [interviewId, user?.id, store]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  // Timer countdown
  useEffect(() => {
    if (!token) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onNavigate(`/mock-interviews/${interviewId}/results`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [token, interviewId, onNavigate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Loader2 className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">
              Preparing your interview...
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Connecting to Kap AI Interviewer
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    console.error("Interview session error:", error);
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Connection Failed</h2>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
              </div>
              <div className="flex gap-3 mt-2">
                <Button
                  variant="outline"
                  onClick={() => onNavigate("/mock-interviews")}
                >
                  Go Back
                </Button>
                <Button onClick={initializeSession}>Try Again</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Interview not found
  if (!interview) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Interview Not Found</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  The interview session you're looking for doesn't exist or has
                  expired.
                </p>
              </div>
              <Button onClick={() => onNavigate("/mock-interviews")}>
                Back to Interviews
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main interview room
  return (
    <LiveKitRoom
      token={token}
      serverUrl={url}
      connect={!!token && !!url}
      audio={true}
      video={true}
      data-lk-theme="default"
      className="h-screen"
      onConnected={() => console.log("Connected to LiveKit room")}
      onDisconnected={() => console.log("Disconnected from LiveKit room")}
      onError={(error) => console.error("LiveKit error:", error)}
    >
      <InterviewRoom
        interviewId={interviewId}
        interview={interview}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        timeRemaining={timeRemaining}
        onNavigate={onNavigate}
      />
    </LiveKitRoom>
  );
}

// Tips component for the sidebar
function InterviewTips({ questionType }: { questionType?: string }) {
  const tips: Record<string, { title: string; tips: string[] }> = {
    Conceptual: {
      title: "Conceptual Question Tips",
      tips: [
        "Start with a clear, concise definition",
        "Use examples to illustrate your understanding",
        "Mention real-world use cases",
        "Compare and contrast with related concepts",
      ],
    },
    Technical: {
      title: "Technical Question Tips",
      tips: [
        "Think out loud as you work through the problem",
        "Ask clarifying questions if needed",
        "Discuss trade-offs of different approaches",
        "Consider edge cases and error handling",
      ],
    },
    "System Design": {
      title: "System Design Tips",
      tips: [
        "Start by clarifying requirements and constraints",
        "Begin with a high-level architecture",
        "Discuss scalability and bottlenecks",
        "Consider data storage and retrieval patterns",
      ],
    },
    Coding: {
      title: "Coding Question Tips",
      tips: [
        "Understand the problem before coding",
        "Start with a brute force solution",
        "Optimize step by step",
        "Test with example inputs",
      ],
    },
    Behavioral: {
      title: "Behavioral Question Tips",
      tips: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Be specific with examples",
        "Focus on your contributions",
        "Show what you learned from the experience",
      ],
    },
  };

  const currentTips = tips[questionType || "Technical"] || tips.Technical;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">{currentTips.title}</h3>
      <ul className="space-y-2">
        {currentTips.tips.map((tip, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-medium">
              {index + 1}
            </span>
            {tip}
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-border">
        <h4 className="font-medium text-sm mb-2">General Tips</h4>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• Speak clearly and at a moderate pace</li>
          <li>• Take a moment to gather your thoughts</li>
          <li>• It's okay to ask for clarification</li>
          <li>• Stay calm and confident</li>
        </ul>
      </div>
    </div>
  );
}

// Notes component for the sidebar
function InterviewNotes() {
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Your Notes</h3>
      <p className="text-xs text-muted-foreground">
        Jot down key points during the interview. These won't be shared with the
        AI.
      </p>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Type your notes here..."
        className="w-full h-[300px] p-3 text-sm bg-secondary/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

export default MockInterviewSessionPage;
