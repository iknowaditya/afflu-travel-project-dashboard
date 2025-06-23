"use client";
import { useEffect, useState } from "react";
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
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { MoveVertical, RefreshCw } from "lucide-react";

export default function AdminUsersPage() {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) return;
    fetch("/api/user/list")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .finally(() => setLoading(false));
  }, [isAdmin]);

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
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <Button
          onClick={() => router.push("/admin/users/create")}
          className="w-full sm:w-auto"
        >
          <Icons.userPlus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Manage your system's user accounts
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-4 p-4 sm:p-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4 sm:px-6">User</TableHead>
                    <TableHead className="px-4 sm:px-6">Email</TableHead>
                    <TableHead className="px-4 sm:px-6">Role</TableHead>
                    <TableHead className="px-4 sm:px-6">Activity</TableHead>
                    <TableHead className="px-4 sm:px-6 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u: any) => (
                    <TableRow key={u._id} className="hover:bg-muted/50">
                      <TableCell className="px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={u.avatar} />
                            <AvatarFallback>
                              {u.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{u.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Joined{" "}
                              {new Date(u.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 sm:px-6">{u.email}</TableCell>
                      <TableCell className="px-4 sm:px-6">
                        <Badge
                          variant={
                            u.role === "admin" ? "destructive" : "default"
                          }
                        >
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <Icons.login className="h-4 w-4 text-muted-foreground" />
                          <span>{u.loginHistory.length} logins</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 sm:px-6 text-right">
                        <Button variant="ghost" size="sm">
                          <MoveVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-center justify-between p-4 sm:flex-row sm:p-6">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{users.length}</span> users
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
