import { profile, getProject } from "./portfolio";

export const resume = {
  updatedAt: "2026-10-12",
  profile,
  headline: "제품의 시작부터, 다음 개선까지.",
  introduction:
    "사용자에게는 좋은 경험을, 팀에게는 좋은 구조를. 교육 플랫폼과 글로벌 파트너 서비스에서 기능 구축, 운영 안정성, 공통 UI와 협업 기반을 함께 개선했습니다.",
  portrait: "/images/resume-profile.webp",
  careers: [
    {
      name: "Purple Academy",
      period: "2026.01 - 현재",
      kind: "개발 활동 기록",
      role: "Frontend Developer · 교육 플랫폼",
      description:
        "브랜드·관리자·학습앱과 API를 연결하고, 조회 비용·중복 코드·회귀 검증을 개선했습니다.",
      points: [
        "대시보드: 집계·조인 통합으로 DB 왕복 20~21회 → 10~11회(47.6~50% 감소), 매출 카드 9회 → 2회. 실시간 기준 유지 · 코드 경로 비교",
        "공통화: 학생 상세 동일 구현 50개·10,401줄을 공통 모듈로 통합, 수정 지점 2곳 → 1곳. 정책 차이 9개는 어댑터로 보존",
        "요청 비용: 세션 요청 공유·부모 데이터 전달로 마이페이지 4개 화면의 인증 조회 3회 → 1회(66.7% 감소) · 로컬 모의 API, 각 3회 확인",
        "검색·접근성: 커리큘럼·FAQ·상세 SSR과 JSON-LD·sitemap 정비. 이미지 alt 누락 33건 → 0건 · 당시 공개 페이지 점검",
        "회귀 검증: 인증 목·누락 요청·검증 조건을 수정해 입학·설명회 E2E 22건 중 21건 실패 → 전체 통과 · 로컬 모의 API, 3회 연속 확인",
      ],
      slugs: ["purple-academy", "shared-systems", "operations-platform"],
    },
    {
      name: "(주) 인베스티",
      period: "2024.09 - 2025.09",
      kind: "재직 경력",
      role: "프론트엔드 팀 · 사원",
      description:
        "Co-Play 플랫폼의 웹 클라이언트 개발을 주도하고, 고객사 한화비전 STEP 프로젝트에 참여했습니다.",
      points: [
        "Co-Play — FE 1명으로 웹 아키텍처·기능 개발 주도. Turborepo·pnpm으로 UI·타입·API·유틸 공유 구조와 Storybook·개발 규칙 구축",
        "Co-Play — OpenAPI 기반 요청·응답 타입 자동 생성과 공통 오류 안내 연결. API 계약을 화면마다 중복 정의하지 않도록 정리",
        "Co-Play — 채팅 개발 보조: TanStack Virtual로 이전 기록 조회 시 렌더링 노드 제한. BlurHash로 이미지 로딩 중 시각적 공백 개선",
        "HanwhaVision STEP — 토큰 재발급과 페이지 검증의 경합 추적. Mutex·쿠키 저장 Promise로 요청 순서를 제어하고 페이지 진입 검증과 API 경로 분리",
        "HanwhaVision STEP — React Hook Form·Zod 공통 입력 계층과 한글·다국어 폰트 기반 약관·파트너 확인서·동의서 PDF 구현",
        "HanwhaVision STEP — next-intl·언어팩 설계 보조. 배포 버전 확인과 BroadcastChannel로 오래 열린 탭·여러 탭의 상태 전환 처리",
      ],
      slugs: ["hanwha-vision", "co-play"],
    },
  ],
  projects: [
    {
      slug: "purple-academy",
      points: [
        "대시보드 DB 왕복 47.6~50% 감소 · 코드 경로 비교",
        "학생 상세 동일 구현 50개·10,401줄 공통화",
        "입학·설명회 E2E 22건 전체 통과로 복구 · 로컬 검증",
      ],
    },
    {
      slug: "hanwha-vision",
      points: [
        "재발급 요청 동기화와 페이지 진입 검증을 분리해 인증 흐름 개선",
        "next-intl·시트 기반 언어팩 설계 보조",
        "정형 PDF 발급과 React Hook Form·Zod 공통 입력 계층 개발",
      ],
    },
    {
      slug: "co-play",
      points: [
        "프론트엔드 아키텍처·Turbo 모노레포·디자인 시스템 구축 주도",
        "OpenAPI 타입 생성과 공통 오류 처리·사용자 안내 연결",
        "이미지 BlurHash와 역방향 채팅 가상화 적용·채팅 보조 개발",
      ],
    },
    {
      slug: "dart",
      points: [
        "전시 이미지 업로드 10초 → 6초 · 당시 문서 기준",
        "이미지 압축·업로드·서버 처리 진행 상태를 연결",
        "토큰 재발급 요청 큐와 3D 전시 템플릿 개발",
      ],
    },
  ].map(({ slug, points }) => ({
    ...getProject(slug)!,
    period: (
      {
        "purple-academy": "2026.01 - 현재",
        "hanwha-vision": "2025.03 - 2025.09",
        "co-play": "2024.09 - 2025.02",
        dart: "2024.05 - 2024.08",
      } as Record<string, string>
    )[slug],
    points,
  })),
  skills: [
    {
      title: "Frontend",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "React Query",
        "React Hook Form",
        "Zod",
      ],
    },
    {
      title: "UI & Motion",
      items: [
        "MUI",
        "Tailwind CSS",
        "Emotion",
        "GSAP",
        "Storybook",
        "Design Tokens",
      ],
    },
    {
      title: "Architecture & Quality",
      items: [
        "Turborepo",
        "OpenAPI",
        "SSR / SSG",
        "SEO / AEO",
        "Accessibility",
        "Git",
      ],
    },
  ],
  education: {
    name: "한림대학교",
    period: "2018.03 - 2024.02",
    degree: "컴퓨터공학 주전공 · 콘텐츠 IT 복수전공",
    detail: "학사 졸업 · 3.85 / 4.5",
  },
  learning: [
    {
      name: "[구름 × 인프런] 개발자 성장과정 6회차",
      period: "2024.01 - 2024.07",
      detail: "수료",
    },
    {
      name: "메타버스 아카데미 2기",
      period: "2023.09 - 2023.12",
      detail: "수료",
    },
    {
      name: "교내 UX 나노디그리 교육과정",
      period: "2022.09 - 2023.12",
      detail: "수료",
    },
  ],
  certifications: [
    { name: "정보처리기사", date: "2025.12" },
    { name: "SQL 개발자 (SQLD)", date: "2025.12" },
  ],
  awards: [
    {
      date: "2024.07",
      name: "[구름] 풀스택 개발자 성장과정 프로젝트",
      result: "우수상",
    },
    {
      date: "2023.11",
      name: "통일 디자인 AI 제작 포스터 경진대회",
      result: "장려상",
    },
    {
      date: "2023.06",
      name: "SW 중심대학 공동 해커톤 2023",
      result: "최우수상",
    },
    { date: "2023.06", name: "교내 SW 캡스톤 디자인 경진대회", result: "대상" },
    {
      date: "2022.12",
      name: "디지털 인문예술 전공 기말 프로젝트 전시회",
      result: "대상",
    },
  ],
};

export const resumePdf = "/resume/seungjin-ha-resume.pdf";
