"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Trophy, TrendingUp, Heart, Share2, BookOpen, Code, Zap } from "lucide-react"

interface CommunityPageProps {
  onNavigate: (path: string) => void
}

export function CommunityPage({ onNavigate }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState("discussions")

  const discussions = [
    {
      id: 1,
      title: "Best practices for Node.js authentication",
      author: "Sarah Chen",
      avatar: "/placeholder-user.jpg",
      replies: 23,
      likes: 45,
      category: "Backend",
      timeAgo: "2 hours ago",
      isHot: true,
    },
    {
      id: 2,
      title: "How to optimize React performance?",
      author: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      replies: 18,
      likes: 32,
      category: "Frontend",
      timeAgo: "4 hours ago",
      isHot: false,
    },
    {
      id: 3,
      title: "Database design patterns for scalable apps",
      author: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg",
      replies: 31,
      likes: 67,
      category: "Database",
      timeAgo: "6 hours ago",
      isHot: true,
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Emma Wilson", points: 2450, avatar: "/placeholder-user.jpg", badge: "Expert" },
    { rank: 2, name: "David Kim", points: 2180, avatar: "/placeholder-user.jpg", badge: "Pro" },
    { rank: 3, name: "Lisa Zhang", points: 1920, avatar: "/placeholder-user.jpg", badge: "Advanced" },
    { rank: 4, name: "John Doe", points: 1750, avatar: "/placeholder-user.jpg", badge: "Intermediate" },
    { rank: 5, name: "Maria Garcia", points: 1680, avatar: "/placeholder-user.jpg", badge: "Intermediate" },
  ]

  const events = [
    {
      id: 1,
      title: "Weekly Code Review Session",
      date: "Dec 15, 2024",
      time: "2:00 PM EST",
      participants: 45,
      type: "Live Session",
    },
    {
      id: 2,
      title: "Backend Architecture Workshop",
      date: "Dec 18, 2024",
      time: "6:00 PM EST",
      participants: 32,
      type: "Workshop",
    },
    {
      id: 3,
      title: "Monthly Coding Challenge",
      date: "Dec 20, 2024",
      time: "All Day",
      participants: 128,
      type: "Challenge",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">Connect, learn, and grow with fellow developers</p>
        </div>
        <Button onClick={() => onNavigate("/dashboard/community/new-post")}>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">12.5K</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">3.2K</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">856</p>
                <p className="text-sm text-muted-foreground">Solutions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Help Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-4">
          <div className="flex space-x-4">
            <Input placeholder="Search discussions..." className="flex-1" />
            <Button variant="outline">Filter</Button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {discussion.isHot && (
                          <Badge variant="destructive" className="text-xs">
                            <Zap className="mr-1 h-3 w-3" />
                            Hot
                          </Badge>
                        )}
                        <Badge variant="secondary">{discussion.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                          </Avatar>
                          <span>{discussion.author}</span>
                        </div>
                        <span>{discussion.timeAgo}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{discussion.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{discussion.likes}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors This Month</CardTitle>
              <CardDescription>Community members making the biggest impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((member) => (
                  <div key={member.rank} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                        {member.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <Badge variant="outline">{member.badge}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{member.points.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge>{event.type}</Badge>
                        <span className="text-sm text-muted-foreground">{event.participants} participants</span>
                      </div>
                    </div>
                    <Button>Join Event</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Study Guides</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    JavaScript Interview Prep
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    System Design Basics
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Database Optimization
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Code Templates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    React Component Boilerplate
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Node.js API Starter
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Database Schema Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
