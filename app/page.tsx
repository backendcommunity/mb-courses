import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Code, Layout } from "lucide-react";
import { HeroIllustration } from "@/components/hero-illustration";
import Testimonials from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/Footer";
import { BrowseSection } from "@/components/browse-section";
import { stripHtml } from "@/lib/utils";
import { Header } from "@/components/header";

// ─── Config ───────────────────────────────────────────────────────────────────

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://demo.masteringbackend.com/api/v3";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "MasteringBackend — Backend, AI & Engineering Courses",
  description:
    "Structured learning paths for backend, AI, cloud, DevOps, and product engineering. Learn on your schedule, build real-world skills, and transform your tech career.",
  keywords: [
    "backend engineering courses",
    "learn backend development",
    "AI engineering courses",
    "cloud engineering",
    "DevOps training",
    "software engineering career",
    "online coding courses",
    "tech career transformation",
  ],
  alternates: {
    canonical: "https://masteringbackend.com",
  },
  openGraph: {
    type: "website",
    url: "https://masteringbackend.com",
    title: "MasteringBackend — Backend, AI & Engineering Courses",
    description:
      "Structured learning paths for backend, AI, cloud, DevOps, and product engineering. Build real-world skills and transform your tech career.",
    images: [
      {
        url: "/home-image.png",
        width: 1200,
        height: 630,
        alt: "MasteringBackend — Backend, AI & Engineering Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MasteringBackend — Backend, AI & Engineering Courses",
    description:
      "Structured learning paths for backend, AI, cloud, DevOps, and product engineering.",
    images: ["/home-image.png"],
  },
};

// ─── Static data ──────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "What is Backend Engineering?",
    answer:
      "Backend engineering is the discipline of designing, building, and maintaining the server-side systems that power real products — APIs, databases, authentication, background jobs, and infrastructure. It's not just writing code. It's owning the systems that keep businesses running in production.",
  },
  {
    question: "How can I learn Backend Engineering?",
    answer:
      "Not by watching tutorials. You learn backend engineering by building real, production-grade systems — starting with a working API backed by a real database, authentication, error handling, and deployable architecture. At Masteringbackend, we follow a structured Learn → Build → Grow system that moves you from understanding backend concepts to shipping real systems to getting hired.",
  },
  {
    question: "What skills are required for Backend Engineering?",
    answer:
      "You need proficiency in at least one backend language (Node.js, Python, Go, or Rust), strong database design skills, API architecture, authentication and authorization, error handling, environment configuration, testing, and the ability to reason about system trade-offs. The real skill is designing systems that work in production — not just passing syntax quizzes.",
  },
  {
    question: "What can I use Backend Engineering for?",
    answer:
      "Backend engineers build the core systems behind every product you use — payment processing, user authentication, data pipelines, real-time messaging, search engines, and more. It's one of the most in-demand and highest-paid engineering specializations because companies need engineers who can design, ship, and scale production systems.",
  },
  {
    question: "Is Backend Engineering a good career?",
    answer:
      "Backend engineering is one of the most stable, high-paying, and in-demand careers in tech. But 'good career' depends on you. If you're willing to master system design, ship real projects, and defend your engineering decisions — the market will pay you well. If you're looking for shortcuts, this isn't the right field.",
  },
  {
    question: "Is it difficult to become a Backend Engineer?",
    answer:
      "It demands real effort. You have to move past tutorials and actually build systems that run, break, and get fixed. Most people stall because they consume content without building anything. The ones who succeed are the ones who ship real systems, explain their design decisions, and treat learning like engineering work — not entertainment.",
  },
  {
    question: "Does Backend Engineering require coding?",
    answer:
      "Yes — there are no shortcuts here. You need strong programming fundamentals, the ability to write production-quality code, and fluency in at least one backend language. Beyond syntax, you need to understand data modeling, API contracts, error handling, and how systems behave under real-world conditions.",
  },
  {
    question: "How long does it take to become a Backend Engineer?",
    answer:
      "With focused, structured effort, you can ship your first production-grade backend system within weeks and reach job-ready status in 3–6 months. But timelines depend on how seriously you treat the work. Watching videos doesn't count. Building, defending, and iterating on real systems is what gets you hired.",
  },
];

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getInitialData() {
  try {
    const [roadmapsRes, coursesRes] = await Promise.all([
      fetch(`${API_URL}/public/roadmaps`, { next: { revalidate: 3600 } }),
      fetch(`${API_URL}/public/courses`, { next: { revalidate: 3600 } }),
    ]);

    const roadmapsData = roadmapsRes.ok ? await roadmapsRes.json() : {};
    const coursesData = coursesRes.ok ? await coursesRes.json() : {};

    const courses = (coursesData.courses ?? []).map((c: any) => ({
      slug: c.slug,
      id: c.id,
      title: c.title,
      level: c.level || "Intermediate",
      users: c.totalStudents || 0,
      desc: stripHtml(c.summary || c.description || ""),
      category: c.category || "Software Development",
      hours: c.totalDuration || 0,
      chapters: c.chapters?.length || 0,
      banner: c.banner,
      isPremium: c.isPremium,
    }));

    return {
      roadmaps: roadmapsData.roadmaps ?? [],
      courses,
    };
  } catch {
    return { roadmaps: [], courses: [] };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const { roadmaps, courses } = await getInitialData();

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden text-slate-50"
        style={{ backgroundColor: "#0e2036" }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.1,
            backgroundImage: `linear-gradient(rgba(19,174,206,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(19,174,206,0.4) 1px,transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <Header />

        <section className="relative z-10 container mx-auto px-6 pt-8 pb-24 md:pt-14 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-bold text-white mb-6">
                Backend, AI, and <br className="hidden md:block" />
                <span className="text-[#98D4E3]">Engineering Courses</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                Whether you&apos;re new to Backend, AI, Product, Cybersecurity,
                Cloud Engineering, or want to scale up — this is your home for
                your tech engineering career transformation.
              </p>
              <ul className="space-y-4 text-slate-200">
                <li className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">Learn on your schedule</span>
                </li>
                <li className="flex items-center gap-4">
                  <Code className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">
                    Build real world practical skills
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Layout className="w-5 h-5 text-slate-300" />
                  <span className="text-lg">
                    Defense-based, easy-to-digest lessons
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto aspect-square">
              <HeroIllustration />
            </div>
          </div>
        </section>
      </div>

      {/* ── Browse (client — search, filters, pagination) ───────────────────── */}
      <BrowseSection initialRoadmaps={roadmaps} initialCourses={courses} />

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── FAQs ───────────────────────────────────────────────────────────── */}
      <FAQSection faqs={FAQS} />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
