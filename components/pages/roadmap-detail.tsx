"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  Code,
  FileText,
  GraduationCap,
  Layers,
  type LucideIcon,
  PlayCircle,
  Target,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  ChevronRight,
  Calendar,
  CheckCheck,
  BarChart3,
} from "lucide-react";
import { enrollInRoadmap } from "@/lib/data";
import { routes } from "@/lib/routes";
import { useAppStore } from "@/lib/store";
import DisqusCommentBlock from "../ui/comment";
import { PaymentDialog } from "../payment-dialog";
import { useUser } from "@/hooks/use-user";

interface RoadmapDetailPageProps {
  slug: string;
  onNavigate?: (route: string) => void;
}

export function RoadmapDetailPage({
  slug,
  onNavigate,
}: RoadmapDetailPageProps) {
  const store = useAppStore();
  const user = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [roadmap, setRoadmap] = useState({});
  const [loading, setLoading] = useState(false);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const roadmap = await store.getRoadmapBySlug(slug);
      const milestones = await store.getRoadmapMilestones(slug);

      setRoadmap(roadmap);
      setMilestones(milestones);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading && !roadmap) {
    return <div className="p-6">Roadmap not found</div>;
  }

  const handleEnroll = async () => {
    if (!user.isPremium && !user?.subscription) {
      setShowPaymentDialog(!showPaymentDialog);
      return;
    }

    const data = await enrollInRoadmap(slug);
    // Force re-render
    setRoadmap(data);
    setActiveTab(activeTab);
  };

  const handleContinue = () => {
    // const currentTopic = roadmap?.userRoadmap?.currentTopic;

    // if (currentTopic?.courses?.length > 0) {
    //   onNavigate?.(
    //     routes.roadmapVideoWatch(roadmap?.slug, currentTopic?.courses[0]?.id)
    //   );
    // } else if (currentTopic?.projects?.length > 0) {
    //   onNavigate?.(routes.projectDetail(currentTopic?.projects[0]));
    // } else {
    onNavigate?.(routes.roadmapWatch(slug));
    // }
    // }
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{roadmap.title}</h1>
          <p className="text-muted-foreground">{roadmap.summary}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {!roadmap.enrolled ? (
            <Button onClick={handleEnroll}>Enroll in Roadmap</Button>
          ) : (
            <Button onClick={handleContinue}>Continue Roadmap</Button>
          )}
          <Button variant="outline">Download Syllabus</Button>
        </div>
      </div>

      {/* Progress Overview */}
      {roadmap.enrolled && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Overall Progress
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={roadmap.progress} className="h-2 flex-1" />
                  <span className="text-sm font-medium">
                    {roadmap.progress}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Current Milestone
                </div>
                <div className="font-medium">
                  {roadmap?.currentTopic < milestones?.length
                    ? roadmap?.currentTopic?.title
                    : "Completed"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Estimated Time Remaining
                </div>
                <div className="font-medium">{roadmap.estimatedTime}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Milestones Completed
                </div>
                <div className="font-medium">
                  {roadmap?.topics?.map((t) => t.completed)?.length ?? 0} of{" "}
                  {milestones?.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <p>{roadmap.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Details</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>Level:</strong> {roadmap.level}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>Duration:</strong> {roadmap.timeframe}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>Difficulty:</strong> {roadmap.difficulty}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>Instructor:</strong> {roadmap.instructor}
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                  <ul className="space-y-1">
                    {roadmap?.prerequisites?.map(
                      (prerequisite: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{prerequisite}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  What You'll Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">
                      Design and implement scalable backend systems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">
                      Master advanced database optimization techniques
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">
                      Build and deploy microservices architectures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">
                      Implement secure authentication and authorization
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">
                      Develop technical leadership and mentoring skills
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Skills You'll Gain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {roadmap?.skills?.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  Career Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-1" />
                    <span className="text-sm">Senior Backend Engineer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-1" />
                    <span className="text-sm">Technical Lead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-1" />
                    <span className="text-sm">System Architect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-1" />
                    <span className="text-sm">Engineering Manager</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-6">
          {milestones?.map((milestone: any, index) => {
            const isCompleted = milestone?.completed;
            const isCurrent = index === roadmap?.userRoadmap?.currentTopic;
            const isUpcoming = index > roadmap?.userRoadmap?.currentTopic;

            return (
              <Card
                key={milestone.id}
                className={isUpcoming ? "opacity-70" : ""}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          isCompleted
                            ? "bg-green-600 text-white"
                            : isCurrent
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCheck className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {milestone.title}
                        </CardTitle>
                        <CardDescription>
                          {milestone.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        isCompleted
                          ? "default"
                          : isCurrent
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        isCompleted
                          ? "bg-green-100 text-green-800 border-green-200"
                          : isCurrent
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : ""
                      }
                    >
                      {isCompleted
                        ? "Completed"
                        : isCurrent
                        ? "In Progress"
                        : "Upcoming"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isCurrent && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Progress
                        </span>
                        <span className="text-sm font-medium">
                          {milestone.progress}%
                        </span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        Courses
                      </h4>
                      <div className="space-y-1">
                        {milestone?.courses?.map((course: any) => (
                          <div
                            key={course.id}
                            className="text-sm flex items-center justify-between cursor-pointer hover:bg-gray-500 p-1 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate?.(routes.courseDetail(course.slug));
                            }}
                          >
                            <span>{course.title}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                        {milestone?.courses?.length === 0 && (
                          <div className="text-sm text-muted-foreground">
                            No courses in this milestone
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Code className="h-4 w-4 text-green-600" />
                        Projects
                      </h4>
                      <div className="space-y-1">
                        {milestone?.projects?.map((project: any) => (
                          <div
                            key={project.id}
                            className="text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate?.(routes.projectDetail(project.id));
                            }}
                          >
                            <span>{project.title}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                        {!milestone?.projects?.length && (
                          <div className="text-sm text-muted-foreground">
                            No projects in this milestone
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        Assessments
                      </h4>
                      <div className="space-y-1">
                        {milestone?.assessments?.map((assessment: any) => (
                          <div
                            key={assessment.id}
                            className="text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 rounded"
                          >
                            <span>{assessment.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {assessment.type}
                            </Badge>
                          </div>
                        ))}
                        {!milestone?.assessments?.length && (
                          <div className="text-sm text-muted-foreground">
                            No assessments in this milestone
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Estimated duration: {milestone.duration}</span>
                    </div>
                    {isCurrent && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const courses = milestone?.courses;
                          if (courses?.length > 0) {
                            onNavigate?.(routes.courseDetail(courses[0].id));
                          } else {
                            const projects = milestone?.projects;
                            if (projects?.length > 0) {
                              onNavigate?.(
                                routes.projectDetail(projects[0].id)
                              );
                            }
                          }
                        }}
                      >
                        Continue Milestone
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete Curriculum</CardTitle>
              <CardDescription>
                Detailed breakdown of all courses, projects, and assessments in
                this roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones?.map((milestone: any, index) => (
                <div key={milestone.id} className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${
                        milestone.completed ? "bg-green-600" : "bg-blue-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {milestone.title}
                  </h3>

                  <div className="space-y-4 pl-8">
                    {/* Courses */}
                    {milestone?.courses?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          Courses
                        </h4>
                        <div className="space-y-2">
                          {milestone?.courses?.map((course: any) => (
                            <Card key={course.id} className="overflow-hidden">
                              <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/4 h-40 md:h-auto bg-muted">
                                  <img
                                    src={course?.banner || "/placeholder.svg"}
                                    alt={course?.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 p-4">
                                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                      <h5 className="font-medium">
                                        {course?.title}
                                      </h5>
                                      <p className="text-sm text-muted-foreground">
                                        {course?.summary}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">
                                        {course.type}
                                      </Badge>
                                      <Badge variant="outline">
                                        {course?.totalDuration ?? 0}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <PlayCircle className="h-4 w-4 text-blue-600" />
                                      <span className="text-sm">
                                        {course.chapters?.length} chapters
                                      </span>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate?.(
                                          routes.courseDetail(course?.id)
                                        );
                                      }}
                                    >
                                      View Course
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {milestone?.projects?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Code className="h-4 w-4 text-green-600" />
                          Projects
                        </h4>
                        <div className="space-y-2">
                          {milestone?.projects?.map((project: any) => (
                            <Card key={project.id} className="overflow-hidden">
                              <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/4 h-40 md:h-auto bg-muted">
                                  <img
                                    src={
                                      project.thumbnail || "/placeholder.svg"
                                    }
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 p-4">
                                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                      <h5 className="font-medium">
                                        {project.title}
                                      </h5>
                                      <p className="text-sm text-muted-foreground">
                                        {project.description}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">
                                        {project.difficulty}
                                      </Badge>
                                      <Badge variant="outline">
                                        {project.estimatedTime}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                      {project.technologies
                                        .slice(0, 3)
                                        .map((tech: string, i: number) => (
                                          <Badge key={i} variant="secondary">
                                            {tech}
                                          </Badge>
                                        ))}
                                      {project.technologies?.length > 3 && (
                                        <Badge variant="secondary">
                                          +{project.technologies?.length - 3}{" "}
                                          more
                                        </Badge>
                                      )}
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate?.(
                                          routes.projectDetail(project.id)
                                        );
                                      }}
                                    >
                                      View Project
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Assessments */}
                    {milestone?.assessments?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />
                          Assessments
                        </h4>
                        <div className="space-y-2">
                          {milestone?.assessments?.map((assessment: any) => (
                            <Card key={assessment.id}>
                              <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                  <div>
                                    <h5 className="font-medium">
                                      {assessment.title}
                                    </h5>
                                    <p className="text-sm text-muted-foreground">
                                      {assessment.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className="capitalize"
                                    >
                                      {assessment.type}
                                    </Badge>
                                    <Badge variant="outline">
                                      {assessment.duration}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills You'll Master</CardTitle>
              <CardDescription>
                Comprehensive breakdown of technical and soft skills covered in
                this roadmap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Technical Skills
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          category: "Backend Development",
                          skills: [
                            "Node.js",
                            "Express",
                            "NestJS",
                            "API Design",
                            "Authentication",
                          ],
                          icon: Code as LucideIcon,
                          color: "text-blue-600",
                        },
                        {
                          category: "Databases",
                          skills: [
                            "SQL",
                            "NoSQL",
                            "Database Design",
                            "Query Optimization",
                            "Data Modeling",
                          ],
                          icon: Layers as LucideIcon,
                          color: "text-green-600",
                        },
                        {
                          category: "Architecture",
                          skills: [
                            "Microservices",
                            "System Design",
                            "Scalability",
                            "Performance",
                            "Security",
                          ],
                          icon: Target as LucideIcon,
                          color: "text-purple-600",
                        },
                      ].map((group) => (
                        <div key={group.category} className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <group.icon className={`h-4 w-4 ${group.color}`} />
                            {group.category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Soft Skills & Career
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          category: "Leadership",
                          skills: [
                            "Technical Leadership",
                            "Mentoring",
                            "Code Reviews",
                            "Decision Making",
                          ],
                          icon: Users as LucideIcon,
                          color: "text-orange-600",
                        },
                        {
                          category: "Communication",
                          skills: [
                            "Technical Writing",
                            "Documentation",
                            "Presentations",
                            "Stakeholder Management",
                          ],
                          icon: FileText as LucideIcon,
                          color: "text-red-600",
                        },
                        {
                          category: "Career Development",
                          skills: [
                            "Interview Preparation",
                            "Resume Building",
                            "Networking",
                            "Negotiation",
                          ],
                          icon: GraduationCap as LucideIcon,
                          color: "text-indigo-600",
                        },
                      ].map((group) => (
                        <div key={group.category} className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <group.icon className={`h-4 w-4 ${group.color}`} />
                            {group.category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Progression</CardTitle>
              <CardDescription>
                How your skills will develop throughout the roadmap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones?.map((milestone: any, index) => (
                  <div key={milestone.id} className="space-y-2">
                    <h3 className="text-md font-medium flex items-center gap-2">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${
                          milestone.completed ? "bg-green-600" : "bg-blue-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {milestone.title}
                    </h3>
                    <div className="pl-8">
                      <div className="flex flex-wrap gap-2">
                        {index === 0 && (
                          <>
                            <Badge variant="secondary">
                              Node.js Fundamentals
                            </Badge>
                            <Badge variant="secondary">Express</Badge>
                            <Badge variant="secondary">RESTful APIs</Badge>
                            <Badge variant="secondary">MongoDB</Badge>
                            <Badge variant="secondary">Authentication</Badge>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <Badge variant="secondary">Microservices</Badge>
                            <Badge variant="secondary">Docker</Badge>
                            <Badge variant="secondary">API Gateway</Badge>
                            <Badge variant="secondary">Message Queues</Badge>
                            <Badge variant="secondary">Service Discovery</Badge>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <Badge variant="secondary">System Design</Badge>
                            <Badge variant="secondary">Scalability</Badge>
                            <Badge variant="secondary">Load Balancing</Badge>
                            <Badge variant="secondary">
                              Caching Strategies
                            </Badge>
                            <Badge variant="secondary">Database Sharding</Badge>
                          </>
                        )}
                        {index === 3 && (
                          <>
                            <Badge variant="secondary">GraphQL</Badge>
                            <Badge variant="secondary">Kubernetes</Badge>
                            <Badge variant="secondary">Cloud Platforms</Badge>
                            <Badge variant="secondary">Serverless</Badge>
                            <Badge variant="secondary">
                              Performance Optimization
                            </Badge>
                          </>
                        )}
                        {index === 4 && (
                          <>
                            <Badge variant="secondary">
                              Technical Leadership
                            </Badge>
                            <Badge variant="secondary">Mentoring</Badge>
                            <Badge variant="secondary">
                              Architecture Design
                            </Badge>
                            <Badge variant="secondary">Team Management</Badge>
                            <Badge variant="secondary">
                              Technical Decision Making
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
              <CardDescription>
                See what others are saying about this roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <DisqusCommentBlock
                config={{
                  url: "/roadmaps/" + slug,
                  identifier: slug,
                  title: roadmap?.title,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showPaymentDialog && (
        <PaymentDialog
          onClose={() => setShowPaymentDialog(false)}
          open={showPaymentDialog}
          data={roadmap}
          onHandlePreview={() => {}}
          onHandlePurchase={() => {}}
        />
      )}
    </div>
  );
}
