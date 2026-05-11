import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const outputDir = path.resolve(process.cwd(), ".ref", "antigravity-scroll-audit");

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  deviceScaleFactor: 1
});
const page = await context.newPage();

try {
  await page.goto("https://antigravity.google/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2000);

  const metrics = await page.evaluate(() => ({
    documentScrollHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight
  }));

  const positions = [0, 900, 1800, 2700, 3600, 5200, 7000, 8600, metrics.documentScrollHeight - metrics.viewportHeight];

  for (const y of positions) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(700);
    const actualY = await page.evaluate(() => window.scrollY);
    await page.screenshot({
      animations: "disabled",
      fullPage: false,
      path: path.join(outputDir, `viewport-y-${String(Math.round(actualY)).padStart(5, "0")}.png`)
    });
    console.log(`saved viewport at y=${actualY}`);
  }
} finally {
  await context.close();
  await browser.close();
}
