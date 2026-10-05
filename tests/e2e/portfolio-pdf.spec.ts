import { test, expect } from "@playwright/test";

test("portfolio PDF downloads on home and Projects without navigating away", async ({ page }) => {
  for (const route of ["/", "/projects"]) {
    await page.goto(route);
    const download = page.waitForEvent("download");
    await page.getByRole("link", { name: "포트폴리오 PDF 다운로드", exact: true }).click();
    expect((await download).suggestedFilename().normalize("NFC")).toBe("하승진_프론트엔드_포트폴리오.pdf");
    await expect(page).toHaveURL(route);
  }
  const pdf = await page.request.get("/portfolio/seungjin-ha-portfolio.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
});
