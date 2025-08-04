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
  Milestone,
  Exercise,
  Reward,
  UserRoadmapFilters,
  MBPayload,
  Project30Query,
  Project30,
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
import { localDB } from "./localDB";

interface AppState {
  // Data getters
  getUser: () => User | any;
  getPlan: (name: string) => any;
  getCourses: (queries?: CoursesQuery) => Course[] | any;
  getProject30s: (queries?: Project30Query) => Project30[] | any;
  getProject30: (slug: string) => Project30 | any;
  loadMyProject30s: (queries?: Project30Query) => Project30[] | any;
  getCourse: (slug: string, params?: any) => Course | any;
  getUserCourse: (slug: string) => UserCourse | any;
  getUserCourses: (queries?: CoursesQuery) => UserCourse[] | any;
  getVideoNotes: (courseId: string, videoId: string) => Note[] | any;
  getCourseQuizzes: (courseId: string) => Quiz[] | any;
  getCourseExercises: (courseId: string) => Quiz[] | any;
  getProjects: () => Project[];
  getPlans: () => any;
  getChallenges: () => Challenge[];
  getInterviews: () => Interview[];
  getTransactions: (payload: { size?: number }) => any;
  getBootcamps: () => Bootcamp[];
  getLearningPaths: () => LearningPath[];
  getRoadmaps: (filters?: { skip?: number; size?: number }) => Roadmap[] | any;
  getUserRoadmaps: (data: UserRoadmapFilters) => any;
  getQuiz: (id: string) => Quiz | any;
  getRoadmapBySlug: (slug: string) => any;
  getRoadmapMilestones: (slug: string) => any;
  getMilestone: (slug: string, topicId: string) => Milestone | any;
  getRoadmapItems: (slug: string, topicId: string) => any;
  getExercise: (id: string) => Exercise | any;
  getRewards: () => Reward | any;
  getUserAchievement: (type?: string) => any;
  getBadges: () => any;
  getActivities: (queries: { size?: number; skip?: number }) => any;
  getVideo: (slug: string) => any;
  getProject30Leaderboard: (slug: string, filter?: any) => any;
  getProject30Achievements: (slug: string) => any;

  // Actions
  updateUser: (updates: Partial<User>) => any;
  startProject30: (slug: string) => Project30 | any;
  deleteAccount: () => void;
  changePassword: (updates: {
    oldPassword: string;
    newPassword: string;
  }) => void;
  cancelSubscription: (id: string) => any;
  markDayComplete: (slug: string, videoId: string, payload: any) => any;
  resumeSubscription: (id: string) => any;
  deletCard: (id: string) => any;
  deleteActivities: (ids: Array<string>) => any;
  puaseSubscription: (id: string, data: { months: number }) => any;
  redeemReward: (id: string) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateChallenge: (id: string, updates: Partial<Challenge>) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  enrollInCourse: (courseId: string) => void;
  enrollInBootcamp: (bootcampId: string) => void;
  enrollInPath: (pathId: string) => void;
  handleMBPayment: (payload: MBPayload) => any;
  completeChallenge: (challengeId: string) => void;
  addXP: (amount: number) => void;
  handleCourseEnrollment: (courseId: string) => UserCourse | any;
  handleRoadmapCourseEnrollment: (
    slug: string,
    courseId: string
  ) => UserCourse | any;
  startQuiz: (id: string, data: { userQuizId: string }) => any;
  submitQuiz: (id: string, questions: any) => any;
  saveNote: (note: string, courseId: string, videoId: string) => any;
  startMilestone: (slug: string, topicId: string, data: any) => any;
  markRoadmapItemCompleted: (
    slug: string,
    topicId: string,
    itemId: string,
    data: any
  ) => any;

  markCourseCompleted: (id: string) => any;

  markRoadmapVideoCompleted: (
    slug: string,
    topicId: string,
    payload: {
      type: string;
      itemId: string;
      isChapterCompleted?: boolean;
      courseId: string;
    }
  ) => any;

  // Force re-render trigger
  version: number;
  forceUpdate: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Data getters - always return current data from JSON store
  getUser: async () => {
    try {
      if (typeof localStorage !== "undefined") {
        const user = localStorage.getItem("mb_user");
        if (user && user !== "null") {
          const pUser = JSON.parse(user);
          if (pUser) return pUser;
        }
      }
      const res = await fetchUser();
      updateUserInStore(res.data);
      return res.data;
    } catch (error) {
      // throw error;
    }
  },
  getProject30Leaderboard: async (slug: string, filters?: any) => {
    const { data } = await api.get(
      `/project30s/${slug}/leaderboard?filters=${JSON.stringify(filters)}`
    );
    return data?.data;
  },

  getProject30Achievements: async (slug: string) => {
    const { data } = await api.get(`/project30s/${slug}/achievements`);
    return data?.data;
  },

  getProject30: async (slug: string) => {
    const { data } = await api.get(`/project30s/${slug}`);
    return data?.data;
  },
  getPlan: async (name: string) => {
    const { data } = await api.get(`/plans/${name}`);
    return data?.data;
  },
  getActivities: async (params: { size?: number; skip?: number }) => {
    const { data } = await api.get(`/activities`, {
      params,
    });
    return data?.data;
  },
  getRewards: async () => {
    const { data } = await api.get(`/rewards`);
    return data?.data;
  },
  getRoadmapItems: async (slug: string, topicId: string) => {
    const { data } = await api.get(`/roadmaps/${slug}/topics/${topicId}/items`);
    return data?.data;
  },

  getPlans: async () => {
    const { data } = await api.get(`/plans`);
    return data?.data;
  },

  loadMyProject30s: async (queries?: Project30Query) => {
    const { data } = await api.get(`/users/project30s`, {
      params: queries,
    });
    return data.data;
  },

  getCourses: async (queries?: CoursesQuery) => {
    try {
      const res = await fetchCourses(queries!);

      if (queries?.filters!["tab"]?.includes("popular")) {
        updatePopularCourses(res.data);
        return res.data?.courses;
      }
      updateCourses(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getUserCourses: async (queries?: CoursesQuery) => {
    try {
      const res = await fetchUserCourses(queries!);
      updateUserCourses(res.data);
      return res.data;
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

  getCourse: async (slug: string, params?: any) => {
    try {
      const res = await fetchCourse(slug, params);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getProject30s: async (queries?: Project30Query) => {
    const { data } = await api.get(`/project30s`, {
      params: queries,
    });
    return data.data;
  },

  getTransactions: async (payload) => {
    let url = `/payments/transactions`;
    if (payload.size) url = `/payments/transactions?size=${payload.size}`;
    const { data } = await api.get(url);
    return data?.data;
  },

  getVideoNotes: async (courseId: string, videoId: string) => {
    const res = await loadVideoNotes(courseId, videoId);
    return res.data;
  },
  getCourseQuizzes: async (courseId: string): Promise<Quiz[] | any> => {
    const res = await fetchCourseQuizzes(courseId);
    return res.data;
  },
  getCourseExercises: async (courseId: string): Promise<Exercise[] | any> => {
    const { data } = await api.get(`/courses/${courseId}/exercises`);
    return data.data;
  },
  getQuiz: async (id: string): Promise<Quiz | any> => {
    const { data } = await api.get("/quizzes/" + id);
    return data?.data;
  },
  getExercise: async (id: string): Promise<Exercise | any> => {
    const { data } = await api.get("/exercises/" + id);
    return data?.data;
  },
  getMilestone: async (slug: string, topicId: string) => {
    if (localDB.has("mb_milestone")) return localDB.get("mb_milestone", {});
    const { data } = await api.get(`/roadmaps/${slug}/topics/${topicId}`);
    localDB.set("mb_milestone", data?.data);
    return data?.data;
  },
  getProjects: () => dataStore.projects,
  getChallenges: () => dataStore.challenges,
  getInterviews: () => dataStore.interviews,
  getBootcamps: () => dataStore.bootcamps,
  getLearningPaths: () => dataStore.learningPaths,
  getRoadmaps: async (filters?) => {
    const { data } = await api.get(
      `/roadmaps?page=${filters?.skip}&size=${filters?.size}`
    );
    return data?.data?.roadmaps;
  },
  getUserRoadmaps: async ({ filters, size, skip }: UserRoadmapFilters) => {
    const {
      data: { data },
    } = await api.get(
      `/users/roadmaps?skip=${skip}&size=${size}&filters=${filters}`
    );
    return data?.data;
  },
  getUserAchievement: async (type?: string) => {
    let url = `/users/achievements`;
    if (type) url = `/users/achievements?type=${type}`;
    const { data } = await api.get(url);
    return data?.data;
  },

  getVideo: async (slug: string) => {
    const { data } = await api.get(`/courses/videos/${slug}`);
    return data?.data;
  },

  getBadges: async () => {
    const { data } = await api.get("/rewards/badges");
    return data?.data;
  },

  getRoadmapBySlug: async (slug: string) => {
    const { data } = await api.get("/roadmaps/" + slug);
    return data?.data;
  },

  getRoadmapMilestones: async (slug: string) => {
    const roadmap = await get().getRoadmapBySlug(slug);
    return roadmap ? roadmap.topics : [];
  },

  // Force re-render system
  version: 0,
  forceUpdate: () => set((state) => ({ version: state.version + 1 })),

  // Actions
  startProject30: async (slug: string) => {
    const { data } = await api.post("/project30s/" + slug);
    return data?.data;
  },
  startQuiz: async (id: string, { userQuizId }: { userQuizId: string }) => {
    const { data } = await api.post("/quizzes/" + id + "/start", {
      userQuizId,
    });
    return data?.data;
  },
  resumeSubscription: async (id: string) => {
    const { data } = await api.post(`/payments/subscriptions/${id}/resume`);
    return data?.data;
  },

  cancelSubscription: async (id: string) => {
    const { data } = await api.post(`/payments/subscriptions/${id}/cancel`);
    return data?.data;
  },
  puaseSubscription: async (id: string, payload: { months: number }) => {
    const url = `/payments/subscriptions/${id}/pause`;
    const { data } = await api.post(url, payload);
    return data?.data;
  },

  deletCard: async (id: string) => {
    const url = `/payments/subscriptions/${id}/cards`;
    const { data } = await api.delete(url);
    return data?.data;
  },

  deleteActivities: async (ids: Array<string>) => {
    const { data } = await api.delete("/activities", {
      params: { ids },
    });
    return data?.data;
  },

  redeemReward: async (id: string) => {
    const { data } = await api.post("/rewards/" + id);
    return data?.data;
  },

  markDayComplete: async (slug: string, videoId: string, payload: any) => {
    const { data } = await api.post(
      `/project30s/${slug}/days/${videoId}`,
      payload
    );
    return data?.data;
  },
  markRoadmapItemCompleted: async (
    slug: string,
    topicId: string,
    courseId: string,
    input: any
  ) => {
    const { data } = await api.post(
      `/roadmaps/${slug}/topics/${topicId}/courses/${courseId}`,
      input
    );
    return data?.data;
  },

  markRoadmapVideoCompleted: async (
    slug: string,
    topicId: string,
    payload: { type: string; itemId: string; isChapterCompleted?: boolean }
  ) => {
    const { data } = await api.post(
      `/roadmaps/${slug}/topics/${topicId}/video`,
      payload
    );
    return data?.data;
  },

  markCourseCompleted: async (userCourseId: string) => {
    const { data } = await api.post(`/courses/${userCourseId}/completed`);
    return data?.data;
  },

  changePassword: async (updates) => {
    const { data } = await api.post(`/auth/password/change`, updates);
    return data?.data;
  },

  deleteAccount: async () => {
    const { data } = await api.delete(`/users`);
    return data?.data;
  },

  saveNote: async (note: string, courseId: string, videoId: string) => {
    const { data } = await api.post(
      `/courses/${courseId}/videos/${videoId}/notes`,
      { note: note }
    );
    return data?.data;
  },

  startMilestone: async (slug: string, topicId: string, payload: any = {}) => {
    const { data } = await api.post(
      `/roadmaps/${slug}/topics/${topicId}`,
      payload
    );
    return data?.data;
  },

  handleMBPayment: async (payload: MBPayload) => {
    const { data } = await api.post("/payments", payload);
    return data?.data;
  },

  submitQuiz: async (id: string, questions: any) => {
    const { data } = await api.post("/quizzes/" + id + "/submit", questions);
    return data?.data;
  },
  updateUser: async (updates) => {
    const { data } = await api.put(`/users`, {
      ...updates,
    });
    updateUserInStore(data?.data);
    get().forceUpdate();
    return data?.data;
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

  handleRoadmapCourseEnrollment: async (slug: string, courseId: string) => {
    const { data } = await api.post(`/roadmaps/${slug}/courses/${courseId}`);

    return data;
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
    let newLevel = user?.level;
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
