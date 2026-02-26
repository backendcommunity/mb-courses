/**
 * Continue Learning Card Component
 * Epic 5, Story 5.1: Resume last active courses
 *
 * Shows up to 3 most recently active courses for quick resume
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { type ContinueLearningItem } from "@/lib/data";
import { ChevronRight, BookOpen } from "lucide-react";
import { analytics } from "@/lib/analytics";

export function ContinueLearningCard() {
  const store = useAppStore();
  const router = useRouter();
  const [courses, setCourses] = useState<ContinueLearningItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContinueLearning = async () => {
      try {
        setLoading(true);

        const data = await store.getContinueLearning();
        setCourses(data || []);
      } catch (error) {
        console.error("Failed to load continue learning:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContinueLearning();
  }, [store]);

  // Hide if no courses (empty state is implicit)
  if (!loading && courses.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
        <CardDescription>Pick up where you left off</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {loading ? (
            // Skeleton loading state
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 border border-border rounded-lg animate-pulse"
                >
                  <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-2 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Course cards
            courses.map((course) => (
              <div
                key={course.courseId}
                className="flex gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
              >
                {/* Course banner thumbnail */}
                {course?.banner ? (
                  <img
                    src={course.banner}
                    alt={course.title}
                    className="w-12 h-12 rounded-lg flex-shrink-0 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary/60" />
                  </div>
                )}

                {/* Course info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{course.title}</p>

                  {/* Resume point */}
                  {course.resume ? (
                    <p className="text-xs text-muted-foreground truncate">
                      {course.resume.videoTitle ||
                        course.resume.articleTitle ||
                        course.resume.chapterTitle ||
                        "Resume"}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Not started yet
                    </p>
                  )}
                </div>

                {/* Continue button */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    // Epic 5: Track continue learning interaction
                    analytics.track("click_resume_course", {
                      courseId: course.courseId,
                      courseTitle: course.title,
                      resumePoint:
                        course.resume?.videoTitle ||
                        course.resume?.articleTitle ||
                        course.resume?.chapterTitle,
                      fromDashboard: true,
                    });
                    router.push(`/courses/${course.slug}`);
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
