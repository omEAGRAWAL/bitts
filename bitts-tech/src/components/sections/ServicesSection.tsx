"use client";

import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { services } from "@/lib/data/services";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="services" className="scroll-mt-24 bg-background py-12 md:py-20">
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-accent">
            What We Build
          </span>
          <h2 className="mt-4 font-display text-[28px] font-bold leading-tight text-text-primary md:text-[40px]">
            Every Service Your Business Needs Online
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover"
            >
              <span className="absolute right-5 top-4 font-display text-6xl font-bold text-blue-100/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <service.icon className="size-7 text-accent" aria-hidden />
                <h3 className="mt-6 text-lg font-bold text-text-primary">
                  {service.name}
                </h3>
                <p className="mt-3 min-h-14 leading-7 text-text-secondary">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex translate-y-1 text-sm font-semibold text-accent opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
                >
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
