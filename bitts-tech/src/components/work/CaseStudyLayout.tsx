"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  Check,
  Code2,
  Database,
  Globe,
  Home,
  MessageCircle,
  Play,
  Server,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { CaseStudy } from "@/lib/data/work";
import { cn } from "@/lib/utils";

interface CaseStudyLayoutProps {
  caseStudy: CaseStudy;
}

const techIcons: Record<string, LucideIcon> = {
  "Cloud Hosting": Server,
  "Cloud Storage": Server,
  "Next.js": Code2,
  PostgreSQL: Database,
  "REST APIs": Globe,
  TypeScript: Braces,
  "WhatsApp API": MessageCircle,
};

function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

function DeviceMockup({ label }: { label: string }) {
  return (
    <motion.div
      className="rounded-2xl border border-blue-100 bg-slate-950 p-3 shadow-card"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="rounded-xl bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-600 p-4">
        <div className="grid min-h-[300px] grid-cols-[86px_1fr] gap-4 rounded-lg bg-white/12 p-4 backdrop-blur-sm">
          <div className="space-y-3 border-r border-white/20 pr-4">
            <div className="h-8 rounded-lg bg-white/80" />
            <div className="h-3 rounded bg-white/55" />
            <div className="h-3 rounded bg-white/45" />
            <div className="h-3 rounded bg-white/35" />
            <div className="h-3 rounded bg-white/35" />
            <div className="h-3 rounded bg-white/25" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="h-4 w-44 rounded bg-white/80" />
              <div className="mt-2 h-3 w-64 max-w-full rounded bg-white/45" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 rounded-xl bg-white/75" />
              <div className="h-20 rounded-xl bg-white/55" />
              <div className="h-20 rounded-xl bg-white/65" />
            </div>
            <div className="rounded-xl bg-white/85 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-3 w-32 rounded bg-blue-200" />
                <div className="h-3 w-16 rounded bg-blue-100" />
              </div>
              <div className="flex h-28 items-end gap-2">
                {[54, 78, 48, 96, 72, 106, 62].map((height) => (
                  <div
                    key={height}
                    className="flex-1 rounded-t bg-accent/80"
                    style={{ height }}
                  />
                ))}
              </div>
            </div>
            <div className="text-sm font-semibold text-white/90">{label}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StateList({
  items,
  tone,
}: {
  items: string[];
  tone: "before" | "after";
}) {
  const isAfter = tone === "after";

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
      <ul className="grid gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-text-secondary">
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                isAfter ? "bg-emerald-50 text-success" : "bg-red-50 text-red-500",
              )}
            >
              {isAfter ? (
                <Check className="size-4" aria-hidden />
              ) : (
                <X className="size-4" aria-hidden />
              )}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureTabs({ caseStudy }: { caseStudy: CaseStudy }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = caseStudy.features[activeIndex];

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0">
        {caseStudy.features.map((feature, index) => (
          <button
            key={feature.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "min-w-fit rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:w-full",
              activeIndex === index
                ? "border-accent bg-blue-50 text-accent"
                : "border-border bg-background text-text-secondary hover:border-accent hover:text-text-primary",
            )}
          >
            {feature.name}
          </button>
        ))}
      </div>

      <div>
        <DeviceMockup label={activeFeature.description} />
      </div>
    </div>
  );
}

export function CaseStudyLayout({ caseStudy }: CaseStudyLayoutProps) {
  return (
    <main>
      <SectionShell className="bg-surface pt-16">
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-text-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="inline-flex items-center gap-1 hover:text-accent">
            <Home className="size-4" aria-hidden />
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/#work" className="hover:text-accent">
            Our Work
          </Link>
          <span aria-hidden>/</span>
          <span className="text-text-secondary">{caseStudy.title}</span>
        </nav>

        <div className="max-w-4xl">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-accent">
            {caseStudy.industry}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-text-primary md:text-6xl">
            {caseStudy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
            {caseStudy.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-background px-4 py-2 text-sm font-semibold text-text-secondary">
              Industry: {caseStudy.industry}
            </span>
            <span className="rounded-full bg-background px-4 py-2 text-sm font-semibold text-text-secondary">
              Platform: {caseStudy.platform}
            </span>
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-[40px]">
              The Problem We Solved
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-8 text-text-secondary">
              {caseStudy.challengeIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <StateList items={caseStudy.beforeState} tone="before" />
        </div>
      </SectionShell>

      <SectionShell className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <StateList items={caseStudy.afterState} tone="after" />
          <div>
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-[40px]">
              The Solution
            </h2>
            <p className="mt-5 text-base leading-8 text-text-secondary">
              {caseStudy.solutionIntro}
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-[40px]">
            Key Features
          </h2>
          <p className="mt-4 leading-7 text-text-secondary">
            Explore the core workflows that turned a manual operation into a
            connected business platform.
          </p>
        </div>
        <FeatureTabs caseStudy={caseStudy} />
      </SectionShell>

      <SectionShell className="bg-surface">
        <h2 className="font-display text-3xl font-bold text-text-primary md:text-[40px]">
          See It In Action
        </h2>
        <div className="mt-8 overflow-hidden rounded-2xl bg-slate-950 shadow-[0_24px_80px_rgba(37,99,235,0.2)]">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="about:blank"
              title={`${caseStudy.title} demo video placeholder`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center justify-center gap-3 border-t border-white/10 p-5 text-white">
            <Play className="size-5" aria-hidden />
            Demo video placeholder
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <h2 className="font-display text-3xl font-bold text-text-primary md:text-[40px]">
          Built With
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {caseStudy.techStack.map((tech) => {
            const TechIcon = techIcons[tech.name] ?? Code2;

            return (
              <span
                key={tech.name}
                className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-text-secondary"
              >
                <TechIcon className="size-4 text-accent" aria-hidden />
                {tech.name}
              </span>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell className="bg-surface">
        <h2 className="text-center font-display text-3xl font-bold text-text-primary md:text-[40px]">
          The Result
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {caseStudy.outcomes.map((outcome) => (
            <div
              key={outcome.value}
              className="rounded-2xl border border-border bg-background p-6 text-center shadow-card"
            >
              <p className="font-display text-3xl font-bold text-accent">
                {outcome.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {outcome.label}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <section className="bg-accent px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold md:text-[40px]">
            Building something similar?
          </h2>
          <p className="mt-4 text-lg text-blue-50">
            Tell us about your business and let&apos;s see what&apos;s possible.
          </p>
          <Link
            href="/contact"
            className="group mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-accent shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
          >
            Start a Project
            <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
