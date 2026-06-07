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
          "inline-flex shrink-0 items-center justify-center rounded-lg p-1",
          markClassName,
        )}
      >
        <Image
          src="/BittsTechMark.png"
          alt="Bitts Tech logo mark"
          width={36}
          height={36}
          className="object-contain"
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
