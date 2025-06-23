// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // or "/register" if you prefer
  return null;
}
