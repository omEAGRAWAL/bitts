import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { caseStudies } from "@/lib/data/work";

export const metadata: Metadata = {
  title: "Travel Agency Management Platform",
  description:
    "Full-stack travel agency software with lead management, bookings, invoicing, WhatsApp automation, and analytics. Built by Bitts Tech.",
  alternates: {
    canonical: "https://bittstech.com/work/travel-suite",
  },
};

export default function TravelSuitePage() {
  return <CaseStudyLayout caseStudy={caseStudies.travelSuite} />;
}
