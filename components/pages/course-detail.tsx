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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  CheckCircle2,
  Clock,
  Star,
  BookOpen,
  Award,
  Share,
  Heart,
  Lock,
  ArrowLeft,
  Brain,
  Code,
  Gamepad2,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  BadgeIcon as Certificate,
  Trophy,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { routes } from "@/lib/routes";

interface CourseDetailPageProps {
  courseId: string;
  onNavigate: (path: string) => void;
}

export function CourseDetailPage({
  courseId,
  onNavigate,
}: CourseDetailPageProps) {
  const store = useAppStore();
  const courses = store.getCourses();
  const { updateCourse } = store;
  const course = courses.find((c) => c.id === courseId) || courses[0];
  const [currentChapter, setCurrentChapter] = useState(course.chapters[0]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleChapterComplete = (chapterId: string) => {
    const updatedChapters = course.chapters.map((chapter) =>
      chapter.id === chapterId ? { ...chapter, completed: true } : chapter
    );
    const completedCount = updatedChapters.filter((c) => c.completed).length;
    const newProgress = Math.round(
      (completedCount / updatedChapters.length) * 100
    );

    updateCourse(courseId, {
      chapters: updatedChapters,
      progress: newProgress,
    });
  };

  const handleBackToCourses = () => {
    console.log("Back to Courses - Navigating to:", routes.courses);
    onNavigate(routes.courses);
  };

  const handleEnrollNow = () => {
    console.log("Enrolling in course:", courseId);
    updateCourse(courseId, { enrolled: true });
  };

  const handlePreviewCourse = () => {
    const previewPath = routes.coursePreview(courseId);
    console.log("Preview Course - Navigating to:", previewPath);
    onNavigate(previewPath);
  };

  const handleContinueLearning = () => {
    // Navigate to first incomplete chapter or continue from current
    const nextChapter =
      course.chapters.find((c) => !c.completed) || course.chapters[0];
    const watchPath = routes.courseWatch(courseId, nextChapter.id);
    console.log("Continue Learning - Navigating to:", watchPath);
    onNavigate(watchPath);
  };

  const handleChapterClick = (chapter: any, index: number) => {
    const isPreview = index < 3; // First 3 chapters are preview
    if (course.enrolled || isPreview) {
      // Check if chapter has specific features to navigate to
      if (chapter.quiz && chapter.type === "quiz") {
        const quizPath = routes.courseQuiz(courseId, chapter.quiz.id);
        console.log("Chapter Quiz Click - Navigating to:", quizPath);
        onNavigate(quizPath);
      } else if (chapter.exercise && chapter.type === "exercise") {
        const exercisePath = routes.courseExercise(
          courseId,
          chapter.exercise.id
        );
        console.log("Chapter Exercise Click - Navigating to:", exercisePath);
        onNavigate(exercisePath);
      } else if (chapter.playground && chapter.type === "playground") {
        const playgroundPath = routes.coursePlayground(
          courseId,
          chapter.playground.id
        );
        console.log(
          "Chapter Playground Click - Navigating to:",
          playgroundPath
        );
        onNavigate(playgroundPath);
      } else {
        // Default to video watch
        const watchPath = routes.courseWatch(courseId, chapter.id);
        console.log("Chapter Click - Navigating to:", watchPath);
        onNavigate(watchPath);
      }
    } else {
      const previewPath = routes.coursePreview(courseId);
      console.log(
        "Chapter Click (locked) - Navigating to preview:",
        previewPath
      );
      onNavigate(previewPath);
    }
  };

  const isCompleted = course.progress === 100;
  const canEarnCertificate = course.enrolled && isCompleted;

  return (
    <div className="flex-1 space-y-6">
      {/* Course Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={handleBackToCourses}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <Badge
              variant={
                course.level === "Advanced"
                  ? "destructive"
                  : course.level === "Intermediate"
                  ? "default"
                  : "secondary"
              }
            >
              {course.level}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{course.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({course.students.toLocaleString()} students)
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>

          {/* Short Description */}
          <p className="text-lg text-muted-foreground">{course.description}</p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.chapters.length} chapters
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              Certificate included
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Expandable Long Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Course Overview
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  {isDescriptionExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`space-y-4 ${
                  isDescriptionExpanded ? "" : "line-clamp-3"
                }`}
              >
                {course.longDescription
                  ?.split("\n\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
              {!isDescriptionExpanded && (
                <Button
                  variant="link"
                  className="p-0 h-auto mt-2"
                  onClick={() => setIsDescriptionExpanded(true)}
                >
                  Read more
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Course Features Section */}
          {course.enrolled && (
            <Card>
              <CardHeader>
                <CardTitle>Course Features</CardTitle>
                <CardDescription>
                  Interactive learning tools and resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                    onClick={() => onNavigate(routes.courseQuizzes(courseId))}
                  >
                    <Brain className="h-6 w-6" />
                    <span className="text-sm">Quizzes</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                    onClick={() => onNavigate(routes.courseExercises(courseId))}
                  >
                    <Code className="h-6 w-6" />
                    <span className="text-sm">Exercises</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                    onClick={() =>
                      onNavigate(routes.coursePlaygrounds(courseId))
                    }
                  >
                    <Gamepad2 className="h-6 w-6" />
                    <span className="text-sm">Playgrounds</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                    onClick={() => onNavigate(routes.courseProjects(courseId))}
                  >
                    <FolderOpen className="h-6 w-6" />
                    <span className="text-sm">Projects</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* Course Enrollment Card */}
          <Card>
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.enrolled ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Your Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <Button className="w-full" onClick={handleContinueLearning}>
                    <Play className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-center">
                    <span className="text-3xl font-bold">${course.price}</span>
                  </div>
                  <Button className="w-full" onClick={handleEnrollNow}>
                    Enroll Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handlePreviewCourse}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Preview Course
                  </Button>
                </div>
              )}

              <Separator />

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Certification Card */}
          <Card
            className={`${
              canEarnCertificate
                ? "border-green-200 bg-green-50/50"
                : "border-orange-200 bg-orange-50/50"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    canEarnCertificate ? "bg-green-100" : "bg-orange-100"
                  }`}
                >
                  {canEarnCertificate ? (
                    <Trophy className="h-6 w-6 text-green-600" />
                  ) : (
                    <Certificate className="h-6 w-6 text-orange-600" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">Course Certificate</CardTitle>
                  <CardDescription className="text-sm">
                    {canEarnCertificate
                      ? "Ready to claim!"
                      : "Complete course to earn"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {canEarnCertificate
                    ? "Congratulations! You've completed the course and earned your certificate."
                    : "Complete all chapters and pass the final assessment to earn your verified certificate."}
                </p>

                {course.enrolled && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress to Certificate</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Shareable on LinkedIn</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Verifiable credential</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Industry recognized</span>
                </div>
              </div>

              {canEarnCertificate ? (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => onNavigate(routes.courseCertificate(courseId))}
                >
                  <Certificate className="mr-2 h-4 w-4" />
                  View Certificate
                </Button>
              ) : course.enrolled ? (
                <Button variant="outline" className="w-full" disabled>
                  <Certificate className="mr-2 h-4 w-4" />
                  Complete Course to Earn
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleEnrollNow}
                >
                  <Certificate className="mr-2 h-4 w-4" />
                  Enroll to Earn Certificate
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content */}
      <Tabs defaultValue="curriculum" className="space-y-4">
        <TabsList>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                {course.chapters.length} chapters • {course.duration} total
                length
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {course.chapters.map((chapter, index) => {
                  const isPreview = index < 3; // First 3 chapters are preview
                  return (
                    <div
                      key={chapter.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${
                        currentChapter?.id === chapter.id ? "bg-muted" : ""
                      }`}
                      onClick={() => handleChapterClick(chapter, index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {chapter.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : course.enrolled || isPreview ? (
                            <span className="text-sm font-medium">
                              {index + 1}
                            </span>
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{chapter.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                isPreview
                                  ? "border-green-600 text-green-600"
                                  : course.enrolled
                                  ? "border-blue-600 text-blue-600"
                                  : "border-orange-600 text-orange-600"
                              }`}
                            >
                              {isPreview
                                ? "FREE"
                                : course.enrolled
                                ? "ENROLLED"
                                : "PREMIUM"}
                            </Badge>
                            <span>{chapter.duration}</span>
                            <Badge variant="secondary" className="text-xs">
                              {chapter.type.toUpperCase()}
                            </Badge>
                            {/* Feature indicators */}
                            {chapter.quiz && (
                              <Badge
                                variant="outline"
                                className="text-xs border-purple-600 text-purple-600"
                              >
                                QUIZ
                              </Badge>
                            )}
                            {chapter.exercise && (
                              <Badge
                                variant="outline"
                                className="text-xs border-blue-600 text-blue-600"
                              >
                                EXERCISE
                              </Badge>
                            )}
                            {chapter.playground && (
                              <Badge
                                variant="outline"
                                className="text-xs border-green-600 text-green-600"
                              >
                                PLAYGROUND
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (course.enrolled && !chapter.completed) {
                            handleChapterComplete(chapter.id);
                          }
                        }}
                      >
                        {chapter.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : course.enrolled || isPreview ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructor">
          <Card>
            <CardHeader>
              <CardTitle>About the Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-muted"></div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{course.instructor}</h3>
                  <p className="text-muted-foreground">
                    Senior Backend Engineer with 8+ years of experience building
                    scalable systems. Previously worked at Google and Netflix.
                  </p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>15 courses</span>
                    <span>50k+ students</span>
                    <span>4.9 rating</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div
                    key={review}
                    className="space-y-2 border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted"></div>
                      <div>
                        <p className="font-medium">Student {review}</p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Excellent course! The instructor explains complex concepts
                      in a very clear way. The hands-on projects really helped
                      me understand the material.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
