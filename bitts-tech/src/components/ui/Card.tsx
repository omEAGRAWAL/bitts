import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
      {...props}
    />
  );
}
