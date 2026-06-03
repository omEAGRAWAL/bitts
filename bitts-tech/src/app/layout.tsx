import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bitts Tech | Software Agency",
  description:
    "Bitts Tech designs and builds sharp software products for ambitious teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} bg-background font-sans text-text-primary antialiased`}
      >
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
