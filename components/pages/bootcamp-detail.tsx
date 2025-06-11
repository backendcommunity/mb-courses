"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Users,
  Star,
  Target,
  BookOpen,
  Code2,
  Trophy,
  Play,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

interface BootcampDetailPageProps {
  bootcampId: string;
  onNavigate?: (route: string) => void;
}

export function BootcampDetailPage({
  bootcampId,
  onNavigate,
}: BootcampDetailPageProps) {
  const store = useAppStore();
  const bootcamp = store.getBootcamps().find((b) => b.id === bootcampId);

  if (!bootcamp) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bootcamp not found</h1>
          <Button
            onClick={() => onNavigate?.("/dashboard/bootcamps")}
            className="mt-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bootcamps
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate?.("/dashboard/bootcamps")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {bootcamp.title}
          </h1>
          <p className="text-muted-foreground">{bootcamp.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card (if enrolled) */}
          {bootcamp.enrolled && (
            <Card className="bg-gradient-to-r from-[#0E1F33] to-[#13AECE] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Bootcamp Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Week 4 of 12</span>
                    <span>33%</span>
                  </div>
                  <Progress value={33} className="h-3" />
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-blue-100">
                        Modules Completed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-blue-100">
                        Projects Built
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-xs text-blue-100">
                        Hours Invested
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hero Card */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-r from-[#0E1F33] to-[#13AECE] flex items-center justify-center">
              <div className="text-center text-white">
                <Trophy className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold">
                  Intensive Backend Bootcamp
                </h2>
                <p className="text-blue-100 mt-2">
                  Transform your career in {bootcamp.duration}
                </p>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Code2 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Backend Development</h4>
                        <p className="text-sm text-muted-foreground">
                          Master Node.js, Express, and modern backend frameworks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Database Design</h4>
                        <p className="text-sm text-muted-foreground">
                          Learn SQL, NoSQL, and database optimization techniques
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">API Development</h4>
                        <p className="text-sm text-muted-foreground">
                          Build RESTful APIs and GraphQL endpoints
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Trophy className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">DevOps & Deployment</h4>
                        <p className="text-sm text-muted-foreground">
                          Deploy applications using Docker, AWS, and CI/CD
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>12-Week Curriculum</CardTitle>
                  <CardDescription>
                    Comprehensive backend development program
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      week: "Weeks 1-2",
                      title: "Foundations",
                      topics: [
                        "JavaScript ES6+",
                        "Node.js Basics",
                        "Git & GitHub",
                      ],
                      status: bootcamp.enrolled ? "completed" : "locked",
                    },
                    {
                      week: "Weeks 3-4",
                      title: "Backend Fundamentals",
                      topics: ["Express.js", "RESTful APIs", "Middleware"],
                      status: bootcamp.enrolled ? "current" : "locked",
                    },
                    {
                      week: "Weeks 5-6",
                      title: "Databases",
                      topics: [
                        "SQL & PostgreSQL",
                        "MongoDB",
                        "Database Design",
                      ],
                      status: "locked",
                    },
                    {
                      week: "Weeks 7-8",
                      title: "Advanced Topics",
                      topics: ["Authentication", "Testing", "Error Handling"],
                      status: "locked",
                    },
                    {
                      week: "Weeks 9-10",
                      title: "Real-world Projects",
                      topics: ["E-commerce API", "Social Media Backend"],
                      status: "locked",
                    },
                    {
                      week: "Weeks 11-12",
                      title: "Deployment & Career",
                      topics: ["AWS Deployment", "Portfolio", "Job Prep"],
                      status: "locked",
                    },
                  ].map((module, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${
                        module.status === "current"
                          ? "border-blue-200 bg-blue-50"
                          : module.status === "completed"
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">
                          {module.week}: {module.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              module.status === "completed"
                                ? "default"
                                : module.status === "current"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {module.status === "completed"
                              ? "Completed"
                              : module.status === "current"
                              ? "In Progress"
                              : "Locked"}
                          </Badge>
                          {bootcamp.enrolled && module.status !== "locked" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                onNavigate?.(
                                  `/dashboard/bootcamps/${bootcampId}/week/${
                                    index + 1
                                  }`
                                )
                              }
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge
                            key={topicIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Career Outcomes</CardTitle>
                  <CardDescription>What our graduates achieve</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        94%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Job placement rate
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        $85k
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average starting salary
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        6 weeks
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average time to job
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">
                        $35k
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average salary increase
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Chen",
                    role: "Backend Developer at Stripe",
                    rating: 5,
                    review:
                      "This bootcamp completely transformed my career. The curriculum is practical and the instructors are industry experts.",
                  },
                  {
                    name: "Mike Rodriguez",
                    role: "Software Engineer at Uber",
                    rating: 5,
                    review:
                      "Best investment I've made. Went from no coding experience to landing a job at a top tech company.",
                  },
                ].map((review, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{review.name}</h4>
                            <div className="flex">
                              {Array.from({ length: review.rating }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {review.role}
                          </p>
                          <p className="text-sm">{review.review}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    bootcamp.level === "Advanced" ? "destructive" : "default"
                  }
                >
                  {bootcamp.level}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{bootcamp.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  ${bootcamp.price.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Full program cost
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </span>
                  <span>
                    {new Date(bootcamp.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration
                  </span>
                  <span>{bootcamp.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Spots Left
                  </span>
                  <span className="text-orange-600 font-medium">
                    {bootcamp.spotsLeft}
                  </span>
                </div>
              </div>

              {bootcamp.enrolled ? (
                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className="w-full justify-center bg-green-50 text-green-700 border-green-200"
                  >
                    Enrolled - Week 4
                  </Badge>
                  <Button
                    className="w-full"
                    onClick={() =>
                      onNavigate?.(
                        `/dashboard/bootcamps/${bootcampId}/dashboard`
                      )
                    }
                  >
                    Access Bootcamp
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => store.enrollInBootcamp(bootcampId)}
                >
                  Apply Now
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
