import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ["var(--font-manrope)", "Pretendard Variable", "sans-serif"],
        body: ["Pretendard Variable", "Pretendard", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        primary: "#0a0a0a",
        "primary-dim": "#333333",
        "primary-container": "#f0f0f0",
        "on-primary": "#ffffff",
        "on-primary-container": "#0a0a0a",
        surface: "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fafafa",
        "surface-container": "#f5f5f5",
        "surface-container-high": "#eeeeee",
        "surface-container-highest": "#e5e5e5",
        "on-surface": "#0a0a0a",
        "on-surface-variant": "#525252",
        "on-background": "#0a0a0a",
        tertiary: "#737373",
        "tertiary-container": "#f0f0f0",
        "on-tertiary-container": "#333333",
        secondary: "#525252",
        "secondary-container": "#f0f0f0",
        "on-secondary-container": "#333333",
        outline: "#a3a3a3",
        "outline-variant": "#e5e5e5",
        accent: {
          DEFAULT: "#00875e",
          hover: "#006e4c",
          soft: "#00d992",
          tint: "rgba(0, 135, 94, 0.08)",
          line: "rgba(0, 135, 94, 0.34)",
        },
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        xl: "0.75rem",
      },
      letterSpacing: {
        headline: "-0.04em",
        section: "-0.03em",
        overline: "0.22em",
      },
      lineHeight: {
        headline: "1",
        section: "1.08",
      },
      boxShadow: {
        "ambient-soft": "0 0 24px rgba(0, 135, 94, 0.12)",
        "ambient-warm": "0 12px 40px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
