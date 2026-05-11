import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const outputDir = path.resolve(process.cwd(), ".ref", "antigravity-animation-frames");
const viewport = { width: 1440, height: 1100 };
const frameDelays = [0, 250, 500, 750, 1000];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  colorScheme: "dark",
  deviceScaleFactor: 1,
  viewport
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

  const positions = [
    0,
    900,
    1800,
    2700,
    3600,
    5200,
    7000,
    8600,
    metrics.documentScrollHeight - metrics.viewportHeight
  ];

  for (const requestedY of positions) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), requestedY);

    const actualY = await page.evaluate(() => Math.round(window.scrollY));
    const viewportDir = path.join(outputDir, `viewport-y-${String(actualY).padStart(5, "0")}`);
    await mkdir(viewportDir, { recursive: true });

    let lastDelay = 0;
    for (const delay of frameDelays) {
      await page.waitForTimeout(delay - lastDelay);
      lastDelay = delay;

      await page.screenshot({
        animations: "allow",
        fullPage: false,
        path: path.join(viewportDir, `frame-${String(delay).padStart(4, "0")}ms.png`)
      });
      console.log(`saved y=${actualY} frame=${delay}ms`);
    }
  }
} finally {
  await context.close();
  await browser.close();
}
