import {
  BarChart2,
  Database,
  Globe,
  Monitor,
  Package,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

export interface Problem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const problems: Problem[] = [
  {
    title: "No Online Presence",
    description:
      "Your competitors are online and winning customers you never see.",
    icon: Globe,
  },
  {
    title: "Scattered Data",
    description:
      "Information lives across WhatsApp groups, Excel sheets, and memory.",
    icon: Database,
  },
  {
    title: "Manual Processes",
    description:
      "Work that software should handle, your team is doing by hand daily.",
    icon: RefreshCw,
  },
  {
    title: "No Business Visibility",
    description:
      "No real-time view of operations, finances, or team performance.",
    icon: BarChart2,
  },
  {
    title: "Generic Off-The-Shelf Tools",
    description: "Paying for 100 features. Actually using 4 of them.",
    icon: Package,
  },
  {
    title: "Outdated Website",
    description:
      "A website that hasn't grown with your business is losing you customers.",
    icon: Monitor,
  },
];
