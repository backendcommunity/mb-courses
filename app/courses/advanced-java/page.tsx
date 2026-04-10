"use client";

import {
  BarChart2,
  Clock,
  Code,
  Users,
  Trophy,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  Plus,
  Minus,
  ArrowRight,
  Layout as LayoutTemplate,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, JSX } from "react";
import Testimonials from "@/components/testimonials";

function stripHtml(html?: string) {
  if (!html) return '';
  return String(html)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}



function ChapterCard({ chapter }: { chapter: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const lessonNodes: JSX.Element[] = [];
  if (chapter.lessons && Array.isArray(chapter.lessons)) {
    for (let idx = 0; idx < chapter.lessons.length; idx++) {
      const lesson: any = chapter.lessons[idx];
      lessonNodes.push(
        <div key={idx} className="flex items-center gap-3 text-[13px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="w-6 h-6 rounded-full bg-[#13AECE]/10 flex items-center justify-center shrink-0">
            <Play className="w-3 h-3 text-[#13AECE] ml-0.5" />
          </div>
          {lesson}
        </div>
      );
    }
  }

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-6 transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
          {chapter.num}
        </div>
        <h3 className="font-bold text-slate-800">{chapter.title}</h3>
      </div>
      
      <div className="border-t border-slate-100 pt-6">
        {isExpanded ? (
          <>
            <p className={`text-[13px] text-slate-500 leading-relaxed mb-4`}>
              {chapter.desc}
            </p>

            {chapter.videoTitle && (
              <div className="text-sm text-slate-700 mb-4">
                <span className="text-sky-600 font-medium">Video:</span>
                <span className="ml-2">{chapter.videoTitle}</span>
              </div>
            )}

            {chapter.lessons && (
              <div className="mb-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Lessons in this chapter</h4>
                {lessonNodes}
              </div>
            )}
          </>
        ) : null}

        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-800 text-[13px] font-bold flex items-center gap-1 hover:text-[#13AECE] transition-colors"
          >
            {isExpanded ? "Hide Details" : "View Details"} 
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <Button className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 text-xs h-9 px-6 rounded-md shadow-sm">
            Start Chapter
          </Button>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
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
          isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-slate-600 leading-relaxed text-[15px] pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function AdvancedJavaCoursePage() {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [resources, setResources] = useState<{ totalChapters:number; totalVideos:number; totalQuizzes:number }>({ totalChapters:0, totalVideos:0, totalQuizzes:0 });

  useEffect(() => {
    const loadCourse = async () => {
      const cacheKey = 'course:advanced-java';
      try {
        
        const cachedStr = localStorage.getItem(cacheKey);
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          if (cached && cached.data) {
            
            if (cached.ts && (Date.now() - cached.ts < 60 * 1000)) {
              setCourse(cached.data);
              setLoading(false);
            } else {
              
              setCourse(cached.data);
            }
          }
        }
      } catch (e) {
        
      }

      try {
        setError(null);
        const response = await fetch('/api/courses/advanced-java');
        if (!response.ok) throw new Error('Failed to load course data');
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        const courseObj = data.course || data;
        setCourse(courseObj);
        try {
          const chapters = Array.isArray(courseObj.chapters) ? courseObj.chapters : [];
          const totalChapters = chapters.length;
          let totalVideos = 0;
          let totalQuizzes = 0;
          for (const ch of chapters) {
            if (Array.isArray(ch.videos)) totalVideos += ch.videos.length;
            if (Array.isArray(ch.quizzes)) totalQuizzes += ch.quizzes.length;
          }
          if (Array.isArray(courseObj.quizzes)) totalQuizzes += courseObj.quizzes.length;
          // override for Advanced Java to match site content
          const finalChapters = (courseObj.slug === 'advanced-java' && totalChapters === 23) ? 12 : totalChapters;
          setResources({ totalChapters: finalChapters, totalVideos, totalQuizzes });
        } catch (e) {
          
        }
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: courseObj }));
        } catch (e) {
          
        }
      } catch (err: any) {
        console.error('Error loading course:', err);
        setError(err.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    
    loadCourse();
  }, []);

  // Fetch price info from roadmaps endpoint (use internal proxy)
  useEffect(() => {
    let mounted = true;
    const fetchPrice = async () => {
      try {
        const res = await fetch('/api/roadmaps');
        if (!res.ok) return;
        const d = await res.json();
        const items = d.roadmaps || [];
        // try to find roadmap that matches course title or slug
        const match = items.find((r: any) => {
          const title = (r.title || '').toLowerCase();
          return title.includes('java') || title.includes('advanced');
        }) || items[0];
        if (match && mounted) {
          const val = match.amount || match.price || match.cost || null;
          if (val) setPrice(Number(val));
        }
      } catch (e) {
        
      }
    };
    fetchPrice();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-[#13AECE] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading course...</p>
        </div>
      </div>
    );  
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops!</h2>
          <p className="text-slate-600 mb-6">{error || "Failed to load course data"}</p>
          <Link href="/courses">
            <Button className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Fallback data if API fails - should rarely be used now
  const courseData = course || {
    title: "Advanced Java",
    slug: "advanced-java",
    summary: "Advanced Java covers collections, I/O streams, build tools, and multithreading to help you build scalable, optimized applications.",
    description: "<h2>Learn Advanced Java</h2><p>Master collections, I/O streams, build tools, and multithreading concepts.</p>",
    banner: "https://pub-63da695b9ece47c5b3b49bd78b86d884.r2.dev/design-patterns-in-java.png",
    preview: "1135011825",
    totalDuration: 5,
    totalStudents: 0,
    chapters: [],
    tags: ["Java", "Backend"]
  };

  // Cleaned full description and a short preview for Read More
  let fullDescriptionRaw = stripHtml(courseData.description || courseData.summary || '');
  // remove any leading 'Course Description:' label and unwanted long blocks
  fullDescriptionRaw = fullDescriptionRaw.replace(/Course Description:\s*/gi, '').trim();
  const filteredDescription = fullDescriptionRaw.replace(/In this course[\s\S]*/i, '').trim();
  const fullDescription = filteredDescription || fullDescriptionRaw;
  const sentenceMatches = fullDescription.match(/[^.!?]+[.!?]+(\s|$)/g) || [];
  const shortDescription = sentenceMatches.length ? sentenceMatches.slice(0, 5).join(' ').trim() : fullDescription.split('\n')[0] || fullDescription.slice(0, 200);

  const chaptersList = courseData.chapters && Array.isArray(courseData.chapters)
    ? courseData.chapters.slice(0, 12).map((ch: any, i: number) => {
        const rawDesc = ch.description || ch.summary || ch.content || '';
        const desc = stripHtml(rawDesc) || 'Chapter content';
        const firstVideo = (ch.videos && ch.videos[0]) || (ch.lessons && ch.lessons[0]) || (ch.items && ch.items[0]) || null;
        const videoTitle = firstVideo ? (firstVideo.title || firstVideo.name || firstVideo.heading || stripHtml(firstVideo.summary || firstVideo.description || '')) : '';
        const lessons = (ch.lessons || []).map((l: any) => stripHtml(l.title || l.name || l.summary || l.description || ''));
        return {
          num: i + 1,
          title: ch.title || `Chapter ${i + 1}`,
          desc,
          lessons,
          videoTitle
        };
      })
    : [
        {
          num: 1, title: "Java Fundamentals",
          desc: "Master core Java basics including syntax, variables, data types, and control flow mechanisms.",
          lessons: ["Syntax Basics", "Variables & Data Types", "Control Flow", "Methods"],
          videoTitle: "Intro to Java"
        },
        {
          num: 2, title: "Collections Framework",
          desc: "Explore Lists, Sets, Maps, and Queues. Learn how to efficiently store and manipulate data.",
          lessons: ["Lists & ArrayLists", "Sets & HashSets", "Maps & HashMap", "Queues"],
          videoTitle: "Collections Overview"
        },
        {
          num: 3, title: "I/O Streams",
          desc: "Learn file handling, byte streams, character streams, and serialization in Java.",
          lessons: ["File Input/Output", "Byte Streams", "Character Streams", "Serialization"],
          videoTitle: "File I/O Basics"
        },
        {
          num: 4, title: "Multithreading",
          desc: "Build concurrent applications using threads, synchronization, and thread management.",
          lessons: ["Thread Basics", "Synchronization", "Thread Pools", "Concurrent Collections"],
          videoTitle: "Threads & Concurrency"
        },
        {
          num: 5, title: "Design Patterns",
          desc: "Implement industry-standard design patterns for scalable and maintainable code.",
          lessons: ["Singleton Pattern", "Factory Pattern", "Observer Pattern", "Strategy Pattern"],
          videoTitle: "Design Patterns Overview"
        },
        {
          num: 6, title: "Build Tools & Maven",
          desc: "Master Maven for project management, dependency handling, and automated builds.",
          lessons: ["Maven Setup", "POM Configuration", "Dependency Management", "Build Profiles"],
          videoTitle: "Maven Basics"
        }
      ];

  const learningOutcomes = [
    "Master Advanced Java concepts including collections, I/O streams, and multithreading",
    "Build scalable backend systems with performance optimization techniques",
    "Implement industry-standard design patterns for production-ready code",
    "Handle complex data structures and file operations efficiently",
    "Create concurrent applications with proper thread synchronization"
  ];

  const faqs = [
    {
      question: "What prior knowledge do I need?",
      answer: "Basic Java programming knowledge is recommended. You should be comfortable with classes, objects, and basic OOP concepts."
    },
    {
      question: "How long does this course take?",
      answer: `This course has ${courseData.totalDuration || 5} hours of content. Most students complete it in ${(courseData.totalDuration || 5) * 2}-${(courseData.totalDuration || 5) * 3} weeks depending on their pace.`
    },
    {
      question: "Will I get a certificate?",
      answer: "Yes! Upon completion, you'll receive a certificate of completion that you can add to your LinkedIn profile and resume."
    },
    {
      question: "Can I download course materials?",
      answer: "Yes, all course materials, code examples, and resources are available for download for offline access."
    },
    {
      question: "Is there job support after the course?",
      answer: "Yes, we provide career guidance, resume reviews, and mock interviews to help you land your next role."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden text-slate-50" style={{ backgroundColor: "#0e2036" }}>
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.10,
            backgroundImage: `linear-gradient(rgba(19, 174, 206, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 174, 206, 0.4) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <header className="relative z-10 container mx-auto px-6 py-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <img src="/masteringbackend_logo.png" alt="MasteringBackend" className="h-8 md:h-10" />
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

        <section className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="text-[#13AECE] font-bold tracking-widest text-sm uppercase mb-3">COURSE</div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-bold text-white mb-4">
                {courseData.title}
              </h1>

              <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
                {stripHtml(courseData.summary || courseData.description)}
              </p>

              <Button 
                className="bg-gradient-to-r from-[#13AECE] to-[#3b82f6] hover:from-[#0f8b9e] hover:to-[#2563eb] text-white border-0 h-12 px-8 font-semibold text-[15px] mb-10 rounded-md shadow-lg shadow-[#13AECE]/20"
              >
                Start Course for Free
              </Button>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  {courseData.tags?.map((tag: string, i: number) => (
                    <span key={i} className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50">
                      {tag}
                    </span>
                  )) || (
                    <>
                      <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50">Java</span>
                      <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50">Backend</span>
                    </>
                  )}
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {courseData.totalDuration || 5} hr
                  </span>
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" /> {(courseData.slug === 'advanced-java' && resources.totalChapters === 12) ? 12 : chaptersList.length} Chapters
                  </span>
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Certificate
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[680px] mx-auto lg:ml-auto">
              
              <img
                src={courseData.banner || '/become%20a%20java%20engineer.png'}
                alt={courseData.title || 'Course banner'}
                className="w-full rounded-2xl object-contain object-center"
              />
            </div>
          </div>
        </section>

        
        
        <section className="relative z-10 border-t border-white/5 py-8">
          <div className="container mx-auto px-6">
            <p className="text-slate-400 text-sm mb-6">Join <span className="text-white font-bold">500+</span> MasteringBackend students working at</p>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-40 grayscale">
              <div className="text-xl font-bold flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#0e2036]"></div>
                </div> 
                Logoipsum
              </div>
              <div className="text-xl font-bold flex items-center gap-2">
                <span className="font-serif">Logo</span>ipsum
              </div>
              <div className="text-xl font-black tracking-widest flex items-center gap-2">LOGO</div>
              <div className="text-xl font-bold flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-white rotate-45 flex items-center justify-center"></div> 
                Logoipsum
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-[#f8fafc] text-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            
            <div className="lg:col-span-2 space-y-12">
              
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Course Description</h2>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {shortDescription}
                  </p>
                </div>
              </div>

              
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <h3 className="text-xl font-bold text-slate-800">Interested?</h3>
                <Button className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 px-8 rounded-md w-full sm:w-auto">
                  Start Course for Free
                </Button>
              </div>

              
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-slate-100 p-2 rounded-lg"><Trophy className="w-5 h-5 text-slate-700" /></div>
                  <h2 className="text-xl font-bold text-slate-900">What you'll learn</h2>
                </div>
                
                <ul className="space-y-4">
                  {learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 leading-relaxed">{outcome}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chapters List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Course Content</h3>
                {chaptersList.map((chapter: any) => (
                  <ChapterCard key={chapter.num} chapter={chapter} />
                ))}
              </div>
              
              {/* Earn Certificate Banner */}
              <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 mt-8">
                <div className="w-full md:w-1/3 aspect-[4/3] bg-slate-200 rounded-lg relative overflow-hidden border-[8px] border-slate-100 shadow-inner flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#98D4E3] opacity-60"></div>
                  <div className="relative z-10 w-[80%] h-[70%] bg-[#13AECE]/20 backdrop-blur-sm border border-[#13AECE]/30 rounded flex items-center justify-center shadow-sm">
                  </div>
                </div>
                <div className="w-full md:w-2/3 flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-slate-800">Earn Certificate of Completion</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Add this credential to your LinkedIn profile, resume, or CV Share it on social media and in your performance review
                  </p>
                  <Button className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 w-full rounded-md h-11">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* In the following Tracks */}
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <LayoutTemplate className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-[15px]">In the following Tracks</h3>
                </div>
                <div className="space-y-4">
                  <div className="relative pt-3 pb-4">
                    <div className="absolute -top-1 right-0 bg-[#13AECE] text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
                      <Trophy className="w-2.5 h-2.5" /> Certification Available
                    </div>
                    <Link href="/courses/advanced-java" className="text-[#13AECE] font-bold text-[15px] underline decoration-[#13AECE]/30 hover:decoration-[#13AECE] underline-offset-4 transition-colors">
                      Advanced Java
                    </Link>
                  </div>
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-[15px]">Instructor</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    <img 
                      src="/logo.png" 
                      alt="masteringBackend" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Link href="#" className="font-bold text-[#13AECE] text-[15px] hover:underline underline-offset-2">MasteringBackend</Link>
                  </div>
                </div>
              </div>

              {/* Course Resource */}
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-[15px]">Course Resource</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">{resources.totalChapters}</div>
                    <div className="text-xs text-slate-500">Chapters</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">{resources.totalVideos}</div>
                    <div className="text-xs text-slate-500">Videos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">{resources.totalQuizzes}</div>
                    <div className="text-xs text-slate-500">Quizzes</div>
                  </div>
                </div>
                <div className="text-sm text-slate-600">Additional resources and downloads available in the course resource section.</div>
              </div>

            </div>
            
          </div>
        </div>
      </section>

      {/* Start learning today (Pricing Section) */}
      <section className="py-24 px-4 bg-[#F6F6F6]">
        <div className="container mx-auto max-w-[900px]">
          <div className="text-center mb-16">
            <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#0B152A] mb-4">
              Start learning today
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              All-in-one Java and Spring course for learning backend engineering with Java.<br/>
              This comprehensive course is designed for Java developers seeking proficiency in Java.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-[850px] mx-auto">
            
            {/* Left Pricing Card (Light) */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-10 flex flex-col relative h-full shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-[28px] font-bold text-[#0B152A] leading-tight mb-8">
                Full Course -<br/>Early Access!
              </h3>
              
              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-slate-400 shrink-0" />
                  <span className="text-[15px] text-slate-500 leading-relaxed">Over 100+ in-depth video tutorials</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-slate-400 shrink-0" />
                  <span className="text-[15px] text-slate-500 leading-relaxed">Lifetime access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-slate-400 shrink-0" />
                  <span className="text-[15px] text-slate-500 leading-relaxed">Deep dive into Java + Spring for backend engineering</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-slate-400 shrink-0" />
                  <span className="text-[15px] text-slate-500 leading-relaxed">Access to over 10+ modules (coming soon)</span>
                </li>
              </ul>

              <div className="mt-auto">
                  <div className="flex items-end gap-2 mb-2">
                  <div className="flex items-start">
                    <span className="text-xl font-bold text-[#0B152A] mt-1">$</span>
                    <span className="text-[52px] font-black text-[#0B152A] leading-none tracking-tight">{price ?? 150}</span>
                  </div>
                  {price && <span className="text-sm font-bold text-slate-400 line-through mb-2">$270</span>}
                </div>
                <p className="text-[15px] text-slate-500 mb-8">one-time offer</p>
                
                <button className="w-full bg-[#f4f6f8] border border-[#0B152A] text-[#0B152A] font-bold py-4 rounded-xl mb-4 hover:bg-slate-100 transition-colors shadow-sm">
                  {price ? 'Buy Now' : 'Early Access'}
                </button>
                <p className="text-[11px] text-center italic text-slate-400">Note that more modules are coming soon</p>
              </div>
            </div>

            {/* Right Pricing Card (Dark) */}
            <div className="bg-[#111A2C] rounded-[2rem] p-10 flex flex-col relative h-full shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-8">
                <h3 className="text-[28px] font-bold text-white leading-tight">
                  Cohort &<br/>Team Pricing
                </h3>
                <div className="bg-white/[0.08] px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-white/[0.12] transition-colors border border-white/5">
                  <span className="text-sm font-medium text-slate-200">3 Seats</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              
              <div className="flex-1 mb-12">
                <p className="text-[15px] text-slate-400 leading-relaxed mb-6">
                  We offer team discounts on the full course based on the number of team members you'd like to purchase for
                </p>
                <p className="text-[15px] text-slate-400">
                  Need more seats or info?<br/>
                  <a href="mailto:email@example.com" className="underline decoration-slate-500 underline-offset-4 hover:text-white transition-colors">Email us.</a>
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-end gap-2 mb-2">
                  <div className="flex items-start">
                    <span className="text-xl font-bold text-white mt-1">$</span>
                    <span className="text-[52px] font-black text-white leading-none tracking-tight">392</span>
                  </div>
                  <span className="text-sm font-bold text-slate-500 line-through mb-2">$450</span>
                </div>
                <p className="text-[15px] text-slate-400 mb-8">one-time offer</p>
                
                <button className="w-full bg-[#1EAEDB] hover:bg-[#1a9bc4] text-white font-bold py-4 rounded-xl mb-4 transition-colors shadow-lg shadow-[#1EAEDB]/20">
                  Buy Now
                </button>
                <p className="text-[11px] text-center italic text-slate-500">Note that more modules are coming soon</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Testimonials />

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
