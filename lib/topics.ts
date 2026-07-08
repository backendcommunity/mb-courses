export interface RawCourse {
  title: string; summary?: string; description?: string; banner?: string;
  slug: string; amount?: number; isPremium?: boolean; tags?: string[];
  level?: string; totalDuration?: number; totalStudents?: number;
  category?: string; chapters?: unknown[];
}
export interface RawRoadmap {
  id: string; title: string; summary?: string; description?: string;
  banner?: string; slug: string; isPremium?: boolean; isWaiting?: boolean;
  level?: string; totalContent?: number;
}
export interface RawProject {
  id: string; title: string; summary?: string; banner?: string; slug: string;
  level?: string; languages?: string[]; duration?: string;
  technologies?: string[]; skills?: string[];
}
export interface Topic { label: string; slug: string }

export function norm(s?: string): string {
  return String(s ?? "").trim().toLowerCase();
}

export function slugify(label: string): string {
  return String(label)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export function buildTopics(courses: RawCourse[]): Topic[] {
  const bySlug = new Map<string, string>(); // slug -> first-seen label
  for (const c of courses) {
    const labels = [...(c.tags ?? []), ...(c.category ? [c.category] : [])];
    for (const raw of labels) {
      const label = String(raw).trim();
      if (!label) continue;
      const slug = slugify(label);
      if (slug && !bySlug.has(slug)) bySlug.set(slug, label);
    }
  }
  return [...bySlug.entries()]
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function findTopic(courses: RawCourse[], slug: string): Topic | null {
  return buildTopics(courses).find((t) => t.slug === slug) ?? null;
}

function courseMatchesTopic(c: RawCourse, topic: Topic): boolean {
  const n = norm(topic.label);
  if ((c.tags ?? []).some((t) => norm(t) === n)) return true;
  if (norm(c.category) === n) return true;
  if (norm(c.title).includes(n) || norm(c.summary).includes(n)) return true;
  return false;
}

export function matchCourses(courses: RawCourse[], topic: Topic): RawCourse[] {
  return courses.filter((c) => courseMatchesTopic(c, topic));
}

export function matchTracks(roadmaps: RawRoadmap[], topic: Topic): RawRoadmap[] {
  const n = norm(topic.label);
  const first = n.split(" ")[0];
  return roadmaps.filter(
    (r) => norm(r.title).includes(n) || (first.length > 2 && norm(r.title).includes(first)),
  );
}

export function matchProjects(projects: RawProject[], topic: Topic): RawProject[] {
  const n = norm(topic.label);
  const hit = (arr?: string[]) => (arr ?? []).some((x) => norm(x) === n || norm(x).includes(n));
  return projects.filter((p) => hit(p.technologies) || hit(p.skills) || hit(p.languages));
}

export function relatedTopics(courses: RawCourse[], topic: Topic, limit = 8): Topic[] {
  const matched = matchCourses(courses, topic);
  const counts = new Map<string, { label: string; n: number }>();
  for (const c of matched) {
    const labels = [...(c.tags ?? []), ...(c.category ? [c.category] : [])];
    for (const raw of labels) {
      const label = String(raw).trim();
      const slug = slugify(label);
      if (!slug || slug === topic.slug) continue;
      const prev = counts.get(slug);
      counts.set(slug, { label, n: (prev?.n ?? 0) + 1 });
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1].n - a[1].n || a[1].label.localeCompare(b[1].label))
    .slice(0, limit)
    .map(([slug, v]) => ({ slug, label: v.label }));
}

export function topicIntro(topic: Topic, courseCount: number): string {
  const label = topic.label;
  const count = courseCount > 0 ? `${courseCount} hands-on ${courseCount === 1 ? "course" : "courses"}` : "hands-on courses";
  return `Master ${label} with ${count} built by working backend engineers. Learn by building real projects, earn a shareable certificate, and level up at your own pace.`;
}

export function topicMetaDescription(topic: Topic, courseCount: number): string {
  const base = `Learn ${topic.label} with practical, project-based courses and tracks on MasteringBackend. Build real skills and earn a certificate.`;
  return base.length <= 160 ? base : base.slice(0, 157).trimEnd() + "…";
}

export function topicFaqs(topic: Topic): { question: string; answer: string }[] {
  const l = topic.label;
  return [
    { question: `What will I learn in these ${l} courses?`, answer: `You'll go from fundamentals to production-ready ${l} skills through short lessons and hands-on projects you build yourself.` },
    { question: `Do I need prior experience to start ${l}?`, answer: `Most tracks start at a basic level. Pick a Basic course to begin, or jump to Intermediate/Advanced if you already know the fundamentals.` },
    { question: `Will I get a certificate?`, answer: `Yes — complete a course and you'll earn a certificate you can add to LinkedIn, your resume, and your performance reviews.` },
    { question: `How long does it take?`, answer: `Each course lists its duration in hours. Learn at your own pace — start free and upgrade any time.` },
  ];
}

export function emptyCopy(section: "recommended" | "related" | "projects", topic: Topic): string {
  const l = topic.label;
  switch (section) {
    case "recommended":
      return `Fresh ${l} picks are being curated. In the meantime, start any course free and begin building today.`;
    case "related":
      return `More ${l} guides and tracks are on the way. Explore the full MasteringBackend library while you wait.`;
    case "projects":
      return `Hands-on ${l} projects drop regularly. Browse all projects to start applying your skills right now.`;
  }
}
