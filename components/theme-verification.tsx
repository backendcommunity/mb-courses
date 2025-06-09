"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Moon, Sun, Monitor, Palette, CheckCircle, XCircle } from "lucide-react"

export function ThemeVerification() {
  const { theme, resolvedTheme, setTheme, themes } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [transitionTest, setTransitionTest] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Loading Theme Verification...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const testTransition = () => {
    setTransitionTest(true)
    const currentTheme = resolvedTheme
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    setTheme(newTheme)

    setTimeout(() => {
      setTransitionTest(false)
    }, 1000)
  }

  return (
    <div className="space-y-6 w-full max-w-4xl">
      {/* Theme Status Card */}
      <Card className="transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Verification Dashboard
              </CardTitle>
              <CardDescription>Testing smooth theme transitions and color consistency</CardDescription>
            </div>
            <ThemeToggle />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Current Theme</h4>
              <Badge variant={resolvedTheme === "dark" ? "default" : "secondary"} className="w-fit">
                {resolvedTheme === "dark" ? (
                  <>
                    <Moon className="h-3 w-3 mr-1" /> Dark
                  </>
                ) : (
                  <>
                    <Sun className="h-3 w-3 mr-1" /> Light
                  </>
                )}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">System Preference</h4>
              <Badge variant="outline" className="w-fit">
                <Monitor className="h-3 w-3 mr-1" />
                {theme === "system" ? "Auto" : "Manual"}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Transition Status</h4>
              <Badge variant={transitionTest ? "destructive" : "default"} className="w-fit">
                {transitionTest ? (
                  <>
                    <XCircle className="h-3 w-3 mr-1" /> Testing
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" /> Ready
                  </>
                )}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Test Controls */}
      <Card className="transition-all duration-300">
        <CardHeader>
          <CardTitle>Theme Switch Tests</CardTitle>
          <CardDescription>Test different theme switching scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => setTheme("light")}
              className="transition-all duration-300"
              disabled={transitionTest}
            >
              <Sun className="h-4 w-4 mr-2" />
              Light
            </Button>

            <Button
              variant="outline"
              onClick={() => setTheme("dark")}
              className="transition-all duration-300"
              disabled={transitionTest}
            >
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </Button>

            <Button
              variant="outline"
              onClick={() => setTheme("system")}
              className="transition-all duration-300"
              disabled={transitionTest}
            >
              <Monitor className="h-4 w-4 mr-2" />
              System
            </Button>

            <Button onClick={testTransition} disabled={transitionTest} className="transition-all duration-300">
              <Palette className="h-4 w-4 mr-2" />
              {transitionTest ? "Testing..." : "Test Switch"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette Preview */}
      <Card className="transition-all duration-300">
        <CardHeader>
          <CardTitle>Color Palette Preview</CardTitle>
          <CardDescription>Verify all colors transition smoothly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Primary Colors */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Primary</h4>
              <div className="space-y-1">
                <div className="h-8 bg-primary rounded transition-all duration-300" />
                <div className="h-6 bg-primary/80 rounded transition-all duration-300" />
                <div className="h-4 bg-primary/60 rounded transition-all duration-300" />
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Secondary</h4>
              <div className="space-y-1">
                <div className="h-8 bg-secondary rounded transition-all duration-300" />
                <div className="h-6 bg-secondary/80 rounded transition-all duration-300" />
                <div className="h-4 bg-secondary/60 rounded transition-all duration-300" />
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Accent</h4>
              <div className="space-y-1">
                <div className="h-8 bg-accent rounded transition-all duration-300" />
                <div className="h-6 bg-accent/80 rounded transition-all duration-300" />
                <div className="h-4 bg-accent/60 rounded transition-all duration-300" />
              </div>
            </div>

            {/* Muted Colors */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Muted</h4>
              <div className="space-y-1">
                <div className="h-8 bg-muted rounded transition-all duration-300" />
                <div className="h-6 bg-muted/80 rounded transition-all duration-300" />
                <div className="h-4 bg-muted/60 rounded transition-all duration-300" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Elements Test */}
      <Card className="transition-all duration-300">
        <CardHeader>
          <CardTitle>Interactive Elements</CardTitle>
          <CardDescription>Test hover states and interactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Buttons</h4>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Primary</Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="outline" size="sm">
                  Outline
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Badges</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
