"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

import { whyUsReasons } from "@/lib/data/whyus";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="why-us" className="scroll-mt-24 bg-background py-12 md:py-20">
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-accent">
            Why Choose Us
          </span>
          <h2 className="mt-4 font-display text-[28px] font-bold leading-tight text-text-primary md:text-[40px]">
            Why Businesses Trust Bitts Tech
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {whyUsReasons.map((reason) => (
            <motion.div
              key={reason.number}
              variants={cardVariants}
              className="group relative rounded-xl bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-surface hover:shadow-card"
            >
              <span className="absolute right-5 top-5 font-display text-3xl font-bold text-blue-100">
                {reason.number}
              </span>
              <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-accent">
                <reason.icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-bold text-text-primary">
                {reason.title}
              </h3>
              <p className="mt-2 leading-7 text-text-secondary">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
