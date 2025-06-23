// components/icons.tsx
"use client";

import * as React from "react";
import { Moon, Sun, Users, Settings, FileText, UserPlus } from "lucide-react";

type IconProps = {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const Icons = {
  spinner: ({ className, size = 24, strokeWidth = 2 }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  sun: ({ className, size, color, strokeWidth }: IconProps) => (
    <Sun
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  moon: ({ className, size, color, strokeWidth }: IconProps) => (
    <Moon
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  users: ({ className, size, color, strokeWidth }: IconProps) => (
    <Users
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  userPlus: ({ className, size, color, strokeWidth }: IconProps) => (
    <UserPlus
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  settings: ({ className, size, color, strokeWidth }: IconProps) => (
    <Settings
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  report: ({ className, size, color, strokeWidth }: IconProps) => (
    <FileText
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  activity: ({ className, size, color, strokeWidth }: IconProps) => (
    <Users
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  dashboard: ({ className, size, color, strokeWidth }: IconProps) => (
    <Users
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  logout: ({ className, size, color, strokeWidth }: IconProps) => (
    <Users
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  login: ({ className, size, color, strokeWidth }: IconProps) => (
    <Users
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
  chevronRight: ({ className, size, color, strokeWidth }: IconProps) => (
    <Users
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  ),
};
