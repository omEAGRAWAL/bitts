"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/contact" },
];

function SupportBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-text-secondary",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-success" aria-hidden />
      <span>24/7 Support</span>
    </div>
  );
}

function TalkLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href="/contact"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className,
      )}
    >
      Let&apos;s Talk
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["services", "work", "why-us"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.header
        className="sticky top-0 z-50"
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.86)" : "rgba(255, 255, 255, 0)",
          borderColor: isScrolled ? "rgba(226, 232, 240, 1)" : "rgba(226, 232, 240, 0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
      >
        <nav
          className="mx-auto flex h-16 max-w-container items-center justify-between px-6 lg:px-8"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className="transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <BrandLogo priority />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const sectionId = link.href.startsWith("/#")
                ? link.href.replace("/#", "")
                : "";
              const isActive = Boolean(sectionId && activeSection === sectionId);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-200 group-hover:scale-x-100",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <SupportBadge />
            <TalkLink />
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-[60] bg-background px-6 py-5 md:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                onClick={closeMenu}
              >
                <BrandLogo priority />
              </Link>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <X className="size-6" aria-hidden />
              </button>
            </div>

            <div className="flex h-[calc(100vh-88px)] flex-col justify-between pb-8 pt-16">
              <div className="grid gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-display text-3xl font-semibold text-text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <TalkLink
                  className="mt-4 h-12 w-full text-base"
                  onClick={closeMenu}
                />
              </div>

              <SupportBadge className="w-fit" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
