# J2AN · 하승진 포트폴리오

About Me 중심의 개인 포트폴리오. Next.js App Router, TypeScript, Tailwind CSS, GSAP으로 구현했습니다. 실제 프로필 사진과 11개 프로젝트 사례를 포함합니다.

## 실행

```sh
pnpm install
pnpm dev
```

개발 주소: http://localhost:3100

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm start
pnpm test:e2e
```

E2E는 설치된 Chrome을 사용합니다. Chrome이 없는 환경은 `pnpm exec playwright install chromium` 후 `playwright.config.ts`의 `channel`을 제거해 실행할 수 있습니다.

## 배포

Next 서버를 지원하는 Vercel 또는 Node.js 호스팅에 배포합니다. 기존 GitHub Pages 정적 배포와 실행 방식이 다릅니다.

`.env.example`을 참고해 운영 환경에 실제 origin과 색인 설정을 지정하고 **다시 빌드**합니다.

```env
SITE_URL=https://실제-운영-도메인
SITE_INDEXABLE=true
```

`SITE_URL`은 경로·쿼리 없는 HTTP(S) origin입니다. HTTPS 운영 origin과 명시적 설정이 있을 때만 색인을 허용합니다. 기본 검토 환경은 noindex이고 사이트맵을 비웁니다. canonical, OG, JSON-LD, robots, sitemap은 이 설정을 공유합니다.

본문은 서버에서 미리 렌더링됩니다. 정적 콘텐츠는 SSG, 프로젝트 OG 이미지는 서버 응답을 사용합니다. GSAP은 클라이언트에서 지연 로딩하며 첫 화면을 숨기지 않습니다.

## 내용 수정

- 프로필·내비게이션·사례·경력: `src/content/portfolio.ts`
- 화면과 공통 UI: `src/app`, `src/components`
- 색·레이아웃·반응형: `src/app/globals.css`
- 스크롤 모션: `src/hooks/use-scroll-motion.ts`
- 페이지 전환: `src/components/route-transitions.tsx`
- 썸네일·사진: `public/images`

회사 PR 링크는 접근 권한이 필요합니다. 내부 화면 대신 사용하는 SVG는 구조 설명 이미지로 표시합니다. 원본 입사 PDF와 인증 캡처는 공개 자산에 포함하지 않았습니다. 이전 사이트는 `legacy/`에 보존했습니다.

[설계](docs/portfolio/design.md) · [콘텐츠 조사](docs/portfolio/research.md) · [디자인 시스템](docs/portfolio/design-system.md) · [검증 결과](docs/portfolio/verification.md)

## GitHub Pages

`main` 머지 후 GitHub Actions로 정적 배포합니다. 최초 Pages 설정, 원하는 도메인 연결, 로컬 빌드 방법은 [배포 안내](docs/portfolio/github-pages.md)를 참고하세요.
