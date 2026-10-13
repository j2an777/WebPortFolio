# Purple Academy 성과 근거 재조사

기준일: 2026-10-12. 대상: `PurpleAcademy-co-kr/purple-mono`, 작성자 `purple-fe-seungjin`.

## 조사 범위

GitHub 연결 계정으로 작성자 기준 PR을 전체 상태에서 페이지 순회 수집했다. 요청 한도는 10,000건, 반환은 979건이며 기간은 2026-04-13~2026-10-12다. 모든 반환 항목의 작성자는 `purple-fe-seungjin`으로 대조했다.

- 전체 979건: 병합 951건, 병합 없이 닫힘 27건, 열림 1건.
- 병합 PR의 base: `dev`·`main` 및 작업 브랜치가 혼재한다. 동일 head 이름 기준으로 906개 그룹이며 반복 PR 45건이 존재한다. 이 수치는 독립 기능 수가 아니다.
- 제목·본문·작성자·상태·기간·base/head 전체를 선별 대상으로 삼았고, 핵심 7개 PR은 코드 diff와 변경 통계까지 별도로 대조했다.
- 이전 2026-10-05 조사의 개인 계정 `j2an777` 작성분과 다른 작성자의 담당 지정분은 이번 979건에 포함하지 않는다. 기존 근거가 있는 입학·결제 사례는 유지했다.
- 모든 코드 diff나 운영 로그를 전수 검증한 것은 아니다. 아래 성과는 당시 기록이며 이번에 운영 서비스를 재측정한 값이 아니다.
- 비공개 PR 원문·코드·댓글·전체 목록은 개인 저장소에 게시하지 않는다. 원천 수집본과 항목별 분류는 작업자의 로컬 비공개 조사 자료에 보존했다.

## 콘텐츠에 반영한 성과

| 근거 | 문제와 변경 | 확인한 수치 | 해석과 한계 |
| --- | --- | --- | --- |
| [#8437](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/8437) | 반복 집계 통합, 요청 내 Promise 공유, DB별 기간 매출 UNION ALL | 상단 DB 왕복 20~21→10~11회, 매출 9→2회, 정규 재원 관계 조인 10→3개 | 각각 47.6~50%, 77.8%, 70% 감소. 코드 경로의 횟수이며 지연시간·매출 증가율 아님. 캐시 없이 기준 시각 유지 |
| [#8974](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/8974) | 반복 상관 집계를 상태 그룹 조회와 최신 동의 조회로 변경 | 60초 후 취소되던 요약 요청에 대응. 당시 약 2.6만 명 대상 핵심 그룹 조회 767ms | 핵심 쿼리 단일 실측. 전체 요청 60초→767ms, 98.7% 개선, p95로 표현하지 않음 |
| [#9226](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9226) | CRM·T관리 학생 상세 공통 모듈화 | 동일 구현 50개·10,401줄, 정책 차이 9개 보존 | 공통 수정 지점 2→1곳. 10,401줄은 중복 구현 규모. PR 전체 순감은 9,425줄(+1,124/−10,549)로 별도 값이며 본문에는 공통화 규모만 사용. 실제 화면 픽셀 비교 미실행 |
| [#7580](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/7580) | 구형 컴포넌트 8개 삭제, 활성 참조 10곳 교체, API 경계 검사 | +1,182/−5,346 = 4,164줄 순감. 기존 예외 432건을 검사 기준으로 고정 | 신규 위반과 해결 후 남은 예외 검출. 개발 시간 절감률로 환산하지 않음. 당시 전체 lint/build는 기존 오류로 실패, 변경 관련 테스트와 E2E는 통과 |
| [#9626](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9626) | 동시 세션 요청 공유와 부모 로그인 정보 전달 | 4개 마이페이지 화면의 인증 조회 3→1회, 66.7% 감소 | 로컬 dev·300ms 지연 모의 API·화면별 3회. 전후 각각 12회 반복. 운영 latency 측정 아님 |
| [#9789](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9789) | 인증 목 TTL·리셋 상수·전역 요청 목·변경된 검증 조건 수정 | E2E 22건 중 21건 실패→22건 전체 통과, 3회 연속. 실행 약 4분→40초 | 같은 로컬 모의 API 조건의 회귀 검증 복구. 사이트 속도·실제 PG 성공률로 확대하지 않음 |
| [#7255](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/7255) | SSR 본문·JSON-LD·sitemap·이미지 접근성 정비 | 당시 공개 페이지 alt 누락 33→0건 | 접근성 결함 수. 검색 유입·색인 순위·AI 인용 증가율 미측정 |

7개 모두 작성자·병합 여부·병합 시각과 diff를 확인했다. 신규 수치를 요약 이력서와 Purple Academy에 우선 배치하고, Shared Systems·Operations Platform·Purple English의 관련 상세에 같은 정의로 반영했다. 회사 전체 성과를 프로젝트별로 합산하지 않는다.

감소율은 `(변경 전 - 변경 후) / 변경 전 × 100`이다. 20→10은 50%, 21→11은 47.6%, 9→2는 77.8%, 3→1은 66.7%다.

## 추가로 발견한 후보

다음은 본문·병합 상태까지 확인한 추가 후보다. 핵심 7건과 달리 이번 조사에서 diff를 별도 대조하지 않았고, 이력서 대표 성과에는 추가하지 않았다.

| PR | 후보 수치 | 판단 |
| --- | --- | --- |
| [#9755](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9755) | TypeORM 엔티티 447개 대조, 마이그레이션 누락 컬럼 4→0개 | 개발환경·배포 오류 예방 사례. 운영 장애 4건 감소로 해석하지 않음 |
| [#9757](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9757) | Semgrep 새 위반 검사 약 5초, 기존 위반 508건은 기준선 처리 | 검사 시간이며 개발 생산성 향상 비율 아님 |
| [#9792](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9792) | 최대 파일 1,994→413줄, DOM 비교 28/28 일치 | 유지보수 경계 개선. 모바일 비교 제외, 전체 코드량 감소와 구분 |
| [#9707](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9707) | 결제 화면 1,154→781줄, 컴포넌트 내 effect 5→3개 | 파일 분리·책임 정리, 성능 지표 아님 |
| [#9636](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9636) | 첫 방문 로그아웃 요청 1→0회 | 로컬 동작 측정, 신규 방문 UX 개선 |
| [#9727](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9727)·[#9728](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9728)·[#9729](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9729) | CS 3개 화면의 목록·집계 조회 분리 | 페이지 이동·정렬·행 수 변경 시 집계 추가 호출 제거. 응답시간 수치 없음 |
| [#7297](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/7297) | 렌더 차단 폰트 요청 3개 제거 | LCP·FCP 개선율 없음 |
| [#6864](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/6864) | BFF 전환, getSession 호출 지점 6곳 제거 | 248개 호출 지점은 코드 규모이며 실제 요청 감소량과 구분 |
| [#8849](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/8849) | 답변 템플릿 28종 | 기존 운영 사례 유지. 응대 시간 단축률 없음 |

파일 수·커밋 수·테스트 총 통과 수만으로 사용자 영향이나 생산성 향상을 주장하지 않는다. 열려 있는 #9863은 완료 성과에서 제외했다. 되돌리기·재적용 및 main/dev 반복 PR은 독립 성과로 합산하지 않았다.

## 작성·출력 원칙

기존 월 단위 경력·학력·연락처·사진을 유지했다. Purple Academy의 2026.01은 이전 원천의 개발 활동 기간이며 이번 계정 PR의 시작일이나 확정 입사일로 바꾸지 않았다. 측정 조건은 짧은 이력서에도 표시하고 상세 페이지에서 풀어 설명한다.

`src/content/resume.ts`와 `src/content/portfolio.ts`가 웹과 PDF의 공통 원천이다. PDF는 기존 생성기로 재생성하며 main 병합 시 GitHub Pages workflow에서 최신 콘텐츠와 다운로드 파일을 함께 생성한다. 생성 PDF 자체는 기존 gitignore 정책에 따라 커밋하지 않는다.

## 검증 결과

- ESLint 통과, 기존 소스 테스트 10건 통과, Playwright 20건 통과(320~1440px, 다운로드·접근성·JS 비활성 포함).
- production build 및 GitHub Pages 환경의 정적 export 35개 페이지 통과. export의 최신 성과 본문·base path·PDF 파일 헤더 확인.
- 이력서 3페이지·포트폴리오 26페이지 생성, 텍스트 추출·이미지 렌더 확인. 이력서 첫 페이지 분량 초과는 문장 압축 후 해소.
- 390·1440px 이력서·Purple Academy 상세 캡처, 가로 넘침 없음·전체 이미지 로딩 확인.
- Windows에서 기존 `pnpm test`의 셸 glob과 `pnpm build:pages`의 POSIX 환경변수 문법이 실패하여, 테스트 파일을 명시적으로 열거하고 PowerShell 환경변수를 사용해 동일한 검증을 수행했다. 기존 Linux Pages workflow의 스크립트는 변경하지 않았다.
