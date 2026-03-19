import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "DevToolkit",
  description: "Your personal developer knowledge base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#0e1217]">
      <body className={GeistSans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
