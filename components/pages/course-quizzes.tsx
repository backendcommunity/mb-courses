"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Clock, CheckCircle, XCircle, Trophy, Filter } from "lucide-react"
import { routes } from "@/lib/routes"

interface CourseQuizzesPageProps {
  courseId: string
  onNavigate: (path: string) => void
}

export function CourseQuizzesPage({ courseId, onNavigate }: CourseQuizzesPageProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  // Mock quiz data
  const quizzes = [
    {
      id: "quiz-1",
      title: "JavaScript Fundamentals Quiz",
      description: "Test your knowledge of JavaScript basics, variables, and functions",
      questions: 15,
      timeLimit: 20,
      difficulty: "Easy",
      attempts: 2,
      bestScore: 85,
      passed: true,
      completed: true,
    },
    {
      id: "quiz-2",
      title: "Async Programming Quiz",
      description: "Promises, async/await, and callback patterns",
      questions: 12,
      timeLimit: 15,
      difficulty: "Medium",
      attempts: 1,
      bestScore: 70,
      passed: false,
      completed: true,
    },
    {
      id: "quiz-3",
      title: "Advanced JavaScript Quiz",
      description: "Closures, prototypes, and advanced concepts",
      questions: 20,
      timeLimit: 30,
      difficulty: "Hard",
      attempts: 0,
      bestScore: null,
      passed: false,
      completed: false,
    },
  ]

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (filter === "completed") return quiz.completed
    if (filter === "pending") return !quiz.completed
    return true
  })

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

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-gray-500"
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(routes.courseDetail(courseId))}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" />
              Course Quizzes
            </h1>
            <p className="text-gray-600">Test your knowledge and track your progress</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Quizzes</p>
                <p className="text-2xl font-bold">{quizzes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{quizzes.filter((q) => q.completed).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Passed</p>
                <p className="text-2xl font-bold">{quizzes.filter((q) => q.passed).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    quizzes.filter((q) => q.bestScore).reduce((acc, q) => acc + (q.bestScore || 0), 0) /
                      quizzes.filter((q) => q.bestScore).length,
                  ) || 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-4 w-4 text-gray-600" />
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All Quizzes
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button variant={filter === "pending" ? "default" : "outline"} size="sm" onClick={() => setFilter("pending")}>
          Pending
        </Button>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{quiz.description}</p>
                </div>
                <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quiz Info */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  {quiz.questions} questions
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {quiz.timeLimit} min
                </div>
              </div>

              {/* Progress/Score */}
              {quiz.completed ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Best Score</span>
                    <span className={`font-semibold ${getScoreColor(quiz.bestScore)}`}>{quiz.bestScore}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {quiz.passed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm text-gray-600">
                      {quiz.attempts} attempt{quiz.attempts !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm text-gray-500">Not attempted yet</p>
                </div>
              )}

              {/* Action Button */}
              <Button
                className="w-full"
                onClick={() => onNavigate(routes.courseQuiz(courseId, quiz.id))}
                variant={quiz.completed && !quiz.passed ? "outline" : "default"}
              >
                {quiz.completed ? (quiz.passed ? "Review Quiz" : "Retake Quiz") : "Start Quiz"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No quizzes found</h3>
            <p className="text-gray-500">
              {filter === "all" ? "No quizzes available for this course yet." : `No ${filter} quizzes found.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
