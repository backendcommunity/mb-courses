"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Edit3,
  Save,
  X,
  Star,
  Trophy,
  Calendar,
  Award,
} from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { useLevel } from "@/hooks/use-level";
import { useAppStore } from "@/lib/store";
import { updateUser } from "@/lib/data";

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const store = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();
  const [badges, setBadges] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const { level, mbToNextLevel } = useLevel();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user?.phone,
    address: user?.address,
    bio: user?.bio,
    website: user?.website,
    github: user?.github,
    linkedin: user?.linkedin,
    country: user?.country,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadAchievements() {
      const achievements = await store.getUserAchievement();
      if (!achievements?.length) return;
      if (!cancelled) {
        setAchievements(achievements?.filter((ach: any) => ach?.completed));
      }
    }

    async function loadBadges() {
      const badges = await store.getBadges();
      if (!cancelled) {
        setBadges(badges);
      }
    }

    loadAchievements();
    loadBadges();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    // In a real app, this would save to the backend
    const user = await store.updateUser(formData);
    if (user) updateUser(user!);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    setFormData({
      name: user.name,
      email: user.email,
      phone: user?.phone,
      address: user?.address,
      bio: user?.bio,
      website: user?.website,
      github: user?.github,
      linkedin: user?.linkedin,
      country: user?.country,
    });
  };

  const stats = [
    {
      label: "Courses Completed",
      value: user.numberOfCoursesCompleted,
      icon: Trophy,
    },
    { label: "Projects Built", value: user.numberOfProjectsBuilt, icon: Award },
    { label: "Total MB", value: user?.points?.toLocaleString(), icon: Star },
    { label: "Learning Streak", value: user.streak + " days", icon: Calendar },
  ];

  return (
    <div className="px-4 py-6 md:py-8 lg:py-10 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel} className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-border">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={formData.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-lg">
                      {formData?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-primary" />
                          {formData.name}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-primary" />
                          {formData.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-primary" />
                          {formData.phone}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Location</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          {formData?.address}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      {isEditing ? (
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          {formData?.country}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {formData.bio}
                  </p>
                )}
              </div>

              <Separator />

              {/* Social Links */}
              <div className="space-y-4">
                <Label>Social Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-xs">
                      Website
                    </Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-primary" />
                        <a
                          href={formData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {formData.website
                            ? formData.website.substring(0, 20) + "..."
                            : ""}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-xs">
                      GitHub
                    </Label>
                    {isEditing ? (
                      <Input
                        id="github"
                        value={formData.github}
                        onChange={(e) =>
                          setFormData({ ...formData, github: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <Github className="h-4 w-4 text-primary" />
                        <a
                          href={formData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {formData.github
                            ? formData.github?.substring(0, 20) + "..."
                            : ""}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-xs">
                      LinkedIn
                    </Label>
                    {isEditing ? (
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <Linkedin className="h-4 w-4 text-primary" />
                        <a
                          href={formData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {formData?.linkedin
                            ? formData?.linkedin.substring(0, 20) + "..."
                            : ""}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center items-center gap-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={level?.icon} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {level?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="text-2xl font-bold">Level {user?.level}</div>
                  <div className="text-sm text-muted-foreground">
                    {level?.name}
                  </div>
                </div>
              </div>
              <Progress
                value={(user?.points / mbToNextLevel) * 100}
                className="h-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{user?.points?.toLocaleString()} MB</span>
                <span>
                  {mbToNextLevel?.toLocaleString()} MB to Level{" "}
                  {user?.level + 1}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Member Since */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Member since
                </div>
                <div className="font-semibold">
                  {user?.createdAt
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        year: "numeric",
                      }).format(new Date(user?.createdAt!))
                    : ""}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length < 1 && (
            <div className="text-gray-400">
              No achievements yet. Engage more with the platform.
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements?.map(({ achievement, ...uAchievement }: any) => (
              <div
                key={uAchievement.id}
                className={`p-4 rounded-lg border transition-colors ${
                  uAchievement.completed
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/50 border-border opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement?.icon ?? "🎓"}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{achievement.name}</h4>
                      {uAchievement.completed && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary"
                        >
                          Earned
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges?.map((badge: any) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border transition-colors ${
                  badge.enrolled ? "bg-primary/5" : "border-primary/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{badge?.icon ?? "🔥"}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{badge.name}</h4>

                      {badge?.enrolled && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary"
                        >
                          Earned
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;
