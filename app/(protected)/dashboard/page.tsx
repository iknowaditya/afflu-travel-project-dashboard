"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please login to view this page
            </p>
            <Button
              className="mt-4"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      {/* Welcome Banner */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Welcome back, {user.name}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your account today
        </p>
      </div>

      <div className="grid gap-6">
        {/* User Profile Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Your Profile</CardTitle>
              <Badge
                variant={isAdmin() ? "destructive" : "default"}
                className="capitalize"
              >
                {user.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-16 w-16 md:h-20 md:w-20">
                <AvatarImage />
                <AvatarFallback className="text-xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Login
                  </p>
                  <p className="font-medium">
                    {new Date(
                      user.loginHistory[0]?.timestamp || Date.now()
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Dashboard */}
        {isAdmin() && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Total Users</CardDescription>
                  <CardTitle className="text-3xl">1,248</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +12.3% from last month
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Active Sessions</CardDescription>
                  <CardTitle className="text-3xl">87</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +5.2% from yesterday
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Storage Used</CardDescription>
                  <CardTitle className="text-3xl">45%</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={45} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    256GB of 512GB used
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your system with one click
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2">
                    <Icons.users className="h-4 w-4" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Icons.settings className="h-4 w-4" />
                    System Settings
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Icons.report className="h-4 w-4" />
                    Generate Reports
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Icons.activity className="h-4 w-4" />
                    View Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Recent Activity */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.loginHistory.slice(0, 5).map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Icons.login className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Login from {log.city}, {log.country}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="hidden sm:inline-flex">
                    {log.ip}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" className="w-full gap-1">
                View All Activity
                <Icons.chevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Dashboard */}
        {!isAdmin() && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Tasks Completed</CardDescription>
                <CardTitle className="text-3xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={80} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  80% of monthly goal
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Active Projects</CardDescription>
                <CardTitle className="text-3xl">3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  2 on track, 1 delayed
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Upcoming Deadlines</CardDescription>
                <CardTitle className="text-3xl">2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Next deadline in 3 days
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
