import { profile, getProject } from "./portfolio";

export const resume = {
  updatedAt: "2026-10-05",
  profile,
  headline: "제품의 시작부터, 다음 개선까지.",
  introduction:
    "사용자에게는 좋은 경험을, 팀에게는 좋은 구조를. 교육 플랫폼과 글로벌 파트너 서비스에서 기능 구축, 운영 안정성, 공통 UI와 협업 기반을 함께 개선했습니다.",
  strengths: [
    {
      value: "50",
      unit: "개",
      title: "중복 구현을 공통 구조로",
      detail: "학생 상세 동일 구현 통합 · 의도된 차이 9개 보존",
      slug: "shared-systems",
    },
    {
      value: "~50",
      unit: "%",
      title: "대시보드 DB 왕복 감소",
      detail: "20–21회 → 10–11회 · 응답 시간 개선율과 구분",
      slug: "operations-platform",
    },
    {
      value: "56",
      unit: "편",
      title: "새로 남긴 도메인 문서",
      detail: "팀 문서 145편 중 신규 작성 · 2026.10.03 기록",
      slug: "shared-systems",
    },
  ],
  careers: [
    {
      name: "Purple Academy",
      period: "2026.01 - 현재",
      kind: "개발 활동 기록",
      role: "Frontend Developer · 교육 플랫폼",
      description:
        "브랜드·관리자·학습앱을 연결하며 제품 구축과 운영 품질 개선에 기여했습니다.",
      points: [
        "입학 신청과 전형료 결제 3개 수단 연결, 신청 중 자녀 추가 동선 개선",
        "서버 렌더링·검색 구조·접근성 정비, 메인 코드 분할과 요청 지연",
        "공유 UI·디자인 토큰·Storybook, 운영 대시보드와 도메인 문서 개선",
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
        "Co-Play: 모노레포·공통 컴포넌트·문서화와 웹 아키텍처 구축, 채팅 보조 개발",
        "HanwhaVision STEP: 인증·세션 문제 해결, 다국어 설계 보조, PDF·폼 기능 개발",
      ],
      slugs: ["hanwha-vision", "co-play"],
    },
  ],
  projects: [
    {
      slug: "purple-academy",
      points: [
        "입학·전형료 결제 3개 수단과 마이페이지 연결",
        "검색엔진에 빠졌던 본문의 서버 렌더링 복구",
        "공통 UI 이관 시 24개 라우트 화면 대조·간격 회귀 2건 수정",
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
