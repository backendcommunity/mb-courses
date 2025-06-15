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
} from "./data";

interface AppState {
  // Data getters
  getUser: () => User;
  getCourses: () => Course[];
  getProjects: () => Project[];
  getChallenges: () => Challenge[];
  getInterviews: () => Interview[];
  getBootcamps: () => Bootcamp[];
  getLearningPaths: () => LearningPath[];
  getRoadmaps: () => Roadmap[];

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

  // Force re-render trigger
  version: number;
  forceUpdate: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Data getters - always return current data from JSON store
  getUser: () => dataStore.user,
  getCourses: () => dataStore.courses,
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
  updateUser: (updates) => {
    updateUserInStore(updates);
    get().forceUpdate();
  },

  updateCourse: (id, updates) => {
    updateCourseInStore(id, updates);
    get().forceUpdate();
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
    const course = dataStore.courses.find((c) => c.id === courseId);
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
