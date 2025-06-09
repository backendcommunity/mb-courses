import { ThemeVerification } from "@/components/theme-verification"

export default function ThemeTestPage() {
  return (
    <div className="min-h-screen bg-background transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Theme Verification Test</h1>
            <p className="text-muted-foreground">Testing smooth transitions between light and dark modes</p>
          </div>

          <ThemeVerification />
        </div>
      </div>
    </div>
  )
}
