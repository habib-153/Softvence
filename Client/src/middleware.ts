import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "./services/AuthService";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const user = await getCurrentUser();

  // If user is not logged in
  if (!user) {
    // Allow access to auth routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}${search}`, request.url)
    );
  }

  // If user is logged in
  if (user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/dashboard/:path*",
    "/tasks/:path*",
  ],
};