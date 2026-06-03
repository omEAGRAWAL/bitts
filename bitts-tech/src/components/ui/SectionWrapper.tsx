import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function SectionWrapper({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-12 md:py-20", className)} {...props}>
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
