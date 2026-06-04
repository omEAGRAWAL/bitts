"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Play, Plus } from "lucide-react";
import Link from "next/link";

import { workProjects } from "@/lib/data/work";
import { cn } from "@/lib/utils";

function DashboardMockup() {
  return (
    <motion.div
      className="rounded-xl border border-blue-200 bg-slate-950 p-3 shadow-card"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
        <div className="grid min-h-[220px] grid-cols-[72px_1fr] gap-4 rounded-md bg-white/12 p-4 backdrop-blur-sm">
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
                {[44, 68, 52, 88, 74, 96, 62].map((height) => (
                  <div
                    key={height}
                    className="flex-1 rounded-t bg-accent/80"
                    style={{ height }}
                  />
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

function VideoPlaceholder() {
  return (
    <div className="mt-5">
      <div className="flex aspect-video items-center justify-center rounded-xl bg-slate-950">
        <div className="flex size-14 items-center justify-center rounded-full bg-white text-accent shadow-card">
          <Play className="ml-1 size-6 fill-current" aria-hidden />
        </div>
      </div>
      <p className="mt-3 text-center text-sm font-semibold text-accent">
        ▶ Watch the Demo
      </p>
    </div>
  );
}

function ProjectVisual() {
  return (
    <div>
      <DashboardMockup />
      <VideoPlaceholder />
    </div>
  );
}

function ProjectStory({
  project,
}: {
  project: (typeof workProjects)[number];
}) {
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
        <p className="mt-2 leading-7 text-text-secondary">
          {project.challenge}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          What We Built
        </p>
        <ul className="mt-3 grid gap-3">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 text-sm leading-6 text-text-secondary"
            >
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
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-card md:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div className={cn(isReversed && "lg:order-2")}>
                    <ProjectVisual />
                  </div>
                  <ProjectStory project={project} />
                </div>
              </motion.article>
            );
          })}

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
