import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/content/portfolio";
import { resume, resumePdf } from "@/content/resume";
import { withBasePath } from "@/lib/paths";
import { Arrow, Tags, TextLink } from "./ui";

const index = [
  ["experience", "Experience"],
  ["projects", "Selected Projects"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["awards", "Awards"],
  ["certifications", "Certifications"],
] as const;

export function ResumeHome() {
  return (
    <article className="resume container">
      <header className="resume-hero">
        <div className="resume-hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            FRONTEND DEVELOPER / J2AN
          </p>
          <h1>
            하승진<span className="accent">.</span>
            <span className="resume-english">Seungjin Ha</span>
          </h1>
          <h2>{resume.headline}</h2>
          <p className="resume-intro">{resume.introduction}</p>
          <div className="resume-actions">
            <a
              href={withBasePath(resumePdf)}
              download="하승진_프론트엔드_이력서.pdf"
              className="resume-download"
            >
              이력서 PDF 다운로드 <Arrow diagonal={false} />
            </a>
            <a href={`mailto:${resume.profile.email}`} className="resume-email">
              {resume.profile.email}
              <Arrow />
            </a>
          </div>
          <div className="resume-channels">
            <a
              href={resume.profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href={resume.profile.blog}
              target="_blank"
              rel="noopener noreferrer"
            >
              Velog ↗
            </a>
            <span>UPDATED {resume.updatedAt}</span>
          </div>
        </div>
        <figure className="resume-portrait">
          <Image
            src={resume.portrait}
            alt="하승진 프로필 사진"
            width={640}
            height={853}
            sizes="(max-width: 700px) 160px, 300px"
            preload
          />
          <figcaption>
            <span>BUILDING PRODUCTS.</span>
            <span>LEAVING GOOD SYSTEMS.</span>
          </figcaption>
        </figure>
      </header>
      <div className="resume-body">
        <aside className="resume-index" aria-label="이력서 목차">
          <p className="mono">THE RESUME</p>
          {index.map(([id, label], i) => (
            <a href={`#${id}`} key={id}>
              <span className="mono">0{i + 1}</span>
              {label}
            </a>
          ))}
          <a
            href={withBasePath(resumePdf)}
            download
            className="resume-index-pdf"
          >
            Download PDF ↓
          </a>
        </aside>
        <div className="resume-content">
          <section id="experience" className="resume-section">
            <ResumeHeading
              number="01"
              title="Experience"
              description="소속과 참여 프로젝트를 구분한 경력입니다."
            />
            {resume.careers.map((career) => (
              <div key={career.name} className="resume-career" data-reveal>
                <div className="resume-entry-heading">
                  <h3>{career.name}</h3>
                  <p className="mono">{career.period}</p>
                </div>
                <p className="resume-role">
                  {career.role}
                  <span>{career.kind}</span>
                </p>
                <p className="resume-entry-description">{career.description}</p>
                <ul className="resume-bullets">
                  {career.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="resume-career-links">
                  {career.slugs.map((slug) => (
                    <TextLink key={slug} href={`/work/${slug}`}>
                      {getProject(slug)?.name ?? slug}
                    </TextLink>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section id="projects" className="resume-section">
            <ResumeHeading
              number="02"
              title="Selected Projects"
              description="기술 선택보다 먼저, 해결해야 할 문제를 봅니다."
            />
            <div className="resume-projects">
              {resume.projects.map((project) => (
                <div className="resume-project" key={project.slug} data-reveal>
                  <Link
                    href={`/work/${project.slug}`}
                    data-transition
                    className={`resume-project-image tone-${project.tone}`}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={520}
                      height={320}
                      sizes="(max-width: 700px) 90vw, 320px"
                    />
                  </Link>
                  <div>
                    <p className="mono">{project.category}</p>
                    <h3>
                      <Link href={`/work/${project.slug}`} data-transition>
                        {project.name}
                        <span className="accent"> ↗</span>
                      </Link>
                    </h3>
                    <p className="resume-project-period">
                      {project.period} · {project.role}
                    </p>
                    <ul className="resume-bullets">
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <TextLink href="/projects">전체 프로젝트 보기</TextLink>
          </section>
          <section id="skills" className="resume-section">
            <ResumeHeading
              number="03"
              title="Skills"
              description="실제 프로젝트에서 사용하고 개선한 기술입니다."
            />
            {resume.skills.map((group) => (
              <div className="resume-skill-group" key={group.title} data-reveal>
                <h3>{group.title}</h3>
                <Tags items={group.items} />
              </div>
            ))}
          </section>
          <section id="education" className="resume-section">
            <ResumeHeading number="04" title="Education" />
            <div className="resume-school" data-reveal>
              <div className="resume-entry-heading">
                <h3>{resume.education.name}</h3>
                <p className="mono">{resume.education.period}</p>
              </div>
              <p>{resume.education.degree}</p>
              <p className="muted">{resume.education.detail}</p>
            </div>
            <h3 className="resume-subheading">Learning</h3>
            {resume.learning.map((item) => (
              <div className="resume-compact" key={item.name}>
                <p>
                  {item.name}
                  <span>{item.detail}</span>
                </p>
                <p className="mono">{item.period}</p>
              </div>
            ))}
          </section>
          <section id="awards" className="resume-section">
            <ResumeHeading number="05" title="Awards" />
            {resume.awards.map((item) => (
              <div className="resume-compact resume-award" key={item.name}>
                <p>
                  <strong>{item.result}</strong>
                  {item.name}
                </p>
                <p className="mono">{item.date}</p>
              </div>
            ))}
          </section>
          <section id="certifications" className="resume-section">
            <ResumeHeading number="06" title="Certifications" />
            {resume.certifications.map((item) => (
              <div className="resume-compact" key={item.name}>
                <p>{item.name}</p>
                <p className="mono">{item.date}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
      <section className="resume-closing" id="contact">
        <p className="eyebrow">LET’S BUILD SOMETHING MEANINGFUL.</p>
        <h2>
          다음 제품을,
          <br />
          함께 만들어갑니다<span className="accent">.</span>
        </h2>
        <a href={`mailto:${resume.profile.email}`}>
          {resume.profile.email}
          <Arrow />
        </a>
        <div className="resume-contact-links">
          {[
            ["GitHub", resume.profile.github],
            ["Instagram", resume.profile.instagram],
            ["Velog", resume.profile.blog],
          ].map(([name, url]) => (
            <TextLink key={name} href={url} external>
              {name}
            </TextLink>
          ))}
        </div>
        <p className="muted">
          이력서의 프로젝트 이름을 누르면 설계 과정과 기여 근거를 확인할 수
          있습니다.
        </p>
      </section>
    </article>
  );
}
function ResumeHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="resume-section-heading">
      <span className="mono">{number} / RESUME</span>
      <h2>
        {title}
        <span className="accent">.</span>
      </h2>
      {description && <p>{description}</p>}
    </header>
  );
}
