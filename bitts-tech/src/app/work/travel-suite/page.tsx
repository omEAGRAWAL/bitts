import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { caseStudies, workProjects } from "@/lib/data/work";

export const metadata: Metadata = {
  title: "Travel Agency Management Platform",
  description:
    "Full-stack travel agency software with lead management, bookings, and invoicing. Built by Bitts Tech.",
  alternates: {
    canonical: "https://bittstech.com/work/travel-suite",
  },
};

export default function TravelSuitePage() {
  const tabs = workProjects.find((p) => p.href === "/work/travel-suite")?.tabs;
  return <CaseStudyLayout caseStudy={caseStudies.travelSuite} tabs={tabs} />;
}
