"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Code2,
  Code,
  Users,
  Trophy,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Target,
  Globe,
  Clock,
  Layout,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect } from "react";

const pathList = ["Backend Engineering", "Cybersecurity for Engineers", "Product Engineering", "Blockchain Engineering", "AI Engineering", "Cloud Engineering", "DevOps Engineering", "Data Engineering", "Platform Engineering"];
const categoryList = ["Backend", "Cybersecurity", "Product", "Blockchain", "AI", "Cloud", "DevOps", "Data", "Platform"];
const levelList = ["Basic", "Intermediate", "Advanced"];

const fallbackAdvancedJava = { 
  id: "advanced-java", 
  title: "Advanced Java", 
  level: "Advanced", 
  users: 35, 
  desc: "Advanced Java covers collections, I/O streams, build tools, and multithreading to help you build scalable, optimized applications.", 
  category: "Software Development", 
  path: "Data Engineering", 
  hours: 5, 
  chapters: 23,
  preview: "1135011825",
  banner: "https://pub-63da695b9ece47c5b3b49bd78b86d884.r2.dev/design-patterns-in-java.png"
};

const faqs = [
  {
    question: "What is data science?",
    answer: "Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data.",
  },
  {
    question: "How can I learn data science?",
    answer: "You can learn data science by following a structured learning path, starting with programming fundamentals (like Python or R), mastering statistics, and moving onto machine learning and data visualization through hands-on projects and courses.",
  },
  {
    question: "What skills are required for data science?",
    answer: "Key skills include proficiency in programming languages (such as Python or SQL), an understanding of statistical analysis, experience with machine learning algorithms, data wrangling, and effective data communication/visualization.",
  },
  {
    question: "What can I use data science for?",
    answer: "Data science is used to build predictive models, recommendation engines, automate decision-making processes, detect fraud, analyze customer behavior, and optimize business strategies across almost every industry.",
  },
  {
    question: "Is data science a good career?",
    answer: "Yes, data science is widely considered one of the fastest-growing and highest-paid careers in technology, offering excellent job security, diverse opportunities, and impactful work.",
  },
  {
    question: "Is it difficult to become a data scientist?",
    answer: "It requires dedication and continuous learning due to its multidisciplinary nature. However, with a consistent study routine, structured curriculum, and hands-on practice, anyone with perseverance can transition into the field.",
  },
  {
    question: "Does data science require coding?",
    answer: "Yes, coding is an essential tool for data scientists. Languages like Python, R, and SQL are heavily used to process, analyze, and build models from raw data.",
  },
  {
    question: "How long does it take to become a data scientist?",
    answer: "Depending on your prior experience and time commitment, it generally takes between 6 to 12 months of focused, rigorous study to acquire the necessary entry-level skills to land a data science role.",
  },
  {
    question: "What topics can I study within data science?",
    answer: "Topics span across data wrangling, exploratory data analysis, machine learning (supervised and unsupervised), deep learning, natural language processing (NLP), data visualization, and deployment of AI models.",
  },
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
      >
        <span className="text-[17px] font-semibold text-[#0B152A] pr-8 group-hover:text-[#13AECE] transition-colors">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-[#A855F7] flex-shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-[#A855F7] flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-slate-600 leading-relaxed text-[15px] pr-8">{answer}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMorePath, setShowMorePath] = useState(false);
  const [showMoreCategory, setShowMoreCategory] = useState(false);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [apiPaths, setApiPaths] = useState<string[]>(pathList); // Default fallback
  const [isPathsLoaded, setIsPathsLoaded] = useState(false);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    // 1. Fetch Paths First
    fetch("/api/roadmaps")
      .then(res => res.json())
      .then(data => {
        if (data && data.data && Array.isArray(data.data)) {
          // Assuming roadmaps API returns an array in data.data
          const loadedPaths = data.data.map((r: any) => r.title || r.name).filter(Boolean);
          if (loadedPaths.length > 0) {
            setApiPaths(loadedPaths);
          }
        }
      })
      .catch(err => console.error("Failed to load roadmaps:", err))
      .finally(() => {
        setIsPathsLoaded(true);

        // 2. Fetch Courses After Paths
        fetch("/api/courses")
          .then(res => res.json())
          .then(data => {
            if (data && data.courses) {
              // Map backend course structure to UI layout
              const mappedCourses = data.courses.map((c: any) => ({
                id: c.slug || c.id,
                title: c.title,
                level: c.level?.name || c.level || "Intermediate", // Fallbacks to ensure UI doesn't break
                users: c.totalStudents || Math.floor(Math.random() * 100) + 10,
                desc: c.summary || c.description,
                category: c.category?.name || c.category || "Software Development",
                path: c.path || "Software Development",
                hours: c.totalDuration || Math.floor(Math.random() * 10) + 1,
                chapters: c.chapters?.length || 0,
                slug: c.slug,
                preview: c.preview,
                banner: c.banner
              }));
              
              // Make sure Advanced Java is always at the top since we're focused on building that design
              const finalCourses = [fallbackAdvancedJava, ...mappedCourses.filter((c: any) => c.slug !== "advanced-java")];
              setCoursesList(finalCourses);
            }
          })
          .catch(err => {
            console.error("Failed to load courses:", err);
            // Gracefully fail and just show Advanced Java
            setCoursesList([fallbackAdvancedJava]);
          });
      });
  }, []);

  const handleGetStarted = () => {
    // Navigate to dashboard
    window.location.href = "/";
  };

  const toggleSelection = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedPaths([]);
    setSelectedCategories([]);
    setSelectedLevels([]);
    setCurrentPage(1);
  };

  const filteredCourses = coursesList.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPath = selectedPaths.length === 0 || selectedPaths.includes(course.path);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    return matchesSearch && matchesPath && matchesCategory && matchesLevel;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden text-slate-50" style={{ backgroundColor: "#0e2036" }}>
        {/* Subtle Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.10,
            backgroundImage: `linear-gradient(rgba(19, 174, 206, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 174, 206, 0.4) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Header */}
        <header className="relative z-10 container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <img src="/masteringbackend_logo.png" alt="MasteringBackend" className="h-40 md:h-20" />
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/courses" className="hover:text-white transition-colors">Learn</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Build</Link>
            <Link href="/roadmaps" className="hover:text-white transition-colors">Grow</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/community" className="hover:text-white transition-colors">Community</Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Login
            </Link>
            <Button 
              variant="outline" 
              className="rounded-full border-slate-600 bg-transparent text-white hover:bg-white/10 hover:text-white px-6 h-10"
              asChild
            >
              <Link href="/auth/register">Get started</Link>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 container mx-auto px-6 pt-8 pb-24 md:pt-14 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-bold text-white mb-6">
                Backend, AI, and <br className="hidden md:block" />
                <span className="text-[#98D4E3]">Engineering Courses</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                Whether you're new to Backend, AI, Product, Cybersecurity, Cloud Engineering, or want to scale up, this is your home for your engineering courses.
              </p>

              <ul className="space-y-4 text-slate-200">
                <li className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">Learn on your schedule</span>
                </li>
                <li className="flex items-center gap-4">
                  <Code className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">Build real, practical skills</span>
                </li>
                <li className="flex items-center gap-4">
                  <Layout className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">Finish quick, easy-to-digest lessons</span>
                </li>
              </ul>
            </div>

            <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto aspect-square">
              <div className="absolute inset-0 border border-white/10 rounded-2xl p-4 lg:p-6 bg-white/[0.02] backdrop-blur-sm">
                <div className="w-full h-full rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl overflow-hidden relative"
                     style={{
                       backgroundColor: 'rgba(255,255,255,0.05)',
                     }}>
                  <img 
                    src="/home-image.png" 
                    alt="Course Environment" 
                    className="absolute top-0 left-0 w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Browse Courses Section */}
      <section className="py-20 px-4 bg-[#F8FAFC] text-slate-900">
        <div className="container mx-auto">
          <h2 className="text-[2rem] font-extrabold text-[#0B152A] mb-10">Browse Courses</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <Button onClick={clearAllFilters} variant="outline" className="w-full mb-8 border-slate-300 text-slate-700 bg-white">
                Clear All
              </Button>
              
              <div className="space-y-8">
                {/* Path Filter */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Path</h3>
                  <div className="space-y-3">
                    {(showMorePath ? apiPaths : apiPaths.slice(0, 3)).map((item: string) => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedPaths.includes(item)}
                          onChange={() => toggleSelection(setSelectedPaths, item)}
                          className="w-4 h-4 rounded border-slate-300 text-[#0A101D] focus:ring-[#0A101D]" 
                        />
                        <span className="text-sm text-slate-600">{item}</span>
                      </label>
                    ))}
                  </div>
                  {apiPaths.length > 3 && (
                    <button 
                      onClick={() => setShowMorePath(!showMorePath)}
                      className="text-sm font-semibold text-[#13AECE] flex items-center gap-1 mt-3 hover:text-[#0f8b9e]"
                    >
                      {showMorePath ? "Show Less" : "Show More"} 
                      {showMorePath ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                
                <hr className="border-slate-200" />
                
                {/* Category Filter */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Category</h3>
                  <div className="space-y-3">
                    {(showMoreCategory ? categoryList : categoryList.slice(0, 3)).map(item => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedCategories.includes(item)}
                          onChange={() => toggleSelection(setSelectedCategories, item)}
                          className="w-4 h-4 rounded border-slate-300 text-[#0A101D] focus:ring-[#0A101D]" 
                        />
                        <span className="text-sm text-slate-600">{item}</span>
                      </label>
                    ))}
                  </div>
                  {categoryList.length > 3 && (
                    <button 
                      onClick={() => setShowMoreCategory(!showMoreCategory)}
                      className="text-sm font-semibold text-[#13AECE] flex items-center gap-1 mt-3 hover:text-[#0f8b9e]"
                    >
                      {showMoreCategory ? "Show Less" : "Show More"} 
                      {showMoreCategory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                
                <hr className="border-slate-200" />
                
                {/* Skill Level Filter */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Skill Level</h3>
                  <div className="space-y-3">
                    {levelList.map(item => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedLevels.includes(item)}
                          onChange={() => toggleSelection(setSelectedLevels, item)}
                          className="w-4 h-4 rounded border-slate-300 text-[#0A101D] focus:ring-[#0A101D]" 
                        />
                        <span className="text-sm text-slate-600">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A101D]/20 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <h4 className="font-bold text-[#0B152A] mb-4">{filteredCourses.length} Courses</h4>

              {/* Course Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {!isPathsLoaded || coursesList.length === 0 ? (
                  <div className="col-span-2 text-center py-12 text-slate-500">
                    <div className="w-8 h-8 border-2 border-slate-300 border-t-[#13AECE] rounded-full animate-spin mx-auto mb-4"></div>
                    Loading courses...
                  </div>
                ) : paginatedCourses.length > 0 ? paginatedCourses.map((course, idx) => (
                  <Link href={course.title === "Advanced Java" ? "/courses/advanced-java" : `/courses/${course.slug || course.id}`} key={course.id || idx}>
                    <div className="bg-white h-full rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-shadow hover:shadow-md cursor-pointer group">
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">COURSE</span>
                        <h3 className="text-xl font-bold text-[#0B152A] mb-3 leading-tight group-hover:text-[#13AECE] transition-colors">{course.title}</h3>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                            <BarChart2 className="w-4 h-4 text-slate-700" /> {course.level}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                            <Users className="w-4 h-4 text-slate-700" /> {course.users}
                          </div>
                        </div>
                        
                        <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3 flex-1">
                          {course.desc}
                        </p>
                        
                        <div className="text-xs text-slate-400 mt-auto">
                          {course.category}
                        </div>
                      </div>
                      
                      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          <img src="/masteringbackend_logo.png" alt="mb" className="w-4 h-4 object-contain brightness-0 invert" />
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span>{course.hours} hours</span>
                          <span className="text-slate-300">|</span>
                          <span>{course.chapters || 0} Chapters</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-2 text-center py-12 text-slate-500">
                    No courses found matching "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-8">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="flex items-center text-sm font-semibold text-[#13AECE] mr-4 hover:text-[#0f8b9e] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button 
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                        page === currentPage 
                          ? "bg-[#0B152A] text-white" 
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="flex items-center text-sm font-semibold text-[#13AECE] ml-4 hover:text-[#0f8b9e] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-[#F6F6F6]">
        <div className="container mx-auto max-w-[1100px]">
          <div className="mb-14">
            <h2 className="text-[2.5rem] md:text-[3.25rem] tracking-tight font-bold text-[#0B152A] leading-[1.1]">
              Real Numbers.<br />
              Real Success Stories.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div key="agoro" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                  <img 
                    src="/agoro1.jpeg" 
                    alt="Agoro Adegbenga B" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#0B152A] text-lg">Agoro, Adegbenga. B</span>
                  <span className="text-sm text-slate-500">CTO, Crenet</span>
                </div>
              </div>
              <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1">
                "I strongly recommend exploring Mastering Backend as a resource for your personal and/or professional growth."
              </p>
            </div>

            <div key="eshan" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                  <img 
                    src="/eshan3.jpeg" 
                    alt="Eshan Shafeeq" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#0B152A] text-lg">Eshan Shafeeq</span>
                  <span className="text-sm text-slate-500">Blockchain & Web3 Engineer, Cake Defi</span>
                </div>
              </div>
              <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1">
                "The course is an excellent resource for beginners. Your explanations of the basics are clear, making it easy for newcomers to grasp. I particularly enjoyed the task management application; it's a practical example that helps solidify the concepts."
              </p>
            </div>

            <div key="daniel" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                  <img 
                    src="/daniel2.jpg" 
                    alt="Daniel Tinivella" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#0B152A] text-lg">Daniel Tinivella</span>
                  <span className="text-sm text-slate-500">Software Engineer, Globant</span>
                </div>
              </div>
              <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1">
                "The practical examples and hands-on exercises were particularly beneficial. They not only reinforced the theoretical concepts but also allowed me to apply them in real-world scenarios. The inclusion of best practices and common pitfalls added a practical dimension to the learning process."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 px-4 bg-[#F6F6F6]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#0B152A]">FAQs</h2>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 px-6 sm:px-10 py-2">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white px-4 pt-16 pb-8 border-t border-slate-100">
        <div className="container mx-auto max-w-[1100px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-4 pr-0 lg:pr-8 flex flex-col">
              <div className="flex items-center gap-2 font-bold text-[22px] tracking-tight mb-8">
                <div className="w-10 h-10 bg-[#0B152A] flex items-center justify-center">
                  <img src="/masteringbackend_logo.png" alt="mb." className="w-6 object-contain brightness-0 invert" />
                </div>
                <span className="text-[#0B152A]">MasteringBackend</span>
              </div>
              
              <p className="text-slate-500 leading-relaxed mb-12 text-[15px]">
                Transform your backend development career with our
                proven Learn → Build → Grow methodology. Join
                thousands of developers who have successfully
                landed their dream jobs.
              </p>

              <div className="space-y-3 mt-auto">
                <div className="flex gap-3">
                  <input 
                    type="email" 
                    placeholder="example@email.com" 
                    className="w-full md:w-auto flex-1 px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0B152A] focus:ring-1 focus:ring-[#0B152A] transition-colors"
                  />
                  <button className="px-6 py-3 bg-[#111827] text-white text-[15px] font-medium rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                <p className="text-[14.5px] text-slate-500">Get weekly tips, project ideas, and career advice</p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 lg:gap-4 lg:ml-12 pt-2">
              <div className="flex flex-col">
                <h3 className="font-bold text-[17px] text-[#0B152A] mb-7">Learn</h3>
                <ul className="space-y-5 text-[15px] text-[#0B152A]/80 font-medium">
                  <li><Link href="/courses" className="hover:text-[#13AECE] transition-colors">Courses Us</Link></li>
                  <li><Link href="/bootcamps" className="hover:text-[#13AECE] transition-colors">Bootcamps</Link></li>
                  <li><Link href="/roadmaps" className="hover:text-[#13AECE] transition-colors">Roadmaps</Link></li>
                  <li><Link href="/paths" className="hover:text-[#13AECE] transition-colors">Paths</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[17px] text-[#0B152A] mb-7">Build</h3>
                <ul className="space-y-5 text-[15px] text-[#0B152A]/80 font-medium">
                  <li><Link href="/projects" className="hover:text-[#13AECE] transition-colors">MB Projects</Link></li>
                  <li><Link href="/project30" className="hover:text-[#13AECE] transition-colors">Project30</Link></li>
                  <li><Link href="/lands" className="hover:text-[#13AECE] transition-colors">MB Lands</Link></li>
                  <li><Link href="/portfolios" className="hover:text-[#13AECE] transition-colors">Portfolio</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[17px] text-[#0B152A] mb-7">Grow</h3>
                <ul className="space-y-5 text-[15px] text-[#0B152A]/80 font-medium">
                  <li><Link href="/interviews" className="hover:text-[#13AECE] transition-colors">MB Interviews</Link></li>
                  <li><Link href="/mock-interviews" className="hover:text-[#13AECE] transition-colors">Mock Interviews</Link></li>
                  <li><Link href="/certifications" className="hover:text-[#13AECE] transition-colors">Certifications</Link></li>
                  <li><Link href="/community" className="hover:text-[#13AECE] transition-colors">Community</Link></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[17px] text-[#0B152A] mb-7">Company</h3>
                <ul className="space-y-5 text-[15px] text-[#0B152A]/80 font-medium">
                  <li><Link href="/about" className="hover:text-[#13AECE] transition-colors">About</Link></li>
                  <li><Link href="/blog" className="hover:text-[#13AECE] transition-colors">Blog</Link></li>
                  <li><Link href="/careers" className="hover:text-[#13AECE] transition-colors">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-[#13AECE] transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-[15px] font-medium text-[#0B152A]">
            <p>&copy; 2026 Masteringbackend. All Rights Reserved.</p>
            <div className="flex items-center flex-wrap justify-center gap-x-12 gap-y-4">
              <Link href="/privacy" className="hover:text-[#13AECE] transition-colors">Privacy Policy</Link>
              <Link href="/cookie" className="hover:text-[#13AECE] transition-colors">Cookie Policy</Link>
              <Link href="/terms" className="hover:text-[#13AECE] transition-colors">Terms Of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
