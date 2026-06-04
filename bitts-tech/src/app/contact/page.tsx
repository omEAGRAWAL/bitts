import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Bitts Tech for custom website development, web application development, business automation, and 24/7 software support.",
  alternates: {
    canonical: "https://bittstech.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
