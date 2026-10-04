# J2AN Portfolio Implementation Plan

> Native execution in this session. Implement task-by-task using executing-plans and verify the complete branch.

**Goal:** About Me 중심의 프론트엔드 개발자 포트폴리오와 근거에 기반한 프로젝트 상세를 완성한다.
**Architecture:** Next App Router 서버 컴포넌트 + 타입이 있는 로컬 콘텐츠. GSAP과 탐색 상태만 클라이언트로 분리한다.
**Tech Stack:** Next.js, TypeScript, Tailwind CSS, GSAP, pnpm, Playwright.
**Spec:** `docs/portfolio/design.md`, 승인 후 메인은 About Me, 메뉴는 About / Projects / Experience / Expertise / Contact로 변경.

## Global Constraints

- 실제 프로필 사진 및 프로젝트별 썸네일 필수.
- 회사 원천 코드·개인정보·인증 화면과 원본 PDF는 공개 자산에 포함하지 않는다.
- 확인된 참여 기간과 기여 범위를 유지하고 측정되지 않은 성과를 만들지 않는다.
- 서버 HTML에서 본문과 링크가 읽혀야 하며 reduced motion과 320px 화면을 지원한다.
- 개인 저장소만 수정. 원격 쓰기는 저장소 소유자 `j2an777` 인증으로 수행한다.

## Review Focus

1. JS 비활성: 소개·상세·연락·섹션 이동이 작동한다.
2. 320px 및 긴 프로젝트명: 가로 넘침 없이 탐색할 수 있다.
3. Reduced motion: 모션 때문에 콘텐츠가 숨거나 지연되지 않는다.
4. 잘못된 slug: 올바른 404와 noindex가 나온다.
5. SITE_URL 없음: 임의 운영 도메인으로 canonical을 만들지 않고 검토 상태를 유지한다.

## Task 1 — 실행 기반과 콘텐츠

Files: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `src/content/portfolio.ts`, `src/lib/seo.ts`, `tests/content.test.ts`.

- [x] Next·Tailwind·TypeScript 구성, 기존 정적 사이트는 `legacy/`에 보존, 추적된 node_modules 제외.
- [x] JSON-LD script 탈출 방지와 origin 검증의 실패 테스트를 실행.
- [x] 안전 직렬화 및 origin 정책 구현, 전체 프로젝트의 slug·이미지·기여·근거 콘텐츠 정의.
- [x] 사진과 썸네일을 로컬 최적화 자산으로 옮기고 폰트 라이선스 동봉.
- [x] 유틸·콘텐츠 계약 테스트 통과.

## Task 2 — About Me 홈과 상세

Files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/components/`, `src/app/globals.css`.

- [x] 서버 렌더링 홈, 사진·소개, 4개 대표 사례, 경력·교육·기술·최근 개선·Contact.
- [x] 공통 SectionHeading·프로젝트 카드·태그·화살표·메타데이터, 토큰과 반응형 패턴.
- [x] 모든 프로젝트 상세의 문제·선택·결과·한계와 썸네일.
- [x] About Me·Projects·Experience·Expertise·Contact 라우트와 홈 앵커 및 키보드·모바일 지원.
- [x] Playwright로 링크, 상세, 404, 320px, JS off 확인.

## Task 3 — 모션·검색·공유

Files: `src/hooks/`, `src/components/motion-enhancer.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts`, OG routes.

- [x] GSAP matchMedia·ScrollTrigger의 idle 로딩과 cleanup, reduced motion 분기.
- [x] 모션이 없어도 내용이 보이는 reveal, 제한된 이미지 parallax, hover 전환.
- [x] 사이트 origin·index 설정, 페이지별 metadata·JSON-LD, sitemap·llms·OG.
- [x] 실제 이미지 크기·sizes·프로필 우선 로딩, 하단 lazy loading.
- [x] reduced motion·서버 HTML·SEO 계약 검사.

## Task 4 — 프로덕션 검증·문서

Files: `README.md`, `docs/portfolio/verification.md`, `docs/portfolio/design-system.md`.

- [x] 타입 검사·린트·테스트·프로덕션 빌드.
- [x] 프로덕션 서버에서 Playwright·axe 및 모바일 Lighthouse.
- [x] 결과와 한계, 실행·배포·콘텐츠 수정 방법 기록.
- [x] 최종 변경 검토 및 개인 저장소 커밋. `j2an777` 인증으로 리뉴얼 브랜치 push 완료.

## 완료 기록 · 2026-10-04

- 최종 구현: 5개 메뉴 페이지 + 11개 프로젝트 상세, 실제 사진 및 모든 사례 썸네일, 스크롤·라우트 GSAP 전환.
- 최신 MD 639줄과 HTML 본문·집계 정의 재검토. 문서의 집계 범위 차이는 공개 수치에 확대하지 않았다.
- 타입 검사·린트·단위 테스트 4건·프로덕션 빌드·E2E 13건 통과. 대표 3개 페이지 axe A/AA 자동 위반 0건.
- 모바일 Lighthouse 최종 98/100/100 (performance/accessibility/best practices), LCP 2.477초, CLS 0. 검토 noindex로 SEO 66.
- 최종 외부 리뷰: Critical 0, Important 1, Minor 3. 긴 이름 overflow, hover 선택자, 프로젝트 수 metadata, 사례 연결을 수정하고 검증했다.
- Ruling: 정적인 내용은 서버 사전 렌더링(SSG)으로 제공한다. 요청마다 불필요한 SSR을 강제하지 않는다.
- Ruling: SITE_URL이 확정되지 않아 noindex를 유지한다. 운영 환경의 origin/index 설정 후 재빌드가 필요하다.
- Ruling: 기존 PDF의 private 내용은 게시하지 않고 사례 설명과 안전한 소개 이미지만 반영한다.
- Ruling: 구현 시점에는 회사 계정의 개인 저장소 권한이 READ였으나 이후 사용자 요청으로 소유자 `j2an777`를 인증해 브랜치 push를 완료했다. `main` 병합과 운영 배포는 별도 단계다.
