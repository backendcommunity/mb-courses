export const routes = {
  // Main dashboard
  dashboard: "/dashboard",
  home: "/dashboard",
  profile: "/dashboard/profile",
  settings: "/dashboard/settings",

  // Courses
  courses: "/dashboard/courses",
  courseDetail: (courseId: string) => `/dashboard/courses/${courseId}`,
  coursePreview: (courseId: string) => `/dashboard/courses/${courseId}/preview`,
  courseWatch: (courseId: string, chapterId: string) => `/dashboard/courses/${courseId}/watch/${chapterId}`,
  courseQuizzes: (courseId: string) => `/dashboard/courses/${courseId}/quizzes`,
  courseQuiz: (courseId: string, quizId: string) => `/dashboard/courses/${courseId}/quizzes/${quizId}`,
  courseExercises: (courseId: string) => `/dashboard/courses/${courseId}/exercises`,
  courseExercise: (courseId: string, exerciseId: string) => `/dashboard/courses/${courseId}/exercises/${exerciseId}`,
  coursePlaygrounds: (courseId: string) => `/dashboard/courses/${courseId}/playgrounds`,
  coursePlayground: (courseId: string, playgroundId: string) =>
    `/dashboard/courses/${courseId}/playgrounds/${playgroundId}`,
  courseProjects: (courseId: string) => `/dashboard/courses/${courseId}/projects`,
  courseProject: (courseId: string, projectId: string) => `/dashboard/courses/${courseId}/projects/${projectId}`,
  courseCertificate: (courseId: string) => `/dashboard/courses/${courseId}/certificate`,

  // Roadmaps
  roadmaps: "/dashboard/roadmaps",
  roadmapDetail: (roadmapId: string) => `/dashboard/roadmaps/${roadmapId}`,
  roadmapWatch: (roadmapId: string) => `/dashboard/roadmaps/${roadmapId}/watch`,
  roadmapVideoWatch: (roadmapId: string, videoId: string) => `/dashboard/roadmaps/${roadmapId}/video/${videoId}`,
  roadmapCoursePreview: (roadmapId: string, courseId: string) => `/dashboard/roadmaps/${roadmapId}/courses/${courseId}`,
  roadmapCourseWatch: (roadmapId: string, courseId: string, chapterId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/watch/${chapterId}`,
  roadmapCourseQuizzes: (roadmapId: string, courseId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/quizzes`,
  roadmapCourseQuiz: (roadmapId: string, courseId: string, quizId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/quizzes/${quizId}`,
  roadmapCourseExercises: (roadmapId: string, courseId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/exercises`,
  roadmapCourseExercise: (roadmapId: string, courseId: string, exerciseId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/exercises/${exerciseId}`,
  roadmapCoursePlaygrounds: (roadmapId: string, courseId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/playgrounds`,
  roadmapCoursePlayground: (roadmapId: string, courseId: string, playgroundId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/playgrounds/${playgroundId}`,
  roadmapCourseProjects: (roadmapId: string, courseId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/projects`,
  roadmapCourseProject: (roadmapId: string, courseId: string, projectId: string) =>
    `/dashboard/roadmaps/${roadmapId}/courses/${courseId}/projects/${projectId}`,

  // Learning Paths
  paths: "/dashboard/paths",
  pathDetail: (pathId: string) => `/dashboard/paths/${pathId}`,
  pathContinue: (pathId: string) => `/dashboard/paths/${pathId}/continue`,
  pathContentWatch: (pathId: string, stepId: string) => `/dashboard/paths/${pathId}/watch/${stepId}`,

  // Bootcamps
  bootcamps: "/dashboard/bootcamps",
  bootcampDetail: (bootcampId: string) => `/dashboard/bootcamps/${bootcampId}`,
  bootcampDashboard: (bootcampId: string) => `/dashboard/bootcamps/${bootcampId}/dashboard`,
  bootcampWeek: (bootcampId: string, weekId: string) => `/dashboard/bootcamps/${bootcampId}/week/${weekId}`,

  // Project30
  project30: "/dashboard/project30",
  project30Detail: (courseId: string) => `/dashboard/project30/${courseId}`,
  project30Day: (courseId: string, dayNumber: string) => `/dashboard/project30/${courseId}/day/${dayNumber}`,
  project30Community: (courseId: string) => `/dashboard/project30/${courseId}/community`,
  project30Leaderboard: (courseId: string) => `/dashboard/project30/${courseId}/leaderboard`,

  // Projects
  projects: "/dashboard/projects",
  projectDetail: (projectId: string) => `/dashboard/projects/${projectId}`,

  // MB Lands
  lands: "/dashboard/lands",
  landDetail: (landId: string) => `/dashboard/lands/${landId}`,
  stageDetail: (landId: string, stageId: string) => `/dashboard/lands/${landId}/stages/${stageId}`,
  challengeDetail: (landId: string, stageId: string, challengeId: string) =>
    `/dashboard/lands/${landId}/stages/${stageId}/challenges/${challengeId}`,

  // Interviews
  interviews: "/dashboard/interviews",
  interviewDetail: (interviewId: string) => `/dashboard/interviews/${interviewId}`,
  interviewProject: (interviewId: string) => `/dashboard/interviews/${interviewId}/project`,
  interviewAlgorithm: (interviewId: string) => `/dashboard/interviews/${interviewId}/algorithm`,
  interviewResults: (interviewId: string) => `/dashboard/interviews/${interviewId}/results`,

  // Mock Interviews
  mockInterviews: "/dashboard/mock-interviews",
  mockInterviewDetail: (id: string) => `/dashboard/mock-interviews/${id}`,
  mockInterviewResults: (id: string) => `/dashboard/mock-interviews/${id}/results`,

  // Community
  community: "/dashboard/community",

  // Subscription & Billing
  subscriptionPlans: "/dashboard/subscription/plans",
  subscriptionManagement: "/dashboard/subscription/management",
  billing: "/dashboard/billing",
  checkout: (type: string, planId: string) => `/dashboard/checkout?type=${type}&plan=${planId}`,

  // XP Store & Redemption
  xpStore: "/dashboard/xp-store",
  xpRedeem: (category: string, itemId: string) => `/dashboard/xp-store/redeem?category=${category}&item=${itemId}`,
  xpHistory: "/dashboard/xp-store/history",

  // Auth
  logout: "/logout",
}

// Helper function to check if a path matches a route pattern
export const matchesRoute = (currentPath: string, routePattern: string): boolean => {
  if (currentPath === routePattern) return true

  // Handle dynamic routes
  const currentSegments = currentPath.split("/").filter(Boolean)
  const patternSegments = routePattern.split("/").filter(Boolean)

  if (currentSegments.length !== patternSegments.length) return false

  return patternSegments.every((segment, index) => {
    if (segment.startsWith(":")) return true // Dynamic segment
    return segment === currentSegments[index]
  })
}

// Helper function to extract parameters from a route
export const extractRouteParams = (currentPath: string, routePattern: string): Record<string, string> => {
  const currentSegments = currentPath.split("/").filter(Boolean)
  const patternSegments = routePattern.split("/").filter(Boolean)
  const params: Record<string, string> = {}

  patternSegments.forEach((segment, index) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1)
      params[paramName] = currentSegments[index]
    }
  })

  return params
}
