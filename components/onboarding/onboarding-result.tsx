"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, Trophy, Flame, Star } from "lucide-react";

import { useAppStore } from "@/lib/store";

import type { OnboardingRecommendation } from "@/lib/data";
import { routes } from "@/lib/routes";

interface OnboardingResultProps {
  recommendation: OnboardingRecommendation;
}

export function OnboardingResult({ recommendation }: OnboardingResultProps) {
  const router = useRouter();
  const store = useAppStore();
  const { course, project, roadmap, stats, motivationalMessage } =
    recommendation;

  const handleStartLesson = async () => {
    try {
      if (course) {
        // Auto-enroll in recommended course
        await store.handleCourseEnrollment(course.id);

        // Navigate directly to first chapter/video
        if (course.firstChapterId) {
          router.push(
            routes.courseWatch(
              course.id,
              course.firstChapterId,
              course.firstVideoId ?? undefined
            )
          );
        } else {
          // Fallback: go to course detail
          router.push(routes.courseDetail(course.slug));
        }
      } else {
        // No course recommended — go to courses page
        router.push(routes.courses);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGoToDashboard = () => {
    router.push(routes.dashboard);
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(19, 174, 206, 0.1)" }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: "#13AECE" }} />
        </div>
      </div>
      <h1
        className="font-extrabold mb-2"
        style={{ fontSize: 26, color: "#FFFFFF" }}
      >
        Your learning path is ready!
      </h1>
      <p className="mb-8" style={{ fontSize: 14, color: "#9CA3AF" }}>
        {motivationalMessage}
      </p>

      {/* Gamification Rewards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div
          className="rounded-lg p-3 text-center"
          style={{ background: "rgba(19, 174, 206, 0.1)" }}
        >
          <Trophy className="w-5 h-5 mx-auto mb-2" style={{ color: "#13AECE" }} />
          <div
            className="font-bold text-sm"
            style={{ color: "#13AECE" }}
          >
            {stats.weeksToGoal}w
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>
            Timeline
          </div>
        </div>
        <div
          className="rounded-lg p-3 text-center"
          style={{ background: "rgba(34, 197, 94, 0.1)" }}
        >
          <Star className="w-5 h-5 mx-auto mb-2" style={{ color: "#22c55e" }} />
          <div
            className="font-bold text-sm"
            style={{ color: "#22c55e" }}
          >
            +500 XP
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>
            Starter Bonus
          </div>
        </div>
        <div
          className="rounded-lg p-3 text-center"
          style={{ background: "rgba(102, 51, 153, 0.1)" }}
        >
          <Flame className="w-5 h-5 mx-auto mb-2" style={{ color: "#a855f7" }} />
          <div
            className="font-bold text-sm"
            style={{ color: "#a855f7" }}
          >
            {stats.lessonsPlanned}
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>
            Lessons
          </div>
        </div>
        <div
          className="rounded-lg p-3 text-center"
          style={{ background: "rgba(249, 115, 22, 0.1)" }}
        >
          <CheckCircle className="w-5 h-5 mx-auto mb-2" style={{ color: "#f97316" }} />
          <div
            className="font-bold text-sm"
            style={{ color: "#f97316" }}
          >
            {stats.projectsToComplete}
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>
            Projects
          </div>
        </div>
      </div>

      {/* Recommendation Cards */}
      <div className="flex flex-col gap-4 text-left mb-8">
        {course && (
          <div
            className="rounded-xl p-4 border-l-4 relative"
            style={{
              background: "rgba(19, 174, 206, 0.05)",
              borderLeft: "4px solid #13AECE",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className="inline-block text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1"
                style={{
                  background: "rgba(19, 174, 206, 0.2)",
                  color: "#13AECE",
                }}
              >
                ⭐ Recommended First
              </span>
              <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>
                +200 XP
              </span>
            </div>
            <div className="font-bold text-white text-sm">{course.title}</div>
            <div style={{ color: "#9CA3AF", fontSize: 12, marginTop: 6 }}>
              {course.level} · {Math.round(course.totalDuration / 60)} hours ·{" "}
              {course.totalStudents.toLocaleString()} enrolled
            </div>
          </div>
        )}

        {project && (
          <div
            className="rounded-xl p-4 border-l-4 relative"
            style={{
              background: "rgba(34, 197, 94, 0.05)",
              borderLeft: "4px solid #22c55e",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className="inline-block text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1"
                style={{
                  background: "rgba(34, 197, 94, 0.2)",
                  color: "#22c55e",
                }}
              >
                🚀 First Build
              </span>
              <span style={{ fontSize: 11, color: "#f97316", fontWeight: 600 }}>
                +300 XP
              </span>
            </div>
            <div className="font-bold text-white text-sm">{project.title}</div>
            <div style={{ color: "#9CA3AF", fontSize: 12, marginTop: 6 }}>
              {project.level} · ~{Math.round(project.duration / 60)} hours
            </div>
          </div>
        )}

        {roadmap && (
          <div
            className="rounded-xl p-4 border-l-4 relative"
            style={{
              background: "rgba(168, 85, 247, 0.05)",
              borderLeft: "4px solid #a855f7",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className="inline-block text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1"
                style={{
                  background: "rgba(168, 85, 247, 0.2)",
                  color: "#a855f7",
                }}
              >
                📍 Your Path
              </span>
            </div>
            <div className="font-bold text-white text-sm">{roadmap.title}</div>
            <div style={{ color: "#9CA3AF", fontSize: 12, marginTop: 6 }}>
              {roadmap.firstTopics.join(" · ")}
            </div>
          </div>
        )}
      </div>

      {/* CTAs */}
      <button
        onClick={handleStartLesson}
        className="w-full sm:w-auto font-bold rounded-lg py-3 px-8 transition-all"
        style={{ background: "#13AECE", color: "#FFFFFF", fontSize: 16 }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.filter = "brightness(1.1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.filter = "brightness(1)")
        }
      >
        Start Your First Lesson &rarr;
      </button>

      <button
        onClick={handleGoToDashboard}
        className="block mx-auto mt-3 underline"
        style={{ fontSize: 12, color: "#6B7280" }}
      >
        Go to Dashboard instead
      </button>
    </div>
  );
}
