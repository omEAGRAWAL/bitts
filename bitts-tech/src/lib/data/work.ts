export interface WorkProjectTab {
  /** Short label shown in the tab button */
  label: string;
  /** Path relative to /public, e.g. "/work/travel-1.webp" */
  image: string;
}

export interface WorkProject {
  industry: string;
  title: string;
  challenge: string;
  features: string[];
  stack: string[];
  href: string;
  /** Named tabs — each tab has a label and a matching screenshot */
  tabs?: WorkProjectTab[];
}

export interface CaseStudyFeature {
  name: string;
  description: string;
}

export interface CaseStudyTech {
  name: string;
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  industry: string;
  platform: string;
  title: string;
  summary: string;
  challengeIntro: string[];
  beforeState: string[];
  solutionIntro: string;
  afterState: string[];
  features: CaseStudyFeature[];
  techStack: CaseStudyTech[];
  outcomes: CaseStudyStat[];
}

const travelFeatures = [
  "Lead capture and pipeline management",
  "Booking and itinerary management",
  "Invoice generation and payment tracking",
];

const constructionFeatures = [
  "Multi-vendor material procurement and tracking",
  "Multi-site project and workforce management",
  "Budget planning and real-time expense monitoring",
  "Employee attendance and payroll processing",
  "Document and compliance management",
];

export const workProjects: WorkProject[] = [
  {
    industry: "Travel & Tourism",
    title: "End-to-End Travel Agency Platform",
    challenge:
      "Travel agencies were managing leads, bookings, and follow-ups manually across disconnected tools.",
    features: travelFeatures,
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "/work/travel-suite",
    tabs: [
      { label: "Dashboard",       image: "/work/travel-1.webp" },
      { label: "Lead Pipeline",   image: "/work/travel-2.webp" },
      { label: "Booking & Invoice", image: "/work/travel-3.webp" },
    ],
  },
  {
    industry: "Construction & Infrastructure",
    title: "Multi-Site Construction Management System",
    challenge:
      "Construction businesses had no unified way to track materials, workforce, and finances across multiple sites.",
    features: constructionFeatures,
    stack: ["Next.js", "Node.js", "PostgreSQL", "Cloud Storage"],
    href: "/work/construction-suite",
    tabs: [
      { label: "Site Overview",  image: "/work/construction-1.webp" },
      { label: "Procurement",    image: "/work/construction-2.webp" },
      { label: "Payroll",        image: "/work/construction-3.webp" },
      { label: "Reports",        image: "/work/construction-4.webp" },
    ],
  },
];



export const caseStudies = {
  travelSuite: {
    slug: "travel-suite",
    industry: "Travel & Tourism",
    platform: "Web App",
    title: "Travel Agency Management Platform",
    summary:
      "A full-stack operating system for travel agencies handling leads, bookings, and invoices in one place.",
    challengeIntro: [
      "Travel teams were trying to manage fast-moving customer conversations, bookings, invoices, and follow-ups across disconnected tools. That made it hard to know which leads were active, which trips needed attention, and which payments were still pending.",
      "The business needed one reliable platform that could reduce manual coordination, keep customer information organized, and give leadership visibility into day-to-day performance.",
    ],
    beforeState: [
      "Lead details scattered across chats and spreadsheets",
      "Manual booking updates and itinerary tracking",
      "Invoices created separately from payment records",
      "Follow-ups dependent on memory and reminders",
    ],
    solutionIntro:
      "We built a centralized travel agency platform that connects lead management, booking workflows, and invoicing into a single operational system.",
    afterState: travelFeatures,
    features: [
      {
        name: "Lead Management",
        description:
          "Capture inquiries, track pipeline stages, assign follow-ups, and keep every traveler conversation tied to a clear business outcome.",
      },
      {
        name: "Booking System",
        description:
          "Manage trip details, itinerary updates, customer preferences, and internal handoffs from inquiry through confirmation.",
      },
      {
        name: "Invoice Generator",
        description:
          "Generate polished invoices, connect them to bookings, and monitor payment status without jumping between tools.",
      },
    ],
    techStack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "Cloud Hosting" },
    ],
    outcomes: [
      { value: "100%", label: "Centralized lead and booking workflow" },
      { value: "Multi-role", label: "Access for sales, operations, and admin" },
      { value: "Live", label: "Booking and payment visibility" },
    ],
  },
  constructionSuite: {
    slug: "construction-suite",
    industry: "Construction & Infrastructure",
    platform: "Web App",
    title: "Construction Management Software",
    summary:
      "A multi-site construction ERP for materials, vendors, workforce, budgets, documents, and payroll visibility.",
    challengeIntro: [
      "Construction teams were coordinating site progress, material procurement, vendor updates, labor attendance, and budgets through manual records and fragmented communication.",
      "As projects scaled across multiple sites, the business needed one system to track what was happening, what it cost, who was responsible, and which actions needed attention.",
    ],
    beforeState: [
      "Material requests managed manually across vendors",
      "Site progress updates buried in calls and messages",
      "Budget changes tracked after the fact",
      "Attendance and payroll handled in separate records",
      "Documents and compliance files hard to locate",
    ],
    solutionIntro:
      "We designed a construction management suite that brings procurement, project tracking, budgets, attendance, payroll, vendors, and documents into one multi-role platform.",
    afterState: constructionFeatures,
    features: [
      {
        name: "Material Procurement",
        description:
          "Track material requests, vendor quotes, approvals, deliveries, and site-level consumption from one workflow.",
      },
      {
        name: "Site Management",
        description:
          "Monitor project progress, assign responsibilities, record updates, and compare execution across multiple active sites.",
      },
      {
        name: "Budget Tracking",
        description:
          "Plan project budgets, monitor real-time expenses, and surface cost movement before it becomes a surprise.",
      },
      {
        name: "Attendance & Payroll",
        description:
          "Record workforce attendance, connect labor activity to projects, and simplify payroll preparation.",
      },
    ],
    techStack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "REST APIs" },
      { name: "Cloud Storage" },
    ],
    outcomes: [
      { value: "Multi-site", label: "Operational tracking across projects" },
      { value: "Live Costs", label: "Budget and expense visibility" },
      { value: "Unified", label: "Procurement, payroll, and documents" },
    ],
  },
} satisfies Record<string, CaseStudy>;
