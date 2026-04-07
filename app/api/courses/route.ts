import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://demo.masteringbackend.com/api/v3/public/courses", {
      next: { revalidate: 3600 }, // Cache the result for 1 hour to reduce backend load
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching courses via proxy:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load courses from backend" },
      { status: 500 }
    );
  }
}
