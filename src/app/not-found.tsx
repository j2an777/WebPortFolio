import { TextLink } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found container">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>
        404<span className="accent">.</span>
      </h1>
      <p>
        찾으시는 페이지가 없습니다.
        <br />
        프로젝트 목록에서 다른 경험을 살펴보세요.
      </p>
      <TextLink href="/projects">프로젝트 보기</TextLink>
    </section>
  );
}
