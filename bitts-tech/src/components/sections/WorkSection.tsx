"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Plus } from "lucide-react";
import Link from "next/link";

import { workProjects } from "@/lib/data/work";

function ProjectSummary({ project }: { project: (typeof workProjects)[number] }) {
  return (
    <div className="flex min-w-0 flex-col justify-between">
      <div>
        <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary">
          {project.industry}
        </span>
        <h3 className="mt-4 max-w-2xl font-display text-xl font-bold leading-tight text-text-primary sm:text-2xl lg:text-[28px]">
          {project.title}
        </h3>

        <div className="mt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-xs">
            The Challenge
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
            {project.challenge}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full bg-surface px-3 py-1 text-[11px] font-semibold text-text-secondary sm:text-xs"
          >
            {item}
          </span>
        ))}
      </div>

      <Link
        href={project.href}
        className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
      >
        View Full Case Study
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
      </Link>
    </div>
  );
}

function ProjectFeatureList({ features }: { features: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-surface/70 p-4 sm:p-5 lg:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-xs">
        What We Built
      </p>
      <ul className="mt-4 grid gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6 text-text-secondary">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-accent">
              <Check className="size-3.5" aria-hidden />
            </span>
            <span className="min-w-0">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-24 bg-surface py-10 md:py-20">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
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
          {workProjects.map((project) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl border border-border bg-background shadow-card"
            >
              <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8 lg:p-8">
                <ProjectSummary project={project} />
                <ProjectFeatureList features={project.features} />
              </div>
            </motion.article>
          ))}

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
