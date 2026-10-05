import { ContactSection, SelectedProjects } from "@/components/sections";
import { PageIntro } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Projects",
  "실제 제품에서의 문제, 선택, 결과. Purple Academy·인베스티·개인 및 팀 프로젝트의 기여 사례를 살펴보세요.",
  "/projects",
);
export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="PROJECTS / SELECTED EXPERIENCES"
        title="Work that"
        accent="makes a difference."
        description="서비스를 만드는 일은 화면을 완성하는 것보다 넓습니다. 사용자 경험, 운영 안정성, 팀의 개발 기반을 함께 다룬 사례들입니다."
      />
      <SelectedProjects all />
      <ContactSection />
    </>
  );
}
