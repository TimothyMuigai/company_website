import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Deeptrack",
  description: "Enterprise deepfake detection",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0A1015] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
