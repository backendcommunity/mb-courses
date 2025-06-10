"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { routes } from "@/lib/routes"
import { useMobile } from "@/hooks/use-mobile"

interface CourseDetailPageProps {
  courseId: string
  onNavigate: (path: string) => void
}

export function CourseDetailPage({ courseId, onNavigate }: CourseDetailPageProps) {
  const store = useAppStore()
  const courses = store.getCourses()
  const { updateCourse } = store
  const course = courses.find((c) => c.id === courseId) || courses[0]
  const [currentChapter, setCurrentChapter] = useState(course.chapters[0])
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const isMobile = useMobile()

  const handleChapterComplete = (chapterId: string) => {
    const updatedChapters = course.chapters.map((chapter) =>
      chapter.id === chapterId ? { ...chapter, completed: true } : chapter,
    )
    const completedCount = updatedChapters.filter((c) => c.completed).length
    const newProgress = Math.round((completedCount / updatedChapters.length) * 100)

    updateCourse(courseId, {
      chapters: updatedChapters,
      progress: newProgress,
    })
  }

  const handleBackToCourses = () => {
    console.log("Back to Courses - Navigating to:", routes.courses)
    onNavigate(routes.courses)
  }

  const handleEnrollNow = () => {
    console.log("Enrolling in course:", courseId)
    updateCourse(courseId, { enrolled: true })
  }

  const handlePreviewCourse = () => {
    const previewPath = routes.coursePreview(courseId)
    console.log("Preview Course - Navigating to:", previewPath)
    onNavigate(previewPath)
  }

  const handleContinueLearning = () => {
    // Navigate to first incomplete chapter or continue from current
    const nextChapter = course.chapters.find((c) => !c.completed) || course.chapters[0]
    const watchPath = routes.courseWatch(courseId, nextChapter.id)
    console.log("Continue Learning - Navigating to:", watchPath)
    onNavigate(watchPath)
  }

  const handleChapterClick = (chapter: any, index: number) => {
    const isPreview = index < 3 // First 3 chapters are preview
    if (course.enrolled || isPreview) {
      // Check if chapter has specific features to navigate to
      if (chapter.quiz && chapter.type === "quiz") {
        const quizPath = routes.courseQuiz(courseId, chapter.quiz.id)
        console.log("Chapter Quiz Click - Navigating to:", quizPath)
        onNavigate(quizPath)
      } else if (chapter.exercise && chapter.type === "exercise") {
        const exercisePath = routes.courseExercise(courseId, chapter.exercise.id)
        console.log("Chapter Exercise Click - Navigating to:", exercisePath)
        onNavigate(exercisePath)
      } else if (chapter.playground && chapter.type === "playground") {
        const playgroundPath = routes.coursePlayground(courseId, chapter.playground.id)
        console.log("Chapter Playground Click - Navigating to:", playgroundPath)
        onNavigate(playgroundPath)
      } else {
        // Default to video watch
        const watchPath = routes.courseWatch(courseId, chapter.id)
        console.log("Chapter Click - Navigating to:", watchPath)
        onNavigate(watchPath)
      }
    } else {
      const previewPath = routes.coursePreview(courseId)
      console.log("Chapter Click (locked) - Navigating to preview:", previewPath)
      onNavigate(previewPath)
    }
  }

  const isCompleted = course.progress === 100
  const canEarnCertificate = course.enrolled && isCompleted

  return (
    <div className="flex-1 space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Course Header */}
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <Button variant="outline" onClick={handleBackToCourses} className="h-8 md:h-10 px-2 md:px-4">
          <ArrowLeft className="h-4 w-4" />
          <span className="ml-2 hidden md:inline">Back to Courses</span>
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                course.level === "Advanced" ? "destructive" : course.level === "Intermediate" ? "default" : "secondary"
              }
              className="text-xs"
            >
              {course.level}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs md:text-sm">{course.rating}</span>
              <span className="text-xs md:text-sm text-muted-foreground">
                ({course.students.toLocaleString()} students)
              </span>
            </div>
          </div>

          <h1 className="text-xl md:text-3xl font-bold tracking-tight">{course.title}</h1>

          {/* Short Description */}
          <p className="text-sm md:text-lg text-muted-foreground">{course.description}</p>

          {/* Expandable Long Description */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center justify-between text-base md:text-lg">
                Course Overview
                <Button variant="ghost" size="sm" onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                  {isDescriptionExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
              <div className={`space-y-4 ${isDescriptionExpanded ? "" : "line-clamp-3"}`}>
                {course.longDescription?.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {!isDescriptionExpanded && (
                <Button variant="link" className="p-0 h-auto mt-2" onClick={() => setIsDescriptionExpanded(true)}>
                  Read more
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
              {course.chapters.length} chapters
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 md:h-4 md:w-4" />
              Certificate included
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Course Features Section - Only show on mobile when enrolled */}
          {course.enrolled && isMobile && (
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Course Features</CardTitle>
                <CardDescription className="text-xs">Interactive learning tools and resources</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="h-16 flex-col gap-1"
                    onClick={() => onNavigate(routes.courseQuizzes(courseId))}
                  >
                    <Brain className="h-4 w-4" />
                    <span className="text-xs">Quizzes</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex-col gap-1"
                    onClick={() => onNavigate(routes.courseExercises(courseId))}
                  >
                    <Code className="h-4 w-4" />
                    <span className="text-xs">Exercises</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex-col gap-1"
                    onClick={() => onNavigate(routes.coursePlaygrounds(courseId))}
                  >
                    <Gamepad2 className="h-4 w-4" />
                    <span className="text-xs">Playgrounds</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex-col gap-1"
                    onClick={() => onNavigate(routes.courseProjects(courseId))}
                  >
                    <FolderOpen className="h-4 w-4" />
                    <span className="text-xs">Projects</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Course Enrollment Card */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6 pt-0">
              {course.enrolled ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span>Your Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <Button className="w-full text-xs md:text-sm" onClick={handleContinueLearning}>
                    <Play className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Continue Learning
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-center">
                    <span className="text-xl md:text-3xl font-bold">${course.price}</span>
                  </div>
                  <Button className="w-full text-xs md:text-sm" onClick={handleEnrollNow}>
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full text-xs md:text-sm" onClick={handlePreviewCourse}>
                    Preview Course
                  </Button>
                </div>
              )}

              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
              </div>

              {canEarnCertificate && (
                <div className="border-t pt-4">
                  <Button
                    variant="outline"
                    className="w-full bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 text-yellow-700 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-800 dark:text-yellow-400"
                    onClick={() => onNavigate(routes.courseCertificate(courseId))}
                  >
                    <Certificate className="mr-2 h-4 w-4" />
                    Get Certificate
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Course Features - Desktop only */}
          {course.enrolled && !isMobile && (
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Course Features</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Interactive learning tools and resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 p-4 md:p-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs md:text-sm"
                  onClick={() => onNavigate(routes.courseQuizzes(courseId))}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Quizzes
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs md:text-sm"
                  onClick={() => onNavigate(routes.courseExercises(courseId))}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Exercises
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs md:text-sm"
                  onClick={() => onNavigate(routes.coursePlaygrounds(courseId))}
                >
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Playgrounds
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-xs md:text-sm"
                  onClick={() => onNavigate(routes.courseProjects(courseId))}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Projects
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Course Stats */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Course Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 md:p-6 pt-0">
              <div className="flex justify-between text-xs md:text-sm">
                <span>Students</span>
                <span>{course.students.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span>Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span>Duration</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span>Level</span>
                <span>{course.level}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Course Content</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            {course.chapters.length} chapters • {course.duration} total length
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-2">
            {course.chapters.map((chapter, index) => {
              const isPreview = index < 3 // First 3 chapters are preview
              const isLocked = !course.enrolled && !isPreview
              const chapterIcon =
                chapter.type === "quiz"
                  ? Brain
                  : chapter.type === "exercise"
                    ? Code
                    : chapter.type === "playground"
                      ? Gamepad2
                      : Play

              return (
                <div
                  key={chapter.id}
                  className={`flex items-center justify-between p-3 md:p-4 rounded-lg border transition-colors ${
                    isLocked ? "bg-muted/50 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer"
                  }`}
                  onClick={() => !isLocked && handleChapterClick(chapter, index)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {chapter.completed ? (
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                      ) : isLocked ? (
                        <Lock className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      ) : (
                        React.createElement(chapterIcon, { className: "h-4 w-4 md:h-5 md:w-5 text-primary" })
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-medium text-xs md:text-sm truncate ${isLocked ? "text-muted-foreground" : ""}`}
                      >
                        {chapter.title}
                      </h4>
                      <p className={`text-xs text-muted-foreground ${isLocked ? "opacity-50" : ""}`}>
                        {chapter.duration}
                        {isPreview && !course.enrolled && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Preview
                          </Badge>
                        )}
                      </p>
                    </div>
                  </div>
                  {!isLocked && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleChapterClick(chapter, index)
                      }}
                      className="flex-shrink-0"
                    >
                      <Play className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
