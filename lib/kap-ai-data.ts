export interface KapMessage {
  id: string
  content: string
  sender: "user" | "kap"
  timestamp: Date
}

export interface KapConversation {
  id: string
  title: string
  messages: KapMessage[]
  createdAt: Date
  updatedAt: Date
  category: "learning" | "navigation" | "technical" | "platform" | "general"
}

export interface KapSuggestedQuestion {
  id: string
  question: string
  category: "learning" | "navigation" | "technical" | "platform"
  icon: string
}

export const kapPersonality = {
  name: "Kap AI",
  title: "Level 9 Backend Engineer",
  description: "Your professional backend development assistant",
}

export const mockConversations: KapConversation[] = [
  {
    id: "1",
    title: "How to start with Node.js development?",
    messages: [
      {
        id: "1",
        content: "How to start with Node.js development?",
        sender: "user",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "2",
        content:
          "Great question! Node.js is an excellent choice for backend development. Here's my recommended learning path:\n\n**1. JavaScript Fundamentals**\n• Master ES6+ features\n• Understand async/await and Promises\n• Learn about closures and scope\n\n**2. Node.js Basics**\n• File system operations\n• HTTP module\n• NPM and package management\n\n**3. Express.js Framework**\n• Routing and middleware\n• RESTful API design\n• Error handling\n\n**4. Database Integration**\n• MongoDB with Mongoose\n• PostgreSQL with Sequelize\n\nWould you like me to show you our Node.js course that covers all these topics?",
        sender: "kap",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
      },
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
    category: "learning",
  },
  {
    id: "2",
    title: "Database design best practices",
    messages: [
      {
        id: "3",
        content: "What are the best practices for database design?",
        sender: "user",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        id: "4",
        content:
          "Excellent question! Database design is crucial for scalable applications. Here are my top recommendations:\n\n**Normalization:**\n• Start with 3NF (Third Normal Form)\n• Eliminate data redundancy\n• Ensure data integrity\n\n**Performance Optimization:**\n• Index frequently queried columns\n• Use composite indexes wisely\n• Monitor query execution plans\n\n**Scalability Planning:**\n• Design for horizontal scaling\n• Consider read replicas\n• Plan for data partitioning\n\n**Security:**\n• Use parameterized queries\n• Implement proper access controls\n• Encrypt sensitive data\n\nOur Database Mastery course covers all these concepts with hands-on examples. Interested?",
        sender: "kap",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 45000),
      },
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 45000),
    category: "technical",
  },
  {
    id: "3",
    title: "Where can I find the interview section?",
    messages: [
      {
        id: "5",
        content: "Where can I find the interview preparation section?",
        sender: "user",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        id: "6",
        content:
          "I'll help you navigate to the interview preparation section! 💼\n\nHere's how to access it:\n• Click \"Interviews\" in the left sidebar\n• Or go directly: [Interview Prep](/dashboard/interviews)\n\nYou'll find:\n🧠 Algorithm challenges\n💼 Project-based interviews\n🎯 Mock interview sessions\n📊 Performance analytics\n\nThe interview section includes:\n• 200+ coding challenges\n• System design questions\n• Behavioral interview prep\n• Real-time coding environments\n\nWhich type of interview prep interests you most?",
        sender: "kap",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 20000),
      },
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 20000),
    category: "navigation",
  },
]

export const suggestedQuestions: KapSuggestedQuestion[] = [
  {
    id: "1",
    question: "How do I get started with backend development?",
    category: "learning",
    icon: "🚀",
  },
  {
    id: "2",
    question: "Where can I find the courses section?",
    category: "navigation",
    icon: "🎓",
  },
  {
    id: "3",
    question: "What are API design best practices?",
    category: "technical",
    icon: "🔧",
  },
  {
    id: "4",
    question: "How do I track my learning progress?",
    category: "platform",
    icon: "📊",
  },
  {
    id: "5",
    question: "Show me interview preparation resources",
    category: "navigation",
    icon: "💼",
  },
  {
    id: "6",
    question: "Explain microservices architecture",
    category: "technical",
    icon: "🏗️",
  },
  {
    id: "7",
    question: "How do I earn course certificates?",
    category: "platform",
    icon: "🏆",
  },
  {
    id: "8",
    question: "What's the best database for my project?",
    category: "technical",
    icon: "🗄️",
  },
]
