"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

// ── Validation schema ────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(1, "Your name is required."),
  email: z
    .string()
    .optional()
    .refine(
      (v) => !v || z.string().email().safeParse(v).success,
      "Enter a valid email address.",
    ),
  phone: z
    .string()
    .min(1, "Mobile number is required.")
    .refine(
      (v) => /^[+\d][\d\s\-().]{5,}$/.test(v.trim()),
      "Enter a valid phone number (any format accepted).",
    ),
  query: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ── Shared input classes ─────────────────────────────────────────────────────
const inputClasses =
  "mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition-all duration-150 placeholder:text-text-muted focus:border-accent focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)] focus:ring-2 focus:ring-accent/15";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm font-medium text-red-500">{message}</p>;
}

// ── Inner form — reused in both the contact page section and the landing page ─
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", query: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex size-20 items-center justify-center rounded-full bg-emerald-50 text-success"
        >
          <CheckCircle2 className="size-10" aria-hidden />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-bold text-text-primary">
          Thanks for showing interest!
        </h3>
        <p className="mt-3 max-w-md leading-7 text-text-secondary">
          Our team will contact you soon.
        </p>
        <a
          href="https://wa.me/917358550765"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-success px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
        >
          <MessageCircle className="mr-2 size-4" aria-hidden />
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      {/* Name */}
      <div>
        <label
          className="text-sm font-semibold text-text-primary"
          htmlFor="contact-name"
        >
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="John Doe"
          className={inputClasses}
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      {/* Mobile Number */}
      <div>
        <label
          className="text-sm font-semibold text-text-primary"
          htmlFor="contact-phone"
        >
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          placeholder="+91 98765 43210 or +1-800-555-0100"
          className={inputClasses}
          {...register("phone")}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      {/* Email (optional) */}
      <div>
        <label
          className="text-sm font-semibold text-text-primary"
          htmlFor="contact-email"
        >
          Email Address{" "}
          <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          className={inputClasses}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Business Query (optional) */}
      <div>
        <label
          className="text-sm font-semibold text-text-primary"
          htmlFor="contact-query"
        >
          Business Query{" "}
          <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <textarea
          id="contact-query"
          rows={compact ? 3 : 4}
          placeholder="Tell us what you need — website, app, automation…"
          className={inputClasses}
          {...register("query")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send My Request
            <ArrowRight className="ml-2 size-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}

// ── Full contact section (contact page) ──────────────────────────────────────
export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-background py-12 md:py-20">
      <motion.div
        className="mx-auto w-full max-w-container px-6 lg:px-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[32px] font-bold leading-tight text-text-primary md:text-[48px]">
            Let&apos;s Build Something Together
          </h2>
          <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
            Tell us what you need. We&apos;ll respond within 2 hours.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left — contact info card */}
          <div className="rounded-2xl bg-surface p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-semibold text-text-secondary">
              <span className="size-2 rounded-full bg-success" aria-hidden />
              Available Right Now
            </div>

            <div className="mt-8 grid gap-4">
              {[
                {
                  label: "WhatsApp",
                  value: "Chat with us now",
                  href: "https://wa.me/917358550765",
                  icon: MessageCircle,
                  accent: "text-success",
                },
                {
                  label: "Email",
                  value: "contact@bittstech.com",
                  href: "mailto:contact@bittstech.com",
                  icon: Mail,
                  accent: "text-accent",
                },
                {
                  label: "Call Us",
                  value: "7358550765",
                  href: "tel:+917358550765",
                  icon: Phone,
                  accent: "text-accent",
                },
              ].map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card active:scale-95"
                >
                  <div
                    className={cn(
                      "flex size-11 items-center justify-center rounded-lg bg-blue-50",
                      method.accent,
                    )}
                  >
                    <method.icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{method.label}</p>
                    <p className="text-sm text-text-secondary">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-8 leading-7 text-text-secondary">
              No automated replies. No ticket numbers. A real person responds —
              24 hours a day.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                "Free initial consultation",
                "Response within 2 hours",
                "No commitment required",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 text-sm font-semibold text-text-primary"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-emerald-50 text-success">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card md:p-8">
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
