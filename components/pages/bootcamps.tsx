"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { routes } from "@/lib/routes";
import { WIP } from "../WIP";

interface BootcampsPageProps {
  onNavigate?: (url: string) => void;
}

export function BootcampsPage({ onNavigate }: BootcampsPageProps) {
  const store = useAppStore();
  const bootcamps = store.getBootcamps();

  return (
    <div className="flex-1 space-y-6 relative">
      <WIP />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bootcamps</h1>
          <p className="text-muted-foreground">
            Intensive, cohort-based programs designed to accelerate your backend
            engineering skills
          </p>
        </div>
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          Apply for Bootcamp
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Job placement rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Salary Increase
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$35k</div>
            <p className="text-xs text-muted-foreground">After completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduates</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Total graduates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Cohort</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">July 1</div>
            <p className="text-xs text-muted-foreground">2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search bootcamps..." className="pl-8" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Durations</SelectItem>
            <SelectItem value="short">4-8 weeks</SelectItem>
            <SelectItem value="medium">8-12 weeks</SelectItem>
            <SelectItem value="long">12+ weeks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bootcamps Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {bootcamps.map((bootcamp) => (
          <Card key={bootcamp.id} className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-r from-[#0E1F33] to-[#13AECE] flex items-center justify-center">
              <div className="text-center text-white">
                <Zap className="h-12 w-12 mx-auto mb-2" />
                <h3 className="text-lg font-bold">Intensive Bootcamp</h3>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    bootcamp?.level === "Advanced"
                      ? "destructive"
                      : bootcamp?.level === "Intermediate"
                      ? "default"
                      : "secondary"
                  }
                >
                  {bootcamp?.level}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{bootcamp.rating}</span>
                </div>
              </div>
              <CardTitle className="line-clamp-2">{bootcamp.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {bootcamp.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{bootcamp.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Starts {new Date(bootcamp.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{bootcamp.students} graduates</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{bootcamp.spotsLeft} spots left</span>
                </div>
              </div>

              {bootcamp.enrolled ? (
                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Enrolled
                  </Badge>
                  <Button
                    className="w-full"
                    onClick={() =>
                      onNavigate?.(routes.bootcampDashboard(bootcamp.id))
                    }
                  >
                    Access Bootcamp
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      ${bootcamp.price.toLocaleString()}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-orange-600 border-orange-200"
                    >
                      {bootcamp.spotsLeft} spots left
                    </Badge>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      onNavigate?.(routes.bootcampDetail(bootcamp.id))
                    }
                  >
                    View Details
                  </Button>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Instructor: {bootcamp.instructor}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why Choose Our Bootcamps */}
      <Card className="bg-gradient-to-r from-[#0E1F33] to-[#13AECE] text-white">
        <CardHeader>
          <CardTitle>Why Choose MB Bootcamps?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Live Instruction</span>
              </div>
              <p className="text-sm text-blue-100">
                Learn from industry experts in real-time with interactive
                sessions
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Peer Learning</span>
              </div>
              <p className="text-sm text-blue-100">
                Collaborate with motivated peers and build lasting professional
                networks
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span className="font-medium">Career Support</span>
              </div>
              <p className="text-sm text-blue-100">
                Get personalized career coaching and job placement assistance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
