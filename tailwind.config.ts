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
        primary: "#111111",
        "primary-dim": "#333333",
        "primary-container": "#f0f0f0",
        "on-primary": "#ffffff",
        "on-primary-container": "#111111",
        surface: "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fafafa",
        "surface-container": "#f5f5f5",
        "surface-container-high": "#eeeeee",
        "surface-container-highest": "#e5e5e5",
        "on-surface": "#111111",
        "on-surface-variant": "#666666",
        "on-background": "#111111",
        tertiary: "#888888",
        "tertiary-container": "#f0f0f0",
        "on-tertiary-container": "#333333",
        secondary: "#555555",
        "secondary-container": "#f0f0f0",
        "on-secondary-container": "#333333",
        outline: "#999999",
        "outline-variant": "#d4d4d4",
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
