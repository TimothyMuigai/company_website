"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/portal/login");
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={handleSignOut}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-red-700"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sign out
    </button>
  );
}
