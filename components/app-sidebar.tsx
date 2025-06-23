"use client";

import * as React from "react";
import Link from "next/link";
import {
  IconChartBar,
  IconDashboard,
  IconUsers,
  IconUserPlus,
  IconHistory,
  IconUserCircle,
  IconReport,
  IconInnerShadowTop,
  IconProps,
} from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<IconProps>;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarItem = NavItem | NavGroup;

function isNavGroup(item: SidebarItem): item is NavGroup {
  return "items" in item;
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user, isAdmin } = useAuth();
  const pathname = usePathname();

  const navItems: SidebarItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },

    ...(isAdmin()
      ? [
          {
            title: "User Management",
            items: [
              {
                title: "All Users",
                url: "/admin/users",
                icon: IconUsers,
              },
              {
                title: "Create User",
                url: "/admin/users/create",
                icon: IconUserPlus,
              },
            ],
          } as NavGroup,
          {
            title: "Login History",
            url: "/admin/logins",
            icon: IconHistory,
          } as NavItem,
        ]
      : [
          {
            title: "My Profile",
            url: "/profile",
            icon: IconUserCircle,
          } as NavItem,
          {
            title: "Login History",
            url: "/profile/history",
            icon: IconHistory,
          } as NavItem,
        ]),
    {
      title: "Reports",
      url: "/reports",
      icon: IconReport,
    } as NavItem,
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted"
              >
                <IconInnerShadowTop className="size-6" />
                <span className="text-lg font-semibold tracking-tight">
                  User Portal
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator className="my-1" />

      <SidebarContent className="px-2">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            if (isNavGroup(item)) {
              return (
                <React.Fragment key={item.title}>
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {item.title}
                  </div>
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.url}
                      href={subItem.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname === subItem.url
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <subItem.icon className="size-5" />
                      <span>{subItem.title}</span>
                    </Link>
                  ))}
                </React.Fragment>
              );
            } else {
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.url
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="size-5" />
                  <span>{item.title}</span>
                </Link>
              );
            }
          })}
        </nav>
      </SidebarContent>

      <Separator className="my-1" />

      <SidebarFooter className="p-4">
        <NavUser
          user={{
            name: user?.name || "Guest",
            email: user?.email || "guest@example.com",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
