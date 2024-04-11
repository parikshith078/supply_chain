import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "./_components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// TODO: change metadata
export const metadata: Metadata = {
  title: "Fork to Farm",
  description: "Supply chain powered by smart contract",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen max-w-7xl mx-auto bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <NavBar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
