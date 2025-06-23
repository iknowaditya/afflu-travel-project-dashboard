// app/api/auth/login/route.ts
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { getGeoFromIP } from "@/lib/geolocation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Get IP from headers (works on Vercel/production)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const geo = await getGeoFromIP(ip);

  user.loginHistory.push({
    timestamp: new Date(),
    ip,
    city: geo.city,
    country: geo.country,
  });
  await user.save();

  const token = signToken({ id: user._id, role: user.role });

  const res = NextResponse.json({
    message: "Login successful",
    user: { name: user.name, email: user.email, role: user.role },
  });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
