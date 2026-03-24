import { NextRequest, NextResponse } from "next/server";

// @convex-dev/auth stores sessions in localStorage, not cookies.
// Route protection is handled client-side in src/app/portal/layout.tsx.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};