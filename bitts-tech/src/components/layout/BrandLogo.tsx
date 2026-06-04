import Image from "next/image";

import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  markClassName?: string;
  priority?: boolean;
  textClassName?: string;
}

export function BrandLogo({
  className,
  markClassName,
  priority = false,
  textClassName,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative size-10 shrink-0 overflow-hidden rounded-lg border border-border bg-white shadow-sm",
          markClassName,
        )}
      >
        <Image
          src="/BittsTechMark.png"
          alt="Bitts Tech logo mark"
          fill
          sizes="40px"
          className="object-cover"
          priority={priority}
        />
      </span>
      <span
        className={cn(
          "font-display text-lg font-bold leading-none text-text-primary",
          textClassName,
        )}
      >
        Bitts Tech
      </span>
    </span>
  );
}
