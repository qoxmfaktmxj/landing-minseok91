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
        primary: "#006c59",
        "primary-dim": "#005e4e",
        "primary-container": "#7cf8d9",
        "on-primary": "#e4fff5",
        "on-primary-container": "#005d4d",
        surface: "#f8f9fa",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f1f4f5",
        "surface-container": "#ebeef0",
        "surface-container-high": "#e5e9eb",
        "surface-container-highest": "#dee3e6",
        "on-surface": "#2d3335",
        "on-surface-variant": "#5a6062",
        "on-background": "#2d3335",
        tertiary: "#306674",
        "tertiary-container": "#b8eefe",
        "on-tertiary-container": "#225a68",
        secondary: "#49636f",
        "secondary-container": "#cbe7f5",
        "on-secondary-container": "#3c5561",
        outline: "#767c7e",
        "outline-variant": "#adb3b5",
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
