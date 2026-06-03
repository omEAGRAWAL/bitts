import { Mail, MessageSquare } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function ContactPage() {
  return (
    <main>
      <SectionWrapper className="bg-surface">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
            Let&apos;s talk about your next build.
          </h1>
          <p className="mt-5 text-lg leading-8 text-text-secondary">
            Tell us what you are building, where things feel stuck, or what you
            need shipped next.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <Card>
            <Mail className="size-6 text-accent" aria-hidden />
            <h2 className="mt-5 font-display text-xl font-semibold">Email</h2>
            <p className="mt-3 text-text-secondary">hello@bitts.tech</p>
          </Card>
          <Card>
            <MessageSquare className="size-6 text-accent" aria-hidden />
            <h2 className="mt-5 font-display text-xl font-semibold">
              Discovery Call
            </h2>
            <p className="mt-3 text-text-secondary">
              Share the goal and we&apos;ll map the next practical step.
            </p>
          </Card>
        </div>
      </SectionWrapper>
    </main>
  );
}
