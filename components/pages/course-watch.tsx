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
  Brain,
  Code,
  Gamepad2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { routes } from "@/lib/routes";

interface CourseWatchPageProps {
  courseId: string;
  chapterId: string;
  videoId?: string;
  onNavigate?: (route: string) => void;
}

export function CourseWatchPage({
  courseId,
  chapterId,
  videoId,
  onNavigate,
}: CourseWatchPageProps) {
  const store = useAppStore();
  const course = store.getCourses().find((c) => c.id === courseId);
  const chapter = course?.chapters.find((ch) => ch.id === chapterId);
  const currentVideo = videoId
    ? chapter?.videos.find((v) => v.id === videoId)
    : chapter?.videos[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1800); // 30 minutes in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  if (!course || !chapter) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Chapter not found</h1>
          <Button
            onClick={() => onNavigate?.(routes.courseDetail(courseId))}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
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

  const handleMarkComplete = () => {
    if (currentVideo) {
      // Mark current video as complete
      const updatedChapters = course.chapters.map((ch) => {
        if (ch.id === chapterId) {
          const updatedVideos = ch.videos.map((v) =>
            v.id === currentVideo.id ? { ...v, completed: true } : v
          );
          const allVideosComplete = updatedVideos.every((v) => v.completed);
          const hasOtherContent = ch.quiz || ch.exercise || ch.playground;
          const chapterComplete = allVideosComplete && !hasOtherContent;

          return { ...ch, videos: updatedVideos, completed: chapterComplete };
        }
        return ch;
      });

      store.updateCourse(courseId, { chapters: updatedChapters });
    }
  };

  const nextVideo = chapter.videos.find((v, index) => {
    const currentIndex = chapter.videos.findIndex(
      (video) => video.id === currentVideo?.id
    );
    return index === currentIndex + 1;
  });

  const prevVideo = chapter.videos.find((v, index) => {
    const currentIndex = chapter.videos.findIndex(
      (video) => video.id === currentVideo?.id
    );
    return index === currentIndex - 1;
  });

  const nextChapter =
    course.chapters[course.chapters.findIndex((ch) => ch.id === chapterId) + 1];
  const prevChapter =
    course.chapters[course.chapters.findIndex((ch) => ch.id === chapterId) - 1];

  const handleVideoClick = (video: any) => {
    if (onNavigate) {
      onNavigate(routes.courseWatch(courseId, chapterId));
    }
  };

  const handleChapterFeatureClick = (type: string, id: string) => {
    if (!onNavigate) return;

    switch (type) {
      case "quiz":
        onNavigate(routes.courseQuiz(courseId, id));
        break;
      case "exercise":
        onNavigate(routes.courseExercise(courseId, id));
        break;
      case "playground":
        onNavigate(routes.coursePlayground(courseId, id));
        break;
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate?.(routes.courseDetail(courseId))}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {currentVideo ? currentVideo.title : chapter.title}
          </h1>
          <p className="text-muted-foreground">
            {course.title} • {chapter.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{chapter.type}</Badge>
          <Badge variant="outline">
            {currentVideo?.duration || chapter.duration}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Video Player */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-black relative">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-bold">
                    {currentVideo?.title || chapter.title}
                  </h3>
                  <p className="text-gray-300">
                    {currentVideo?.description || chapter.description}
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
                        disabled={!prevVideo}
                        onClick={() => prevVideo && handleVideoClick(prevVideo)}
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        disabled={!nextVideo}
                        onClick={() => nextVideo && handleVideoClick(nextVideo)}
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
                      <select
                        value={playbackSpeed}
                        onChange={(e) =>
                          setPlaybackSpeed(Number(e.target.value))
                        }
                        className="bg-transparent text-white text-sm border border-white/20 rounded px-2 py-1"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>
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
                Like
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
            <div className="flex items-center gap-2">
              {currentVideo && !currentVideo.completed && (
                <Button onClick={handleMarkComplete}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark Complete
                </Button>
              )}
              {nextVideo && (
                <Button onClick={() => handleVideoClick(nextVideo)}>
                  Next Video
                  <SkipForward className="ml-2 h-4 w-4" />
                </Button>
              )}
              {!nextVideo && nextChapter && (
                <Button
                  onClick={() =>
                    onNavigate?.(routes.courseWatch(courseId, nextChapter.id))
                  }
                >
                  Next Chapter
                  <SkipForward className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Chapter Features */}
          {(chapter.quiz || chapter.exercise || chapter.playground) && (
            <Card>
              <CardHeader>
                <CardTitle>Chapter Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {chapter.quiz && (
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2"
                      onClick={() =>
                        handleChapterFeatureClick("quiz", chapter.quiz!.id)
                      }
                    >
                      <Brain className="h-6 w-6" />
                      <span className="text-sm">{chapter.quiz.title}</span>
                    </Button>
                  )}
                  {chapter.exercise && (
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2"
                      onClick={() =>
                        handleChapterFeatureClick(
                          "exercise",
                          chapter.exercise!.id
                        )
                      }
                    >
                      <Code className="h-6 w-6" />
                      <span className="text-sm">{chapter.exercise.title}</span>
                    </Button>
                  )}
                  {chapter.playground && (
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2"
                      onClick={() =>
                        handleChapterFeatureClick(
                          "playground",
                          chapter.playground!.id
                        )
                      }
                    >
                      <Gamepad2 className="h-6 w-6" />
                      <span className="text-sm">
                        {chapter.playground.title}
                      </span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentVideo ? "Video" : "Chapter"} Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {currentVideo?.description || chapter.description}
                    </p>
                    {chapter.videos.length > 1 && (
                      <div>
                        <h4 className="font-medium mb-2">Chapter Videos</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {chapter.videos.map((video, index) => (
                            <li key={video.id}>
                              • {video.title} ({video.duration})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Take notes while watching the video..."
                    className="min-h-[200px]"
                  />
                  <Button className="mt-2">Save Notes</Button>
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
                        title: "Design Patterns in JavaScript",
                        type: "Article",
                        url: "#",
                      },
                      {
                        title: "Node.js Best Practices",
                        type: "Documentation",
                        url: "#",
                      },
                      {
                        title: "Observer Pattern Examples",
                        type: "Code",
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
                      <Textarea placeholder="Ask a question or share your thoughts..." />
                      <Button>Post Comment</Button>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          author: "Sarah Chen",
                          time: "2 hours ago",
                          comment:
                            "Great explanation! The examples really helped me understand the concept.",
                        },
                        {
                          author: "Mike Rodriguez",
                          time: "5 hours ago",
                          comment:
                            "Can someone explain the difference between this and the previous pattern?",
                        },
                      ].map((comment, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
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

            <TabsContent value="transcript" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Video Transcript</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Auto-generated transcript with timestamps
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {[
                      {
                        time: "00:00",
                        text: `Welcome to ${
                          currentVideo?.title || chapter.title
                        }.`,
                      },
                      {
                        time: "00:15",
                        text: "In this section, we'll explore the key concepts and practical applications.",
                      },
                      {
                        time: "00:30",
                        text: "Let's start by understanding the fundamental principles.",
                      },
                      {
                        time: "01:00",
                        text: "Now let's look at a practical example of implementing this concept.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                        onClick={() =>
                          setCurrentTime(
                            Number.parseInt(item.time.split(":")[0]) * 60 +
                              Number.parseInt(item.time.split(":")[1])
                          )
                        }
                      >
                        <span className="text-sm font-mono text-blue-600 min-w-[50px]">
                          {item.time}
                        </span>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                {course.chapters.filter((ch) => ch.completed).length} of{" "}
                {course.chapters.length} chapters completed
              </div>
            </CardContent>
          </Card>

          {/* Chapter Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chapter Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Videos */}
              {chapter.videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted ${
                    video.id === currentVideo?.id
                      ? "border border-blue-200"
                      : ""
                  }`}
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    {video.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{video.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                      <Badge variant="outline" className="text-xs">
                        VIDEO
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

              {/* Chapter Features */}
              {chapter.quiz && (
                <div
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted"
                  onClick={() =>
                    handleChapterFeatureClick("quiz", chapter.quiz!.id)
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{chapter.quiz.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{chapter.quiz.timeLimit} min</span>
                      <Badge variant="outline" className="text-xs">
                        QUIZ
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {chapter.exercise && (
                <div
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted"
                  onClick={() =>
                    handleChapterFeatureClick("exercise", chapter.exercise!.id)
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    <Code className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {chapter.exercise.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {chapter.exercise.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        EXERCISE
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {chapter.playground && (
                <div
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted"
                  onClick={() =>
                    handleChapterFeatureClick(
                      "playground",
                      chapter.playground!.id
                    )
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    <Gamepad2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {chapter.playground.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {chapter.playground.language.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        PLAYGROUND
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chapter Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">All Chapters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {course.chapters.map((ch, index) => (
                <div
                  key={ch.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted ${
                    ch.id === chapterId ? "border border-blue-200" : ""
                  }`}
                  onClick={() =>
                    onNavigate?.(routes.courseWatch(courseId, ch.id))
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    {ch.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ch.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{ch.duration}</span>
                      <Badge variant="outline" className="text-xs">
                        {ch.videos.length} videos
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="space-y-2">
            {prevChapter && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() =>
                  onNavigate?.(routes.courseWatch(courseId, prevChapter.id))
                }
              >
                <SkipBack className="mr-2 h-4 w-4" />
                Previous: {prevChapter.title}
              </Button>
            )}
            {nextChapter && (
              <Button
                className="w-full justify-start"
                onClick={() =>
                  onNavigate?.(routes.courseWatch(courseId, nextChapter.id))
                }
              >
                Next: {nextChapter.title}
                <SkipForward className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
