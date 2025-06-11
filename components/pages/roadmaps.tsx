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
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Circle,
  Target,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import { getRoadmaps } from "@/lib/data";
import { routes } from "@/lib/routes";

interface RoadmapsPageProps {
  onNavigate?: (route: string) => void;
}

export function RoadmapsPage({ onNavigate }: RoadmapsPageProps) {
  const roadmaps = getRoadmaps();

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Roadmaps</h1>
          <p className="text-muted-foreground">
            Strategic career progression guides to help you reach your
            professional goals
          </p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Get Career Assessment
        </Button>
      </div>

      {/* Current Roadmap Progress */}
      {roadmaps.some((r) => r.enrolled && r.started) && (
        <Card className="bg-gradient-to-r from-[#0E1F33] to-[#13AECE] text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Career Roadmap:{" "}
              {roadmaps.find((r) => r.enrolled && r.started)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Overall Progress</span>
                <span>
                  {roadmaps.find((r) => r.enrolled && r.started)?.progress}%
                </span>
              </div>
              <Progress
                value={roadmaps.find((r) => r.enrolled && r.started)?.progress}
                className="h-3"
              />
              <div className="flex items-center justify-between text-sm text-blue-100">
                <span>
                  Milestone{" "}
                  {(roadmaps.find((r) => r.enrolled && r.started)
                    ?.currentMilestone || 0) + 1}{" "}
                  of{" "}
                  {
                    roadmaps.find((r) => r.enrolled && r.started)?.milestones
                      .length
                  }
                </span>
                <span>
                  {roadmaps.find((r) => r.enrolled && r.started)?.estimatedTime}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roadmap Details */}
      {roadmaps.map((roadmap) => (
        <Card
          key={roadmap.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate?.(routes.roadmapDetail(roadmap.id))}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{roadmap.title}</CardTitle>
                <CardDescription>{roadmap.description}</CardDescription>
              </div>
              <div className="text-right">
                <Badge variant="outline">{roadmap.timeframe}</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {roadmap.difficulty}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roadmap.milestones.map((milestone, index) => {
                const isCompleted = milestone.completed;
                const isCurrent = index === roadmap.currentMilestone;
                const isUpcoming = index > roadmap.currentMilestone;

                return (
                  <div key={milestone.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? "bg-green-600 border-green-600 text-white"
                            : isCurrent
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-gray-300 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      {index < roadmap.milestones.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${
                            isCompleted ? "bg-green-600" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-medium ${
                            isCompleted
                              ? "text-green-700"
                              : isCurrent
                              ? "text-blue-700"
                              : "text-gray-500"
                          }`}
                        >
                          {milestone.title}
                        </h3>
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
                      {isCurrent && (
                        <div className="space-y-2">
                          <Progress
                            value={milestone.progress}
                            className="h-2"
                          />
                          <p className="text-sm text-muted-foreground">
                            {milestone.progress}% complete - Continue building
                            projects to reach this milestone
                          </p>
                        </div>
                      )}
                      {isCompleted && (
                        <p className="text-sm text-green-600">
                          ✓ Milestone achieved! Great progress on your career
                          journey.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Career Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Backend Engineer Demand</span>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  High
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Salary Range</span>
                <span className="text-sm font-medium">$85k - $150k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Job Growth Rate</span>
                <span className="text-sm font-medium text-green-600">+22%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Skills in Demand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { skill: "Node.js", demand: 95 },
                { skill: "System Design", demand: 88 },
                { skill: "Cloud Platforms", demand: 82 },
                { skill: "Microservices", demand: 78 },
                { skill: "Database Design", demand: 85 },
              ].map((item) => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.skill}</span>
                    <span>{item.demand}%</span>
                  </div>
                  <Progress value={item.demand} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Complete Current Project</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Finish your e-commerce API project to advance to the next
                milestone
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate?.(routes.roadmapWatch("1"));
                }}
              >
                Continue Roadmap
              </Button>
            </div>
            <div className="space-y-2 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Schedule Mock Interview</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Practice your interview skills to prepare for senior-level
                positions
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Schedule Now
              </Button>
            </div>
            <div className="space-y-2 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-green-600" />
                <span className="font-medium">Join Study Group</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect with peers working toward similar career goals
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Find Groups
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
