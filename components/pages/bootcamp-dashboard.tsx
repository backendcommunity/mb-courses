"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Users,
  Target,
  Trophy,
  Calendar,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useMemo, useState } from "react";
import { Bootcamp, Lesson, UserCohort, Week } from "@/lib/data";
import { Loader } from "../ui/loader";
import Countdown from "../ui/count-down";

interface BootcampDashboardPageProps {
  bootcampId: string;
  onNavigate?: (route: string) => void;
}

export function BootcampDashboardPage({
  bootcampId,
  onNavigate,
}: BootcampDashboardPageProps) {
  const store = useAppStore();
  const [loading, setLoading] = useState(false);
  const [bootcamp, setBootcamp] = useState<Bootcamp | any>();
  const [currentWeek, setCurrentWeek] = useState<Week & { index: number }>();
  const [currentLesson, setCurrentLesson] = useState<Lesson>();
  const [userCohort, setUserCohort] = useState<UserCohort>();

  useMemo(() => {
    const load = async () => {
      try {
        setLoading(true);
        const bootcamp = await store.getBootcamp(bootcampId);

        const currentWeekId = bootcamp?.userCohort?.currentWeekId;
        const week = bootcamp?.cohort?.weeks?.find(
          (week: any) => week.id === currentWeekId
        );

        const index =
          bootcamp?.cohort?.weeks?.findIndex(
            (week: any) => week.id === currentWeekId
          ) + 1;

        setCurrentWeek({ ...week, index });

        const currentLessonId = bootcamp?.userCohort?.currentLessonId;
        const lesson = bootcamp?.cohort?.weeks
          ?.find((week: any) => week.id === currentWeekId)
          ?.lessons?.find((l: any) => l.id === currentLessonId);

        setCurrentLesson(lesson);
        setUserCohort(bootcamp?.userCohort);
        setBootcamp({
          ...bootcamp,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <Loader isLoader={false} />;

  if (!bootcamp) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bootcamp not found</h1>
          <Button onClick={() => onNavigate?.("/bootcamps")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bootcamps
          </Button>
        </div>
      </div>
    );
  }

  if (!(new Date(bootcamp?.cohort!?.startsAt) < new Date()))
    return (
      <Card>
        <CardHeader></CardHeader>
        <CardContent className="text-center space-y-5">
          <Countdown
            startDate={bootcamp?.cohort!?.startsAt.toString()}
          ></Countdown>

          <Button
            onClick={() => onNavigate?.("/bootcamps/" + bootcamp?.id)}
            variant={"secondary"}
          >
            Back to Bootcamp
          </Button>
        </CardContent>
      </Card>
    );

  const handleContinue = (lesson: any) => {
    if (lesson.type?.toLowerCase() === "quiz") return onNavigate?.("");
    if (lesson.type?.toLowerCase() === "project")
      return onNavigate?.(`/projects/${lesson?.project?.slug}`);
    return onNavigate?.(
      `/bootcamps/${bootcampId}/${userCohort?.cohortId}/weeks/${lesson.weekId}/${lesson?.id}`
    );
  };

  const isWeekCompleted = (week: Week) => {
    if (!userCohort?.userLessons?.length) return 0;
    const userLessons = userCohort.userLessons;

    const completed = userLessons.filter(
      (ul) => ul.completed && ul.weekId === week?.id
    );
    return week?.lessons?.length === completed?.length;
  };

  const isLessonCompleted = (lesson: Lesson) => {
    if (!userCohort?.userLessons?.length) return false;
    const userLessons = userCohort.userLessons;

    const completed = userLessons.find(
      (ul) => ul.lessonId === lesson.id && ul.completed
    );

    return !!completed;
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate?.(`/bootcamps/${bootcampId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {bootcamp.title} Dashboard
            </h1>
            <p className="text-muted-foreground">
              Week {currentWeek?.index} of {bootcamp?.cohort?.duration} •{" "}
              {bootcamp?.userCohort?.progress ?? 0}% Complete
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={"secondary"}>{userCohort?.cohort?.name}</Badge>
            <Badge
              variant={
                userCohort?.cohort?.status === "OPEN"
                  ? "default"
                  : "destructive"
              }
            >
              {new Date(userCohort?.cohort!?.startsAt) < new Date()
                ? "In Progress"
                : userCohort?.cohort?.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-[#0E1F33] to-[#13AECE] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Your Bootcamp Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Overall Progress</span>
              <span>{bootcamp?.userCohort?.progress ?? 0}%</span>
            </div>
            <Progress
              value={bootcamp?.userCohort?.progress ?? 0}
              className="h-3"
            />
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentWeek?.index}</div>
                <div className="text-xs text-blue-100">Current Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {bootcamp?.userCohort?.totalLessonsCompleted ?? 0}
                </div>
                <div className="text-xs text-blue-100">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {userCohort?.projectBuilt}
                </div>
                <div className="text-xs text-blue-100">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {userCohort?.totalAssigments}
                </div>
                <div className="text-xs text-blue-100">
                  Assigments Completed
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Week */}
          <Card>
            <CardHeader>
              <CardTitle>Current Week: {currentWeek?.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!currentWeek ? (
                <div>Nothing to do this week. Relax!</div>
              ) : (
                <div className="space-y-3">
                  {currentWeek?.lessons?.map((lesson: any, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        lesson.id === currentLesson?.id
                          ? "border-green-900/20 dark:border-green-200/20 bg-green-400/10"
                          : ""
                      }`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {isLessonCompleted(lesson) ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{lesson.title}</h4>
                        <Badge variant="outline" className="text-xs capitalize">
                          {lesson.type}
                        </Badge>
                      </div>
                      {lesson.id === currentLesson?.id ? (
                        <Button
                          onClick={() => handleContinue(lesson)}
                          size="sm"
                        >
                          Continue
                        </Button>
                      ) : isLessonCompleted(lesson) ? (
                        <Button
                          onClick={() => handleContinue(lesson)}
                          variant={"outline"}
                          size="sm"
                        >
                          Review
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleContinue(lesson)}
                          size="sm"
                        >
                          {lesson.type === "VIDEO"
                            ? "Watch"
                            : lesson.type === "QUIZ"
                            ? "Solve"
                            : lesson.type === "PROJECT"
                            ? "Build"
                            : "Complete"}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "Live Q&A Session",
                  date: "Tomorrow, 2:00 PM EST",
                  type: "Live Session",
                },
                {
                  title: "Project Review",
                  date: "Friday, 10:00 AM EST",
                  type: "Review",
                },
                {
                  title: "Career Workshop",
                  date: "Next Monday, 1:00 PM EST",
                  type: "Workshop",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Attendance Rate</span>
                  <span className="font-medium">
                    {bootcamp?.userCohort?.attendanceRate ?? 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Assignment Score</span>
                  <span className="font-medium">
                    {bootcamp?.userCohort?.assigmentScore ?? 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Peer Ranking</span>
                  <span className="font-medium">
                    #{bootcamp?.userCohort?.peerRanking ?? 0} of{" "}
                    {bootcamp?.students ?? bootcamp?.cohort?.maxStudents}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weeks Until Graduation</span>
                  <span className="font-medium">
                    {bootcamp.cohort.duration - currentWeek?.index!} weeks
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bootcamp Weeks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:grid grid-cols-3">
              {bootcamp?.cohort?.weeks?.map((week: any, i: number) => (
                <div
                  key={i}
                  className={`flex items-center  gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted ${
                    week?.id?.toString() === currentWeek?.id
                      ? "border border-blue-200"
                      : ""
                  }`}
                  onClick={() =>
                    onNavigate?.(
                      `/bootcamps/${bootcampId}/${userCohort?.cohortId}/weeks/${week.id}`
                    )
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                    {isWeekCompleted(week) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Week {i + 1}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cohort */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Cohort
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">
                  {bootcamp?.students ?? 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Students
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">
                  {bootcamp?.userCohort?.activeStudents ?? 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Still Active
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Join Study Group
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { title: "Week 3 Completed", icon: "🎯" },
                { title: "Perfect Attendance", icon: "📅" },
                { title: "Top Performer", icon: "⭐" },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-50/20 rounded-lg"
                >
                  <span className="text-lg">{achievement.icon}</span>
                  <span className="text-sm font-medium">
                    {achievement.title}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
