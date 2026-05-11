import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const outputDir = path.resolve(process.cwd(), ".ref");

const baseViewport = { width: 1440, height: 1100 };

async function safeClick(page, locators) {
  for (const locator of locators) {
    try {
      const target = locator(page).first();
      if (await target.isVisible({ timeout: 1400 })) {
        await target.click({ timeout: 2500 });
        await page.waitForTimeout(900);
        return true;
      }
    } catch {
      // Try the next selector.
    }
  }

  return false;
}

async function safeHover(page, locators) {
  for (const locator of locators) {
    try {
      const target = locator(page).first();
      if (await target.isVisible({ timeout: 1400 })) {
        await target.hover({ timeout: 2500 });
        await page.waitForTimeout(900);
        return true;
      }
    } catch {
      // Try the next selector.
    }
  }

  return false;
}

async function goto(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(1200);
}

async function screenshot(page, fileName, fullPage = true) {
  const filePath = path.join(outputDir, fileName);
  await page.screenshot({ animations: "disabled", fullPage, path: filePath });
  console.log(`saved ${fileName}`);
}

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

async function captureSite(browser, name, url, interactions = [], options = {}) {
  const context = await browser.newContext({
    colorScheme: "dark",
    deviceScaleFactor: 1,
    viewport: baseViewport
  });
  const page = await context.newPage();

  try {
    await goto(page, url);
    if (options.warmScroll) {
      await warmScrollAnimations(page);
    }
    await screenshot(page, `${name}-home.png`);

    for (const interaction of interactions) {
      await goto(page, url);
      const didInteract = interaction.type === "click"
        ? await safeClick(page, interaction.locators)
        : await safeHover(page, interaction.locators);

      if (!didInteract) {
        console.warn(`interaction skipped: ${name}/${interaction.file}`);
        continue;
      }

      await screenshot(page, `${name}-${interaction.file}.png`, interaction.fullPage ?? false);
    }
  } catch (error) {
    console.error(`failed ${name}:`, error);
  } finally {
    await context.close();
  }
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();

try {
  await captureSite(browser, "nous", "http://127.0.0.1:3000/", [
    {
      file: "architecture-nav",
      locators: [(page) => page.getByRole("link", { name: "Architecture" })],
      type: "click"
    },
    {
      file: "power-mode-tab",
      locators: [(page) => page.getByRole("button", { name: /Workspace mode/i })],
      type: "click"
    }
  ]);

  await captureSite(browser, "linear", "https://linear.app/", [
    {
      file: "product-menu",
      locators: [(page) => page.getByText("Product", { exact: true }), (page) => page.getByRole("button", { name: /Product/i })],
      type: "hover"
    },
    {
      file: "resources-menu",
      locators: [(page) => page.getByText("Resources", { exact: true }), (page) => page.getByRole("button", { name: /Resources/i })],
      type: "hover"
    }
  ]);

  await captureSite(browser, "antigravity", "https://antigravity.google/", [], { warmScroll: true });

  await captureSite(browser, "cursor", "https://cursor.com/", [
    {
      file: "resources-menu",
      locators: [(page) => page.getByText("Resources", { exact: true }), (page) => page.getByRole("button", { name: /Resources/i })],
      type: "hover"
    },
    {
      file: "enterprise-menu",
      locators: [(page) => page.getByText("Enterprise", { exact: true }), (page) => page.getByRole("button", { name: /Enterprise/i })],
      type: "hover"
    }
  ]);

  await captureSite(browser, "fumadocs", "https://www.fumadocs.dev/", [
    {
      file: "search-menu",
      locators: [
        (page) => page.getByRole("button", { name: /search/i }),
        (page) => page.locator("button[aria-label*='search' i]"),
        (page) => page.getByText(/Search/)
      ],
      type: "click"
    },
    {
      file: "docs-menu",
      locators: [(page) => page.getByText("Docs", { exact: true }), (page) => page.getByRole("link", { name: /Docs/i })],
      type: "hover"
    }
  ]);
} finally {
  await browser.close();
}
