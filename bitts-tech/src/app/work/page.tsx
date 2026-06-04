import type { Metadata } from "next";

import { WorkSection } from "@/components/sections/WorkSection";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "See Bitts Tech case studies for travel agency software, construction management systems, and custom business platforms.",
  alternates: {
    canonical: "https://bittstech.com/work",
  },
};

export default function WorkPage() {
  return (
    <main>
      <WorkSection />
    </main>
  );
}
