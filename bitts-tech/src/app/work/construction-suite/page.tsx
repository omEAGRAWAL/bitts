import type { Metadata } from "next";

import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { caseStudies } from "@/lib/data/work";

export const metadata: Metadata = {
  title: "Construction Management Software | Bitts Tech",
  description:
    "Multi-site construction ERP with material tracking, workforce management, budgets, and payroll. Built by Bitts Tech.",
};

export default function ConstructionSuitePage() {
  return <CaseStudyLayout caseStudy={caseStudies.constructionSuite} />;
}
