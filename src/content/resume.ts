import { profile, getProject, expertise } from "./portfolio";

export const resume = {
  updatedAt: "2026-10-21",
  profile,
  headline: "제품의 시작부터, 다음 개선까지.",
  introduction:
    "교육 플랫폼과 글로벌 파트너 서비스에서 인증·결제의 실패 복구, 데이터 조회와 캐시, 웹·앱 연계를 개선했습니다. 운영자가 직접 관리할 수 있는 도구와 팀이 재사용할 기준을 만들고, 정보 노출 경로도 함께 점검합니다.",
  summary: expertise,
  portrait: "/images/resume-profile.webp",
  careers: [
    {
      name: "Purple Academy",
      period: "2026.01 - 현재",
      kind: "개발 활동 기록",
      role: "Frontend Developer · 교육 플랫폼",
      description:
        "브랜드·관리자·학습앱과 API를 연결하며 인증·결제 복구, 조회 비용, 운영 도구와 정보 노출 경로를 개선했습니다.",
      points: [
        "대시보드: DB 왕복 20~21회 → 10~11회(47.6~50% 감소), 매출 조회 9회 → 2회. 실시간 집계 유지 · 코드 경로 비교",
        "공통화: 학생 상세 동일 구현 50개·10,401줄을 공통 모듈로 통합, 수정 지점 2곳 → 1곳. 정책 차이 9개는 어댑터로 보존",
        "CS 업무: 답변 10,953건 분석으로 템플릿 28종 설계, 3개 업무 화면에 변수 자동 치환·미입력 경고 연결. 운영자가 배포 없이 문구 관리",
        "요청 비용: 세션 요청 공유·부모 데이터 전달로 마이페이지 4개 화면의 인증 조회 3회 → 1회(66.7% 감소) · 로컬 모의 API, 각 3회 확인",
        "콘텐츠 갱신: 목록 60초·상세 5분·sitemap 1시간의 캐시 대기를 다음 요청 갱신으로 전환. 저장 시 태그 무효화 · ISR 캐시 유지",
      ],
      slugs: ["purple-academy", "reading-lab", "operations-platform", "purple-english", "android-webview"],
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
        "브랜드 웹: 3개 결제 수단과 신청·자녀 등록 연결, 0원·만료 주문·재시도 보강. 학습앱: ReadingLab 독해·어휘 퀴즈와 관리자 제작·검수 연결",
        "Admin: 중복 집계 통합·Promise 공유로 DB 왕복 20~21회 → 10~11회(코드 경로 비교). 학생 상세 동일 구현 50개 공통화·정책 차이 9개 보존",
        "Admin: CS 답변 10,953건에서 템플릿 28종 설계·3개 화면 연동. PurpleEnglish: 브랜드·학습앱 이관, 자녀별 조회 분리·인증 조회 3회 → 1회(로컬 검증)",
        "PurpleAcademyApp: Android MediaStore 공용 폴더 저장, 웹뷰 종료 후 복구·재시도와 반응형 스플래시 개선. 웹·앱 사이 학습 흐름 연결",
      ],
    },
    {
      slug: "hanwha-vision",
      points: [
        "토큰 저장 전 페이지 검증이 실행되는 인증 경합 추적. Mutex·쿠키 저장 Promise로 순서를 제어하고 페이지 진입과 API 검증 경로 분리",
        "React Hook Form·Zod 기반 공통 입력 계층과 한글·다국어 폰트를 포함한 약관·파트너 확인서·동의서 PDF 발급 구현",
        "Google Authenticator OTP 로그인 구현. next-intl·시트 기반 번역을 언어별 JSON과 locale 경로로 연결하는 언어팩 설계 보조",
        "오래 열린 탭의 배포 버전 불일치 대응. 포커스 복귀 시 서버 버전을 캐시 없이 확인하고 BroadcastChannel로 여러 탭의 상태 전환 연결",
      ],
    },
    {
      slug: "co-play",
      points: [
        "FE 1명으로 웹 아키텍처·기능 개발 주도. Turborepo·pnpm으로 UI·타입·API·유틸을 공유하고 공통 컴포넌트·Storybook·개발 규칙 구축",
        "OpenAPI에서 요청·응답 타입을 자동 생성해 공통 패키지로 제공. API·인증 오류를 상태 코드·메시지 계약에 따라 사용자 안내로 연결",
        "서버 prefetchQuery·HydrationBoundary로 초기 데이터를 클라이언트 캐시에 전달. 이미지 로딩 전에는 BlurHash로 시각적 공백 보완",
        "채팅 개발 보조: TanStack Virtual로 누적 DOM 노드를 제한하고 상단 Skeleton에서 이전 기록 조회. scrollToIndex로 읽던 위치 유지",
      ],
    },
    {
      slug: "dart",
      points: [
        "다량의 작품 이미지 업로드에 browser-image-compression 적용. 전시 생성 요청 평균 10초 → 6초 · 당시 프로젝트 문서 기준",
        "압축 시작·Axios onUploadProgress·SSE를 연결해 전송과 서버 처리 단계를 진행 모달로 표시. 요청 직후부터 처리 상태 안내",
        "동시 401 응답의 반복 재발급 문제를 팀 코드 리뷰에서 논의. 첫 재발급 완료까지 후속 요청을 큐에 보관하고 새 토큰으로 재개",
        "회전·그리드·슬라이드·스크롤 전시와 react-three-fiber 기반 3D 갤러리 구현. 작품 선택·카메라 이동·상세 모달 경로와 반응형 화면 연결",
      ],
    },
  ].map(({ slug, points }) => ({
    ...getProject(slug)!,
    ...(slug === "purple-academy" ? {
      name: "Purple Academy",
      role: "브랜드 웹·학습앱·Admin·PurpleEnglish·PurpleAcademyApp 개발",
    } : {}),
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
