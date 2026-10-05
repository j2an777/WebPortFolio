# 검증 결과 · 2026-10-04

환경: macOS, 설치된 Chrome, Next 프로덕션 빌드의 localhost:3100. 배포 후 실제 사용자 측정과 구분한다.

| 검증             | 결과                                                            |
| ---------------- | --------------------------------------------------------------- |
| `pnpm typecheck` | 통과                                                            |
| `pnpm lint`      | 오류·경고 0                                                     |
| `pnpm test`      | 4건 통과                                                        |
| `pnpm build`     | 통과 · 메뉴/사례 서버 사전 렌더링                               |
| `pnpm test:e2e`  | 13건 통과                                                       |
| axe A/AA         | 홈·Contact·Operations 상세: 자동 위반 0                         |
| 반응형           | 320·390·768·1024·1440px 탐색·상세·넘침 검증                     |
| 긴 이름          | 320px 단일 긴 토큰 카드·다음 사례 넘침 없음                     |
| JavaScript off   | 소개·메뉴·상세 이동 확인                                        |
| Reduced motion   | 전환 커튼 생략·본문 표시 확인                                   |
| History          | 뒤로 가기·반복 메뉴 이동·전환 복구 확인                         |
| 콘텐츠           | 11개 직접 상세 URL · 썸네일 파일 존재 · source 링크 계약        |
| 검색·공유        | metadata·JSON-LD·404/noindex·robots·sitemap·llms·사이트/사례 OG |

## 성능

`pnpm dlx lighthouse http://localhost:3100 --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/j2an-lighthouse-mobile-final.json --quiet`

| 항목           | 최종 모바일 실험실 결과              |
| -------------- | ------------------------------------ |
| Performance    | 98                                   |
| Accessibility  | 100                                  |
| Best practices | 100                                  |
| FCP            | 0.8초                                |
| LCP            | 2.477초                              |
| CLS            | 0                                    |
| TBT            | 10ms                                 |
| SEO            | 66 · 검토용 noindex의 색인 차단 영향 |

초기 측정은 Performance 93 / LCP 3.26초였다. 프로필 preload에 high fetch priority를 적용하고 비필수 GSAP 초기화를 1.2초 뒤로 미뤄 초기 콘텐츠의 리소스 경합을 줄였다. 그 후 97 / 2.6초, 최종 변경에서 98 / 2.477초를 기록했다. 서로 다른 로컬 실행의 수치이므로 개선율이나 운영 CWV로 주장하지 않는다. [측정 요약](lighthouse-summary.json)에 버전과 수치를 기록했다.

타이틀·설명·링크 텍스트·이미지 alt·robots 검사는 통과했다. 확정 운영 origin이 없어 canonical은 생성하지 않았고, noindex·빈 sitemap을 유지한다. `SITE_URL`과 `SITE_INDEXABLE=true`를 실제 HTTPS 환경에 지정해 다시 빌드한 뒤 운영에서 검증해야 한다. llms.txt는 보조 설명 파일이며 AI 인용·검색 순위의 보장이 아니다.

최종 화면은 데스크톱·모바일 전체 스크린샷과 모바일 상세를 직접 확인했다. 전체 스크린샷 전 스크롤해 lazy 이미지까지 로드했다. 홈의 사진과 설명은 애니메이션으로 숨기지 않는다.

## 최종 리뷰

별도 리뷰어가 코드·320px 전체 경로·JavaScript off·404·검색 기본 설정을 읽기 전용으로 확인했다. Critical 0, Important 1, Minor 3을 보고했다.

- 긴 프로젝트명 overflow: 그리드 `minmax(0,1fr)`와 제목 줄바꿈으로 수정, 회귀 E2E 통과.
- 이미지 hover: 잘못 변경된 선택자를 복구하고 parallax와 hover 계층 분리.
- 프로젝트 수 metadata: 8→11로 수정.
- 모달 최근 사례 연결: 해당 내용과 PR 근거가 있는 Purple English로 수정.

수정 후 동일 리뷰어가 재검토해 승인했다. 긴 이름의 scrollWidth=320, hover 전후 transform, 11개 메타 설명, Purple English 사례 연결을 확인했으며 남은 지적은 없다.

## 전달 조건

현재 브랜치 `feature/portfolio-renewal`. 사용자 요청에 따라 저장소 소유자 `j2an777`를 인증하고 ADMIN 권한을 확인해 원격 push를 완료했다. 로컬과 원격의 구현 커밋 `f7e0742` 일치를 확인했다. `main` 병합과 운영 배포는 아직 실행하지 않았다. 배포 시 Next 서버를 지원하는 호스팅을 사용한다. 원본 PDF·조사 이미지 원본·내부 인증 캡처는 공개 자산에서 제외했다.

## GitHub Pages 정적 배포 검증 (2026-10-04)

- 저장소 경로 `/WebPortFolio`를 지정한 `pnpm build:pages` 성공: 11개 사례와 OG 이미지 정적 생성.
- 단위 테스트 7개 통과, ESLint와 TypeScript 검사 통과.
- 생성된 `out/`을 경로 아래에 마운트한 정적 서버에서 320·390·768·1440px 검증: 이미지 로딩, 가로 넘침 없음, 메뉴 활성 상태, GSAP 경로 전환, 상세 페이지 새로고침 정상.
- JavaScript 비활성화 상태에서도 상세 본문 표시.
- 루트/사례 OG PNG, robots, sitemap, llms.txt HTTP 200. OG PNG의 `image/png` MIME 확인. 브라우저 오류 없음.
- 실제 GitHub Actions 실행과 공개 URL 검증은 아직 수행하지 않았습니다.

- 일반 Next 서버 모드 `pnpm build`도 성공. 최종 독립 리뷰에서 중요 이상 없음; 정적 로컬 링크·자산 참조 633개 확인.

## 2026-10-05 Purple Academy 콘텐츠 보강

- 회사 PR 검색 결과 1,548건을 수집·선별하고 본인 작성·병합 PR 8개의 본문 및 변경 파일 목록을 재대조했다. 조사 범위와 한계는 research.md에 기록했다.
- ESLint, 단위 테스트 7개, GitHub Pages 정적 빌드 통과.
- 정적 서버 `/WebPortFolio/`에서 390px·1440px 브라우저 확인: 기존 메뉴 5개 유지, 프로젝트 경로 전환 후 상세 7개 섹션·비공개 근거 링크 8개, 이미지 로딩 정상, 가로 넘침 없음.
- JavaScript 비활성화에서도 보강된 상세 본문 전체 표시. 브라우저 pageerror 없음.
- 첫 브라우저 탐색 시도는 페이지 전환 애니메이션 완료 전 다음 링크를 눌러 시간 초과했다. 애니메이션 종료를 기다리도록 검증 절차를 수정한 후 통과했다. 제품 코드는 변경하지 않았다.
- 이번 변경은 About Me 메뉴 제거 PR #3을 포함하지 않는다. 실제 공개 사이트 반영은 새 콘텐츠 PR 머지와 배포 성공 후다.
