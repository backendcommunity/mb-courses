import type { PortfolioResponse, PortfolioData } from "./portfolio-types";
import { LEVEL_NAMES } from "./portfolio-types";

/**
 * Transforms API PortfolioResponse to component PortfolioData format
 * Now includes enriched fields from database (Solution, UserCohort, Quiz/Exercise data)
 */
export function transformPortfolioResponse(
  response: PortfolioResponse,
): PortfolioData {
  return {
    user: {
      id: response.user.id,
      name: response.user.name,
      username: response.user.username, // Not provided by API
      bio: response.user.bio,
      avatar: response.user.avatar,
      location: response.user.location || "",
      level: response.user.level,
      levelName:
        response.user.levelName ||
        LEVEL_NAMES[response.user.level] ||
        "Developer",
      xp: response.user.xp || 0, // ✅ From API (user.points)
      xpToNextLevel: 0, // Not tracked yet
      points: response.user.points,
      streak: response.user.streak,
      isVerified: response.user.isVerified || false, // ✅ From API (emailConfirmed)
      isOpenToWork: response.user.openToWork || false, // ✅ From API (user.openToWork)
      joinedAt: response.user.joinedAt,
      socialLinks: {
        github: response.user.socialLinks?.github,
        linkedin: response.user.socialLinks?.linkedin,
        website: response.user.socialLinks?.website,
        twitter: undefined, // Not provided by API
      },
    },
    stats: {
      totalProjects: response.stats.totalProjects,
      totalPoints: response.stats.totalPoints,
      coursesCompleted: response.stats.coursesCompleted,
      certificates: response.stats.certificates,
      globalRank: response.stats.globalRank,
      totalUsers: response.stats.totalUsers,
    },
    skills: [], // Not provided by API - could be derived from projects in future
    projects: response.projects.map((p) => ({
      id: p.id,
      title: p.title,
      level: p.level || "Intermediate",
      score: p.score || 0, // ✅ From API (Solution.score)
      status: p.status || "in_progress", // ✅ From API (Solution.status)
      isVerified: p.isVerified || false, // ✅ From API (Solution.status == 'APPROVED')
      technologies: p.technologies || [],
      repositoryUrl: p.repositoryUrl, // ✅ From API (Solution.repository)
      liveUrl: p.liveUrl, // ✅ From API (Solution.baseURL)
      summary: p.summary,
      completedAt: p.completedAt, // ✅ From API (Solution.createdAt)
      featured: p.featured || false, // ✅ From API (Solution.isPublic)
      challenges: p.challenges, // ✅ From API (Solution.challenges)
      tools: p.tools, // ✅ From API (Solution.tools)
      docsUrl: p.docsUrl, // ✅ From API (Solution.docsURL)
    })),
    activity: {
      days: response.activity.days.map((d) => ({
        date: d.date,
        count: d.count,
        xp: d.xp,
        types: d.types,
      })),
      currentStreak: response.activity.currentStreak,
      longestStreak: response.activity.longestStreak,
      activeDaysCount: response.activity.activeDaysCount,
      totalActivities: response.activity.totalActivities,
      monthlyXp: response.activity.monthlyXp,
    },
    mockInterviews: {
      totalInterviews: response.mockInterviews.totalInterviews,
      averageScore: response.mockInterviews.averageScore,
      practicedHours: response.mockInterviews.practicedHours || 0, // ✅ From API
      topicBreakdown: response.mockInterviews.topicBreakdown.map((t) => ({
        topic: t.topic,
        score: t.score,
        totalQuestions: 0, // Would need more API data
      })),
      strengths: response.mockInterviews.strengths || [], // ✅ From API
      practiceTemplates: response.mockInterviews.practiceTemplates || [], // ✅ From API
    },
    achievements: response.achievements.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      icon: a.icon || "🏆",
      rarity: "Common" as const, // Not provided by API
      completed: a.completed,
      progress: a.progress,
      earnedAt: a.earnedAt,
    })),
    certificates: response.certificates.map((c) => ({
      id: c.id,
      code: c.code,
      courseName: c.courseName,
      finalScore: c.finalScore,
      date: c.date,
      verifyUrl: undefined, // Not provided by API
    })),
    roadmaps: response.roadmaps.map((r) => ({
      id: r.id,
      name: r.name,
      progress: r.progress,
      topicsCompleted: r.topicsCompleted || 0, // ✅ From API
      topicsTotal: r.topicsTotal || 0, // ✅ From API
    })),
    quizExerciseSummary: {
      quizzesPassed: response.quizExerciseSummary.quizzesPassed,
      quizzesTotal: response.quizExerciseSummary.quizzesTotal, // ✅ From API
      quizAvgScore: response.quizExerciseSummary.quizAvgScore, // ✅ From API
      exercisesCompleted: response.quizExerciseSummary.exercisesCompleted,
      exercisesTotal: response.quizExerciseSummary.exercisesTotal, // ✅ From API
      exerciseAvgScore: response.quizExerciseSummary.exerciseAvgScore, // ✅ From API
    },
    bootcamps: response.bootcamps.map((b) => ({
      id: b.id,
      name: b.name,
      cohortName: b.cohortName || "", // ✅ From API (Cohort.name)
      status:
        (b.status as "completed" | "in_progress" | "upcoming") || "in_progress",
      completionPercent: b.completionPercent,
      score: b.score || 0, // ✅ From API (UserCohort.score)
      attendanceRate: b.attendanceRate || 0, // ✅ From API
      peerRank: b.peerRank || 0, // ✅ From API
      totalPeers: b.totalPeers || 0, // ✅ From API (count of UserCohort)
      startedAt: b?.startedAt, // ✅ From API (Cohort.startsAt)
      completedAt: b.completedAt, // ✅ From API (UserCohort.endedAt)
    })),
  };
}
