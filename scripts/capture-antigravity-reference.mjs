import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const outputDir = path.resolve(process.cwd(), ".ref");

async function warmScrollAnimations(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const viewportHeight = window.innerHeight;
    const step = Math.max(Math.floor(viewportHeight * 0.8), 480);

    for (let y = 0; y <= documentHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await delay(180);
    }

    window.scrollTo({ top: documentHeight, behavior: "instant" });
    await delay(350);
    window.scrollTo({ top: 0, behavior: "instant" });
    await delay(1000);
  });
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  colorScheme: "dark",
  deviceScaleFactor: 1,
  viewport: { width: 1440, height: 1100 }
});
const page = await context.newPage();

try {
  await page.goto("https://antigravity.google/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(1200);
  await warmScrollAnimations(page);
  await page.screenshot({
    animations: "disabled",
    fullPage: true,
    path: path.join(outputDir, "antigravity-home.png")
  });
  console.log("saved antigravity-home.png");
} finally {
  await context.close();
  await browser.close();
}
