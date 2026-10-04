# GitHub Pages 배포

기본 주소: https://j2an777.github.io/WebPortFolio/

## 최초 설정

1. 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
2. `.github/workflows/pages.yml`을 포함한 PR을 `main`에 머지합니다.
3. Actions의 **Deploy portfolio to GitHub Pages** 작업이 성공하면 위 주소에서 확인합니다.

이후 `main`에 push하면 자동으로 다시 배포합니다. 필요하면 Actions에서 Run workflow로 재실행합니다. `github-pages` 환경은 `main`만 배포하도록 보호됩니다.

## 원하는 도메인

`j2an777Developer.io`는 무료 GitHub Pages 주소가 아니라 별도로 등록해야 하는 도메인입니다. 도메인 이름의 대소문자는 구별하지 않습니다. 소유 여부와 구매 가능 여부는 확인하지 않았습니다.

소유한 뒤 GitHub 공식 문서에 따라 도메인 소유권 검증, DNS 설정, Settings → Pages → Custom domain 설정, Enforce HTTPS를 진행합니다. 워크플로를 다시 실행하면 Pages 설정의 origin과 base_path를 읽어 커스텀 도메인에 맞는 링크를 생성합니다. 소유하지 않은 도메인을 미리 설정하지 않습니다.

https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## 렌더링과 이미지

GitHub Pages는 정적 호스팅이므로 런타임 SSR을 실행하지 않습니다. 소개와 11개 프로젝트는 빌드 시 서버 컴포넌트에서 HTML로 생성합니다. JavaScript 없이도 본문을 읽을 수 있습니다. GSAP 애니메이션과 경로 전환은 브라우저에서 실행합니다.

Next.js 이미지 최적화 서버 대신 `sharp`로 반응형 WebP를 빌드 전에 생성합니다. OG 이미지는 `.png` 파일로 내보내 올바른 이미지 MIME 타입으로 제공합니다. 생성 자산은 커밋하지 않고 Actions에서 생성합니다.

`SITE_URL`은 경로 없는 origin, `NEXT_PUBLIC_BASE_PATH`는 저장소 경로입니다. `actions/configure-pages`가 두 값을 제공합니다. 검색 색인은 공개 HTTPS 배포에서만 활성화됩니다.

로컬 정적 빌드:

```sh
SITE_URL=https://j2an777.github.io NEXT_PUBLIC_BASE_PATH=/WebPortFolio SITE_INDEXABLE=true pnpm build:pages
```

산출물은 `out/`이며, `/WebPortFolio/` 경로에 마운트한 정적 서버에서 확인합니다. 일반 `pnpm build`와 `pnpm start`는 Next 서버 환경을 계속 지원합니다.
