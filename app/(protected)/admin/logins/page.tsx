"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import {
  RefreshCw,
  History,
  User,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

// Constants
const ITEMS_PER_PAGE = 10;

type LoginRecord = {
  timestamp: string;
  ip: string;
  city?: string;
  country?: string;
  device?: string;
  browser?: string;
  os?: string;
  latitude?: number;
  longitude?: number;
  isp?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  loginHistory: LoginRecord[];
};

type UserLogin = LoginRecord & {
  userId: string;
  user: string;
  email: string;
  avatar?: string;
};

export default function AdminLoginsPage() {
  const { user, isAdmin } = useAuth();
  const [logins, setLogins] = useState<UserLogin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isAdmin()) return;

    const fetchLogins = async () => {
      try {
        const response = await fetch("/api/user/list?limit=1000");
        const data: { users?: User[] } = await response.json();

        const allLogins: UserLogin[] = (data.users || []).flatMap((u: User) =>
          (u.loginHistory || []).map((log: LoginRecord) => ({
            ...log,
            userId: u.id,
            user: u.name,
            email: u.email,
            avatar: u.image,
          }))
        );

        setLogins(
          allLogins.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        );
      } catch (error) {
        console.error("Failed to fetch logins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogins();
  }, [isAdmin]);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Pagination logic
  const totalPages = Math.ceil(logins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentLogins = logins.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (!user || !isAdmin()) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don&apos;t have permission to view this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">User Login History</CardTitle>
              <CardDescription>
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, logins.length)} of{" "}
                {logins.length} logins
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={`skeleton-${i}`} className="h-12 w-full" />
              ))}
            </div>
          ) : logins.length === 0 ? (
            <div className="py-12 text-center">
              <History className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">
                No login history found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                User login activity will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentLogins.map((log, idx) => {
                      const uniqueKey = `${log.userId}-${log.timestamp}-${log.ip}`;
                      return (
                        <TableRow key={uniqueKey} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              {log.avatar ? (
                                <Image
                                  src={log.avatar}
                                  alt={log.user}
                                  className="h-8 w-8 rounded-full"
                                  width={32}
                                  height={32}
                                />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                  <User className="h-4 w-4" />
                                </div>
                              )}
                              <span>{log.user || "Unknown"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="truncate max-w-[180px] inline-block">
                                    {log.email}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{log.email}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>
                                    {formatDistanceToNow(
                                      new Date(log.timestamp),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {new Date(log.timestamp).toLocaleString()}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {log.country && (
                                <Badge variant="outline">{log.country}</Badge>
                              )}
                              {log.city && (
                                <span className="text-muted-foreground">
                                  {log.city}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{log.ip}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRow(idx)}
                            >
                              {expandedRows[idx] ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="sr-only">Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <Button
                      variant="ghost"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
