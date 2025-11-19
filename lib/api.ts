import axios from "axios";
import { localDB } from "./localDB";
import { deleteCookie } from "cookies-next/client";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v3",
  withCredentials: true, // if you're using cookies
});

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localDB.get("token", "");
    if (token && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      // Clear all local data on authentication errors
      localDB.clear();
      deleteCookie("mb_token");
      
      // Only redirect if we're in the browser and not already on login page
      if (typeof window !== "undefined" && !window.location.pathname.includes("/auth/")) {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export const socketAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEBHOOK_URL || "http://localhost:8080",
  // withCredentials: true, // if you're using cookies
});
