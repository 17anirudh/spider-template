"use client";

import { useContext, createContext, type ReactNode, useEffect } from "react";
import type { User } from "@/types/ui";
import { useQuery } from "@tanstack/react-query";
import Query from "@/lib/query";

interface AuthContextValue {
  user: User | null;
  isUser: boolean;
  isLoading: boolean;
}
type Props = { children: ReactNode };

const AuthContext = createContext<AuthContextValue | null>(null);

export default function({ children }: Props) {
  return (
    <AuthContext.Provider value={{ user: null, isUser: false, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}