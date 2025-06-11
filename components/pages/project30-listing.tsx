"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlayCircle,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  BookOpen,
  Code2,
  Database,
  Globe,
  Smartphone,
  Brain,
  ChevronRight,
  Calendar,
  Trophy,
} from "lucide-react";

interface Project30ListingPageProps {
  onNavigate: (path: string) => void;
}

export function Project30ListingPage({
  onNavigate,
}: Project30ListingPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Mock Project30 courses data
  const project30Courses = [
    {
      id: "backend-fundamentals",
      title: "Backend Development Fundamentals",
      description:
        "Master the essentials of backend development with Node.js, Express, and databases",
      instructor: "Sarah Johnson",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      duration: "30 days",
      totalVideos: 30,
      totalDuration: "16 hours",
      level: "Beginner",
      category: "Backend",
      rating: 4.8,
      students: 12450,
      price: 99,
      thumbnail: "/placeholder.svg?height=200&width=350",
      technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
      isEnrolled: true,
      progress: 50,
      lastAccessed: "2 days ago",
      highlights: [
        "Build 30 real-world projects",
        "Learn from industry experts",
        "Get hands-on coding experience",
        "Certificate upon completion",
      ],
    },
    {
      id: "fullstack-javascript",
      title: "Full-Stack JavaScript Mastery",
      description:
        "Complete full-stack development course covering frontend, backend, and deployment",
      instructor: "Mike Chen",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      duration: "30 days",
      totalVideos: 30,
      totalDuration: "20 hours",
      level: "Intermediate",
      category: "Full-Stack",
      rating: 4.9,
      students: 8920,
      price: 149,
      thumbnail: "/placeholder.svg?height=200&width=350",
      technologies: ["React", "Node.js", "Express", "MongoDB", "AWS"],
      isEnrolled: false,
      progress: 0,
      lastAccessed: null,
      highlights: [
        "MERN stack development",
        "Cloud deployment strategies",
        "Real-time applications",
        "Production-ready projects",
      ],
    },
    {
      id: "api-development",
      title: "API Development & Microservices",
      description:
        "Learn to build scalable APIs and microservices architecture",
      instructor: "Alex Rodriguez",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      duration: "30 days",
      totalVideos: 30,
      totalDuration: "18 hours",
      level: "Advanced",
      category: "Backend",
      rating: 4.7,
      students: 5670,
      price: 199,
      thumbnail: "/placeholder.svg?height=200&width=350",
      technologies: ["Node.js", "Docker", "Kubernetes", "Redis", "GraphQL"],
      isEnrolled: false,
      progress: 0,
      lastAccessed: null,
      highlights: [
        "Microservices architecture",
        "API security best practices",
        "Performance optimization",
        "Container orchestration",
      ],
    },
    {
      id: "mobile-backend",
      title: "Mobile Backend Development",
      description:
        "Build robust backends for mobile applications with real-time features",
      instructor: "Emma Wilson",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      duration: "30 days",
      totalVideos: 30,
      totalDuration: "15 hours",
      level: "Intermediate",
      category: "Mobile",
      rating: 4.6,
      students: 3240,
      price: 129,
      thumbnail: "/placeholder.svg?height=200&width=350",
      technologies: ["Node.js", "Socket.io", "Firebase", "Push Notifications"],
      isEnrolled: false,
      progress: 0,
      lastAccessed: null,
      highlights: [
        "Real-time mobile features",
        "Push notification systems",
        "Offline data sync",
        "Mobile-first API design",
      ],
    },
    {
      id: "devops-fundamentals",
      title: "DevOps & Cloud Infrastructure",
      description:
        "Learn deployment, monitoring, and scaling of backend applications",
      instructor: "David Kim",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      duration: "30 days",
      totalVideos: 30,
      totalDuration: "22 hours",
      level: "Advanced",
      category: "DevOps",
      rating: 4.8,
      students: 4580,
      price: 179,
      thumbnail: "/placeholder.svg?height=200&width=350",
      technologies: ["AWS", "Docker", "Terraform", "Jenkins", "Monitoring"],
      isEnrolled: false,
      progress: 0,
      lastAccessed: null,
      highlights: [
        "Infrastructure as Code",
        "CI/CD pipelines",
        "Monitoring & logging",
        "Auto-scaling strategies",
      ],
    },
    {
      id: "ai-backend",
      title: "AI-Powered Backend Development",
      description:
        "Integrate AI and machine learning into your backend applications",
      instructor: "Dr. Lisa Park",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      duration: "30 days",
      totalVideos: 30,
      totalDuration: "25 hours",
      level: "Advanced",
      category: "AI/ML",
      rating: 4.9,
      students: 2150,
      price: 249,
      thumbnail: "/placeholder.svg?height=200&width=350",
      technologies: ["Python", "TensorFlow", "OpenAI API", "Vector Databases"],
      isEnrolled: false,
      progress: 0,
      lastAccessed: null,
      highlights: [
        "AI API integration",
        "Machine learning models",
        "Vector search systems",
        "Intelligent automation",
      ],
    },
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: BookOpen },
    { value: "Backend", label: "Backend", icon: Database },
    { value: "Full-Stack", label: "Full-Stack", icon: Globe },
    { value: "Mobile", label: "Mobile", icon: Smartphone },
    { value: "DevOps", label: "DevOps", icon: Code2 },
    { value: "AI/ML", label: "AI/ML", icon: Brain },
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  // Filter courses based on search and filters
  const filteredCourses = project30Courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const enrolledCourses = project30Courses.filter(
    (course) => course.isEnrolled
  );

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((cat) => cat.value === category);
    return categoryData ? categoryData.icon : BookOpen;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Advanced":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Project30 Courses
          </h1>
          <p className="text-muted-foreground">
            Choose from our collection of 30-day project-based courses to master
            backend development
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, instructors, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                <div className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  {category.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full md:w-32">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all-courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-courses">
            All Courses ({filteredCourses.length})
          </TabsTrigger>
          <TabsTrigger value="my-courses">
            My Courses ({enrolledCourses.length})
          </TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New Releases</TabsTrigger>
        </TabsList>

        <TabsContent value="all-courses" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const CategoryIcon = getCategoryIcon(course.category);

              return (
                <Card
                  key={course.id}
                  className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-lg flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className="bg-black/70 text-white border-none"
                      >
                        ${course.price}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {course.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.totalDuration}
                      </div>
                      <div className="flex items-center gap-1">
                        <PlayCircle className="h-4 w-4" />
                        {course.totalVideos} videos
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructorAvatar || "/placeholder.svg"}
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">
                        {course.instructor}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {course.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {course.isEnrolled ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#F2C94C] h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() =>
                            onNavigate(`/dashboard/project30/${course.id}`)
                          }
                        >
                          Continue Learning
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() =>
                          onNavigate(`/dashboard/project30/${course.id}`)
                        }
                      >
                        View Course
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="my-courses" className="space-y-4">
          {enrolledCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => {
                const CategoryIcon = getCategoryIcon(course.category);

                return (
                  <Card
                    key={course.id}
                    className="group hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Enrolled
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {course.category}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {course.title}
                      </CardTitle>
                      <CardDescription>
                        Last accessed: {course.lastAccessed}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#F2C94C] h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() =>
                          onNavigate(`/dashboard/project30/${course.id}`)
                        }
                      >
                        Continue Learning
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No enrolled courses
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start your learning journey by enrolling in a Project30 course
                </p>
                <Button onClick={() => setSelectedCategory("all")}>
                  Browse All Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project30Courses
              .sort((a, b) => b.students - a.students)
              .slice(0, 6)
              .map((course) => {
                const CategoryIcon = getCategoryIcon(course.category);

                return (
                  <Card
                    key={course.id}
                    className="group hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                          <Trophy className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {course.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.students.toLocaleString()} students
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.totalDuration}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() =>
                          onNavigate(`/dashboard/project30/${course.id}`)
                        }
                      >
                        View Course
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project30Courses
              .slice(-3)
              .reverse()
              .map((course) => {
                const CategoryIcon = getCategoryIcon(course.category);

                return (
                  <Card
                    key={course.id}
                    className="group hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          New
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {course.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Just released
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.totalDuration}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() =>
                          onNavigate(`/dashboard/project30/${course.id}`)
                        }
                      >
                        View Course
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
