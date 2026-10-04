import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../../src/content/portfolio";

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`responsive navigation and all project cards at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Hello/ })).toBeVisible();
    await expect(
      page.getByRole("img", { name: "하승진 프로필 사진" }),
    ).toBeVisible();
    await expect(page.locator("nav a")).toHaveCount(5);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await page
      .locator("nav")
      .getByRole("link", { name: "Projects", exact: true })
      .click();
    await expect(page).toHaveURL("/projects");
    await expect(page.locator(".project-card")).toHaveCount(projects.length);
    await expect(page.locator(".route-curtain")).toBeHidden();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await page
      .getByRole("link", { name: /Purple Academy/ })
      .first()
      .click();
    await expect(page).toHaveURL("/work/purple-academy");
    await expect(
      page.getByRole("heading", { name: "Purple Academy.", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".route-curtain")).toBeHidden();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  });
}

test("routing transitions recover on history and repeated navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("nav").getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL("/experience");
  await expect(page.locator(".route-curtain")).toBeHidden();
  await expect(page.locator("#main")).toBeFocused();
  await page.locator("nav").getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL("/contact");
  await page.goBack();
  await expect(page).toHaveURL("/experience");
  await expect(page.locator(".route-curtain")).toBeHidden();
  await page.locator("nav").getByRole("link", { name: "About Me" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.locator(".route-curtain")).toBeHidden();
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL("/#projects");
});

test("reduced motion keeps content visible and bypasses route curtains", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("nav").getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL("/contact");
  await expect(page.locator(".route-curtain")).toBeHidden();
  await expect(
    page.getByRole("link", { name: /ha99104@gmail.com/ }),
  ).toBeVisible();
  await page.goto("/work/android-webview");
  await expect(page.getByRole("heading", { name: /흰 화면/ })).toHaveCSS(
    "opacity",
    "1",
  );
});

test("server content, navigation and case studies work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3100");
  await expect(page.getByRole("heading", { name: /Hello/ })).toBeVisible();
  await page
    .locator("nav")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await page
    .getByRole("link", { name: /HanwhaVision STEP/ })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: /토큰 재발급과 페이지/ }),
  ).toBeVisible();
  await context.close();
});

test("all direct case routes, 404, metadata and discovery endpoints are valid", async ({
  request,
}) => {
  for (const project of projects) {
    const response = await request.get(`/work/${project.slug}`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(project.name.replaceAll("&", "&amp;"));
    expect(html).toContain("application/ld+json");
  }
  const invalid = await request.get("/work/not-a-real-project");
  expect(invalid.status()).toBe(404);
  expect(await invalid.text()).toContain("noindex");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("<url>");
  expect(await (await request.get("/llms.txt")).text()).toContain(
    "Beyond the WebView",
  );
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  const caseOg = await request.get("/work/purple-academy/opengraph-image");
  expect(caseOg.status()).toBe(200);
});

for (const path of ["/", "/contact", "/work/operations-platform"]) {
  test(`WCAG A/AA automated scan ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
}

test("long project names fit a 320px screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects");
  await page
    .locator(".project-title-row h3 a")
    .first()
    .evaluate((element) => {
      element.textContent =
        "ExtremelyLongUnbrokenProjectNameForResponsiveValidation";
    });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.goto("/work/operations-platform");
  await page.locator(".next-project h2").evaluate((element) => {
    element.textContent =
      "ExtremelyLongUnbrokenNextProjectNameForResponsiveValidation";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
