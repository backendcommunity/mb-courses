export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  joinDate: string;
  title: string;
  badges: Badge[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  thumbnail: string;
  chapters: Chapter[];
  enrolled: boolean;
  rating: number;
  students: number;
  price: number;
  tags: string[];
  longDescription?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  videos: Video[];
  quiz?: Quiz;
  exercise?: Exercise;
  playground?: Playground;
  type: "video" | "quiz" | "exercise" | "playground" | "mixed";
  order: number;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  description: string;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
  attempts: number;
  maxAttempts: number;
  completed: boolean;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
  completed: boolean;
  attempts: number;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
}

export interface Playground {
  id: string;
  title: string;
  description: string;
  language: string;
  files: PlaygroundFile[];
  dependencies: string[];
  completed: boolean;
}

export interface PlaygroundFile {
  id: string;
  name: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
  technologies: string[];
  status: "Not Started" | "In Progress" | "Completed" | "Submitted";
  progress: number;
  dueDate?: string;
  thumbnail: string;
  requirements: string[];
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: "documentation" | "video" | "article" | "code";
  url: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  completed: boolean;
  timeLimit?: string;
  participants: number;
}

export interface Interview {
  id: string;
  title: string;
  type: "System Design" | "Coding" | "Behavioral" | "Technical";
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  score?: number;
  status: "Available" | "In Progress" | "Completed";
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  type: "multiple-choice" | "coding" | "essay";
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

export interface Bootcamp {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  startDate: string;
  enrolled: boolean;
  spots: number;
  spotsLeft: number;
  instructor: string;
  rating: number;
  students: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  projects: string[];
  estimatedTime: string;
  level: string;
  progress: number;
  enrolled: boolean;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  milestones: Milestone[];
  timeframe: string;
  difficulty: string;
  currentMilestone: number;
  progress: number;
  enrolled: boolean;
  completedMilestones: number;
  estimatedTime: string;
  longDescription?: string;
  thumbnail?: string;
  instructor?: string;
  level?: string;
  skills?: string[];
  prerequisites?: string[];
  started?: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  courses: string[];
  projects: string[];
  assessments: string[];
  order: number;
  completed: boolean;
  progress: number;
  duration: string;
}

export interface RoadmapCourse extends Course {
  milestoneId: string;
  order: number;
  requiredForProgress: boolean;
}

export interface RoadmapProject extends Project {
  milestoneId: string;
  order: number;
  requiredForProgress: boolean;
}

export interface RoadmapAssessment {
  id: string;
  title: string;
  description: string;
  type: "quiz" | "project" | "interview";
  duration: string;
  milestoneId: string;
  order: number;
  completed: boolean;
  questions?: QuizQuestion[];
  project?: Project;
  interview?: Interview;
}

// JSON Data Store - All data stored as simple JavaScript objects
export const dataStore = {
  user: {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    level: 8,
    xp: 2450,
    xpToNextLevel: 3200,
    streak: 7,
    joinDate: "2024-01-15",
    title: "Backend Engineer",
    badges: [
      {
        id: "1",
        name: "API Master",
        description: "Completed 10 API projects",
        icon: "🏆",
        earnedDate: "2024-06-01",
        rarity: "Epic" as const,
      },
      {
        id: "2",
        name: "Course Crusher",
        description: "Finished 5 courses this month",
        icon: "📚",
        earnedDate: "2024-06-05",
        rarity: "Rare" as const,
      },
      {
        id: "3",
        name: "Community Helper",
        description: "Helped 25 fellow engineers",
        icon: "🤝",
        earnedDate: "2024-06-10",
        rarity: "Common" as const,
      },
    ],
  },

  courses: [
    {
      id: "1",
      title: "Advanced Node.js Patterns",
      description:
        "Master advanced Node.js concepts including design patterns, performance optimization, and scalability.",
      instructor: "Sarah Johnson",
      duration: "8 hours",
      level: "Advanced" as const,
      progress: 100,
      thumbnail: "/placeholder.svg?height=200&width=300",
      enrolled: true,
      rating: 4.8,
      students: 1250,
      price: 99,
      tags: ["Node.js", "JavaScript", "Backend", "Patterns"],
      longDescription: `This comprehensive course takes you deep into the world of advanced Node.js development patterns and practices. You'll master essential design patterns including Singleton, Factory, Observer, and Strategy patterns, learning how to implement them effectively in Node.js applications.

Throughout this course, you'll explore performance optimization techniques, memory management strategies, and scalable architecture patterns. We'll cover advanced topics like event-driven programming, stream processing, and microservices communication patterns.

By the end of this course, you'll have the skills to build robust, maintainable, and scalable Node.js applications using industry-proven patterns and best practices. You'll understand when and how to apply different patterns, and you'll be able to architect complex backend systems with confidence.

The course includes hands-on projects, real-world examples, and practical exercises that reinforce your learning. You'll work with modern tools and frameworks, and learn debugging and testing strategies for pattern-based code.`,
      chapters: [
        {
          id: "1",
          title: "Introduction to Advanced Patterns",
          description: "Learn the fundamentals of design patterns in Node.js",
          duration: "45 min",
          completed: true,
          type: "mixed" as const,
          order: 1,
          videos: [
            {
              id: "1-1",
              title: "Welcome to Advanced Patterns",
              duration: "5 min",
              completed: true,
              description: "Course overview and what you'll learn",
              order: 1,
            },
            {
              id: "1-2",
              title: "Design Pattern Fundamentals",
              duration: "15 min",
              completed: true,
              description: "Understanding design patterns and their importance",
              order: 2,
            },
            {
              id: "1-3",
              title: "Node.js Architecture Overview",
              duration: "20 min",
              completed: true,
              description: "How Node.js architecture influences pattern choice",
              order: 3,
            },
          ],
          quiz: {
            id: "quiz-1",
            title: "Pattern Fundamentals Quiz",
            description: "Test your understanding of design pattern basics",
            timeLimit: 10,
            passingScore: 80,
            attempts: 1,
            maxAttempts: 3,
            completed: true,
            questions: [
              {
                id: "q1",
                question: "What is the main purpose of design patterns?",
                type: "multiple-choice" as const,
                options: [
                  "To make code more complex",
                  "To provide reusable solutions to common problems",
                  "To slow down development",
                  "To increase memory usage",
                ],
                correctAnswer:
                  "To provide reusable solutions to common problems",
                explanation:
                  "Design patterns provide proven solutions to recurring design problems.",
                points: 25,
              },
              {
                id: "q2",
                question: "Node.js is single-threaded.",
                type: "true-false" as const,
                options: ["True", "False"],
                correctAnswer: "True",
                explanation:
                  "Node.js runs on a single main thread but uses thread pools for I/O operations.",
                points: 25,
              },
            ],
          },
        },
        {
          id: "2",
          title: "Singleton and Factory Patterns",
          description:
            "Deep dive into Singleton and Factory patterns with practical examples",
          duration: "60 min",
          completed: true,
          type: "mixed" as const,
          order: 2,
          videos: [
            {
              id: "2-1",
              title: "Singleton Pattern Explained",
              duration: "20 min",
              completed: true,
              description:
                "Understanding the Singleton pattern and when to use it",
              order: 1,
            },
            {
              id: "2-2",
              title: "Implementing Singleton in Node.js",
              duration: "15 min",
              completed: true,
              description: "Practical implementation with code examples",
              order: 2,
            },
            {
              id: "2-3",
              title: "Factory Pattern Deep Dive",
              duration: "20 min",
              completed: true,
              description: "Factory pattern implementation and use cases",
              order: 3,
            },
          ],
          exercise: {
            id: "exercise-1",
            title: "Implement a Database Connection Singleton",
            description:
              "Create a singleton class for managing database connections",
            difficulty: "Medium" as const,
            language: "javascript",
            starterCode: `class DatabaseConnection {
  constructor() {
    // Your implementation here
  }
  
  static getInstance() {
    // Implement singleton pattern
  }
  
  connect() {
    // Implement connection logic
  }
}

module.exports = DatabaseConnection;`,
            solution: `class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.isConnected = false;
    DatabaseConnection.instance = this;
  }
  
  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  
  connect() {
    if (!this.isConnected) {
      console.log('Connecting to database...');
      this.isConnected = true;
    }
    return this;
  }
}

module.exports = DatabaseConnection;`,
            testCases: [
              {
                id: "test1",
                input:
                  "const db1 = DatabaseConnection.getInstance(); const db2 = DatabaseConnection.getInstance();",
                expectedOutput: "db1 === db2 should be true",
                description: "Two instances should be the same object",
              },
            ],
            hints: [
              "Use a static property to store the instance",
              "Check if instance exists before creating new one",
              "Return the existing instance if it already exists",
            ],
            completed: true,
            attempts: 0,
          },
        },
        {
          id: "3",
          title: "Observer Pattern Implementation",
          description:
            "Learn to implement the Observer pattern for event-driven architecture",
          duration: "50 min",
          completed: true,
          type: "mixed" as const,
          order: 3,
          videos: [
            {
              id: "3-1",
              title: "Observer Pattern Concepts",
              duration: "18 min",
              completed: true,
              description:
                "Understanding the Observer pattern and its benefits",
              order: 1,
            },
            {
              id: "3-2",
              title: "Event Emitters in Node.js",
              duration: "22 min",
              completed: true,
              description: "Using Node.js EventEmitter for Observer pattern",
              order: 2,
            },
          ],
          playground: {
            id: "playground-1",
            title: "Observer Pattern Playground",
            description: "Experiment with Observer pattern implementations",
            language: "javascript",
            files: [
              {
                id: "file1",
                name: "observer.js",
                content: `// Observer Pattern Implementation
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(\`\${this.name} received: \${data}\`);
  }
}

// Try it out
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello World!');`,
                language: "javascript",
              },
              {
                id: "file2",
                name: "eventEmitter.js",
                content: `// Using Node.js EventEmitter
const EventEmitter = require('events');

class NewsAgency extends EventEmitter {
  constructor() {
    super();
    this.news = '';
  }
  
  setNews(news) {
    this.news = news;
    this.emit('news', news);
  }
}

class NewsChannel {
  constructor(name) {
    this.name = name;
  }
  
  update(news) {
    console.log(\`\${this.name} broadcasting: \${news}\`);
  }
}

// Example usage
const agency = new NewsAgency();
const channel1 = new NewsChannel('CNN');
const channel2 = new NewsChannel('BBC');

agency.on('news', (news) => channel1.update(news));
agency.on('news', (news) => channel2.update(news));

agency.setNews('Breaking: New JavaScript framework released!');`,
                language: "javascript",
              },
            ],
            dependencies: ["events"],
            completed: true,
          },
        },
        {
          id: "4",
          title: "Advanced Patterns Assessment",
          description: "Comprehensive quiz covering all patterns learned",
          duration: "20 min",
          completed: true,
          type: "quiz" as const,
          order: 4,
          videos: [],
          quiz: {
            id: "quiz-2",
            title: "Advanced Patterns Final Quiz",
            description:
              "Test your mastery of Singleton, Factory, and Observer patterns",
            timeLimit: 20,
            passingScore: 85,
            attempts: 0,
            maxAttempts: 2,
            completed: true,
            questions: [
              {
                id: "q3",
                question:
                  "Which pattern ensures only one instance of a class exists?",
                type: "multiple-choice" as const,
                options: ["Factory", "Observer", "Singleton", "Strategy"],
                correctAnswer: "Singleton",
                explanation:
                  "The Singleton pattern restricts instantiation to a single instance.",
                points: 20,
              },
              {
                id: "q4",
                question:
                  "The Observer pattern is useful for implementing _____ systems.",
                type: "fill-blank" as const,
                correctAnswer: "event-driven",
                explanation:
                  "Observer pattern is perfect for event-driven architectures.",
                points: 20,
              },
            ],
          },
        },
      ],
    },
    {
      id: "2",
      title: "Microservices Architecture",
      description:
        "Learn to design and implement scalable microservices using modern tools and practices.",
      instructor: "Michael Chen",
      duration: "12 hours",
      level: "Intermediate" as const,
      progress: 30,
      thumbnail: "/placeholder.svg?height=200&width=300",
      enrolled: true,
      rating: 4.9,
      students: 890,
      price: 129,
      tags: ["Microservices", "Docker", "Kubernetes", "Architecture"],
      longDescription: `Dive deep into the world of microservices architecture with this comprehensive course designed for intermediate to advanced developers. Learn how to break down monolithic applications into scalable, maintainable microservices that can be developed, deployed, and scaled independently.

This course covers essential microservices concepts including service decomposition strategies, inter-service communication patterns, data management in distributed systems, and deployment orchestration. You'll master tools like Docker, Kubernetes, API gateways, and service meshes.

We'll explore real-world challenges such as distributed transactions, eventual consistency, circuit breakers, and monitoring distributed systems. You'll learn how to implement robust error handling, implement distributed tracing, and ensure system resilience.

The course includes practical projects where you'll build a complete microservices-based e-commerce platform, implement service discovery, configure load balancing, and set up comprehensive monitoring and logging solutions.

By completion, you'll be equipped to design, implement, and maintain production-ready microservices architectures that can scale to handle millions of users while maintaining high availability and performance.`,
      chapters: [
        {
          id: "1",
          title: "Microservices Fundamentals",
          description:
            "Introduction to microservices architecture and principles",
          duration: "40 min",
          completed: true,
          type: "video" as const,
          order: 1,
          videos: [
            {
              id: "1-1",
              title: "What are Microservices?",
              duration: "20 min",
              completed: true,
              description:
                "Understanding microservices vs monolithic architecture",
              order: 1,
            },
            {
              id: "1-2",
              title: "Benefits and Challenges",
              duration: "20 min",
              completed: true,
              description: "Pros and cons of microservices architecture",
              order: 2,
            },
          ],
        },
        {
          id: "2",
          title: "Service Communication",
          description:
            "Learn different ways services communicate in microservices architecture",
          duration: "55 min",
          completed: false,
          type: "mixed" as const,
          order: 2,
          videos: [
            {
              id: "2-1",
              title: "Synchronous Communication",
              duration: "25 min",
              completed: false,
              description: "REST APIs and gRPC for service communication",
              order: 1,
            },
            {
              id: "2-2",
              title: "Asynchronous Communication",
              duration: "30 min",
              completed: false,
              description: "Message queues and event-driven communication",
              order: 2,
            },
          ],
          exercise: {
            id: "exercise-2",
            title: "Build a Simple API Gateway",
            description:
              "Create an API gateway to route requests to different services",
            difficulty: "Medium" as const,
            language: "javascript",
            starterCode: `const express = require('express');
const httpProxy = require('http-proxy-middleware');

const app = express();

// Configure routes to different services
// Your implementation here

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});`,
            solution: `const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// User service proxy
app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/users'
  }
}));

// Product service proxy
app.use('/api/products', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/products': '/products'
  }
}));

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});`,
            testCases: [
              {
                id: "test1",
                input: "GET /api/users",
                expectedOutput: "Should proxy to user service on port 3001",
                description: "User service routing test",
              },
            ],
            hints: [
              "Use http-proxy-middleware for routing",
              "Configure different target ports for each service",
              "Use pathRewrite to modify the request path",
            ],
            completed: false,
            attempts: 0,
          },
        },
      ],
    },
    {
      id: "3",
      title: "Database Design Mastery",
      description:
        "Complete guide to database design, optimization, and scaling strategies.",
      instructor: "Emily Rodriguez",
      duration: "10 hours",
      level: "Intermediate" as const,
      progress: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      enrolled: false,
      rating: 4.7,
      students: 2100,
      price: 89,
      tags: ["Database", "SQL", "NoSQL", "Design"],
      longDescription: `Master the art and science of database design with this comprehensive course covering both SQL and NoSQL database systems. Learn how to design efficient, scalable, and maintainable database schemas that can handle complex business requirements and high-traffic applications.

This course covers fundamental database design principles including normalization, denormalization, indexing strategies, and query optimization. You'll explore advanced topics like database sharding, replication, backup strategies, and disaster recovery planning.

We'll dive deep into both relational databases (PostgreSQL, MySQL) and NoSQL solutions (MongoDB, Redis, Cassandra), learning when to use each type and how to design optimal data models for different use cases. You'll master advanced SQL techniques, stored procedures, triggers, and database security best practices.

The course includes hands-on projects where you'll design databases for real-world scenarios including e-commerce platforms, social media applications, and analytics systems. You'll learn performance tuning, monitoring, and troubleshooting techniques.

By the end of this course, you'll be able to architect database solutions that can scale from startup to enterprise level, ensuring data integrity, optimal performance, and robust security throughout the application lifecycle.`,
      chapters: [],
    },
    {
      id: "4",
      title: "System Design Fundamentals",
      description:
        "Learn how to design scalable, reliable, and maintainable systems.",
      instructor: "Alex Wong",
      duration: "15 hours",
      level: "Advanced" as const,
      progress: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      enrolled: false,
      rating: 4.9,
      students: 1800,
      price: 149,
      tags: ["System Design", "Architecture", "Scalability", "Performance"],
      longDescription: `This comprehensive course teaches you how to design large-scale distributed systems that are scalable, reliable, and maintainable. You'll learn the fundamental principles and patterns used by top tech companies to build systems that can handle millions of users.

The course covers key topics including load balancing, caching strategies, database sharding, consistent hashing, CAP theorem, microservices architecture, and API design. You'll learn how to make critical design decisions and trade-offs based on system requirements and constraints.

Through real-world case studies and hands-on design exercises, you'll analyze and design systems similar to those used by companies like Google, Amazon, and Netflix. You'll learn how to approach system design interviews and communicate your design decisions effectively.

By the end of this course, you'll have the skills to design robust distributed systems and confidently tackle system design interviews at top tech companies.`,
      chapters: [
        {
          id: "1",
          title: "Introduction to System Design",
          description:
            "Learn the fundamentals of system design and why it matters",
          duration: "60 min",
          completed: false,
          type: "video" as const,
          order: 1,
          videos: [
            {
              id: "1-1",
              title: "What is System Design?",
              duration: "15 min",
              completed: false,
              description: "Understanding the importance of system design",
              order: 1,
            },
            {
              id: "1-2",
              title: "System Design Process",
              duration: "20 min",
              completed: false,
              description: "Step-by-step approach to designing systems",
              order: 2,
            },
            {
              id: "1-3",
              title: "Key Components of Distributed Systems",
              duration: "25 min",
              completed: false,
              description:
                "Overview of components in modern distributed systems",
              order: 3,
            },
          ],
        },
        {
          id: "2",
          title: "Scalability Concepts",
          description:
            "Learn how to design systems that can scale to millions of users",
          duration: "90 min",
          completed: false,
          type: "mixed" as const,
          order: 2,
          videos: [
            {
              id: "2-1",
              title: "Vertical vs Horizontal Scaling",
              duration: "20 min",
              completed: false,
              description: "Understanding different scaling approaches",
              order: 1,
            },
            {
              id: "2-2",
              title: "Load Balancing Strategies",
              duration: "25 min",
              completed: false,
              description: "Techniques for distributing traffic across servers",
              order: 2,
            },
            {
              id: "2-3",
              title: "Database Scaling",
              duration: "30 min",
              completed: false,
              description: "Strategies for scaling databases",
              order: 3,
            },
          ],
          quiz: {
            id: "quiz-sd1",
            title: "Scalability Concepts Quiz",
            description: "Test your understanding of system scalability",
            timeLimit: 15,
            passingScore: 80,
            attempts: 0,
            maxAttempts: 3,
            completed: false,
            questions: [
              {
                id: "q1",
                question:
                  "Which scaling approach involves adding more machines to your pool of resources?",
                type: "multiple-choice" as const,
                options: [
                  "Vertical Scaling",
                  "Horizontal Scaling",
                  "Diagonal Scaling",
                  "Perpendicular Scaling",
                ],
                correctAnswer: "Horizontal Scaling",
                explanation:
                  "Horizontal scaling (scaling out) involves adding more machines to your resource pool.",
                points: 25,
              },
              {
                id: "q2",
                question:
                  "Which load balancing algorithm distributes requests based on the current server load?",
                type: "multiple-choice" as const,
                options: [
                  "Round Robin",
                  "Least Connections",
                  "IP Hash",
                  "Random",
                ],
                correctAnswer: "Least Connections",
                explanation:
                  "Least Connections routes traffic to the server with the fewest active connections.",
                points: 25,
              },
            ],
          },
        },
      ],
    },
    {
      id: "5",
      title: "API Design and Development",
      description:
        "Master the art of designing and building robust, scalable APIs.",
      instructor: "Maria Garcia",
      duration: "10 hours",
      level: "Intermediate" as const,
      progress: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      enrolled: false,
      rating: 4.8,
      students: 1500,
      price: 99,
      tags: ["API", "REST", "GraphQL", "Backend"],
      longDescription: `This comprehensive course teaches you how to design, build, and maintain high-quality APIs that developers love to use. You'll learn best practices for creating intuitive, consistent, and well-documented APIs that power modern applications.

The course covers both REST and GraphQL API design patterns, authentication strategies, versioning approaches, and error handling. You'll learn how to design APIs that are secure, performant, and easy to evolve over time.

Through hands-on projects, you'll build real-world APIs using Node.js, Express, and popular API frameworks. You'll implement authentication, rate limiting, caching, and comprehensive documentation using tools like Swagger/OpenAPI.

By the end of this course, you'll have the skills to design and implement professional-grade APIs that meet the needs of your users and stand the test of time.`,
      chapters: [
        {
          id: "1",
          title: "API Design Fundamentals",
          description: "Learn the core principles of good API design",
          duration: "60 min",
          completed: false,
          type: "video" as const,
          order: 1,
          videos: [
            {
              id: "1-1",
              title: "What Makes a Good API?",
              duration: "15 min",
              completed: false,
              description: "Understanding the qualities of well-designed APIs",
              order: 1,
            },
            {
              id: "1-2",
              title: "API Design Patterns",
              duration: "25 min",
              completed: false,
              description: "Common patterns and best practices in API design",
              order: 2,
            },
            {
              id: "1-3",
              title: "REST vs GraphQL",
              duration: "20 min",
              completed: false,
              description: "Comparing different API architectural styles",
              order: 3,
            },
          ],
        },
        {
          id: "2",
          title: "Building RESTful APIs",
          description:
            "Learn how to implement RESTful APIs with best practices",
          duration: "90 min",
          completed: false,
          type: "mixed" as const,
          order: 2,
          videos: [
            {
              id: "2-1",
              title: "RESTful Resource Design",
              duration: "25 min",
              completed: false,
              description: "How to design resources and endpoints",
              order: 1,
            },
            {
              id: "2-2",
              title: "HTTP Methods and Status Codes",
              duration: "20 min",
              completed: false,
              description: "Using HTTP methods and status codes correctly",
              order: 2,
            },
            {
              id: "2-3",
              title: "Implementing CRUD Operations",
              duration: "30 min",
              completed: false,
              description:
                "Building Create, Read, Update, Delete functionality",
              order: 3,
            },
          ],
          exercise: {
            id: "exercise-api1",
            title: "Build a RESTful API",
            description: "Create a simple RESTful API for a blog platform",
            difficulty: "Medium" as const,
            language: "javascript",
            starterCode: `const express = require('express');
const app = express();
app.use(express.json());

// Define your blog post routes here
// GET /posts - List all posts
// GET /posts/:id - Get a specific post
// POST /posts - Create a new post
// PUT /posts/:id - Update a post
// DELETE /posts/:id - Delete a post

app.listen(3000, () => {
  console.log('API server running on port 3000');
});`,
            solution: `const express = require('express');
const app = express();
app.use(express.json());

// In-memory database
let posts = [
  { id: 1, title: 'First Post', content: 'Hello world!', author: 'John' }
];
let nextId = 2;

// GET /posts - List all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET /posts/:id - Get a specific post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// POST /posts - Create a new post
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const post = { id: nextId++, title, content, author };
  posts.push(post);
  res.status(201).json(post);
});

// PUT /posts/:id - Update a post
app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  
  const { title, content, author } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (author) post.author = author;
  
  res.json(post);
});

// DELETE /posts/:id - Delete a post
app.delete('/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });
  
  posts.splice(index, 1);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});`,
            testCases: [
              {
                id: "test1",
                input: "GET /posts",
                expectedOutput: "Array of posts",
                description: "Should return all posts",
              },
              {
                id: "test2",
                input:
                  "POST /posts with { title: 'Test', content: 'Content', author: 'User' }",
                expectedOutput: "New post object with ID",
                description: "Should create a new post",
              },
            ],
            hints: [
              "Use Express route parameters to get the post ID",
              "Remember to validate incoming data",
              "Use appropriate HTTP status codes for responses",
            ],
            completed: false,
            attempts: 0,
          },
        },
      ],
    },
  ],

  projects: [
    {
      id: "1",
      title: "E-commerce API",
      description:
        "Build a complete e-commerce REST API with authentication, product management, and order processing.",
      difficulty: "Medium" as const,
      estimatedTime: "2-3 weeks",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      status: "In Progress" as const,
      progress: 60,
      dueDate: "2024-06-15",
      thumbnail: "/placeholder.svg?height=200&width=300",
      requirements: [
        "User authentication and authorization",
        "Product CRUD operations",
        "Shopping cart functionality",
        "Order management system",
        "Payment integration",
      ],
      resources: [
        {
          id: "1",
          title: "Express.js Documentation",
          type: "documentation" as const,
          url: "https://expressjs.com",
        },
        {
          id: "2",
          title: "MongoDB Tutorial",
          type: "video" as const,
          url: "/tutorial-mongodb",
        },
      ],
    },
    {
      id: "2",
      title: "Real-time Chat Application",
      description:
        "Create a scalable real-time chat application using WebSockets and modern backend technologies.",
      difficulty: "Hard" as const,
      estimatedTime: "3-4 weeks",
      technologies: ["Node.js", "Socket.io", "Redis", "PostgreSQL"],
      status: "Not Started" as const,
      progress: 0,
      dueDate: "2024-06-15",
      thumbnail: "/placeholder.svg?height=200&width=300",
      requirements: [
        "Real-time messaging",
        "User presence indicators",
        "Message history",
        "File sharing",
        "Group chat functionality",
      ],
      resources: [],
    },
    {
      id: "3",
      title: "Microservices Demo Platform",
      description:
        "Build a demonstration platform showcasing microservices architecture with multiple services.",
      difficulty: "Hard" as const,
      estimatedTime: "4-6 weeks",
      technologies: [
        "Node.js",
        "Docker",
        "Kubernetes",
        "API Gateway",
        "Message Queue",
      ],
      status: "Not Started" as const,
      progress: 0,
      dueDate: "2024-07-30",
      thumbnail: "/placeholder.svg?height=200&width=300",
      requirements: [
        "Multiple independent services",
        "Service discovery",
        "API gateway implementation",
        "Inter-service communication",
        "Containerization and orchestration",
        "Monitoring and logging",
      ],
      resources: [
        {
          id: "1",
          title: "Docker Documentation",
          type: "documentation" as const,
          url: "https://docs.docker.com",
        },
        {
          id: "2",
          title: "Kubernetes Basics",
          type: "documentation" as const,
          url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
        },
      ],
    },
    {
      id: "4",
      title: "Distributed Database System",
      description:
        "Design and implement a distributed database system with sharding and replication.",
      difficulty: "Hard" as const,
      estimatedTime: "5-7 weeks",
      technologies: ["Go", "Raft Consensus", "gRPC", "Distributed Systems"],
      status: "Not Started" as const,
      progress: 0,
      dueDate: "2024-08-15",
      thumbnail: "/placeholder.svg?height=200&width=300",
      requirements: [
        "Data sharding strategy",
        "Replication for fault tolerance",
        "Consensus algorithm implementation",
        "Distributed transaction support",
        "Recovery mechanisms",
        "Performance benchmarking",
      ],
      resources: [
        {
          id: "1",
          title: "Raft Consensus Algorithm",
          type: "documentation" as const,
          url: "https://raft.github.io/",
        },
        {
          id: "2",
          title: "Distributed Systems Principles",
          type: "article" as const,
          url: "/articles/distributed-systems",
        },
      ],
    },
  ],

  challenges: [
    {
      id: "1",
      title: "Database Optimization Challenge",
      description:
        "Optimize slow database queries and improve performance by 50%",
      xpReward: 250,
      difficulty: "Hard" as const,
      category: "Database",
      completed: false,
      timeLimit: "2 hours",
      participants: 156,
    },
    {
      id: "2",
      title: "API Rate Limiting",
      description: "Implement efficient rate limiting for a high-traffic API",
      xpReward: 150,
      difficulty: "Medium" as const,
      category: "API Design",
      completed: true,
      timeLimit: "1 hour",
      participants: 234,
    },
  ],

  interviews: [
    {
      id: "1",
      title: "System Design Interview",
      type: "System Design" as const,
      difficulty: "Hard" as const,
      duration: "45 minutes",
      status: "Available" as const,
      description: "Design a scalable URL shortening service like bit.ly",
      questions: [
        {
          id: "1",
          question:
            "How would you design the database schema for a URL shortening service?",
          type: "essay" as const,
          points: 25,
        },
        {
          id: "2",
          question: "What caching strategy would you implement?",
          type: "essay" as const,
          points: 25,
        },
      ],
    },
    {
      id: "2",
      title: "Algorithm Challenge",
      type: "Coding" as const,
      difficulty: "Medium" as const,
      duration: "30 minutes",
      score: 85,
      status: "Completed" as const,
      description:
        "Solve algorithmic problems commonly asked in backend interviews",
      questions: [
        {
          id: "1",
          question: "Implement a LRU Cache",
          type: "coding" as const,
          points: 50,
        },
      ],
    },
  ],

  bootcamps: [
    {
      id: "1",
      title: "Full-Stack Backend Bootcamp",
      description:
        "Intensive 12-week program covering Node.js, databases, APIs, and deployment",
      duration: "12 weeks",
      level: "Intermediate" as const,
      price: 2999,
      startDate: "2024-07-01",
      enrolled: false,
      spots: 25,
      spotsLeft: 8,
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 156,
    },
    {
      id: "2",
      title: "Microservices Mastery Bootcamp",
      description:
        "Advanced 8-week bootcamp on microservices architecture and cloud deployment",
      duration: "8 weeks",
      level: "Advanced" as const,
      price: 3499,
      startDate: "2024-08-15",
      enrolled: true,
      spots: 20,
      spotsLeft: 3,
      instructor: "Michael Chen",
      rating: 4.8,
      students: 89,
    },
  ],

  learningPaths: [
    {
      id: "1",
      title: "Backend Engineer Career Path",
      description: "Complete journey from beginner to senior backend engineer",
      courses: ["1", "2", "3"],
      projects: ["1", "2"],
      estimatedTime: "6 months",
      level: "Beginner to Advanced",
      progress: 45,
      enrolled: true,
    },
    {
      id: "2",
      title: "DevOps Integration Path",
      description:
        "Learn to integrate DevOps practices with backend development",
      courses: ["2", "4"],
      projects: ["3"],
      estimatedTime: "4 months",
      level: "Intermediate",
      progress: 0,
      enrolled: false,
    },
    {
      id: "3",
      title: "Microservices Architecture Path",
      description: "Master microservices design patterns and implementation",
      courses: ["2", "5"],
      projects: ["2", "4"],
      estimatedTime: "5 months",
      level: "Advanced",
      progress: 20,
      enrolled: true,
    },
    {
      id: "4",
      title: "API Design & Development Path",
      description: "Become an expert in REST, GraphQL, and API best practices",
      courses: ["1", "6"],
      projects: ["1", "5"],
      estimatedTime: "3 months",
      level: "Intermediate",
      progress: 0,
      enrolled: false,
    },
    {
      id: "5",
      title: "Database Mastery Path",
      description: "Deep dive into SQL, NoSQL, and database optimization",
      courses: ["3", "7"],
      projects: ["6"],
      estimatedTime: "4 months",
      level: "Intermediate to Advanced",
      progress: 0,
      enrolled: false,
    },
    {
      id: "6",
      title: "Cloud Backend Engineer Path",
      description:
        "Learn cloud-native backend development with AWS, Azure, and GCP",
      courses: ["8", "9"],
      projects: ["7", "8"],
      estimatedTime: "6 months",
      level: "Advanced",
      progress: 0,
      enrolled: false,
    },
  ],

  roadmaps: [
    {
      id: "1",
      title: "Backend Engineer Career Roadmap",
      description:
        "Step-by-step roadmap to advance your backend engineering career",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Sarah Johnson",
      level: "Beginner to Advanced",
      progress: 40,
      enrolled: true,
      started: true,
      timeframe: "12-18 months",
      difficulty: "Progressive",
      currentMilestone: 2,
      completedMilestones: 1,
      estimatedTime: "8-10 months remaining",
      skills: [
        "Node.js",
        "Express",
        "Databases",
        "API Design",
        "System Architecture",
        "Microservices",
        "DevOps",
        "Cloud Platforms",
      ],
      prerequisites: [
        "Basic JavaScript knowledge",
        "Understanding of web technologies",
        "Problem-solving skills",
      ],
      longDescription: `This comprehensive roadmap guides you through the journey from a beginner to a senior backend engineer. It's designed to build your skills progressively, focusing on both theoretical knowledge and practical implementation.

You'll start with the fundamentals of backend development, including server-side programming, databases, and API design. As you progress, you'll tackle more advanced topics like system design, microservices architecture, and distributed systems.

The roadmap includes hands-on projects that simulate real-world scenarios, allowing you to apply what you've learned and build a portfolio of work. You'll also prepare for technical interviews and learn how to communicate complex technical concepts effectively.

By following this roadmap, you'll develop the skills and confidence needed to excel in backend engineering roles at top companies.`,
      milestones: [
        {
          id: "m1",
          title: "Backend Fundamentals",
          description: "Master core backend technologies and concepts",
          courses: ["1"],
          projects: ["1"],
          assessments: ["a1"],
          order: 1,
          completed: true,
          progress: 100,
          duration: "2-3 months",
        },
        {
          id: "m2",
          title: "Production Applications",
          description: "Build and deploy real-world applications",
          courses: ["2"],
          projects: ["2"],
          assessments: ["a2"],
          order: 2,
          completed: false,
          progress: 65,
          duration: "3-4 months",
        },
        {
          id: "m3",
          title: "System Design",
          description: "Learn to design scalable systems",
          courses: ["4"],
          projects: ["3"],
          assessments: ["a3"],
          order: 3,
          completed: false,
          progress: 0,
          duration: "4-6 months",
        },
        {
          id: "m4",
          title: "Advanced Technologies",
          description: "Explore cutting-edge backend technologies",
          courses: ["5"],
          projects: ["4"],
          assessments: ["a4"],
          order: 4,
          completed: false,
          progress: 0,
          duration: "3-4 months",
        },
        {
          id: "m5",
          title: "Leadership Skills",
          description: "Develop technical leadership abilities",
          courses: [],
          projects: [],
          assessments: ["a5"],
          order: 5,
          completed: false,
          progress: 0,
          duration: "6+ months",
        },
      ],
    },
    {
      id: "2",
      title: "Backend to Full-Stack Engineer",
      description: "Expand your skills to become a full-stack developer",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Michael Chen",
      level: "Intermediate",
      progress: 0,
      enrolled: false,
      timeframe: "8-12 months",
      difficulty: "Intermediate",
      currentMilestone: 0,
      completedMilestones: 0,
      estimatedTime: "8-12 months",
      milestones: [
        {
          id: "m1",
          title: "Master backend fundamentals",
          description: "Ensure solid backend engineering foundation",
          courses: ["1", "3"],
          projects: [],
          assessments: [],
          order: 1,
          completed: false,
          progress: 0,
          duration: "2-3 months",
        },
        {
          id: "m2",
          title: "Learn frontend frameworks",
          description: "Master modern frontend technologies",
          courses: [],
          projects: [],
          assessments: [],
          order: 2,
          completed: false,
          progress: 0,
          duration: "2-3 months",
        },
        {
          id: "m3",
          title: "Build full-stack applications",
          description: "Create end-to-end applications",
          courses: [],
          projects: [],
          assessments: [],
          order: 3,
          completed: false,
          progress: 0,
          duration: "2-3 months",
        },
        {
          id: "m4",
          title: "Deploy to production",
          description: "Learn CI/CD and deployment strategies",
          courses: [],
          projects: [],
          assessments: [],
          order: 4,
          completed: false,
          progress: 0,
          duration: "1-2 months",
        },
        {
          id: "m5",
          title: "Land full-stack role",
          description: "Prepare for interviews and job search",
          courses: [],
          projects: [],
          assessments: [],
          order: 5,
          completed: false,
          progress: 0,
          duration: "1-2 months",
        },
      ],
    },
    {
      id: "3",
      title: "Backend Engineer to Tech Lead",
      description:
        "Transition from individual contributor to technical leadership",
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Emily Rodriguez",
      level: "Advanced",
      progress: 20,
      enrolled: true,
      timeframe: "18-24 months",
      difficulty: "Advanced",
      currentMilestone: 1,
      completedMilestones: 0,
      estimatedTime: "18-24 months",
      milestones: [
        {
          id: "m1",
          title: "Master advanced backend concepts",
          description: "Deepen technical expertise",
          courses: ["4", "5"],
          projects: [],
          assessments: [],
          order: 1,
          completed: false,
          progress: 40,
          duration: "4-6 months",
        },
        {
          id: "m2",
          title: "Lead technical projects",
          description: "Learn project management and leadership",
          courses: [],
          projects: [],
          assessments: [],
          order: 2,
          completed: false,
          progress: 0,
          duration: "4-6 months",
        },
        {
          id: "m3",
          title: "Mentor junior developers",
          description: "Develop coaching and mentoring skills",
          courses: [],
          projects: [],
          assessments: [],
          order: 3,
          completed: false,
          progress: 0,
          duration: "3-4 months",
        },
        {
          id: "m4",
          title: "Design system architecture",
          description: "Lead system design and architecture decisions",
          courses: [],
          projects: [],
          assessments: [],
          order: 4,
          completed: false,
          progress: 0,
          duration: "4-6 months",
        },
        {
          id: "m5",
          title: "Secure tech lead position",
          description: "Interview preparation and career advancement",
          courses: [],
          projects: [],
          assessments: [],
          order: 5,
          completed: false,
          progress: 0,
          duration: "2-3 months",
        },
      ],
    },
  ],

  roadmapAssessments: [
    {
      id: "a1",
      title: "Backend Fundamentals Assessment",
      description:
        "Comprehensive assessment of backend development fundamentals",
      type: "quiz",
      duration: "45 minutes",
      milestoneId: "m1",
      order: 1,
      completed: true,
      questions: [
        {
          id: "qa1",
          question: "Which of the following is NOT a core Node.js module?",
          type: "multiple-choice",
          options: ["fs", "http", "path", "express"],
          correctAnswer: "express",
          explanation:
            "Express is a third-party framework, not a core Node.js module.",
          points: 10,
        },
        {
          id: "qa2",
          question: "What does the 'use strict' directive do in JavaScript?",
          type: "multiple-choice",
          options: [
            "Enables strict type checking",
            "Enforces stricter parsing and error handling",
            "Increases performance",
            "Enables new ES6 features",
          ],
          correctAnswer: "Enforces stricter parsing and error handling",
          explanation:
            "Strict mode enforces stricter parsing and error handling, catching common coding mistakes and 'unsafe' actions.",
          points: 10,
        },
      ],
    },
    {
      id: "a2",
      title: "Microservices Architecture Project",
      description: "Build a simple microservices-based application",
      type: "project",
      duration: "2 weeks",
      milestoneId: "m2",
      order: 1,
      completed: false,
      project: {
        id: "p2",
        title: "Microservices Demo",
        description:
          "Create a simple microservices architecture with 3 services",
        difficulty: "Medium",
        estimatedTime: "2 weeks",
        technologies: ["Node.js", "Docker", "Express", "MongoDB"],
        status: "In Progress",
        progress: 65,
        requirements: [
          "User service for authentication",
          "Product service for catalog management",
          "Order service for processing orders",
          "API Gateway for routing requests",
          "Service discovery mechanism",
        ],
        resources: [],
      },
    },
    {
      id: "a3",
      title: "System Design Interview",
      description: "Mock system design interview with feedback",
      type: "interview",
      duration: "60 minutes",
      milestoneId: "m3",
      order: 1,
      completed: false,
      interview: {
        id: "i1",
        title: "System Design Interview Practice",
        type: "System Design",
        difficulty: "Hard",
        duration: "60 minutes",
        status: "Available",
        description:
          "Design a distributed file storage system like Dropbox or Google Drive",
        questions: [
          {
            id: "q1",
            question:
              "How would you handle file synchronization across multiple devices?",
            type: "essay",
            points: 25,
          },
          {
            id: "q2",
            question: "Design the database schema for storing file metadata",
            type: "essay",
            points: 25,
          },
          {
            id: "q3",
            question: "How would you handle large file uploads efficiently?",
            type: "essay",
            points: 25,
          },
        ],
      },
    },
    {
      id: "a4",
      title: "Advanced Backend Technologies Quiz",
      description: "Test your knowledge of cutting-edge backend technologies",
      type: "quiz",
      duration: "30 minutes",
      milestoneId: "m4",
      order: 1,
      completed: false,
      questions: [
        {
          id: "qa3",
          question:
            "Which of the following is NOT a benefit of GraphQL over REST?",
          type: "multiple-choice",
          options: [
            "Reduced network requests",
            "Strongly typed schema",
            "Better caching",
            "Client-specified queries",
          ],
          correctAnswer: "Better caching",
          explanation:
            "REST actually has better built-in caching mechanisms compared to GraphQL.",
          points: 10,
        },
        {
          id: "qa4",
          question: "What is the primary purpose of Kubernetes?",
          type: "multiple-choice",
          options: [
            "Container creation",
            "Container orchestration",
            "Application development",
            "Database management",
          ],
          correctAnswer: "Container orchestration",
          explanation:
            "Kubernetes is a container orchestration platform that automates deployment, scaling, and management of containerized applications.",
          points: 10,
        },
      ],
    },
    {
      id: "a5",
      title: "Technical Leadership Assessment",
      description: "Evaluate your technical leadership and mentoring skills",
      type: "interview",
      duration: "45 minutes",
      milestoneId: "m5",
      order: 1,
      completed: false,
      interview: {
        id: "i2",
        title: "Technical Leadership Interview",
        type: "Behavioral",
        difficulty: "Hard",
        duration: "45 minutes",
        status: "Available",
        description:
          "Assess your ability to lead technical teams and mentor junior developers",
        questions: [
          {
            id: "q4",
            question:
              "Describe a situation where you had to make a difficult technical decision with limited information",
            type: "essay",
            points: 25,
          },
          {
            id: "q5",
            question:
              "How would you approach mentoring a junior developer who is struggling with a complex task?",
            type: "essay",
            points: 25,
          },
          {
            id: "q6",
            question:
              "Describe how you would lead a technical project from conception to delivery",
            type: "essay",
            points: 25,
          },
        ],
      },
    },
  ],

  roadmapCourses: [
    {
      id: "rc1",
      courseId: "1",
      milestoneId: "m1",
      order: 1,
      requiredForProgress: true,
    },
    {
      id: "rc2",
      courseId: "2",
      milestoneId: "m2",
      order: 1,
      requiredForProgress: true,
    },
    {
      id: "rc3",
      courseId: "4",
      milestoneId: "m3",
      order: 1,
      requiredForProgress: true,
    },
    {
      id: "rc4",
      courseId: "5",
      milestoneId: "m4",
      order: 1,
      requiredForProgress: true,
    },
  ],

  roadmapProjects: [
    {
      id: "rp1",
      projectId: "1",
      milestoneId: "m1",
      order: 2,
      requiredForProgress: true,
    },
    {
      id: "rp2",
      projectId: "2",
      milestoneId: "m2",
      order: 2,
      requiredForProgress: true,
    },
    {
      id: "rp3",
      projectId: "3",
      milestoneId: "m3",
      order: 2,
      requiredForProgress: true,
    },
    {
      id: "rp4",
      projectId: "4",
      milestoneId: "m4",
      order: 2,
      requiredForProgress: true,
    },
  ],
};

// Helper functions to work with the JSON data store
export const getUser = () => dataStore.user;
export const getCourses = () => dataStore.courses;
export const getProjects = () => dataStore.projects;
export const getChallenges = () => dataStore.challenges;
export const getInterviews = () => dataStore.interviews;
export const getBootcamps = () => dataStore.bootcamps;
export const getLearningPaths = () => dataStore.learningPaths;
export const getRoadmaps = () => dataStore.roadmaps;
export const getRoadmapAssessments = () => dataStore.roadmapAssessments;
export const getRoadmapCourses = () => dataStore.roadmapCourses;
export const getRoadmapProjects = () => dataStore.roadmapProjects;

export const getRoadmapById = (id: string) =>
  dataStore.roadmaps.find((r) => r.id === id);
export const getRoadmapMilestones = (roadmapId: string) => {
  const roadmap = getRoadmapById(roadmapId);
  return roadmap ? roadmap.milestones : [];
};

export const getRoadmapMilestoneById = (
  roadmapId: string,
  milestoneId: string
) => {
  const milestones = getRoadmapMilestones(roadmapId);
  return milestones.find((m) => m.id === milestoneId);
};

export const getRoadmapCoursesByMilestone = (milestoneId: string) => {
  const roadmapCourses = dataStore.roadmapCourses.filter(
    (rc) => rc.milestoneId === milestoneId
  );
  return roadmapCourses
    .map((rc) => {
      const course = dataStore.courses.find((c) => c.id === rc.courseId);
      return {
        ...course,
        milestoneId,
        order: rc.order,
        requiredForProgress: rc.requiredForProgress,
      };
    })
    .filter(Boolean) as RoadmapCourse[];
};

export const getRoadmapProjectsByMilestone = (milestoneId: string) => {
  const roadmapProjects = dataStore.roadmapProjects.filter(
    (rp) => rp.milestoneId === milestoneId
  );
  return roadmapProjects
    .map((rp) => {
      const project = dataStore.projects.find((p) => p.id === rp.projectId);
      return {
        ...project,
        milestoneId,
        order: rp.order,
        requiredForProgress: rp.requiredForProgress,
      };
    })
    .filter(Boolean) as RoadmapProject[];
};

export const getRoadmapAssessmentsByMilestone = (milestoneId: string) => {
  return dataStore.roadmapAssessments.filter(
    (a) => a.milestoneId === milestoneId
  );
};

export const getCourseById = (id: string) =>
  dataStore.courses.find((c) => c.id === id);
export const getProjectById = (id: string) =>
  dataStore.projects.find((p) => p.id === id);
export const getChallengeById = (id: string) =>
  dataStore.challenges.find((c) => c.id === id);
export const getInterviewById = (id: string) =>
  dataStore.interviews.find((i) => i.id === id);
export const getBootcampById = (id: string) =>
  dataStore.bootcamps.find((b) => b.id === id);
export const getLearningPathById = (id: string) =>
  dataStore.learningPaths.find((lp) => lp.id === id);

export const getCourseChapters = (courseId: string) => {
  const course = getCourseById(courseId);
  return course ? course.chapters : [];
};

export const getCourseChapterById = (courseId: string, chapterId: string) => {
  const chapters = getCourseChapters(courseId);
  return chapters.find((c) => c.id === chapterId);
};

export const getCourseQuizzes = (courseId: string) => {
  const chapters = getCourseChapters(courseId);
  return chapters
    .filter((c) => c.quiz)
    .map((c) => c.quiz)
    .filter(Boolean) as Quiz[];
};

export const getCourseExercises = (courseId: string) => {
  const chapters = getCourseChapters(courseId);
  return chapters
    .filter((c) => c.exercise)
    .map((c) => c.exercise)
    .filter(Boolean) as Exercise[];
};

export const getCoursePlaygrounds = (courseId: string) => {
  const chapters = getCourseChapters(courseId);
  return chapters
    .filter((c) => c.playground)
    .map((c) => c.playground)
    .filter(Boolean) as Playground[];
};

export const getCourseProjects = (courseId: string) => {
  // For now, return all projects - in a real app, you'd filter by course
  return dataStore.projects;
};

export const getQuizById = (courseId: string, quizId: string) => {
  const quizzes = getCourseQuizzes(courseId);
  return quizzes.find((q) => q.id === quizId);
};

export const getExerciseById = (courseId: string, exerciseId: string) => {
  const exercises = getCourseExercises(courseId);
  return exercises.find((e) => e.id === exerciseId);
};

export const getPlaygroundById = (courseId: string, playgroundId: string) => {
  const playgrounds = getCoursePlaygrounds(courseId);
  return playgrounds.find((p) => p.id === playgroundId);
};

// Update functions (for demo purposes - in a real app, these would update a database)
export const updateCourseProgress = (courseId: string, progress: number) => {
  const course = getCourseById(courseId);
  if (course) {
    course.progress = progress;
  }
};

export const markChapterComplete = (courseId: string, chapterId: string) => {
  const chapter = getCourseChapterById(courseId, chapterId);
  if (chapter) {
    chapter.completed = true;
  }
};

export const markVideoComplete = (
  courseId: string,
  chapterId: string,
  videoId: string
) => {
  const chapter = getCourseChapterById(courseId, chapterId);
  if (chapter) {
    const video = chapter.videos.find((v) => v.id === videoId);
    if (video) {
      video.completed = true;
    }
  }
};

export const submitQuizAttempt = (
  courseId: string,
  quizId: string,
  score: number
) => {
  const quiz = getQuizById(courseId, quizId);
  if (quiz) {
    quiz.attempts += 1;
    quiz.score = score;
    quiz.completed = score >= quiz.passingScore;
  }
};

export const submitExerciseAttempt = (
  courseId: string,
  exerciseId: string,
  success: boolean
) => {
  const exercise = getExerciseById(courseId, exerciseId);
  if (exercise) {
    exercise.attempts += 1;
    if (success) {
      exercise.completed = true;
    }
  }
};

export const markPlaygroundComplete = (
  courseId: string,
  playgroundId: string
) => {
  const playground = getPlaygroundById(courseId, playgroundId);
  if (playground) {
    playground.completed = true;
  }
};

export const updateProjectProgress = (
  projectId: string,
  progress: number,
  status?: Project["status"]
) => {
  const project = getProjectById(projectId);
  if (project) {
    project.progress = progress;
    if (status) {
      project.status = status;
    }
  }
};

export const enrollInCourse = (courseId: string) => {
  const course = getCourseById(courseId);
  if (course) {
    course.enrolled = true;
  }
};

export const enrollInBootcamp = (bootcampId: string) => {
  const bootcamp = getBootcampById(bootcampId);
  if (bootcamp) {
    bootcamp.enrolled = true;
    bootcamp.spotsLeft -= 1;
  }
};

export const enrollInLearningPath = (pathId: string) => {
  const path = getLearningPathById(pathId);
  if (path) {
    path.enrolled = true;
  }
};

export const enrollInRoadmap = (roadmapId: string) => {
  const roadmap = getRoadmapById(roadmapId);
  if (roadmap) {
    roadmap.enrolled = true;
    roadmap.started = true;
  }
};

export const updateRoadmapProgress = (
  roadmapId: string,
  progress: number,
  currentMilestone?: number
) => {
  const roadmap = getRoadmapById(roadmapId);
  if (roadmap) {
    roadmap.progress = progress;
    if (currentMilestone !== undefined) {
      roadmap.currentMilestone = currentMilestone;
    }
  }
};

export const completeMilestone = (roadmapId: string, milestoneId: string) => {
  const roadmap = getRoadmapById(roadmapId);
  if (roadmap) {
    const milestone = roadmap.milestones.find((m) => m.id === milestoneId);
    if (milestone) {
      milestone.completed = true;
      milestone.progress = 100;
      roadmap.completedMilestones += 1;
    }
  }
};

export const updateUser = (updates: Partial<User>) => {
  Object.assign(dataStore.user, updates);
};

export const updateCourse = (id: string, updates: Partial<Course>) => {
  const course = dataStore.courses.find((c) => c.id === id);
  if (course) {
    Object.assign(course, updates);
  }
};

export const updateProject = (id: string, updates: Partial<Project>) => {
  const project = dataStore.projects.find((p) => p.id === id);
  if (project) {
    Object.assign(project, updates);
  }
};

export const updateChallenge = (id: string, updates: Partial<Challenge>) => {
  const challenge = dataStore.challenges.find((c) => c.id === id);
  if (challenge) {
    Object.assign(challenge, updates);
  }
};

// Mock data for compatibility with existing components
export const mockInterviews = dataStore.interviews;
export const mockBootcamps = dataStore.bootcamps;
export const mockPaths = dataStore.learningPaths;
export const mockCourses = dataStore.courses;
export const mockProjects = dataStore.projects;
export const mockRoadmaps = dataStore.roadmaps;

// Named exports for direct access to data arrays
export const courses = dataStore.courses;
export const projects = dataStore.projects;
export const challenges = dataStore.challenges;
export const interviews = dataStore.interviews;
export const bootcamps = dataStore.bootcamps;
export const learningPaths = dataStore.learningPaths;
export const roadmaps = dataStore.roadmaps;
export const user = dataStore.user;
