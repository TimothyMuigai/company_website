import FinalCTASection from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { Outfit } from "next/font/google";

export const metadata = {
  title: "Deeptrack",
  description: "Enterprise deepfake detection",
};


const inter = Inter({ subsets: ["latin"], weight: ["300", "400"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="bg-[#ffffff] text-white antialiased">
        {children}
        <FinalCTASection />
      </body>
    </html>
  );
}
