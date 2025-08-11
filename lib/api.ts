import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v3",
  withCredentials: true, // if you're using cookies
});

// const socketAPI = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v3",
//   withCredentials: true, // if you're using cookies
// });

export default api;
