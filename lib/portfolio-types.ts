export type BadgeRarity = "Common" | "Rare" | "Epic" | "Legendary";
export type ProjectStatus = "approved" | "pending" | "rejected" | "in_progress";
export type SkillDomain =
  | "Languages"
  | "Databases"
  | "Infrastructure"
  | "Patterns"
  | "AI/ML";

export const LEVEL_NAMES = [
  "Code Squire",
  "API Tinkerer",
  "Logic Blacksmith",
  "Auth Alchemist",
  "Database Cartographer",
  "Service Sorcerer",
  "Architect",
  "Performance Paladin",
  "DevOps Enchanter",
  "Backend Overlord",
] as const;

export const RARITY_COLORS: Record<BadgeRarity, string> = {
  Legendary: "#F2C94C",
  Epic: "#9B59B6",
  Rare: "#13AECE",
  Common: "#6B7280",
};

export interface PortfolioUser {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  level: number;
  levelName: string;
  xp: number;
  xpToNextLevel: number;
  points: number;
  streak: number;
  isVerified: boolean;
  isOpenToWork: boolean;
  joinedAt: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    website?: string;
    twitter?: string;
  };
}

export interface PortfolioStats {
  totalProjects: number;
  totalPoints: number;
  coursesCompleted: number;
  certificates: number;
  globalRank: number;
  totalUsers: number;
}

export interface PortfolioSkill {
  name: string;
  domain: SkillDomain;
  projectCount: number;
  maxProjectCount: number;
  coursesCompleted?: number;
  quizAvgScore?: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  level: string;
  score: number;
  status: ProjectStatus;
  isVerified: boolean;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  summary: string;
  completedAt?: string;
  featured?: boolean;
  challenges?: string[];
  tools?: string[];
  docsUrl?: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  xp: number;
  types?: { label: string; count: number }[];
}

export interface PortfolioActivity {
  days: ActivityDay[];
  currentStreak: number;
  longestStreak: number;
  activeDaysCount: number;
  totalActivities: number;
  monthlyXp: number;
}

export interface InterviewTopicScore {
  topic: string;
  score: number;
  totalQuestions: number;
}

export interface PortfolioMockInterviews {
  totalInterviews: number;
  averageScore: number;
  practicedHours: number;
  topicBreakdown: InterviewTopicScore[];
  strengths: string[];
  practiceTemplates: string[];
}

export interface PortfolioAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  completed: boolean;
  progress: number;
  earnedAt?: string;
}

export interface PortfolioCertificate {
  id: string;
  code: string;
  courseName: string;
  finalScore: number;
  date: string;
  verifyUrl?: string;
}

export interface PortfolioRoadmap {
  id: string;
  name: string;
  progress: number;
  topicsCompleted: number;
  topicsTotal: number;
}

export interface PortfolioQuizExerciseSummary {
  quizzesPassed: number;
  quizzesTotal: number;
  quizAvgScore: number;
  exercisesCompleted: number;
  exercisesTotal: number;
  exerciseAvgScore: number;
}

export interface PortfolioBootcamp {
  id: string;
  name: string;
  cohortName: string;
  status: "completed" | "in_progress" | "upcoming";
  completionPercent: number;
  score: number;
  attendanceRate: number;
  peerRank: number;
  totalPeers: number;
  startedAt: string;
  completedAt?: string;
}

export interface PortfolioData {
  user: PortfolioUser;
  stats: PortfolioStats;
  skills: PortfolioSkill[];
  projects: PortfolioProject[];
  activity: PortfolioActivity;
  mockInterviews: PortfolioMockInterviews;
  achievements: PortfolioAchievement[];
  certificates: PortfolioCertificate[];
  roadmaps: PortfolioRoadmap[];
  quizExerciseSummary: PortfolioQuizExerciseSummary;
  bootcamps: PortfolioBootcamp[];
}
