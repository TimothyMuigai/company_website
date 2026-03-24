"use client";

import FinalCTASection from "@/components/Footer";
import { ConvexClientProvider } from "@/lib/convex-client-provider";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";
import { Outfit } from "next/font/google";
import { usePathname } from "next/navigation";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  return (
    <html lang="en" className={outfit.className}>
      <body className="bg-[#ffffff] text-white antialiased">
        <ConvexClientProvider>
          <AuthProvider>
            {children}
            {!isPortal && <FinalCTASection />}
          </AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}