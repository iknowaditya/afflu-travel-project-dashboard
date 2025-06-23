"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./ui/ModeToggle";
import { Menu, Github } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname(); // Get the current URL pathname

  const pathTitles: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/analytics": "Analytics",
    "/admin/users": "All Users",
    "/admin/users/create": "Create User",
    "/admin/logins": "Admin Login History",
    "/profile": "My Profile",
    "/profile/history": "My Login History",
    "/reports": "Reports",
    "/login": "Login",
    "/register": "Register",

    "/": "Home",
  };

  const currentPageTitle = pathTitles[pathname] || "User Portal";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        {/* Left side - Sidebar trigger and app name/current page title */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8 p-0">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>

          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight">
              {currentPageTitle} {/* Display the determined title here */}
            </h1>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Github className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              GitHub
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
