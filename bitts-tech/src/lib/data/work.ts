export interface WorkProject {
  industry: string;
  title: string;
  challenge: string;
  features: string[];
  stack: string[];
  href: string;
}

export const workProjects: WorkProject[] = [
  {
    industry: "✈️ Travel & Tourism",
    title: "End-to-End Travel Agency Platform",
    challenge:
      "Travel agencies were managing leads, bookings, and follow-ups manually across disconnected tools.",
    features: [
      "Lead capture and pipeline management",
      "Booking and itinerary management",
      "Invoice generation and payment tracking",
      "Automated WhatsApp and email communication",
      "Performance analytics and reporting",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "WhatsApp API"],
    href: "/work/travel-suite",
  },
  {
    industry: "🏗️ Construction & Infrastructure",
    title: "Multi-Site Construction Management System",
    challenge:
      "Construction businesses had no unified way to track materials, workforce, and finances across multiple sites.",
    features: [
      "Multi-vendor material procurement and tracking",
      "Multi-site project and workforce management",
      "Budget planning and real-time expense monitoring",
      "Employee attendance and payroll processing",
      "Document and compliance management",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Cloud Storage"],
    href: "/work/construction-management",
  },
];
