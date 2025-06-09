"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Target, Trophy, RotateCcw, ArrowRight } from "lucide-react"
import { getCourseById, getRoadmapById, getRoadmapMilestoneById, getQuizById, submitQuizAttempt } from "@/lib/data"

interface RoadmapCourseQuizProps {
  roadmapId: string
  milestoneId: string
  courseId: string
  quizId: string
  onBack: () => void
  onComplete: () => void
}

export function RoadmapCourseQuiz({
  roadmapId,
  milestoneId,
  courseId,
  quizId,
  onBack,
  onComplete,
}: RoadmapCourseQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const roadmap = getRoadmapById(roadmapId)
  const milestone = getRoadmapMilestoneById(roadmapId, milestoneId)
  const course = getCourseById(courseId)
  const quiz = getQuizById(courseId, quizId)

  useEffect(() => {
    if (quiz && !isSubmitted) {
      setTimeLeft(quiz.timeLimit * 60) // Convert minutes to seconds
    }
  }, [quiz, isSubmitted])

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitted])

  if (!roadmap || !milestone || !course || !quiz) {
    return <div>Quiz not found</div>
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / quiz.questions.length) * 100)
  }

  const handleSubmit = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setIsSubmitted(true)
    setShowResults(true)

    // Submit to data store
    submitQuizAttempt(courseId, quizId, finalScore)
  }

  const handleRetake = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(quiz.timeLimit * 60)
    setIsSubmitted(false)
    setScore(null)
    setShowResults(false)
  }

  const currentQuestionData = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quizzes
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{roadmap.title}</span>
                <span>•</span>
                <span>{milestone.title}</span>
                <span>•</span>
                <span>{course.title}</span>
                <span>•</span>
                <span>{quiz.title}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                {score !== null && score >= quiz.passingScore ? (
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {score !== null && score >= quiz.passingScore ? "Congratulations!" : "Quiz Complete"}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {score !== null && score >= quiz.passingScore
                  ? "You passed the quiz!"
                  : "You can retake the quiz to improve your score."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{score}%</div>
                  <div className="text-sm text-gray-600">Your Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{quiz.passingScore}%</div>
                  <div className="text-sm text-gray-600">Passing Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {quiz.questions.filter((q) => answers[q.id] === q.correctAnswer).length}/{quiz.questions.length}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
              <CardDescription>Review your answers and explanations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const isCorrect = userAnswer === question.correctAnswer

                return (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
                          isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">{question.question}</h3>

                        {question.type === "multiple-choice" && question.options && (
                          <div className="space-y-2 mb-3">
                            {question.options.map((option) => (
                              <div
                                key={option}
                                className={`p-2 rounded border text-sm ${
                                  option === question.correctAnswer
                                    ? "bg-green-50 border-green-200 text-green-800"
                                    : option === userAnswer && !isCorrect
                                      ? "bg-red-50 border-red-200 text-red-800"
                                      : "bg-gray-50 border-gray-200"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {option === question.correctAnswer && (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  )}
                                  {option === userAnswer && !isCorrect && (
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                  )}
                                  <span>{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <div className="text-sm font-medium text-blue-900 mb-1">Explanation:</div>
                          <div className="text-sm text-blue-800">{question.explanation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
              Back to Quizzes
            </Button>

            <div className="flex items-center gap-3">
              {score !== null && score < quiz.passingScore && quiz.attempts < quiz.maxAttempts && (
                <Button onClick={handleRetake} className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Retake Quiz
                </Button>
              )}

              <Button onClick={onComplete} className="flex items-center gap-2">
                Continue Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quizzes
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{roadmap.title}</span>
                <span>•</span>
                <span>{milestone.title}</span>
                <span>•</span>
                <span>{course.title}</span>
                <span>•</span>
                <span>{quiz.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-xs">
                <Target className="h-3 w-3 mr-1" />
                Roadmap Quiz
              </Badge>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className={timeLeft < 60 ? "text-red-600 font-medium" : "text-gray-700"}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </Badge>
            </div>

            <Progress value={progress} className="h-2 mb-4" />

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{quiz.description}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestionData.question}</CardTitle>
            <CardDescription>Select the best answer from the options below</CardDescription>
          </CardHeader>

          <CardContent>
            {currentQuestionData.type === "multiple-choice" && currentQuestionData.options && (
              <RadioGroup
                value={answers[currentQuestionData.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestionData.id, value)}
                className="space-y-3"
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData.type === "true-false" && currentQuestionData.options && (
              <RadioGroup
                value={answers[currentQuestionData.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestionData.id, value)}
                className="space-y-3"
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={option} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData.type === "fill-blank" && (
              <div className="space-y-3">
                <Label htmlFor="fill-blank-answer">Your Answer:</Label>
                <Input
                  id="fill-blank-answer"
                  value={answers[currentQuestionData.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestionData.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous Question
          </Button>

          <div className="flex items-center gap-3">
            {currentQuestion < quiz.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={!answers[currentQuestionData.id]}
              >
                Next Question
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!answers[currentQuestionData.id]}
                className="flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                Submit Quiz
              </Button>
            )}
          </div>
        </div>

        {/* Quiz Info Sidebar */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base">Quiz Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Time Limit:</span>
              <span className="font-medium">{quiz.timeLimit} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Passing Score:</span>
              <span className="font-medium">{quiz.passingScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Attempts:</span>
              <span className="font-medium">
                {quiz.attempts + 1} / {quiz.maxAttempts}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Questions:</span>
              <span className="font-medium">{quiz.questions.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { RoadmapCourseQuiz as RoadmapCourseQuizPage }
