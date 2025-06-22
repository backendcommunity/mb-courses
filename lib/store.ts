"use client";

import { create } from "zustand";
import {
  type User,
  type Course,
  type Project,
  type Challenge,
  type Interview,
  type Bootcamp,
  type LearningPath,
  type Roadmap,
  dataStore,
  updateUser as updateUserInStore,
  updateCourse as updateCourseInStore,
  updateProject as updateProjectInStore,
  updateChallenge as updateChallengeInStore,
  updateCourses,
  CoursesQuery,
  updateUserCourses,
  UserCourse,
  updatePopularCourses,
  Note,
  updateUserCourse,
  Quiz,
} from "./data";
import { fetchUser } from "./auth";
import {
  fetchCourse,
  fetchCourseQuizzes,
  fetchCourses,
  fetchUserCourse,
  fetchUserCourses,
  handleCourseEnrollment,
  loadVideoNotes,
} from "./courses";
import api from "./api";

interface AppState {
  // Data getters
  getUser: () => User | any;
  getCourses: (queries?: CoursesQuery) => Course[] | any;
  getCourse: (slug: string) => Course | any;
  getUserCourse: (slug: string) => UserCourse | any;
  getUserCourses: (queries?: CoursesQuery) => UserCourse[] | any;
  getVideoNotes: (courseId: string, videoId: string) => Note[] | any;
  getCourseQuizzes: (courseId: string) => Quiz[] | any;
  getProjects: () => Project[];
  getChallenges: () => Challenge[];
  getInterviews: () => Interview[];
  getBootcamps: () => Bootcamp[];
  getLearningPaths: () => LearningPath[];
  getRoadmaps: () => Roadmap[];
  getQuiz: (id: string) => Quiz | any;

  // Actions
  updateUser: (updates: Partial<User>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateChallenge: (id: string, updates: Partial<Challenge>) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  enrollInCourse: (courseId: string) => void;
  enrollInBootcamp: (bootcampId: string) => void;
  enrollInPath: (pathId: string) => void;
  completeChallenge: (challengeId: string) => void;
  addXP: (amount: number) => void;
  handleCourseEnrollment: (courseId: string) => UserCourse | any;
  startQuiz: (id: string, data: { userQuizId: string }) => any;
  submitQuiz: (id: string, questions: any) => any;

  // Force re-render trigger
  version: number;
  forceUpdate: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Data getters - always return current data from JSON store
  getUser: async () => {
    try {
      const res = await fetchUser();
      updateUserInStore(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getCourses: async (queries?: CoursesQuery) => {
    try {
      const res = await fetchCourses(queries!);

      if (queries?.filters!["tab"]?.includes("popular")) {
        updatePopularCourses(res.data);
        return res.data?.courses;
      }

      updateCourses(res.data);
      return res.data?.courses;
    } catch (error) {
      throw error;
    }
  },
  getUserCourses: async (queries?: CoursesQuery) => {
    try {
      const res = await fetchUserCourses(queries!);
      updateUserCourses(res.data);
      return res.data?.userCourses;
    } catch (error) {
      throw error;
    }
  },

  getUserCourse: async (courseId: string) => {
    try {
      const res = await fetchUserCourse(courseId);
      updateUserCourse(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getCourse: async (slug: string) => {
    try {
      const res = await fetchCourse(slug);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getVideoNotes: async (courseId: string, videoId: string) => {
    const res = await loadVideoNotes(courseId, videoId);
    return res.data;
  },
  getCourseQuizzes: async (courseId: string): Promise<Quiz[] | any> => {
    const res = await fetchCourseQuizzes(courseId);
    return res.data;
  },
  getQuiz: async (id: string): Promise<Quiz | any> => {
    const { data } = await api.get("/quizzes/" + id);
    return data?.data;
  },
  getProjects: () => dataStore.projects,
  getChallenges: () => dataStore.challenges,
  getInterviews: () => dataStore.interviews,
  getBootcamps: () => dataStore.bootcamps,
  getLearningPaths: () => dataStore.learningPaths,
  getRoadmaps: () => dataStore.roadmaps,

  // Force re-render system
  version: 0,
  forceUpdate: () => set((state) => ({ version: state.version + 1 })),

  // Actions
  startQuiz: async (id: string, { userQuizId }: { userQuizId: string }) => {
    const { data } = await api.post("/quizzes/" + id + "/start", {
      userQuizId,
    });
    return data?.data;
  },
  submitQuiz: async (id: string, questions: any) => {
    const { data } = await api.post("/quizzes/" + id + "/submit", questions);
    return data?.data;
  },
  updateUser: (updates) => {
    updateUserInStore(updates);
    get().forceUpdate();
  },

  updateCourse: (id, updates) => {
    updateCourseInStore(id, updates);
    get().forceUpdate();
  },

  handleCourseEnrollment: async (
    courseId: string
  ): Promise<UserCourse | any> => {
    const res = await handleCourseEnrollment(courseId);
    return res.data;
  },

  updateProject: (id, updates) => {
    updateProjectInStore(id, updates);
    get().forceUpdate();
  },

  updateChallenge: (id, updates) => {
    updateChallengeInStore(id, updates);
    get().forceUpdate();
  },

  updateInterview: (id, updates) => {
    const interview = dataStore.interviews.find((i) => i.id === id);
    if (interview) {
      Object.assign(interview, updates);
      get().forceUpdate();
    }
  },

  enrollInCourse: (courseId) => {
    const course = dataStore.coursesResponse.courses.find(
      (c) => c.id === courseId
    );
    if (course) {
      course.enrolled = true;
      get().forceUpdate();
    }
  },

  enrollInBootcamp: (bootcampId) => {
    const bootcamp = dataStore.bootcamps.find((b) => b.id === bootcampId);
    if (bootcamp) {
      bootcamp.enrolled = true;
      get().forceUpdate();
    }
  },

  enrollInPath: (pathId) => {
    const path = dataStore.learningPaths.find((p) => p.id === pathId);
    if (path) {
      path.enrolled = true;
      get().forceUpdate();
    }
  },

  completeChallenge: (challengeId) => {
    const challenge = dataStore.challenges.find((c) => c.id === challengeId);
    if (challenge && !challenge.completed) {
      challenge.completed = true;
      get().addXP(challenge.xpReward);
    }
  },

  addXP: (amount) => {
    const user = dataStore.user;
    const newXP = user.xp + amount;
    let newLevel = user.level;
    let newXPToNextLevel = user.xpToNextLevel;

    // Simple level calculation - every 1000 MB is a new level
    while (newXP >= newXPToNextLevel) {
      newLevel++;
      newXPToNextLevel += 1000;
    }

    user.xp = newXP;
    user.level = newLevel;
    user.xpToNextLevel = newXPToNextLevel;

    get().forceUpdate();
  },
}));
