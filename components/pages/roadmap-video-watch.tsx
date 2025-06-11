"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Settings,
  Maximize,
  CheckCircle2,
  BookOpen,
  Download,
  Share,
  ThumbsUp,
  Clock,
  Target,
  Trophy,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

interface RoadmapVideoWatchPageProps {
  roadmapId: string;
  videoId: string;
  onNavigate?: (route: string) => void;
}

export function RoadmapVideoWatchPage({
  roadmapId,
  videoId,
  onNavigate,
}: RoadmapVideoWatchPageProps) {
  const store = useAppStore();
  const roadmap = store.getRoadmaps().find((r) => r.id === roadmapId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(2400); // 40 minutes in seconds

  // Mock video data based on roadmap
  const video = {
    id: videoId,
    title: "System Design Fundamentals",
    description:
      "Learn the core principles of designing scalable distributed systems",
    duration: "40 min",
    milestone: "System Design Mastery",
    milestoneProgress: 65,
    topics: [
      "Scalability Principles",
      "Load Balancing",
      "Database Sharding",
      "Caching Strategies",
      "Microservices Architecture",
    ],
  };

  if (!roadmap) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Roadmap not found</h1>
          <Button
            onClick={() => onNavigate?.("/dashboard/roadmaps")}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Roadmaps
          </Button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate?.(`/dashboard/roadmaps/${roadmapId}/watch`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{video.title}</h1>
          <p className="text-muted-foreground">
            {roadmap.title} • {video.milestone}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{video.duration}</Badge>
          <Badge className="bg-blue-600">Milestone Content</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Video Player */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-black relative">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="text-center text-white">
                  <Target className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-bold">{video.title}</h3>
                  <p className="text-blue-200">
                    Roadmap milestone video content
                  </p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 text-white text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <div className="flex-1">
                      <Progress
                        value={(currentTime / duration) * 100}
                        className="h-1"
                      />
                    </div>
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Video Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Helpful
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <Button>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark as Watched
            </Button>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Video Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{video.description}</p>

                    <div>
                      <h4 className="font-medium mb-2">Topics Covered</h4>
                      <div className="grid gap-2">
                        {video.topics.map((topic, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Milestone Progress</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{video.milestone}</span>
                          <span>{video.milestoneProgress}%</span>
                        </div>
                        <Progress
                          value={video.milestoneProgress}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Video Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <span className="text-muted-foreground min-w-[60px]">
                        00:00
                      </span>
                      <p>
                        Welcome to this comprehensive guide on system design
                        fundamentals...
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-muted-foreground min-w-[60px]">
                        00:30
                      </span>
                      <p>
                        Today we'll cover the core principles that every backend
                        engineer needs to know...
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-muted-foreground min-w-[60px]">
                        01:15
                      </span>
                      <p>
                        Let's start with scalability. When we talk about
                        scalable systems...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        title: "System Design Interview Guide",
                        type: "PDF",
                        url: "#",
                      },
                      {
                        title: "Scalability Patterns",
                        type: "Article",
                        url: "#",
                      },
                      {
                        title: "Load Balancer Configuration",
                        type: "Code",
                        url: "#",
                      },
                      {
                        title: "Database Sharding Examples",
                        type: "Tutorial",
                        url: "#",
                      },
                    ].map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {resource.type}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Discussion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Textarea placeholder="Ask a question about this milestone content..." />
                      <Button>Post Question</Button>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          author: "Alex Chen",
                          time: "1 hour ago",
                          comment:
                            "This really helped me understand when to use horizontal vs vertical scaling. Great examples!",
                        },
                        {
                          author: "Sarah Johnson",
                          time: "3 hours ago",
                          comment:
                            "Can you explain more about consistent hashing in the context of database sharding?",
                        },
                      ].map((comment, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                              {comment.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="font-medium text-sm">
                              {comment.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {comment.time}
                            </span>
                          </div>
                          <p className="text-sm">{comment.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Milestone Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                Milestone Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{video.milestone}</span>
                  <span>{video.milestoneProgress}%</span>
                </div>
                <Progress value={video.milestoneProgress} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                3 of 5 videos watched in this milestone
              </div>
            </CardContent>
          </Card>

          {/* Milestone Videos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Milestone Videos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                {
                  id: "1",
                  title: "System Design Fundamentals",
                  duration: "40 min",
                  completed: false,
                  current: true,
                },
                {
                  id: "2",
                  title: "Database Design Patterns",
                  duration: "35 min",
                  completed: true,
                  current: false,
                },
                {
                  id: "3",
                  title: "Caching Strategies",
                  duration: "30 min",
                  completed: true,
                  current: false,
                },
                {
                  id: "4",
                  title: "Microservices Architecture",
                  duration: "45 min",
                  completed: false,
                  current: false,
                },
                {
                  id: "5",
                  title: "System Design Interview",
                  duration: "50 min",
                  completed: false,
                  current: false,
                },
              ].map((vid) => (
                <div
                  key={vid.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted ${
                    vid.current ? "bg-blue-50 border border-blue-200" : ""
                  }`}
                  onClick={() =>
                    onNavigate?.(
                      `/dashboard/roadmaps/${roadmapId}/video/${vid.id}`
                    )
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    {vid.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{vid.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{vid.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-sm">Complete Milestone</h4>
                <p className="text-xs text-muted-foreground">
                  Watch 2 more videos to complete this milestone
                </p>
              </div>
              <Button className="w-full" size="sm">
                <Trophy className="mr-2 h-4 w-4" />
                View Milestone Rewards
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
