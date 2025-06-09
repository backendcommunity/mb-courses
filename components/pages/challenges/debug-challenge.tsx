"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bug, CheckCircle2, Play } from "lucide-react"
import type { DebugChallenge } from "@/lib/lands-data"

interface DebugChallengeComponentProps {
  challenge: DebugChallenge
  onComplete: () => void
}

export function DebugChallengeComponent({ challenge, onComplete }: DebugChallengeComponentProps) {
  const [code, setCode] = useState(challenge.buggyCode || "// Buggy code would be here")
  const [isFixed, setIsFixed] = useState(false)
  const [testOutput, setTestOutput] = useState("")

  const runCode = () => {
    // Simulate running the code
    setTestOutput("Output: Hello World!\nExpected: Hello World!\n✅ Test passed!")
    setIsFixed(true)
  }

  const submitFix = () => {
    if (isFixed) {
      onComplete()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5" />
          Debug Challenge
        </CardTitle>
        <CardDescription>Find and fix the bugs in the provided code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Buggy Code</h4>
            <Badge variant="destructive">Contains Bugs</Badge>
          </div>
          <textarea
            className="w-full h-48 p-4 font-mono text-sm border rounded-md resize-none bg-muted/50"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={runCode}>
            <Play className="h-4 w-4 mr-2" />
            Test Code
          </Button>

          {isFixed && (
            <Button onClick={submitFix} className="bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Submit Fix
            </Button>
          )}
        </div>

        {testOutput && (
          <div>
            <h4 className="font-medium mb-2">Test Output</h4>
            <pre className="bg-muted p-3 rounded text-sm font-mono whitespace-pre-wrap">{testOutput}</pre>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-2">Expected Output</h4>
          <pre className="bg-muted p-3 rounded text-sm font-mono">
            {challenge.expectedOutput || "Expected output would be shown here"}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
