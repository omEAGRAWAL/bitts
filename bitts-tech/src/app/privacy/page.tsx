import type { Metadata } from "next";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Bitts Tech, covering how we handle contact details, project information, and business communication.",
  alternates: {
    canonical: "https://bittstech.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <SectionWrapper className="bg-surface">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-text-primary md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 leading-8 text-text-secondary">
            Bitts Tech respects your privacy. When you contact us, we collect
            only the information needed to understand your request, communicate
            with you, and deliver software services.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto grid max-w-3xl gap-8 leading-8 text-text-secondary">
          <section>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Information We Collect
            </h2>
            <p className="mt-3">
              We may collect your name, business name, phone number, email
              address, project requirements, and any details you choose to share
              through our contact forms, email, WhatsApp, or calls.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              How We Use Information
            </h2>
            <p className="mt-3">
              We use your information to respond to inquiries, prepare project
              recommendations, provide support, and manage active client work.
              We do not sell your personal or business information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Contact
            </h2>
            <p className="mt-3">
              For privacy questions, contact us at contact@bittstech.com.
            </p>
          </section>
        </div>
      </SectionWrapper>
    </main>
  );
}
