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
        serif: [
          "var(--font-noto-serif-kr)",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        body: ["Pretendard Variable", "Pretendard", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        paper: {
          DEFAULT: "#f3f1ea",
          white: "#ffffff",
        },
        ink: {
          DEFAULT: "#1b2440",
          soft: "#4a5470",
          faint: "#5a6280",
        },
        vermilion: {
          DEFAULT: "#ff4f30",
          soft: "#ff8a70",
        },
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        headline: "-0.04em",
        wide3: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
