"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Bell,
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
  Star,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ThemeToggle } from "@/components/theme-toggle"
import { getUser } from "@/lib/data"
import { routes } from "@/lib/routes"

interface NavigationBarProps {
  onNavigate: (path: string) => void
  onMenuToggle?: () => void
  isMobile?: boolean
}

export function NavigationBar({ onNavigate, onMenuToggle, isMobile = false }: NavigationBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const user = getUser()

  // Mock subscription data
  const subscription = {
    plan: "Pro",
    status: "active",
    xpBalance: 2450,
  }

  const notifications = [
    {
      id: "1",
      title: "Course Completed!",
      message: "You've completed Advanced Node.js Patterns",
      time: "2 hours ago",
      type: "success",
      read: false,
    },
    {
      id: "2",
      title: "Subscription Renewed",
      message: "Your Pro subscription has been renewed for another month",
      time: "3 hours ago",
      type: "billing",
      read: false,
    },
    {
      id: "3",
      title: "New Assignment",
      message: "Database Design exercise is now available",
      time: "4 hours ago",
      type: "info",
      read: false,
    },
    {
      id: "4",
      title: "XP Earned!",
      message: "You earned 150 XP for completing the API challenge",
      time: "1 day ago",
      type: "achievement",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery)
      // Implement search functionality
      if (isMobile) {
        setShowMobileSearch(false)
      }
    }
  }

  const handleNotificationClick = (notificationId: string) => {
    console.log("Clicked notification:", notificationId)
    setIsNotificationsOpen(false)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={onMenuToggle}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}

          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate(routes.dashboard)}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            {!isMobile && (
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MasteringBackend
              </span>
            )}
          </div>

          {/* Desktop Search Bar */}
          {!isMobile && (
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
          )}

          {/* Mobile Search Toggle */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Right Section */}
          <div className={`${isMobile ? "" : "ml-auto"} flex items-center space-x-2`}>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* XP Balance - Compact on mobile */}
            <Button variant="ghost" size="sm" className="text-primary" onClick={() => onNavigate(routes.xpStore)}>
              <Gift className="h-4 w-4 mr-1" />
              <span className={isMobile ? "sr-only" : ""}>{subscription.xpBalance.toLocaleString()} XP</span>
            </Button>

            {/* Notifications */}
            <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="text-sm text-muted-foreground">You have {unreadCount} unread notifications</p>
                </div>
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
                            notification.type === "success"
                              ? "bg-green-500"
                              : notification.type === "info"
                                ? "bg-primary"
                                : notification.type === "achievement"
                                  ? "bg-yellow-500"
                                  : "bg-purple-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate(routes.profile)} className="dropdown-item">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.courses)} className="dropdown-item">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Courses</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.projects)} className="dropdown-item">
                  <Code className="mr-2 h-4 w-4" />
                  <span>My Projects</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.roadmaps)} className="dropdown-item">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Roadmaps</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.project30)} className="dropdown-item">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Project30</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.community)} className="dropdown-item">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Community</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate(routes.subscriptionManagement)} className="dropdown-item">
                  <Crown className="mr-2 h-4 w-4" />
                  <span>Subscription</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.subscriptionPlans)} className="dropdown-item">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Plans</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.billing)} className="dropdown-item">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.xpStore)} className="dropdown-item">
                  <Gift className="mr-2 h-4 w-4" />
                  <span>XP Store</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.settings)} className="dropdown-item">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate(routes.logout)} className="dropdown-item">
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
  )
}
