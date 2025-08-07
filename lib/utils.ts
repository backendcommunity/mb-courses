import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function onNavigate(path: string) {
  // This is a placeholder function for navigation
  // In a real app, this would use Next.js router or similar
  console.log(`Navigating to: ${path}`);
}
export const terminalSample = [
  "Welcome to MB Projects Terminal",
  "$ npm install",
  "✓ Dependencies installed successfully",
  "$ npm start",
  "Server running on http://localhost:3000",
  "",
];

export const sortFiles = (files: any) => {
  return files.sort((a: any, b: any) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type === "folder" ? -1 : 1;
  });
};

export const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "json":
      return "json";
    case "html":
      return "html";
    case "css":
      return "css";
    case "scss":
    case "sass":
      return "scss";
    case "md":
      return "markdown";
    case "py":
      return "python";
    case "java":
      return "java";
    case "cpp":
    case "c":
      return "cpp";
    case "php":
      return "php";
    case "rb":
      return "ruby";
    case "go":
      return "go";
    case "rs":
      return "rust";
    case "sql":
      return "sql";
    case "xml":
      return "xml";
    case "yaml":
    case "yml":
      return "yaml";
    default:
      return "plaintext";
  }
};

export function codeSample() {
  return `
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Redis client for storing user sessions
const redisClient = redis.createClient();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join room
  socket.on('join-room', (roomId, username) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', username);
  });
  
  // Handle messages
  socket.on('send-message', (roomId, message, username) => {
    io.to(roomId).emit('receive-message', {
      message,
      username,
      timestamp: new Date().toISOString()
    });
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;
}

export const handleShare = (title: string, url: string) => {
  if (navigator.share) {
    navigator
      .share({
        title: `Watch "${title}" on MasteringBackend`,
        text: `I'm learning from this great video: "${title}" on MasteringBackend.\nJoin me to become a great backend engineer!`,
        url: url,
      })
      .then(() => toast.success("Thanks for sharing!"))
      .catch((error) => toast.error("Error sharing", error));
  } else {
    // Fallback for browsers that don’t support navigator.share
    const shareText = `I'm watching "${title}" on MasteringBackend. Check it out: ${url}`;
    navigator.clipboard.writeText(shareText);
    toast.success(
      "Link copied to clipboard! You can now share it with your friends."
    );
  }
};

export const formatDate = (date: string) => {
  if (!date || date.includes("Free forever")) return date;
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};
