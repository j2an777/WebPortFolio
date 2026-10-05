import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { MotionEnhancer } from "@/components/motion-enhancer";
import { RouteTransitions } from "@/components/route-transitions";
import { getSiteConfig } from "@/lib/seo";
import "./globals.css";
import "./resume.css";

const dmSans = localFont({
  src: "../../public/fonts/dm-sans-latin-variable.woff2",
  variable: "--font-dm",
  display: "swap",
  weight: "100 900",
});
const site = getSiteConfig();
export const metadata: Metadata = {
  metadataBase: new URL(`${site.siteUrl}/`),
  title: {
    default: "하승진 · 프론트엔드 개발자 | J2AN",
    template: "%s | J2AN · 하승진",
  },
  description:
    "서비스 품질과 협업 문화를 함께 만드는 프론트엔드 개발자 하승진의 포트폴리오. Purple Academy, HanwhaVision STEP, Co-Play, Dart의 경험과 설계 판단을 확인하세요.",
  robots: { index: site.indexable, follow: site.indexable },
  icons: { icon: `${site.siteUrl}/icon.svg` },
};
export const viewport: Viewport = {
  themeColor: "#f4f2ed",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={dmSans.variable}>
      <body id="top">
        <a className="skip-link" href="#main">
          본문으로 건너뛰기
        </a>
        <Header />
        <RouteTransitions>
          <main id="main" tabIndex={-1} data-route-content>
            {children}
          </main>
        </RouteTransitions>
        <Footer />
        <MotionEnhancer />
      </body>
    </html>
  );
}
