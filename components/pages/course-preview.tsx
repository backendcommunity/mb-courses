"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  Clock,
  Star,
  BookOpen,
  Users,
  Award,
  Lock,
  Eye,
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { routes } from "@/lib/routes"

interface CoursePreviewPageProps {
  courseId: string
  onNavigate?: (route: string) => void
}

export function CoursePreviewPage({ courseId, onNavigate }: CoursePreviewPageProps) {
  const store = useAppStore()
  const course = store.getCourses().find((c) => c.id === courseId)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(300) // 5 minutes preview
  const [selectedPreview, setSelectedPreview] = useState(0)

  if (!course) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Button onClick={() => onNavigate?.("/dashboard/courses")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const previewChapters = course.chapters.slice(0, 3) // First 3 chapters as preview
  const currentPreview = previewChapters[selectedPreview]

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => onNavigate?.(routes.courseDetail(courseId))}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">
              <Eye className="mr-1 h-3 w-3" />
              Preview
            </Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground">Free preview • {previewChapters.length} chapters available</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${course.price}</div>
          <div className="text-sm text-muted-foreground">Full course</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Video Player */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-black relative">
              {/* Video placeholder with preview content */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="text-center text-white">
                  <div className="mb-4">
                    <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{currentPreview?.title}</h3>
                    <p className="text-blue-200">Preview: {currentPreview?.duration}</p>
                  </div>

                  {/* Preview watermark */}
                  <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-sm">FREE PREVIEW</div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 text-white text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <div className="flex-1">
                      <Progress value={(currentTime / duration) * 100} className="h-1" />
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
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-white/70">Preview Mode</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Preview Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Eye className="mr-1 h-3 w-3" />
                Free Preview
              </Badge>
              <span className="text-sm text-muted-foreground">
                {previewChapters.length} of {course.chapters.length} chapters available
              </span>
            </div>
            <Button
              onClick={() => {
                store.updateCourse(courseId, { enrolled: true })
                onNavigate?.(routes.courseDetail(courseId))
              }}
            >
              Enroll Now - ${course.price}
            </Button>
          </div>

          {/* Preview Content Tabs */}
          <Tabs defaultValue="preview" className="w-full">
            <TabsList>
              <TabsTrigger value="preview">Preview Chapters</TabsTrigger>
              <TabsTrigger value="curriculum">Full Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Free Preview Chapters</CardTitle>
                  <p className="text-sm text-muted-foreground">Get a taste of what you'll learn in this course</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {previewChapters.map((chapter, index) => (
                      <div
                        key={chapter.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${
                          selectedPreview === index ? "bg-blue-50 border-blue-200" : ""
                        }`}
                        onClick={() => setSelectedPreview(index)}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <Play className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{chapter.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs border-green-600 text-green-600">
                              FREE
                            </Badge>
                            <Clock className="h-3 w-3" />
                            <span>{chapter.duration}</span>
                            <Badge variant="outline" className="text-xs">
                              {chapter.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Course Curriculum</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {course.chapters.length} chapters • {course.duration} total length
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.chapters.map((chapter, index) => {
                      const isPreview = index < 3
                      return (
                        <div
                          key={chapter.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            isPreview ? "cursor-pointer hover:bg-muted/50" : "opacity-60"
                          }`}
                          onClick={() => isPreview && setSelectedPreview(index)}
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              isPreview ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isPreview ? <Play className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{chapter.title}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  isPreview ? "border-green-600 text-green-600" : "border-orange-600 text-orange-600"
                                }`}
                              >
                                {isPreview ? "FREE" : "PREMIUM"}
                              </Badge>
                              <Clock className="h-3 w-3" />
                              <span>{chapter.duration}</span>
                              <Badge variant="outline" className="text-xs">
                                {chapter.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )
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
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-lg font-bold">
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{course.instructor}</h3>
                      <p className="text-muted-foreground">
                        Senior Backend Engineer with 8+ years of experience building scalable systems. Previously worked
                        at Google and Netflix.
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>15 courses</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>50k+ students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>4.9 rating</span>
                        </div>
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
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Sarah Chen",
                        rating: 5,
                        time: "2 weeks ago",
                        comment:
                          "Excellent course! The preview chapters gave me confidence to enroll. The instructor explains complex concepts clearly.",
                      },
                      {
                        name: "Mike Rodriguez",
                        rating: 5,
                        time: "1 month ago",
                        comment:
                          "The free preview was very helpful in understanding the teaching style. Definitely worth the investment!",
                      },
                      {
                        name: "Emily Johnson",
                        rating: 4,
                        time: "2 months ago",
                        comment:
                          "Great content and structure. The preview feature is a nice touch that helped me decide.",
                      },
                    ].map((review, index) => (
                      <div key={index} className="space-y-2 border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                            {review.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.time}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
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
          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="font-bold text-lg">${course.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Level</span>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Students</span>
                  <span className="font-medium">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Certificate</span>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Included</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrollment CTA */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Ready to start learning?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join {course.students.toLocaleString()} students already enrolled
                </p>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  store.updateCourse(courseId, { enrolled: true })
                  onNavigate?.(routes.courseDetail(courseId))
                }}
              >
                Enroll Now - ${course.price}
              </Button>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">30-day money-back guarantee</p>
              </div>
            </CardContent>
          </Card>

          {/* What You'll Learn */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {[
                  "Advanced Node.js design patterns",
                  "Performance optimization techniques",
                  "Scalable architecture principles",
                  "Real-world project implementation",
                  "Best practices and common pitfalls",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Course Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Topics Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
