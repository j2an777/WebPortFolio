import { ContactSection } from "@/components/sections";
import { PageIntro } from "@/components/ui";
import { profile } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact",
  `프론트엔드 개발자 하승진에게 연락하세요. ${profile.email} · GitHub j2an777 · 기술 블로그 j2an.`,
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT / START A CONVERSATION"
        title="Let’s build"
        accent="something good."
        description="새로운 제품, 팀이 마주한 문제, 함께 나눌 기술 이야기. 이메일로 편하게 연락해 주세요."
      />
      <ContactSection full />
    </>
  );
}
