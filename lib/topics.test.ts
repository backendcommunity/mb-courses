import { describe, it, expect } from "vitest";
import {
  norm, slugify, buildTopics, findTopic,
  matchCourses, matchTracks, matchProjects,
  relatedTopics, topicIntro, topicMetaDescription, topicFaqs, emptyCopy,
  type RawCourse, type RawRoadmap, type RawProject,
} from "./topics";

const courses: RawCourse[] = [
  { title: "Django REST Framework", summary: "Build APIs", slug: "drf", tags: ["Django", "REST API", "Python"], category: "Backend", level: "Intermediate  ", totalDuration: 3, totalStudents: 40 },
  { title: "Caching in Node", summary: "Redis caching", slug: "cache-node", tags: ["Caching", "Node.js"], category: "Backend", level: "Advanced", totalDuration: 2, totalStudents: 10, isPremium: true },
  { title: "Intro to Python", summary: "Python basics", slug: "intro-py", tags: ["Python"], category: "Backend", level: "Basic", totalDuration: 4, totalStudents: 500 },
];
const roadmaps: RawRoadmap[] = [
  { id: "1", title: "Become A Python Backend Engineer", slug: "python-path" },
  { id: "2", title: "Become A Golang Backend Engineer", slug: "go-path" },
];
const projects: RawProject[] = [
  { id: "1", title: "Blog API", slug: "blog-api", technologies: ["Python", " Node.js"], skills: ["API Development"] },
  { id: "2", title: "Rust CLI", slug: "rust-cli", technologies: ["Rust"], skills: ["Systems"] },
];

describe("norm/slugify", () => {
  it("normalizes whitespace and case", () => {
    expect(norm("  Intermediate  ")).toBe("intermediate");
    expect(norm(undefined)).toBe("");
  });
  it("slugifies labels", () => {
    expect(slugify("REST API")).toBe("rest-api");
    expect(slugify("Django REST Framework")).toBe("django-rest-framework");
    expect(slugify("C#")).toBe("c");
  });
});

describe("buildTopics / findTopic", () => {
  it("unions tags + category, dedupes by slug", () => {
    const topics = buildTopics(courses);
    const slugs = topics.map((t) => t.slug);
    expect(slugs).toContain("django");
    expect(slugs).toContain("rest-api");
    expect(slugs).toContain("python");
    expect(slugs).toContain("caching");
    expect(slugs).toContain("backend");
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("resolves a slug back to its label", () => {
    expect(findTopic(courses, "rest-api")?.label).toBe("REST API");
    expect(findTopic(courses, "nope")).toBeNull();
  });
});

describe("matchCourses", () => {
  it("matches by tag", () => {
    const t = findTopic(courses, "python")!;
    expect(matchCourses(courses, t).map((c) => c.slug).sort()).toEqual(["drf", "intro-py"]);
  });
  it("matches by category", () => {
    const t = findTopic(courses, "backend")!;
    expect(matchCourses(courses, t)).toHaveLength(3);
  });
});

describe("matchTracks", () => {
  it("matches roadmaps by title keyword", () => {
    const t = findTopic(courses, "python")!;
    expect(matchTracks(roadmaps, t).map((r) => r.slug)).toEqual(["python-path"]);
  });
});

describe("matchProjects", () => {
  it("matches by normalized technology (handles stray whitespace)", () => {
    const t = findTopic(courses, "python")!;
    expect(matchProjects(projects, t).map((p) => p.slug)).toEqual(["blog-api"]);
  });
});

describe("relatedTopics", () => {
  it("returns co-occurring tags, excluding self", () => {
    const t = findTopic(courses, "django")!;
    const rel = relatedTopics(courses, t).map((x) => x.slug);
    expect(rel).toContain("rest-api");
    expect(rel).toContain("python");
    expect(rel).not.toContain("django");
  });
});

describe("copy generators", () => {
  it("intro + meta include the label and are non-empty", () => {
    const t = findTopic(courses, "python")!;
    expect(topicIntro(t, 2)).toContain("Python");
    const meta = topicMetaDescription(t, 2);
    expect(meta.length).toBeLessThanOrEqual(160);
    expect(meta).toContain("Python");
  });
  it("faqs are a non-empty Q/A list", () => {
    const faqs = topicFaqs(findTopic(courses, "python")!);
    expect(faqs.length).toBeGreaterThan(0);
    expect(faqs[0]).toHaveProperty("question");
    expect(faqs[0]).toHaveProperty("answer");
  });
  it("emptyCopy is branded per section", () => {
    const t = findTopic(courses, "python")!;
    expect(emptyCopy("projects", t)).toContain("Python");
    expect(emptyCopy("related", t)).not.toBe(emptyCopy("projects", t));
  });
});
