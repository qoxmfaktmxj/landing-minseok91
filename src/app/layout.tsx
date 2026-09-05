import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";
import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.minseok91.cloud"),
  title: "The Minseok Times | HR × AI × AX",
  description:
    "개발 9년 차, HR 경력 4년 이상. HR 시스템 구축과 운영, EHR Harness Plugin의 2개 팀 30명 이상 배포 및 활용, AI TFT 완료와 Claude Code 전사 도입 결정까지 담은 김민석의 포트폴리오.",
  keywords: [
    "김민석",
    "AX 엔지니어",
    "HR 시스템 개발",
    "AI 활용 개발",
    "조직 AX 전환",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Minseok Times | HR × AI × AX",
    description:
      "개발 9년 차, HR 경력 4년 이상. 사내 AI TFT를 마무리했으며, 그 성과로 Claude Code 전사 도입이 결정됐습니다.",
    url: "/",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Minseok Times | HR × AI × AX",
    description:
      "개발 9년 차, HR 경력 4년 이상. 사내 AI TFT를 마무리했으며, 그 성과로 Claude Code 전사 도입이 결정됐습니다.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerifKr.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <MotionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
