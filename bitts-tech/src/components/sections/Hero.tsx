"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { useCountUp } from "@/hooks/useCountUp";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const trustItems = [
  "⚡ Fast Delivery",
  "🔒 24/7 Live Support",
  "🎯 Business-First Approach",
  "🛠️ End-to-End Delivery",
];

const ctaClasses =
  "inline-flex h-12 items-center justify-center rounded-lg px-6 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

function TrustItem({ item }: { item: string }) {
  const supportCount = useCountUp({ end: 24 });

  if (item.includes("24/7")) {
    return <span>🔒 {supportCount}/7 Live Support</span>;
  }

  return <span>{item}</span>;
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-24"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle,#E2E8F0_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-[360px] w-[420px] bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),rgba(37,99,235,0)_68%)]"
        animate={{ x: [0, -18, 0], y: [0, 22, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-container flex-col items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* <motion.div
          variants={fadeIn}
          className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-accent"
        >
          🚀 Now accepting new projects for 2026
        </motion.div> */}

        <motion.h1
          variants={fadeInUp}
          className="mt-7 max-w-[720px] font-display text-[36px] font-bold leading-tight text-text-primary sm:text-[56px]"
        >
          Custom Websites &amp; Software Solutions for Growing Businesses
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-[540px] text-base leading-8 text-text-secondary sm:text-lg"
        >
          We design, build, and launch digital products that solve real business
          problems. Website, web app, or full business system — built around
          you.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/contact"
            className={cn(
              ctaClasses,
              "bg-accent text-white shadow-sm hover:-translate-y-0.5 hover:bg-accent-hover active:scale-95",
            )}
          >
            Start a Project →
          </Link>
          <Link
            href="/#work"
            className={cn(
              ctaClasses,
              "border border-border bg-background text-text-primary hover:-translate-y-0.5 hover:border-accent hover:text-accent active:scale-95",
            )}
          >
            See Our Work
          </Link>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-medium text-text-muted md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-0"
        >
          {trustItems.map((item, index) => (
            <div key={item} className="flex items-center justify-center">
              <TrustItem item={item} />
              {index < trustItems.length - 1 && (
                <span
                  className="mx-4 hidden size-1 rounded-full bg-text-muted md:inline-block"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-14 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted"
        >
          <span>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="size-5" aria-hidden />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
