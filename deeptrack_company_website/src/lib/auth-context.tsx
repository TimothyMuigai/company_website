"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  partner: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Maps raw Convex/auth error messages to human-readable strings
function parseAuthError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (raw.includes("InvalidSecret") || raw.includes("Invalid secret")) {
    return "Incorrect password. Please try again or reset your password.";
  }
  if (raw.includes("no user") || raw.includes("not found") || raw.includes("NoUser")) {
    return "No account found with that email address.";
  }
  if (raw.includes("InvalidAccountId") || raw.includes("Invalid account")) {
    return "No account found with that email address.";
  }
  if (raw.includes("Too many") || raw.includes("rate limit")) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }
  if (raw.includes("Password reset is not enabled")) {
    return "Password reset is currently disabled. Please contact support.";
  }
  if (raw.includes("credentials") || raw.includes("Unauthorized")) {
    return "Invalid email or password.";
  }
  return "Sign in failed. Please check your credentials and try again.";
}

const publicPreviewAuth: AuthContextType = {
  isLoading: false,
  isAuthenticated: false,
  partner: null,
  signIn: async () => { throw new Error("Partner authentication requires a configured Convex deployment."); },
  signOut: async () => undefined,
  error: null,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return <AuthContext.Provider value={publicPreviewAuth}>{children}</AuthContext.Provider>;
  }
  return <ConfiguredAuthProvider>{children}</ConfiguredAuthProvider>;
}

function ConfiguredAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { signIn: convexSignIn, signOut: convexSignOut } = useAuthActions();

  // undefined = query still in flight, null = unauthenticated, object = authenticated
  const partner = useQuery(api.users.getCurrentPartner);

  useEffect(() => {
    // As soon as Convex resolves (any value including null), we know auth state
    if (partner !== undefined) {
      setIsLoading(false);
    }
  }, [partner]);

  // Safety net: never block the UI for more than 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await convexSignIn("password", { flow: "signIn", email, password });
      // On success: isLoading cleared by partner useEffect above when Convex
      // returns the partner record after authentication completes
    } catch (err) {
      const message = parseAuthError(err);
      setError(message);
      setIsLoading(false);
      // Re-throw the cleaned message so the login page catch block shows it
      throw new Error(message);
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      await convexSignOut();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign out failed";
      setError(message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoading,
      isAuthenticated: !!partner,
      partner,
      signIn,
      signOut,
      error,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
