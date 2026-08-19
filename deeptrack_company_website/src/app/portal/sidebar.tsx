"use client";

import { useAuth } from "@/lib/auth-context";
import { useQuery, useMutation } from "convex/react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Bell } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/portal/dashboard", label: "Dashboard" },
  { href: "/portal/leads", label: "My Leads" },
  { href: "/portal/leads/submit", label: "Submit Lead" },
  { href: "/portal/commissions", label: "Commissions" },
  { href: "/portal/materials", label: "Marketing Materials" },
  { href: "/portal/account", label: "My Account" },
];

export default function PortalSidebar() {
  const { partner, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = useQuery(api.leads.getNotifications);
  const markRead = useMutation(api.leads.markNotificationRead);

  const unreadCount = notifications?.filter((n: any) => !n.read).length ?? 0;
  const email = (partner?.email || "").toLowerCase();
  const isAdmin =
    email.endsWith("@deeptrack.io") ||
    email === "bryan@deeptrack.io" ||
    email === "ianngari01@gmail.com";

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/portal/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMarkRead = async (id: any) => {
    try {
      await markRead({ notificationId: id });
    } catch {}
  };

  return (
    <aside className="w-full lg:w-[280px] bg-white border-r border-gray-100 flex flex-col lg:h-screen lg:sticky top-0">
      {/* Logo / Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900">Deeptrack Portal</h2>
            {partner && (
              <p className="text-[12px] text-gray-400 mt-0.5 truncate max-w-[180px]">
                {partner.email}
              </p>
            )}
          </div>
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((p) => !p)}
              className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-semibold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-10 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-gray-800">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[11px] text-gray-400">{unreadCount} unread</span>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {!notifications || notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-[13px] text-gray-400">
                        No notifications yet
                      </div>
                    ) : (
                      notifications
                        .slice()
                        .sort((a: any, b: any) => b.createdAt - a.createdAt)
                        .map((n: any) => (
                          <div
                            key={n._id}
                            className={`px-4 py-3 border-b border-gray-50 flex items-start gap-3 ${
                              !n.read ? "bg-blue-50/50" : ""
                            }`}
                          >
                            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!n.read ? "bg-blue-500" : "bg-gray-200"}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] text-gray-700 leading-snug">{n.message}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">
                                {new Date(n.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            {!n.read && (
                              <button
                                onClick={() => handleMarkRead(n._id)}
                                className="text-[10px] text-blue-500 hover:text-blue-700 flex-shrink-0"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-[#185FA5]/10 text-[#185FA5]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}

          {/* Admin link — only visible to @deeptrack.io users */}
          {isAdmin && (
            <li>
              <a
                href="/admin"
                className={`flex items-center px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  pathname === "/admin"
                    ? "bg-amber-50 text-amber-700"
                    : "text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                Admin Panel
              </a>
            </li>
          )}
        </ul>
      </nav>

      {/* Tier badge + logout */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        {partner?.tier && (
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">Tier</span>
            <span className="text-[12px] font-semibold text-[#185FA5]">{partner.tier}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-[13px] font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}