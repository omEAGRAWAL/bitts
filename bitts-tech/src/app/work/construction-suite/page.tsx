import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { caseStudies } from "@/lib/data/work";

export const metadata: Metadata = {
  title: "Construction Management Software",
  description:
    "Multi-site construction ERP with material tracking, workforce management, budget tracking, vendor management, and payroll. Built by Bitts Tech.",
  alternates: {
    canonical: "https://bittstech.com/work/construction-suite",
  },
};

export default function ConstructionSuitePage() {
  return <CaseStudyLayout caseStudy={caseStudies.constructionSuite} />;
}
