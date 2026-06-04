"use client";

import { useEffect, useState } from "react";

interface UseCountUpOptions {
  duration?: number;
  enabled?: boolean;
  end: number;
}

export function useCountUp({
  duration = 900,
  enabled = true,
  end,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(end * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [duration, enabled, end]);

  return value;
}
