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
        surface: "#f0f7f5",
        "surface-container-lowest": "#f8fcfb",
        "surface-container-low": "#e8f2ef",
        "surface-container": "#dfe9e6",
        "surface-container-high": "#d6e0dd",
        "surface-container-highest": "#cdd7d4",
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
