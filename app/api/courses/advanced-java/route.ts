import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch Advanced Java course directly by slug
    const response = await fetch("https://demo.masteringbackend.com/api/v3/public/courses/advanced-java");

    if (response.ok) {
      const data = await response.json();
      console.log("Advanced Java course fetched successfully from direct endpoint");
      // Backend returns {message: "Success", course: {...}}, so extract the course
      return NextResponse.json(data.course || data, {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' }
      });
    }

    // If direct endpoint fails, return mock data as fallback
    console.warn(`Direct course endpoint returned ${response.status}, using mock data`);
    return NextResponse.json({
      id: "advanced-java",
      title: "Advanced Java",
      slug: "advanced-java",
      summary: "Advanced Java covers collections, I/O streams, build tools, and multithreading to help you build scalable, optimized applications.",
      description: "<h2>Learn Advanced Java</h2><p>Master collections, I/O streams, build tools, and multithreading concepts.</p>",
      banner: "https://pub-63da695b9ece47c5b3b49bd78b86d884.r2.dev/design-patterns-in-java.png",
      preview: "1135011825",
      totalDuration: 5,
      chapters: []
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' }
    });
  } catch (error) {
    console.error("Error fetching advanced java course:", error);
    // Return mock data on error instead of 500 response
    return NextResponse.json({
      id: "advanced-java",
      title: "Advanced Java",
      slug: "advanced-java",
      summary: "Advanced Java covers collections, I/O streams, build tools, and multithreading to help you build scalable, optimized applications.",
      description: "<h2>Learn Advanced Java</h2><p>Master collections, I/O streams, build tools, and multithreading concepts.</p>",
      banner: "https://pub-63da695b9ece47c5b3b49bd78b86d884.r2.dev/design-patterns-in-java.png",
      preview: "1135011825",
      totalDuration: 5,
      chapters: []
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' }
    });
  }
}
