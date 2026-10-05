import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { projects } from "../src/content/portfolio";
import { PortfolioPrint } from "../src/components/portfolio-print";

test("portfolio print includes source edits and new projects without a second content list", () => {
  const paragraphs = projects[0].sections[0].paragraphs;
  const originalCount = projects.length;
  paragraphs.push("자동 반영 확인용 새 설명");
  projects.push({ ...projects[0], slug: "new-case", name: "새 프로젝트" });
  try {
    const html = renderToStaticMarkup(createElement(PortfolioPrint, {
      siteUrl: "https://j2an777.github.io/WebPortFolio",
      assetRoot: "file:///assets",
    }));
    assert(html.includes("자동 반영 확인용 새 설명"));
    assert(html.includes("새 프로젝트"));
    assert(html.includes("https://j2an777.github.io/WebPortFolio/work/new-case/"));
    assert.equal((html.match(/class="portfolio-case"/g) ?? []).length, originalCount + 1);
  } finally {
    paragraphs.pop();
    projects.pop();
  }
});
