"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  Lock,
  ArrowLeft,
  Trophy,
  Target,
  Zap,
  Code,
  FileText,
  PlayCircle,
  Award,
} from "lucide-react"
import { getCourseById, getRoadmapById, getRoadmapMilestoneById, enrollInCourse } from "@/lib/data"

interface RoadmapCoursePreviewProps {
  roadmapId: string
  milestoneId: string
  courseId: string
  onBack: () => void
  onEnroll: () => void
  onStartWatching: () => void
}

export function RoadmapCoursePreview({
  roadmapId,
  milestoneId,
  courseId,
  onBack,
  onEnroll,
  onStartWatching,
}: RoadmapCoursePreviewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const roadmap = getRoadmapById(roadmapId)
  const milestone = getRoadmapMilestoneById(roadmapId, milestoneId)
  const course = getCourseById(courseId)

  if (!roadmap || !milestone || !course) {
    return <div>Course not found</div>
  }

  const handleEnroll = () => {
    enrollInCourse(courseId)
    onEnroll()
  }

  const totalVideos = course.chapters.reduce((acc, chapter) => acc + chapter.videos.length, 0)
  const completedVideos = course.chapters.reduce(
    (acc, chapter) => acc + chapter.videos.filter((video) => video.completed).length,
    0,
  )

  const quizzes = course.chapters.filter((chapter) => chapter.quiz).length
  const exercises = course.chapters.filter((chapter) => chapter.exercise).length
  const playgrounds = course.chapters.filter((chapter) => chapter.playground).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Roadmap
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{roadmap.title}</span>
              <span>•</span>
              <span>{milestone.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant="outline">Roadmap Course</Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <p className="text-lg text-gray-600 mb-4">{course.description}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 ml-6">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Progress Bar (if enrolled) */}
              {course.enrolled && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {course.enrolled ? (
                  <Button onClick={onStartWatching} size="lg" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    {course.progress > 0 ? "Continue Learning" : "Start Learning"}
                  </Button>
                ) : (
                  <Button onClick={handleEnroll} size="lg" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Enroll in Course
                  </Button>
                )}

                {course.enrolled && (
                  <Button variant="outline" size="lg">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                )}
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-lg shadow-sm">
              <TabsList className="grid w-full grid-cols-4 p-1 m-6 mb-0">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6 pt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">What you'll learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.tags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Master {tag} concepts and best practices</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {course.longDescription && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Course Description</h3>
                      <div className="prose prose-sm max-w-none text-gray-700">
                        {course.longDescription.split("\n\n").map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Course Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <PlayCircle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{totalVideos}</div>
                        <div className="text-sm text-gray-600">Videos</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <FileText className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{quizzes}</div>
                        <div className="text-sm text-gray-600">Quizzes</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Code className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{exercises}</div>
                        <div className="text-sm text-gray-600">Exercises</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <Zap className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{playgrounds}</div>
                        <div className="text-sm text-gray-600">Playgrounds</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="p-6 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Course Curriculum</h3>
                    <div className="text-sm text-gray-600">
                      {course.chapters.length} chapters • {totalVideos} videos • {course.duration}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {course.chapters.map((chapter, index) => (
                      <Card key={chapter.id} className="border border-gray-200">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <CardTitle className="text-base">{chapter.title}</CardTitle>
                                <CardDescription className="text-sm">{chapter.description}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={chapter.completed ? "default" : "secondary"} className="text-xs">
                                {chapter.completed ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Completed
                                  </>
                                ) : course.enrolled ? (
                                  "Available"
                                ) : (
                                  <>
                                    <Lock className="h-3 w-3 mr-1" />
                                    Locked
                                  </>
                                )}
                              </Badge>
                              <span className="text-sm text-gray-500">{chapter.duration}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {chapter.videos.map((video) => (
                              <div key={video.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center justify-center w-6 h-6">
                                  {video.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : course.enrolled ? (
                                    <Play className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Lock className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">{video.title}</div>
                                  <div className="text-xs text-gray-500">{video.description}</div>
                                </div>
                                <div className="text-xs text-gray-500">{video.duration}</div>
                              </div>
                            ))}

                            {/* Show additional content types */}
                            {chapter.quiz && (
                              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center justify-center w-6 h-6">
                                  {chapter.quiz.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : course.enrolled ? (
                                    <FileText className="h-4 w-4 text-blue-500" />
                                  ) : (
                                    <Lock className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">{chapter.quiz.title}</div>
                                  <div className="text-xs text-gray-500">Quiz • {chapter.quiz.timeLimit} minutes</div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Quiz
                                </Badge>
                              </div>
                            )}

                            {chapter.exercise && (
                              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center justify-center w-6 h-6">
                                  {chapter.exercise.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : course.enrolled ? (
                                    <Code className="h-4 w-4 text-purple-500" />
                                  ) : (
                                    <Lock className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">{chapter.exercise.title}</div>
                                  <div className="text-xs text-gray-500">Exercise • {chapter.exercise.difficulty}</div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Exercise
                                </Badge>
                              </div>
                            )}

                            {chapter.playground && (
                              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center justify-center w-6 h-6">
                                  {chapter.playground.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : course.enrolled ? (
                                    <Zap className="h-4 w-4 text-orange-500" />
                                  ) : (
                                    <Lock className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">{chapter.playground.title}</div>
                                  <div className="text-xs text-gray-500">
                                    Playground • {chapter.playground.language}
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Playground
                                </Badge>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="p-6 pt-4">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" />
                      <AvatarFallback>
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{course.instructor}</h3>
                      <p className="text-gray-600 mb-3">Senior Backend Engineer & Technical Instructor</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        With over 8 years of experience in backend development, {course.instructor} has worked at top
                        tech companies and has taught thousands of students. Specializes in Node.js, system design, and
                        scalable architecture patterns.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">15</div>
                      <div className="text-sm text-gray-600">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">12K+</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">4.8</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">8</div>
                      <div className="text-sm text-gray-600">Years</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6 pt-4">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{course.rating}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Course Rating</div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-gray-600">{rating}</span>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 2 : 0}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {rating === 5
                                ? "70%"
                                : rating === 4
                                  ? "20%"
                                  : rating === 3
                                    ? "8%"
                                    : rating === 2
                                      ? "2%"
                                      : "0%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    {[
                      {
                        name: "Alex Johnson",
                        rating: 5,
                        date: "2 weeks ago",
                        comment:
                          "Excellent course! The instructor explains complex concepts in a very clear and understandable way. The hands-on exercises really helped solidify my understanding.",
                      },
                      {
                        name: "Sarah Chen",
                        rating: 5,
                        date: "1 month ago",
                        comment:
                          "This course exceeded my expectations. The content is up-to-date and the projects are very practical. I feel much more confident in my backend skills now.",
                      },
                      {
                        name: "Mike Rodriguez",
                        rating: 4,
                        date: "2 months ago",
                        comment:
                          "Great course overall. The pace is good and the examples are relevant. Would have liked a bit more depth on some advanced topics, but still highly recommend.",
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{review.name}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Roadmap Context Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Roadmap Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Current Roadmap</div>
                  <div className="text-sm text-gray-600">{roadmap.title}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Current Milestone</div>
                  <div className="text-sm text-gray-600">{milestone.title}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Milestone Progress</div>
                  <Progress value={milestone.progress} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">{milestone.progress}% complete</div>
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle>Course Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <PlayCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{totalVideos} video lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{quizzes} interactive quizzes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">{exercises} coding exercises</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{playgrounds} code playgrounds</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Certificate of completion</span>
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Basic JavaScript knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understanding of web technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Problem-solving mindset</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
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
    </div>
  )
}

export { RoadmapCoursePreview as RoadmapCoursePreviewPage }
