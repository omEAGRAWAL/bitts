import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";

const services = [
  "Custom Websites",
  "Web Applications",
  "Business Automation",
  "Website Revamps",
  "API & Integrations",
];

const workLinks = [
  { label: "Travel Agency Suite", href: "/work/travel-suite" },
  { label: "Construction Suite", href: "/work/construction-suite" },
  { label: "View All Work", href: "/#work" },
];

const companyLinks = [
  { label: "Contact", href: "/contact" },
  { label: "contact@bittstech.com", href: "mailto:contact@bittstech.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/128144160/", external: true },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <>
      <footer className="bg-text-primary px-6 py-14 text-white lg:px-8">
        <div className="mx-auto max-w-container">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="active:scale-95">
                <BrandLogo
                  markClassName="size-12"
                  textClassName="text-xl text-white"
                />
              </Link>
              <p className="mt-3 text-slate-300">Your Vision. Our Code.</p>
              <div className="mt-5 flex gap-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/128144160/"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition-colors hover:bg-white/15 hover:text-white active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* Email */}
                <a
                  href="mailto:contact@bittstech.com"
                  aria-label="Email us"
                  className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition-colors hover:bg-white/15 hover:text-white active:scale-95"
                >
                  <Mail className="size-5" aria-hidden />
                </a>
              </div>
              <p className="mt-5 text-sm text-slate-400">Made in India 🇮🇳</p>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-slate-300">
                Services
              </h3>
              <ul className="mt-4 grid gap-3 text-slate-400">
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-slate-300">
                Work
              </h3>
              <ul className="mt-4 grid gap-3">
                {workLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 transition-colors hover:text-white active:scale-95">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-slate-300">
                Company
              </h3>
              <ul className="mt-4 grid gap-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-slate-400 transition-colors hover:text-white active:scale-95"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Bitts Tech. All rights reserved.</p>
            <p className="font-semibold text-slate-200">🟢 24/7 Live Support — Always On</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/917358550765"
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-5 right-5 z-50 flex h-14 items-center justify-center rounded-full bg-success px-4 text-white shadow-card-hover transition-all duration-200 hover:gap-2 hover:px-5 active:scale-95"
      >
        <span className="absolute right-1 top-1 size-3 rounded-full bg-red-500 ring-2 ring-white" aria-hidden />
        <MessageCircle className="size-6" aria-hidden />
        <span className="w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-200 group-hover:w-24 group-hover:opacity-100">
          Chat with us
        </span>
      </a>
    </>
  );
}
