import type { Metadata } from "next";
import { graphik } from "@/lib/font";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vacation.ai",
  description: "This is vacation.ai, an AI vacation planner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(graphik.className, "bg-[#00020C] text-[#E1FAFF]")}>{children}</body>
    </html>
  );
}
