export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Lyle Christine",
    role: "A Happy Student from Scotland",
    avatar: "/face.png",
    quote:
      "I truly appreciate the high-quality material in this course. The structured lessons, hands-on projects, and clear explanations make learning a great experience. I look forward to future additions and updates! Thanks for your polite and friendly attitude.",
  },
  {
    name: "Daniel Tinivella",
    role: "Software Engineer, Globant",
    avatar: "/daniel2.jpg",
    quote:
      "The practical examples and hands-on exercises were particularly beneficial. They not only reinforced the theoretical concepts but also allowed me to apply them in real-world scenarios. The inclusion of best practices and common pitfalls added a practical dimension to the learning process.",
  },
  {
    name: "Eshan Shafeeq",
    role: "Blockchain & Web3 Engineer, Cake Defi",
    avatar: "/eshan3.jpeg",
    quote:
      "The course is an excellent resource for beginners. Your explanations of the basics are clear, making it easy for newcomers to grasp. I particularly enjoyed the task management application; it's a practical example that helps solidify the concepts.",
  },
];
