"use client";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function ProfileHistoryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please login to view your login history
            </CardDescription>
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
          <h1 className="text-2xl font-bold tracking-tight">Login History</h1>
          <p className="text-muted-foreground">
            Your recent account login activity
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <div className="space-y-1">
            <CardTitle>Recent Logins</CardTitle>
            <CardDescription>
              {user.loginHistory.length} login attempts recorded
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 sm:px-6">Date & Time</TableHead>
                  <TableHead className="px-4 sm:px-6">IP Address</TableHead>
                  <TableHead className="px-4 sm:px-6">Location</TableHead>
                  <TableHead className="px-4 sm:px-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.loginHistory.map((log, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/50">
                    <TableCell className="px-4 sm:px-6">
                      <div className="font-medium">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 sm:px-6">
                      <Badge variant="outline" className="font-mono">
                        {log.ip}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 sm:px-6">
                      <div className="font-medium">{log.city || "Unknown"}</div>
                      <div className="text-sm text-muted-foreground">
                        {log.country || "Unknown"}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 sm:px-6">
                      <Badge variant="destructive">Successful</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
