# 디자인 시스템

종이색 배경·짙은 글자·오렌지·큰 영문 제목과 한국어 본문으로 개인의 소개와 실무 사례를 연결한다.

| 토큰     | 값                        | 용도             |
| -------- | ------------------------- | ---------------- |
| paper    | #f4f2ed                   | 기본 배경        |
| ink      | #191919                   | 본문·어두운 섹션 |
| muted    | #69655f                   | 보조 설명        |
| accent   | #e6532f                   | 포인트·Contact   |
| line     | #d8d5ce                   | 정보 구분        |
| ease-out | cubic-bezier(.23,1,.32,1) | hover·버튼       |

`src/app/globals.css`의 CSS 변수와 Tailwind `@theme inline`을 단일 원천으로 사용한다. DM Sans 가변 폰트는 자체 호스팅하고 OFL 라이선스를 포함한다. 한국어는 시스템 폰트로 초기 다운로드를 제한한다.

공통 UI는 `SectionHeading`, `PageIntro`, `ProjectCard`, `Tags`, `TextLink`, `Arrow`다. 공통 콘텐츠는 `src/content/portfolio.ts`, 메타데이터·JSON-LD 직렬화는 `src/lib/seo.ts`, 모션 생명주기는 `useScrollMotion`에서 관리한다.

최대 본문 너비 1280px. 1000px에서 간격·경력 열을 조정하고 700px 아래에서 세로 배치로 전환한다. 모바일 내비게이션은 2행이며 좁은 화면에서는 수평 탐색을 허용한다. 이미지에 고정 비율을 확보하고 텍스트에는 유연한 크기·줄바꿈을 적용한다.

스크롤은 기본 브라우저 스크롤이다. GSAP·ScrollTrigger는 본문 표시 이후 동적으로 불러오며 context·matchMedia를 경로마다 정리한다. 읽은 섹션은 다시 등장시키지 않는다. hover 확대는 별도 이미지 계층에서, parallax는 외곽 계층에서 동작한다. reduced motion에서는 이동을 생략하며 모든 내용은 JavaScript 없이도 보인다.
