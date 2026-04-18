export interface InterviewProject {
  id: string
  title: string
  type: "full-project" | "algorithm"
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  description: string
  category: string
  technologies?: string[]
  status: "Available" | "In Progress" | "Completed" | "Graded"
  score?: number
  maxScore: number
  company?: string
  position?: string
  estimatedTime?: string
  requirements?: string[]
  constraints?: string[]
  examples?: Array<{
    input: string
    output: string
    explanation?: string
  }>
  starterCode?: string
  solution?: string
  testCases?: Array<{
    input: string
    expectedOutput: string
    hidden?: boolean
  }>
  files?: Array<{
    name: string
    content: string
    language: string
  }>
  gradingCriteria?: Array<{
    criteria: string
    weight: number
    maxPoints: number
  }>
}

// Mock interview projects data
const mockInterviewProjects: InterviewProject[] = [
  {
    id: "interview-1",
    title: "E-commerce API",
    company: "Amazon",
    position: "Senior Backend Engineer",
    description:
      "Design and implement a RESTful API for an e-commerce platform with product catalog, shopping cart, and order management.",
    type: "full-project",
    category: "Backend",
    difficulty: "Hard",
    duration: "4 hours",
    status: "Available",
    technologies: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
    requirements: [
      "Implement RESTful API endpoints for products, carts, and orders",
      "Include authentication and authorization",
      "Implement proper error handling and validation",
      "Design efficient database schema",
      "Include unit and integration tests",
      "Document the API using Swagger or similar tool",
    ],
    gradingCriteria: [
      { criteria: "API Design", weight: 25, maxPoints: 25 },
      { criteria: "Code Quality", weight: 20, maxPoints: 20 },
      { criteria: "Testing", weight: 15, maxPoints: 15 },
      { criteria: "Documentation", weight: 10, maxPoints: 10 },
      { criteria: "Performance", weight: 15, maxPoints: 15 },
      { criteria: "Security", weight: 15, maxPoints: 15 },
    ],
    maxScore: 100,
  },
  {
    id: "interview-2",
    title: "URL Shortener Service",
    company: "Google",
    position: "Backend Engineer",
    description:
      "Build a URL shortening service similar to bit.ly that can generate short URLs and redirect users to the original URL.",
    type: "full-project",
    category: "Backend",
    difficulty: "Medium",
    duration: "3 hours",
    status: "Available",
    technologies: ["Python", "Flask", "PostgreSQL", "Redis"],
    requirements: [
      "Create short URLs from long URLs",
      "Redirect short URLs to original URLs",
      "Track click analytics",
      "Implement rate limiting",
      "Handle custom aliases",
      "Include proper error handling",
    ],
    gradingCriteria: [
      { criteria: "Functionality", weight: 30, maxPoints: 30 },
      { criteria: "Code Quality", weight: 25, maxPoints: 25 },
      { criteria: "Database Design", weight: 20, maxPoints: 20 },
      { criteria: "Performance", weight: 15, maxPoints: 15 },
      { criteria: "Documentation", weight: 10, maxPoints: 10 },
    ],
    maxScore: 100,
  },
  {
    id: "interview-3",
    title: "Two Sum",
    company: "Meta",
    position: "Software Engineer",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    type: "algorithm",
    category: "Algorithms",
    difficulty: "Easy",
    duration: "45 minutes",
    status: "Available",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    maxScore: 100,
  },
  {
    id: "interview-4",
    title: "Longest Substring Without Repeating Characters",
    company: "Netflix",
    position: "Software Engineer",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    type: "algorithm",
    category: "Algorithms",
    difficulty: "Medium",
    duration: "60 minutes",
    status: "Available",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    maxScore: 100,
  },
  {
    id: "interview-5",
    title: "Chat Application",
    company: "Slack",
    position: "Full Stack Engineer",
    description:
      "Build a real-time chat application with user authentication, message history, and multiple chat rooms.",
    type: "full-project",
    category: "Full Stack",
    difficulty: "Hard",
    duration: "5 hours",
    status: "Available",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
    requirements: [
      "User registration and authentication",
      "Real-time messaging with Socket.io",
      "Multiple chat rooms",
      "Message history persistence",
      "Online user status",
      "Responsive UI design",
    ],
    gradingCriteria: [
      { criteria: "Real-time Features", weight: 25, maxPoints: 25 },
      { criteria: "Frontend Implementation", weight: 20, maxPoints: 20 },
      { criteria: "Backend Architecture", weight: 20, maxPoints: 20 },
      { criteria: "Database Design", weight: 15, maxPoints: 15 },
      { criteria: "User Experience", weight: 10, maxPoints: 10 },
      { criteria: "Code Quality", weight: 10, maxPoints: 10 },
    ],
    maxScore: 100,
  },
  {
    id: "interview-6",
    title: "Merge k Sorted Lists",
    company: "Apple",
    position: "Software Engineer",
    description:
      "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    type: "algorithm",
    category: "Algorithms",
    difficulty: "Hard",
    duration: "75 minutes",
    status: "Available",
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation:
          "The linked-lists are: [1->4->5, 1->3->4, 2->6]. Merging them into one sorted list: 1->1->2->3->4->4->5->6.",
      },
      {
        input: "lists = []",
        output: "[]",
        explanation: "No lists to merge.",
      },
    ],
    constraints: [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4",
      "lists[i] is sorted in ascending order.",
      "The sum of lists[i].length will not exceed 10^4.",
    ],
    maxScore: 100,
  },
  {
    id: "interview-7",
    title: "Task Management System",
    company: "Asana",
    position: "Backend Engineer",
    description: "Design and implement a task management system with projects, tasks, assignments, and notifications.",
    type: "full-project",
    category: "Backend",
    difficulty: "Medium",
    duration: "4 hours",
    status: "Available",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "RabbitMQ"],
    requirements: [
      "Create and manage projects and tasks",
      "Assign tasks to users",
      "Track task status and progress",
      "Implement notification system",
      "Add commenting and file attachments",
      "Include proper authentication and authorization",
    ],
    gradingCriteria: [
      { criteria: "System Design", weight: 25, maxPoints: 25 },
      { criteria: "API Implementation", weight: 25, maxPoints: 25 },
      { criteria: "Database Design", weight: 20, maxPoints: 20 },
      { criteria: "Code Quality", weight: 15, maxPoints: 15 },
      { criteria: "Testing", weight: 15, maxPoints: 15 },
    ],
    maxScore: 100,
  },
  {
    id: "interview-8",
    title: "Valid Parentheses",
    company: "Microsoft",
    position: "Software Engineer",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    type: "algorithm",
    category: "Algorithms",
    difficulty: "Easy",
    duration: "30 minutes",
    status: "Available",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string contains valid parentheses.",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "All brackets are properly closed.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "Mismatched brackets.",
      },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    maxScore: 100,
  },
]

export function getInterviewProjects() {
  return mockInterviewProjects
}

export function getInterviewProjectById(id: string) {
  return mockInterviewProjects.find((project) => project.id === id)
}

export function getInterviewProjectsByType(type: "full-project" | "algorithm") {
  return mockInterviewProjects.filter((project) => project.type === type)
}

export function getInterviewProjectsByDifficulty(difficulty: "Easy" | "Medium" | "Hard") {
  return mockInterviewProjects.filter((project) => project.difficulty === difficulty)
}

export function getInterviewProjectsByCompany(company: string) {
  return mockInterviewProjects.filter((project) => project.company === company)
}
