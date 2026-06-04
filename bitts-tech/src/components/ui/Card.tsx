"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 18px 40px rgba(15, 23, 42, 0.1)" }}
      className={cn(
        "rounded-xl border border-border bg-background p-6 shadow-card transition-all duration-200",
        className,
      )}
      {...props}
    />
  );
}
