import {
  Code2,
  Headphones,
  HeartHandshake,
  Infinity,
  Lightbulb,
  RefreshCw,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface WhyUsReason {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const whyUsReasons: WhyUsReason[] = [
  {
    number: "01",
    title: "24/7 Live Support",
    description: "Real humans, any time. Not a ticketing queue.",
    icon: Headphones,
  },
  {
    number: "02",
    title: "We Learn First",
    description: "We understand your business before writing any code.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "You Own Everything",
    description: "All code, data, and access handed to you fully.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "One Team",
    description: "Design, dev, and delivery under one roof. No outsourcing.",
    icon: Users,
  },
  {
    number: "05",
    title: "Iterative Delivery",
    description: "See working software early, not after months of silence.",
    icon: Code2,
  },
  {
    number: "06",
    title: "Built to Scale",
    description: "We build for where you're going, not just where you are.",
    icon: Scale,
  },
  {
    number: "07",
    title: "Revamp Ready",
    description: "We improve what exists, not just build from scratch.",
    icon: RefreshCw,
  },
  {
    number: "08",
    title: "Practical Solutions",
    description: "What you need — not everything that sounds impressive.",
    icon: HeartHandshake,
  },
  {
    number: "09",
    title: "Long-Term Partner",
    description: "Most agencies vanish post-launch. We don't.",
    icon: Infinity,
  },
];
