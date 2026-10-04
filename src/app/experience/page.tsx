import {
  ContactSection,
  ExperienceSection,
  RecentWork,
} from "@/components/sections";
import { PageIntro } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Experience",
  "Purple Academy 교육 플랫폼, 한화비전 STEP 클라이언트 프로젝트, Co-Play 플랫폼의 참여 경험과 학력을 확인하세요.",
  "/experience",
);
export default function Experience() {
  return (
    <>
      <PageIntro
        eyebrow="EXPERIENCE / A CONTINUING JOURNEY"
        title="Different products."
        accent="Deeper perspective."
        description="초기 구조를 설계하고, 운영 중인 문제를 해결하고, 다음 개발자가 이어갈 기반을 남겨 왔습니다."
      />
      <ExperienceSection />
      <RecentWork />
      <ContactSection />
    </>
  );
}
