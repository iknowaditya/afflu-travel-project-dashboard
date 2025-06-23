import { NextRequest, NextResponse } from "next/server";

export function requireAdmin(req: NextRequest) {
  // user should be attached by authMiddleware
  const user = (req as any).user;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.next();
}
