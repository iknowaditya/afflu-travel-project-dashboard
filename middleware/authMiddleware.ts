// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "@/lib/auth";

// export async function authMiddleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   if (!token)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const decoded = verifyToken(token) as any;
//     (req as any).user = decoded;
//     return NextResponse.next();
//   } catch {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
// }

// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    verifyToken(token); // Only verify, don't mutate req
    return NextResponse.next();
  } catch {
    // Redirect to login if token is invalid
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Protect only certain routes:
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"], // example
};
