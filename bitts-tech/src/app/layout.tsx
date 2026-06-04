import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageLoadProvider } from "@/components/providers/PageLoadProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schemas/organization";
import { websiteSchema } from "@/lib/schemas/website";

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
  metadataBase: new URL("https://bittstech.com"),
  title: {
    default: "Bitts Tech — Custom Websites & Software Solutions",
    template: "%s | Bitts Tech",
  },
  description:
    "Bitts Tech builds custom websites, web applications, and business software for growing businesses. 24/7 live support.",
  keywords: [
    "custom website development",
    "business software solutions",
    "web application development india",
    "website design agency",
  ],
  authors: [{ name: "Bitts Tech" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bittstech.com",
    siteName: "Bitts Tech",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: { google: "ADD_LATER" },
  alternates: {
    canonical: "https://bittstech.com",
  },
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
          <JsonLd schema={organizationSchema} />
          <JsonLd schema={websiteSchema} />
          <PageLoadProvider>
            <Navbar />
            {children}
            <Footer />
          </PageLoadProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
