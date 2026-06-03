import { Hero } from "@/components/sections/Hero";
import { FaqSection } from "@/components/sections/FaqSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { WorkSection } from "@/components/sections/WorkSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <WorkSection />
      <WhyUsSection />
      <ProcessSection />
      <IndustriesSection />
      <FaqSection />
    </main>
  );
}
