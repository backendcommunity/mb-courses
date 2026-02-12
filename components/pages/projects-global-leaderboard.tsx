"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  User,
  ExternalLink,
  ArrowLeft,
  Crown,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/lib/store";
import { Loader } from "../ui/loader";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GlobalLeaderboardPageProps {
  onNavigate?: (path: string) => void;
}

export function GlobalLeaderboardPage({
  onNavigate,
}: GlobalLeaderboardPageProps) {
  const store = useAppStore();
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Fetch leaderboard data
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        const response = await store.getProjectsLeaderboard({
          timeframe,
          page: currentPage,
          pageSize,
        });

        // Parse the response structure
        const topUsersData = response?.topUsers || [];
        const leaderboardUsersData = response?.leaderboardUsers || [];
        const currentUserData = response?.currentUser || null;

        setTopUsers(topUsersData);
        // Combine top users and leaderboard users for full list
        setAllUsers([...topUsersData, ...leaderboardUsersData]);
        setCurrentUser(currentUserData);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        toast.error("Failed to load leaderboard");
        setTopUsers([]);
        setAllUsers([]);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [timeframe, currentPage]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-500";
    if (rank === 2) return "bg-gray-50 dark:bg-gray-800/50 border-gray-400";
    if (rank === 3) return "bg-amber-50 dark:bg-amber-900/10 border-amber-600";
    return "";
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => onNavigate?.("/projects")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Global Project Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Top developers ranked by total project points across all MB Projects
          </p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 2nd Place */}
        {topUsers[1] && (
          <Card className="border-2 border-gray-400 bg-gray-50 dark:bg-gray-900/20">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Medal className="h-10 w-10 text-gray-400" />
              </div>
              <Badge variant="outline" className="mx-auto border-gray-400 text-gray-600">
                2nd Place
              </Badge>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <Avatar className="h-16 w-16 mx-auto">
                <AvatarImage
                  src={topUsers[1]?.avatar || "/placeholder.svg"}
                  alt={topUsers[1]?.name}
                />
                <AvatarFallback>
                  {topUsers[1]?.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{topUsers[1]?.name}</h3>
              <p className="text-sm text-muted-foreground">{topUsers[1]?.location}</p>
              <div className="pt-2 space-y-1">
                <div className="flex items-center justify-center gap-2 text-xl font-bold text-yellow-600">
                  <Trophy className="h-5 w-5" />
                  {topUsers[1]?.totalPoints?.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {topUsers[1]?.completedProjects} projects • {topUsers[1]?.averageScore}% avg
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 1st Place */}
        {topUsers[0] && (
          <Card className="border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 md:-mt-4">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-2 h-20 w-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Crown className="h-12 w-12 text-yellow-500" />
              </div>
              <Badge className="mx-auto bg-yellow-500 text-yellow-950 hover:bg-yellow-600">
                Champion
              </Badge>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage
                  src={topUsers[0]?.avatar || "/placeholder.svg"}
                  alt={topUsers[0]?.name}
                />
                <AvatarFallback>
                  {topUsers[0]?.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl">{topUsers[0]?.name}</h3>
              <p className="text-sm text-muted-foreground">{topUsers[0]?.location}</p>
              <div className="pt-2 space-y-1">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-600">
                  <Trophy className="h-6 w-6" />
                  {topUsers[0]?.totalPoints?.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {topUsers[0]?.completedProjects} projects • {topUsers[0]?.averageScore}% avg
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 3rd Place */}
        {topUsers[2] && (
          <Card className="border-2 border-amber-600 bg-amber-50 dark:bg-amber-900/10">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Award className="h-10 w-10 text-amber-600" />
              </div>
              <Badge variant="outline" className="mx-auto border-amber-600 text-amber-700">
                3rd Place
              </Badge>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <Avatar className="h-16 w-16 mx-auto">
                <AvatarImage
                  src={topUsers[2]?.avatar || "/placeholder.svg"}
                  alt={topUsers[2]?.name}
                />
                <AvatarFallback>
                  {topUsers[2]?.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{topUsers[2]?.name}</h3>
              <p className="text-sm text-muted-foreground">{topUsers[2]?.location}</p>
              <div className="pt-2 space-y-1">
                <div className="flex items-center justify-center gap-2 text-xl font-bold text-yellow-600">
                  <Trophy className="h-5 w-5" />
                  {topUsers[2]?.totalPoints?.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {topUsers[2]?.completedProjects} projects • {topUsers[2]?.averageScore}% avg
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>All Rankings</CardTitle>
          <CardDescription>
            Rankings updated daily based on project completions and scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8">
              <Loader isLoader={true} isFull={false} />
            </div>
          ) : (
            <div className="space-y-3">
              {allUsers.map((entry: any, index: number) => {
                const rank = entry.rank || index + 1;
                return (
                  <Card
                    key={entry.userId}
                    className={`overflow-hidden transition-all hover:shadow-md border ${rank <= 3 ? getRankBadgeColor(rank) + " border-2" : ""
                      }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex items-center justify-center w-12">
                          {getRankIcon(rank)}
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={entry.avatar || "/placeholder.svg"}
                              alt={entry.name}
                            />
                            <AvatarFallback>
                              {entry.name?.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{entry.name || "Anonymous"}</h3>
                              {rank <= 3 && (
                                <Badge variant="outline" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Top {rank}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{entry.completedProjects || 0} projects completed</span>
                              {entry.location && (
                                <span>• {entry.location}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1 text-lg font-bold">
                            <Trophy className="h-5 w-5 text-yellow-600" />
                            {entry.totalPoints?.toLocaleString() || 0}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3" />
                            {entry.averageScore || 0}% avg score
                          </div>
                        </div>

                        {/* View Portfolio */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onNavigate?.(`/portfolio/${entry.userId}`)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Technologies */}
                      {entry.topTechnologies && entry.topTechnologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3 ml-16">
                          {entry.topTechnologies.slice(0, 5).map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}

              {allUsers.length === 0 && !loading && (
                <Card>
                  <CardContent className="text-center py-8 text-muted-foreground">
                    No leaderboard data available yet
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
