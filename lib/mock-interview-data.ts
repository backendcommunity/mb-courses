export interface MockInterviewType {
  id: string;
  name?: string;
  difficulty: string;
  duration: string;
  topics?: string[];
  company?: string;
  position?: string;
  level?: string;
  jobDescription?: string;
  description?: string;
  style?: string;
  format?: string;
}

export interface BookedInterview {
  id: string;
  type: MockInterviewType;
  scheduledDate: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
  score?: number;
  feedback?: InterviewFeedback;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: string;
  difficulty: string;
  timeLimit: number;
}

export interface InterviewFeedback {
  overallScore: number;
  grade: string;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  strengths: string[];
  improvements: string[];
  questionAnalysis: {
    questionId: string;
    question: string;
    userAnswer: string;
    feedback: string;
    score: number;
  }[];
  transcript: {
    speaker: "interviewer" | "candidate";
    message: string;
    timestamp: string;
  }[];
  recommendations: {
    title: string;
    description: string;
    resources: string[];
  }[];
}

// Mock data for interview types
const interviewTypes: MockInterviewType[] = [
  {
    id: "frontend",
    name: "Frontend Developer",
    description:
      "Practice frontend development interview questions focusing on React, JavaScript, and CSS.",
    difficulty: "Intermediate",
    duration: "45",
    topics: ["React", "JavaScript", "CSS", "HTML", "Web Performance"],
  },
  {
    id: "backend",
    name: "Backend Developer",
    description:
      "Practice backend development interview questions focusing on Node.js, databases, and API design.",
    difficulty: "Advanced",
    duration: "60",
    topics: [
      "Node.js",
      "Databases",
      "API Design",
      "System Design",
      "Performance",
    ],
  },
  {
    id: "fullstack",
    name: "Full Stack Developer",
    description:
      "Comprehensive interview covering both frontend and backend topics with system design questions.",
    difficulty: "Advanced",
    duration: "90",
    topics: ["React", "Node.js", "Databases", "System Design", "API Design"],
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    description:
      "Practice DevOps interview questions focusing on CI/CD, containerization, and cloud services.",
    difficulty: "Advanced",
    duration: "60",
    topics: ["CI/CD", "Docker", "Kubernetes", "AWS", "Infrastructure as Code"],
  },
];

// Mock data for booked interviews
const bookedInterviews: BookedInterview[] = [
  {
    id: "interview1",
    type: interviewTypes[0], // Frontend Developer
    scheduledDate: "2023-06-15T14:00:00Z",
    duration: "45",
    status: "completed",
    score: 85,
    feedback: {
      overallScore: 85,
      grade: "B+",
      technicalScore: 88,
      communicationScore: 82,
      problemSolvingScore: 90,
      strengths: [
        "Strong understanding of JavaScript fundamentals",
        "Excellent problem decomposition skills",
        "Clear and concise communication",
        "Good knowledge of React optimization techniques",
      ],
      improvements: [
        "Could improve explanation of complex architectural decisions",
        "Consider more edge cases when solving problems",
        "Work on time management during technical explanations",
      ],
      questionAnalysis: [
        {
          questionId: "q1",
          question:
            "Can you explain the difference between 'let', 'const', and 'var' in JavaScript?",
          userAnswer:
            "Your answer demonstrated good understanding of JavaScript variable declarations...",
          feedback:
            "Excellent explanation of scope and hoisting. You could have mentioned temporal dead zone for completeness.",
          score: 90,
        },
        {
          questionId: "q2",
          question:
            "How would you optimize the performance of a React application?",
          userAnswer:
            "Your answer covered key optimization techniques including memoization...",
          feedback:
            "Good coverage of React.memo, useMemo and useCallback. Consider mentioning code splitting and lazy loading as well.",
          score: 85,
        },
      ],
      transcript: [
        {
          speaker: "interviewer",
          message:
            "Can you explain the difference between 'let', 'const', and 'var' in JavaScript?",
          timestamp: "2023-06-15T14:05:00Z",
        },
        {
          speaker: "candidate",
          message:
            "Sure, the main differences between let, const, and var are in their scoping, hoisting behavior, and reassignment capabilities...",
          timestamp: "2023-06-15T14:05:30Z",
        },
      ],
      recommendations: [
        {
          title: "Advanced React Patterns",
          description:
            "Learn advanced React patterns to improve your component architecture",
          resources: [
            "React Patterns Course",
            "Component Design Best Practices",
          ],
        },
        {
          title: "System Design for Frontend Engineers",
          description:
            "Improve your system design skills for frontend applications",
          resources: [
            "Frontend System Design",
            "Scalable Frontend Architecture",
          ],
        },
      ],
    },
  },
  {
    id: "interview2",
    type: interviewTypes[1], // Backend Developer
    scheduledDate: "2023-06-20T10:00:00Z",
    duration: "60",
    status: "upcoming",
  },
];

// Mock interview questions
const interviewQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    question:
      "Can you explain the difference between 'let', 'const', and 'var' in JavaScript?",
    type: "Conceptual",
    difficulty: "Beginner",
    timeLimit: 5,
  },
  {
    id: "q2",
    question: "How would you optimize the performance of a React application?",
    type: "Technical",
    difficulty: "Intermediate",
    timeLimit: 10,
  },
  {
    id: "q3",
    question:
      "Design a REST API for a social media platform with posts, comments, and likes.",
    type: "System Design",
    difficulty: "Advanced",
    timeLimit: 20,
  },
  {
    id: "q4",
    question: "Implement a function to reverse a linked list.",
    type: "Coding",
    difficulty: "Intermediate",
    timeLimit: 15,
  },
  {
    id: "q5",
    question:
      "Tell me about a time when you had to work with a difficult team member.",
    type: "Behavioral",
    difficulty: "Beginner",
    timeLimit: 8,
  },
];

// Export functions to get data
export function getMockInterviewTypes(): MockInterviewType[] {
  return interviewTypes;
}

export function getBookedInterviews(): BookedInterview[] {
  return bookedInterviews;
}

export function getMockInterviewById(id: string): BookedInterview | undefined {
  return bookedInterviews.find((interview) => interview.id === id);
}

export function getInterviewQuestions(): InterviewQuestion[] {
  return interviewQuestions;
}

export function getInterviewTypeById(
  id: string
): MockInterviewType | undefined {
  return interviewTypes.find((type) => type.id === id);
}
