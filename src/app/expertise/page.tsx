import { ContactSection, ExpertiseSection } from "@/components/sections";
import { PageIntro } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Expertise",
  "제품 개발, 디자인 시스템, API 계약, 서버 렌더링, SEO·AEO, 성능과 접근성을 함께 다루는 하승진의 개발 역량.",
  "/expertise",
);
export default function Expertise() {
  return (
    <>
      <PageIntro
        eyebrow="EXPERTISE / HOW I BUILD"
        title="Thoughtful systems."
        accent="Better experiences."
        description="기술의 이름보다 해결할 문제를 먼저 봅니다. 제품, 시스템, 성능이라는 세 관점으로 개발합니다."
      />
      <ExpertiseSection standalone />
      <ContactSection />
    </>
  );
}
