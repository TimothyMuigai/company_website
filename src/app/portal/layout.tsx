"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import PortalSidebar from "@/app/portal/sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = pathname === "/portal/login";

    if (!isAuthenticated && !isLoginPage) {
      // Not logged in — send to login
      router.replace("/portal/login");
    }

    if (isAuthenticated && isLoginPage) {
      // Already logged in — send to dashboard
      router.replace("/portal/dashboard");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show nothing while auth state is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-5 h-5 rounded-full border-2 border-[#185FA5] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Don't flash protected content before redirect fires
  const isLoginPage = pathname === "/portal/login";
  if (!isAuthenticated && !isLoginPage) return null;

  // Show portal layout with sidebar for logged-in pages
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background grid grid-cols-[280px_1fr]">
        <PortalSidebar />
        <main className="min-h-screen p-6 bg-background">{children}</main>
      </div>
    );
  }

  return <>{children}</>;
}