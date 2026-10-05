/* eslint-disable @next/next/no-img-element -- Native images are required in the standalone PDF document. */
import { resume } from "../content/resume";

export function ResumePrint({
  siteUrl,
  assetRoot,
}: {
  siteUrl: string;
  assetRoot: string;
}) {
  const link = (slug: string) => `${siteUrl}/work/${slug}/`;
  const footer = (page: number) => (
    <footer className="print-footer">
      <span>J2AN / SEUNGJIN HA · FRONTEND DEVELOPER</span>
      <a href={`${siteUrl}/resume/`}>WEB RESUME ↗</a>
      <span>0{page} / 03</span>
    </footer>
  );
  const heading = (number: string, title: string) => (
    <h2 className="print-heading">
      <span>{number}</span>
      {title}
      <i>.</i>
    </h2>
  );
  return (
    <>
      <section className="print-page">
        <header className="print-identity">
          <div>
            <p className="print-eyebrow">THE RESUME / FRONTEND DEVELOPER</p>
            <h1>
              하승진<i>.</i>
            </h1>
            <p className="print-name">Seungjin Ha / J2AN</p>
          </div>
          <img
            className="print-profile"
            src={`${assetRoot}${resume.portrait.replace(/\.webp$/, ".jpg")}`}
            alt="하승진"
          />
        </header>
        <h2 className="print-headline">{resume.headline}</h2>
        <p className="print-intro">{resume.introduction}</p>
        <div className="print-links">
          <a href={`mailto:${resume.profile.email}`}>{resume.profile.email}</a>
          <a href={resume.profile.github}>GitHub ↗</a>
          <a href={resume.profile.blog}>Velog ↗</a>
          <span>UPDATED {resume.updatedAt}</span>
        </div>
        {heading("01", "Experience")}
        {resume.careers.map((item) => (
          <div className="print-career" key={item.name}>
            <div className="print-row">
              <h3>{item.name}</h3>
              <span>{item.period}</span>
            </div>
            <p className="print-role">
              {item.role} · {item.kind}
            </p>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
        {heading("02", "Skills")}
        <div className="print-skills">
          {resume.skills.map((group) => (
            <div key={group.title}>
              <b>{group.title}</b>
              <p>{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
        {footer(1)}
      </section>
      <section className="print-page">
        <p className="print-eyebrow">PROBLEMS, DECISIONS & CONTRIBUTIONS</p>
        {heading("03", "Selected Projects")}
        <p className="print-intro">
          핵심 기여를 요약했습니다. 프로젝트 이름을 누르면 상세 사례와 근거로
          이동합니다.
        </p>
        {resume.projects.map((item) => (
          <div key={item.slug} className="print-project">
            <img
              src={`${assetRoot}${item.image.replace(/\.(webp|svg)$/, ".jpg")}`}
              alt={item.imageAlt}
            />
            <div>
              <p className="print-eyebrow">{item.category}</p>
              <h3>
                <a href={link(item.slug)}>{item.name} ↗</a>
              </h3>
              <p className="print-role">
                {item.period} · {item.role}
              </p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="print-stack">
                {item.stack.slice(0, 5).join(" · ")}
              </p>
            </div>
          </div>
        ))}
        <p className="print-note">
          프로젝트 수치와 검증은 당시 기록의 조건에 한정됩니다. 고객사
          프로젝트와 직접 고용 경력을 구분했습니다.
        </p>
        {footer(2)}
      </section>
      <section className="print-page">
        <p className="print-eyebrow">A FOUNDATION FOR THE NEXT CHAPTER</p>
        {heading("04", "Education")}
        <div className="print-school">
          <div className="print-row">
            <h3>{resume.education.name}</h3>
            <span>{resume.education.period}</span>
          </div>
          <p>{resume.education.degree}</p>
          <p>{resume.education.detail}</p>
        </div>
        <h3 className="print-subheading">Learning</h3>
        {resume.learning.map((item) => (
          <div className="print-list-row" key={item.name}>
            <p>
              {item.name} · {item.detail}
            </p>
            <span>{item.period}</span>
          </div>
        ))}
        {heading("05", "Awards")}
        {resume.awards.map((item) => (
          <div className="print-list-row" key={item.name}>
            <p>
              <b className="print-award">{item.result}</b>
              {item.name}
            </p>
            <span>{item.date}</span>
          </div>
        ))}
        {heading("06", "Certifications")}
        {resume.certifications.map((item) => (
          <div className="print-list-row" key={item.name}>
            <p>{item.name}</p>
            <span>{item.date}</span>
          </div>
        ))}
        <div className="print-contact">
          {heading("07", "Contact")}
          <a className="print-email" href={`mailto:${resume.profile.email}`}>
            {resume.profile.email} ↗
          </a>
          <div className="print-contact-channels">
            <a href={resume.profile.github}>GitHub / j2an777 ↗</a>
            <a href={resume.profile.instagram}>Instagram / hs_j2an ↗</a>
            <a href={resume.profile.blog}>Velog / @j2an ↗</a>
            <a href={`${siteUrl}/`}>Portfolio / J2AN ↗</a>
          </div>
        </div>
        {footer(3)}
      </section>
    </>
  );
}
