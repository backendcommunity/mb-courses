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
  AlertTriangle,
} from "lucide-react";
import { getUser, Project, updateUser } from "@/lib/data";
import Editor, { OnChange } from "@monaco-editor/react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import ConfettiCelebration from "../confetti-celebration";
import socket from "@/lib/socketIo";
import { getLanguageFromFileName, terminalSample } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ContextMenu } from "./../ContextMenu";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useUser } from "@/hooks/use-user";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

let saveTimer: NodeJS.Timeout | null = null;
interface ProjectPlaygroundPageProps {
  slug: string;
  onNavigate: Function;
}

interface FileNode {
  name: string;
  type: "file" | "folder";
  icon: string;
  folder?: string;
  path: string;
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
  const user = useUser();
  const { theme } = useTheme();
  const [project, setProject] = useState<Project>();
  const [activeFile, setActiveFile] = useState("");
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(14);
  const [terminalOutput, setTerminalOutput] = useState(terminalSample);
  const [terminalInput, setTerminalInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState("http://localhost:3000");
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [activeTask, setActiveTask] = useState<any>();
  const [celebration, setCelebration] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [deleteFile, setDeleteFile] = useState<FileNode | null>();
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [code, setCode] = useState(fileTree?.[0]?.children?.[0]?.content || "");
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const editorRef = useRef<any>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    target: null as FileNode | null,
  });
  const [creatingItem, setCreatingItem] = useState<{
    parentPath?: string;
    exists?: boolean;
    type?: "file" | "folder";
  } | null>(null);
  const [renamingItem, setRenamingItem] = useState<{
    parentPath?: string;
    name?: string;
    exists?: boolean;
    type?: "file" | "folder";
  } | null>(null);

  const findFile = (nodes: FileNode[], filePath: string): FileNode | null => {
    for (const node of nodes) {
      if (node.path === filePath && node.type === "file") {
        return node;
      }
      if (node.children) {
        const found = findFile(node.children, filePath);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    setLoading(true);
    async function findProject(slug: string) {
      const project = await store.getProject(slug);
      setProject(project);
      setLoading(false);
    }
    findProject(slug);
  }, [slug]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (treeRef.current && !treeRef.current.contains(event.target as Node)) {
        setContextMenu((prev) => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    socket.emit("folder:read", {
      userId: user?.id,
      projectName: slug,
      path: "/",
    });

    socket.on("folder:response", (data) => {
      setLoadingFiles(true);
      const active = data.files[0].children.find(
        (f: FileNode) => f.type === "file"
      );
      setActiveFile(active.path);
      setCode(active.content);
      setOpenFiles([active.path]);
      setFileTree(data.files);
      setLoadingFiles(false);
    });
  }, []);

  useEffect(() => {
    const file = findFile(fileTree, activeFile);
    if (file) {
      setCurrentLanguage(file.language || getLanguageFromFileName(file.name));
    }
  }, [activeFile, fileTree]);

  if (loading) return <Loader isLoader={false} />;
  if (loadingFiles) return <Loader isLoader={false} />;
  if (!project?.enrolled)
    return (
      <div className="container max-w-4xl py-12">
        <Card>
          <CardHeader>
            <CardTitle>Not enrolled</CardTitle>
            <CardDescription>
              You need to enroll to access the playgroun
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => onNavigate(`/projects/${slug}`)}>
              View Project
            </Button>
          </CardFooter>
        </Card>
      </div>
    );

  const tasks = project?.projectTasks?.flatMap((p: any) => p.tasks);

  const toggleFolder = (targetPath: string) => {
    const updateTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        // If this is the target folder, toggle it

        if (node.name === targetPath && node.type === "folder") {
          return { ...node, isOpen: !node.isOpen };
        }

        // Otherwise, if it has children, recurse
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }

        return node;
      });
    };

    // Use functional updater to avoid stale closure issues
    setFileTree((prev) => updateTree(prev));
  };

  const handleRightClick = (event: React.MouseEvent, node: FileNode) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      target: node,
    });
  };

  const addItem = (name: string) => {
    if (!creatingItem?.parentPath || !creatingItem.type) return;

    const language = getLanguageFromFileName(name);

    let newItem: FileNode | any = {
      name,
      type: creatingItem.type,
      icon: creatingItem.type === "folder" ? "" : "📄",
      path: `${creatingItem.parentPath}/${name}`,
    };

    if (creatingItem.type.includes("file"))
      socket.emit("file:create", {
        userId: user?.id,
        name,
        // projectName: "my-project",
        path: `${creatingItem.parentPath}/${name}`,
      });
    else
      socket.emit("folder:create", {
        userId: user?.id,
        // projectName: "my-project",
        path: `${creatingItem.parentPath}/${name}`,
      });

    socket.on("file:created", (data) => {
      setLoadingFiles(true);

      newItem = {
        ...data,
        name,
        type: creatingItem.type,
        language,
      };

      setActiveFile(newItem.path);
      setOpenFiles([newItem.path]);
      setLoadingFiles(false);
    });

    socket.on("folder:created", (data) => {
      setLoadingFiles(true);

      newItem = {
        ...data,
      };
      setLoadingFiles(false);
    });

    const addToTree = (nodes: FileNode[]): FileNode[] =>
      nodes.map((node) => {
        if (node.path === creatingItem?.parentPath) {
          if (creatingItem.type === "folder") newItem.children = [];

          return {
            ...node,
            children: [...(node.children || []), newItem],
          };
        }
        if (node.children) {
          return { ...node, children: addToTree(node.children) };
        }
        return node;
      });

    setFileTree((prev) => addToTree(prev));
    if (creatingItem.type.includes("file")) openFile(newItem);
    setCreatingItem(null);
  };

  const handleMenuAction = (action: string) => {
    if (!contextMenu.target) return;

    const node = contextMenu.target;
    switch (action) {
      case "Open":
        openFile(node);
        break;
      case "New File":
        setCreatingItem({ parentPath: node.path, type: "file" });
        break;
      case "New Folder":
        setCreatingItem({ parentPath: node.path, type: "folder" });
        break;
      case "Delete":
        setDeleteFile(node);
        break;
      case "Rename":
        setRenamingItem({ parentPath: node.path, ...node });
        break;
    }
  };

  const openFile = (file: FileNode) => {
    const filePath = file.path;
    socket.emit("file:open", { userId: user?.id, path: filePath });
    socket.once("file:opened", ({ content }) => {
      const fileName = file.name;
      const _file = findFile(fileTree, filePath);
      if (_file) {
        setActiveFile(filePath);
        setCode(content);
        setCurrentLanguage(_file.language || getLanguageFromFileName(fileName));
        if (!openFiles.includes(filePath)) {
          setOpenFiles([...openFiles, filePath]);
        }
      }
    });
  };

  const getFileName = (fileName: string) => {
    if (!fileName) return;
    const names = fileName.split("/");
    return names[names.length - 1];
  };

  // Recursive search for a node by path
  const findNodeByPath = (
    nodes: FileNode[],
    path: string
  ): FileNode | undefined => {
    for (const n of nodes) {
      if (n.folder! === path) return n;

      if (n.children) {
        const found = findNodeByPath(n.children, path);
        if (found) return found;
      }
    }
    return undefined;
  };

  const isFileExist = (nodes: FileNode[], node: FileNode, fileName: string) => {
    {
      // Find the target folder in the tree

      const currentFolder = findNodeByPath(fileTree, node?.folder!);

      // Does a file/folder with this name already exist here?
      const exists = currentFolder?.children?.some(
        (child) => child?.name?.toLowerCase() === fileName?.toLowerCase()
      );

      return exists;
    }
  };

  const closeFile = (filePath: string) => {
    const newOpenFiles = openFiles.filter((f) => f !== filePath);

    setOpenFiles(newOpenFiles);
    if (activeFile === filePath && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[0]);
      const file = findFile(fileTree, newOpenFiles[0]);
      setCode(file?.content!);
      setCurrentLanguage(
        file?.language || getLanguageFromFileName(newOpenFiles[0])
      );
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
  const fileBuffer: Record<string, NodeJS.Timeout> = {};

  const handleTyping: OnChange = (value, v) => {
    clearTimeout(fileBuffer[activeFile]);

    fileBuffer[activeFile] = setTimeout(async () => {
      socket.emit("file:flush", {
        userId: user?.id,
        path: activeFile,
        content: value,
      });
    }, 300); // Wait 300ms after last change
    setCode(value ?? "");
  };

  const handleDeleteFile = (file: FileNode) => {
    if (!file) return;

    const event = file.type === "file" ? "file:delete" : "folder:delete";
    socket.emit(event, {
      userId: user?.id,
      path: file.path,
    });

    // Recursively remove deleted file/folder from the tree
    const removeNode = (nodes: FileNode[], targetPath: string): FileNode[] => {
      return nodes
        .filter((node) => node.path !== targetPath)
        .map((node) =>
          node.children
            ? { ...node, children: removeNode(node.children, targetPath) }
            : node
        );
    };

    socket.on("file:deleted", (data) => {
      if (!data.success) return;
      setFileTree((prevTree) => removeNode(prevTree, file.path));
      setDeleteFile(null);
    });

    socket.on("folder:deleted", (data) => {
      if (!data.success) return;
      setFileTree((prevTree) => removeNode(prevTree, file.path));
      setDeleteFile(null);
    });
  };

  const renderFileTree = (nodes: FileNode[], path: string[] = []) => {
    return nodes.map((node, i) => {
      return (
        <span
          key={node.path + i}
          onContextMenu={(e) => handleRightClick(e, node)}
          ref={treeRef}
        >
          <div className="select-none">
            <div
              className={`flex items-center gap-2 px-2  py-1 rounded text-sm cursor-pointer hover:bg-muted/50 ${
                activeFile === node.path ? "bg-muted" : ""
              }`}
              style={{ paddingLeft: `${(path.length + 1) * 12}px` }}
              onClick={() => {
                if (node.type === "folder") {
                  toggleFolder(node.name);
                } else {
                  openFile(node);
                }
              }}
            >
              {node.type === "folder" && (
                <span className="h-4 flex items-center">
                  {node.isOpen ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </span>
              )}
              {node.type === "file" && (
                <span className="text-md">{node.icon}</span>
              )}

              {renamingItem?.parentPath === contextMenu.target?.path &&
              node.path == contextMenu.target?.path ? (
                <div className="w-full flex items-center">
                  <Input
                    value={renamingItem?.name}
                    autoFocus
                    onChange={(e) => {
                      const name = e.target.value.trim();
                      const exists = isFileExist(nodes, node, name);
                      console.log(exists);
                      setRenamingItem((prev) => ({
                        ...prev,
                        name,
                        exists,
                      }));
                    }}
                    className={`z-5 h-8 mb-2 mt-1 w-full border-primary !ring-offset-0 !ring-0 ${
                      renamingItem?.exists ? "border-red-500" : ""
                    }`}
                    onBlur={() => setRenamingItem({})}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !renamingItem?.exists) {
                        addItem((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                </div>
              ) : (
                <span className="truncate text-md">{node.name}</span>
              )}
            </div>

            {creatingItem?.parentPath === contextMenu.target?.path &&
              node.path == contextMenu.target?.path && (
                <div className="w-full pl-6 flex items-center gap-2">
                  <span>{creatingItem?.type === "folder" ? "📁" : "📄"}</span>

                  <Input
                    autoFocus
                    onChange={(e) => {
                      const name = e.target.value.trim();
                      const exists = isFileExist(nodes, node, name);
                      setCreatingItem((prev) => ({
                        ...prev,
                        name,
                        exists,
                      }));
                    }}
                    className={`z-5 h-8 mb-2 mt-1 w-full border-primary !ring-offset-0 !ring-0 ${
                      creatingItem?.exists ? "border-red-500" : ""
                    }`}
                    onBlur={() => setCreatingItem({})}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !creatingItem?.exists) {
                        addItem((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                </div>
              )}

            {node.type === "folder" && node.isOpen && node.children && (
              <div>{renderFileTree(node.children, [...path, node.path])}</div>
            )}
          </div>
        </span>
      );
    });
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
              <ScrollArea className="flex-1 p-2 relative">
                <div>{renderFileTree(fileTree)}</div>
              </ScrollArea>

              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                visible={contextMenu.visible}
                target={contextMenu.target}
                onClose={() =>
                  setContextMenu((prev) => ({ ...prev, visible: false }))
                }
                onAction={handleMenuAction}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Center - Code Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <div className="h-full flex flex-col">
              {/* File Tabs */}
              <div className="flex items-center border-b bg-muted/20">
                {openFiles.map((filePath) => (
                  <div
                    key={filePath}
                    className={`flex items-center gap-2 px-3 py-2 text-sm border-r cursor-pointer hover:bg-muted/50 ${
                      activeFile === filePath ? "bg-background" : ""
                    }`}
                    onClick={() => {
                      const file = findFile(fileTree, filePath);
                      openFile(file!);
                    }}
                  >
                    <File className="h-3 w-3" />
                    <span>{getFileName(filePath)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeFile(filePath);
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
                  theme={theme?.includes("dark") ? "vs-dark" : "light"}
                  value={code}
                  onChange={handleTyping}
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
                      <Accordion type="single" collapsible>
                        {tasks?.map((task: any, i: number) => (
                          <AccordionItem
                            key={task.id + i}
                            value={`week-${i + 1}`}
                          >
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
                                    <div
                                      onClick={() => {
                                        setActiveTask(task);
                                        setMarkAsCompleted(true);
                                      }}
                                      title="Mark as completed"
                                      className="text-xs bg-primary px-1 rounded-md"
                                    >
                                      <Check className="h-4 w-4" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </AccordionTrigger>

                            <AccordionContent className="w-80 h-full ">
                              <div className="space-y-3 pt-4 w-full ">
                                <div
                                  className={`flex items-center space-x-4 rounded-lg border p-4 transition-colors w-full`}
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
                            key={line + index}
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

      <Dialog
        open={!!deleteFile?.name}
        onOpenChange={() => setDeleteFile(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete file</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Are you sure you want to delete '{deleteFile?.name}'?.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteFile(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteFile(deleteFile!)}
            >
              Delete
            </Button>
          </DialogFooter>
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
