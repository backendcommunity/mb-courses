"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, Trophy, CheckCircle, AlertCircle, Target, FileText, Play, Star } from "lucide-react"
import { getCourseById, getRoadmapById, getRoadmapMilestoneById, getCourseQuizzes } from "@/lib/data"

interface RoadmapCourseQuizzesProps {
  roadmapId: string
  milestoneId: string
  courseId: string
  onBack: () => void
  onStartQuiz: (quizId: string) => void
}

export function RoadmapCourseQuizzes({
  roadmapId,
  milestoneId,
  courseId,
  onBack,
  onStartQuiz,
}: RoadmapCourseQuizzesProps) {
  const roadmap = getRoadmapById(roadmapId)
  const milestone = getRoadmapMilestoneById(roadmapId, milestoneId)
  const course = getCourseById(courseId)
  const quizzes = getCourseQuizzes(courseId)

  if (!roadmap || !milestone || !course) {
    return <div>Course not found</div>
  }

  const completedQuizzes = quizzes.filter((q) => q.completed).length
  const totalQuizzes = quizzes.length
  const averageScore =
    quizzes.filter((q) => q.score !== undefined).reduce((acc, q) => acc + (q.score || 0), 0) /
    Math.max(1, quizzes.filter((q) => q.score !== undefined).length)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{roadmap.title}</span>
              <span>•</span>
              <span>{milestone.title}</span>
              <span>•</span>
              <span>{course.title}</span>
              <span>•</span>
              <span>Quizzes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Course Quizzes</h1>
                  <p className="text-gray-600">Test your knowledge with interactive quizzes</p>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{completedQuizzes}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{totalQuizzes}</div>
                        <div className="text-sm text-gray-600">Total Quizzes</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {isNaN(averageScore) ? "--" : Math.round(averageScore)}%
                        </div>
                        <div className="text-sm text-gray-600">Average Score</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quizzes List */}
            <div className="space-y-6">
              {quizzes.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quizzes Available</h3>
                    <p className="text-gray-600">This course doesn't have any quizzes yet.</p>
                  </CardContent>
                </Card>
              ) : (
                quizzes.map((quiz, index) => (
                  <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{quiz.title}</CardTitle>
                            <CardDescription className="text-base mb-3">{quiz.description}</CardDescription>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{quiz.timeLimit} minutes</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>{quiz.questions.length} questions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                <span>{quiz.passingScore}% to pass</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {quiz.completed ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Not Started</Badge>
                          )}

                          {quiz.score !== undefined && (
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">{quiz.score}%</div>
                              <div className="text-xs text-gray-500">Best Score</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Attempts: </span>
                            <span className="font-medium">
                              {quiz.attempts} / {quiz.maxAttempts}
                            </span>
                          </div>

                          {quiz.completed && quiz.score !== undefined && (
                            <div className="flex items-center gap-1">
                              {quiz.score >= quiz.passingScore ? (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-green-600 font-medium">Passed</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                  <span className="text-red-600 font-medium">Failed</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {quiz.completed &&
                            quiz.score !== undefined &&
                            quiz.score < quiz.passingScore &&
                            quiz.attempts < quiz.maxAttempts && (
                              <Button
                                variant="outline"
                                onClick={() => onStartQuiz(quiz.id)}
                                className="flex items-center gap-2"
                              >
                                <Play className="h-4 w-4" />
                                Retake Quiz
                              </Button>
                            )}

                          {!quiz.completed && quiz.attempts < quiz.maxAttempts && (
                            <Button onClick={() => onStartQuiz(quiz.id)} className="flex items-center gap-2">
                              <Play className="h-4 w-4" />
                              {quiz.attempts > 0 ? "Continue Quiz" : "Start Quiz"}
                            </Button>
                          )}

                          {quiz.attempts >= quiz.maxAttempts && !quiz.completed && (
                            <Badge variant="destructive">Max Attempts Reached</Badge>
                          )}
                        </div>
                      </div>

                      {/* Progress bar for partial completion */}
                      {quiz.attempts > 0 && !quiz.completed && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm text-gray-600">In Progress</span>
                          </div>
                          <Progress value={50} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Roadmap Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4 text-blue-500" />
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

            {/* Quiz Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quiz Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Read each question carefully before answering</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You can retake quizzes if you don't pass</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Review course materials before attempting</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Time limits help simulate real-world scenarios</span>
                </div>
              </CardContent>
            </Card>

            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="text-sm text-gray-600">
                    Complete quizzes to test your understanding and track your progress through the course.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export { RoadmapCourseQuizzes as RoadmapCourseQuizzesPage }
