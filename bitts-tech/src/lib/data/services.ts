import {
  GitBranch,
  Globe,
  Layers,
  LayoutDashboard,
  RefreshCw,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    name: "Custom Websites",
    description:
      "Designed to convert visitors. Fast, mobile-first, built to rank on search.",
    icon: Globe,
  },
  {
    name: "Web Applications",
    description:
      "Complex workflows turned into clean, usable software built for your process.",
    icon: Layers,
  },
  {
    name: "Business Automation",
    description:
      "Automated communication, data flows, and operations that run without you.",
    icon: Zap,
  },
  {
    name: "Website Revamps",
    description:
      "We take your existing website and rebuild it into a growth channel.",
    icon: RefreshCw,
  },
  {
    name: "Business Management Systems",
    description:
      "Multi-user software covering the full operational lifecycle of your business.",
    icon: LayoutDashboard,
  },
  {
    name: "API & Integrations",
    description:
      "Connect every tool you use. Fill the gaps with custom-built integrations.",
    icon: GitBranch,
  },
];
