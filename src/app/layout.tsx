import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";

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
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          {/* <NavBar /> */}
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            {children}
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
