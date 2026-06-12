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
  title: "The Minseok Times — HR × AI × AX",
  description:
    "HR 시스템을 9년간 만들어온 개발자가 AI를 동료로 끌어들였다. 조직의 AX 전환을 단독 보도하는 단 한 부의 신문.",
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
    title: "The Minseok Times — HR × AI × AX",
    description:
      "조직의 AX 전환, 한 사람에서 시작된다. 9년차 HR 도메인 개발자의 단독 보도.",
    url: "/",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Minseok Times — HR × AI × AX",
    description:
      "조직의 AX 전환, 한 사람에서 시작된다. 9년차 HR 도메인 개발자의 단독 보도.",
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
