export const profile = {
  name: "하승진",
  englishName: "Seungjin Ha",
  handle: "J2AN",
  role: "Frontend Developer",
  email: "ha99104@gmail.com",
  github: "https://github.com/j2an777",
  blog: "https://velog.io/@j2an/posts",
  instagram: "https://www.instagram.com/hs_j2an/",
  notion: "https://j2an.notion.site/J2AN-364a1d26afe648cd899b1415024fd78d",
  intro:
    "서비스 품질과 협업 문화를 함께 만드는 프론트엔드 개발자 하승진입니다.",
  description:
    "사용자에게는 좋은 경험을, 팀에게는 좋은 구조를. 교육 플랫폼, 글로벌 파트너 서비스, 개인 프로젝트에서 제품의 시작과 운영 개선을 함께 경험했습니다.",
};

export const navigation = [
  { label: "About Me", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Expertise", href: "/expertise" },
  { label: "Contact", href: "/contact" },
] as const;

export interface Evidence {
  label: string;
  url?: string;
  private?: boolean;
}
export interface CaseSection {
  label: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}
export interface Project {
  slug: string;
  name: string;
  category: string;
  group: "purple" | "investi" | "independent";
  year: string;
  period: string;
  summary: string;
  headline: string;
  role: string;
  team: string;
  image: string;
  imageAlt: string;
  illustration?: boolean;
  tone: "purple" | "orange" | "blue" | "green" | "cream";
  stack: string[];
  highlights: string[];
  sections: CaseSection[];
  evidence: Evidence[];
}

const pr = (number: number, label: string): Evidence => ({
  label,
  url: `https://github.com/PurpleAcademy-co-kr/purple-mono/pull/${number}`,
  private: true,
});

export const projects: Project[] = [
  {
    "slug": "purple-academy",
    group: "purple",
    "name": "Purple Academy",
    "category": "EDUCATION · PRODUCT ENGINEERING",
    "year": "2026",
    "period": "2026.01 — 현재",
    "summary": "입학·결제부터 검색·배포까지, 실제 운영을 견디는 브랜드 웹.",
    "headline": "신청과 결제를 완성하고, 검색과 운영의 빈틈까지 해결합니다.",
    "role": "브랜드 웹 주요 기능 구축 · SEO/AEO·성능·운영 안정성 개선",
    "team": "사내 제품 개발팀 협업",
    "image": "/images/purple-brand.webp",
    "imageAlt": "Purple Academy 브랜드 웹 메인 화면",
    "tone": "purple",
    "stack": [
      "Next.js",
      "TypeScript",
      "React Query",
      "MUI",
      "GSAP",
      "NestJS",
      "Storybook"
    ],
    "highlights": [
      "입학 신청과 전형료 결제 3개 수단 연결",
      "공개 페이지 alt 누락 33건 → 0건 · 당시 검증",
      "공통 UI 이관 시 공개 라우트 24개 화면 대조"
    ],
    "sections": [
      {
        "label": "01 / PRODUCT FLOW",
        "title": "신청에서 결제 결과까지, 하나의 사용자 흐름으로",
        "paragraphs": [
          "학부모가 가입하고 자녀를 등록한 뒤 입학을 신청하고 전형료를 결제하는 흐름을 구축했습니다. 일반결제·브랜드페이·무통장입금 3개 수단을 주문 생성, 결과 화면, 마이페이지와 연결했습니다. 사용자 화면과 API 연동이 같은 신청·주문 상태를 전제로 움직이도록 개발팀과 협업했습니다.",
          "입학 신청과 결제 구현은 99개 파일이 변경된 작업이었습니다. 이후에도 신청 도중 자녀를 추가하고 바로 선택할 수 있게 해, 자녀 등록 때문에 신청을 중단하고 다른 화면으로 이동해야 하는 동선을 개선했습니다."
        ],
        "points": [
          "회원가입·로그인·마이페이지와 입학 신청 연결",
          "전형료 결제 3개 수단과 이용내역·결과 화면 연동",
          "신청 중 자녀 추가 및 공통 진입 판단"
        ]
      },
      {
        "label": "02 / PAYMENT CONTRACT",
        "title": "결제의 복잡성은 명확한 경계와 타입으로 관리",
        "paragraphs": [
          "로그인 상태, 자녀 등록 여부, 모집 상태에 따라 달라지는 입학 진입 판단을 공통 로직으로 모았습니다. 같은 조건에 서로 다른 안내가 나오는 문제를 줄이고, 화면별로 업무 조건을 다시 구현하지 않도록 했습니다.",
          "브랜드 웹과 퍼플잉글리시에 복제된 자체 토스 SDK 로더를 공식 SDK로 교체했습니다. 기존 결제 동작을 유지하면서 두 앱의 중복 로더 98줄을 제거하고 위젯에 공식 타입을 적용했습니다. 이 과정에서 결제수단 타입 불일치 1건을 컴파일 단계에서 발견해 경계에서 명시적으로 처리했습니다."
        ]
      },
      {
        "label": "03 / SEARCH & ACCESSIBILITY",
        "title": "사람에게 보이던 본문을 검색엔진에도 보이게",
        "paragraphs": [
          "커리큘럼 레이아웃이 브라우저 마운트 전에는 로딩 화면만 반환해, 프리렌더 HTML에 본문이 빠지는 문제를 해결했습니다. 반응형 표시를 CSS로 분리하고, 과정 상세·FAQ·커뮤니티 상세에 서버 데이터 조회와 렌더링을 적용했습니다. FAQ는 접힌 답변도 본문에 남겨 구조화 데이터와 실제 콘텐츠가 일치하도록 했습니다.",
          "기관·사이트·개별 페이지를 연결하는 JSON-LD와 sitemap, 실제 수정 시각을 반영하는 메타데이터를 정비했습니다. 검색·인용 목적과 모델 학습 목적을 구분하는 크롤러 정책, llms.txt도 추가했습니다. 당시 공개 페이지 점검에서 이미지 대체 텍스트 누락 33건을 0건으로 정리했습니다."
        ],
        "points": [
          "커리큘럼·FAQ·커뮤니티 상세의 서버 렌더링 개선",
          "본문과 일치하는 구조화 데이터 및 수정일 정보",
          "검색 노출 기반과 이미지 접근성 개선"
        ]
      },
      {
        "label": "04 / LOADING STRATEGY",
        "title": "처음부터 모든 섹션의 데이터를 요청하지 않도록",
        "paragraphs": [
          "세로로 긴 메인 화면의 모든 섹션이 진입 즉시 API를 호출하던 구조를 바꿨습니다. 당시 하단 영역 9개를 dynamic import로 분리하고, 스크롤로 섹션에 가까워질 때 하위 컴포넌트를 마운트하도록 구성했습니다.",
          "코드 분할만으로 끝내지 않고 마운트 시점까지 제어해, 아직 보지 않은 영역의 API 요청도 뒤로 미뤘습니다. GSAP 기반 섹션 진입 효과와 데이터 로딩을 같은 흐름 안에서 다뤘습니다. 초기 번들 크기나 LCP의 전후 측정값은 남아 있지 않아 성능 개선 비율로 표현하지 않습니다."
        ]
      },
      {
        "label": "05 / DEPLOYMENT RESILIENCE",
        "title": "배포 전에 열어 둔 탭의 청크 오류까지 대응",
        "paragraphs": [
          "새 버전 배포 후 기존 탭이 이전 청크를 요청하면 화면 이동 중 오류가 발생할 수 있습니다. 브랜드 웹 루트에 배포 복구 처리를 추가해 이 문제에 대응했습니다.",
          "현재 코드는 스크립트·스타일 청크 로드 실패와 동적 import 오류를 감지해 새로고침으로 복구를 시도합니다. 세션 저장소에 재시도 시각을 기록하는 보호 장치를 두어 짧은 시간에 새로고침이 반복되지 않도록 했습니다. 장애나 고객 문의의 감소율은 별도 측정하지 않았습니다."
        ]
      },
      {
        "label": "06 / DESIGN SYSTEM",
        "title": "공통 UI 이관을 화면 비교로 검증",
        "paragraphs": [
          "브랜드 앱에 묶여 있던 순수 UI를 공유 패키지로 옮기고 색상·타이포그래피·반응형 토큰, Storybook과 연결했습니다. 폼 제어·API·상태 저장소에 의존하는 어댑터는 앱에 남기고, 표현 계층은 다른 앱에서도 사용할 수 있도록 경계를 나눴습니다.",
          "이관 전후 공개 라우트 24개를 같은 1440×900 조건에서 캡처해 대조했습니다. 입력 필드와 텍스트영역의 간격 회귀 2건을 발견해 수정했고, 외부 콘텐츠와 안티에일리어싱 등 남은 차이의 원인도 구분했습니다. 기존 import를 위한 호환 계층으로 대규모 이관의 영향을 관리했습니다."
        ]
      },
      {
        "label": "07 / WHAT I OWNED",
        "title": "구축 이후의 제품 품질까지 이어진 기여",
        "paragraphs": [
          "입학·결제라는 핵심 사용자 동선을 구현하는 데서 시작해, 검색엔진에 전달되는 HTML, 첫 화면의 요청 시점, 배포 후 기존 탭의 복구, 공통 UI의 재사용과 화면 회귀까지 기여 범위를 넓혔습니다.",
          "기술을 도입했다는 설명보다 어떤 문제가 있었고, 어느 경계를 바꿨으며, 무엇으로 검증했는지를 남겼습니다. 아래 회사 비공개 PR은 각 작업의 근거이며, 수치와 검증 조건은 해당 작업 당시의 기록에 한정됩니다."
        ]
      }
    ],
    "evidence": [
      pr(2471, "입학 신청·전형료 결제 3개 수단"),
      pr(3019, "입학 진입 판단 공통화"),
      pr(6192, "신청 중 자녀 추가"),
      pr(7816, "공식 결제 SDK·타입 경계"),
      pr(7255, "서버 렌더링·SEO/AEO·접근성"),
      pr(7295, "메인 코드 분할·요청 지연"),
      pr(7257, "배포 후 청크 오류 복구"),
      pr(7674, "공통 UI 이관·24개 화면 대조")
    ]
  },
  {
    slug: "hanwha-vision",
    group: "investi",
    name: "HanwhaVision STEP",
    category: "GLOBAL SERVICE · CLIENT PROJECT",
    year: "2025",
    period: "2025.03 — 2025.09",
    summary: "글로벌 파트너 서비스의 인증·다국어·문서 경험을 안정적으로.",
    headline: "운영 중 발생하는 문제를 끝까지 추적합니다.",
    role: "인베스티 소속 · 클라이언트/일부 관리자 화면 개발 · 1페이즈 후반 참여",
    team: "8명 · FE 2 / BE 2 / 디자인 3 / PM 1",
    image: "/images/hanwha-step.webp",
    imageAlt: "한화비전 STEP 글로벌 파트너 서비스 소개 화면",
    tone: "orange",
    stack: [
      "Next.js",
      "TypeScript",
      "next-intl",
      "React Hook Form",
      "Zod",
      "react-pdf",
    ],
    highlights: [
      "동시 요청과 토큰 재발급 이슈 안정화",
      "다국어 언어팩 설계 보조",
      "OTP 로그인·정형 PDF·공통 입력 컴포넌트 구현",
    ],
    sections: [
      {
        label: "01 / CONTEXT",
        title: "새 기능보다 운영의 경계가 중요했던 시점",
        paragraphs: [
          "한화비전 클라이언트 프로젝트의 1페이즈 후반에 참여해 기능 개발과 유지보수를 수행했습니다. 인증 관리, 다국어, 문서 다운로드, 입력 컴포넌트 등 서비스 여러 곳에 영향을 미치는 영역을 맡았습니다.",
          "한화비전에 직접 고용된 경력이 아니라 클라이언트 프로젝트 참여 경험입니다. 다국어 설계는 보조 역할로 참여했습니다.",
        ],
      },
      {
        label: "02 / AUTHENTICATION",
        title: "토큰 재발급과 페이지 검증의 실행 순서",
        paragraphs: [
          "미들웨어의 재발급과 layout 검증이 경합하면서 쿠키 저장 전에 인증이 실패하거나 재발급이 반복되는 문제가 발생했습니다. 오래 비활성화한 탭에서도 화면의 로그인 상태와 요청의 인증 상태가 어긋났습니다.",
          "API 요청 경로에 검증·재발급 처리를 모으고 Mutex로 실행 순서를 제어했습니다. 쿠키 저장 결과를 Promise로 반환해 이후 헤더 설정과 실패 시 이동을 결정했습니다. 페이지 진입 검증과 API 요청 경로는 각각의 상황에 맞게 분리했습니다.",
          "당시 설계는 안정화와 함께 요청 직렬화의 성능 비용도 남겼습니다. 이 한계를 숨기지 않고, 이후 인증 설계에서 클라이언트와 서버의 책임을 더 명확히 나누는 기준으로 삼았습니다.",
        ],
      },
      {
        label: "03 / REUSABLE INTERFACES",
        title: "입력과 문서를 일관된 구조로",
        paragraphs: [
          "공통 입력 UI를 Basic Input → Label Input → Form Controller 계층으로 나누었습니다. UI 표현과 폼 연동의 책임을 분리하고 React Hook Form·Zod로 유효성 검사 규칙을 선언하도록 정리했습니다.",
          "약관·파트너 등급 확인서·동의서는 문서가 정형화되고 한글·다국어 폰트를 포함해야 했습니다. 이미지 캡처 방식과 비교해 텍스트·폰트·반복 문서 구성을 제어할 수 있는 react-pdf/renderer를 선택했습니다.",
        ],
      },
      {
        label: "04 / DELIVERY",
        title: "배포 이후의 오래 열린 탭까지 고려",
        paragraphs: [
          "배포 버전을 서버에서 캐시 없이 확인하고, 이전 상태가 남은 브라우저를 새 버전으로 전환하는 흐름을 구현했습니다. 여러 탭에는 BroadcastChannel로 상태 변경을 알렸습니다.",
          "케이스별 검증 후 운영에 적용한 경험입니다. 처리 시간 감소나 장애 감소율은 별도 측정 자료가 없어 수치로 표현하지 않습니다.",
        ],
      },
      {
        "label": "05 / GLOBAL OPERATIONS",
        "title": "다국어와 OTP를 실제 운영 흐름에 연결",
        "paragraphs": [
          "Google Authenticator 기반 OTP 로그인 기능과 일부 관리자 화면을 개발했습니다. 인증은 로그인 화면 하나로 끝나지 않아, 토큰 만료·활성/비활성 탭·페이지 이동·API 호출 상황을 구분해 테스트 케이스를 정리했습니다.",
          "next-intl 언어팩 설계에는 보조 역할로 참여했습니다. Google Spreadsheet에서 관리하는 번역을 명령 실행으로 언어별 JSON에 반영하고 locale 경로와 연결하는 흐름을 다뤄, 번역 수정과 화면 개발이 같은 기준으로 진행되도록 도왔습니다."
        ]
      },
    ],
    evidence: [{ label: "2025 입사 포트폴리오 · 3–12페이지" }, { label: "2025 이력서 · 2페이지: OTP·다국어·관리자 화면·인증 검증" }],
  },
  {
    slug: "co-play",
    group: "investi",
    name: "Co-Play Platform",
    category: "PLATFORM · FRONTEND ARCHITECTURE",
    year: "2024–25",
    period: "2024.09 — 2025.02",
    summary: "FE 1명으로 시작한 제품에, 팀이 이어갈 수 있는 기반을.",
    headline: "혼자 만드는 것과, 함께 이어가는 것은 다릅니다.",
    role: "인베스티 소속 · 프론트엔드 아키텍처·기능 개발 주도 · 채팅 개발 보조",
    team: "4명 · 디자인 / FE / BE / PL 각 1명",
    image: "/images/co-play.svg",
    imageAlt: "UI·API·타입 패키지를 여러 앱에서 재사용하는 모노레포 구조 설명",
    illustration: true,
    tone: "blue",
    stack: [
      "Next.js",
      "Turborepo",
      "pnpm",
      "Storybook",
      "OpenAPI",
      "TanStack Virtual",
    ],
    highlights: [
      "모노레포·공통 컴포넌트·개발 규칙 구축",
      "OpenAPI 기반 타입 자동 생성",
      "역방향 채팅 가상화·이미지 로딩 UX",
    ],
    sections: [
      {
        label: "01 / CONTEXT",
        title: "FE 한 명이 맡은 제품의 초기 구조",
        paragraphs: [
          "사용자 간 크레딧 교환을 통한 공동 활동 플랫폼에서 웹 아키텍처와 기능 개발을 주도했습니다. 문서에서 비공개로 유지한 서비스명과 실제 운영 화면은 공개하지 않습니다.",
          "초기 팀이 구현 속도를 내면서도 이후 합류할 개발자가 같은 구조에서 작업할 수 있도록 공통 기반을 먼저 정리했습니다.",
        ],
      },
      {
        label: "02 / FOUNDATION",
        title: "앱이 늘어나도 같은 언어로 개발하기",
        paragraphs: [
          "Turborepo·pnpm 기반으로 공통 UI, 타입, API, 유틸을 상위 패키지에서 재사용하는 구조를 구축했습니다. Volta와 catalog로 실행 환경·의존성 버전의 일관성을 관리했습니다.",
          "네이밍·브랜치·오류 처리 규칙을 문서화하고, Figma 가이드를 공통 컴포넌트와 연결했습니다. JSDoc과 Storybook으로 이후 합류한 개발자도 사용법을 확인할 수 있게 했습니다.",
        ],
      },
      {
        label: "03 / CONTRACTS",
        title: "API와 클라이언트 사이의 계약을 자동으로",
        paragraphs: [
          "Swagger 문서에서 openapi-typescript로 요청·응답 타입을 생성해 공통 패키지로 제공했습니다. 타입을 화면마다 따로 작성하는 비용과 서버 계약과의 불일치 가능성을 줄이는 방향입니다.",
          "API·인증 오류는 상태 코드·메시지 계약으로 연결해 사용자에게 이해 가능한 안내를 제공했습니다.",
        ],
      },
      {
        label: "04 / EXPERIENCE",
        title: "많아지는 데이터와 기다리는 시간을 다루기",
        paragraphs: [
          "채팅 기록을 위로 더 불러오면서 DOM 노드가 계속 늘어나는 문제에 TanStack Virtual을 적용했습니다. 화면에 필요한 노드 수를 제한하고 상단의 로딩 아이템을 기준으로 이전 기록을 조회했습니다.",
          "느린 아이템 이미지에는 BlurHash를 검토·적용해 실제 이미지가 준비되기 전의 시각적 공백을 줄였습니다. 이 사례는 로딩 UX 개선이며 LCP나 FPS의 측정 성과는 아닙니다.",
        ],
      },
      {
        "label": "05 / SERVER RENDERING",
        "title": "초기 데이터와 클라이언트 캐시의 시작점을 맞추기",
        "paragraphs": [
          "초기 데이터가 필요한 화면에서 useQuery의 로딩 상태만 표시하던 흐름에 서버 prefetchQuery와 HydrationBoundary를 적용했습니다. 서버가 조회한 데이터를 클라이언트 캐시로 넘겨 첫 화면과 이후 요청이 같은 데이터를 기준으로 시작하도록 구성했습니다.",
          "역방향 채팅에서는 0번 아이템을 로딩 Skeleton으로 두고 실제 메시지를 뒤에 매핑했습니다. 이전 메시지 추가 시 scrollToIndex로 읽던 위치를 유지하는 방향으로 구현을 보조했습니다. 초기 렌더링과 누적 데이터 처리를 서로 다른 문제로 나누어 다뤘습니다."
        ]
      },
      {
        "label": "06 / PRODUCT OWNERSHIP",
        "title": "디자인 리소스가 부족할 때도 화면의 결정을 이어가기",
        "paragraphs": [
          "SNS 성격의 화면을 개발하는 과정에서 디자인 지원이 부족한 구간은 참고 서비스 조사와 Figma 와이어프레임으로 보완했습니다. 이해관계자에게 흐름을 공유하고 피드백을 반영한 뒤 UI 구현까지 이어갔습니다.",
          "API 오류는 code·status·message 형태로 정리하고 Axios와 인증 오류를 사용자 안내로 연결했습니다. 구조 설계, 화면 기획, 실패 상태 처리까지 FE 한 명이 맡은 책임을 문서와 재사용 컴포넌트로 남겼습니다."
        ]
      },
    ],
    evidence: [{ label: "2025 입사 포트폴리오 · 13–22페이지" }, { label: "2025 이력서 · 3페이지: 서버 prefetch·HydrationBoundary·역방향 가상화" }],
  },
  {
    slug: "dart",
    group: "independent",
    name: "D’art Gallery",
    category: "ART · TEAM PROJECT",
    year: "2024",
    period: "2024.05 — 2024.08",
    summary: "작품을 전시하는 즐거움과, 업로드를 기다리는 경험까지.",
    headline: "사용자가 기다리는 동안에도, 상태는 명확해야 합니다.",
    role: "전시 템플릿·생성 UX·반응형 화면·회원 기능",
    team: "7명 · FE 3 / BE 4",
    image: "/images/dart.webp",
    imageAlt: "Dart 온라인 작품 전시 서비스의 데스크톱·모바일 목업",
    tone: "cream",
    stack: ["React", "TypeScript", "Emotion", "React Query", "Zustand", "MSW"],
    highlights: [
      "문서 기록 기준 업로드 10초 → 6초",
      "압축·업로드·서버 처리의 진행 상태 표시",
      "3D 전시 템플릿·PR 기반 팀 협업",
    ],
    sections: [
      {
        label: "01 / CONTEXT",
        title: "누구나 자신의 작품을 전시하는 웹앱",
        paragraphs: [
          "전시 템플릿, 전시 생성, 반응형 소개·연락·404 화면, 회원정보·공유·리뷰 기능을 개발했습니다. 다량의 이미지를 올리는 전시 생성 과정에서 사용자가 요청 상태를 알기 어려운 문제가 있었습니다.",
        ],
      },
      {
        label: "02 / UPLOAD",
        title: "빠르게 만들고, 남은 기다림을 설명하기",
        paragraphs: [
          "browser-image-compression으로 이미지 요청 크기를 줄였습니다. 당시 Notion에 기록한 요청 시간은 평균 10초에서 6초로 줄었으며, 이는 그 프로젝트 환경의 기록이고 현재 다시 측정한 결과는 아닙니다.",
          "압축 시작, Axios onUploadProgress, 서버의 SSE 이벤트를 연결해 압축·전송·서버 처리의 진행 상태를 표현했습니다. 사용자에게 완료 여부가 불명확했던 기다림을 설명 가능한 단계로 바꾸었습니다.",
        ],
      },
      {
        label: "03 / AUTHENTICATION",
        title: "동시에 실패한 요청이 재발급을 반복하지 않도록",
        paragraphs: [
          "여러 API가 동시에 401을 받으면서 토큰 재발급이 반복되는 문제를 팀 코드 리뷰에서 논의했습니다. 첫 재발급이 완료될 때까지 후속 요청을 큐에 보관하고, 새 토큰이 설정되면 대기 요청을 이어가는 방식으로 정리했습니다.",
        ],
      },
      {
        label: "04 / COLLABORATION",
        title: "기능뿐 아니라 개발 흐름도 함께 설계",
        paragraphs: [
          "GitFlow와 PR 기반으로 협업하고, MSW를 사용해 API 연동 전 화면을 검증했습니다. 스타일 컴포넌트의 재사용, Portal 기반 모달, 공유 가능한 모달 경로를 다뤘습니다.",
        ],
        points: [
          "기술 선택의 이유를 코드 리뷰에서 설명하기",
          "시간 감소와 사용자가 느끼는 기다림을 구분하기",
          "실패·진행·완료 상태를 모두 제품의 일부로 설계하기",
        ],
      },
      {
        "label": "05 / IMMERSIVE GALLERY",
        "title": "작품 데이터 하나를 여러 전시 경험으로",
        "paragraphs": [
          "회전·그리드·슬라이드·스크롤 방식의 전시 템플릿을 구현하고, react-three-fiber 기반 3D 갤러리를 추가했습니다. 예제를 TypeScript와 실제 작품 데이터 구조에 맞게 수정하고, 작품 선택에 따른 카메라 이동과 상세 모달 연결을 다뤘습니다.",
          "3D 효과만 만드는 데서 끝내지 않고 전시 설명 모달에 라우트를 적용해 공유·직접 접근 흐름을 연결했습니다. 소개·연락 화면과 생성 진행 모달도 작은 화면에 맞게 조정했습니다."
        ]
      },
      {
        "label": "06 / ITERATION",
        "title": "PR에 남긴 실험을 다음 사용자 경험으로 연결",
        "paragraphs": [
          "팀 저장소에는 본인이 작성해 병합된 PR 37건이 남아 있습니다. 이미지 최적화 검토에서 압축 구현으로, SSE 연동에서 클릭 직후 진행 모달 표시로 이어지는 변경 기록을 대조했습니다. PR 수는 기여 이력이며 성능이나 생산성 지표로 사용하지 않습니다.",
          "SSE 초기 연동 PR에는 로컬 포워딩과 배포 서버에서 진행 이벤트가 다르게 도착한 문제가 기록되어 있습니다. 전송 구간은 Axios onUploadProgress로 분리해 표시하도록 후속 수정했습니다. 모든 환경에서 서버 진행률이 균등하게 갱신된다는 주장 대신, 구현한 단계와 당시 검증 한계를 구분합니다."
        ]
      },
    ],
    evidence: [
      {
        label: "Dart 프론트엔드 저장소",
        url: "https://github.com/Goorm-Lucky7/Dart_FE",
      },
      { label: "당시 프로젝트 기록" },
      {"label": "이미지 압축 구현 · 본인 PR #96", "url": "https://github.com/Goorm-Lucky7/Dart_FE/pull/96"},
      {"label": "즉시 진행 모달·전송률 · 본인 PR #146", "url": "https://github.com/Goorm-Lucky7/Dart_FE/pull/146"},
      {"label": "3D 전시 템플릿 · 본인 PR #127", "url": "https://github.com/Goorm-Lucky7/Dart_FE/pull/127"},
      {"label": "반응형·전시 설명 모달 경로 · 본인 PR #100", "url": "https://github.com/Goorm-Lucky7/Dart_FE/pull/100"},
    ],
  },
  {
    slug: "search-performance",
    group: "purple",
    name: "Search & Performance",
    category: "PURPLE · SEO / AEO / RENDERING",
    year: "2026",
    period: "2026.07 — 2026.10",
    summary: "사람과 검색엔진 모두에게 읽히는 브랜드 웹.",
    headline: "보이는 페이지에서, 읽히는 페이지로.",
    role: "브랜드 SEO·AEO·렌더링 개선",
    team: "사내 브랜드 웹 협업",
    image: "/images/purple-curriculum.webp",
    imageAlt: "Purple Academy 커리큘럼 소개 페이지",
    tone: "purple",
    stack: [
      "Next.js",
      "Server Components",
      "JSON-LD",
      "GSAP",
      "Virtualization",
    ],
    highlights: [
      "공개 콘텐츠의 서버 렌더링 복구",
      "구조화 데이터·페이지 메타·크롤러 정책",
      "메인 하위 섹션 lazy mount·강좌 목록 가상화",
    ],
    sections: [
      {
        label: "01 / PROBLEM",
        title: "사용자는 읽지만 검색엔진은 로딩 화면을 보는 페이지",
        paragraphs: [
          "클라이언트 로딩에 의존한 공개 소개 페이지는 HTML만 읽는 도구에 콘텐츠를 제대로 전달하지 못했습니다. 화면 성능뿐 아니라 콘텐츠가 전달되는 렌더링 경계를 살펴보았습니다.",
        ],
      },
      {
        label: "02 / APPROACH",
        title: "콘텐츠와 검색 정책을 함께 정리",
        paragraphs: [
          "커리큘럼·FAQ·상세 콘텐츠의 서버 렌더링, 페이지별 메타데이터와 구조화 데이터, 이미지 대체 텍스트와 제목 계층을 정비했습니다. 검색·답변 엔진과 학습용 크롤러 정책도 구분했습니다.",
          "메인의 하위 섹션은 필요한 시점에 마운트하도록 정리하고, 강좌 목록에는 가상화로 렌더링 노드 수를 제한했습니다. 최적화 방식을 구분해 첫 화면 비용과 대량 목록 비용을 각각 다뤘습니다.",
        ],
      },
      {
        label: "03 / RECENT WORK",
        title: "퍼플잉글리시의 검색 노출 전환 준비",
        paragraphs: [
          "2026년 10월에는 퍼플잉글리시에 SEO·AEO와 사이트맵·robots·llms 콘텐츠를 준비했습니다. 전환 설정은 병합됐지만 당시 검색 노출 스위치는 꺼진 상태였으므로 운영 색인 완료로 표현하지 않습니다.",
          "검색 순위나 유입 증가, LCP 개선율은 확인된 측정 자료가 없습니다. 이 사례의 결과는 적용한 구조와 검증된 렌더링 동작입니다.",
        ],
      },
    ],
    evidence: [
      pr(7255, "SEO·AEO 및 서버 렌더링"),
      pr(7293, "메인 lazy mount"),
      pr(7315, "강좌 목록 렌더링"),
      pr(9530, "퍼플잉글리시 검색 전환 준비"),
    ],
  },
  {
    slug: "reading-lab",
    group: "purple",
    name: "Reading Lab",
    category: "PURPLE · LEARNING EXPERIENCE",
    year: "2026",
    period: "2026.05 — 2026.08 · 작업 기록 기준",
    summary: "학생이 푸는 퀴즈와 운영자가 만드는 콘텐츠를 함께.",
    headline: "학습 화면의 뒤에는 콘텐츠의 생애주기가 있습니다.",
    role: "학습앱·관리자 퀴즈 기능 개발",
    team: "학생 화면과 운영 도구 공동 개발",
    image: "/images/reading-lab.svg",
    imageAlt: "콘텐츠 제작·검수·학습·결과를 연결한 Reading Lab 흐름 설명",
    illustration: true,
    tone: "green",
    stack: ["React", "Next.js", "TypeScript", "Ant Design", "MUI"],
    highlights: [
      "학습앱과 관리자 동시 구축",
      "독해·어휘 검수 화면 분리",
      "콘텐츠 개정과 학습 결과의 관계 고려",
    ],
    sections: [
      {
        label: "01 / CONTEXT",
        title: "한쪽만 완성되어서는 사용할 수 없는 기능",
        paragraphs: [
          "학생의 퀴즈 UI와 관리자의 콘텐츠 제작·검수 UI는 같은 데이터 구조를 전제로 움직입니다. 콘텐츠를 넣을 도구와 실제 학습 화면을 함께 구축해 검증할 수 있게 했습니다.",
        ],
      },
      {
        label: "02 / IMPLEMENTATION",
        title: "문제 유형과 콘텐츠 변경을 명확하게",
        paragraphs: [
          "독해와 어휘는 검수 기준이 다르므로 유형별 검수 화면을 나눴습니다. 이미 학습한 결과에 영향을 주는 콘텐츠 변경은 개정 이력으로 다룰 수 있도록 구현했습니다.",
          "리딩 배지와 보상 수령의 연결, 입력 오류 안내도 개선했습니다. 학생의 풀이 경험과 운영자의 관리 경험을 같은 기능의 양쪽으로 보았습니다.",
        ],
      },
      {
        label: "03 / SCOPE",
        title: "127개 파일보다 중요한 것은 연결 범위",
        paragraphs: [
          "초기 구축 PR은 학습앱과 관리자에 걸쳐 127개 파일을 변경했습니다. 파일 수는 작업 범위를 설명하는 기록이며 학습 효과를 입증하는 지표는 아닙니다.",
          "콘텐츠 제작 → 검수 → 학습 → 결과의 흐름을 하나의 기능으로 연결했습니다.",
        ],
      },
    ],
    evidence: [
      pr(4345, "학습앱·관리자 구축"),
      pr(4407, "독해·어휘 검수 분리"),
      pr(5020, "리딩 배지·보상 연결"),
    ],
  },
  {
    slug: "shared-systems",
    group: "purple",
    name: "Shared Systems",
    category: "PURPLE · DESIGN SYSTEM / DATA",
    year: "2026",
    period: "2026.07 — 2026.10",
    summary: "공통 UI, 타입, 캐시 규칙을 팀이 함께 사용하는 자산으로.",
    headline: "재사용은 코드 복사보다, 같은 규칙을 쓰는 일입니다.",
    role: "공통 UI 패키지·요청 계약·문서 개선",
    team: "모노레포 공유 기반 협업",
    image: "/images/shared-systems.svg",
    imageAlt: "색상 토큰에서 버튼·카드로 이어지는 디자인 시스템 설명",
    illustration: true,
    tone: "cream",
    stack: [
      "Design Tokens",
      "Storybook",
      "TypeScript",
      "React Query",
      "Turborepo",
    ],
    highlights: [
      "동일 구현 50개를 공통 모듈로 통합",
      "의도된 화면 차이 9개는 어댑터로 보존",
      "신규 도메인 문서 56편 · 공유 AI 규칙",
    ],
    sections: [
      {
        label: "01 / UI CONTRACT",
        title: "같은 화면은 하나로, 다른 정책은 명시적으로",
        paragraphs: [
          "CRM과 T관리의 학생 상세에 동일 구현 50개, 10,401줄이 중복되어 있었습니다. 공통 모듈로 통합하면서 화면에 의도된 차이 9개는 라우트 어댑터로 남겼습니다. 재사용과 업무별 차이를 함께 표현한 설계입니다.",
          "브랜드 공통 UI를 상위 패키지로 분리하고 디자인 토큰·Storybook과 연결했습니다. 화면마다 비슷한 버튼을 만드는 대신 같은 표현과 사용법을 확인할 수 있게 했습니다.",
        ],
      },
      {
        label: "02 / DATA CONTRACT",
        title: "저장 뒤 어떤 화면이 갱신되는가",
        paragraphs: [
          "관리자의 요청과 캐시 처리 방식을 정비했습니다. 화면별 응답 래퍼와 타입 우회를 공통 ApiResponse 계약으로 줄이고, 변경 성공 후 관련 데이터가 갱신되는 규칙을 명확하게 했습니다.",
          "최근 퍼플잉글리시 리포트에서는 자녀별 쿼리 키를 사용해 늦게 도착한 앞 자녀 응답이 현재 화면을 덮지 않도록 했습니다. 불러오는 중·실패·빈 결과도 구분했습니다.",
        ],
      },
      {
        label: "03 / TEAM ASSET",
        title: "사람과 AI가 같은 규칙을 확인하도록",
        paragraphs: [
          "도메인 규칙을 코드 옆 문서에 정리해 코드 변경과 함께 리뷰하고 버전 관리할 수 있도록 기여했습니다. 145편의 도메인 문서 중 56편을 신규 작성했습니다. 규칙은 한 문서에서 정의하고 결정 이유는 ADR로 분리했습니다. 팀 공용 AI 스킬 저장소에는 규칙 검사·업데이트 훅·CI를 연결해 사람이든 에이전트든 최신 기준을 읽도록 개선했습니다.",
        ],
      },
    ],
    evidence: [
      pr(9226, "학생 상세 중복 통합"),
      pr(7674, "디자인 시스템 패키지"),
      pr(7151, "관리자 요청·캐시 정비"),
      pr(9320, "API 응답 계약"),
      pr(9564, "리포트 데이터 조회"),
    ],
  },
  {
    slug: "operations-platform",
    group: "purple",
    name: "Operations Platform",
    category: "PURPLE · OPERATIONS / DATA",
    year: "2026",
    period: "2026.08 — 2026.10",
    summary: "운영자가 믿을 수 있는 숫자와, 이어서 일할 수 있는 도구.",
    headline: "보기 좋은 대시보드보다, 판단에 쓸 수 있는 대시보드.",
    role: "운영 대시보드·통합 문의함·알림톡·동의 이력 개발",
    team: "행정·CS 업무와 제품 개발팀 협업",
    image: "/images/operations.svg",
    imageAlt: "실시간 지표와 문의·알림을 연결하는 운영 플랫폼 개념도",
    illustration: true,
    tone: "orange",
    stack: ["Next.js", "GraphQL", "NestJS", "TypeORM", "MySQL", "NHN Cloud"],
    highlights: [
      "상단 조회 DB 왕복 20–21회 → 10–11회",
      "통합 문의함 · 답변 템플릿 28종",
      "동의 3상태 · 접점 이력 · 원자적 저장",
    ],
    sections: [
      {
        label: "01 / DATA",
        title: "캐시 없이, 실시간 조회 비용을 줄이기",
        paragraphs: [
          "마스터 대시보드의 현황·LMS·매출 상세를 연결하고 GraphQL 조회 기반을 구축했습니다. 상단 영역은 중복 집계를 합쳐 DB 왕복을 20–21회에서 10–11회로 줄였습니다. 매출 카드 조회는 9회에서 2회로 줄였습니다.",
          "이 수치는 쿼리 왕복 횟수의 비교입니다. 캐시로 데이터를 늦추는 대신 쿼리를 합쳐 실시간 기준 시각을 유지했습니다.",
        ],
      },
      {
        label: "02 / DEFINITIONS",
        title: "숫자의 정의를 코드와 문서에 함께 남기기",
        paragraphs: [
          "고정 문구로 표시하던 처리 업무 카드를 실데이터 집계로 바꾸었습니다. 자동결제 실패 카드에는 주문 상태만이 아니라 실제 구독 상태를 반영해 운영자가 처리해야 할 대상을 정확히 보여 주었습니다.",
          "집계 기준과 데이터 한계를 도메인 문서와 화면에 함께 표현했습니다. 필요한 데이터가 없는 SLA나 담당자 부하 지표는 임의로 만들지 않고 구현 가능한 범위를 설명했습니다.",
        ],
      },
      {
        label: "03 / WORKFLOW",
        title: "문의와 알림을 운영자의 작업 흐름으로",
        paragraphs: [
          "분리된 웹·본원·티처 문의를 통합 문의함에서 조회·필터·답변할 수 있게 했습니다. 과거 답변을 최근 사용 여부까지 대조해 답변 템플릿 28종을 선정했습니다.",
          "알림톡은 관리자와 NHN Cloud의 양방향 관리·선택 동기화로 연결했습니다. 수정안이 검수 중이어도 기존 승인본은 계속 발송할 수 있도록 승인 상태와 발송 가능 상태를 분리했습니다.",
        ],
      },
      {
        label: "04 / TRACEABILITY",
        title: "동의 결과뿐 아니라 발생한 맥락도 저장",
        paragraphs: [
          "광고성 정보 수신 동의를 확인 불가·동의·미동의로 나누고 동의·철회 시각과 12종 접점을 기록했습니다. 신청과 동의 저장을 같은 트랜잭션으로 묶어 데이터가 따로 성공하지 않게 했습니다.",
          "접점에서 서비스로 이어지는 매핑은 Record 타입으로 완결성을 확인합니다. 기존 이력으로 복원한 시각의 한계도 문서에 남겨 확인되지 않은 사실을 확정하지 않았습니다.",
        ],
      },
    ],
    evidence: [
      pr(8437, "DB 왕복 횟수 최적화"),
      pr(8664, "통합 문의함"),
      pr(8849, "답변 템플릿"),
      pr(9089, "알림톡 양방향 관리"),
      pr(9277, "동의 접점·트랜잭션"),
      pr(9409, "구독 기준 집계"),
    ],
  },
  {
    slug: "purple-english",
    group: "purple",
    name: "Purple English",
    category: "PURPLE · LEGACY MIGRATION",
    year: "2026",
    period: "2026.08 — 2026.10 · 이관 개발",
    summary: "레거시의 학습 경험을 보존하며, 서비스의 경계를 다시 설계.",
    headline: "새로운 구조에서도, 익숙한 학습은 이어져야 합니다.",
    role: "브랜드·학습앱·API 이관 및 품질 개선",
    team: "레거시 서비스와 모노레포 개발팀 협업",
    image: "/images/english-migration.svg",
    imageAlt: "레거시 학습 화면을 브랜드·학습앱·API로 이관하는 개념도",
    illustration: true,
    tone: "green",
    stack: ["Next.js", "React Query", "NestJS", "TypeScript", "Accessibility"],
    highlights: [
      "레거시 좌표·인터랙션을 원본과 대조",
      "자녀별 쿼리 키로 늦은 응답 경합 처리",
      "모달 초점 순환·복귀 · 검색 전환 준비",
    ],
    sections: [
      {
        label: "01 / PRESERVE",
        title: "어린이가 손으로 만지는 지점부터 검증",
        paragraphs: [
          "기존 브랜드·학습앱·API를 모노레포로 이관하면서 레거시 소스의 좌표·색상·SVG를 대조했습니다. 따라쓰기, 사이트워드 드래그, 알파벳 보드처럼 학습자가 직접 조작하는 위치와 판정을 보정했습니다.",
          "늦게 도착한 제출 요청이 현재 학습을 덮지 않도록 프론트와 API에서 대상 ID를 확인했습니다. 레슨 복습 진입과 자동재생이 막힌 상황도 함께 처리했습니다.",
        ],
      },
      {
        label: "02 / BOUNDARIES",
        title: "같은 요청 함수가 다른 실패를 만들지 않도록",
        paragraphs: [
          "네 갈래로 흩어진 API 요청 함수를 하나의 경계로 정리하고 예외 처리 방식을 통일했습니다. 조회는 React Query로 옮겨 자녀별 쿼리 키와 상태를 분리했습니다.",
          "보안 검토에서는 인증 대상 검증, 로그의 민감 정보 제거, 반복 요청 제한을 개선했습니다. 결제·인증의 실패 안내와 재시도 경로도 함께 정리했습니다.",
        ],
      },
      {
        label: "03 / ACCESSIBILITY",
        title: "키보드와 모바일에서도 끝까지 사용하기",
        paragraphs: [
          "팝업의 ESC 닫기·배경 스크롤 잠금·초점 순환·닫은 뒤 복귀를 공통 훅으로 처리했습니다. 모바일에서는 입력 자판, 터치 가능한 약관 라벨, 모달 여백을 다듬었습니다.",
          "조회 실패를 빈 화면이나 비로그인으로 오인하지 않도록 재시도 상태를 표현했습니다. 사용자가 취소한 결제는 오류와 구분했습니다.",
        ],
      },
      {
        label: "04 / CUTOVER",
        title: "병합과 운영 전환을 별개의 단계로",
        paragraphs: [
          "검색용 메타데이터·구조화 데이터·사이트맵을 컷오버 설정과 연결했습니다. 2026년 10월 확인 시점에는 노출 스위치가 꺼져 있어 이관 개발과 검색 준비까지를 기여 범위로 기록합니다.",
        ],
      },
    ],
    evidence: [
      pr(7904, "학습 제출 경합 보정"),
      pr(7977, "레거시 실측 대조"),
      pr(9490, "요청 경계 통일"),
      pr(9564, "자녀별 리포트 조회"),
      pr(9621, "모달 초점 순환"),
      pr(9530, "검색 전환 설정"),
    ],
  },
  {
    slug: "android-webview",
    group: "purple",
    name: "Beyond the WebView",
    category: "PURPLE · ANDROID / RESILIENCE",
    year: "2026",
    period: "2026.08 — 2026.10 · 작업 기록 기준",
    summary: "웹 화면 밖에서도, 다운로드와 학습은 이어집니다.",
    headline: "사용자는 웹과 네이티브의 경계를 구분하지 않습니다.",
    role: "React Native 웹뷰·Android 네이티브 모듈 개선",
    team: "기존 학습앱과 네이티브 앱 연계",
    image: "/images/android-webview.svg",
    imageAlt:
      "Android 앱의 공개 다운로드 저장·웹뷰 복구·반응형 스플래시 개념도",
    illustration: true,
    tone: "blue",
    stack: ["React Native", "Android", "MediaStore", "WebView", "Lottie"],
    highlights: [
      "MediaStore로 사용자가 찾을 수 있는 파일 저장",
      "웹뷰 프로세스 종료 후 복구·재시도",
      "태블릿·분할 화면 대응 스플래시",
    ],
    sections: [
      {
        label: "01 / FILES",
        title: "다운로드 완료가 파일을 찾을 수 있다는 뜻은 아니었습니다",
        paragraphs: [
          "앱 내부에 저장된 파일은 파일 관리자에서 보이지 않고 앱 삭제 시 사라졌습니다. Android 네이티브 모듈에서 MediaStore.Downloads에 복사한 뒤 공개하도록 개선했습니다.",
          "이미지·영상·오디오는 MIME과 확장자를 대조해 각각의 공개 폴더로 분기했습니다. 새 네이티브 기능이 없는 구버전 바이너리는 기존 경로로 폴백해 다운로드를 유지합니다.",
        ],
      },
      {
        label: "02 / RECOVERY",
        title: "흰 화면 대신, 다시 이어갈 수 있는 상태",
        paragraphs: [
          "웹뷰 프로세스가 종료되면 자동으로 복구하고 재시도 화면을 표시했습니다. 인터넷이 끊겨도 안내가 보여야 하므로 오류 화면의 자산은 앱에 포함했습니다.",
          "알림 권한 안내는 거부 후에도 앱을 계속 사용할 수 있게 했습니다. 서비스 알림과 광고성 정보 수신 안내의 맥락도 구분했습니다.",
        ],
      },
      {
        label: "03 / RESPONSIVE",
        title: "휴대폰 한 크기만을 가정하지 않기",
        paragraphs: [
          "Lottie 스플래시를 창의 짧은 변을 기준으로 맞춰 태블릿 가로와 분할 창에서 잘리지 않게 조정하고 테스트했습니다. 브라우저의 반응형 설계가 앱의 시작 화면까지 이어진 사례입니다.",
        ],
      },
    ],
    evidence: [1, 2, 4, 5].map((number) => ({
      label: `Android 앱 개선 #${number}`,
      url: `https://github.com/PurpleAcademy-co-kr/AndroidPurpleAcademyApp/pull/${number}`,
      private: true,
    })),
  },
  {
    slug: "memolinx",
    group: "independent",
    name: "MemoLinx",
    category: "PERSONAL · SOCIAL WEB APP",
    year: "2024",
    period: "2024.03 — 2024.04",
    summary: "메모를 사람들과 연결하는 개인 프로젝트.",
    headline: "기획부터 데이터 구조까지 직접 다룬 작은 제품.",
    role: "기획·UI·데이터베이스·프론트엔드 개인 개발",
    team: "개인 프로젝트",
    image: "/images/memolinx.webp",
    imageAlt: "MemoLinx 메모장 SNS 웹앱의 데스크톱·모바일 목업",
    tone: "green",
    stack: [
      "React",
      "TypeScript",
      "Firebase",
      "Redux Toolkit",
      "Styled Components",
    ],
    highlights: [
      "Firestore 데이터 모델·소셜 인증",
      "게시물·댓글 조회의 의존성 분리",
      "좋아요 낙관적 UI·실시간 반영",
    ],
    sections: [
      {
        label: "01 / OWNERSHIP",
        title: "메모장과 SNS를 결합한 제품",
        paragraphs: [
          "메모 작성·관리·꾸미기, 댓글·좋아요, 유저 정보, Google·GitHub 소셜 로그인을 구현했습니다. 기획과 UI, Firestore 데이터 모델을 함께 다뤘습니다.",
        ],
      },
      {
        label: "02 / INCIDENT",
        title: "서로를 다시 호출한 게시물과 댓글 조회",
        paragraphs: [
          "배포 전 테스트에서 useEffect 의존성 설계로 요청이 반복되어 1분 안에 Firestore 읽기 약 5만 건이 발생한 이력이 있습니다. 이는 사용자 규모가 아니라 잘못된 조회 흐름의 장애 기록입니다. 게시물 조회와 댓글 조회가 서로의 변화에 영향을 주는 구조를 분리하고, 댓글은 onSnapshot 실시간 구독과 해제로 관리했습니다.",
        ],
      },
      {
        label: "03 / FEEDBACK",
        title: "클릭한 결과를 바로 보여 주기",
        paragraphs: [
          "좋아요를 누른 뒤 새로고침해야 보이던 상태에 낙관적 UI를 도입했습니다. 사용자 반응을 먼저 화면에 표현하고 데이터와 맞춰 가는 방식을 학습했습니다.",
          "후속 커밋에서는 실시간 구독 결과에 좋아요 수뿐 아니라 현재 사용자의 선택 상태도 동기화하고, 누락된 배열은 빈 배열로 처리했습니다. 새로고침 후 선택 상태가 어긋나는 경계를 보완한 변경입니다.",
        ],
      },
      {
        "label": "04 / USER FEEDBACK",
        "title": "두 번의 베타 테스트를 제품 수정으로 연결",
        "paragraphs": [
          "당시 개인 프로젝트 기록에는 사용자 50명을 확보하고 두 차례 베타 테스트를 진행한 이력이 있습니다. 현재 활성 사용자 수가 아니라 2024년 테스트 당시의 기록입니다. Typeform으로 받은 의견을 GitHub 이슈 #12·#13에 나누어 개선 항목으로 관리했습니다.",
          "폴더 생성 결과를 인식하기 어렵다는 의견에는 생성 UX를 보완하고, 다른 사용자의 글을 보고 싶다는 의견에는 타 사용자 마이페이지 조회를 추가했습니다. 업로드한 메모의 수정 제한, 빈 이미지의 기본 이미지 처리, 회원가입 후 내비게이션 상태도 후속 피드백에 따라 수정했습니다."
        ]
      },
    ],
    evidence: [
      {
        label: "MemoLinx 저장소",
        url: "https://github.com/j2an777/MemoLinx-App",
      },
      { label: "프로젝트 기록" },
      {"label": "1차 베타 피드백과 처리 항목 · Issue #12", "url": "https://github.com/j2an777/MemoLinx-App/issues/12"},
      {"label": "2차 베타 피드백과 처리 항목 · Issue #13", "url": "https://github.com/j2an777/MemoLinx-App/issues/13"},
      {"label": "좋아요 실시간 상태 동기화 수정 · 커밋 522f3a8", "url": "https://github.com/j2an777/MemoLinx-App/commit/522f3a81fa"},
    ],
  },
];

export const projectGroups = [
  {
    id: "purple",
    name: "Purple Academy",
    label: "재직 중 · 교육 플랫폼",
    description: "브랜드 웹·퍼플잉글리시·학습앱·운영 도구와 공유 시스템은 모두 Purple Academy에서 진행한 업무입니다. 하나의 교육 플랫폼을 사용자 경험부터 운영·개발 기반까지 다룬 세부 사례로 나눴습니다.",
  },
  {
    id: "investi",
    name: "인베스티",
    label: "2024.09 — 2025.09 · 실무 경험",
    description: "인베스티 소속으로 HanwhaVision STEP 클라이언트 프로젝트와 Co-Play 플랫폼 개발에 참여했습니다. 고객사 서비스의 운영 안정화와 초기 제품의 프론트엔드 기반 구축을 구분해 소개합니다.",
  },
  {
    id: "independent",
    name: "개인·팀 프로젝트",
    label: "2024 · 직접 만들고 검증한 제품",
    description: "D’art는 FE 3명·BE 4명이 함께 만든 온라인 전시 서비스이고, MemoLinx는 기획부터 개발·베타 피드백까지 진행한 개인 프로젝트입니다.",
  },
] as const;

export function getProjectGroups() {
  return projectGroups.map((group) => ({
    ...group,
    projects: projects.filter((project) => project.group === group.id),
  }));
}

export const expertise = [
  {
    number: "01",
    name: "Product Engineering",
    title: "사용자의 다음 행동까지 설계합니다.",
    body: "가입·결제·학습처럼 이어지는 흐름을 만들고, 로딩·실패·빈 상태까지 제품의 일부로 다룹니다.",
    tags: ["React", "Next.js", "TypeScript", "React Query"],
  },
  {
    number: "02",
    name: "Systems & Collaboration",
    title: "팀이 같은 규칙으로 개발하게 합니다.",
    body: "디자인 토큰, 공통 UI, API 계약, 도메인 문서를 연결해 다음 개발자가 이어갈 수 있는 기반을 남깁니다.",
    tags: ["Design System", "Storybook", "Turborepo", "OpenAPI"],
  },
  {
    number: "03",
    name: "Performance & Craft",
    title: "빠르고, 읽히고, 쓰기 편하게.",
    body: "서버 렌더링과 SEO·AEO, 이미지·대량 목록 최적화, 접근성과 모션을 함께 살펴봅니다.",
    tags: ["SSR / SSG", "SEO / AEO", "GSAP", "Accessibility"],
  },
];

export const experience = [
  {
    period: "2026.01 — 현재",
    label: "PROJECT ACTIVITY",
    name: "Purple Academy",
    role: "Frontend Developer · 교육 플랫폼",
    description:
      "브랜드·관리자·학습앱과 API, Android 웹뷰까지 연결. 신규 구축·레거시 이관·운영 품질·팀 공통 기반 개선.",
    slug: "purple-academy",
  },
  {
    period: "2025.03 — 2025.09",
    label: "CLIENT PROJECT",
    name: "HanwhaVision STEP",
    role: "Frontend Developer · 글로벌 파트너 서비스",
    description:
      "운영 인증 문제, 다국어 언어팩, 정형 PDF와 공통 폼 컴포넌트 개발.",
    slug: "hanwha-vision",
  },
  {
    period: "2024.09 — 2025.02",
    label: "PLATFORM DEVELOPMENT",
    name: "Co-Play Platform",
    role: "프론트엔드 아키텍처·개발 주도 · 서비스명 비공개",
    description:
      "모노레포와 디자인 시스템, API 타입 생성, 오류 처리 및 가상화 기반 구축.",
    slug: "co-play",
  },
];

export const updates = [
  {
    date: "2026.10",
    title: "키보드로 끝까지 사용할 수 있는 모달",
    description:
      "초점 이동, Tab 순환, 닫은 뒤 복귀를 공통 훅에서 처리했습니다.",
    project: "purple-english",
  },
  {
    date: "2026.10",
    title: "자녀를 바꿔도 정확한 학습 기록",
    description:
      "자녀별 쿼리 키로 응답 경합을 다루고 로딩·실패·재시도를 구분했습니다.",
    project: "shared-systems",
  },
  {
    date: "2026.10",
    title: "검색·AI 답변을 위한 전환 준비",
    description:
      "퍼플잉글리시의 메타데이터·크롤러 정책·사이트맵을 전환 설정과 연결했습니다.",
    project: "search-performance",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const portfolioPdf = "/portfolio/seungjin-ha-portfolio.pdf";
