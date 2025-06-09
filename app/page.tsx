"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code2, Users, Trophy, Star, ArrowRight, Play, CheckCircle, Zap, Target, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("courses")

  const handleGetStarted = () => {
    // Navigate to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#13AECE] rounded-lg flex items-center justify-center">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">MasteringBackend</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button onClick={handleGetStarted}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 bg-[#13AECE]/10 text-[#13AECE] border-[#13AECE]/20">
              🚀 Transform Your Backend Skills
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#13AECE] to-[#347474] bg-clip-text text-transparent">
              Master Backend Engineering
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn, Build, and Grow your backend development skills through our comprehensive 3-step transformation
              process. From beginner to senior engineer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#13AECE] hover:bg-[#13AECE]/90" onClick={handleGetStarted}>
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Backend Engineering Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our proven 3-step transformation process takes you from beginner to senior backend engineer
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[#13AECE]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-[#13AECE]" />
                </div>
                <CardTitle className="text-xl">Step 1: Learn & Train</CardTitle>
                <CardDescription>Master fundamentals through courses, bootcamps, and learning paths</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Comprehensive Courses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Intensive Bootcamps
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Structured Learning Paths
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[#F2C94C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code2 className="h-8 w-8 text-[#F2C94C]" />
                </div>
                <CardTitle className="text-xl">Step 2: Build & Practice</CardTitle>
                <CardDescription>Apply knowledge through real-world projects and challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Real-world Projects
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Coding Challenges
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Portfolio Building
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[#EB5757]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-[#EB5757]" />
                </div>
                <CardTitle className="text-xl">Step 3: Grow & Career</CardTitle>
                <CardDescription>Advance your career with interviews, certifications, and community</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Interview Preparation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Industry Certifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Community Support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground">Comprehensive learning resources and tools</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {[
                { id: "courses", label: "Courses", icon: BookOpen },
                { id: "projects", label: "Projects", icon: Code2 },
                { id: "community", label: "Community", icon: Users },
                { id: "gamification", label: "MB Lands", icon: Trophy },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id ? "bg-background shadow-sm" : "hover:bg-background/50"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === "courses" && (
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Comprehensive Courses</h3>
                      <p className="text-muted-foreground mb-6">
                        Learn from industry experts through structured, hands-on courses covering everything from basics
                        to advanced topics.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <Star className="h-5 w-5 text-[#F2C94C] mr-3" />
                          <span>Video-based learning with practical examples</span>
                        </li>
                        <li className="flex items-center">
                          <Star className="h-5 w-5 text-[#F2C94C] mr-3" />
                          <span>Progress tracking and certificates</span>
                        </li>
                        <li className="flex items-center">
                          <Star className="h-5 w-5 text-[#F2C94C] mr-3" />
                          <span>Beginner to advanced levels</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-[#13AECE]/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-[#13AECE]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Node.js Fundamentals</h4>
                            <p className="text-sm text-muted-foreground">12 hours • Beginner</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-[#F2C94C]/10 rounded-lg flex items-center justify-center">
                            <Code2 className="h-6 w-6 text-[#F2C94C]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Database Design</h4>
                            <p className="text-sm text-muted-foreground">8 hours • Intermediate</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-[#EB5757]/10 rounded-lg flex items-center justify-center">
                            <Zap className="h-6 w-6 text-[#EB5757]" />
                          </div>
                          <div>
                            <h4 className="font-medium">System Architecture</h4>
                            <p className="text-sm text-muted-foreground">15 hours • Advanced</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "projects" && (
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Real-World Projects</h3>
                      <p className="text-muted-foreground mb-6">
                        Build production-ready applications that showcase your skills and enhance your portfolio.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <Target className="h-5 w-5 text-[#13AECE] mr-3" />
                          <span>Industry-relevant project scenarios</span>
                        </li>
                        <li className="flex items-center">
                          <Target className="h-5 w-5 text-[#13AECE] mr-3" />
                          <span>Step-by-step guidance and mentorship</span>
                        </li>
                        <li className="flex items-center">
                          <Target className="h-5 w-5 text-[#13AECE] mr-3" />
                          <span>Portfolio-worthy applications</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-background rounded-lg">
                          <h4 className="font-medium mb-2">E-commerce API</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Build a complete REST API with authentication, payments, and inventory management.
                          </p>
                          <Badge variant="outline">Node.js</Badge>
                          <Badge variant="outline" className="ml-2">
                            MongoDB
                          </Badge>
                        </div>
                        <div className="p-4 bg-background rounded-lg">
                          <h4 className="font-medium mb-2">Real-time Chat App</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Create a scalable chat application with WebSocket connections and message persistence.
                          </p>
                          <Badge variant="outline">Socket.io</Badge>
                          <Badge variant="outline" className="ml-2">
                            Redis
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "community" && (
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Vibrant Community</h3>
                      <p className="text-muted-foreground mb-6">
                        Connect with fellow developers, get help, share knowledge, and grow together in our supportive
                        community.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <Users className="h-5 w-5 text-[#9B59B6] mr-3" />
                          <span>Active developer community</span>
                        </li>
                        <li className="flex items-center">
                          <Users className="h-5 w-5 text-[#9B59B6] mr-3" />
                          <span>Expert mentorship and code reviews</span>
                        </li>
                        <li className="flex items-center">
                          <Users className="h-5 w-5 text-[#9B59B6] mr-3" />
                          <span>Career guidance and networking</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#9B59B6]">10,000+</div>
                          <p className="text-sm text-muted-foreground">Active Members</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-xl font-bold">500+</div>
                            <p className="text-xs text-muted-foreground">Daily Messages</p>
                          </div>
                          <div>
                            <div className="text-xl font-bold">50+</div>
                            <p className="text-xs text-muted-foreground">Mentors</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "gamification" && (
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">MB Lands - Gamified Learning</h3>
                      <p className="text-muted-foreground mb-6">
                        Make learning fun and engaging with our gamified platform featuring XP, levels, achievements,
                        and challenges.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <Trophy className="h-5 w-5 text-[#F2C94C] mr-3" />
                          <span>Earn XP and level up your skills</span>
                        </li>
                        <li className="flex items-center">
                          <Trophy className="h-5 w-5 text-[#F2C94C] mr-3" />
                          <span>Unlock achievements and badges</span>
                        </li>
                        <li className="flex items-center">
                          <Trophy className="h-5 w-5 text-[#F2C94C] mr-3" />
                          <span>Compete in coding challenges</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-[#9B59B6]/10 to-[#F2C94C]/10 rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Your Progress</span>
                          <Badge variant="outline">Level 5</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>XP Points</span>
                            <span>2,450 / 3,000</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-[#F2C94C] h-2 rounded-full" style={{ width: "82%" }}></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-background rounded">
                            <div className="text-lg">🏆</div>
                            <div className="text-xs">12 Badges</div>
                          </div>
                          <div className="p-2 bg-background rounded">
                            <div className="text-lg">🔥</div>
                            <div className="text-xs">7 Day Streak</div>
                          </div>
                          <div className="p-2 bg-background rounded">
                            <div className="text-lg">⭐</div>
                            <div className="text-xs">Top 10%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#13AECE] to-[#347474]">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Backend Skills?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of developers who have advanced their careers with MasteringBackend
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={handleGetStarted}>
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#13AECE]"
              >
                <Globe className="mr-2 h-5 w-5" />
                Explore Curriculum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#13AECE] rounded-lg flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MasteringBackend</span>
              </div>
              <p className="text-muted-foreground">
                Transform your backend development skills through comprehensive learning and hands-on practice.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Learning</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Courses</li>
                <li>Bootcamps</li>
                <li>Learning Paths</li>
                <li>Projects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Discord</li>
                <li>Forums</li>
                <li>Events</li>
                <li>Mentorship</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MasteringBackend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
