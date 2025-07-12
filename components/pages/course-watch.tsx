"use client";

import { useEffect, useState } from "react";
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
import { VimeoPlayer } from "@/components/ui/vimeo-player";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { format } from "timeago.js";
import {
  ArrowLeft,
  Play,
  SkipForward,
  SkipBack,
  CheckCircle2,
  BookOpen,
  Download,
  Share,
  Clock,
  Brain,
  Code,
  Gamepad2,
  Code2,
  Save,
  Crown,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { routes } from "@/lib/routes";
import {
  Chapter,
  Course,
  Note,
  UserChapter,
  UserCourse,
  UserVideo,
  Video,
} from "@/lib/data";
import { useUser } from "@/hooks/use-user";
import DisqusCommentBlock from "../ui/comment";
import { markVideoComplete } from "@/lib/courses";
import { toast } from "sonner";
import ConfettiCelebration from "../confetti-celebration";
import { codeSample, handleShare } from "@/lib/utils";
import { CourseQuizPage } from "./course-quiz";
import { usePathname } from "next/navigation";
import { ExercisePage } from "../exercise";

interface CourseWatchPageProps {
  slug: string;
  chapterId: string;
  videoId?: string;
  onNavigate?: (route: string) => void;
}

export function CourseWatchPage({
  slug,
  chapterId,
  videoId,
  onNavigate,
}: CourseWatchPageProps) {
  const store = useAppStore();
  const [course, setCourse] = useState<Course>();
  const [userCourse, setUserCourse] = useState<UserCourse>();
  const chapter: Chapter | any = course?.chapters.find(
    (ch: Chapter) => ch.slug === chapterId
  );
  const user = useUser();
  const currentVideo = videoId
    ? chapter?.videos.find((v: Video) => v.slug === videoId)
    : chapter?.videos[0];
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // const [duration] = useState(1800); // 30 minutes in seconds
  // const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
  const [celebration, setCelebration] = useState(false);
  const [code, setCode] = useState(codeSample);
  const [quizPassed, setQuizPassed] = useState(false);
  const [note, setNote] = useState("");
  const path = usePathname();

  useEffect(() => {
    setLoading(true);
    async function findUserCourse(slug: string) {
      const userCourse = await store.getUserCourse(slug);
      setCourse(userCourse.course);
      setUserCourse(userCourse);

      setLoading(false);
    }
    findUserCourse(slug);
  }, [slug]);

  useEffect(() => {
    async function loadNotes(courseId: string, videoId: string) {
      const notes = await store.getVideoNotes(courseId, videoId);
      setNotes(notes);
    }

    loadNotes(course?.id!, videoId!);
  }, [course, videoId]);

  if (loading) return <div>Loading...</div>;

  if (!course || !chapter) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Chapter not found</h1>
          <Button
            onClick={() => onNavigate?.(routes.courseDetail(slug))}
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

  const handleMarkComplete = async () => {
    if (!currentVideo || !course || !chapter || !userCourse) return;

    if (currentVideo?.type == "QUIZ") {
      if (!quizPassed || currentVideo?.quiz?.required) {
        toast.warning("This quiz is required and you have to meet the mark");
        return;
      }
    }

    try {
      // Combine completed videos + the one being marked now
      const completedVideoIds = new Set(
        userCourse
          ?.userVideos!.filter((v) => v.isCompleted)
          .map((v) => v.videoId)
      );
      completedVideoIds.add(currentVideo.id); // include this one just marked

      // Check if all chapter videos are now complete
      const allVideosComplete = chapter.videos.every((v: Video) =>
        completedVideoIds.has(v.id)
      );

      const hasOtherContent =
        chapter.quiz || chapter.exercise || chapter.playground;
      const isChapterCompleted = allVideosComplete && !hasOtherContent;

      // Update local course state
      const updatedChapters = course.chapters.map((ch) =>
        ch.id === chapter.id
          ? {
              ...ch,
              videos: ch.videos.map((v) =>
                v.id === currentVideo.id ? { ...v, isCompleted: true } : v
              ),
              isCompleted: isChapterCompleted,
            }
          : ch
      );

      setCourse({ ...course, chapters: updatedChapters });

      // Optionally update userCourse for UI
      setUserCourse({
        ...userCourse,
        userVideos: [
          ...userCourse?.userVideos!.filter(
            (v) => v.videoId !== currentVideo.id
          ),
          { videoId: currentVideo.id, isCompleted: true },
        ],
        userChapters: isChapterCompleted
          ? [
              ...userCourse?.userChapters!.filter(
                (ch) => ch.chapterId !== chapter.id
              ),
              { chapterId: chapter.id, isCompleted: true },
            ]
          : userCourse.userChapters,
      });

      // Backend update with proper `isChapterCompleted`
      await markVideoComplete(course.id, chapter.id, currentVideo.id, {
        isChapterCompleted,
      });

      toast.success("You just earned some points!");
      setCelebration(true);

      if (!isChapterCompleted) handleVideoClick(nextVideo);
    } catch (error) {
      toast.error("An error occurred. Please try again");
    }
  };

  const isChapterCompleted = (chapterId: string) => {
    return userCourse?.userChapters?.find(
      (ch: UserChapter) => ch.chapterId === chapterId
    )?.isCompleted;
  };

  const isVideoCompleted = (videoId: string) => {
    return userCourse?.userVideos?.find((ch: any) => ch.videoId === videoId)
      ?.isCompleted;
  };

  const calculateProgess = (): number => {
    return (userCourse?.userVideos?.length! / course?.totalContent || 0) * 100;
  };

  const next = () => {
    return chapter.videos.find((v: Video, index: number) => {
      const currentIndex = chapter.videos.findIndex(
        (video: Video) => video.id === currentVideo?.id
      );
      return index === currentIndex + 1;
    });
  };

  const prev = () => {
    return chapter.videos.find((v: Video, index: number) => {
      const currentIndex = chapter.videos.findIndex(
        (video: Video) => video.id === currentVideo?.id
      );
      return index === currentIndex - 1;
    });
  };

  const nextVideo = next();
  const prevVideo = prev();

  const nextChapter =
    course.chapters[
      course.chapters.findIndex((ch: Chapter) => ch.slug === chapterId) + 1
    ];

  const prevChapter =
    course.chapters[
      course.chapters.findIndex((ch: Chapter) => ch.slug === chapterId) - 1
    ];

  const handleVideoClick = (video: Video) => {
    if (currentVideo?.type == "QUIZ") {
      if (!quizPassed || currentVideo?.quiz?.required) {
        toast.warning("This quiz is required and you have to meet the mark");
        return;
      }
    }
    if (onNavigate) {
      onNavigate(routes.courseWatch(slug, chapterId, video.slug));
    }
  };

  const handleChapterFeatureClick = (type: string, id?: string) => {
    if (!onNavigate) return;
    let url = "";
    switch (type?.toLowerCase()) {
      case "quiz":
        url = routes.courseQuizzes(slug);
        break;
      case "exercise":
        url = routes.courseExercises(slug);
        break;
      case "playground":
        url = routes.coursePlaygrounds(slug);
        break;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleChapterClick = (next: boolean) => {
    if (!onNavigate) return;

    if (currentVideo?.type == "QUIZ") {
      if (!quizPassed || currentVideo?.quiz?.required) {
        toast.warning("This quiz is required and you have to meet the mark");
        return;
      }
    }

    if (next) {
      onNavigate(
        routes.courseWatch(slug, nextChapter.slug, nextChapter?.videos[0]?.slug)
      );
      return;
    }

    onNavigate(
      routes.courseWatch(
        slug,
        prevChapter.slug,
        prevChapter?.videos[prevChapter?.videos?.length - 1]?.slug
      )
    );
  };

  const handleSaveNotes = async () => {
    if (!note) return;
    try {
      const saveNote = await store.saveNote(note, course.id, currentVideo.id);
      setNotes([...notes, saveNote]);
    } catch (error) {
      toast.error("Error occurred adding note");
    }
  };

  const markCourseAsCompleted = async () => {
    try {
      const completed = await store.markCourseCompleted(
        course?.userCourse?.id!
      );

      setCelebration(true);
      setCompleted(true);
      toast.success(
        `You've earned ${completed?.totalPoints} MB from the course`
      );
      // onNavigate?.(routes.courseCertificate(slug));
    } catch (error: any) {
      toast.error("An error occurred updating your points. Try again");
      setCompleted(false);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate?.(routes.courseDetail(slug))}
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
            {currentVideo?.duration ?? chapter?.duration ?? 0} hours
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Video Player */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          <Card className="overflow-hidden">
            {/* Video Player */}
            {currentVideo?.type === "VIDEO" && (
              <Card className="overflow-hidden">
                <div className="aspect-video bg-black relative">
                  <VimeoPlayer video={currentVideo} />
                </div>
              </Card>
            )}
            {currentVideo?.type === "QUIZ" && (
              <Card className="overflow-hidden">
                <CourseQuizPage
                  courseId={slug}
                  onNavigate={() => {}}
                  quiz={currentVideo?.quiz!}
                  showNav={false}
                  handleQuizSubmit={(passed) => {
                    setQuizPassed(passed);
                    if (!passed) {
                    }

                    handleMarkComplete();
                  }}
                />
              </Card>
            )}

            {currentVideo?.type === "EXERCISE" && (
              <ExercisePage
                courseId={course.id}
                onNavigate={(path) => onNavigate?.(path)}
                exercise={currentVideo?.exercise!}
              />
            )}
          </Card>
          {/* Video Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleShare(currentVideo.title, path)}
                variant="outline"
                size="sm"
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={userCourse?.enrollmentType?.includes("SUBSCRIPTION")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {currentVideo && (
                <>
                  {currentVideo.type === "VIDEO" &&
                    !isVideoCompleted(currentVideo.id) && (
                      <Button onClick={handleMarkComplete}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark Complete
                      </Button>
                    )}

                  {(currentVideo.type === "QUIZ" && quizPassed) ||
                    (currentVideo?.quiz && !currentVideo?.quiz?.required && (
                      <Button onClick={handleMarkComplete}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark Quiz Complete
                      </Button>
                    ))}
                </>
              )}

              {nextVideo && (
                <Button
                  onClick={() => handleVideoClick(nextVideo)}
                  className="capitalize"
                >
                  Next {nextVideo?.type?.toLowerCase()}
                  <SkipForward className="ml-2 h-4 w-4" />
                </Button>
              )}
              {!nextVideo && nextChapter && (
                <Button onClick={() => handleChapterClick(true)}>
                  Next Chapter
                  <SkipForward className="ml-2 h-4 w-4" />
                </Button>
              )}

              {/* TODO: Add check for Everything task/video is completed */}
              {!nextVideo && !nextChapter && (
                <div>
                  {!completed ? (
                    <Button
                      variant={"destructive"}
                      onClick={() => markCourseAsCompleted()}
                    >
                      Earn Your Rewards
                      <Crown className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        onNavigate?.(routes.courseCertificate(slug))
                      }
                    >
                      View Your Certificate
                      <SkipForward className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <Card></Card>

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="code">Code Editor</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">
                    {currentVideo
                      ? currentVideo?.type?.toLowerCase()
                      : "Chapter"}{" "}
                    Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {currentVideo?.summary}
                    </p>
                  </div>
                </CardContent>
                <CardContent>
                  {currentVideo?.description ??
                    (nextChapter?.description && (
                      <CardContent>
                        <div className="space-y-4  pt-4">
                          <div className="flex w-full justify-center items-center">
                            <span className="border-t flex-1"></span>
                            <div className="px-2 text-xs">description</div>
                            <span className="border-t flex-1"></span>
                          </div>
                          <p
                            className="text-muted-foreground"
                            dangerouslySetInnerHTML={{
                              __html:
                                currentVideo?.description ??
                                nextChapter?.description,
                            }}
                          ></p>
                        </div>
                      </CardContent>
                    ))}
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

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Take notes while watching the video..."
                    className="min-h-[200px]"
                  />
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleSaveNotes()}
                      className="mt-2"
                      disabled={!note}
                    >
                      Save Notes
                    </Button>
                  </div>
                  <div className="border-t mt-5">
                    <div className="space-y-3  pt-5">
                      {notes?.map((note: Note) => (
                        <div className="border rounded-lg p-3" key={note.id}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                              {user.name
                                .split(" ")
                                .map((n: any) => n[0])
                                .join("")}
                            </div>
                            <span className="font-medium text-sm">
                              {user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(note?.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </div>
                      ))}
                      {!notes.length && <div>No notes added yet</div>}
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
                    {currentVideo?.resources?.map(
                      (resource: any, index: number) => (
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
                          <Button asChild={true} variant="link">
                            <a target="_blank" href={resource?.link}>
                              View
                            </a>
                          </Button>
                        </div>
                      )
                    )}
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
                  <DisqusCommentBlock
                    config={{
                      identifier: currentVideo?.slug,
                      title: currentVideo?.title,
                      url: `/courses/${slug}/watch/${chapterId}/${videoId}`,
                    }}
                  />
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
                  <span>{calculateProgess()}%</span>
                </div>
                <Progress value={calculateProgess()} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                {
                  userCourse?.userVideos?.filter(
                    (ch: UserVideo) => ch?.isCompleted
                  ).length
                }{" "}
                of {course.totalContent} videos completed
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
              {chapter.videos.map((video: Video) => (
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
                    {isVideoCompleted(video.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{video.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {video?.duration ?? video.quiz?.timeLimit} mins
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {video?.type}
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
                      {chapter?.exercise?.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {chapter?.exercise?.difficulty}
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
              {course.chapters.map((ch: Chapter, index: number) => (
                <div
                  key={ch.slug}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted ${
                    ch.slug === chapterId ? "border border-blue-200" : ""
                  }`}
                  onClick={() =>
                    onNavigate?.(
                      routes.courseWatch(slug, ch.slug, ch?.videos[0]?.slug)
                    )
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    {isChapterCompleted(ch?.id!) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{ch.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {ch.videos.reduce((a: number, c: any) => {
                          return a + Number(c?.duration ?? c?.quiz?.timeLimit);
                        }, 0)}{" "}
                        mins
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {ch.videos.filter((v) => v.type === "VIDEO").length}{" "}
                        videos
                      </Badge>

                      {ch.videos.filter((v) => v.type === "QUIZ").length >
                        0 && (
                        <Badge variant="outline" className="text-xs">
                          {ch.videos.filter((v) => v.type === "QUIZ").length}{" "}
                          quizzes
                        </Badge>
                      )}
                      {ch.videos.filter((v) => v.type === "EXERCISE").length >
                        0 && (
                        <Badge variant="outline" className="text-xs">
                          {
                            ch.videos.filter((v) => v.type === "EXERCISE")
                              .length
                          }{" "}
                          exercises
                        </Badge>
                      )}

                      {ch.videos.filter((v) => v.type === "PLAYGROUND").length >
                        0 && (
                        <Badge variant="outline" className="text-xs">
                          {
                            ch.videos.filter((v) => v.type === "PLAYGROUND")
                              .length
                          }{" "}
                          playgrounds
                        </Badge>
                      )}
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
                onClick={() => handleChapterClick(false)}
              >
                <SkipBack className="mr-2 h-4 w-4" />
                Previous: {prevChapter.title}
              </Button>
            )}
            {nextChapter && (
              <Button
                className="w-full justify-start"
                onClick={() => handleChapterClick(true)}
              >
                Next: {nextChapter.title}
                <SkipForward className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <ConfettiCelebration
        onComplete={() => setCelebration(false)}
        isVisible={celebration}
        celebrationType="enrollment"
        courseName={course?.title!}
        duration={2000}
      />
    </div>
  );
}
