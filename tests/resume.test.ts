import assert from "node:assert/strict";
import test from "node:test";
import { resume, resumePdf } from "../src/content/resume";
import { navigation, projects } from "../src/content/portfolio";
import { withBasePath } from "../src/lib/paths";
test("resume keeps employment separate from customer projects and activity dates", () => {
  const employment = resume.careers.filter((item) => item.kind === "재직 경력");
  assert.equal(employment.length, 1);
  assert.equal(employment[0].name, "(주) 인베스티");
  assert(!employment.some((item) => item.name.includes("Hanwha")));
  assert.equal(
    resume.careers.find((item) => item.name === "Purple Academy")?.kind,
    "개발 활동 기록",
  );
  for (const item of resume.projects)
    assert(projects.some((project) => project.slug === item.slug));
});
test("home, resume and PDF remain distinct under GitHub Pages", () => {
  assert.equal(navigation.find((item) => item.label === "About Me")?.href, "/");
  assert.equal(
    navigation.find((item) => item.label === "Resume")?.href,
    "/resume",
  );
  assert.equal(
    withBasePath(resumePdf, "/WebPortFolio"),
    "/WebPortFolio/resume/seungjin-ha-resume.pdf",
  );
  assert.equal(resume.profile.instagram, "https://www.instagram.com/hs_j2an/");
  assert.equal(resume.profile.blog, "https://velog.io/@j2an/posts");
});
