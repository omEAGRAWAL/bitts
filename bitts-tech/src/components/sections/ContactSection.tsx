"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

const businessTypes = [
  "Travel & Tourism",
  "Construction & Real Estate",
  "Retail & E-commerce",
  "Healthcare",
  "Education",
  "Restaurants & Hospitality",
  "Professional Services",
  "Other",
] as const;

const projectNeeds = [
  "New Website",
  "Web Application",
  "Business Automation",
  "Website Revamp",
  "Business Management System",
  "Not Sure Yet — Let's Talk",
] as const;

const contactMethods = ["WhatsApp", "Email", "Call"] as const;

const contactSchema = z.object({
  name: z.string().min(1, "Your name is required."),
  businessName: z.string().min(1, "Business name is required."),
  businessType: z.enum(businessTypes, {
    message: "Choose your business type.",
  }),
  needs: z.array(z.enum(projectNeeds)).min(1, "Choose at least one need."),
  message: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine(
      (value) => !value || z.string().email().safeParse(value).success,
      "Enter a valid email address.",
    ),
  preferredContact: z.enum(contactMethods, {
    message: "Choose a preferred contact method.",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClasses =
  "mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/15";

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-red-500">{message}</p>;
}

export function ContactSection() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      needs: [],
      preferredContact: "WhatsApp",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // TODO: Connect to Resend email API
    console.log("Contact request submitted:", values);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSuccess(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-background py-12 md:py-20">
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[32px] font-bold leading-tight text-text-primary md:text-[48px]">
            Let&apos;s Build Something Together
          </h2>
          <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
            Tell us what you need. We&apos;ll respond within 2 hours.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
                  href: "https://wa.me/+91XXXXXXXXXX",
                  icon: MessageCircle,
                  accent: "text-success",
                },
                {
                  label: "Email",
                  value: "hello@bitts.tech",
                  href: "mailto:hello@bitts.tech",
                  icon: Mail,
                  accent: "text-accent",
                },
                {
                  label: "Call Us",
                  value: "+91 XXXXX XXXXX",
                  href: "tel:+91XXXXXXXXXX",
                  icon: Phone,
                  accent: "text-accent",
                },
              ].map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
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
                <div key={point} className="flex items-center gap-3 text-sm font-semibold text-text-primary">
                  <span className="flex size-5 items-center justify-center rounded-full bg-emerald-50 text-success">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-card md:p-8">
            {isSuccess ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex size-20 items-center justify-center rounded-full bg-emerald-50 text-success"
                >
                  <CheckCircle2 className="size-10" aria-hidden />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-bold text-text-primary">
                  We&apos;ve received your request!
                </h3>
                <p className="mt-3 max-w-md leading-7 text-text-secondary">
                  Expect a response within 2 hours.
                </p>
                <a
                  href="https://wa.me/+91XXXXXXXXXX"
                  className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-success px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  <MessageCircle className="mr-2 size-4" aria-hidden />
                  Message us on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-text-primary" htmlFor="name">
                      Your Name
                    </label>
                    <input id="name" type="text" className={inputClasses} {...register("name")} />
                    <FieldError message={errors.name?.message} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary" htmlFor="businessName">
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      className={inputClasses}
                      {...register("businessName")}
                    />
                    <FieldError message={errors.businessName?.message} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-text-primary" htmlFor="businessType">
                    Business Type
                  </label>
                  <select id="businessType" className={inputClasses} defaultValue="" {...register("businessType")}>
                    <option value="" disabled>
                      Select your business type
                    </option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.businessType?.message} />
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-text-primary">What do you need?</legend>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {projectNeeds.map((need) => (
                      <label
                        key={need}
                        className="flex items-center gap-3 rounded-lg border border-border px-3 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
                      >
                        <input
                          type="checkbox"
                          value={need}
                          className="size-4 accent-accent"
                          {...register("needs")}
                        />
                        {need}
                      </label>
                    ))}
                  </div>
                  <FieldError message={errors.needs?.message} />
                </fieldset>

                <div>
                  <label className="text-sm font-semibold text-text-primary" htmlFor="message">
                    Tell us more
                  </label>
                  <textarea id="message" rows={4} className={inputClasses} {...register("message")} />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-text-primary" htmlFor="phone">
                      Phone Number
                    </label>
                    <input id="phone" type="tel" className={inputClasses} {...register("phone")} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary" htmlFor="email">
                      Email Address
                    </label>
                    <input id="email" type="email" className={inputClasses} {...register("email")} />
                    <FieldError message={errors.email?.message} />
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold text-text-primary">
                    Preferred contact method
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {contactMethods.map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
                      >
                        <input
                          type="radio"
                          value={method}
                          className="size-4 accent-accent"
                          {...register("preferredContact")}
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                  <FieldError message={errors.preferredContact?.message} />
                </fieldset>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send My Request
                      <ArrowRight className="ml-2 size-4" aria-hidden />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
