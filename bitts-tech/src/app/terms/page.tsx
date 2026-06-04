import type { Metadata } from "next";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Bitts Tech website, software development, project communication, and support.",
  alternates: {
    canonical: "https://bittstech.com/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <main>
      <SectionWrapper className="bg-surface">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-5 leading-8 text-text-secondary">
            These terms outline the basic expectations for using the Bitts Tech
            website and working with us on software, website, and automation
            projects.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto grid max-w-3xl gap-8 leading-8 text-text-secondary">
          <section>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Project Work
            </h2>
            <p className="mt-3">
              Project scope, timeline, deliverables, payment terms, ownership,
              and support details are agreed in writing before work begins.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Website Use
            </h2>
            <p className="mt-3">
              You may browse this website and contact us for business purposes.
              You may not misuse the website, copy protected materials, or
              attempt to disrupt its availability.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Contact
            </h2>
            <p className="mt-3">
              For questions about these terms, contact us at
              contact@bittstech.com.
            </p>
          </section>
        </div>
      </SectionWrapper>
    </main>
  );
}
