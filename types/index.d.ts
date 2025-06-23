// types/index.d.ts
export interface LoginHistory {
  timestamp: Date;
  ip: string;
  city: string;
  country: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  loginHistory: LoginHistory[];
}

// types/index.d.ts
export interface LoginHistory {
  timestamp: string;
  ip: string;
  city: string;
  country: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  loginHistory: LoginHistory[];
}

// admin/logins..
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
