// "use client";

import { useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  StartAudio,
  useAgent,
  useSession,
  VideoConference,
  useTranscriptions,
  VideoTrack,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Input } from "@/components/ui/input";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  Clock,
  Send,
  Phone,
  Settings,
  User,
} from "lucide-react";
import {
  getMockInterviewById,
  getInterviewQuestions,
} from "@/lib/mock-interview-data";
import { useUser } from "@/hooks/use-user";
import { Room, RoomEvent, TokenSource } from "livekit-client";
import { TranscriptCollector } from "./transcriptCollector";
import { InterviewStage } from "./mock-interviews/interview-stage";
import { MediaControls } from "./mock-interviews/media-controls";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

interface MockInterviewSessionProps {
  interviewId: string;
  onNavigate: (path: string) => void;
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
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes for demo
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "interviewer",
      message:
        "Hello! Welcome to your mock interview. I'm Kap AI, and I'll be conducting your interview today. Are you ready to begin?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [token, setToken] = useState<string>("");
  const [url, setUrl] = useState<string>(
    "wss://mock-interview-up2y2ttf.livekit.cloud"
  );
  const [participantName, setParticipantName] = useState<string>("");
  const [connected, setConnected] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    console.log("Live Transcript:", liveTranscript);
  }, [liveTranscript]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const sessionData = await store.getInterviewSession(interviewId);
        
        if (sessionData) {
          setSession(sessionData);
          
          // Create LiveKit room with agent
          try {
            const roomData = await store.createInterviewRoom(interviewId, true);
            
            if (roomData?.token) {
              setToken(roomData.token);
            }
            if (roomData?.url) {
              setUrl(roomData.url);
            }
            
            console.log("LiveKit room created:", roomData);
          } catch (roomError) {
            console.error("Failed to create LiveKit room:", roomError);
            toast.error("Failed to initialize video session");
          }
          
          console.log("Session data loaded:", sessionData);
        } else {
          toast.error("Session not found");
          onNavigate("/mock-interviews");
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        toast.error("Failed to load interview session");
        onNavigate("/mock-interviews");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSession();
  }, [interviewId]);

  // useEffect(() => {
  //   if (!interview) {
  //     onNavigate("/mock-interviews");
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     setTimeRemaining((prev) => {
  //       if (prev <= 1) {
  //         handleEndInterview();
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [interview, onNavigate]);

  const onConnected = () => {
    setConnected(true);
    console.log("Connected to room");
  };

  const onDisconnected = (e: any) => {
    console.log("Disconnected from room", e);

    setConnected(false);
    setToken("");
    console.log("Disconnected from room");
  };

  const onError = (error: Error) => {
    console.error("Error:", error);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      sender: "candidate" as const,
      message: chatMessage,
      timestamp: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, newMessage]);
    setChatMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        sender: "interviewer" as const,
        message: "Thank you for your question. Let me help you with that...",
        timestamp: new Date().toISOString(),
      };
      setChatHistory((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
    } else {
      handleEndInterview();
    }
  };

  const handleEndInterview = () => {
    onNavigate(`/mock-interviews/${interviewId}/results`);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start actual recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop recording and process the answer
  };

  if (!interview) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p>Interview not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* <span className="text-2xl">{interview.type.icon}</span> */}
              <div>
                {/* <h1 className="text-lg font-semibold">{interview?.title}</h1> */}
                <p className="text-sm text-muted-foreground">
                  Mock Interview Session
                </p>
              </div>
            </div>
            <Badge variant="outline">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="destructive" onClick={handleEndInterview}>
              <Phone className="h-4 w-4 mr-2" />
              End Interview
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Main Interview Area */}
          <div className="w-full p-2">
            <LiveKitRoom
              className="bg-black text-primary"
              color="blue"
              serverUrl={url}
              token={token}
              connect={true}
              onConnected={onConnected}
              onDisconnected={onDisconnected}
              onError={onError}
              audio={true}
              video={true}
            >
              <InterviewStage />
              <MediaControls />
              <TranscriptCollector onUpdate={setLiveTranscript} />
            </LiveKitRoom>
          </div>
          <div className="border-t bg-card p-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Current Question</CardTitle>
                  <Badge variant="outline">{currentQuestion?.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">{currentQuestion?.question}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    {currentQuestion?.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {currentQuestion?.timeLimit} min suggested
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Answer:</label>
                  <Textarea
                    placeholder="Type your answer here or use voice recording..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    rows={4}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={
                        isRecording ? handleStopRecording : handleStartRecording
                      }
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </Button>
                    <Button onClick={handleNextQuestion}>
                      {currentQuestionIndex < questions?.length - 1
                        ? "Next Question"
                        : "Finish Interview"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 border-l bg-card flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat with Kap AI
            </h3>
            <p className="text-xs text-muted-foreground">
              Ask questions anytime during the interview
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "candidate"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    message.sender === "candidate"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask a question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterviewSessionPage;
