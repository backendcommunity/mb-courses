import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Layers,
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
import { ContentList } from "@/components/content-list";
import type { ProcessedContentItem } from "@/components/content-list";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { CertificatePreview } from "@/components/certificate-preview";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header";

// ─── helpers ────────────────────────────────────────────────────────────────

function resolveCountryCode(
  h: Awaited<ReturnType<typeof headers>>,
): string | undefined {
  return (
    (h.get("x-vercel-ip-country") || // Vercel edge
      h.get("cf-ipcountry") || // Cloudflare
      h.get("cloudfront-viewer-country") || // AWS CloudFront
      h.get("x-country-code") || // generic CDN/proxy
      h.get("x-country") || // generic CDN/proxy
      undefined) ??
    undefined
  );
}

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

async function getRoadmap(slug: string) {
  try {
    const res = await fetch(`${API_URL}/public/roadmaps/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.roadmap ?? data ?? null;
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
  const roadmap = await getRoadmap(slug);
  if (!roadmap) return { title: "Roadmap Not Found | MasteringBackend" };

  const description = stripHtml(roadmap.summary || roadmap.description).slice(
    0,
    160,
  );

  const url = `https://masteringbackend.com/${slug}`;
  const images = roadmap.banner
    ? [{ url: roadmap.banner, width: 1200, height: 630, alt: roadmap.title }]
    : [];

  return {
    title: roadmap.title,
    description,
    keywords: [
      roadmap.title,
      "learning path",
      "backend engineering roadmap",
      "tech career",
      "MasteringBackend",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: roadmap.title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: roadmap.title,
      description,
      images: roadmap.banner ? [roadmap.banner] : [],
    },
  };
}

// ─── page ────────────────────────────────────────────────────────────────────

export default async function RoadmapDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const headersList = await headers();
  const detectedCountry = resolveCountryCode(headersList);

  const roadmap = await getRoadmap(slug);

  if (!roadmap) notFound();

  const rawContents: any[] = Array.isArray(roadmap.contents)
    ? roadmap.contents
    : [];

  const contentItems: ProcessedContentItem[] = rawContents.map(
    (c: any, i: number) => ({
      num: i + 1,
      title: c.title || "",
      type: c.type || "course",
      slug: c.slug || undefined,
      summary:
        stripHtml(c.summary || c.description || "").slice(0, 200) || undefined,
      stageNum: c.topicNumber ?? 1,
      stageTitle: c.topicTitle ?? "",
    }),
  );

  const totalCourses = contentItems.filter((i) => i.type === "course").length;
  const totalQuizzes = contentItems.filter((i) => i.type === "quiz").length;

  const fullDescription = (roadmap.description || roadmap.summary || "")
    .replace(/Roadmap Description:\s*/gi, "")
    .trim();

  const learningOutcomes: string[] = Array.isArray(roadmap.learningOutcomes)
    ? roadmap.learningOutcomes
    : Array.isArray(roadmap.skills)
      ? roadmap.skills
      : [
          `Master ${roadmap.title} from fundamentals to advanced level`,
          "Follow a structured, proven learning sequence",
          "Build real-world projects along the way",
          "Get career guidance and interview preparation",
          "Earn a verified certificate upon completion",
        ];

  const tags: string[] = Array.isArray(roadmap.tags)
    ? roadmap.tags
    : roadmap.category
      ? [roadmap.category]
      : [];

  const levelLabel: string =
    roadmap.level?.name ?? roadmap.level ?? roadmap.difficulty ?? null;

  // Canonical CTA destination
  const roadmapAppUrl = `https://app.masteringbackend.com/paths/${roadmap.slug ?? slug}?ref=${encodeURIComponent(`/${slug}`)}`;

  const faqs = [
    {
      question: "Who is this roadmap for?",
      answer:
        stripHtml(roadmap.prerequisites || "") ||
        "This roadmap is designed for developers who want a structured path to mastering backend engineering.",
    },
    {
      question: "How long does this roadmap take?",
      answer: `Estimated time: ${roadmap.timeframe || roadmap.estimatedTime || "varies by pace"}. Most students complete it in a few months of consistent study.`,
    },
    {
      question: "Will I get a certificate?",
      answer:
        "Yes! Upon completing all stages you'll receive a certificate you can add to your LinkedIn and resume.",
    },
    {
      question: "Can I skip stages?",
      answer:
        "We recommend following the sequence, but you can jump to any stage if you already have the prerequisite knowledge.",
    },
    {
      question: "Is there community support?",
      answer:
        "Yes, you'll have access to our community of learners, Q&A forums, and mentorship sessions.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
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

        <Header />

        <section className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="text-[#13AECE] font-bold tracking-widest text-sm uppercase mb-3">
                LEARNING PATH
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-bold text-white mb-4">
                {roadmap.title}
              </h1>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">
                {stripHtml(roadmap.summary || roadmap.description).slice(
                  0,
                  200,
                )}
              </p>
              <div className="mb-10">
                <Button
                  className="bg-gradient-to-r from-[#13AECE] to-[#3b82f6] hover:from-[#0f8b9e] hover:to-[#2563eb] text-white border-0 h-12 px-8 font-semibold text-[15px] rounded-md shadow-lg shadow-[#13AECE]/20"
                  asChild
                >
                  <Link
                    href={roadmapAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Path for Free
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
                {(roadmap.timeframe || roadmap.estimatedTime) && (
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />{" "}
                    {roadmap.timeframe || roadmap.estimatedTime}
                  </span>
                )}
                {contentItems.length > 0 && (
                  <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> {contentItems.length}{" "}
                    Items
                  </span>
                )}
                <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> Certificate
                </span>
              </div>
            </div>

            <div className="w-full max-w-[680px] mx-auto lg:ml-auto">
              {roadmap.banner ? (
                <img
                  src={roadmap.banner}
                  alt={roadmap.title}
                  className="w-full rounded-2xl object-contain object-center"
                />
              ) : (
                <div className="w-full aspect-video rounded-2xl bg-slate-800/60 flex items-center justify-center">
                  <div className="space-y-4 w-3/4">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#13AECE]/30 flex items-center justify-center shrink-0">
                          <span className="text-[#13AECE] text-xs font-bold">
                            {n}
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full bg-slate-700"
                          style={{ width: `${100 - n * 12}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

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

      <section className="bg-[#f8fafc] text-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-12">
              {fullDescription && (
                <DescriptionSection fullText={fullDescription} />
              )}

              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <h3 className="text-xl font-bold text-slate-800">
                  Ready to start your journey?
                </h3>
                <Button
                  className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 px-8 rounded-md w-full sm:w-auto"
                  asChild
                >
                  <Link
                    href={roadmapAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Path for Free
                  </Link>
                </Button>
              </div>

              {learningOutcomes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <Trophy className="w-5 h-5 text-slate-700" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      What you'll achieve
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

              {contentItems.length > 0 && (
                <div>
                  <ContentList
                    items={contentItems}
                    roadmapAppUrl={roadmapAppUrl}
                  />

                  <div className="flex gap-4 items-stretch mt-0">
                    <div className="flex flex-col items-center shrink-0 w-[28px]">
                      <div className="w-px flex-1 bg-[#13AECE]" />
                    </div>

                    <div className="flex-1 pt-4 pb-2">
                      <div className="bg-white border-2 border-[#13AECE] rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/3 shrink-0">
                          <CertificatePreview courseTitle={roadmap.title} />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col gap-3">
                          <h3 className="text-xl font-bold text-slate-800">
                            Earn Certificate of Completion
                          </h3>
                          <p className="text-sm text-slate-600 mb-4">
                            Add this credential to your LinkedIn profile,
                            resume, or CV. Share it on social media and in your
                            performance review.
                          </p>
                          <Button
                            className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 w-full rounded-md h-11"
                            asChild
                          >
                            <Link
                              href={roadmapAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Enroll Now
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
                        {levelLabel} level
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-900 text-[15px]">
                    Path Overview
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {contentItems.length}
                    </div>
                    <div className="text-xs text-slate-500">Items</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {totalCourses || "—"}
                    </div>
                    <div className="text-xs text-slate-500">Courses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0B152A]">
                      {totalQuizzes || "—"}
                    </div>
                    <div className="text-xs text-slate-500">Quizzes</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  A structured path from beginner to production-ready engineer.
                </p>
              </div>

              {(levelLabel || roadmap.timeframe || roadmap.estimatedTime) && (
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 className="w-5 h-5 text-slate-700" />
                    <h3 className="font-bold text-slate-900 text-[15px]">
                      Path Details
                    </h3>
                  </div>
                  <dl className="space-y-3 text-sm">
                    {levelLabel && (
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Difficulty</dt>
                        <dd className="font-medium text-slate-800 capitalize">
                          {levelLabel}
                        </dd>
                      </div>
                    )}
                    {(roadmap.timeframe || roadmap.estimatedTime) && (
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Duration</dt>
                        <dd className="font-medium text-slate-800">
                          {roadmap.timeframe || roadmap.estimatedTime}
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

      <PricingSection
        courseTitle={roadmap.title}
        courseAppUrl={roadmapAppUrl}
        coursePrice={roadmap.amount ?? roadmap.price ?? null}
        detectedCountry={detectedCountry}
        paddlePromoId={roadmap.paddle_price_id ?? undefined}
      />

      <Testimonials />

      <FAQSection faqs={faqs} />
      <Footer />
    </div>
  );
}
