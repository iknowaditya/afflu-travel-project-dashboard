import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const users = await User.find({}, "-hashedPassword"); // exclude passwords!
  return NextResponse.json({ users });
}
