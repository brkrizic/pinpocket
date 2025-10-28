import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("accessToken")?.value;

   // Check if path matches any protected route (supports nested)
  const isProtectedRoute = protectedRoutes.some(route => path === route || path.startsWith(route + "/"));
  const isPublicRoute = publicRoutes.includes(path);;

  // Redirect if user is not logged in
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect if user is already logged in
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
