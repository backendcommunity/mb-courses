"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Save,
  Share,
  FileText,
  Terminal,
  CheckCircle2,
  FolderOpen,
  File,
  Globe,
  ChevronRight,
  ChevronDown,
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  Download,
  Search,
  Settings,
  BookOpen,
  Wrench,
  Check,
  ArrowLeft,
} from "lucide-react";
import { getUser, Project, updateUser } from "@/lib/data";
import Editor from "@monaco-editor/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useAppStore } from "@/lib/store";
import { Loader } from "../ui/loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import ConfettiCelebration from "../confetti-celebration";

interface ProjectPlaygroundPageProps {
  slug: string;
  onNavigate: Function;
}

interface FileNode {
  name: string;
  type: "file" | "folder";
  icon: string;
  children?: FileNode[];
  content?: string;
  isOpen?: boolean;
  language?: string;
}

export function ProjectPlaygroundPage({
  slug,
  onNavigate,
}: ProjectPlaygroundPageProps) {
  const store = useAppStore();
  const [project, setProject] = useState<Project>();
  const [activeFile, setActiveFile] = useState("app.js");
  const [openFiles, setOpenFiles] = useState(["app.js"]);
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">(
    "vs-dark"
  );
  const [fontSize, setFontSize] = useState(14);
  const [terminalOutput, setTerminalOutput] = useState([
    "Welcome to MB Projects Terminal",
    "$ npm install",
    "✓ Dependencies installed successfully",
    "$ npm start",
    "Server running on http://localhost:3000",
    "",
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState("http://localhost:3000");
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const editorRef = useRef<any>(null);
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [activeTask, setActiveTask] = useState<any>();
  const [celebration, setCelebration] = useState(false);

  const getLanguageFromFileName = (fileName: string): string => {
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
  const [fileTree, setFileTree] = useState<FileNode[]>([
    {
      name: "src",
      type: "folder",
      icon: "📁",
      isOpen: true,
      children: [
        {
          name: "app.js",
          type: "file",
          icon: "📄",
          language: "javascript",
          content: `// E-commerce API - Main Application
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

module.exports = app;`,
        },
        {
          name: "routes",
          type: "folder",
          icon: "📁",
          isOpen: false,
          children: [
            {
              name: "auth.js",
              type: "file",
              icon: "📄",
              language: "javascript",
              content: `// Authentication routes
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;`,
            },
            {
              name: "products.js",
              type: "file",
              icon: "📄",
              language: "javascript",
              content: `// Product routes
const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;`,
            },
            {
              name: "orders.js",
              type: "file",
              icon: "📄",
              language: "javascript",
              content:
                "// Order routes\nconst express = require('express');\nconst router = express.Router();\n\n// TODO: Implement order routes\n\nmodule.exports = router;",
            },
          ],
        },
        {
          name: "models",
          type: "folder",
          icon: "📁",
          isOpen: false,
          children: [
            {
              name: "User.js",
              type: "file",
              icon: "📄",
              language: "javascript",
              content: `// User model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);`,
            },
            {
              name: "Product.js",
              type: "file",
              icon: "📄",
              language: "javascript",
              content: `// Product model
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);`,
            },
          ],
        },
      ],
    },
    {
      name: "package.json",
      type: "file",
      icon: "📦",
      language: "json",
      content: `{
  "name": "ecommerce-api",
  "version": "1.0.0",
  "description": "E-commerce API built with Node.js and Express",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.4"
  }
}`,
    },
    {
      name: ".env",
      type: "file",
      icon: "⚙️",
      language: "plaintext",
      content: `MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
NODE_ENV=development`,
    },
    {
      name: "README.md",
      type: "file",
      icon: "📖",
      language: "markdown",
      content: `# E-commerce API

A RESTful API for e-commerce applications built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Product management
- Order processing
- Input validation
- Rate limiting
- Security middleware

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd ecommerce-api
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

4. Start the server
\`\`\`bash
# Development
npm run dev

# Production
npm start
\`\`\`

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Login user

### Products
- \`GET /api/products\` - Get all products
- \`GET /api/products/:id\` - Get single product
- \`POST /api/products\` - Create product (protected)

## Testing

\`\`\`bash
npm test
\`\`\`

## License

MIT`,
    },
  ]);
  const [code, setCode] = useState(fileTree[0].children?.[0]?.content || "");
  const [currentLanguage, setCurrentLanguage] = useState("javascript");

  useEffect(() => {
    const file = findFile(fileTree, activeFile);
    if (file) {
      setCurrentLanguage(file.language || getLanguageFromFileName(activeFile));
    }
  }, [activeFile, fileTree]);

  useEffect(() => {
    setLoading(true);
    async function findProject(slug: string) {
      const project = await store.getProject(slug);
      setProject(project);
      setLoading(false);
    }
    findProject(slug);
  }, [slug]);

  if (loading) return <Loader isLoader={false} />;

  const tasks = project?.projectTasks?.flatMap((p: any) => p.tasks);

  const toggleFolder = (path: string[]) => {
    const updateTree = (
      nodes: FileNode[],
      currentPath: string[]
    ): FileNode[] => {
      return nodes.map((node) => {
        if (currentPath.length === 1 && node.name === currentPath[0]) {
          return { ...node, isOpen: !node.isOpen };
        } else if (
          currentPath.length > 1 &&
          node.name === currentPath[0] &&
          node.children
        ) {
          return {
            ...node,
            children: updateTree(node.children, currentPath.slice(1)),
          };
        }
        return node;
      });
    };
    setFileTree(updateTree(fileTree, path));
  };

  const findFile = (nodes: FileNode[], fileName: string): FileNode | null => {
    for (const node of nodes) {
      if (node.name === fileName && node.type === "file") {
        return node;
      }
      if (node.children) {
        const found = findFile(node.children, fileName);
        if (found) return found;
      }
    }
    return null;
  };

  const openFile = (fileName: string) => {
    const file = findFile(fileTree, fileName);
    if (file && file.content) {
      setActiveFile(fileName);
      setCode(file.content);
      setCurrentLanguage(file.language || getLanguageFromFileName(fileName));
      if (!openFiles.includes(fileName)) {
        setOpenFiles([...openFiles, fileName]);
      }
    }
  };

  const closeFile = (fileName: string) => {
    const newOpenFiles = openFiles.filter((f) => f !== fileName);
    setOpenFiles(newOpenFiles);
    if (activeFile === fileName && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[0]);
      const file = findFile(fileTree, newOpenFiles[0]);
      if (file?.content) {
        setCode(file.content);
        setCurrentLanguage(
          file.language || getLanguageFromFileName(newOpenFiles[0])
        );
      }
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      const command = terminalInput.trim();
      let output = "";

      // Simulate some basic commands
      switch (command) {
        case "npm install":
          output = "✓ Dependencies installed successfully";
          break;
        case "npm start":
          output = "Server running on http://localhost:3000";
          break;
        case "npm test":
          output = "✓ All tests passed";
          break;
        case "ls":
          output = "src/  package.json  .env  README.md";
          break;
        case "pwd":
          output = "/workspace/ecommerce-api";
          break;
        case "clear":
          setTerminalOutput(["Welcome to MB Projects Terminal"]);
          setTerminalInput("");
          return;
        default:
          output = `Command '${command}' not found`;
      }

      setTerminalOutput((prev) => [...prev, `$ ${command}`, output, ""]);
      setTerminalInput("");
      setTimeout(() => {
        terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
      }, 100);
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;

    // Configure editor options
    editor.updateOptions({
      fontSize: fontSize,
      fontFamily:
        "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
      lineHeight: 1.6,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: "on",
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      renderWhitespace: "selection",
      bracketPairColorization: { enabled: true },
    });
  };

  const renderFileTree = (nodes: FileNode[], path: string[] = []) => {
    return nodes.map((node) => (
      <div key={node.name} className="select-none">
        <div
          className={`flex items-center gap-2 px-2 py-1 rounded text-sm cursor-pointer hover:bg-muted/50 ${
            activeFile === node.name ? "bg-muted" : ""
          }`}
          style={{ paddingLeft: `${(path.length + 1) * 12}px` }}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder([...path, node.name]);
            } else {
              openFile(node.name);
            }
          }}
        >
          {node.type === "folder" && (
            <span className="w-4 h-4 flex items-center justify-center">
              {node.isOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </span>
          )}
          <span className="text-xs">{node.icon}</span>
          <span className="truncate">{node.name}</span>
        </div>
        {node.type === "folder" && node.isOpen && node.children && (
          <div>{renderFileTree(node.children, [...path, node.name])}</div>
        )}
      </div>
    ));
  };

  const handleMarkAsCompleted = async (id: string) => {
    try {
      setMarking(true);
      const completed = await store.markProjectTaskAsCompleted(slug, id);

      setProject((prev) => {
        if (!prev) return prev;

        const updatedProjectTasks = prev.projectTasks.map(
          (projectTask: any) => {
            const updatedTasks = projectTask.tasks.map((task: any) => {
              if (task?.id === completed.taskId) {
                return {
                  ...task,
                  userTask: {
                    ...task.userTask,
                    isCompleted: completed.isCompleted,
                  },
                };
              }
              return task;
            });

            return {
              ...projectTask,
              tasks: updatedTasks,
            };
          }
        );

        return {
          ...prev,
          projectTasks: updatedProjectTasks,
        };
      });

      setCelebration(true);
      toast.success("Task completed successfully");
      setMarkAsCompleted(false);

      // House keeping
      const { data } = await getUser();
      updateUser(data);
    } catch (error) {
      toast.error("An error occurred. Please try again");
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className="flex-1 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => onNavigate("/projects/" + slug)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {/* Back to Projects */}
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-2 capitalize">
              <Badge
                variant={
                  project?.level === "Hard"
                    ? "destructive"
                    : project?.level === "Medium"
                    ? "default"
                    : "secondary"
                }
              >
                {project?.level}
              </Badge>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              {project?.title}
            </h1>
          </div>
        </div>

        <div className="flex items-right gap-2">
          {/* <div className="flex items-center gap-2 mr-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setEditorTheme(editorTheme === "vs-dark" ? "light" : "vs-dark")
              }
            >
              {editorTheme === "vs-dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div> */}

          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>

          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm">
            <Play className="mr-2 h-4 w-4" />
            Run
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      {project?.status !== "Not Started" && (
        <div className="px-4 py-4 border-b">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{project?.progress}%</span>
          </div>
          <Progress value={project?.progress} className="h-1" />
        </div>
      )}

      {/* Main Editor Layout */}
      <div className="flex-1 flex">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Sidebar - File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full flex flex-col border-r bg-muted/20">
              <div className="p-3 border-b bg-muted/30">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  EXPLORER
                </h3>
              </div>
              <div className="p-2 border-b bg-muted/10">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  WORKSPACE
                </p>
              </div>
              <ScrollArea className="flex-1 p-2">
                {renderFileTree(fileTree)}
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Center - Code Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <div className="h-full flex flex-col">
              {/* File Tabs */}
              <div className="flex items-center border-b bg-muted/20">
                {openFiles.map((fileName) => (
                  <div
                    key={fileName}
                    className={`flex items-center gap-2 px-3 py-2 text-sm border-r cursor-pointer hover:bg-muted/50 ${
                      activeFile === fileName ? "bg-background" : ""
                    }`}
                    onClick={() => {
                      setActiveFile(fileName);
                      const file = findFile(fileTree, fileName);
                      if (file?.content) {
                        setCode(file.content);
                        setCurrentLanguage(
                          file.language || getLanguageFromFileName(fileName)
                        );
                      }
                    }}
                  >
                    <File className="h-3 w-3" />
                    <span>{fileName}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeFile(fileName);
                      }}
                      className="hover:bg-muted rounded p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 relative">
                <Editor
                  height="100%"
                  language={currentLanguage}
                  theme={editorTheme}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  onMount={handleEditorDidMount}
                  options={{
                    fontSize: fontSize,
                    fontFamily:
                      "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
                    lineHeight: 1.6,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    renderWhitespace: "selection",
                    bracketPairColorization: { enabled: true },
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    parameterHints: { enabled: true },
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel - Instructions & Tools */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <div className="h-full flex flex-col">
              <Tabs
                defaultValue="instructions"
                className="h-full flex flex-col"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger
                    value="instructions"
                    className="flex items-center gap-1"
                  >
                    <BookOpen className="h-3 w-3" />
                    <span className="hidden sm:inline">Tasks</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-1"
                  >
                    <Globe className="h-3 w-3" />
                    <span className="hidden sm:inline">Preview</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="terminal"
                    className="flex items-center gap-1"
                  >
                    <Terminal className="h-3 w-3" />
                    <span className="hidden sm:inline">Terminal</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tools"
                    className="flex items-center gap-1"
                  >
                    <Wrench className="h-3 w-3" />
                    <span className="hidden sm:inline">Tools</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="instructions"
                  className="flex-1 m-0 max-h-screen overflow-y-auto"
                >
                  <div className=" flex  flex-col border rounded-lg  ">
                    <div className="p-3 border-b bg-muted/30">
                      <h3 className="font-medium text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Project Tasks
                      </h3>
                    </div>
                    <div className="flex-1 p-4">
                      {/* const current = count++; */}
                      <Accordion type="single" collapsible>
                        {tasks?.map((task: any, i: number) => (
                          <AccordionItem key={task.id} value={`week-${i + 1}`}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center justify-between w-full mr-4">
                                <div className="text-left">
                                  <h3 className="font-semibold">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      Task {i + 1}:
                                    </Badge>{" "}
                                    {task?.title}
                                  </h3>

                                  <article
                                    dangerouslySetInnerHTML={{
                                      __html: task?.summary,
                                    }}
                                    className="text-xs text-muted-foreground [&>*>span]:!text-muted-foreground"
                                  ></article>
                                </div>
                                <div className="flex items-center gap-2">
                                  {task?.userTask?.isCompleted ? (
                                    <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                                  ) : (
                                    <Button
                                      onClick={() => {
                                        setActiveTask(task);
                                        setMarkAsCompleted(true);
                                      }}
                                      title="Mark as completed"
                                      variant="default"
                                      className="text-xs h-3 w-3"
                                    >
                                      <Check className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </AccordionTrigger>

                            <AccordionContent className="w-80 h-full ">
                              <div className="space-y-3 pt-4 w-full ">
                                <div
                                  key={task.id}
                                  className={`flex items-center space-x-4 rounded-lg border p-4 transition-colors w-full`}
                                  onClick={() => {}}
                                >
                                  <div className="flex-1 space-y-1 min-w-0">
                                    <h4 className="font-medium text-sm md:text-base">
                                      {task.title}
                                    </h4>
                                    <article
                                      dangerouslySetInnerHTML={{
                                        __html: task?.description,
                                      }}
                                      className="text-muted-foreground leading-relaxed [&>*>table]:p-3 [&>*>table]:border [&>*>code]:rounded-xl [&>*>code]:bg-zinc-800 [&>*>code]:p-1 [&>*>code]:text-sm [&>*>code]:font-medium [&>*>code]:text-zinc-100 [&>*>code]:overflow-x-auto w-full [&>*>li>pre]:mt-5 [&>*>li>pre]:rounded-xl [&>*>li>pre]:bg-zinc-800 [&>*>li>pre]:p-4 [&>*>li>pre]:text-sm [&>*>li>pre]:font-medium [&>*>li>pre]:text-zinc-100 [&>*>li>pre]:overflow-x-auto [&>*>li>a]:text-amber-300 [&>p>a]:text-amber-300 mx-auto w-full text-zinc-700 dark:text-zinc-300 [&>pre]:overflow-x-auto [&>h2]:text-2xl [&>h2]:font-bold [&>h3]:text-xl [&>h3]:font-bold [&>p]:mt-2 [&>p]:leading-relaxed [&>pre]:mt-5 [&>pre]:rounded-xl [&>pre]:bg-zinc-800 [&>pre]:p-4 [&>pre]:text-sm [&>pre]:font-medium [&>pre]:text-zinc-100 [&>ul]:mt-5 [&>ul]:flex [&>ul]:list-disc [&>ul]:flex-col [&>ul]:gap-2 [&>ul]:pl-6 [&>ol]:mt-5 [&>ol]:flex [&>ol]:list-decimal [&>ol]:flex-col [&>ol]:gap-2 [&>ol]:pl-6"
                                    ></article>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="flex-1 m-0">
                  <div className="h-full flex flex-col border rounded-lg">
                    <div className="flex items-center justify-between p-2 border-b bg-muted/30">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <input
                          type="text"
                          value={previewUrl}
                          onChange={(e) => setPreviewUrl(e.target.value)}
                          className="flex-1 px-2 py-1 text-xs bg-background border rounded"
                        />
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() =>
                            setIsPreviewMaximized(!isPreviewMaximized)
                          }
                        >
                          {isPreviewMaximized ? (
                            <Minimize2 className="h-3 w-3" />
                          ) : (
                            <Maximize2 className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 bg-white">
                      <iframe
                        src={previewUrl}
                        className="w-full h-full border-none"
                        title="Preview"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="terminal" className="flex-1 m-0">
                  <div className="h-full flex flex-col bg-black text-green-400 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-2 bg-gray-800">
                      <span className="text-xs font-medium">Terminal</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400"
                        onClick={() =>
                          setTerminalOutput(["Welcome to MB Projects Terminal"])
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <ScrollArea className="flex-1 p-3" ref={terminalRef}>
                      <div className="space-y-1 font-mono text-xs">
                        {terminalOutput.map((line, index) => (
                          <div
                            key={index}
                            className={
                              line.startsWith("$")
                                ? "text-yellow-400"
                                : line.startsWith("✓")
                                ? "text-green-400"
                                : "text-gray-300"
                            }
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <form
                      onSubmit={handleTerminalSubmit}
                      className="p-3 border-t border-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-mono text-xs">
                          $
                        </span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-xs"
                          placeholder="Enter command..."
                        />
                      </div>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="tools" className="flex-1 m-0">
                  <div className="h-full flex flex-col border rounded-lg">
                    <div className="p-3 border-b bg-muted/30">
                      <h3 className="font-medium text-sm flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        Development Tools
                      </h3>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-3">
                        <Select
                          value={fontSize.toString()}
                          onValueChange={(value) =>
                            setFontSize(Number.parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-full h-8">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12">12</SelectItem>
                            <SelectItem value="14">14</SelectItem>
                            <SelectItem value="16">16</SelectItem>
                            <SelectItem value="18">18</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Search Files
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Editor Settings
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          size="sm"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Project
                        </Button>
                        <Separator />
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Quick Actions
                          </h4>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                          >
                            Format Code
                          </Button>
                          <Button variant="ghost" size="sm">
                            Export project
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                          >
                            Run Tests
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                          >
                            Deploy Project
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Dialog
        open={markAsCompleted}
        onOpenChange={() => setMarkAsCompleted(false)}
      >
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">
              Mark as completed
            </DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to mark this task{" "}
              <span className="italic text-gray-300 bg-gray-700 p-1">
                {activeTask?.title}
              </span>{" "}
              as completed? Only mark task you've actually completed.
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={() => handleMarkAsCompleted(activeTask?.id)}
            variant="default"
            disabled={marking}
            className="w-full gap-2"
          >
            {marking ? (
              "Marking..."
            ) : (
              <>
                <Check className="h-4 w-4" />
                Mark As Completed
              </>
            )}
          </Button>
        </DialogContent>
      </Dialog>

      <ConfettiCelebration
        onComplete={() => setCelebration(false)}
        isVisible={celebration}
        celebrationType="completion"
        courseName={activeTask?.title!}
      />
    </div>
  );
}
