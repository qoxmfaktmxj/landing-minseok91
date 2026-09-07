import type { Metadata } from "next";
import localFont from "next/font/local";
import MotionProvider from "@/components/providers/MotionProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
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
  title: "김민석 | 백엔드 개발자",
  description:
    "AI로 필요한 서비스를 만들고 있습니다. 팀에서 함께 쓸 AI 도구도 직접 만듭니다. 백엔드 개발자 김민석의 포트폴리오.",
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
    title: "김민석 | 백엔드 개발자",
    description:
      "AI로 필요한 서비스를 만들고 있습니다. 팀에서 함께 쓸 AI 도구도 직접 만듭니다.",
    url: "/",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "김민석 | 백엔드 개발자",
    description:
      "AI로 필요한 서비스를 만들고 있습니다. 팀에서 함께 쓸 AI 도구도 직접 만듭니다.",
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
    <html lang="ko" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <script
          type="application/json"
          id="design-contract"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              thesis:
                "Systems in Motion: real backend work introduced through an interactive arctic landscape.",
              world:
                "Graphite, silver, cobalt. Geist display, Korean project narratives, open image-led composition.",
              story:
                "Meet Kim Minseok, understand HR and AI work, read two real cases, explore five experiments, make contact.",
              firstViewport:
                "KIM MINSEOK and the user-approved Korean introduction about building services with AI and AI tools for the team; immediate project and contact links over a spatial snow scene with an interactive igloo.",
              form: "User-approved arctic scene with spatial camera movement, local ice-block response and continuous snow.",
              finish:
                "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance",
            }),
          }}
        />
        <MotionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
