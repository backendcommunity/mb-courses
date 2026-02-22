"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <div style={{ maxWidth: 640 }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: 12,
            letterSpacing: "-0.5px",
          }}
        >
          Your learning path is ready
        </h1>
        <p style={{ fontSize: 15, color: "#D1D5DB", lineHeight: 1.6 }}>
          {motivationalMessage}
        </p>
      </div>

      {/* Quick Stats - Minimal Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            padding: 16,
            backgroundColor: "#1F2937",
            borderRadius: 8,
            border: "1px solid #374151",
          }}
        >
          <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>
            Timeline
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: 4,
            }}
          >
            {stats.weeksToGoal}w
          </div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            to complete
          </div>
        </div>

        <div
          style={{
            padding: 16,
            backgroundColor: "#1F2937",
            borderRadius: 8,
            border: "1px solid #374151",
          }}
        >
          <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>
            Content
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: 4,
            }}
          >
            {stats.lessonsPlanned}
          </div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            lessons
          </div>
        </div>

        <div
          style={{
            padding: 16,
            backgroundColor: "#1F2937",
            borderRadius: 8,
            border: "1px solid #374151",
          }}
        >
          <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>
            Practice
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: 4,
            }}
          >
            {stats.projectsToComplete}
          </div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            projects
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#9CA3AF",
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Your Recommendations
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {course && (
            <div
              style={{
                padding: 16,
                backgroundColor: "#1F2937",
                borderRadius: 8,
                border: "1px solid #374151",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>
                    Start with
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {course.title}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#D1D5DB",
                  display: "flex",
                  gap: 12,
                  marginTop: 10,
                }}
              >
                <span>{course.level}</span>
                <span>•</span>
                <span>{Math.round(course.totalDuration / 60)}h</span>
                <span>•</span>
                <span>{course.totalStudents.toLocaleString()} learners</span>
              </div>
            </div>
          )}

          {project && (
            <div
              style={{
                padding: 16,
                backgroundColor: "#1F2937",
                borderRadius: 8,
                border: "1px solid #374151",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>
                    Build with
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {project.title}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#D1D5DB",
                  display: "flex",
                  gap: 12,
                  marginTop: 10,
                }}
              >
                <span>{project.level}</span>
                <span>•</span>
                <span>~{Math.round(project.duration / 60)}h</span>
              </div>
            </div>
          )}

          {roadmap && (
            <div
              style={{
                padding: 16,
                backgroundColor: "#1F2937",
                borderRadius: 8,
                border: "1px solid #374151",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>
                    Follow
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    {roadmap.title}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#D1D5DB",
                  marginTop: 10,
                }}
              >
                {roadmap.firstTopics.slice(0, 3).join(" • ")}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button
          onClick={handleStartLesson}
          style={{
            width: "100%",
            padding: "12px 24px",
            fontSize: 15,
            fontWeight: 600,
            color: "#FFFFFF",
            background: "#13AECE",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0FA3C4";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#13AECE";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Start Learning
        </button>

        <button
          onClick={handleGoToDashboard}
          style={{
            width: "100%",
            padding: "12px 24px",
            fontSize: 15,
            fontWeight: 500,
            color: "#D1D5DB",
            background: "transparent",
            border: "1px solid #374151",
            borderRadius: 8,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4B5563";
            e.currentTarget.style.color = "#F3F4F6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#374151";
            e.currentTarget.style.color = "#D1D5DB";
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
