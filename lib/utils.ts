import { useUser } from "@/hooks/use-user";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// {
//     "name": "Python",
//     "code": "python"
// },
// {
//     "name": "Java",
//     "code": "java"
// },
// {
//     "name": "Rust",
//     "code": "rust"
// }

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
  // Online Code Editor for free
  // Write, Edit and Run your code using Online Compiler
  // Select your programming language below
`;
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
  const user = useUser();

  if (!date || date.includes("Free forever")) return date;

  const format = user?.settings?.dateFormat ?? "mdy"; // Default to mdy if not set
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;

  const pad = (n: number) => String(n).padStart(2, "0");

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1); // Months are 0-based
  const year = d.getFullYear();

  switch (format) {
    case "dmy":
      return `${day}/${month}/${year}`;
    case "ymd":
      return `${year}-${month}-${day}`;
    case "mdy":
    default:
      return `${month}/${day}/${year}`;
  }
};
