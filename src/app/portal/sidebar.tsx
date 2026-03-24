"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function PortalSidebar() {
  const { partner, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/portal/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Deeptrack Portal</h2>
        {partner && (
          <p className="text-sm text-gray-600 mt-2">{partner.email}</p>
        )}
      </div>

      <nav className="flex-1 mt-6">
        <ul>
          <li className="px-6 py-2 hover:bg-gray-100">
            <a href="/portal/dashboard" className="text-gray-700">Dashboard</a>
          </li>
          <li className="px-6 py-2 hover:bg-gray-100">
            <a href="/portal/leads" className="text-gray-700">My Leads</a>
          </li>
          <li className="px-6 py-2 hover:bg-gray-100">
            <a href="/portal/leads/submit" className="text-gray-700">Submit Lead</a>
          </li>
          <li className="px-6 py-2 hover:bg-gray-100">
            <a href="/portal/commissions" className="text-gray-700">Commissions</a>
          </li>
          <li className="px-6 py-2 hover:bg-gray-100">
            <a href="/portal/materials" className="text-gray-700">Marketing Materials</a>
          </li>
          <li className="px-6 py-2 hover:bg-gray-100">
            <a href="/portal/account" className="text-gray-700">My Account</a>
          </li>
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
