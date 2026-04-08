import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("mb_token")?.value;

    // If no token, return empty data (public users will use fallback from home.tsx)
    if (!token) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const endpoint = "https://demo.masteringbackend.com/api/v3/roadmaps";
    
    console.log("Fetching roadmaps from:", endpoint, "Token present:", !!token);

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Roadmaps response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Roadmaps fetch error:", response.status, errorData);
      // Return empty data on error as fallback
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const data = await response.json();
    console.log("Roadmaps data received:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching roadmaps via proxy:", error);
    // Return empty data as fallback instead of error
    return NextResponse.json({
      success: true,
      data: [],
    });
  }
}
