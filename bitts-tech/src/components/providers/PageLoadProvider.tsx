"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

import { BrandLogo } from "@/components/layout/BrandLogo";

interface PageLoadProviderProps {
  children: ReactNode;
}

export function PageLoadProvider({ children }: PageLoadProviderProps) {
  const [showLoader, setShowLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("bitts-tech-loaded");

    if (hasLoaded) {
      setIsReady(true);
      return;
    }

    setShowLoader(true);
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("bitts-tech-loaded", "true");
      setShowLoader(false);
      setIsReady(true);
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <BrandLogo
                className="gap-4"
                markClassName="size-16"
                priority
                textClassName="text-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
