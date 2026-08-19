"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { AuthProvider } from "@/lib/auth-context";
import { ConvexClientProvider } from "@/lib/convex-client-provider";

/** Configured deployment-only provider chain for authenticated portal and console routes. */
export function ConfiguredApplicationProviders({ children, useClerk }: { children: React.ReactNode; useClerk: boolean }) {
  const content = <ConvexClientProvider><AuthProvider>{children}</AuthProvider></ConvexClientProvider>;
  return useClerk ? <ClerkProvider>{content}</ClerkProvider> : content;
}
