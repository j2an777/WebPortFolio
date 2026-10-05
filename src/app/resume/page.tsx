import { ResumeHome } from "@/components/resume";
import { JsonLd } from "@/components/json-ld";
import { getSiteConfig, pageMetadata } from "@/lib/seo";
import { profile } from "@/content/portfolio";
export const metadata = pageMetadata(
  "이력서 · 하승진",
  "하승진의 경력, 프로젝트 성과, 기술 역량과 학력·수상 이력. 같은 디자인의 PDF 이력서를 다운로드할 수 있습니다.",
  "/resume/",
);
export default function ResumePage() {
  const { siteUrl } = getSiteConfig();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${siteUrl}/resume/#profile`,
          url: `${siteUrl}/resume/`,
          name: `${profile.name} · 프론트엔드 개발자 이력서`,
          mainEntity: { "@id": `${siteUrl}/#person` },
        }}
      />
      <ResumeHome />
    </>
  );
}
