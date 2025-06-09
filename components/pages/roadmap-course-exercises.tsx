"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Code, Trophy, CheckCircle, AlertCircle, Target, Play, Star } from "lucide-react"
import { getCourseById, getRoadmapById, getRoadmapMilestoneById, getCourseExercises } from "@/lib/data"

interface RoadmapCourseExercisesProps {
  roadmapId: string
  milestoneId: string
  courseId: string
  onBack: () => void
  onStartExercise: (exerciseId: string) => void
}

export function RoadmapCourseExercises({
  roadmapId,
  milestoneId,
  courseId,
  onBack,
  onStartExercise,
}: RoadmapCourseExercisesProps) {
  const roadmap = getRoadmapById(roadmapId)
  const milestone = getRoadmapMilestoneById(roadmapId, milestoneId)
  const course = getCourseById(courseId)
  const exercises = getCourseExercises(courseId)

  if (!roadmap || !milestone || !course) {
    return <div>Course not found</div>
  }

  const completedExercises = exercises.filter((e) => e.completed).length
  const totalExercises = exercises.length

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
              <span>Exercises</span>
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
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Code className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Coding Exercises</h1>
                  <p className="text-gray-600">Practice your skills with hands-on coding challenges</p>
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
                        <div className="text-2xl font-bold text-gray-900">{completedExercises}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Code className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{totalExercises}</div>
                        <div className="text-sm text-gray-600">Total Exercises</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Star className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0}%
                        </div>
                        <div className="text-sm text-gray-600">Completion Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Exercises List */}
            <div className="space-y-6">
              {exercises.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Exercises Available</h3>
                    <p className="text-gray-600">This course doesn't have any coding exercises yet.</p>
                  </CardContent>
                </Card>
              ) : (
                exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600 rounded-full font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-xl">{exercise.title}</CardTitle>
                              <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                            </div>
                            <CardDescription className="text-base mb-3">{exercise.description}</CardDescription>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Code className="h-4 w-4" />
                                <span>{exercise.language}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                <span>{exercise.testCases.length} test cases</span>
                              </div>
                              {exercise.hints.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <AlertCircle className="h-4 w-4" />
                                  <span>{exercise.hints.length} hints available</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {exercise.completed ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="secondary">{exercise.attempts > 0 ? "In Progress" : "Not Started"}</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Attempts: </span>
                            <span className="font-medium">{exercise.attempts}</span>
                          </div>

                          {exercise.completed && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-green-600 font-medium">Solved</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button onClick={() => onStartExercise(exercise.id)} className="flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            {exercise.completed
                              ? "Review Solution"
                              : exercise.attempts > 0
                                ? "Continue"
                                : "Start Exercise"}
                          </Button>
                        </div>
                      </div>

                      {/* Show test cases preview */}
                      {exercise.testCases.length > 0 && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-900 mb-2">Sample Test Case:</div>
                          <div className="text-sm text-gray-700">
                            <div>
                              <strong>Input:</strong> {exercise.testCases[0].input}
                            </div>
                            <div>
                              <strong>Expected Output:</strong> {exercise.testCases[0].expectedOutput}
                            </div>
                          </div>
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

            {/* Exercise Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Exercise Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Read the problem statement carefully</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Start with the sample test cases</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use hints if you get stuck</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Test your solution thoroughly</span>
                </div>
              </CardContent>
            </Card>

            {/* Difficulty Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Difficulty Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 text-xs">Easy</Badge>
                  <span>Basic concepts and syntax</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                  <span>Algorithms and data structures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800 text-xs">Hard</Badge>
                  <span>Complex problem solving</span>
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
                    Complete exercises to practice your coding skills and reinforce your learning.
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

export { RoadmapCourseExercises as RoadmapCourseExercisesPage }
