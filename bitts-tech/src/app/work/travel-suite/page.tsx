import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { caseStudies } from "@/lib/data/work";

export const metadata: Metadata = {
  title: "Travel Agency Management Platform | Bitts Tech",
  description:
    "Full-stack travel agency software with lead management, bookings, invoicing, and WhatsApp automation. Built by Bitts Tech.",
};

export default function TravelSuitePage() {
  return <CaseStudyLayout caseStudy={caseStudies.travelSuite} />;
}
