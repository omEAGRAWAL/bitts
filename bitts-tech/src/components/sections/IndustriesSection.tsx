import { cn } from "@/lib/utils";

const industries = [
  "✈️ Travel & Tourism",
  "🏗️ Construction & Real Estate",
  "🛒 Retail & E-commerce",
  "🏥 Healthcare & Clinics",
  "📚 Education & Training",
  "🍽️ Restaurants & Hospitality",
  "💼 Professional Services",
  "🏭 Manufacturing & Supply",
  "🏢 Any Business With a Process",
];

export function IndustriesSection() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-auto w-full max-w-container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[28px] font-bold leading-tight text-text-primary md:text-[40px]">
            We Build for Any Business
          </h2>
          <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
            Every industry has processes, workflows, and customers. We&apos;ve
            built systems across all of them.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
          {industries.map((industry, index) => {
            const isLast = index === industries.length - 1;

            return (
              <span
                key={industry}
                className={cn(
                  "rounded-full border bg-background px-5 py-3 text-base font-semibold text-text-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-text-primary hover:shadow-card",
                  isLast
                    ? "border-accent bg-blue-50 text-accent"
                    : "border-border",
                )}
              >
                {industry}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
