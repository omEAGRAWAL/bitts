"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { workProjects, type WorkProjectTab } from "@/lib/data/work";
import { cn } from "@/lib/utils";

// ── Constants ─────────────────────────────────────────────────────────────────
const TAB_INTERVAL = 3800;

// ── Dashboard Mockup — fallback when no tabs provided ────────────────────────
function DashboardMockup() {
  return (
    <motion.div
      className="rounded-xl border border-blue-200 bg-slate-950 p-2.5 shadow-card sm:p-3"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-3 sm:p-4">
        <div className="grid min-h-[180px] grid-cols-[56px_1fr] gap-3 rounded-md bg-white/12 p-3 backdrop-blur-sm sm:min-h-[220px] sm:grid-cols-[72px_1fr] sm:gap-4 sm:p-4">
          <div className="space-y-2 border-r border-white/20 pr-3 sm:space-y-3 sm:pr-4">
            <div className="h-5 rounded bg-white/80 sm:h-6" />
            <div className="h-2.5 rounded bg-white/50 sm:h-3" />
            <div className="h-2.5 rounded bg-white/40 sm:h-3" />
            <div className="h-2.5 rounded bg-white/30 sm:h-3" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="h-12 rounded-lg bg-white/75 sm:h-16" />
              <div className="h-12 rounded-lg bg-white/55 sm:h-16" />
              <div className="h-12 rounded-lg bg-white/65 sm:h-16" />
            </div>
            <div className="rounded-lg bg-white/80 p-3 sm:p-4">
              <div className="mb-3 h-2.5 w-24 rounded bg-blue-200 sm:mb-4 sm:h-3 sm:w-32" />
              <div className="flex h-16 items-end gap-1.5 sm:h-24 sm:gap-2">
                {[44, 68, 52, 88, 74, 96, 62].map((h) => (
                  <div key={h} className="flex-1 rounded-t bg-accent/80" style={{ height: h * 0.65 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Tabbed Image Viewer ───────────────────────────────────────────────────────
function TabbedImageViewer({ tabs, title }: { tabs: WorkProjectTab[]; title: string }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive((c) => (c + 1) % tabs.length),
      TAB_INTERVAL,
    );
  }, [tabs.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const handleTab = (i: number) => { setActive(i); startTimer(); };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-slate-950 shadow-card">
      {/* ── Tab bar — horizontally scrollable, compact on mobile ── */}
      <div
        role="tablist"
        aria-label={`${title} screenshots`}
        className="flex overflow-x-auto border-b border-white/10 bg-slate-900 scrollbar-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.label}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              onClick={() => handleTab(i)}
              className={cn(
                "relative shrink-0 whitespace-nowrap px-3 py-2.5 text-[11px] font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset sm:px-4 sm:py-3 sm:text-xs",
                isActive ? "text-white" : "text-slate-400 hover:text-slate-200",
              )}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId={`tab-underline-${title}`}
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              {isActive && (
                <motion.span
                  key={active}
                  className="absolute bottom-0 left-0 h-[2px] rounded-full bg-blue-300/40"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: TAB_INTERVAL / 1000, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Image panel — shorter on mobile, wider ratio on desktop ── */}
      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="relative w-full bg-slate-950"
        style={{ aspectRatio: "4/3" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={tabs[active].image}
              alt={`${title} — ${tabs[active].label}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Project Visual ────────────────────────────────────────────────────────────
function ProjectVisual({ tabs, title }: { tabs?: WorkProjectTab[]; title: string }) {
  if (tabs && tabs.length > 0) {
    return <TabbedImageViewer tabs={tabs} title={title} />;
  }
  return <DashboardMockup />;
}

// ── Project Story ─────────────────────────────────────────────────────────────
function ProjectStory({ project }: { project: (typeof workProjects)[number] }) {
  return (
    <div className="flex flex-col justify-center">
      <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary">
        {project.industry}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold leading-tight text-text-primary sm:text-2xl lg:text-[28px]">
        {project.title}
      </h3>

      <div className="mt-4 sm:mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-xs">
          The Challenge
        </p>
        <p className="mt-1.5 text-sm leading-6 text-text-secondary sm:mt-2 sm:leading-7">
          {project.challenge}
        </p>
      </div>

      <div className="mt-4 sm:mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-xs">
          What We Built
        </p>
        <ul className="mt-2 grid gap-2 sm:mt-3 sm:gap-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm leading-5 text-text-secondary sm:gap-3 sm:leading-6">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-accent sm:size-5">
                <Check className="size-3 sm:size-3.5" aria-hidden />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-secondary sm:px-3 sm:text-xs"
          >
            {item}
          </span>
        ))}
      </div>

      <Link
        href={project.href}
        className="group mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 sm:mt-6"
      >
        View Full Case Study
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
      </Link>
    </div>
  );
}

// ── Main WorkSection ──────────────────────────────────────────────────────────
export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-24 bg-surface py-10 md:py-20">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-accent">What We&apos;ve Built</span>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-text-primary sm:text-[28px] md:text-[40px]">
            Real Products. Real Businesses.
          </h2>
          <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8 md:text-lg">
            We don&apos;t just talk about building software. Here&apos;s what
            we&apos;ve actually shipped.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:gap-8 md:mt-12">
          {workProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.article
                key={project.title}
                // On mobile use y-axis animation to avoid horizontal overflow
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-border bg-background shadow-card"
              >
                {/* Mobile: stacked (image top, text bottom)
                    Desktop: side-by-side with optional reverse */}
                <div className="grid lg:grid-cols-2 lg:items-start">
                  {/* Image block — always on top on mobile */}
                  <div
                    className={cn(
                      "w-full",
                      isReversed && "lg:order-2",
                    )}
                  >
                    <ProjectVisual tabs={project.tabs} title={project.title} />
                  </div>

                  {/* Text block — separator line on mobile, no line on desktop */}
                  <div className="border-t border-border p-4 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
                    <ProjectStory project={project} />
                  </div>
                </div>
              </motion.article>
            );
          })}

          {/* CTA card */}
          <div className="rounded-2xl border border-dashed border-blue-200 bg-background/70 p-6 text-center sm:p-10">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-50 text-accent sm:size-14">
              <Plus className="size-6 sm:size-7" aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-text-primary sm:mt-5 sm:text-2xl">
              Your Business Could Be Next
            </h3>
            <p className="mt-2 text-sm text-text-secondary sm:mt-3 sm:text-base">
              We&apos;re taking on new projects.
            </p>
            <Link
              href="/contact"
              className="group mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:mt-6 sm:h-11"
            >
              Start a Conversation
              <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
