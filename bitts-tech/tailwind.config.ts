import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8FAFC",
        border: "#E2E8F0",
        accent: "#2563EB",
        "accent-hover": "#1D4ED8",
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
        "text-muted": "#94A3B8",
        success: "#10B981",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-sora)", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 18px 40px rgba(15, 23, 42, 0.1)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
};

export default config;
