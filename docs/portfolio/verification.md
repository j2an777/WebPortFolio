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

## 2026-10-05 별도 이력서 및 PDF

- 기존 About Me `/` 유지, `/resume`과 메뉴 추가. 연락처에 사용자 확인 GitHub·Instagram·Velog 링크 반영.
- 원본 이력서 PDF 5페이지 텍스트·이미지 전부 확인. 사람인·원티드는 Chrome 런타임 오류로 미대조이며 `resume-sources.md`에 한계 기록. 현재 회사 활동 기간을 입사일로 단정하지 않음.
- ESLint·TypeScript 검사, 단위 테스트 9개, 브라우저 E2E 19개 통과. E2E는 설치된 Playwright Chromium을 사용하는 임시 설정으로 실행. 접근성 자동 검사, 320~1440px, JavaScript off, PDF 다운로드·메뉴 경로 전환 포함.
- 새 소셜 링크가 좁은 화면에서 넘친 회귀를 발견해 줄바꿈으로 수정. 모바일 메뉴 너비 제한도 추가 후 전체 E2E 재실행 통과.
- 일반 `pnpm build`와 `SITE_URL=https://j2an777.github.io NEXT_PUBLIC_BASE_PATH=/WebPortFolio SITE_INDEXABLE=true pnpm build:pages` 성공.
- 최종 `out/`을 `/WebPortFolio/`에 마운트해 320·390·768·1440px 본문·홈 이동·실제 PDF 응답 확인. 브라우저 pageerror 없음, JavaScript off에서도 학력 표시. 390px·1440px 전체 스크린샷 시각 확인.
- PDF A4 3페이지, 약 555KB, 한글 텍스트 추출·18개 링크 확인. 전 페이지 렌더를 확인했으며 내용 잘림과 겹침 없음.
- 웹/PDF 데이터 공유, 모든 개발·빌드 명령에서 PDF 생성. Linux CI 브라우저 시스템 의존성 설치 추가. 독립 리뷰에서 마지막 404 지적 해소 후 추가 blocker 없음.
- 이 기록은 로컬 검증이며 새 PR의 GitHub Actions·공개 배포 성공을 뜻하지 않음.

### 사용자 후속 수정: 숫자 영역 제거와 사진 교체

- `/resume` 및 PDF의 대표 성과 숫자 영역(50개·50%·56편)을 제거. 관련 데이터와 전용 스타일도 정리.
- Desktop `profile.jpg`를 WebP로 변환해 이력서 전용 사진으로 반영. 웹과 PDF가 같은 사진 경로를 공유.
- ESLint, 단위 9개, 이력서 브라우저 E2E 6개, 일반 빌드 및 Pages 빌드 통과. PDF 3페이지 렌더 확인, 15개 링크 유지.

### 회사별 업무 보강 및 자격증 추가

- Purple Academy 5개, 인베스티의 Co-Play·HanwhaVision STEP 6개 항목으로 회사별 업무 보강. 기존 사례의 구현·검증 근거를 반영.
- 사용자 스크린샷의 정보처리기사·SQLD(각 2025.12)를 웹/PDF 자격증 영역에 반영.
- ESLint, 단위 9개, 이력서 브라우저 E2E 6개, 일반·Pages 빌드 통과.
- PDF 3페이지 전체 렌더 및 자격증·핵심 업무 텍스트 추출 확인. 생성기의 푸터 겹침 검사 통과. 본문 글자 크기 유지, 경력 줄 간격과 여백 및 마지막 연락처 영역 조정.

## 2026-10-05 포트폴리오 PDF 자동 생성 및 다운로드 호환성

- 생성기를 `scripts/generate-pdfs.tsx`로 확장. 개발·일반·Pages 빌드에서 이력서와 포트폴리오 PDF를 생성하며 생성 실패 시 빌드도 실패한다.
- 공유 데이터로 표지·프로필·역량·목차·11개 상세 사례·연락처 구성. 현재 A4 26페이지, 약 1.32MB. 본문 증가 시 자동 페이지 분할.
- 모든 원천 문단이 PDF 텍스트에 포함됨을 확인. 전 페이지 렌더 시각 확인, 페이지 밖 텍스트 없음.
- 글꼴·이미지는 PDF 내부에 포함. 일부 가변 라틴 글꼴은 내부 Type3 벡터 글리프로 저장됨을 확인. 별도 원본 사이트·폰트 설치에 의존하지 않음.
- PyMuPDF·macOS PDFKit에서 이력서 3페이지와 포트폴리오 26페이지 전체 열기·렌더 성공. PDFKit 대표 페이지 시각 대조.
- 단위 10개(콘텐츠 수정·프로젝트 추가 자동 반영), Chromium E2E 20개, 일반·Pages 빌드·ESLint 통과.
- 정적 산출물을 `/WebPortFolio/`에 마운트해 Chromium·WebKit 각각 320·390·768·1440px 다운로드 확인. Android·iPhone·iPad 브라우저 에뮬레이션 포함. 두 PDF 다운로드 SHA-256이 원본과 동일. 한글 파일명(Unicode 정규화 후)·MIME·HTTP 200 확인. JS off 다운로드도 두 엔진에서 성공.
- 공개 GitHub Pages의 기존 이력서 PDF를 로그인 없이 내려받아 3페이지·한글 본문 확인. 새 포트폴리오의 공개 주소는 이 변경 머지·배포 후 제공됨.
- 모든 실제 기기·PDF 앱을 시험한 것은 아니며 에뮬레이션·렌더러 검증이다. 고정 A4 문서이며 화면 맞춤·확대는 뷰어가 제공한다.
- 독립 코드 리뷰의 Critical/Important blocker 없음.

### 포트폴리오 PDF 전체 페이지 배경 수정

- 사용자 Desktop의 이력서·포트폴리오 PDF를 비교. 이력서는 여백까지 크림색, 포트폴리오는 인쇄 여백이 흰색임을 확인.
- 본문 배경 외에 `@page` 배경을 지정해 인쇄 여백과 푸터 영역도 같은 배경색으로 출력.
- 수정된 26페이지의 네 모서리와 여백 가장자리 색상을 검사해 이력서와 동일함을 확인. PyMuPDF·PDFKit 전체 페이지 렌더 성공, 표지·이어지는 본문·마지막 페이지 시각 확인.
- Pages 빌드 통과. A4 26페이지 유지.


## 회사별 사례 구분·레거시 내용 보강 (2026-10-05)

- 웹 Projects와 PDF 목차를 Purple Academy 7개, 인베스티 2개, 개인/팀 2개 사례로 구분했다. 상세 소속 표시와 다음 사례 순서도 같은 그룹을 따른다.
- lint·단위 테스트 11건·Next 빌드·Pages 경로를 적용한 정적 빌드 통과. E2E 20건에서 320/390/768/1024/1440px와 그룹별 사례 수, 기존 라우팅·JS 미사용·다운로드를 확인했다.
- Projects 페이지 WCAG A/AA 자동 검사 통과. 390/1440px 스크린샷과 회사별 상세 다음 링크를 확인했다.
- Chromium/WebKit에서 320/390/768/1440px의 이력서·포트폴리오 PDF 다운로드 파일 SHA-256이 생성 원본과 일치했다. 파일명·PDF MIME·JS 미사용 다운로드도 확인했다.
- 포트폴리오 27페이지 전체를 렌더링해 목차·배경·페이지 구분을 확인했다. 텍스트는 A4 영역 안에 있고 대체문자가 없으며 전체 페이지의 네 모서리 안쪽에 테마 배경이 유지된다. 이력서는 기존 3페이지다.
- 별도 읽기 전용 리뷰에서 차단 이슈 없음. 상세 다음 링크가 기존 평면 순서를 따르던 지적을 수정하고 정적 페이지에서 Purple Academy 다음 Search & Performance 링크를 검증했다.
- Hanwha/Co-Play PR 접근 여부는 확인되지 않아 PR 조사 완료로 주장하지 않는다. D’art PR·MemoLinx 이슈/커밋 검토 범위는 research.md에 기록했다.
