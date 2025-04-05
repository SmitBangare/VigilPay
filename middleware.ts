import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { parseJwt } from "./lib/auth-utils"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Define public routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/forgot-password"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // Check if the route is the API route
  const isApiRoute = pathname.startsWith("/api/")

  // If it's a public route and user is logged in, redirect to dashboard
  if (isPublicRoute && authToken) {
    try {
      const payload = parseJwt(authToken)
      // Only redirect if token is valid and not expired
      if (payload && payload.exp > Math.floor(Date.now() / 1000)) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // If token is invalid, continue to public route
      return NextResponse.next()
    }
  }

  // If it's not a public route or API route and user is not logged in, redirect to login
  if (!isPublicRoute && !isApiRoute && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

