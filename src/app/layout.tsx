import { ConvexClientProvider } from "@/lib/convex-client-provider";
import { AuthProvider } from "@/lib/auth-context";
import { ClerkProvider } from "@clerk/nextjs";
import FinalCTASection from "@/components/Footer";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400"] });

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/deeptrack-favicon.ico", type: "image/x-icon" }],
    shortcut: ["/deeptrack-favicon.ico"],
    apple: ["/deeptrack-favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="bg-[#ffffff] text-white antialiased">
        <ClerkProvider>
          <ConvexClientProvider>
            <AuthProvider>
              {children}
              <FinalCTASection isGlobal />
            </AuthProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}