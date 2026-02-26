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
  const [courseData, setCourseData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const loadContinueLearning = async () => {
      try {
        setLoading(true);

        const data = await store.getContinueLearning();
        setCourses(data || []);

        // Pre-load course data for resume navigation
        if (data && data.length > 0) {
          const coursesMap: { [key: string]: any } = {};
          for (const item of data) {
            if (item.resume?.videoId) {
              try {
                const courseDetail = await store.getCourse(item.slug);
                coursesMap[item.courseId] = courseDetail;
              } catch (error) {
                console.error(`Failed to load course ${item.slug}:`, error);
              }
            }
          }
          setCourseData(coursesMap);
        }
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

                    // Navigate to the exact resume point (chapter + video/article)
                    let targetUrl = `/courses/${course.slug}`;

                    if (course.resume && (course.resume.videoId || course.resume.articleId)) {
                      const fullCourse = courseData[course.courseId];
                      if (fullCourse) {
                        // Find chapter slug containing the video/article
                        const chapter = fullCourse.chapters?.find((ch: any) => {
                          if (course.resume?.videoId) {
                            return ch.videos?.some((v: any) => v.id === course.resume?.videoId);
                          }
                          if (course.resume?.articleId) {
                            return ch.articles?.some((a: any) => a.id === course.resume?.articleId);
                          }
                          return false;
                        });

                        if (chapter) {
                          if (course.resume?.videoId) {
                            const video = chapter.videos?.find(
                              (v: any) => v.id === course.resume?.videoId
                            );
                            if (video) {
                              targetUrl = `/courses/${course.slug}/${chapter.slug}/${video.slug}`;
                            }
                          } else if (course.resume?.articleId) {
                            const article = chapter.articles?.find(
                              (a: any) => a.id === course.resume?.articleId
                            );
                            if (article) {
                              targetUrl = `/courses/${course.slug}/${chapter.slug}/${article.slug}`;
                            }
                          }
                        }
                      }
                    }

                    router.push(targetUrl);
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
