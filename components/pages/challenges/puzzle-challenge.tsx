"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Puzzle, CheckCircle2 } from "lucide-react"
import type { PuzzleChallenge } from "@/lib/lands-data"

interface PuzzleChallengeComponentProps {
  challenge: PuzzleChallenge
  onComplete: () => void
}

export function PuzzleChallengeComponent({ challenge, onComplete }: PuzzleChallengeComponentProps) {
  const [solved, setSolved] = useState(false)

  const handleSolve = () => {
    setSolved(true)
    onComplete()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Puzzle className="h-5 w-5" />
          Puzzle Challenge
        </CardTitle>
        <CardDescription>Solve this interactive puzzle to complete the challenge</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
          <Puzzle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Puzzle Component</h3>
          <p className="text-muted-foreground mb-4">Interactive puzzle interface would be implemented here</p>
          <Button onClick={handleSolve} disabled={solved}>
            {solved ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Solved!
              </>
            ) : (
              "Solve Puzzle"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
