import React from "react";
import sharp from "sharp";
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

async function generateResume() {
  const directory = await mkdtemp(join(tmpdir(), "j2an-resume-"));
  const publicUrl = pathToFileURL(resolve("public")).href;
  const imageDirectory = join(directory, "images");
  await mkdir(imageDirectory);
  for (const src of [
    "/images/profile.webp",
    ...resume.projects.map((project) => project.image),
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
      .resize({ width: 480, withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(target);
  }
  const css = await readFile("src/components/resume-print.css", "utf8");
  const fontCss = `@font-face{font-family:ResumeKR;src:url("${publicUrl}/fonts/noto-sans-kr-regular.woff2") format("woff2");font-weight:400} @font-face{font-family:ResumeLatin;src:url("${publicUrl}/fonts/dm-sans-latin-variable.woff2") format("woff2");font-weight:100 900}`;
  const site = getSiteConfig();
  const siteUrl = site.configured
    ? site.siteUrl
    : "https://j2an777.github.io/WebPortFolio";
  const document = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>하승진 · 프론트엔드 개발자 이력서</title><style>${fontCss}\n${css}</style></head><body>${renderToStaticMarkup(<ResumePrint siteUrl={siteUrl} assetRoot={pathToFileURL(directory).href} />)}</body></html>`;
  const html = join(directory, "resume.html");
  await writeFile(html, document);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(html).href);
    await page.evaluate(() => window.document.fonts.ready);
    await page.waitForFunction(() =>
      Array.from(window.document.images).every(
        (image) => image.complete && image.naturalWidth > 0,
      ),
    );
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
    await mkdir("output/pdf", { recursive: true });
    await mkdir("public/resume", { recursive: true });
    await page.pdf({
      path: "output/pdf/seungjin-ha-resume.pdf",
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
    });
    await copyFile(
      "output/pdf/seungjin-ha-resume.pdf",
      "public/resume/seungjin-ha-resume.pdf",
    );
    console.log(
      "Generated searchable A4 resume PDF (3 pages) and public download.",
    );
  } finally {
    await browser.close();
    await rm(directory, { recursive: true, force: true });
  }
}
generateResume().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
