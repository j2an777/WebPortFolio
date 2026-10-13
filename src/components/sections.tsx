import Image from "next/image";
import Link from "next/link";
import {
  experience,
  getProjectGroups,
  expertise,
  profile,
  projects,
  portfolioPdf,
  updates,
} from "@/content/portfolio";
import { withBasePath } from "@/lib/paths";
import { ProjectCard } from "./project-card";
import { Arrow, SectionHeading, Tags, TextLink } from "./ui";

export function AboutHero() {
  return (
    <section id="about" className="hero container">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="status-dot" />
          FRONTEND DEVELOPER · PRODUCT ENGINEER
        </p>
        <span className="mono hero-location">BASED IN KOREA</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="mono hero-label">A LITTLE ABOUT ME</p>
          <h1>
            Hello, I’m
            <br />
            <span className="hero-name">
              Seungjin<span className="accent">.</span>
            </span>
          </h1>
          <h2>
            사용자에게는 좋은 경험을,
            <br />
            팀에게는 좋은 구조를.
          </h2>
          <p className="hero-description">
            {profile.intro}
            <br />
            화면 너머의 데이터와 운영을 이해하고,
            <br className="desktop-break" /> 제품의 시작부터 다음 개선까지 함께
            만듭니다.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="pill-link">
              Explore my work
              <Arrow diagonal={false} />
            </a>
            <Link href="/contact" data-transition className="text-link">
              Let’s connect
              <Arrow />
            </Link>
          </div>
        </div>
        <figure className="portrait">
          <div className="portrait-image">
            <Image
              src="/images/profile.webp"
              alt="하승진 프로필 사진"
              width={960}
              height={1163}
              sizes="(max-width: 700px) 82vw, (max-width: 1000px) 36vw, 390px"
              preload
              fetchPriority="high"
              className="profile-image"
            />
          </div>
          <figcaption>
            <span>
              하승진 <span className="caption-muted">/ Seungjin Ha</span>
            </span>
            <span className="portrait-cross" aria-hidden="true">
              ✳
            </span>
          </figcaption>
          <span className="portrait-sticker" aria-hidden="true">
            MAKE IT
            <br />
            MEANINGFUL.
          </span>
        </figure>
      </div>
      <div className="hero-bottom">
        <p>
          THOUGHTFUL CODE.
          <br />
          <span>BETTER EXPERIENCES.</span>
        </p>
        <div className="hero-fields">
          <span>Product Engineering</span>
          <span>Design Systems</span>
          <span>Performance & Craft</span>
        </div>
        <a
          href="#projects"
          className="scroll-cue"
          aria-label="SCROLL TO DISCOVER · 대표 프로젝트로 이동"
        >
          <span className="mono">SCROLL TO DISCOVER</span>
          <Arrow diagonal={false} />
        </a>
      </div>
    </section>
  );
}

export function SelectedProjects({ all = false }: { all?: boolean }) {
  return (
    <section id="projects" className="section container">
      <SectionHeading
        number="01"
        eyebrow="SELECTED WORK"
        title={all ? "Projects." : "Built with purpose."}
        description="어떤 문제였고, 왜 그렇게 만들었는지. 실제 제품에서의 선택과 기여를 담았습니다."
      />
      <a
        className="portfolio-download text-link"
        href={withBasePath(portfolioPdf)}
        download="하승진_프론트엔드_포트폴리오.pdf"
      >
        포트폴리오 PDF 다운로드 <Arrow diagonal={false} />
      </a>
      {all ? getProjectGroups().map((group) => (
        <section className="project-group" id={group.id} key={group.id} aria-labelledby={`group-${group.id}`}>
          <header className="project-group-heading" data-reveal>
            <p className="eyebrow">{group.label} / {group.projects.length} CASES</p>
            <h2 id={`group-${group.id}`}>{group.name}<span className="accent">.</span></h2>
            <p className="muted">{group.description}</p>
          </header>
          <div className="project-grid">
            {group.projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      )) : (
        <div className="project-grid">
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      )}
      {!all && (
        <div className="section-end">
          <p className="muted">
            학습앱부터 검색 최적화, 팀이 함께 쓰는 시스템까지.
          </p>
          <TextLink href="/projects">
            View all {projects.length} cases
          </TextLink>
        </div>
      )}
    </section>
  );
}

export function ExpertiseSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section
      id="expertise"
      className={`expertise-section ${standalone ? "standalone" : ""}`}
    >
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="HOW I WORK"
          title="Beyond the interface."
          description="좋은 화면은 좋은 구조에서 시작된다고 믿습니다."
        />
        <div className="expertise-list">
          {expertise.map((item) => (
            <article key={item.number} className="expertise-row" data-reveal>
              <span className="mono expertise-number">{item.number}</span>
              <div className="expertise-name">{item.name}</div>
              <div className="expertise-detail">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Tags items={item.tags} />
              </div>
              <Arrow />
            </article>
          ))}
        </div>
        <div className="principles" data-reveal>
          <p className="mono">MY APPROACH</p>
          <p>
            먼저 문제를 이해하고,
            <br />
            <span>필요한 만큼 만들고,</span>
            <br />
            끝까지 검증합니다.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section container">
      <SectionHeading
        number="03"
        eyebrow="EXPERIENCE"
        title="A growing perspective."
        description="초기 제품의 기반부터 글로벌 서비스, 교육 플랫폼의 운영 개선까지."
      />
      <div className="experience-list">
        {experience.map((item) => (
          <article key={item.name} className="experience-row" data-reveal>
            <div className="experience-time">
              <span>{item.period}</span>
              <span className="mono">{item.label}</span>
            </div>
            <div className="experience-body">
              <h3>{item.name}</h3>
              <p className="experience-role">{item.role}</p>
              <p>{item.description}</p>
            </div>
            <TextLink href={`/work/${item.slug}`}>Case study</TextLink>
          </article>
        ))}
      </div>
      <p className="source-note">
        프로젝트 참여·활동 기간을 기준으로 작성했습니다. 클라이언트 프로젝트는
        해당 기업의 직접 고용 경력과 구분합니다.
      </p>
      <div className="education-grid">
        <div data-reveal>
          <p className="mono">EDUCATION</p>
          <h3>한림대학교</h3>
          <p>컴퓨터공학 학사 · 콘텐츠 IT 복수전공</p>
          <span className="muted">2018.03 — 2024.02</span>
        </div>
        <div data-reveal>
          <p className="mono">CONTINUOUS LEARNING</p>
          <h3>배움은 제품으로 이어집니다.</h3>
          <p>
            구름 × 인프런 풀스택 과정 · 메타버스 아카데미 2기
            <br />
            교내 UX 나노 디그리 · 기술 블로그 기록
          </p>
          <TextLink href={profile.blog} external>
            Read my notes
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export function RecentWork() {
  return (
    <section className="recent-section container">
      <SectionHeading
        number="04"
        eyebrow="RECENT IMPROVEMENTS"
        title="Still making it better."
        description="작은 불편을 발견하고, 공통 구조에서 해결합니다."
      />
      <div className="recent-grid">
        {updates.map((item) => (
          <article key={item.title} data-reveal>
            <span className="mono">{item.date} / ENGINEERING NOTE</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <TextLink href={`/work/${item.project}`}>Related case</TextLink>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactSection({ full = false }: { full?: boolean }) {
  return (
    <section
      id="contact"
      className={`contact-section ${full ? "contact-full" : ""}`}
    >
      <div className="container">
        <div className="contact-top">
          <p className="mono">05 / LET’S CONNECT</p>
          <span className="contact-asterisk" aria-hidden="true">
            ✳
          </span>
        </div>
        <h2 data-reveal>
          Good things
          <br />
          start with a <span>hello.</span>
        </h2>
        <div className="contact-bottom">
          <div>
            <p>함께 만들 제품과 풀어갈 문제를 이야기해요.</p>
            <a href={`mailto:${profile.email}`} className="contact-email">
              {profile.email}
              <Arrow />
            </a>
          </div>
          <div className="social-links">
            <TextLink href={profile.github} external>
              GitHub
            </TextLink>
            <TextLink href={profile.blog} external>
              Velog
            </TextLink>
            <TextLink href={profile.instagram} external>
              Instagram
            </TextLink>
            <TextLink href={profile.notion} external>
              Notion
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer container">
      <Link href="/" className="wordmark" data-transition>
        J2AN<span className="wordmark-dot">.</span>
      </Link>
      <p>© {new Date().getFullYear()} Seungjin Ha</p>
      <span className="mono">DESIGNED & BUILT WITH INTENTION</span>
      <a href="#top" aria-label="Back to top · 페이지 맨 위로">
        Back to top <Arrow />
      </a>
    </footer>
  );
}

export function ImpactSection() {
  return (
    <section
      className="impact-section container"
      aria-label="Purple Academy 기여 요약"
    >
      <div className="impact-top">
        <p className="mono">AT PURPLE · 2026.01 — 2026.10</p>
        <p>
          제품을 만들고, 운영을 개선하고,
          <br />
          팀이 이어갈 기준을 남깁니다.
        </p>
      </div>
      <div className="impact-grid">
        <article data-reveal>
          <strong>
            50<span>개</span>
          </strong>
          <h2>중복 화면을 공통 구조로</h2>
          <p>
            동일 구현 50개 통합
            <br />
            의도된 차이 9개는 보존
          </p>
        </article>
        <article data-reveal>
          <strong>
            ~50<span>%</span>
          </strong>
          <h2>대시보드 DB 왕복 감소</h2>
          <p>
            20–21회 → 10–11회
            <br />
            캐시 없이 실시간 기준 유지
          </p>
        </article>
        <article data-reveal>
          <strong>
            56<span>편</span>
          </strong>
          <h2>새로 남긴 도메인 문서</h2>
          <p>
            팀의 145편 중 신규 작성분
            <br />
            코드와 함께 리뷰하는 규칙
          </p>
        </article>
      </div>
      <p className="source-note">
        2026.10.03까지의 개발 기록 기준 · PR #9226 / #8437 및 도메인 문서 집계
      </p>
    </section>
  );
}
