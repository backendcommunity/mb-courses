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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Star,
  Code2,
  FileText,
  Upload,
  CheckCircle2,
  Play,
  Save,
  Share,
  ArrowLeft,
  Target,
  Lightbulb,
  ExternalLink,
  PlayCircle,
  Volume2,
  Maximize2,
  SkipBack,
  SkipForward,
  Pause,
} from "lucide-react";

interface Project30DayPageProps {
  dayNumber: string;
  onNavigate: (path: string) => void;
}

export function Project30DayPage({
  dayNumber,
  onNavigate,
}: Project30DayPageProps) {
  const [activeTab, setActiveTab] = useState("video");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1920); // 32 minutes in seconds
  const [volume, setVolume] = useState(80);
  const [code, setCode] = useState(`// Day ${dayNumber} - Real-time Chat API
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Redis client for storing user sessions
const redisClient = redis.createClient();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join room
  socket.on('join-room', (roomId, username) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', username);
  });
  
  // Handle messages
  socket.on('send-message', (roomId, message, username) => {
    io.to(roomId).emit('receive-message', {
      message,
      username,
      timestamp: new Date().toISOString()
    });
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`);

  const [projectUrl, setProjectUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");

  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Format time for display (HH:MM:SS)
  const formatLongTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the video playback
  };

  const projectData = {
    day: Number.parseInt(dayNumber),
    title: "Real-time Chat API",
    description:
      "Learn how to build a WebSocket-based chat API with rooms and user presence tracking",
    instructor: "Sarah Johnson",
    duration: "32 minutes",
    difficulty: "Medium",
    estimatedTime: "3-4 hours",
    xpReward: 100,
    technologies: ["Node.js", "Socket.io", "Redis", "Express"],
    videoUrl: "/placeholder.svg?height=400&width=800",
    videoThumbnail: "/placeholder.svg?height=400&width=800",
    status: "in-progress",
    requirements: [
      "Set up Express server with Socket.io",
      "Implement room-based chat functionality",
      "Add user presence indicators",
      "Store chat history in Redis",
      "Handle user join/leave events",
      "Add message timestamps",
      "Implement basic error handling",
    ],
    resources: [
      {
        title: "Socket.io Documentation",
        url: "https://socket.io/docs/",
        type: "documentation",
      },
      {
        title: "Redis Quick Start",
        url: "https://redis.io/docs/getting-started/",
        type: "documentation",
      },
      {
        title: "WebSocket Tutorial",
        url: "/tutorials/websockets",
        type: "video",
      },
    ],
    hints: [
      "Start with a basic Express server and add Socket.io step by step",
      "Use Redis to store active users and chat history",
      "Test your implementation with multiple browser tabs",
      "Consider rate limiting for message sending",
    ],
    testCases: [
      "Users can join different chat rooms",
      "Messages are delivered to all users in the same room",
      "User presence is tracked and displayed",
      "Chat history is persisted and retrievable",
    ],
  };

  const submitProject = () => {
    // Handle project submission
    console.log("Submitting project:", { projectUrl, submissionNotes });
    onNavigate("/dashboard/project30");
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("/dashboard/project30")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="bg-[#F2C94C]/10 text-[#F2C94C] border-[#F2C94C]/20"
              >
                Day {projectData.day}
              </Badge>
              <Badge
                variant={
                  projectData.difficulty === "Hard"
                    ? "destructive"
                    : projectData.difficulty === "Medium"
                    ? "default"
                    : "secondary"
                }
              >
                {projectData.difficulty}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {projectData.title}
            </h1>
            <p className="text-muted-foreground">{projectData.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">{projectData.duration}</span>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-[#F2C94C]" />
              <span className="text-sm font-medium">Instructor</span>
            </div>
            <p className="text-2xl font-bold mt-1">{projectData.instructor}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#F2C94C]" />
              <span className="text-sm font-medium">XP Reward</span>
            </div>
            <p className="text-2xl font-bold mt-1">{projectData.xpReward}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Project Time</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {projectData.estimatedTime}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Technologies</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {projectData.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video Player Panel */}
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="video">Video Lesson</TabsTrigger>
              <TabsTrigger value="code">Code Editor</TabsTrigger>
              <TabsTrigger value="submit">Submit Project</TabsTrigger>
            </TabsList>

            <TabsContent value="video">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Video Lesson
                  </CardTitle>
                  <CardDescription>
                    Watch the step-by-step tutorial to build this project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Video Player */}
                  <div className="relative rounded-md overflow-hidden bg-black aspect-video">
                    <img
                      src={projectData.videoThumbnail || "/placeholder.svg"}
                      alt="Video thumbnail"
                      className={`w-full h-full object-cover ${
                        isPlaying ? "hidden" : "block"
                      }`}
                    />
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="lg"
                          variant="ghost"
                          className="rounded-full w-16 h-16 bg-black/30 hover:bg-black/50 text-white"
                          onClick={togglePlayPause}
                        >
                          <PlayCircle className="h-10 w-10" />
                        </Button>
                      </div>
                    )}
                    {isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={projectData.videoUrl || "/placeholder.svg"}
                          alt="Video player"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 flex flex-col gap-2">
                      {/* Progress bar */}
                      <div className="w-full bg-gray-600 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-[#F2C94C] h-full"
                          style={{
                            width: `${(currentTime / duration) * 100}%`,
                          }}
                        ></div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white"
                          >
                            <SkipBack className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white"
                            onClick={togglePlayPause}
                          >
                            {isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white"
                          >
                            <SkipForward className="h-4 w-4" />
                          </Button>
                          <span className="text-xs">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4" />
                            <div className="w-16 bg-gray-600 h-1 rounded-full overflow-hidden">
                              <div
                                className="bg-white h-full"
                                style={{ width: `${volume}%` }}
                              ></div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white"
                          >
                            <Maximize2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Chapters */}
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Video Chapters</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-md bg-[#F2C94C]/10 border border-[#F2C94C]/20">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F2C94C] text-white text-xs">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Introduction</p>
                          <p className="text-xs text-muted-foreground">
                            00:00 - 02:45
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Setting Up the Express Server
                          </p>
                          <p className="text-xs text-muted-foreground">
                            02:46 - 08:30
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                          3
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Integrating Socket.io
                          </p>
                          <p className="text-xs text-muted-foreground">
                            08:31 - 15:20
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                          4
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Implementing Chat Rooms
                          </p>
                          <p className="text-xs text-muted-foreground">
                            15:21 - 22:15
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                          5
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Redis Integration
                          </p>
                          <p className="text-xs text-muted-foreground">
                            22:16 - 28:45
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                          6
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Testing and Conclusion
                          </p>
                          <p className="text-xs text-muted-foreground">
                            28:46 - 32:00
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Code Editor
                  </CardTitle>
                  <CardDescription>
                    Follow along with the video and write your code here
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border rounded-md bg-black text-white p-4 font-mono text-sm h-[600px]">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full resize-none border-none outline-none bg-transparent font-mono text-sm"
                      placeholder="Start coding your project here..."
                    />
                  </div>
                </CardContent>
                <div className="flex justify-between p-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Run
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="submit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Submit Your Project
                  </CardTitle>
                  <CardDescription>
                    Share your completed project to earn XP and maintain your
                    streak
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="submission-url">
                        Project URL (GitHub, CodePen, etc.)
                      </Label>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="submission-url"
                          placeholder="https://github.com/username/project-name"
                          value={projectUrl}
                          onChange={(e) => setProjectUrl(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Link to your project on CodeSandbox, GitHub, or any
                        other platform
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="submission-notes">Notes (Optional)</Label>
                      <Textarea
                        id="submission-notes"
                        placeholder="Any challenges faced, learnings, or additional features..."
                        value={submissionNotes}
                        onChange={(e) => setSubmissionNotes(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={submitProject} disabled={!projectUrl}>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Project
                    </Button>
                    <Button variant="outline">
                      <Share className="mr-2 h-4 w-4" />
                      Share Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Instructions Panel */}
        <div className="lg:col-span-1">
          <Tabs defaultValue="requirements" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="requirements">Tasks</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="hints">Hints</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Project Requirements
                  </CardTitle>
                  <CardDescription>
                    Complete these tasks after watching the video
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                          {index + 1}
                        </div>
                        <span className="text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Resources
                  </CardTitle>
                  <CardDescription>
                    Additional materials to help you complete the project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        className="flex items-center gap-2 p-2 rounded-lg border hover:bg-muted transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{resource.title}</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hints">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Hints
                  </CardTitle>
                  <CardDescription>
                    Tips to help you if you get stuck
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.hints.map((hint, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 rounded-lg bg-muted/50"
                      >
                        <Lightbulb className="h-4 w-4 text-[#F2C94C] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{hint}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Test Cases */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Test Cases
              </CardTitle>
              <CardDescription>
                Make sure your project meets these requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {projectData.testCases.map((test, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 p-2 border rounded-md"
                  >
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <span className="text-sm">{test}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
