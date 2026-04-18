import { dataStore } from "@/lib/data";

export function useCourse() {
  const courses = dataStore.coursesResponse.courses;
  const meta = dataStore.coursesResponse.meta;

  const userCourses = dataStore.userCoursesResponse.userCourses;
  const userCourseMeta = dataStore.userCoursesResponse.meta;

  const popularCourses = dataStore.popularCoursesResponse.courses;
  const popularCourseMeta = dataStore.popularCoursesResponse.meta;

  return {
    courses,
    meta,
    userCourses,
    userCourseMeta,
    popularCourseMeta,
    popularCourses,
  };
}
