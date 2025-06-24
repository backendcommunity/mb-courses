import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useUser } from "./hooks/use-user";

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;
  // const user = useUser();
  // if (!user) return NextResponse.redirect(new URL("/auth/login", request.url));

  const token = request.cookies.get("mb_token");

  // Check if the user is authenticated (this is a simplified example)
  // In a real app, you would check for a valid session token
  const isAuthenticated = !!token; // Replace with actual auth check

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !pathname.startsWith("/auth")) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If the user is authenticated and trying to access the login page
  if (isAuthenticated && ["auth"].includes(pathname)) {
    // Redirect to the dashboard
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|wav|mp3)).*)",
  ],
};
