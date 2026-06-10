"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Home,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { CaseStudy, WorkProjectTab } from "@/lib/data/work";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
interface CaseStudyLayoutProps {
  caseStudy: CaseStudy;
  /** Tabs from workProjects — if provided, real screenshots are shown */
  tabs?: WorkProjectTab[];
}



// ── Shared section shell ──────────────────────────────────────────────────────
function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

// ── Fallback animated mockup (when no real image is available) ────────────────
function DeviceMockup() {
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
                {[54, 78, 48, 96, 72, 106, 62].map((h) => (
                  <div key={h} className="flex-1 rounded-t bg-accent/80" style={{ height: h }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Before / After state list ─────────────────────────────────────────────────
function StateList({ items, tone }: { items: string[]; tone: "before" | "after" }) {
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
              {isAfter ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Feature tabs with real screenshots ───────────────────────────────────────
const TAB_INTERVAL = 4000;

function FeatureTabs({
  caseStudy,
  tabs,
}: {
  caseStudy: CaseStudy;
  tabs?: WorkProjectTab[];
}) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = caseStudy.features.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive((c) => (c + 1) % count),
      TAB_INTERVAL,
    );
  }, [count]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const handleTab = (i: number) => { setActive(i); startTimer(); };

  // Determine which image to show — match tab by index, fallback to null
  const activeImage = tabs?.[active]?.image ?? null;
  const activeFeature = caseStudy.features[active];

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* ── Sidebar tab buttons ── */}
      <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:content-start lg:overflow-visible lg:pb-0">
        {caseStudy.features.map((feature, i) => (
          <button
            key={feature.name}
            type="button"
            onClick={() => handleTab(i)}
            className={cn(
              "relative min-w-fit rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:w-full",
              active === i
                ? "border-accent bg-blue-50 text-accent shadow-sm"
                : "border-border bg-background text-text-secondary hover:border-accent hover:text-text-primary",
            )}
          >
            {feature.name}
            {/* auto-progress bar on active tab */}
            {active === i && (
              <motion.span
                key={`progress-${i}`}
                className="absolute bottom-0 left-0 h-[2px] rounded-full bg-accent/40"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: TAB_INTERVAL / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Image / Mockup panel ── */}
      <div className="overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-card">
        {activeImage ? (
          <>
            {/* Tab label bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900 px-4 py-2.5">
              <span className="size-2 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-slate-300">
                {tabs![active].label}
              </span>
            </div>
            {/* Animated image */}
            <div className="relative aspect-[16/10] w-full bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage}
                    alt={`${activeFeature.name} screenshot`}
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Feature description below image */}
            <div className="border-t border-white/10 px-5 py-4">
              <p className="text-sm leading-6 text-slate-300">
                {activeFeature.description}
              </p>
            </div>
          </>
        ) : (
          <div className="p-4">
            <DeviceMockup />
            <p className="mt-4 px-1 text-sm leading-6 text-slate-400">
              {activeFeature.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


// ── Main CaseStudyLayout ──────────────────────────────────────────────────────
export function CaseStudyLayout({ caseStudy, tabs }: CaseStudyLayoutProps) {
  return (
    <main>
      {/* Hero */}
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
          <Link href="/#work" className="hover:text-accent">Our Work</Link>
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

      {/* Problem */}
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-[40px]">
              The Problem We Solved
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-8 text-text-secondary">
              {caseStudy.challengeIntro.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
          <StateList items={caseStudy.beforeState} tone="before" />
        </div>
      </SectionShell>

      {/* Solution */}
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

      {/* Key Features — with real screenshots */}
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
        <FeatureTabs caseStudy={caseStudy} tabs={tabs} />
      </SectionShell>


      {/* Outcomes */}
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
              <p className="font-display text-3xl font-bold text-accent">{outcome.value}</p>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{outcome.label}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* CTA */}
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
