import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import MotionProvider from "@/components/providers/MotionProvider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
  title: "민석 | AI 엔터프라이즈 빌더",
  description:
    "9년차 엔터프라이즈 시스템 개발자입니다. HR 등 사내 시스템 문맥을 이해하고 AI를 활용해 점진적 현대화, 공통 프레임워크 구축, 운영 효율화까지 연결합니다.",
  keywords: [
    "민석 포트폴리오",
    "엔터프라이즈 빌더",
    "사내 시스템 개선",
    "레거시 현대화",
    "AI 활용 개발",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "민석 | AI 엔터프라이즈 빌더",
    description:
      "사내 시스템 개선, 레거시 현대화, 공통 프레임워크 구축, 운영 효율화를 현실적인 방식으로 연결하는 개발자",
    url: "/",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "민석 | AI 엔터프라이즈 빌더",
    description:
      "HR, ERP, 사내 시스템 문맥을 이해하고 AI를 실무형 개선으로 연결하는 9년차 엔지니어 포트폴리오.",
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
    <html lang="ko" className={`${manrope.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
