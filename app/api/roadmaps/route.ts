import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://demo.masteringbackend.com/api/v3/roadmaps", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching roadmaps via proxy:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load roadmaps from backend" },
      { status: 500 }
    );
  }
}
