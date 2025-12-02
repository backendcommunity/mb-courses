"use client";

import type React from "react";
import { useMemo, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  BookOpen,
  Code,
  Users,
  Crown,
  Gift,
  TrendingUp,
  Sparkles,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme-toggle";
import { routes } from "@/lib/routes";
import { useAuth } from "@/store/auth";
import { useUser } from "@/hooks/use-user";
import { useAppStore } from "@/lib/store";
import { format } from "timeago.js";
import { updateUser } from "@/lib/data";
import { Loader } from "./ui/loader";
interface NavigationBarProps {
  onNavigate: (path: string) => void;
  onMenuToggle?: () => void;
  isMobile?: boolean;
}

export function NavigationBar({
  onNavigate,
  onMenuToggle,
  isMobile = false,
}: NavigationBarProps) {
  const auth = useAuth();
  const store = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const user = useUser();

  // Mock subscription data
  const subscription = user?.isPremium
    ? user?.subscription
    : {
        name: "Free",
      };
  async function load() {
    try {
      setIsActivitiesLoading(true);
      const activities = await store.getActivities({
        size: 20,
        skip: 0,
      });
      setNotifications(activities);
    } catch (error) {
    } finally {
      setIsActivitiesLoading(false);
    }
  }

  useMemo(() => {
    if (isNotificationsOpen) load();
  }, [isNotificationsOpen]);

  const skillGuides = [
    {
      name: "Python",
      icon: "🐍",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      name: "Ruby",
      icon: "💎",
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    },
    {
      name: "Java",
      icon: "☕",
      color:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    },
    {
      name: "GoLang",
      icon: "🔷",
      color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    },
    {
      name: "Node.js",
      icon: "🟢",
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    },
  ];

  const roadmaps = [
    {
      id: "1",
      title: "Career Essentials in Generative AI using Ruby",
      image: "/placeholder.svg?height=120&width=200",
      category: "Roadmap",
    },
    {
      id: "2",
      title: "Become Ruby Hero",
      image: "/placeholder.svg?height=120&width=200",
      category: "Roadmap",
    },
    {
      id: "3",
      title: "Full-Stack Development",
      image: "/placeholder.svg?height=120&width=200",
      category: "Roadmap",
    },
    {
      id: "4",
      title: "DevOps Engineering",
      image: "/placeholder.svg?height=120&width=200",
      category: "Roadmap",
    },
    {
      id: "5",
      title: "Cloud Architecture",
      image: "/placeholder.svg?height=120&width=200",
      category: "Roadmap",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search functionality
      if (isMobile) {
        setShowMobileSearch(false);
      }
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    console.log("Clicked notification:", notificationId);
    setIsNotificationsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always redirect to login after logout attempt
      onNavigate("/auth/login");
    }
  };

  const handleDeleteNotifications = async () => {
    const ids = notifications.map((n) => n.id);
    const data = await store.deleteActivities(ids);
    if (!data?.isDeleted) return;

    updateUser({
      ...user,
      totalNotifications: user.totalNotifications - ids.length,
    });
    setNotifications([]);
    setIsNotificationsOpen(false);
  };

  return (
    <>
      <nav className="sticky p-1 md:pl-72 top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-2 h-16 items-center px-4">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={onMenuToggle}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}

          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer md:hidden px-2"
            onClick={() => onNavigate(routes.dashboard)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            {!isMobile && (
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MasteringBackend
              </span>
            )}
          </div>

          {/* Explore Dropdown */}
          {/* isExploreOpen */}
          {/* <Popover open={false} onOpenChange={setIsExploreOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 py-2 border-2 rounded-lg font-medium nav-item"
              >
                Explore
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="lg:w-[1200px]  p-0 mt-2 border-border bg-popover"
              align="start"
              side="bottom"
            >
              <div className="p-8 space-y-8">

                <div className="lg:grid grid-cols-3 gap-6 flex flex-col">
                  <Card className="relative overflow-hidden border-border card-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Beginner Level"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    <CardContent className="relative z-10 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">Beginner Level</h3>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          onNavigate(`${routes.courses}?level=beginner`);
                          setIsExploreOpen(false);
                        }}
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="relative overflow-hidden border-border card-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Intermediate Level"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    <CardContent className="relative z-10 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        Intermediate Level
                      </h3>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          onNavigate(`${routes.courses}?level=intermediate`);
                          setIsExploreOpen(false);
                        }}
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="relative overflow-hidden border-border card-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent to-purple-600">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Advanced Level"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    <CardContent className="relative z-10 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">Advanced Level</h3>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          onNavigate(`${routes.courses}?level=advanced`);
                          setIsExploreOpen(false);
                        }}
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </div>


                <div>
                  <h3 className="text-xl font-bold mb-4">Skill Guides</h3>
                  <p className="text-muted-foreground mb-6">
                    Explore foundational content and tools to help you
                    understand, learn, and improve at the skills involved in
                    trending industry roles.
                  </p>
                  <div className="lg:grid grid-cols-5 gap-4 flex flex-col">
                    {skillGuides.map((skill) => (
                      <Card
                        key={skill.name}
                        className="cursor-pointer hover:shadow-md transition-shadow border-border card-hover"
                        onClick={() => {
                          onNavigate(
                            `${
                              routes.courses
                            }?skill=${skill.name.toLowerCase()}`
                          );
                          setIsExploreOpen(false);
                        }}
                      >
                        <CardContent className="p-4 flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${skill.color}`}
                          >
                            {skill.icon}
                          </div>
                          <span className="font-medium">{skill.name}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>


                <div>
                  <h3 className="text-xl font-bold mb-6">Roadmaps</h3>
                  <div className="lg:grid grid-cols-5 gap-4 flex flex-col">
                    {roadmaps.map((roadmap) => (
                      <Card
                        key={roadmap.id}
                        className="cursor-pointer hover:shadow-md transition-shadow border-border card-hover"
                        onClick={() => {
                          onNavigate(routes.roadmapDetail(roadmap.id));
                          setIsExploreOpen(false);
                        }}
                      >
                        <div className="aspect-video relative overflow-hidden rounded-t-lg">
                          <img
                            src={roadmap.image || "/placeholder.svg"}
                            alt={roadmap.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <Badge variant="secondary" className="text-xs mb-2">
                            {roadmap.category}
                          </Badge>
                          <h4 className="font-medium text-sm leading-tight">
                            {roadmap.title}
                          </h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover> */}

          {/* Desktop Search Bar */}
          {/* {!isMobile && (
            <div className="flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 h-9 bg-muted/50"
                />
              </form>
            </div>
          )} */}

          {/* Right Section */}
          <div
            className={`${
              isMobile ? "" : "ml-auto gap-4"
            } flex items-center space-x-1`}
          >
            {!isMobile && <ThemeToggle />}

            <Button
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 text-yellow-600 border-yellow-400/30 hover:bg-gradient-to- hover:from-yellow-400/20 hover:to-yellow-400/20 dark:text-yellow-400"
              onClick={() => onNavigate(routes.subscriptionManagement)}
            >
              {!subscription?.name?.includes("Free") && (
                <Crown className="h-4 w-4 mr-1" />
              )}
              {subscription?.name}
            </Button>

            {/* MB Balance - Compact on mobile */}
            {!isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={() => onNavigate(routes.xpStore)}
              >
                <Gift className="h-4 w-4 mr-1" />
                <span className={isMobile ? "sr-only" : ""}>
                  {user?.points?.toLocaleString()} MB
                </span>
              </Button>
            )}

            {/* Notifications */}
            <Popover
              open={isNotificationsOpen}
              onOpenChange={setIsNotificationsOpen}
            >
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {user?.totalNotifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                    >
                      {user?.totalNotifications > 9
                        ? `${9}+`
                        : user?.totalNotifications}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You have {user?.totalNotifications} unread notifications
                  </p>
                </div>

                {isActivitiesLoading ? (
                  <Loader isLoader={false} />
                ) : (
                  <div className="max-h-[60vh] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 ${
                          !notification.read ? "bg-primary/5" : ""
                        }`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type?.includes("COMPLETED")
                                ? "bg-green-500"
                                : notification.type?.includes("START") ||
                                  notification.type?.includes("STARTED")
                                ? "bg-primary"
                                : notification.type?.includes("WATCHED")
                                ? "bg-yellow-500"
                                : "bg-purple-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-4 border-t">
                  <Button
                    onClick={handleDeleteNotifications}
                    variant="ghost"
                    size="sm"
                    className="w-full"
                  >
                    Clear All Notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg"}
                      alt={user?.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate(routes.profile)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onNavigate("/courses?tab=my-courses")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Courses</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.projects)}>
                  <Code className="mr-2 h-4 w-4" />
                  <span>My Projects</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.roadmaps)}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Roadmaps</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.project30)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Project30</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate(routes.community)}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Community</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.community)}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Leaderboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onNavigate(routes.subscriptionManagement)}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  <span>Subscription</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.settings)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar - Expandable */}
        {isMobile && showMobileSearch && (
          <div className="px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-9"
                autoFocus
              />
            </form>
          </div>
        )}
      </nav>
    </>
  );
}
