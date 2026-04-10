import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("mb_token")?.value;

    // Always use the public roadmaps endpoint now that it's available
    const endpoint = "https://demo.masteringbackend.com/api/v3/public/roadmaps";
    
    console.log("Fetching roadmaps from:", endpoint);

    const response = await fetch(endpoint);

    console.log("Roadmaps response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Roadmaps fetch error:", response.status, errorData);
      // Return empty data as fallback
      return NextResponse.json({
        message: "Success",
        roadmaps: [],
      });
    }

    const data = await response.json();
    console.log("Roadmaps data received, count:", data.roadmaps?.length);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching roadmaps via proxy:", error);
    // Return empty data as fallback
    return NextResponse.json({
      message: "Success",
      roadmaps: [],
    });
  }
}
