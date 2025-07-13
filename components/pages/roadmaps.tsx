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
import { routes } from "@/lib/routes";
import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { getRoadmaps, Roadmap } from "@/lib/data";

interface RoadmapsPageProps {
  onNavigate?: (route: string) => void;
}

export function RoadmapsPage({ onNavigate }: RoadmapsPageProps) {
  const store = useAppStore();
  const road = getRoadmaps();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadRoadmaps = async () => {
      const roadmaps = await store.getRoadmaps({
        size: 10,
        skip: 0,
      });
      setRoadmaps(roadmaps);

      const current = roadmaps.find((r: Roadmap) => r.enrolled);
      setCurrentRoadmap(current);
    };
    loadRoadmaps();
    setLoading(false);
  }, []);

  if (loading && !roadmaps.length) return <div>loading...</div>;

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
        {/* <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Get Career Assessment
        </Button> */}
      </div>

      {/* Current Roadmap Progress */}
      {roadmaps.some((r: any) => r.enrolled) && (
        <Card className="bg-gradient-to-r from-[#0E1F33] to-[#13AECE] text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Career Roadmap:{" "}
              {roadmaps.find((r: any) => r.enrolled)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Overall Progress</span>
                <span>{roadmaps.find((r: any) => r.enrolled)?.progress}%</span>
              </div>
              <Progress
                value={roadmaps.find((r: any) => r.enrolled)?.progress}
                className="h-3"
              />
              <div className="flex items-center justify-between text-sm text-blue-100">
                <span>
                  Milestone{" "}
                  {
                    roadmaps
                      ?.find((t: any) => t.enrolled)
                      ?.topics?.filter((t) => t.userTopic?.completed)?.length
                  }{" "}
                  of {roadmaps.find((r: any) => r.enrolled)?.topics?.length}{" "}
                  completed
                </span>
                <span>
                  {roadmaps.find((r: any) => r.enrolled)?.estimatedTime}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roadmap Details */}
      {roadmaps.map((roadmap: any) => (
        <Card
          key={roadmap.id}
          className="cursor-pointer hover:shadow-lg border hover:border-gray-200 transition-shadow"
          onClick={() => onNavigate?.(routes.roadmapDetail(roadmap.slug))}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{roadmap.title}</CardTitle>
                <CardDescription>{roadmap.summary}</CardDescription>
              </div>
              <div className="text-right">
                <Badge variant="outline">
                  {roadmap?.timeframe ?? "4-6 months"}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {roadmap?.level}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roadmap?.topics?.slice(0, 3).map((topic: any, index: number) => {
                const isCompleted = topic?.userTopic?.completed;
                const isCurrent =
                  topic?.id === roadmap?.userRoadmap?.currentTopic?.id;

                const inProgress = !!topic?.userTopic;

                return (
                  <div key={topic.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? "bg-green-600 border-green-600 text-white"
                            : isCurrent || inProgress
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
                      {index < 4 && (
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
                              : isCurrent || inProgress
                              ? "text-blue-700"
                              : "text-gray-500"
                          }`}
                        >
                          {topic.title}
                        </h3>
                        <Badge
                          variant={
                            isCompleted
                              ? "default"
                              : isCurrent || inProgress
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            isCompleted
                              ? "bg-green-100 text-green-800 border-green-200"
                              : isCurrent || inProgress
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : ""
                          }
                        >
                          {isCompleted
                            ? "Completed"
                            : isCurrent || inProgress
                            ? "In Progress"
                            : "Upcoming"}
                        </Badge>
                      </div>

                      {isCurrent ||
                        (inProgress &&
                          (topic?.userTopic?.completed ? (
                            <div className="space-y-2">
                              <Progress
                                value={
                                  topic?.userTopic?.progress > 0
                                    ? topic?.userTopic?.progres
                                    : 100
                                }
                                className="h-2"
                              />
                              <p className="text-sm text-muted-foreground">
                                {topic?.userTopic?.progress > 0
                                  ? topic?.userTopic?.progres
                                  : 100}
                                % complete - Continue with {topic.title}
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Progress
                                value={topic?.userTopic?.progress}
                                className="h-2"
                              />
                              <p className="text-sm text-muted-foreground">
                                {topic?.userTopic?.progress}% complete -
                                Continue with {topic.title}
                              </p>
                            </div>
                          )))}
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

              {/* If more than 4 topics, show ellipsis and then last one */}
              {roadmap?.topics?.length > 5 && (
                <>
                  <div className="flex items-start text-gray-400 gap-4 text-sm">
                    <div className="flex flex-col items-center">
                      <div
                        className={
                          "flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400"
                        }
                      >
                        <span className="text-sm font-medium">---</span>
                      </div>

                      <div className={"w-0.5 h-12 mt-2 bg-gray-300"}> </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={"font-medium text-gray-500 "}>
                          More here
                        </h3>
                        <Badge variant={"outline"}>Upcoming</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Show the last topic */}
                  {(() => {
                    const topic = roadmap.topics[roadmap.topics.length - 1];
                    const index = roadmap.topics.length - 1;
                    const isCompleted = topic?.completed;
                    const isCurrent =
                      topic?.id === roadmap?.userRoadmap?.currentTopic?.id;

                    return (
                      <div key={topic.id} className="flex items-start gap-4">
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
                              {topic.title}
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
                                value={topic.progress}
                                className="h-2"
                              />
                              <p className="text-sm text-muted-foreground">
                                {topic.progress}% complete - Continue with{" "}
                                {topic.title}
                              </p>
                            </div>
                          )}
                          {isCompleted && (
                            <p className="text-sm text-green-600">
                              ✓ Milestone achieved! Great progress on your
                              career journey.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Career Insights */}
      {/* <div className="grid gap-6 md:grid-cols-2">
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
      </div> */}

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
                <span className="font-medium">Start a new Project</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Practice your coding skills by building a real world backend
                project.
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={(e) => {
                  onNavigate?.(routes.projects);
                }}
              >
                Start Building
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
              <Button
                onClick={() => onNavigate?.(routes.mockInterviews)}
                size="sm"
                variant="outline"
                className="w-full"
              >
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
