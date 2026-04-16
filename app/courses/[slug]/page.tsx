import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Code,
  Trophy,
  Check,
  Users,
  BarChart2,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Testimonials from "@/components/testimonials";
import { DescriptionSection } from "@/components/description-section";
import { ChapterCard } from "@/components/chapter-card";
import type { ProcessedChapter } from "@/components/chapter-card";
import { FAQSection } from "@/components/faq-section";
import { CertificatePreview } from "@/components/certificate-preview";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header";

// ─── helpers ────────────────────────────────────────────────────────────────

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://demo.masteringbackend.com/api/v3";

function stripHtml(html?: string): string {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function getCourse(slug: string) {
  try {
    const res = await fetch(`${API_URL}/public/courses/${slug}`, {
      next: { revalidate: 3600 }, // ISR — re-generate at most every hour
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.course ?? data ?? null;
  } catch {
    return null;
  }
}

// ─── SEO metadata ────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "Course Not Found" };

  const description = stripHtml(course.summary || course.description).slice(
    0,
    160,
  );
  const url = `https://masteringbackend.com/courses/${slug}`;
  const images = course.banner
    ? [{ url: course.banner, width: 1200, height: 630, alt: course.title }]
    : [];

  return {
    title: course.title,
    description,
    keywords: [
      course.title,
      course.level,
      course.category,
      "backend engineering course",
      "online coding course",
      "MasteringBackend",
    ].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: course.title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
      images: course.banner ? [course.banner] : [],
    },
  };
}

// ─── page ────────────────────────────────────────────────────────────────────

export default async function CourseDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) notFound();

  // ── process data server-side so client components get plain JSON ──────────

  const rawChapters = Array.isArray(course.chapters) ? course.chapters : [];

  const chapters: ProcessedChapter[] = rawChapters.map((ch: any, i: number) => {
    const summary = stripHtml(ch.description || ch.summary || ch.content || "");

    const videos = Array.isArray(ch.videos)
      ? ch.videos.map((v: any) => ({
          title: stripHtml(v.title || v.name || v.heading || ""),
          duration: v.duration || v.length || "",
          mb: v.mb,
        }))
      : [];

    const lessons = Array.isArray(ch.lessons)
      ? ch.lessons.map((l: any) =>
          typeof l === "string"
            ? l
            : stripHtml(l.title || l.name || l.summary || l.description || ""),
        )
      : [];
    return {
      num: i + 1,
      title: ch.title || `Chapter ${i + 1}`,
      summary,
      videos,
      lessons,
    };
  });

  const totalVideos = rawChapters.reduce(
    (acc: number, ch: any) =>
      acc + (Array.isArray(ch.videos) ? ch.videos.length : 0),
    0,
  );
  const totalQuizzes =
    rawChapters.reduce(
      (acc: number, ch: any) =>
        acc + (Array.isArray(ch.quizzes) ? ch.quizzes.length : 0),
      0,
    ) + (Array.isArray(course.quizzes) ? course.quizzes.length : 0);

  const fullDescription =
    course.description ||
    course.summary ||
    ""
      .replace(/Course Description:\s*/gi, "")
      .replace(/In this course[\s\S]*/i, "")
      .trim();

  const learningOutcomes: string[] = Array.isArray(course.learningOutcomes)
    ? course.learningOutcomes
    : Array.isArray(course.objectives)
      ? course.objectives
      : [
          `Master ${course.title} from fundamentals to advanced concepts`,
          "Build real-world projects applying what you've learned",
          "Understand best practices and industry standards",
          "Gain confidence to work on production-level applications",
          "Prepare for technical interviews and career advancement",
        ];

  const tags: string[] = Array.isArray(course.tags)
    ? course.tags
    : course.category
      ? [course.category]
      : [];

  const coursePrice: number | null =
    course.amount != null
      ? Number(course.amount)
      : course.price != null
        ? Number(course.price)
        : course.cost != null
          ? Number(course.cost)
          : null;

  const levelLabel: string = course.level?.name ?? course.level ?? null;

  // Canonical CTA destination — deep-links into the app with a referral back to this page
  const courseAppUrl = `https://app.masteringbackend.com/courses/${course.slug ?? slug}?ref=${encodeURIComponent(`/courses/${slug}`)}`;

  const faqs = [
    {
      question: "What prior knowledge do I need?",
      answer:
        stripHtml(course.prerequisites || "") ||
        "Some programming experience is recommended. Check the course description for specific prerequisites.",
    },
    {
      question: "How long does this course take?",
      answer: `This course has ${course.totalDuration || course.duration || "several"} hours of content. Complete it at your own pace.`,
    },
    {
      question: "Will I get a certificate?",
      answer:
        "Yes! Upon completion you'll receive a certificate you can share on LinkedIn and your resume.",
    },
    {
      question: "Can I download course materials?",
      answer:
        "Yes, all code examples and resources are available for offline access.",
    },
    {
      question: "Is there career support after the course?",
      answer:
        "Yes — career guidance, resume reviews, and mock interviews are available through the platform.",
    },
  ];

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden text-slate-50"
        style={{ backgroundColor: "#0e2036" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.1,
            backgroundImage: `linear-gradient(rgba(19,174,206,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(19,174,206,0.4) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Nav */}
        <Header />

        {/* Hero body */}
        <section className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="text-[#13AECE] font-bold tracking-widest text-sm uppercase mb-3">
                COURSE
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
                {stripHtml(course.summary || course.description).slice(0, 200)}
              </p>
              <div className="mb-10">
                <Button
                  className="bg-gradient-to-r from-[#13AECE] to-[#3b82f6] hover:from-[#0f8b9e] hover:to-[#2563eb] text-white border-0 h-12 px-8 font-semibold text-[15px]  rounded-md shadow-lg shadow-[#13AECE]/20"
                  asChild
                >
                  <Link
                    href={courseAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Course for Free
                  </Link>
                </Button>
                <p className="text-slate-400 text-sm pt-2">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Included with Pro, Enterprise, or One-time payment
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50"
                  >
                    {tag}
                  </span>
                ))}
                {(course.totalDuration || course.duration) && (
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />{" "}
                    {course.totalDuration || course.duration} hr
                  </span>
                )}
                {chapters.length > 0 && (
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" /> {chapters.length} Chapters
                  </span>
                )}
                <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> Certificate
                </span>
              </div>
            </div>

            <div className="w-full max-w-[680px] mx-auto lg:ml-auto">
              {course.banner || course.thumbnail ? (
                <img
                  src={course.banner || course.thumbnail}
                  alt={course.title}
                  className="w-full rounded-2xl object-contain object-center"
                />
              ) : (
                <div className="w-full aspect-video rounded-2xl bg-slate-800/60 flex items-center justify-center">
                  <Code className="w-16 h-16 text-slate-600" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Social proof strip */}
        <section className="relative z-10 border-t border-white/5 py-8">
          <div className="container mx-auto px-6">
            <p className="text-slate-400 text-sm mb-6">
              Loved by learners at thousands of companies
            </p>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-40 grayscale">
              <div className="text-xl font-bold">Razorpay</div>
              <div className="text-xl font-bold">Salesforce</div>
              <div className="text-xl font-black tracking-widest">Amazon</div>
              <div className="text-xl font-bold">Protocloud</div>
              <div className="text-xl font-bold">SentinelOne</div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Main content ── */}
      <section className="bg-[#f8fafc] text-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description with show-more (client) */}
              {fullDescription && (
                <DescriptionSection fullText={fullDescription} />
              )}

              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <h3 className="text-xl font-bold text-slate-800">
                  Ready to start?
                </h3>
                <Button
                  className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 px-8 rounded-md w-full sm:w-auto"
                  asChild
                >
                  <Link
                    href={courseAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Course for Free
                  </Link>
                </Button>
              </div>

              {/* Learning outcomes */}
              {learningOutcomes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Trophy className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      What you'll learn
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {learningOutcomes.map((outcome: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {stripHtml(outcome)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Course content (chapters, client) */}
              {chapters.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Course Content
                  </h3>
                  <div className="space-y-4">
                    {chapters.map((chapter) => (
                      <ChapterCard
                        key={chapter.num}
                        chapter={chapter}
                        courseAppUrl={courseAppUrl}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Certificate banner */}
              <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 shrink-0">
                  <CertificatePreview courseTitle={course.title} />
                </div>
                <div className="w-full md:w-2/3 flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-slate-800">
                    Earn Certificate of Completion
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Add this credential to your LinkedIn profile, resume, or CV.
                    Share it on social media and in your performance review.
                  </p>
                  <Button
                    className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 w-full rounded-md h-11"
                    asChild
                  >
                    <Link
                      href={courseAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enroll Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-[15px]">
                    Instructor
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    <img
                      src="/logo.png"
                      alt="MasteringBackend"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#13AECE] text-[15px]">
                      Mastering Backend
                    </span>
                    {levelLabel && (
                      <span className="text-xs text-slate-500 capitalize mt-0.5">
                        {levelLabel} course
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-[15px]">
                    Course Resources
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {chapters.length}
                    </div>
                    <div className="text-xs text-slate-500">Chapters</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {totalVideos}
                    </div>
                    <div className="text-xs text-slate-500">Videos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {totalQuizzes}
                    </div>
                    <div className="text-xs text-slate-500">Quizzes</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Additional resources and downloads available inside the
                  course.
                </p>
              </div>

              {(levelLabel ||
                course.totalDuration ||
                course.duration ||
                course.totalStudents) && (
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 className="w-5 h-5 text-slate-700" />
                    <h3 className="font-bold text-slate-900 text-[15px]">
                      Course Details
                    </h3>
                  </div>
                  <dl className="space-y-3 text-sm">
                    {levelLabel && (
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Level</dt>
                        <dd className="font-medium text-slate-800 capitalize">
                          {levelLabel}
                        </dd>
                      </div>
                    )}
                    {(course.totalDuration || course.duration) && (
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Duration</dt>
                        <dd className="font-medium text-slate-800">
                          {course.totalDuration || course.duration} hrs
                        </dd>
                      </div>
                    )}
                    {course.totalStudents > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Students</dt>
                        <dd className="font-medium text-slate-800">
                          {Number(course.totalStudents).toLocaleString()}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing (client — has toggle) ── */}
      {/* <PricingSection coursePrice={coursePrice} courseTitle={course.title} courseAppUrl={courseAppUrl} /> */}

      <Testimonials />

      {/* ── FAQs (client — has accordion) ── */}
      <FAQSection faqs={faqs} />

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
