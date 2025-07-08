"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Lightbulb,
  Eye,
} from "lucide-react";
import { routes } from "@/lib/routes";
import { useAppStore } from "@/lib/store";
import { Exercise } from "@/lib/data";
import { toast } from "sonner";

interface CourseExercisePageProps {
  courseId: string;
  exercise: Exercise;
  onNavigate: (path: string) => void;
}

export function ExercisePage({
  courseId,
  exercise,
  onNavigate,
}: CourseExercisePageProps) {
  const store = useAppStore();
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState<any[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState(false);
  // Mock exercise data
  const exercise1 = {
    id: "exercise-1",
    title: "Variable Declaration Practice",
    description: "Practice declaring and initializing variables in JavaScript",
    difficulty: "Easy",
    points: 50,
    instructions: `
Write a function called 'createUser' that:
1. Takes two parameters: name (string) and age (number)
2. Returns an object with properties: name, age, and isAdult (boolean)
3. isAdult should be true if age >= 18, false otherwise

Example:
createUser("John", 25) should return { name: "John", age: 25, isAdult: true }
createUser("Jane", 16) should return { name: "Jane", age: 16, isAdult: false }
    `,
    starterCode: `function createUser(name, age) {
  // Your code here
  
}`,
    solution: `function createUser(name, age) {
  return {
    name: name,
    age: age,
    isAdult: age >= 18
  };
}`,
    hint: "Remember to return an object with three properties. Use the >= operator to check if age is 18 or greater.",
    testCases: [
      {
        input: ["John", 25],
        expected: { name: "John", age: 25, isAdult: true },
        description: "Adult user",
      },
      {
        input: ["Jane", 16],
        expected: { name: "Jane", age: 16, isAdult: false },
        description: "Minor user",
      },
      {
        input: ["Bob", 18],
        expected: { name: "Bob", age: 18, isAdult: true },
        description: "Exactly 18 years old",
      },
    ],
  };

  useEffect(() => {
    // Initialize with starter code if empty
    if (!code) {
      setCode(exercise?.starterCode);
    }
  }, []);

  const runTests = async () => {
    setIsRunning(true);

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // In a real implementation, this would execute the code safely
      const results = exercise?.testCases.map((testCase, index) => {
        // Mock test execution - in reality, you'd run the actual code
        const mockResult = Math.random() > 0.3; // 70% pass rate for demo
        return {
          id: index,
          description: testCase.description,
          input: testCase.input,
          expected: testCase.expected,
          actual: mockResult
            ? testCase.expected
            : { error: "Function not implemented correctly" },
          passed: mockResult,
        };
      });

      setTestResults(results);
    } catch (error) {
      setTestResults([
        {
          id: 0,
          description: "Code execution error",
          error: "Syntax error in your code",
          passed: false,
        },
      ]);
    }

    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(exercise?.starterCode);
    setTestResults([]);
    setShowHint(false);
    setShowSolution(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const passedTests = testResults.filter((t) => t.passed).length;
  const totalTests = testResults.length;
  const allTestsPassed = totalTests > 0 && passedTests === totalTests;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="instructions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="code">Code Editor</TabsTrigger>
          <TabsTrigger value="tests">
            Tests ({passedTests}/{totalTests})
          </TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>

        <TabsContent value="instructions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm">
                {exercise?.instructions}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Editor</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetCode}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                    <Button
                      onClick={runTests}
                      disabled={isRunning}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      {isRunning ? "Running..." : "Run Tests"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 p-3 font-mono text-sm border rounded-lg bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your code here..."
                />
              </CardContent>
            </Card>

            {/* Results Summary */}
            {testResults.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {allTestsPassed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">
                        {allTestsPassed
                          ? "All tests passed!"
                          : `${passedTests}/${totalTests} tests passed`}
                      </span>
                    </div>
                    {allTestsPassed && (
                      <Badge className="bg-green-100 text-green-800">
                        +{exercise?.points} pts
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Run your code to see test results
                </p>
              ) : (
                <div className="space-y-3">
                  {testResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {result.passed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="font-medium">
                          {result.description}
                        </span>
                      </div>
                      {result.input && (
                        <div className="text-sm text-gray-600">
                          <p>Input: {JSON.stringify(result.input)}</p>
                          <p>Expected: {JSON.stringify(result.expected)}</p>
                          {result.actual && (
                            <p>Actual: {JSON.stringify(result.actual)}</p>
                          )}
                        </div>
                      )}
                      {result.error && (
                        <p className="text-sm text-red-600">{result.error}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Hint
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showHint ? (
                  <p className="text-sm">{exercise?.hint}</p>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowHint(true)}
                    className="flex items-center gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Show Hint
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Solution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showSolution ? (
                  <pre className="bg-transparent p-3 rounded text-sm overflow-x-auto">
                    <code>{exercise?.solution}</code>
                  </pre>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowSolution(true)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Show Solution
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
