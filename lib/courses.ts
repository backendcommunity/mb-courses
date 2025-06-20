import api from "./api";
import { CoursesQuery } from "./data";

export const fetchCourses = async ({
  page,
  size,
  filters,
}: CoursesQuery): Promise<any> => {
  const { data } = await api.get("/courses", {
    params: { page, size, filters },
  });

  return data;
};

export const fetchUserCourses = async ({
  page,
  size,
  filters,
}: CoursesQuery): Promise<any> => {
  const { data } = await api.get("/users/courses", {
    params: { page, size, filters },
  });

  return data;
};

export const fetchCourse = async (courseId: string) => {
  const { data } = await api.get("/courses/" + courseId);

  return data;
};

export const loadVideoNotes = async (courseId: string, videoId: string) => {
  const { data } = await api.get(
    `/courses/${courseId}/videos/${videoId}/notes`
  );
  return data;
};

export const fetchUserCourse = async (courseId: string) => {
  const { data } = await api.get("/users/courses/" + courseId);

  return data;
};

export const handleCourseEnrollment = async (courseId: string) => {
  const { data } = await api.post("/courses/" + courseId);

  return data;
};

export const markVideoComlete = async (
  courseId: string,
  chapterId: string,
  videoId: string,
  payload: { isChapterCompleted: boolean }
) => {
  const { data } = await api.post(`/courses/${courseId}/videos/${videoId}`, {
    contentType: "VIDEO",
    type: "course",
    courseId,
    contentId: videoId,
    chapterId,
    payload,
  });
  return data;
};
