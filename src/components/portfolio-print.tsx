/* eslint-disable @next/next/no-img-element -- This document is rendered directly by the PDF browser. */
import { expertise, profile, projects } from "../content/portfolio";
import { resume } from "../content/resume";

export function PortfolioPrint({ siteUrl, assetRoot }: { siteUrl: string; assetRoot: string }) {
  const image = (src: string) => `${assetRoot}${src.replace(/\.(webp|svg)$/, ".jpg")}`;
  return (
    <>
      <section className="portfolio-cover">
        <p className="eyebrow">J2AN / FRONTEND DEVELOPER</p>
        <div className="cover-identity">
          <div>
            <h1>하승진<span>.</span></h1>
            <p className="english-name">Seungjin Ha</p>
            <h2>제품의 시작부터,<br />다음 개선까지.</h2>
          </div>
          <img src={image(resume.portrait)} alt="하승진 프로필 사진" />
        </div>
        <p className="cover-intro">{profile.description}</p>
        <div className="cover-focus">
          {expertise.map((item) => (
            <div key={item.name}>
              <p className="eyebrow">{item.number} / {item.name}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <div className="cover-links">
          <a href={siteUrl}>온라인 포트폴리오 ↗</a>
          <a href={`${siteUrl}/resume/`}>웹 이력서 ↗</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <p className="note">이 문서는 배포 시점의 사이트 콘텐츠로 자동 생성됩니다. 프로젝트별 참여 역할과 당시 기록의 검증 범위를 구분했습니다.</p>
      </section>
      <section className="portfolio-index">
        <p className="eyebrow">CONTENTS / {projects.length} CASE STUDIES</p>
        <h2 className="chapter-title">Selected Work<span>.</span></h2>
        <p className="intro">프로젝트 이름을 누르면 웹에서 상세 내용과 관련 링크를 확인할 수 있습니다.</p>
        {projects.map((project, index) => (
          <a className="index-row" href={`${siteUrl}/work/${project.slug}/`} key={project.slug}>
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{project.name} ↗</h3><p>{project.summary}</p></div>
            <span className="index-year">{project.year}</span>
          </a>
        ))}
      </section>
      {projects.map((project, index) => (
        <article className="portfolio-case" key={project.slug}>
          <header className="case-header">
            <p className="eyebrow">CASE {String(index + 1).padStart(2, "0")} / {project.category}</p>
            <h2 className="chapter-title">{project.name}<span>.</span></h2>
            <p className="case-headline">{project.headline}</p>
            <div className="case-overview">
              <img src={image(project.image)} alt={project.imageAlt} />
              <dl>
                <div><dt>기간</dt><dd>{project.period}</dd></div>
                <div><dt>참여 역할</dt><dd>{project.role}</dd></div>
                <div><dt>팀 구성</dt><dd>{project.team}</dd></div>
                <div><dt>기술</dt><dd>{project.stack.join(" · ")}</dd></div>
              </dl>
            </div>
            {project.illustration && <p className="note">실제 운영 화면 대신 구조를 설명하는 이미지입니다.</p>}
            <p className="intro">{project.summary}</p>
            <ul className="case-highlights">{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </header>
          {project.sections.map((section) => (
            <section className="case-section" key={section.label}>
              <div className="case-section-heading"><p className="eyebrow">{section.label}</p><h3>{section.title}</h3></div>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
            </section>
          ))}
          <aside className="case-evidence">
            <h3>사례와 근거</h3>
            <a href={`${siteUrl}/work/${project.slug}/`}>프로젝트 상세 페이지 ↗</a>
            <ul>{project.evidence.map((item, i) => (
              <li key={i}>
                {item.url ? <a href={item.url}>{item.label} ↗</a> : item.label}
                {item.private && <span className="note"> · 접근 권한 필요</span>}
              </li>
            ))}</ul>
          </aside>
        </article>
      ))}
      <section className="portfolio-contact">
        <p className="eyebrow">LET’S BUILD THE NEXT PRODUCT</p>
        <h2 className="chapter-title">다음 제품을,<br />함께 만들어갑니다<span>.</span></h2>
        <p>{profile.intro}</p>
        <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} ↗</a>
        <div className="contact-links">
          <a href={siteUrl}>Portfolio / J2AN ↗</a>
          <a href={`${siteUrl}/resume/`}>Resume ↗</a>
          <a href={profile.github}>GitHub / j2an777 ↗</a>
          <a href={profile.blog}>Velog / @j2an ↗</a>
          <a href={profile.instagram}>Instagram / hs_j2an ↗</a>
        </div>
      </section>
    </>
  );
}
