"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Users,
  Video,
  Star,
  Trophy,
  BookOpen,
  Plus,
  Building2,
  Briefcase,
  FileText,
  Sparkles,
  Timer,
  Layout,
  Play,
  CalendarClock,
} from "lucide-react";
import {
  getMockInterviewTypes,
  getBookedInterviews,
  type MockInterviewType,
} from "@/lib/mock-interview-data";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

interface MockInterviewsPageProps {
  onNavigate: (path: string) => void;
}

interface CustomInterviewFormData {
  company: string;
  position: string;
  level: string;
  description?: string;
  jobDescription: string;
  style: string;
  difficulty: string;
  duration: string;
  format: string;
}

export function MockInterviewsPage({ onNavigate }: MockInterviewsPageProps) {
  const store = useAppStore();
  const [selectedType, setSelectedType] = useState<MockInterviewType | null>(
    null
  );
  const [templates, setTemplates] = useState<Array<any>>();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("book");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [formData, setFormData] = useState<CustomInterviewFormData>({
    company: "",
    position: "",
    level: "",
    jobDescription: "",
    style: "",
    difficulty: "",
    duration: "",
    format: "",
  });

  // const interviewTypes = getMockInterviewTypes();
  const bookedInterviews = getBookedInterviews();

  const upcomingInterviews = bookedInterviews.filter(
    (interview) => interview.status === "upcoming"
  );
  const completedInterviews = bookedInterviews.filter(
    (interview) => interview.status === "completed"
  );

  useEffect(() => {
    const load = async () => {
      const data = await store.getMockInterviewTemplates();
      setTemplates(data.interviews);
    };

    load();
  }, []);

  const handleBookInterview = (type: MockInterviewType) => {
    setSelectedType(type);
    setIsBookingDialogOpen(true);
  };

  const handleStartNow = async (id: string) => {
    if (!id) return;

    try {
      setCreating(true);
      const interviewStarted = await store.startMockInterview(id, {});
      if (!interviewStarted) {
        toast.error("Something went wrong. Please try again");
        return;
      }
      //  Redirect
      setCreating(false);
      setIsBookingDialogOpen(false);

      onNavigate(`/mock-interviews/${id}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  const handleScheduleInterview = async (id: string) => {
    try {
      if (!scheduledDate && !scheduledTime) return;

      setCreating(true);
      const isoDate = new Date(
        `${scheduledDate}T${scheduledTime}:00`
      ).toISOString();

      await store.startMockInterview(id, {
        scheduledTime: isoDate,
      });

      setIsBookingDialogOpen(false);
      setScheduledDate("");
      setScheduledTime("");
      setSelectedType(null);
      setActiveTab("upcoming");
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    } finally {
      setCreating(false);
    }
  };

  const handleStartInterview = (interviewId: string) => {
    try {
    } catch (error) {}

    onNavigate(`/mock-interviews/${interviewId}`);
  };

  const handleViewResults = (interviewId: string) => {
    onNavigate(`/mock-interviews/${interviewId}/results`);
  };

  const handleFormChange = (
    field: keyof CustomInterviewFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateInterview = async () => {
    try {
      setCreating(true);
      const newInterview = await store.createCustomMockInterview(formData);
      setSelectedType(newInterview);
      setIsCreateDialogOpen(false);
      setIsBookingDialogOpen(true);
      setFormData({
        company: "",
        position: "",
        level: "",
        jobDescription: "",
        style: "",
        difficulty: "",
        duration: "",
        format: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mock Interviews</h1>
          <p className="text-muted-foreground">
            Practice with AI-powered interviews to ace your next job interview
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Mock Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[75vw] max-w-[80vw] h-[90vh] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Custom Mock Interview</DialogTitle>
                <DialogDescription>
                  Customize your mock interview experience by providing details
                  about the role you're preparing for.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                {/* Company */}
                <div className="grid gap-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Company
                  </Label>
                  <Input
                    id="company"
                    placeholder="e.g., Google, Amazon, Stripe"
                    value={formData.company}
                    onChange={(e) =>
                      handleFormChange("company", e.target.value)
                    }
                  />
                </div>

                {/* Position */}
                <div className="grid gap-2">
                  <Label htmlFor="position" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Position
                  </Label>
                  <Input
                    id="position"
                    placeholder="e.g., Senior Backend Engineer, Full Stack Developer"
                    value={formData.position}
                    onChange={(e) =>
                      handleFormChange("position", e.target.value)
                    }
                  />
                </div>

                {/* Seniority Level */}
                <div className="grid gap-2">
                  <Label htmlFor="level" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Seniority Level
                  </Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleFormChange("level", value)}
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select seniority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="intern">Intern</SelectItem>
                      <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid-Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                      <SelectItem value="staff">
                        Staff / Principal (8+ years)
                      </SelectItem>
                      <SelectItem value="lead">Tech Lead / Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interview Style */}
                <div className="grid gap-2">
                  <Label htmlFor="style" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                    Interview Style
                  </Label>
                  <Select
                    value={formData.style}
                    onValueChange={(value) => handleFormChange("style", value)}
                  >
                    <SelectTrigger id="style">
                      <SelectValue placeholder="Select interview style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">
                        Technical Deep Dive
                      </SelectItem>
                      <SelectItem value="behavioral">
                        Behavioral / STAR Method
                      </SelectItem>
                      <SelectItem value="system-design">
                        System Design
                      </SelectItem>
                      <SelectItem value="coding">Live Coding</SelectItem>
                      <SelectItem value="mixed">
                        Mixed (Technical + Behavioral)
                      </SelectItem>
                      <SelectItem value="case-study">Case Study</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Level */}
                <div className="grid gap-2">
                  <Label
                    htmlFor="difficulty"
                    className="flex items-center gap-2"
                  >
                    <Star className="h-4 w-4 text-muted-foreground" />
                    Difficulty Level
                  </Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) =>
                      handleFormChange("difficulty", value)
                    }
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">
                        Easy - Fundamentals & Basics
                      </SelectItem>
                      <SelectItem value="medium">
                        Medium - Standard Industry Level
                      </SelectItem>
                      <SelectItem value="hard">
                        Hard - FAANG / Top-tier Companies
                      </SelectItem>
                      <SelectItem value="expert">
                        Expert - Staff+ Level
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interview Duration */}
                <div className="grid gap-2">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    Interview Duration
                  </Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) =>
                      handleFormChange("duration", value)
                    }
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">
                        15 minutes - Quick Practice
                      </SelectItem>
                      <SelectItem value="30">
                        30 minutes - Short Session
                      </SelectItem>
                      <SelectItem value="45">
                        45 minutes - Standard Interview
                      </SelectItem>
                      <SelectItem value="60">
                        60 minutes - Full Interview
                      </SelectItem>
                      <SelectItem value="90">
                        90 minutes - Extended Session
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interview Format */}
                <div className="grid gap-2">
                  <Label htmlFor="format" className="flex items-center gap-2">
                    <Layout className="h-4 w-4 text-muted-foreground" />
                    Interview Format
                  </Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value) => handleFormChange("format", value)}
                  >
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        Video Call (Camera On)
                      </SelectItem>
                      <SelectItem value="audio">Audio Only</SelectItem>
                      <SelectItem value="text">Text-Based Chat</SelectItem>
                      <SelectItem value="screen-share">
                        Screen Share + Audio
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Description - spans full width */}
                <div className="grid gap-2 md:col-span-2">
                  <Label
                    htmlFor="jobDescription"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Job Description
                  </Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description or key requirements here..."
                    rows={8}
                    value={formData.jobDescription}
                    onChange={(e) =>
                      handleFormChange("jobDescription", e.target.value)
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateInterview}>
                  {creating ? (
                    <i>Creating...</i>
                  ) : (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      Start Interview
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Powered by Kap AI</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Interviews
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookedInterviews.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingInterviews.length} upcoming
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedInterviews.length > 0
                ? Math.round(
                    completedInterviews.reduce(
                      (acc, interview) => acc + (interview.score || 0),
                      0
                    ) / completedInterviews.length
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {completedInterviews.length} completed interviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Practice Hours
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                completedInterviews.reduce(
                  (acc, interview) => acc + Number.parseInt(interview.duration),
                  0
                ) / 60
              )}
              h
            </div>
            <p className="text-xs text-muted-foreground">Total practice time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        onValueChange={setActiveTab}
        value={activeTab}
        defaultValue="book"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="book">Book Interview</TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingInterviews.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedInterviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates?.map((interview) => (
              <Card
                key={interview?.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <CardTitle className="text-lg">
                          {interview?.name ?? interview.position}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">
                            {interview?.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {interview?.duration} min
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{interview?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {interview?.topics?.length && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Topics Covered:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {interview.topics.map((topic: any) => (
                            <Badge
                              key={topic}
                              variant="secondary"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      onClick={() => handleBookInterview(interview)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingInterviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Upcoming Interviews
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  Book your first mock interview to start practicing
                </p>
                <Button
                  onClick={() =>
                    document.querySelector('[value="book"]')?.click()
                  }
                >
                  Book Interview
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* <span className="text-2xl">{interview.type.icon}</span> */}
                        <div>
                          <CardTitle className="text-lg">
                            {interview.type.name}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(
                                interview.scheduledDate
                              ).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(
                                interview.scheduledDate
                              ).toLocaleTimeString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {interview.duration} min
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleStartInterview(interview.id)}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Start Interview
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedInterviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Completed Interviews
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  Complete your first interview to see results here
                </p>
                <Button
                  onClick={() =>
                    document.querySelector('[value="book"]')?.click()
                  }
                >
                  Book Interview
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* <span className="text-2xl">{interview.type.icon}</span> */}
                        <div>
                          <CardTitle className="text-lg">
                            {interview.type.name}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(
                                interview.scheduledDate
                              ).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {interview.duration} min
                            </div>
                            {interview.score && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {interview.score}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {interview.score && (
                          <Badge
                            variant={
                              interview.score >= 80
                                ? "default"
                                : interview.score >= 60
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {interview.feedback?.grade || "N/A"}
                          </Badge>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => handleViewResults(interview.id)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Results
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {/* {selectedType && (
                <span className="text-2xl">{selectedType.icon}</span>
              )} */}
              Book {selectedType?.name ?? selectedType?.position} Interview
            </DialogTitle>
            <DialogDescription>
              Choose to start your interview immediately or schedule it for a
              later time.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Start Now Option */}
            <Card
              className="cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              onClick={() => handleStartNow(selectedType?.id!)}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Start Now</h3>
                  <p className="text-sm text-muted-foreground">
                    Begin your mock interview immediately with our AI
                    interviewer
                  </p>
                </div>
                <Button>
                  {creating ? (
                    <i>Start...</i>
                  ) : (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* Schedule Option */}
            <Card className="border-dashed">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                    <CalendarClock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Schedule for Later</h3>
                    <p className="text-sm text-muted-foreground">
                      Pick a date and time that works best for you
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-date">Date</Label>
                    <Input
                      id="schedule-date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-time">Time</Label>
                    <Input
                      id="schedule-time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  disabled={!scheduledDate || !scheduledTime}
                  onClick={() => handleScheduleInterview(selectedType?.id!)}
                >
                  {creating ? (
                    <i>Scheduling...</i>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Interview Details */}
          {selectedType && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <h4 className="text-sm font-medium">Interview Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {selectedType.duration} min</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>Difficulty: {selectedType.difficulty}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedType?.topics?.slice(0, 4).map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {selectedType?.topics?.length! > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{selectedType?.topics?.length! - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
