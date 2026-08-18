"use client";
import React from "react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  // Public marketing routes remain previewable and prerenderable without a Convex deployment.
  if (!url) return <>{children}</>;
  return <ConfiguredConvexClientProvider url={url}>{children}</ConfiguredConvexClientProvider>;
}

function ConfiguredConvexClientProvider({ children, url }: { children: React.ReactNode; url: string }) {
  const [convex] = React.useState(
    () => new ConvexReactClient(url)
  );
  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
}
