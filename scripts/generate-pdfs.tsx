import React from "react";
import sharp from "sharp";
import { projects } from "../src/content/portfolio";
import { PortfolioPrint } from "../src/components/portfolio-print";
import { resume } from "../src/content/resume";
import { renderToStaticMarkup } from "react-dom/server";
import { chromium } from "@playwright/test";
import {
  readFile,
  writeFile,
  mkdir,
  mkdtemp,
  copyFile,
  rm,
} from "node:fs/promises";
import { resolve, join } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { ResumePrint } from "../src/components/resume-print";
import { getSiteConfig } from "../src/lib/seo";

async function generatePdfs() {
  const directory = await mkdtemp(join(tmpdir(), "j2an-resume-"));
  const publicUrl = pathToFileURL(resolve("public")).href;
  const imageDirectory = join(directory, "images");
  await mkdir(imageDirectory);
  for (const src of [
    resume.portrait,
    ...new Set(projects.map((project) => project.image)),
  ]) {
    const target = join(
      imageDirectory,
      src
        .split("/")
        .pop()!
        .replace(/\.(webp|svg)$/, ".jpg"),
    );
    await sharp(resolve("public" + src))
      .flatten({ background: "#ebe7df" })
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(target);
  }
  const fontCss = `@font-face{font-family:ResumeKR;src:url("${publicUrl}/fonts/noto-sans-kr-regular.woff2") format("woff2");font-weight:400} @font-face{font-family:ResumeLatin;src:url("${publicUrl}/fonts/dm-sans-latin-variable.woff2") format("woff2");font-weight:100 900}`;
  const site = getSiteConfig();
  const siteUrl = site.configured
    ? site.siteUrl
    : "https://j2an777.github.io/WebPortFolio";
  const assetRoot = pathToFileURL(directory).href;
  const documents = [
    { name: "resume", title: "하승진 · 프론트엔드 개발자 이력서", content: <ResumePrint siteUrl={siteUrl} assetRoot={assetRoot} /> },
    { name: "portfolio", title: "하승진 · 프론트엔드 개발자 포트폴리오", content: <PortfolioPrint siteUrl={siteUrl} assetRoot={assetRoot} /> },
  ];
  const browser = await chromium.launch();
  try {
    await mkdir("output/pdf", { recursive: true });
    for (const item of documents) {
      const css = await readFile(`src/components/${item.name}-print.css`, "utf8");
      const document = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>${item.title}</title><style>${fontCss}\n${css}</style></head><body>${renderToStaticMarkup(item.content)}</body></html>`;
      const html = join(directory, `${item.name}.html`);
      await writeFile(html, document);
      const page = await browser.newPage();
      await page.goto(pathToFileURL(html).href);
      await page.evaluate(() => window.document.fonts.ready);
      await page.waitForFunction(() =>
        Array.from(window.document.images).every(
          (image) => image.complete && image.naturalWidth > 0,
        ),
      );
      if (item.name === "resume") {
        const sizes = await page.locator(".print-page").evaluateAll((pages) =>
          pages.map((page) => ({
            height: page.clientHeight,
            content: page.scrollHeight,
            footerTop: page.querySelector("footer")!.getBoundingClientRect().top,
            contentBottom: Math.max(
              ...Array.from(page.children)
                .filter((child) => child.tagName !== "FOOTER")
                .map((child) => child.getBoundingClientRect().bottom),
            ),
          })),
        );
        if (
          sizes.some(
            (size) =>
              size.content > size.height + 1 ||
              size.contentBottom > size.footerTop - 12,
          )
        )
          throw new Error(`Resume page overflow: ${JSON.stringify(sizes)}`);
      }
      await mkdir(`public/${item.name}`, { recursive: true });
      const filename = `seungjin-ha-${item.name}.pdf`;
      await page.pdf({
        path: `output/pdf/${filename}`,
        preferCSSPageSize: true,
        printBackground: true,
        tagged: true,
        ...(item.name === "portfolio" ? {
          margin: { top: "18mm", right: "16mm", bottom: "20mm", left: "16mm" },
          displayHeaderFooter: true,
          headerTemplate: "<span></span>",
          footerTemplate: '<div style="font-family:Arial,sans-serif;font-size:8px;color:#69655f;width:100%;margin:0 16mm;display:flex;justify-content:space-between"><span>J2AN / FRONTEND DEVELOPER · PORTFOLIO</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
        } : {}),
      });
      await copyFile(`output/pdf/${filename}`, `public/${item.name}/${filename}`);
      await page.close();
      console.log(`Generated searchable ${item.name} PDF and public download.`);
    }
  } finally {
    await browser.close();
    await rm(directory, { recursive: true, force: true });
  }
}
generatePdfs().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
