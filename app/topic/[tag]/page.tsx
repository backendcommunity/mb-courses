import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, BookOpen, Trophy, CheckCircle, ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import Testimonials from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";
import { TopicBrowse } from "@/components/topic-browse";
import { CourseCard, TrackCard, type CourseCardData, type TrackCardData } from "@/components/content-card";
import {
  buildTopics, findTopic, matchCourses, matchTracks, matchProjects,
  relatedTopics, topicIntro, topicMetaDescription, topicFaqs, emptyCopy,
  slugify,
  type RawCourse, type RawRoadmap, type RawProject, type Topic,
} from "@/lib/topics";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://demo.masteringbackend.com/api/v3";

function stripHtml(html?: string): string {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}

async function getJson(path: string): Promise<any> {
  try {
    const res = await fetch(`${API_URL}/${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}
async function getCourses(): Promise<RawCourse[]> {
  return (await getJson("public/courses"))?.courses ?? [];
}
async function getRoadmaps(): Promise<RawRoadmap[]> {
  return (await getJson("public/roadmaps"))?.roadmaps ?? [];
}
async function getProjects(): Promise<RawProject[]> {
  return (await getJson("public/projects"))?.projects ?? [];
}

function toCourseCard(c: RawCourse): CourseCardData {
  return {
    slug: c.slug, title: c.title, level: (c.level || "Intermediate").trim(),
    users: c.totalStudents || 0, desc: stripHtml(c.summary || c.description || ""),
    category: c.category || "Software Development", hours: c.totalDuration || 0,
    chapters: c.chapters?.length || 0, banner: c.banner, isPremium: c.isPremium,
  };
}
function toTrackCard(r: RawRoadmap): TrackCardData {
  return {
    id: r.id, slug: r.slug, title: r.title, summary: r.summary,
    description: r.description, banner: r.banner, totalContent: r.totalContent,
    isWaiting: r.isWaiting,
  };
}

export async function generateStaticParams() {
  const courses = await getCourses();
  return buildTopics(courses).map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const courses = await getCourses();
  const topic = findTopic(courses, tag);
  if (!topic) return { title: "Topic Not Found | MasteringBackend" };
  const count = matchCourses(courses, topic).length;
  const url = `https://masteringbackend.com/topic/${topic.slug}`;
  return {
    title: `${topic.label} Courses & Tracks | MasteringBackend`,
    description: topicMetaDescription(topic, count),
    keywords: [topic.label, `${topic.label} course`, "backend engineering", "MasteringBackend"],
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: `${topic.label} Courses & Tracks`, description: topicMetaDescription(topic, count) },
    twitter: { card: "summary_large_image", title: `${topic.label} Courses & Tracks`, description: topicMetaDescription(topic, count) },
  };
}

export default async function TopicPage({
  params,
}: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const [courses, roadmaps, projects] = await Promise.all([
    getCourses(), getRoadmaps(), getProjects(),
  ]);
  const topic = findTopic(courses, tag);
  if (!topic) notFound();

  const matchedCourses = matchCourses(courses, topic);
  if (matchedCourses.length === 0) notFound();

  const tracks = matchTracks(roadmaps, topic).map(toTrackCard);
  const projectMatches = matchProjects(projects, topic);
  const related = relatedTopics(courses, topic);
  const courseCards = matchedCourses.map(toCourseCard);

  const featuredCourse = [...matchedCourses]
    .sort((a, b) => (b.totalStudents || 0) - (a.totalStudents || 0))[0];
  const featuredTrack = tracks[0];

  const totalHours = matchedCourses.reduce((s, c) => s + (c.totalDuration || 0), 0);
  const topicAppUrl = `https://app.masteringbackend.com/courses?ref=${encodeURIComponent(`/topic/${topic.slug}`)}`;
  const faqs = topicFaqs(topic);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden text-slate-50" style={{ backgroundColor: "#0e2036" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1, backgroundImage: `linear-gradient(rgba(19,174,206,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(19,174,206,0.4) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <Header />
        <section className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="text-[#13AECE] font-bold tracking-widest text-sm uppercase mb-3">COURSES · {topic.label}</div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] font-bold text-white mb-4">{topic.label} courses</h1>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg">{topicIntro(topic, matchedCourses.length)}</p>
              <div className="mb-10">
                <Button className="bg-gradient-to-r from-[#13AECE] to-[#3b82f6] hover:from-[#0f8b9e] hover:to-[#2563eb] text-white border-0 h-12 px-8 font-semibold text-[15px] rounded-md shadow-lg shadow-[#13AECE]/20" asChild>
                  <Link href={topicAppUrl} target="_blank" rel="noopener noreferrer">Start Learning for Free</Link>
                </Button>
                <p className="text-slate-400 text-sm pt-2"><CheckCircle className="w-4 h-4 inline mr-2" />Included with Pro, Enterprise, or One-time payment</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {matchedCourses.length} Courses</span>
                {totalHours > 0 && (<span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {totalHours} hr</span>)}
                <span className="bg-slate-800/60 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-700/50 flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> Certificate</span>
              </div>
            </div>
            <div className="w-full max-w-[520px] mx-auto lg:ml-auto">
              <div className="bg-white rounded-2xl p-8 text-slate-900 shadow-2xl">
                <h2 className="text-2xl font-bold text-center mb-1">Create Your Free Account</h2>
                <p className="text-sm text-slate-500 text-center mb-6">Start {topic.label} today — no credit card required.</p>
                <Button className="w-full bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 h-12 rounded-md font-semibold mb-3" asChild>
                  <Link href={topicAppUrl} target="_blank" rel="noopener noreferrer">Get Started Free</Link>
                </Button>
                <p className="text-xs text-slate-400 text-center">By continuing you accept our Terms and Privacy Policy.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Recommended */}
      <section className="bg-white text-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-[2rem] font-extrabold text-[#0B152A] mb-2">Recommended for {topic.label} beginners</h2>
          <p className="text-slate-500 mb-8">Curated by working backend engineers to get you building fast.</p>
          {featuredCourse || featuredTrack ? (
            <div className="grid md:grid-cols-2 gap-6">
              {featuredCourse && <CourseCard course={toCourseCard(featuredCourse)} />}
              {featuredTrack && <TrackCard roadmap={featuredTrack} />}
            </div>
          ) : (
            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-8 text-center">
              <p className="text-slate-600">{emptyCopy("recommended", topic)}</p>
            </div>
          )}
        </div>
      </section>

      {/* Browse grid + filters */}
      <TopicBrowse tagLabel={topic.label} courses={courseCards} tracks={tracks} />

      {/* Related resources */}
      <section className="bg-white text-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-[2rem] font-extrabold text-[#0B152A] mb-8">Related resources on {topic.label}</h2>
          {related.length > 0 || tracks.length > 0 ? (
            <>
              {related.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/topic/${r.slug}`} className="px-4 py-2 rounded-full bg-[#f8fafc] border border-slate-200 text-sm font-medium text-slate-700 hover:border-[#13AECE] hover:text-[#13AECE] transition-colors">
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
              {tracks.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tracks.slice(0, 3).map((t) => <TrackCard key={t.id} roadmap={t} />)}
                </div>
              )}
            </>
          ) : (
            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-8 text-center">
              <p className="text-slate-600">{emptyCopy("related", topic)}</p>
            </div>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-[#f8fafc] text-slate-900 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-[2rem] font-extrabold text-[#0B152A] mb-2">Ready to apply your {topic.label} skills?</h2>
          <p className="text-slate-500 mb-8">Build real-world projects and add them to your portfolio.</p>
          {projectMatches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projectMatches.slice(0, 6).map((p) => (
                <Link key={p.id} href={`https://app.masteringbackend.com/projects/${p.slug}?ref=${encodeURIComponent(`/topic/${topic.slug}`)}`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Project</span>
                    <h4 className="text-lg font-bold text-[#0B152A] mb-2 leading-tight group-hover:text-[#13AECE] transition-colors line-clamp-2">{p.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-4">{stripHtml(p.summary || "")}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-4 border-t border-slate-100">
                      <Rocket className="w-3.5 h-3.5" /> {p.level || "All levels"}
                      {p.duration && (<><span className="text-slate-300">|</span><span>{p.duration}</span></>)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <p className="text-slate-600 mb-4">{emptyCopy("projects", topic)}</p>
              <Button className="bg-[#13AECE] hover:bg-[#0f8b9e] text-white border-0 rounded-md" asChild>
                <Link href="https://app.masteringbackend.com/projects" target="_blank" rel="noopener noreferrer">Browse all projects <ArrowRight className="w-4 h-4 ml-1 inline" /></Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Testimonials />
      <FAQSection faqs={faqs} />
      <Footer />

      {/* ItemList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${topic.label} Courses`,
            itemListElement: matchedCourses.map((c, i) => ({
              "@type": "ListItem", position: i + 1, name: c.title,
              url: `https://masteringbackend.com/courses/${c.slug}`,
            })),
          }),
        }}
      />
    </div>
  );
}
