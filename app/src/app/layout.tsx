import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ERC20Launcher",
  description: "Launch ERC20 Token on any EVM compatible chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark")}>
        <div className="mobile-message">
          This site is not made for mobile users. Please switch to a desktop for the best experience.
        </div>
        <div className="main-content">
          {children}
        </div>
        <Analytics/>
      </body>
    </html>
  );
}
