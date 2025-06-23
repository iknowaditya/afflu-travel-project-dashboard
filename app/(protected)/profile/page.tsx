"use client";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Lucide icons
import { Loader2, Settings, History } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please login to view your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/login")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/settings")}
          className="w-full sm:w-auto"
        >
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage />
              <AvatarFallback className="text-xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <Badge
                variant={user.role === "admin" ? "destructive" : "default"}
                className="mt-2 capitalize"
              >
                {user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Full Name
              </p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Email Address
              </p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Account Status
              </p>
              <Button
                className="font-medium "
                variant="destructive"
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                Active
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Last Login
              </p>
              <p className="font-medium">
                {user.loginHistory.length > 0
                  ? new Date(user.loginHistory[0].timestamp).toLocaleString()
                  : "Never"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Login Count
              </p>
              <p className="font-medium">{user.loginHistory.length}</p>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="p-4 sm:p-6 flex justify-end gap-4">
          <Button onClick={() => router.push("/profile/history")}>
            <History className="mr-2 h-4 w-4" />
            View Login History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
