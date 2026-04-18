"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InterviewHeaderProps {
  interviewTitle?: string;
  interviewType?: string;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number; // in seconds
  isConnected: boolean;
  onBack?: () => void;
  className?: string;
}

export function InterviewHeader({
  currentQuestion,
  totalQuestions,
  timeRemaining,
  isConnected,
  onBack,
  className,
}: InterviewHeaderProps) {
  const [pulseTime, setPulseTime] = useState(false);

  // Pulse warning when time is running low
  useEffect(() => {
    if (timeRemaining <= 60) {
      setPulseTime(true);
    } else {
      setPulseTime(false);
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = (currentQuestion / totalQuestions) * 100;

  const getTimeColor = () => {
    if (timeRemaining <= 60) return "text-destructive";
    if (timeRemaining <= 300) return "text-yellow-500";
    return "text-foreground";
  };

  return (
    <TooltipProvider delayDuration={200}>
      <header
        className={cn(
          "flex items-center flex-col gap-3 lg:flex-row justify-between px-6 py-2 bg-card border-b border-border",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Back */}
          <div className="flex items-center gap-4">
            {onBack && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Exit interview</TooltipContent>
              </Tooltip>
            )}
            <div className="flex-1 max-w-md mx-8 hiden md:block">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground pr-2">
                  Progress
                </span>
                <span className="text-xs font-medium">
                  Question {currentQuestion} of {totalQuestions}
                </span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-2" />

                <div className="absolute inset-0 flex justify-between px-0.5">
                  {Array.from({ length: totalQuestions }).map((_, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full -mt-0 cursor-pointer transition-all",
                            i < currentQuestion
                              ? "bg-primary shadow-sm shadow-primary/50"
                              : i === currentQuestion - 1
                                ? "bg-primary ring-2 ring-primary/30"
                                : "bg-muted",
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        Question {i + 1}
                        {i < currentQuestion - 1 && " (Completed)"}
                        {i === currentQuestion - 1 && " (Current)"}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center Section - Progress */}
        </div>
        {/* Right Section - Timer & Status */}
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg",
                  isConnected
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500",
                )}
              >
                {isConnected ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4 animate-pulse" />
                )}
                <span className="text-xs font-medium hidden sm:inline">
                  {isConnected ? "Connected" : "Connecting"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {isConnected
                ? "Connected to interview session"
                : "Establishing connection..."}
            </TooltipContent>
          </Tooltip>

          {/* Timer */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50",
                  pulseTime && "animate-pulse border-destructive/50",
                )}
              >
                <Clock className={cn("w-4 h-4", getTimeColor())} />
                <span
                  className={cn(
                    "font-mono text-sm font-semibold tabular-nums",
                    getTimeColor(),
                  )}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {timeRemaining <= 60
                ? "Less than a minute remaining!"
                : "Time remaining"}
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
}
