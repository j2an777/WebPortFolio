import {
  AboutHero,
  ImpactSection,
  ContactSection,
  ExperienceSection,
  ExpertiseSection,
  RecentWork,
  SelectedProjects,
} from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import { getSiteConfig, pageMetadata, personSchema } from "@/lib/seo";
import { profile } from "@/content/portfolio";

export const metadata = pageMetadata(
  "About Me · 하승진",
  profile.description,
  "/",
);
export default function Home() {
  const { origin } = getSiteConfig();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            personSchema(),
            {
              "@type": "ProfilePage",
              "@id": `${origin}/#profile`,
              url: origin,
              name: "하승진 · About Me",
              mainEntity: { "@id": `${origin}/#person` },
            },
            {
              "@type": "WebSite",
              url: origin,
              name: "J2AN · 하승진",
              inLanguage: "ko-KR",
            },
          ],
        }}
      />
      <AboutHero />
      <ImpactSection />
      <SelectedProjects />
      <ExpertiseSection />
      <ExperienceSection />
      <RecentWork />
      <ContactSection />
    </>
  );
}
