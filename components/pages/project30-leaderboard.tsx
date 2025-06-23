"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Medal, Trophy, Award, ArrowLeft } from "lucide-react";

interface Project30LeaderboardPageProps {
  courseId?: string;
  onNavigate: (path: string) => void;
}

export function Project30LeaderboardPage({
  courseId = "backend-fundamentals",
  onNavigate,
}: Project30LeaderboardPageProps) {
  // Mock leaderboard data
  const topUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 30,
      streak: 30,
      xp: 9500,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 30,
      streak: 28,
      xp: 9200,
    },
    {
      id: 3,
      name: "Jessica Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 29,
      streak: 29,
      xp: 8900,
    },
  ];

  const leaderboardUsers = [
    {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 28,
      streak: 28,
      xp: 8700,
      rank: 4,
    },
    {
      id: 5,
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 28,
      streak: 25,
      xp: 8500,
      rank: 5,
    },
    {
      id: 6,
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 27,
      streak: 27,
      xp: 8300,
      rank: 6,
    },
    {
      id: 7,
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 27,
      streak: 24,
      xp: 8100,
      rank: 7,
    },
    {
      id: 8,
      name: "Daniel Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 26,
      streak: 26,
      xp: 7900,
      rank: 8,
    },
    {
      id: 9,
      name: "Sophia Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 26,
      streak: 23,
      xp: 7800,
      rank: 9,
    },
    {
      id: 10,
      name: "William Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      projects: 25,
      streak: 25,
      xp: 7600,
      rank: 10,
    },
  ];

  const currentUser = {
    id: 42,
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    projects: 15,
    streak: 15,
    xp: 7500,
    rank: 42,
  };

  const achievements = [
    {
      name: "30-Day Champion",
      description: "Complete all 30 projects",
      count: 24,
    },
    {
      name: "Perfect Streak",
      description: "Maintain a 30-day streak",
      count: 18,
    },
    { name: "Code Master", description: "Earn 10,000+ MB", count: 12 },
    {
      name: "Community Helper",
      description: "Help 50+ community members",
      count: 35,
    },
    {
      name: "Speed Coder",
      description: "Complete 5 projects in under 2 hours each",
      count: 42,
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project30 Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank against other participants
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => onNavigate(`/project30/${courseId}`)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Project30
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Top 3 Users */}
        <div className="col-span-full">
          <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 2nd Place */}
            <Card className="border-2 border-silver">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2">
                  <Medal className="h-8 w-8 text-gray-400" />
                </div>
                <CardTitle className="text-lg">2nd Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage
                    src={topUsers[1].avatar || "/placeholder.svg"}
                    alt={topUsers[1].name}
                  />
                  <AvatarFallback>
                    {topUsers[1].name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{topUsers[1].name}</h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div>Projects: {topUsers[1].projects}</div>
                  <div>Streak: {topUsers[1].streak} days</div>
                  <div>MB: {topUsers[1].xp}</div>
                </div>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className="border-2 border-amber-400 -mt-4">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2">
                  <Trophy className="h-10 w-10 text-amber-400" />
                </div>
                <CardTitle className="text-xl">1st Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <Avatar className="h-20 w-20 mx-auto mb-2">
                  <AvatarImage
                    src={topUsers[0].avatar || "/placeholder.svg"}
                    alt={topUsers[0].name}
                  />
                  <AvatarFallback>
                    {topUsers[0].name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-lg">{topUsers[0].name}</h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div>Projects: {topUsers[0].projects}</div>
                  <div>Streak: {topUsers[0].streak} days</div>
                  <div>MB: {topUsers[0].xp}</div>
                </div>
                <Badge className="mt-2 bg-amber-400 text-amber-950">
                  Champion
                </Badge>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className="border-2 border-amber-700">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2">
                  <Award className="h-8 w-8 text-amber-700" />
                </div>
                <CardTitle className="text-lg">3rd Place</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage
                    src={topUsers[2].avatar || "/placeholder.svg"}
                    alt={topUsers[2].name}
                  />
                  <AvatarFallback>
                    {topUsers[2].name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{topUsers[2].name}</h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div>Projects: {topUsers[2].projects}</div>
                  <div>Streak: {topUsers[2].streak} days</div>
                  <div>MB: {topUsers[2].xp}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overall">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overall">Overall Ranking</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Leaders</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overall">
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Rankings</CardTitle>
              <CardDescription>
                Based on projects completed, streaks, and MB earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Leaderboard Table */}
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b bg-muted">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">User</div>
                    <div className="col-span-2 text-center">Projects</div>
                    <div className="col-span-2 text-center">Streak</div>
                    <div className="col-span-2 text-center">MB</div>
                  </div>

                  {/* Leaderboard Entries */}
                  {leaderboardUsers.map((user) => (
                    <div
                      key={user.id}
                      className="grid grid-cols-12 gap-2 p-4 border-b"
                    >
                      <div className="col-span-1 font-medium">#{user.rank}</div>
                      <div className="col-span-5 flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                      <div className="col-span-2 text-center">
                        {user.projects}
                      </div>
                      <div className="col-span-2 text-center">
                        {user.streak} days
                      </div>
                      <div className="col-span-2 text-center">{user.xp}</div>
                    </div>
                  ))}

                  {/* Ellipsis to indicate gap */}
                  <div className="grid grid-cols-12 gap-2 p-4 border-b text-center">
                    <div className="col-span-12">...</div>
                  </div>

                  {/* Current User */}
                  <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50">
                    <div className="col-span-1 font-medium">
                      #{currentUser.rank}
                    </div>
                    <div className="col-span-5 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={currentUser.avatar || "/placeholder.svg"}
                          alt={currentUser.name}
                        />
                        <AvatarFallback>
                          {currentUser.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{currentUser.name}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      {currentUser.projects}
                    </div>
                    <div className="col-span-2 text-center">
                      {currentUser.streak} days
                    </div>
                    <div className="col-span-2 text-center">
                      {currentUser.xp}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Leaders</CardTitle>
              <CardDescription>Top performers for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <p className="text-muted-foreground">
                  Weekly leaderboard resets every Sunday at midnight
                </p>
                <p className="mt-2">Check back for this week's rankings!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Leaderboard</CardTitle>
              <CardDescription>
                Most prestigious achievements in the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Trophy className="h-8 w-8 text-amber-400" />
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{achievement.count}</div>
                      <div className="text-xs text-muted-foreground">users</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
