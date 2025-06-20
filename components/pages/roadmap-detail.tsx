"use client";

import type React from "react";

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
import {
  getRoadmapById,
  getRoadmapMilestones,
  getRoadmapCoursesByMilestone,
  getRoadmapProjectsByMilestone,
  getRoadmapAssessmentsByMilestone,
  enrollInRoadmap,
} from "@/lib/data";
import { routes } from "@/lib/routes";

interface RoadmapDetailPageProps {
  roadmapId: string;
  onNavigate?: (route: string) => void;
}

export function RoadmapDetailPage({
  roadmapId,
  onNavigate,
}: RoadmapDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const roadmap = getRoadmapById(roadmapId);
  const milestones = getRoadmapMilestones(roadmapId);

  if (!roadmap) {
    return <div className="p-6">Roadmap not found</div>;
  }

  const handleEnroll = () => {
    enrollInRoadmap(roadmapId);
    // Force re-render
    setActiveTab(activeTab);
  };

  const handleContinue = () => {
    if (roadmap.currentMilestone < milestones?.length) {
      const currentMilestone = milestones[roadmap.currentMilestone];
      if (currentMilestone.courses?.length > 0) {
        onNavigate?.(
          routes.roadmapVideoWatch(roadmap.id, currentMilestone.courses[0]?.id)
        );
      } else if (currentMilestone.projects?.length > 0) {
        onNavigate?.(routes.projectDetail(currentMilestone.projects[0]));
      } else {
        onNavigate?.(routes.roadmapWatch(roadmapId));
      }
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{roadmap.title}</h1>
          <p className="text-muted-foreground">{roadmap.description}</p>
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
                  {roadmap.currentMilestone < milestones?.length
                    ? milestones[roadmap.currentMilestone].title
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
                  {roadmap.completedMilestones} of {milestones?.length}
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
                <p>{roadmap.longDescription}</p>
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
                    {roadmap.prerequisites?.map((prerequisite, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{prerequisite}</span>
                      </li>
                    ))}
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
                  {roadmap.skills?.map((skill, index) => (
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
          {milestones.map((milestone, index) => {
            const isCompleted = milestone.completed;
            const isCurrent = index === roadmap.currentMilestone;
            const isUpcoming = index > roadmap.currentMilestone;

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
                        {getRoadmapCoursesByMilestone(milestone.id).map(
                          (course) => (
                            <div
                              key={course.id}
                              className="text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate?.(routes.courseDetail(course.id));
                              }}
                            >
                              <span>{course.title}</span>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )
                        )}
                        {getRoadmapCoursesByMilestone(milestone.id)?.length ===
                          0 && (
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
                        {getRoadmapProjectsByMilestone(milestone.id).map(
                          (project) => (
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
                          )
                        )}
                        {getRoadmapProjectsByMilestone(milestone.id).length ===
                          0 && (
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
                        {getRoadmapAssessmentsByMilestone(milestone.id).map(
                          (assessment) => (
                            <div
                              key={assessment.id}
                              className="text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 rounded"
                            >
                              <span>{assessment.title}</span>
                              <Badge variant="outline" className="text-xs">
                                {assessment.type}
                              </Badge>
                            </div>
                          )
                        )}
                        {getRoadmapAssessmentsByMilestone(milestone.id)
                          ?.length === 0 && (
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
                          const courses = getRoadmapCoursesByMilestone(
                            milestone.id
                          );
                          if (courses?.length > 0) {
                            onNavigate?.(routes.courseDetail(courses[0].id));
                          } else {
                            const projects = getRoadmapProjectsByMilestone(
                              milestone.id
                            );
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
              {milestones.map((milestone, index) => (
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
                    {getRoadmapCoursesByMilestone(milestone.id)?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          Courses
                        </h4>
                        <div className="space-y-2">
                          {getRoadmapCoursesByMilestone(milestone.id).map(
                            (course) => (
                              <Card key={course.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                  <div className="w-full md:w-1/4 h-40 md:h-auto bg-muted">
                                    <img
                                      src={
                                        course.thumbnail || "/placeholder.svg"
                                      }
                                      alt={course.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 p-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                      <div>
                                        <h5 className="font-medium">
                                          {course.title}
                                        </h5>
                                        <p className="text-sm text-muted-foreground">
                                          {course.description}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                          {course.level}
                                        </Badge>
                                        <Badge variant="outline">
                                          {course.duration}
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
                                            routes.courseDetail(course.id)
                                          );
                                        }}
                                      >
                                        View Course
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {getRoadmapProjectsByMilestone(milestone.id)?.length >
                      0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Code className="h-4 w-4 text-green-600" />
                          Projects
                        </h4>
                        <div className="space-y-2">
                          {getRoadmapProjectsByMilestone(milestone.id).map(
                            (project) => (
                              <Card
                                key={project.id}
                                className="overflow-hidden"
                              >
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
                                          .map((tech, i) => (
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
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Assessments */}
                    {getRoadmapAssessmentsByMilestone(milestone.id)?.length >
                      0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />
                          Assessments
                        </h4>
                        <div className="space-y-2">
                          {getRoadmapAssessmentsByMilestone(milestone.id).map(
                            (assessment) => (
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
                            )
                          )}
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
                {milestones.map((milestone, index) => (
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
              {[
                {
                  name: "Alex Johnson",
                  avatar: "/placeholder.svg?height=40&width=40",
                  rating: 5,
                  date: "May 15, 2024",
                  comment:
                    "This roadmap completely transformed my career. I went from a junior developer to a senior backend engineer in just 14 months by following this structured path. The projects were challenging but incredibly rewarding.",
                },
                {
                  name: "Sarah Miller",
                  avatar: "/placeholder.svg?height=40&width=40",
                  rating: 4,
                  date: "April 22, 2024",
                  comment:
                    "Great roadmap with excellent content. The microservices section was particularly helpful for my current role. I would have liked more content on cloud-native development, but overall it was very comprehensive.",
                },
                {
                  name: "Michael Chen",
                  avatar: "/placeholder.svg?height=40&width=40",
                  rating: 5,
                  date: "March 10, 2024",
                  comment:
                    "The system design milestone prepared me perfectly for technical interviews. I was able to confidently discuss complex architectural decisions and trade-offs, which helped me land my dream job at a top tech company.",
                },
              ].map((review, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Star(props: React.ComponentProps<typeof LucideIcon>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
