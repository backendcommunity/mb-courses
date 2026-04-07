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
  LayoutTemplate,
  UserCircle,
  FileText,
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [isReadMore, setIsReadMore] = useState(false);

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

        {/* Hero Section */}
        <section className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="text-[#13AECE] font-bold tracking-widest text-sm uppercase mb-3">COURSE</div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-bold text-white mb-4">
                Advanced Java
              </h1>
              
              <div className="flex items-center gap-3 text-slate-300 text-sm font-medium mb-6">
                <div className="flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4" /> Basic
                </div>
                <span className="text-slate-600">|</span>
                <span>Updated 02/2026</span>
              </div>

              <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
                Learn Advanced Java (collections, I/O streams, build tools, and multithreading.
              </p>

              <Button 
                className="bg-gradient-to-r from-[#13AECE] to-[#3b82f6] hover:from-[#0f8b9e] hover:to-[#2563eb] text-white border-0 h-12 px-8 font-semibold text-[15px] mb-10 rounded-md shadow-lg shadow-[#13AECE]/20"
              >
                Start Course for Free
              </Button>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50">Java</span>
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50">Programming</span>
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 5 hr</span>
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5"><Code className="w-3.5 h-3.5" /> 23 Chapters</span>
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 36+</span>
                </div>
                <div className="flex">
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Certificate on completion
                  </span>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto aspect-square">
              <div className="absolute inset-0 border border-white/10 rounded-2xl p-4 lg:p-6 bg-white/[0.02] backdrop-blur-sm">
                <div className="w-full h-full rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl overflow-hidden"
                     style={{
                       backgroundImage: 'repeating-linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6), repeating-linear-gradient(45deg, #f3f4f6 25%, #ffffff 25%, #ffffff 75%, #f3f4f6 75%, #f3f4f6)',
                       backgroundPosition: '0 0, 10px 10px',
                       backgroundSize: '20px 20px'
                     }}>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Logos */}
        <section className="relative z-10 border-t border-white/5 py-8">
          <div className="container mx-auto px-6">
            <p className="text-slate-400 text-sm mb-6">Join <span className="text-white font-bold">500+</span> MasteringBackend students working at</p>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-40 grayscale">
              {/* Mocking generic logos with text and simple SVGs to mimic the design */}
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

      {/* Main Content Section */}
      <section className="bg-[#f8fafc] text-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Column (Course Details) */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Course Description */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Course Description</h2>
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800">Learn R Programming</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    R programming language is a useful tool for data scientists, analysts, and statisticians, especially those working in academic settings. R's ability to handle complex analyses such as machine learning, financial modeling, and more{isReadMore ? " advanced computational statistics makes it incredibly valuable for heavy data manipulation. In this course, you will dive deep into its core features, syntax, and statistical modeling capabilities to become a proficient R developer." : "..."}
                  </p>
                  <button onClick={() => setIsReadMore(!isReadMore)} className="text-[#13AECE] text-xs font-bold flex items-center gap-1 hover:text-[#0f8b9e] transition-colors">
                    {isReadMore ? "Show Less" : "Read More"} {isReadMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Interested CTA Banner */}
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <h3 className="text-xl font-bold text-slate-800">Interested ?</h3>
                <Button className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 px-8 rounded-md w-full sm:w-auto">
                  Start Course for Free
                </Button>
              </div>

              {/* What you'll learn */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-slate-100 p-2 rounded-lg"><Trophy className="w-5 h-5 text-slate-700" /></div>
                  <h2 className="text-xl font-bold text-slate-900">What you'll learn</h2>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800">Identify</span> core R data types and recognize how variables store and manipulate values.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800">Define and differentiate vector operations by creating, naming, subsetting, and comparing one-dimensional data.</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800">Recognize matrix structures by constructing, naming, and operating on two-dimensional data, including arithmetic and summaries.</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800">Differentiate nominal and ordinal factors and identify appropriate use of factor creation, level setting, and ordered comparisons.</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-800">Evaluate</span> outputs from vectors, matrices, and factors to assess totals, patterns, and logical conditions in R
                    </p>
                  </li>
                </ul>
              </div>

              {/* Chapters List */}
              <div className="space-y-4">
                {[
                  {
                    num: 1, title: "Intro to basics", 
                    desc: "Take your first steps with R. In this chapter, you will learn how to use the console as a calculator and how to assign variables. You will also get to know the basic data types in R. Let's get started."
                  },
                  {
                    num: 2, title: "Vectors", 
                    desc: "We take you on a trip to Vegas, where you will learn how to analyze your gambling results using vectors in R. After completing this chapter, you will be able to create vectors in R, name them, select elements from them, and compare different vectors."
                  },
                  {
                    num: 3, title: "Matrices", 
                    desc: "In this chapter, you will learn how to work with matrices in R. By the end of the chapter, you will be able to create matrices and understand how to do basic computations with them. You will analyze the box office numbers of the Star Wars movies and learn how to use matrices in R. May the force be with you!"
                  },
                  {
                    num: 4, title: "Factors", 
                    desc: "Data often falls into a limited number of categories. For example, human hair color can be categorized as black, brown, blond, red, grey, or white—and perhaps a few more options for people who color their hair. In R, categorical data is stored in factors. Factors are very important in data analysis, so start learning how to create, subset, and compare them now."
                  },
                  {
                    num: 5, title: "Data frames", 
                    desc: "Most datasets you will be working with will be stored as data frames. By the end of this chapter, you will be able to create a data frame, select interesting parts of a data frame, and order a data frame according to certain variables."
                  },
                  {
                    num: 6, title: "Lists", 
                    desc: "As opposed to vectors, lists can hold components of different types, just as your to-do lists can contain different categories of tasks. This chapter will teach you how to create, name, and subset these lists."
                  }
                ].map(chapter => (
                  <div key={chapter.num} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-6 transition-all hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {chapter.num}
                      </div>
                      <h3 className="font-bold text-slate-800">{chapter.title}</h3>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-6">
                      <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                        {chapter.desc}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <button className="text-slate-800 text-[13px] font-bold flex items-center gap-1 hover:text-[#13AECE] transition-colors">
                          View Details <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <Button className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 text-xs h-9 px-6 rounded-md">
                          Start Chapter
                        </Button>
                      </div>
                    </div>
                  </div>
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
                      src="/founder.jpg" 
                      alt="Solomon Eseme" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Link href="#" className="font-bold text-[#13AECE] text-[15px] hover:underline underline-offset-2">Solomon Eseme</Link>
                    <span className="text-xs text-slate-500">Founder of MasteringBackend</span>
                  </div>
                </div>
              </div>

              {/* Course Resource */}
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-[15px]">Course Resource</h3>
                </div>
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
                    <span className="text-[52px] font-black text-[#0B152A] leading-none tracking-tight">150</span>
                  </div>
                  <span className="text-sm font-bold text-slate-400 line-through mb-2">$270</span>
                </div>
                <p className="text-[15px] text-slate-500 mb-8">one-time offer</p>
                
                <button className="w-full bg-[#f4f6f8] border border-[#0B152A] text-[#0B152A] font-bold py-4 rounded-xl mb-4 hover:bg-slate-100 transition-colors shadow-sm">
                  Buy Now
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
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                    <img 
                      src={`https://i.pravatar.cc/150?img=${item * 11}`} 
                      alt="Solomon Eseme" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#0B152A] text-lg">Solomon Eseme</span>
                    <span className="text-sm text-slate-500">Backend engineer at Andela</span>
                  </div>
                </div>
                <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1">
                  “This is testimonial. Or should we call it a success story? Whatever, just be sure it conveys MB's real value and piques the ideal buyer to actually want to buy, Okay. This is testimonial. It's also a real success story”.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button className="flex items-center gap-2 px-8 py-3 rounded-full border border-[#0B152A] text-[#0B152A] font-medium hover:bg-slate-100 transition-colors">
              See more <ArrowRight className="w-5 h-5" />
            </button>
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
