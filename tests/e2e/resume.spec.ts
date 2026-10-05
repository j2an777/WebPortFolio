import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 390, 768, 1440]) {
  test(`resume is readable and downloads a real PDF at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Hello/, level: 1 }),
    ).toBeVisible();
    await page
      .locator("nav")
      .getByRole("link", { name: "Resume", exact: true })
      .click();
    await expect(page).toHaveURL("/resume");
    await expect(page.locator(".route-curtain")).toBeHidden();
    await expect(
      page.getByRole("heading", { name: /하승진/, level: 1 }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const download = page.waitForEvent("download");
    await page
      .getByRole("link", { name: "하승진 이력서 PDF 다운로드", exact: true })
      .click();
    expect((await download).suggestedFilename()).toBe(
      "하승진_프론트엔드_이력서.pdf",
    );
    await expect(page).toHaveURL("/resume");
    await expect(page.locator(".route-curtain")).toBeHidden();
    const pdf = await page.request.get("/resume/seungjin-ha-resume.pdf");
    expect(pdf.status()).toBe(200);
    expect(pdf.headers()["content-type"]).toContain("application/pdf");
    expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  });
}

test("resume and contact expose confirmed social profiles with accessible links", async ({
  page,
}) => {
  for (const route of ["/resume", "/contact"]) {
    await page.goto(route);
    await expect(
      page.locator('a[href="https://www.instagram.com/hs_j2an/"]').first(),
    ).toHaveAttribute("target", "_blank");
    await expect(
      page.locator('a[href="https://velog.io/@j2an/posts"]').first(),
    ).toHaveAttribute("target", "_blank");
  }
  await page.goto("/resume");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("resume HTML and download remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3100/resume");
  await expect(
    page.getByRole("heading", { name: "(주) 인베스티", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "한림대학교", exact: true }),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "하승진 이력서 PDF 다운로드", exact: true })
    .click();
  await download;
  await context.close();
});
