"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  ChevronRight,
  Lightbulb,
  Code,
  MessageSquare,
  Brain,
  Users,
} from "lucide-react";
import { InterviewQuestion } from "@/lib/mock-interview-data";

interface InterviewQuestionCardProps {
  question: InterviewQuestion;
  questionNumber: number;
  totalQuestions: number;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  className?: string;
}

const questionTypeIcons: Record<string, React.ReactNode> = {
  Conceptual: <Brain className="w-4 h-4" />,
  Technical: <Code className="w-4 h-4" />,
  "System Design": <Lightbulb className="w-4 h-4" />,
  Coding: <Code className="w-4 h-4" />,
  Behavioral: <Users className="w-4 h-4" />,
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

export function InterviewQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onNextQuestion,
  isLastQuestion,
  className,
}: InterviewQuestionCardProps) {
  return (
    <Card
      className={cn(
        "border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden",
        className
      )}
    >
      {/* Progress bar at top */}
      <div className="h-1 bg-secondary">
        <div
          className="h-full bg-gradient-to-r from-primary to-[hsl(190,83%,54%)] transition-all duration-500"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      <CardContent className="p-5">
        {/* Question Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
              {questionTypeIcons[question.type] || (
                <MessageSquare className="w-4 h-4" />
              )}
            </div>
            <div>
              <Badge variant="secondary" className="text-xs font-medium">
                {question.type}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                difficultyColors[question.difficulty] ||
                  "bg-secondary text-foreground"
              )}
            >
              {question.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{question.timeLimit} min</span>
            </div>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-5">
          <p className="text-sm text-muted-foreground mb-2">
            Question {questionNumber} of {totalQuestions}
          </p>
          <h3 className="text-lg font-medium leading-relaxed">
            {question.question}
          </h3>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Answer verbally — the AI will listen and respond
          </p>
          <Button
            onClick={onNextQuestion}
            className="gap-2"
            size="sm"
          >
            {isLastQuestion ? "Finish Interview" : "Next Question"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
