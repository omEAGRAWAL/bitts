"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { workProjects, type WorkProjectTab } from "@/lib/data/work";
import { cn } from "@/lib/utils";

// ── Constants ─────────────────────────────────────────────────────────────────
const TAB_INTERVAL = 3800; // ms between auto-advance

// ── Dashboard Mockup — fallback when no tabs/images are provided ──────────────
function DashboardMockup() {
  return (
    <motion.div
      className="rounded-xl border border-blue-200 bg-slate-950 p-3 shadow-card"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
        <div className="grid min-h-[260px] grid-cols-[72px_1fr] gap-4 rounded-md bg-white/12 p-4 backdrop-blur-sm">
          <div className="space-y-3 border-r border-white/20 pr-4">
            <div className="h-6 rounded bg-white/80" />
            <div className="h-3 rounded bg-white/50" />
            <div className="h-3 rounded bg-white/40" />
            <div className="h-3 rounded bg-white/30" />
            <div className="h-3 rounded bg-white/30" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded-lg bg-white/75" />
              <div className="h-16 rounded-lg bg-white/55" />
              <div className="h-16 rounded-lg bg-white/65" />
            </div>
            <div className="rounded-lg bg-white/80 p-4">
              <div className="mb-4 h-3 w-32 rounded bg-blue-200" />
              <div className="flex h-24 items-end gap-2">
                {[44, 68, 52, 88, 74, 96, 62].map((h) => (
                  <div key={h} className="flex-1 rounded-t bg-accent/80" style={{ height: h }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-10 rounded-lg bg-white/55" />
              <div className="h-10 rounded-lg bg-white/45" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Tabbed Image Viewer ───────────────────────────────────────────────────────
function TabbedImageViewer({
  tabs,
  title,
}: {
  tabs: WorkProjectTab[];
  title: string;
}) {
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
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleTab = (i: number) => {
    setActive(i);
    startTimer(); // reset timer on manual click
  };

  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-border bg-slate-950 shadow-card">
      {/* ── Tab bar ── */}
      <div
        role="tablist"
        aria-label={`${title} screenshots`}
        className="flex overflow-x-auto border-b border-white/10 bg-slate-900 scrollbar-none"
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
                "relative shrink-0 whitespace-nowrap px-4 py-3 text-xs font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200",
              )}
            >
              {tab.label}
              {/* active underline */}
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              {/* auto-progress bar */}
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

      {/* ── Image panel ── */}
      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="relative aspect-[16/10] w-full bg-slate-950"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={tabs[active].image}
              alt={`${title} — ${tabs[active].label}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Project Visual — tabs if available, mockup otherwise ─────────────────────
function ProjectVisual({
  tabs,
  title,
}: {
  tabs?: WorkProjectTab[];
  title: string;
}) {
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
      <h3 className="mt-5 font-display text-[28px] font-bold leading-tight text-text-primary">
        {project.title}
      </h3>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          The Challenge
        </p>
        <p className="mt-2 leading-7 text-text-secondary">{project.challenge}</p>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          What We Built
        </p>
        <ul className="mt-3 grid gap-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-6 text-text-secondary">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-accent">
                <Check className="size-3.5" aria-hidden />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-text-secondary"
          >
            {item}
          </span>
        ))}
      </div>

      <Link
        href={project.href}
        className="group mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
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
    <section id="work" className="scroll-mt-24 bg-surface py-12 md:py-20">
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-accent">
            What We&apos;ve Built
          </span>
          <h2 className="mt-4 font-display text-[28px] font-bold leading-tight text-text-primary md:text-[40px]">
            Real Products. Real Businesses.
          </h2>
          <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
            We don&apos;t just talk about building software. Here&apos;s what
            we&apos;ve actually shipped.
          </p>
        </div>

        <div className="mt-12 grid gap-8">
          {workProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, x: isReversed ? 48 : -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-card md:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                  <div className={cn(isReversed && "lg:order-2")}>
                    <ProjectVisual tabs={project.tabs} title={project.title} />
                  </div>
                  <ProjectStory project={project} />
                </div>
              </motion.article>
            );
          })}

          {/* CTA card */}
          <div className="rounded-2xl border border-dashed border-blue-200 bg-background/70 p-10 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-blue-50 text-accent">
              <Plus className="size-7" aria-hidden />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-text-primary">
              Your Business Could Be Next
            </h3>
            <p className="mt-3 text-text-secondary">
              We&apos;re taking on new projects.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
