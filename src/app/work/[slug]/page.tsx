import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/portfolio";
import { JsonLd } from "@/components/json-ld";
import { Arrow, Tags, TextLink } from "@/components/ui";
import { getSiteConfig, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project)
    return {
      title: "프로젝트를 찾을 수 없습니다",
      robots: { index: false, follow: false },
    };
  return pageMetadata(
    project.name,
    project.summary,
    `/work/${project.slug}`,
    `/work/${project.slug}/opengraph-image`,
  );
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { origin } = getSiteConfig();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              name: project.name,
              description: project.summary,
              url: `${origin}/work/${project.slug}`,
              image: `${origin}${project.image}`,
              creator: { "@id": `${origin}/#person` },
              inLanguage: "ko-KR",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "About Me",
                  item: origin,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Projects",
                  item: `${origin}/projects`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: project.name,
                  item: `${origin}/work/${project.slug}`,
                },
              ],
            },
          ],
        }}
      />
      <article className="container">
        <header className="case-hero">
          <TextLink href="/projects" className="case-back">
            All projects
          </TextLink>
          <p className="eyebrow">
            <span className="status-dot" />
            {project.category}
          </p>
          <h1>
            {project.name}
            <span className="accent">.</span>
          </h1>
          <p className="case-headline">{project.headline}</p>
          <dl className="case-facts">
            <div>
              <dt>MY ROLE</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>PERIOD / TEAM</dt>
              <dd>
                {project.period}
                <br />
                {project.team}
              </dd>
            </div>
            <div>
              <dt>TECHNOLOGIES</dt>
              <dd>
                <Tags items={project.stack} />
              </dd>
            </div>
          </dl>
        </header>
        <figure className="case-figure">
          <div className={`case-image tone-${project.tone}`} data-image-motion>
            <div className="project-motion-layer" data-parallax-layer>
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1440}
                height={890}
                sizes="(max-width: 700px) 90vw, 1100px"
                preload
              />
            </div>
          </div>
          <figcaption>
            {project.illustration
              ? "사례의 설계와 흐름을 설명하기 위한 일러스트레이션"
              : project.imageAlt}
          </figcaption>
        </figure>
        <div className="case-highlights">
          {project.highlights.map((highlight, i) => (
            <p key={highlight} data-reveal>
              <span className="mono">0{i + 1} / HIGHLIGHT</span>
              {highlight}
            </p>
          ))}
        </div>
        {project.sections.map((section) => (
          <section key={section.label} className="case-section" data-reveal>
            <div className="mono">{section.label}</div>
            <div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
        <aside className="case-evidence">
          <p className="mono">SOURCE / WORK LOG</p>
          <div className="evidence-links">
            {project.evidence.map((item) =>
              item.url ? (
                <TextLink key={item.label} href={item.url} external>
                  {item.label}
                </TextLink>
              ) : (
                <p key={item.label} className="evidence-note">
                  {item.label}
                </p>
              ),
            )}
            {project.evidence.some((item) => item.private) && (
              <p className="evidence-note">
                회사 작업 기록은 저장소 접근 권한이 있어야 열 수 있습니다.
              </p>
            )}
          </div>
        </aside>
        <Link
          href={`/work/${next.slug}`}
          data-transition
          className="next-project"
        >
          <span className="mono">NEXT CASE STUDY</span>
          <div>
            <h2>{next.name}</h2>
            <Arrow />
          </div>
        </Link>
      </article>
    </>
  );
}
