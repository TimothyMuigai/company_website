"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let posthogInit = false;

function initPostHog() {
  if (posthogInit || typeof window === "undefined" || !key) return;
  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
  });
  posthogInit = true;
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initPostHog();
    if (!key) return;
    let url = window.origin + pathname;
    const q = searchParams.toString();
    if (q) url += `?${q}`;
    posthog.capture("$pageview", { $current_url: url, project: "deeptrack.io" });
  }, [pathname, searchParams]);

  return null;
}

function PostHogIdentify() {
  const { user, isLoaded } = useUser();
  const lastId = useRef<string | null>(null);

  useEffect(() => {
    initPostHog();
    if (!key || !isLoaded) return;
    if (user?.id && user.id !== lastId.current) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });
      lastId.current = user.id;
    }
  }, [user, isLoaded]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  initPostHog();

  if (!key) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <PostHogIdentify />
      {children}
    </PHProvider>
  );
}
