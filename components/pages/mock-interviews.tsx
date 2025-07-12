"use client";

import { useState } from "react";
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
import {
  Calendar,
  Clock,
  Users,
  Video,
  Star,
  Trophy,
  BookOpen,
} from "lucide-react";
import {
  getMockInterviewTypes,
  getBookedInterviews,
  type MockInterviewType,
} from "@/lib/mock-interview-data";

interface MockInterviewsPageProps {
  onNavigate: (path: string) => void;
}

export function MockInterviewsPage({ onNavigate }: MockInterviewsPageProps) {
  const [selectedType, setSelectedType] = useState<MockInterviewType | null>(
    null
  );
  const interviewTypes = getMockInterviewTypes();
  const bookedInterviews = getBookedInterviews();

  const upcomingInterviews = bookedInterviews.filter(
    (interview) => interview.status === "upcoming"
  );
  const completedInterviews = bookedInterviews.filter(
    (interview) => interview.status === "completed"
  );

  const handleBookInterview = (type: MockInterviewType) => {
    setSelectedType(type);
    // In a real app, this would open a booking modal or navigate to booking page
    console.log("Booking interview for:", type.title);
  };

  const handleStartInterview = (interviewId: string) => {
    onNavigate(`/mock-interviews/${interviewId}`);
  };

  const handleViewResults = (interviewId: string) => {
    onNavigate(`/mock-interviews/${interviewId}/results`);
  };

  return (
    <div className="container mx-auto p- space-y-6 relative">
      <div className="absolute inset-0 bg-black/1 backdrop-blur-sm z-10 flex items-center justify-center p-6">
        <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-2">🚧 Work in Progress</h2>
          <p className="text-sm text-gray-700">
            This page is currently under construction. Please check back later.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mock Interviews</h1>
          <p className="text-muted-foreground">
            Practice with AI-powered interviews to ace your next job interview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Powered by Kap AI</span>
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

      <Tabs defaultValue="book" className="space-y-4">
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
            {interviewTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{type.difficulty}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {type.duration} min
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Topics Covered:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {type.topics.map((topic) => (
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
                    <Button
                      className="w-full"
                      onClick={() => handleBookInterview(type)}
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
                        <span className="text-2xl">{interview.type.icon}</span>
                        <div>
                          <CardTitle className="text-lg">
                            {interview.type.title}
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
                        <span className="text-2xl">{interview.type.icon}</span>
                        <div>
                          <CardTitle className="text-lg">
                            {interview.type.title}
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
    </div>
  );
}
