import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v3",
  withCredentials: true, // if you're using cookies
});

export const socketAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEBHOOK_URL || "http://localhost:8080",
  // withCredentials: true, // if you're using cookies
});
