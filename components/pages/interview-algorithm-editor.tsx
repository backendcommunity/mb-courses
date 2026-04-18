"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface InterviewAlgorithmEditorProps {
  project: any;
  onNavigate: (route: string) => void;
}

export function InterviewAlgorithmEditor({
  project,
  onNavigate,
}: InterviewAlgorithmEditorProps) {
  const [language, setLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);

  const codeTemplates = {
    javascript: `function solution(nums, target) {
    // Write your solution here
    
    return [];
}`,
    python: `def solution(nums, target):
    # Write your solution here
    
    return []`,
    java: `class Solution {
    public int[] solution(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
}`,
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className="flex-1 grid grid-cols-[450px_1fr] overflow-hidden">
      {/* Left Sidebar - Problem Description */}
      <div className="border-r overflow-y-auto p-4">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          {/* Examples */}
          <div>
            <h3 className="font-semibold mb-2">Examples</h3>
            <div className="space-y-4">
              {project.examples?.map((example: any, index: number) => (
                <div key={index} className="bg-muted p-4 rounded-lg">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Input: </span>
                      <code className="bg-background px-2 py-1 rounded text-sm">
                        {example.input}
                      </code>
                    </div>
                    <div>
                      <span className="font-medium">Output: </span>
                      <code className="bg-background px-2 py-1 rounded text-sm">
                        {example.output}
                      </code>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="font-medium">Explanation: </span>
                        <span className="text-sm">{example.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div>
            <h3 className="font-semibold mb-2">Constraints</h3>
            <ul className="space-y-1 list-disc list-inside text-sm">
              {project.constraints?.map((constraint: string, index: number) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side - Code Editor and Results */}
      <div className="flex flex-col overflow-hidden">
        {/* Language Selector and Run Button */}
        <div className="border-b p-2 flex items-center justify-between bg-muted/30">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRunCode} disabled={isRunning}>
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-hidden">
          <Textarea
            className="w-full h-full font-mono text-sm resize-none border-0 focus-visible:ring-0 p-4"
            placeholder="// Write your solution here"
            defaultValue={codeTemplates[language as keyof typeof codeTemplates]}
          />
        </div>

        {/* Test Results */}
        <div className="border-t h-[200px] overflow-y-auto">
          <div className="p-3 border-b flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">Test Results</h3>
              <Badge variant="outline" className="text-xs">
                2/3 passing
              </Badge>
            </div>
          </div>
          <div className="p-2">
            <div className="p-3 mb-2 bg-green-50 border border-green-200 rounded-md text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Test Case 1</span>
              </div>
              <div className="pl-6 mt-1 text-xs text-muted-foreground">
                Input: [2,7,11,15], 9 → Output: [0,1] ✓
              </div>
            </div>
            <div className="p-3 mb-2 bg-red-50 border border-red-200 rounded-md text-sm">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="font-medium">Test Case 2</span>
              </div>
              <div className="pl-6 mt-1 text-xs text-muted-foreground">
                Input: [3,2,4], 6 → Expected: [1,2], Got: [0,2] ✗
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
