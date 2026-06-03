"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { problems } from "@/lib/data/problems";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="bg-surface py-12 md:py-20">
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-accent">
            Sound familiar?
          </span>
          <h2 className="mt-4 font-display text-[28px] font-bold leading-tight text-text-primary md:text-[40px]">
            Is Your Business Still Running on Workarounds?
          </h2>
          <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
            Most businesses outgrow their tools long before they realise it. If
            any of these feel familiar, we should talk.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={cardVariants}
              className="rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-accent">
                <problem.icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-bold text-text-primary">
                {problem.title}
              </h3>
              <p className="mt-3 leading-7 text-text-secondary">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <blockquote className="mx-auto mt-12 max-w-2xl border-l-4 border-accent pl-5 text-center text-lg italic text-text-primary md:text-xl">
          Your technology should work as hard as you do.
        </blockquote>
      </div>
    </section>
  );
}
