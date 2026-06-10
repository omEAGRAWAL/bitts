import type { Metadata } from "next";

import { SectionErrorBoundary } from "@/components/layout/SectionErrorBoundary";
import { Hero } from "@/components/sections/Hero";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/schemas/faq";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bittstech.com",
  },
};

export default function Home() {
  return (
    <main>
      <JsonLd schema={faqPageSchema} />
      {[
        ["Hero", <Hero key="hero" />],
        ["Problem section", <ProblemSection key="problem" />],
        ["Services section", <ServicesSection key="services" />],
        ["Work section", <WorkSection key="work" />],
        ["Process section", <ProcessSection key="process" />],
        ["Industries section", <IndustriesSection key="industries" />],
        ["FAQ section", <FaqSection key="faq" />],
        ["Contact section", <ContactSection key="contact" />],
      ].map(([label, section]) => (
        <SectionErrorBoundary key={String(label)} label={String(label)}>
          {section}
        </SectionErrorBoundary>
      ))}
    </main>
  );
}
