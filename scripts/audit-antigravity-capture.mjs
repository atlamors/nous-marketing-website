import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  deviceScaleFactor: 1
});
const page = await context.newPage();

function log(label, value) {
  console.log(`\n--- ${label} ---`);
  console.log(typeof value === "string" ? value : JSON.stringify(value, null, 2));
}

try {
  await page.goto("https://antigravity.google/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2000);

  log("initial metrics", await page.evaluate(() => ({
    bodyClientHeight: document.body.clientHeight,
    bodyOffsetHeight: document.body.offsetHeight,
    bodyScrollHeight: document.body.scrollHeight,
    documentClientHeight: document.documentElement.clientHeight,
    documentOffsetHeight: document.documentElement.offsetHeight,
    documentScrollHeight: document.documentElement.scrollHeight,
    scrollingElement: document.scrollingElement?.tagName,
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    scrollY: window.scrollY
  })));

  log("body/html computed styles", await page.evaluate(() => {
    const html = window.getComputedStyle(document.documentElement);
    const body = window.getComputedStyle(document.body);
    return {
      body: {
        height: body.height,
        overflow: body.overflow,
        overflowY: body.overflowY,
        position: body.position
      },
      html: {
        height: html.height,
        overflow: html.overflow,
        overflowY: html.overflowY,
        position: html.position
      }
    };
  }));

  log("large/fixed elements", await page.evaluate(() => {
    return [...document.querySelectorAll("body *")]
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          className: String(el.className).slice(0, 120),
          height: Math.round(rect.height),
          id: el.id,
          overflowY: style.overflowY,
          position: style.position,
          scrollHeight: el.scrollHeight,
          tag: el.tagName,
          top: Math.round(rect.top)
        };
      })
      .filter((item) => item.height > 1000 || item.scrollHeight > 1400 || item.position === "fixed" || item.overflowY === "auto" || item.overflowY === "scroll")
      .slice(0, 40);
  }));

  const positions = [0, 800, 1600, 2400, 4000, 8000];
  for (const y of positions) {
    await page.evaluate((scrollTop) => window.scrollTo(0, scrollTop), y);
    await page.waitForTimeout(500);
    log(`after window scrollTo(${y})`, await page.evaluate(() => ({
      bodyScrollTop: document.body.scrollTop,
      documentScrollTop: document.documentElement.scrollTop,
      scrollY: window.scrollY,
      visibleTextSample: document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.textContent?.trim().slice(0, 180)
    })));
  }

  log("possible custom scrollers", await page.evaluate(() => {
    return [...document.querySelectorAll("body *")]
      .map((el, index) => {
        const style = window.getComputedStyle(el);
        return {
          className: String(el.className).slice(0, 160),
          clientHeight: el.clientHeight,
          id: el.id,
          index,
          overflowY: style.overflowY,
          scrollHeight: el.scrollHeight,
          tag: el.tagName
        };
      })
      .filter((item) => item.scrollHeight > item.clientHeight + 100)
      .sort((a, b) => b.scrollHeight - a.scrollHeight)
      .slice(0, 20);
  }));
} finally {
  await context.close();
  await browser.close();
}
