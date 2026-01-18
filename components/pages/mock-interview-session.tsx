"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  useConnectionState,
  useTracks,
  useParticipants,
  useLocalParticipant,
  VideoTrack,
  AudioTrack,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { ConnectionState, Track, RoomEvent } from "livekit-client";
import { useUser } from "@/hooks/use-user";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  Loader2,
  MessageSquare,
  HelpCircle,
  FileText,
  Bot,
  User,
  Wifi,
  WifiOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Volume2,
  VolumeX,
} from "lucide-react";

// Custom Components
import { InterviewTranscriptPanel } from "./mock-interviews/interview-transcript-panel";
import { InterviewHeader } from "./mock-interviews/interview-header";
import { InterviewQuestionCard } from "./mock-interviews/interview-question-card";

// Types
interface InterviewSession {
  id: string;
  title?: string;
  status: string;
  scheduledTime?: string;
  duration?: number;
  template?: {
    id: string;
    name: string;
    difficulty: string;
    duration: string;
    topics?: string[];
    description?: string;
  };
  questions?: InterviewQuestion[];
  interviewConfig?: {
    difficulty?: string;
    topics?: string[];
    duration?: number;
  };
}

interface InterviewQuestion {
  id: string;
  question: string;
  type: string;
  difficulty: string;
  timeLimit: number;
}

interface MockInterviewSessionProps {
  sessionId: string;
  onNavigate: (path: string) => void;
}

// =============================================================================
// VOICE ASSISTANT STAGE - Handles AI Agent Audio/Video
// =============================================================================
function VoiceAssistantStage() {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* AI Avatar with Audio Visualizer */}
      <div className="relative">
        {/* Outer glow rings */}
        <div className="absolute inset-0 -m-12">
          <div
            className={cn(
              "w-48 h-48 rounded-full border-2 border-primary/20",
              state === "speaking" && "animate-ping"
            )}
            style={{ animationDuration: "2s" }}
          />
        </div>
        <div className="absolute inset-0 -m-6">
          <div
            className={cn(
              "w-36 h-36 rounded-full border border-primary/30",
              state !== "disconnected" && "animate-pulse"
            )}
          />
        </div>

        {/* Main avatar with visualizer */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-[hsl(190,83%,34%)] p-[3px]">
          <div className="w-full h-full rounded-full bg-[hsl(222,25%,16%)] flex items-center justify-center overflow-hidden">
            {audioTrack ? (
              <BarVisualizer
                state={state}
                trackRef={audioTrack}
                barCount={5}
                className="w-16 h-16"
              />
            ) : (
              <Bot className="w-12 h-12 text-primary" />
            )}
          </div>
        </div>

        {/* Status indicator */}
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-[hsl(222,25%,16%)] flex items-center justify-center",
            state === "speaking"
              ? "bg-green-500"
              : state === "listening"
              ? "bg-blue-500"
              : state === "connecting"
              ? "bg-yellow-500"
              : "bg-gray-500"
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full bg-white",
              state !== "disconnected" && "animate-pulse"
            )}
          />
        </div>
      </div>

      {/* Status Text */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-white">Kap AI Interviewer</h3>
        <p className="text-sm text-muted-foreground mt-1 capitalize">
          {state === "speaking"
            ? "Speaking..."
            : state === "listening"
            ? "Listening to you..."
            : state === "thinking"
            ? "Processing..."
            : state === "connecting"
            ? "Connecting..."
            : "Ready"}
        </p>
      </div>

      {/* Voice Activity Bars */}
      <div className="flex items-center gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 rounded-full transition-all duration-150",
              state === "speaking"
                ? "bg-green-500 animate-[audioWave_0.5s_ease-in-out_infinite]"
                : state === "listening"
                ? "bg-blue-500 animate-pulse"
                : "bg-primary/30"
            )}
            style={{
              height: state === "speaking" ? `${12 + i * 4}px` : "8px",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// INTERVIEW STAGE - Main Video/Audio Stage
// =============================================================================
function InterviewStage({ className }: { className?: string }) {
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  const connectionState = useConnectionState();
  const isConnected = connectionState === ConnectionState.Connected;

  // Get all tracks
  const tracks = useTracks(
    [Track.Source.Camera, Track.Source.Microphone, Track.Source.ScreenShare],
    { onlySubscribed: true }
  );

  // Find local video track
  const localVideoTrack = tracks.find(
    (t) =>
      t.participant.identity === localParticipant?.identity &&
      t.source === Track.Source.Camera
  );

  // Find remote participant (AI agent)
  const remoteParticipant = participants.find(
    (p) => p.identity !== localParticipant?.identity
  );

  // Find remote tracks
  const remoteVideoTrack = tracks.find(
    (t) =>
      t.participant.identity !== localParticipant?.identity &&
      t.source === Track.Source.Camera
  );

  const remoteAudioTrack = tracks.find(
    (t) =>
      t.participant.identity !== localParticipant?.identity &&
      t.source === Track.Source.Microphone
  );

  return (
    <div className={cn("relative w-full h-full min-h-[400px]", className)}>
      {/* Main Area - AI Interviewer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,30%,12%)] to-[hsl(222,25%,8%)] rounded-2xl overflow-hidden">
        {/* CRITICAL: Render AudioTrack for remote audio playback */}
        {remoteAudioTrack && (
          <AudioTrack trackRef={remoteAudioTrack} volume={1} />
        )}

        {/* Video or Avatar Placeholder */}
        {remoteVideoTrack ? (
          <VideoTrack
            trackRef={remoteVideoTrack}
            className="w-full h-full object-cover"
          />
        ) : (
          <VoiceAssistantStage />
        )}

        {/* AI Label */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-white">
              {remoteParticipant?.identity || "Kap AI"}
            </span>
            <Bot className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Connection Status */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border",
              isConnected
                ? "bg-green-500/20 border-green-500/30"
                : "bg-yellow-500/20 border-yellow-500/30"
            )}
          >
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-xs font-medium text-green-400">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-400">
                  Connecting...
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Local Video - Picture in Picture */}
      <div className="absolute bottom-4 right-4 w-48 h-36 rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20 bg-[hsl(222,25%,16%)] z-10">
        {localVideoTrack ? (
          <div className="relative w-full h-full">
            <VideoTrack
              trackRef={localVideoTrack}
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
              <User className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-white">You</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground mt-2">
              Camera off
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// MEDIA CONTROLS - Mic, Camera, Speaker, End Call
// =============================================================================
function MediaControls({ onEndInterview }: { onEndInterview: () => void }) {
  const { localParticipant, isMicrophoneEnabled, isCameraEnabled } =
    useLocalParticipant();
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);

  const toggleMicrophone = useCallback(async () => {
    await localParticipant?.setMicrophoneEnabled(!isMicrophoneEnabled);
  }, [localParticipant, isMicrophoneEnabled]);

  const toggleCamera = useCallback(async () => {
    await localParticipant?.setCameraEnabled(!isCameraEnabled);
  }, [localParticipant, isCameraEnabled]);

  const toggleSpeaker = useCallback(() => {
    const newMuted = !isSpeakerMuted;
    setIsSpeakerMuted(newMuted);

    // Mute all audio elements on the page
    document.querySelectorAll("audio").forEach((audio) => {
      audio.muted = newMuted;
      if (!newMuted) audio.volume = 1;
    });
  }, [isSpeakerMuted]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl">
        {/* Microphone */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMicrophone}
              className={cn(
                "w-12 h-12 rounded-xl transition-all",
                isMicrophoneEnabled
                  ? "bg-secondary hover:bg-secondary/80"
                  : "bg-destructive/20 hover:bg-destructive/30 text-destructive"
              )}
            >
              {isMicrophoneEnabled ? (
                <Mic className="w-5 h-5" />
              ) : (
                <MicOff className="w-5 h-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isMicrophoneEnabled ? "Mute" : "Unmute"}
          </TooltipContent>
        </Tooltip>

        {/* Camera */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCamera}
              className={cn(
                "w-12 h-12 rounded-xl transition-all",
                isCameraEnabled
                  ? "bg-secondary hover:bg-secondary/80"
                  : "bg-destructive/20 hover:bg-destructive/30 text-destructive"
              )}
            >
              {isCameraEnabled ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isCameraEnabled ? "Stop Video" : "Start Video"}
          </TooltipContent>
        </Tooltip>

        {/* Speaker */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSpeaker}
              className={cn(
                "w-12 h-12 rounded-xl transition-all",
                !isSpeakerMuted
                  ? "bg-secondary hover:bg-secondary/80"
                  : "bg-destructive/20 hover:bg-destructive/30 text-destructive"
              )}
            >
              {!isSpeakerMuted ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!isSpeakerMuted ? "Mute Speaker" : "Unmute Speaker"}
          </TooltipContent>
        </Tooltip>

        <div className="w-px h-8 bg-border/50 mx-1" />

        {/* End Interview */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              onClick={onEndInterview}
              className="w-12 h-12 rounded-xl shadow-lg shadow-destructive/20"
            >
              <PhoneOff className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>End Interview</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

// =============================================================================
// INTERVIEW ROOM - Main Room Component Inside LiveKitRoom
// =============================================================================
function InterviewRoom({
  sessionId,
  session,
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  timeRemaining,
  onNavigate,
}: {
  sessionId: string;
  session: InterviewSession;
  questions: InterviewQuestion[];
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
    onNavigate(`/mock-interviews/${sessionId}/results`);
  };

  const handleBack = () => {
    onNavigate("/mock-interviews");
  };

  const interviewTitle =
    session?.template?.name || session?.title || "Mock Interview";
  const interviewType =
    session?.template?.difficulty ||
    session?.interviewConfig?.difficulty ||
    "Technical Interview";

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <InterviewHeader
        interviewTitle={interviewTitle}
        interviewType={interviewType}
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
          <div className="flex-1 relative min-h-0">
            <InterviewStage className="w-full h-full" />

            {/* Media Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <MediaControls onEndInterview={handleEndInterview} />
            </div>
          </div>

          {/* Question Card */}
          {currentQuestion && (
            <div className="flex-shrink-0">
              <InterviewQuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                onNextQuestion={handleNextQuestion}
                isLastQuestion={currentQuestionIndex === questions.length - 1}
              />
            </div>
          )}
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

      {/* CRITICAL: RoomAudioRenderer handles all remote audio playback */}
      <RoomAudioRenderer />
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================
export function MockInterviewSessionPage({
  sessionId,
  onNavigate,
}: MockInterviewSessionProps) {
  const user = useUser();
  const store = useAppStore();

  // Session state
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(2700);

  // LiveKit state
  const [token, setToken] = useState<string>("");
  const [serverUrl, setServerUrl] = useState<string>("");

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize session
  const initializeSession = useCallback(async () => {
    if (!sessionId || !user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      // Fetch session details
      const sessionData = await store.getInterviewSession(sessionId);
      if (!sessionData) throw new Error("Interview session not found");

      setSession(sessionData);

      // Set questions
      if (sessionData.questions?.length > 0) {
        setQuestions(sessionData.questions);
      } else {
        setQuestions([
          {
            id: "dynamic-1",
            question: "The AI interviewer will guide you through the questions.",
            type: sessionData.template?.topics?.[0] || "Technical",
            difficulty: sessionData.template?.difficulty || "Intermediate",
            timeLimit: 10,
          },
        ]);
      }

      // Set duration
      const durationMinutes =
        sessionData.duration ||
        sessionData.interviewConfig?.duration ||
        parseInt(sessionData.template?.duration || "45");
      setTimeRemaining(durationMinutes * 60);

      // Get LiveKit token
      const tokenData = await store.getMockInterviewSessionToken(sessionId);
      if (!tokenData?.token) throw new Error("Failed to get session token");

      setToken(tokenData.token);
      setServerUrl(
        tokenData.wsUrl || "wss://mock-interview-up2y2ttf.livekit.cloud"
      );
    } catch (err: any) {
      console.error("Failed to initialize session:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to initialize interview session."
      );
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, user?.id, store]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  // Timer countdown
  useEffect(() => {
    if (!token || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onNavigate(`/mock-interviews/${sessionId}/results`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [token, timeRemaining, sessionId, onNavigate]);

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
            <h2 className="text-lg font-semibold">Preparing your interview...</h2>
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

  // Session not found
  if (!session) {
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
                  The interview session doesn't exist or has expired.
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

  // Main interview room with LiveKit
  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={!!token && !!serverUrl}
      audio={true}
      video={true}
      options={{
        adaptiveStream: true,
        dynacast: true,
        publishDefaults: {
          simulcast: false,
          audioPreset: { maxBitrate: 48000 },
        },
      }}
      data-lk-theme="default"
      className="h-screen"
      onConnected={() => console.log("✅ Connected to LiveKit room")}
      onDisconnected={() => console.log("❌ Disconnected from LiveKit room")}
      onError={(error) => console.error("LiveKit error:", error)}
    >
      <InterviewRoom
        sessionId={sessionId}
        session={session}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        timeRemaining={timeRemaining}
        onNavigate={onNavigate}
      />
    </LiveKitRoom>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================
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
