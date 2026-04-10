import { NextResponse } from "next/server";

export async function GET(
  request: import("next/server").NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // Fetch all courses and find the one matching the slug
    const response = await fetch("https://demo.masteringbackend.com/api/v3/public/courses");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    const course = data.courses?.find((c: any) => 
      c.slug === slug || c.slug?.toLowerCase() === slug?.toLowerCase()
    );

    if (!course) {
      // Return 404 if course not found
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to load course" },
      { status: 500 }
    );
  }
}
