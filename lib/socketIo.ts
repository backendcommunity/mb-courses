// socket.ts
import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_WEBHOOK_URL || "http://localhost:8000",
  {
    withCredentials: true,
    transports: ["websocket", "polling"], // or polling fallback
    auth: {
      token: "your-auth-token",
    },
  }
);
export default socket;
