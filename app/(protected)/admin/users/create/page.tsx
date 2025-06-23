"use client";
import CreateUserForm from "@/components/CreateUserForm";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function CreateUserPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  if (!user || !isAdmin()) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to view this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Return to Dashboard
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
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Create new user accounts for your system
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/users")}
          className="w-full sm:w-auto"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <div className="space-y-1">
            <CardTitle>Create New User</CardTitle>
            <CardDescription>
              Fill in the details below to create a new user account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="">
          <CreateUserForm />
        </CardContent>
      </Card>
    </div>
  );
}
