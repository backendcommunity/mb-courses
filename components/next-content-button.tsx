/**
 * NextContentButton Component
 * Epic 7, Story 7.1: Auto-Progression Learning Flow
 *
 * Displays a smart button showing the next content to watch/complete
 * Shows preview before auto-redirect with proper UX indicators
 */

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  CheckSquare,
  Code2,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { NextContent } from "@/hooks/use-next-content";

interface NextContentButtonProps {
  nextContent: NextContent | null;
  isLoading: boolean;
  onContinue: () => void;
  disabled?: boolean;
}

export function NextContentButton({
  nextContent,
  isLoading,
  onContinue,
  disabled = false,
}: NextContentButtonProps) {
  // No next content - course complete
  if (!nextContent) {
    return (
      <div className="w-full p-4 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
        <div className="text-2xl mb-2">🎉</div>
        <p className="font-semibold text-lg">Course Complete!</p>
        <p className="text-sm text-muted-foreground mt-1">
          Great job! You've completed all the content in this course.
        </p>
      </div>
    );
  }

  // Get appropriate icon based on content type
  const getIcon = () => {
    switch (nextContent.type) {
      case "VIDEO":
        return <Play className="h-4 w-4" />;
      case "QUIZ":
        return <CheckSquare className="h-4 w-4" />;
      case "EXERCISE":
        return <Code2 className="h-4 w-4" />;
      default:
        return <ChevronRight className="h-4 w-4" />;
    }
  };

  // Get label based on content type
  const getLabel = () => {
    switch (nextContent.type) {
      case "VIDEO":
        return "Next Video";
      case "QUIZ":
        return "Take Quiz";
      case "EXERCISE":
        return "Practice Exercise";
      default:
        return "Continue";
    }
  };

  // Get description
  const getDescription = () => {
    if (nextContent.metadata?.description) {
      return nextContent.metadata.description;
    }

    switch (nextContent.type) {
      case "VIDEO":
        return "Watch the next video to continue learning";
      case "QUIZ":
        return "Test your knowledge with this quiz";
      case "EXERCISE":
        return "Practice what you've learned";
      default:
        return "Continue to next content";
    }
  };

  return (
    <div className="space-y-3 w-full">
      {/* Preview Box */}
      <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
        {/* Header with icon and type badge */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md text-primary">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-1">
                {nextContent.title || "Next Content"}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                {getDescription()}
              </p>
            </div>
          </div>

          {/* Required badge */}
          {nextContent.required && (
            <Badge
              variant="destructive"
              className="flex-shrink-0 text-xs px-2 py-0.5"
            >
              Required
            </Badge>
          )}
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={onContinue}
        disabled={disabled || isLoading}
        className="w-full group"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <span>{getLabel()}</span>
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </Button>

      {/* Auto-progression indicator for optional content */}
      {!nextContent.required && nextContent.type !== null && (
        <p className="text-xs text-muted-foreground text-center">
          Redirecting in 3 seconds... <span className="font-medium">Click to proceed now</span>
        </p>
      )}
    </div>
  );
}

export default NextContentButton;
