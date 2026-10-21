# Purple Academy 서비스별 구성

2026-10-21 사용자 요청에 따라 기술 주제별 사례 7개를 실제 참여 서비스 5개로 정리했다. 서비스의 전체 개발과 본인이 맡은 기능을 구분한다.

| 표시 이름 | 코드·저장소 범위 | 주요 참여 작업 |
| --- | --- | --- |
| PurpleAcademyWeb | purple-mono: web·web-api | 신청·결제·인증, 서버 렌더링·검색, 브랜드 공통 UI·콘텐츠 캐시 갱신 |
| 퍼플아카데미 학습앱 | purple-mono: app·app-api, 관련 admin 화면 | 학습앱 내부 ReadingLab 콘텐츠의 독해·어휘 퀴즈 및 제작·검수·개정 이력 연동 |
| Admin | purple-mono: admin·admin-api | CRM·T관리 학생 상세 공통화, 대시보드 집계, CS 템플릿·알림톡·동의 이력 |
| PurpleEnglish | purple-mono: eng·eng-api·eng-app·eng-app-api | 브랜드·학습앱 이관, 인증·결제·자녀별 조회·학습 인터랙션 |
| PurpleAcademyApp | AndroidPurpleAcademyApp, 학습 웹 연계 | React Native 웹뷰, Android 공용 폴더 다운로드·복구·스플래시 개선 |

## 이번 대조

- 현재 연결 계정의 표시 이름은 `p-seungjin`, GitHub 사용자 ID는 `274976780`이다. 이전 조사에 기록된 `purple-fe-seungjin`과 동일 ID다. 이전 로그인 이름으로 작성자 검색하면 422 응답이 발생해 현재 이름으로 재조회했다.
- purple-mono 현재 기본 브랜치의 루트 package.json과 로컬 체크아웃의 apps 목록·README를 대조했다. 웹·학습앱·관리자·퍼플잉글리시 웹/앱과 API가 각각 구분돼 있다.
- [#4345](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/4345): 본인 작성·병합 확인. ReadingLab은 app 학생 화면과 admin 제작·검수·개정 이력 작업이다. 독립 서비스나 학습앱 전체 구축으로 표현하지 않는다.
- [#7255](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/7255): 본인 작성·병합, 본문·diff 대조. 브랜드 웹의 SEO·서버 렌더링 작업이다.
- [#8437](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/8437): 본인 작성·병합, 본문·diff 대조. 관리자 대시보드의 DB 왕복 감소이며 운영 응답시간 개선율이 아니다.
- [#9226](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9226): 본인 작성·병합, 본문·제공된 diff 대조. 관리자 학생 상세 공통화다.
- [#9626](https://github.com/PurpleAcademy-co-kr/purple-mono/pull/9626): 본인 작성·병합, 본문·diff 대조. eng의 인증 중복 조회 제거이며 로컬 모의 API 검증이다.
- 모바일 별도 저장소는 이번 연결 도구와 gh 조회에서 404를 반환했다. 기존 포트폴리오에 확인 기록과 근거 링크가 있는 작업을 유지하고 사용자 지정 서비스명만 반영했다. 새 기여·성과를 추정해 추가하지 않았다.

## 화면과 링크

Search & Performance는 PurpleAcademyWeb으로, Shared Systems의 관리자 공통화는 Admin으로 통합했다. 퍼플잉글리시의 조회·검색 작업은 PurpleEnglish에 둔다. 기존 상세 URL 2개는 정적 페이지와 소셜 이미지 생성에 포함하고 해당 서비스 본문·canonical을 사용해 기존 링크를 보존한다.

이력서 Selected Projects는 회사 참여 범위를 요약하고 세부 프로젝트 목록에서 5개 서비스로 연결한다. 인베스티·D’art 설명은 사용자가 제공한 기존 PDF의 2~4페이지 및 기존 프로젝트 기록에서 해결 방식과 결과를 추려 4개 항목씩 보강했다. 원본 PDF·연락처·비공개 코드 전체는 저장소에 추가하지 않는다.
