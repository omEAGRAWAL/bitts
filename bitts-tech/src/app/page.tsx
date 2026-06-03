import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <WorkSection />

      <SectionWrapper id="why-us" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="green">Why Us</Badge>
          <h2 className="mt-5 font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Senior product judgment without the agency bloat.
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-secondary">
            We keep teams close to the work, communicate clearly, and ship with
            the kind of technical foundation that makes future changes easier.
          </p>
        </div>
      </SectionWrapper>
    </main>
  );
}
