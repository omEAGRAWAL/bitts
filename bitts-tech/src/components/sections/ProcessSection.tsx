"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "1",
    title: "Discover",
    description: "We learn your business, goals, and what's not working.",
  },
  {
    number: "2",
    title: "Define",
    description: "Scope, tech plan, and timeline agreed and documented upfront.",
  },
  {
    number: "3",
    title: "Build",
    description: "Iterative development with regular updates — no black boxes.",
  },
  {
    number: "4",
    title: "Launch",
    description: "Deploy, handoff, and training. You own everything fully.",
  },
  {
    number: "5",
    title: "Support",
    description: "24/7 ongoing support and continuous improvements.",
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-140px" });

  return (
    <section className="bg-surface py-12 md:py-20">
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-accent">How We Work</span>
          <h2 className="mt-4 font-display text-[28px] font-bold leading-tight text-text-primary md:text-[40px]">
            Simple Process. No Surprises.
          </h2>
        </div>

        <div ref={ref} className="relative mt-14">
          <svg
            className="absolute left-[10%] right-[10%] top-8 hidden h-4 w-[80%] md:block"
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d="M 0 2 H 100"
              fill="none"
              stroke="#2563EB"
              strokeDasharray="1 3"
              strokeLinecap="round"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </svg>

          <svg
            className="absolute left-5 top-0 h-full w-4 md:hidden"
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d="M 2 0 V 100"
              fill="none"
              stroke="#2563EB"
              strokeDasharray="1 3"
              strokeLinecap="round"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </svg>

          <div className="grid gap-8 md:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative grid grid-cols-[44px_1fr] gap-4 md:block md:text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <div className="relative z-10 flex size-11 items-center justify-center rounded-full border border-blue-100 bg-background font-display text-sm font-bold text-accent shadow-sm md:mx-auto md:size-16 md:text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary md:mt-6">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
