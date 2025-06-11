"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gift, Star, Trophy, Zap, ShoppingCart, Clock, CheckCircle } from "lucide-react"

interface XpRedemptionPageProps {
  onNavigate: (path: string) => void
}

export function XpRedemptionPage({ onNavigate }: XpRedemptionPageProps) {
  const [activeTab, setActiveTab] = useState("rewards")
  const [userXP] = useState(2450)

  const rewards = [
    {
      id: 1,
      name: "Premium Course Access",
      description: "Unlock any premium course for 30 days",
      xpCost: 500,
      category: "Education",
      icon: <Star className="h-6 w-6" />,
      available: true,
      popular: true,
    },
    {
      id: 2,
      name: "1-on-1 Mentorship Session",
      description: "60-minute session with industry expert",
      xpCost: 1000,
      category: "Mentorship",
      icon: <Trophy className="h-6 w-6" />,
      available: true,
      popular: false,
    },
    {
      id: 3,
      name: "Certificate of Excellence",
      description: "Official certificate for your achievements",
      xpCost: 750,
      category: "Recognition",
      icon: <Gift className="h-6 w-6" />,
      available: true,
      popular: false,
    },
    {
      id: 4,
      name: "Priority Support",
      description: "Get priority help and support for 30 days",
      xpCost: 300,
      category: "Support",
      icon: <Zap className="h-6 w-6" />,
      available: true,
      popular: true,
    },
    {
      id: 5,
      name: "Exclusive Webinar Access",
      description: "Access to exclusive monthly webinars",
      xpCost: 1500,
      category: "Education",
      icon: <Star className="h-6 w-6" />,
      available: false,
      popular: false,
    },
  ]

  const recentRedemptions = [
    {
      id: 1,
      reward: "Premium Course Access",
      xpSpent: 500,
      date: "2024-12-10",
      status: "Active",
    },
    {
      id: 2,
      reward: "Priority Support",
      xpSpent: 300,
      date: "2024-12-08",
      status: "Expired",
    },
    {
      id: 3,
      reward: "Certificate of Excellence",
      xpSpent: 750,
      date: "2024-12-05",
      status: "Completed",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Course Completionist",
      description: "Complete 10 courses",
      progress: 7,
      total: 10,
      xpReward: 200,
      unlocked: false,
    },
    {
      id: 2,
      title: "Problem Solver",
      description: "Solve 50 coding challenges",
      progress: 50,
      total: 50,
      xpReward: 300,
      unlocked: true,
    },
    {
      id: 3,
      title: "Community Helper",
      description: "Help 25 community members",
      progress: 18,
      total: 25,
      xpReward: 250,
      unlocked: false,
    },
  ]

  const handleRedeem = (rewardId: number, xpCost: number) => {
    if (userXP >= xpCost) {
      // Handle redemption logic
      console.log(`Redeeming reward ${rewardId} for ${xpCost} XP`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">XP Store</h1>
          <p className="text-muted-foreground">Redeem your XP for amazing rewards</p>
        </div>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-2xl font-bold">{userXP.toLocaleString()}</span>
            <span className="text-muted-foreground">XP</span>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`relative ${!reward.available ? "opacity-50" : ""}`}>
                {reward.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {reward.icon}
                    <CardTitle className="text-lg">{reward.name}</CardTitle>
                  </div>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{reward.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold">{reward.xpCost}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      disabled={!reward.available || userXP < reward.xpCost}
                      onClick={() => handleRedeem(reward.id, reward.xpCost)}
                    >
                      {!reward.available ? (
                        <>
                          <Clock className="mr-2 h-4 w-4" />
                          Coming Soon
                        </>
                      ) : userXP < reward.xpCost ? (
                        `Need ${reward.xpCost - userXP} more XP`
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Redeem
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{achievement.title}</h3>
                        {achievement.unlocked && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                      <p className="text-muted-foreground mb-3">{achievement.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                        <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center space-x-1 mb-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold">{achievement.xpReward}</span>
                      </div>
                      {achievement.unlocked ? (
                        <Badge variant="default">Completed</Badge>
                      ) : (
                        <Badge variant="outline">In Progress</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redemption History</CardTitle>
              <CardDescription>Your recent XP redemptions and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRedemptions.map((redemption) => (
                  <div key={redemption.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{redemption.reward}</h4>
                      <p className="text-sm text-muted-foreground">
                        Redeemed on {new Date(redemption.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold">{redemption.xpSpent}</span>
                      </div>
                      <Badge
                        variant={
                          redemption.status === "Active"
                            ? "default"
                            : redemption.status === "Completed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {redemption.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
