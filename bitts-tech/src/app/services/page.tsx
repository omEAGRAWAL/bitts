import type { Metadata } from "next";

import { ServicesSection } from "@/components/sections/ServicesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicesSchema } from "@/lib/schemas/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Bitts Tech services including custom websites, web applications, automation, revamps, business systems, and API integrations.",
  alternates: {
    canonical: "https://bittstech.com/services",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <JsonLd schema={servicesSchema} />
      <ServicesSection />
    </main>
  );
}
