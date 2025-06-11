"use client";

import { useState } from "react";
import {
  Gift,
  Star,
  ChevronRight,
  Lock,
  Check,
  Info,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";
import { routes } from "@/lib/routes";

interface XpRedemptionPageProps {
  onNavigate: (path: string) => void;
}

export function XpRedemptionPage({ onNavigate }: XpRedemptionPageProps) {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const store = useAppStore();
  const user = store.getUser();

  // Mock XP balance
  const xpBalance = 2450;

  const xpItems = {
    courses: [
      {
        id: "advanced-nodejs",
        title: "Advanced Node.js Patterns",
        description: "Master advanced patterns and techniques in Node.js",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 1500,
        originalPrice: "$149.99",
        category: "course",
        popular: true,
      },
      {
        id: "graphql-mastery",
        title: "GraphQL API Mastery",
        description: "Build efficient APIs with GraphQL and Node.js",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 2000,
        originalPrice: "$199.99",
        category: "course",
        popular: false,
      },
      {
        id: "microservices",
        title: "Microservices Architecture",
        description: "Design and implement scalable microservices",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 3000,
        originalPrice: "$249.99",
        category: "course",
        popular: false,
      },
    ],
    bootcamps: [
      {
        id: "backend-mastery",
        title: "Backend Mastery Bootcamp",
        description: "8-week intensive backend development bootcamp",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 5000,
        originalPrice: "$999.99",
        category: "bootcamp",
        popular: true,
      },
      {
        id: "devops-pipeline",
        title: "DevOps Pipeline Bootcamp",
        description: "Learn to build and manage CI/CD pipelines",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 4500,
        originalPrice: "$899.99",
        category: "bootcamp",
        popular: false,
      },
    ],
    certificates: [
      {
        id: "backend-engineer",
        title: "Certified Backend Engineer",
        description: "Professional certification for backend developers",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 3500,
        originalPrice: "$299.99",
        category: "certificate",
        popular: true,
      },
      {
        id: "database-specialist",
        title: "Database Specialist Certification",
        description: "Demonstrate your expertise in database management",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 3000,
        originalPrice: "$249.99",
        category: "certificate",
        popular: false,
      },
    ],
    mentorship: [
      {
        id: "one-on-one",
        title: "1-on-1 Mentorship Session",
        description: "60-minute session with a senior backend engineer",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 1000,
        originalPrice: "$99.99",
        category: "mentorship",
        popular: true,
      },
      {
        id: "resume-review",
        title: "Resume & Portfolio Review",
        description: "Professional review of your resume and portfolio",
        image: "/placeholder.svg?height=150&width=250",
        xpCost: 800,
        originalPrice: "$79.99",
        category: "mentorship",
        popular: false,
      },
    ],
  };

  const handleRedeemXp = (item: any) => {
    if (xpBalance >= item.xpCost) {
      onNavigate(routes.xpRedeem(item.category, item.id));
    }
  };

  const filteredItems = (category: keyof typeof xpItems) => {
    if (!searchQuery) return xpItems[category];
    return xpItems[category].filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="container max-w-6xl py-10 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">XP Store</h1>
          <p className="text-muted-foreground">
            Redeem your XP for premium content and features
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-[#13AECE]/10 text-[#13AECE] px-5 py-3 rounded-lg">
            <Gift className="h-5 w-5" />
            <div>
              <div className="font-medium">{xpBalance.toLocaleString()} XP</div>
              <div className="text-xs">Available Balance</div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => onNavigate(routes.xpHistory)}
          >
            Transaction History
          </Button>
        </div>
      </div>

      {/* XP Progress */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#F2C94C]" />
              <h3 className="font-medium">XP Progress</h3>
            </div>
            <Badge
              variant="outline"
              className="bg-[#F2C94C]/10 text-[#F2C94C] border-[#F2C94C]/20"
            >
              Level {user.level} Engineer
            </Badge>
          </div>
          <Progress
            value={(user.xp / user.xpToNextLevel) * 100}
            className="h-2 mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{user.xp.toLocaleString()} XP</span>
            <span>
              {user.xpToNextLevel.toLocaleString()} XP to Level {user.level + 1}
            </span>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Earn XP by completing courses, projects, and challenges. Use your
              XP to unlock premium content and features.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex items-center gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search XP rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[600px]"
        >
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="bootcamps">Bootcamps</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          </TabsList>

          {/* XP Items */}
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems(activeTab as keyof typeof xpItems).map((item) => (
                <Card
                  key={item.id}
                  className={item.popular ? "border-[#13AECE]" : ""}
                >
                  {item.popular && (
                    <div className="absolute -top-3 right-4 z-10">
                      <Badge className="bg-[#13AECE]">Popular</Badge>
                    </div>
                  )}
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Gift className="h-4 w-4 text-[#13AECE]" />
                        <span className="font-medium text-[#13AECE]">
                          {item.xpCost.toLocaleString()} XP
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground line-through">
                        {item.originalPrice}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    {xpBalance >= item.xpCost ? (
                      <Button
                        className="w-full"
                        onClick={() => handleRedeemXp(item)}
                      >
                        Redeem XP
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="w-full"
                              variant="outline"
                              disabled
                            >
                              <Lock className="mr-2 h-4 w-4" />
                              Need {(
                                item.xpCost - xpBalance
                              ).toLocaleString()}{" "}
                              more XP
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Complete more courses and projects to earn
                              additional XP
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredItems(activeTab as keyof typeof xpItems).length === 0 && (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No items found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* How to Earn More XP */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-[#13AECE]" />
            How to Earn More XP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#13AECE]/10 text-[#13AECE]">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium">Complete Courses</h4>
                <p className="text-sm text-muted-foreground">
                  Earn 100-500 XP for each completed course
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#13AECE]/10 text-[#13AECE]">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium">Build Projects</h4>
                <p className="text-sm text-muted-foreground">
                  Earn 200-1000 XP for each completed project
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#13AECE]/10 text-[#13AECE]">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium">Daily Streak</h4>
                <p className="text-sm text-muted-foreground">
                  Earn 50 XP for each day you maintain your streak
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
