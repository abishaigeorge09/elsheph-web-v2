import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const BASE = "http://127.0.0.1:3111";
// fileURLToPath, not .pathname: the repo path contains spaces.
const OUT = fileURLToPath(new URL("../.research/shots/", import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const report = {};

await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.screenshot({ path: `${OUT}p2-home-1440.png`, fullPage: true });

report.bodyBg = await page.evaluate(
  () => getComputedStyle(document.body).backgroundColor,
);
report.bodyColor = await page.evaluate(
  () => getComputedStyle(document.body).color,
);
report.h1Font = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  return h1 ? getComputedStyle(h1).fontFamily : null;
});
report.headerHeight = await page.evaluate(() => {
  const header = document.querySelector("header");
  return header ? getComputedStyle(header).height : null;
});
report.shellMaxWidth = await page.evaluate(() => {
  const shell = document.querySelector(".shell");
  return shell ? getComputedStyle(shell).maxWidth : null;
});
report.accentUtility = await page.evaluate(() => {
  const probe = document.createElement("div");
  probe.className = "text-accent bg-surface border-border";
  document.body.appendChild(probe);
  const cs = getComputedStyle(probe);
  const out = {
    color: cs.color,
    background: cs.backgroundColor,
    borderColor: cs.borderTopColor,
  };
  probe.remove();
  return out;
});
report.placeholderHrefs = await page.evaluate(() =>
  Array.from(document.querySelectorAll("a[href='#']")).length,
);
report.unconfirmedLeak = await page.evaluate(() => {
  const text = document.body.innerText;
  return ["Atlitos", "Atlitos Life Pvt Ltd", "Hymn Mobile"].filter((needle) =>
    text.includes(needle),
  );
});
report.navHrefs = await page.evaluate(() =>
  Array.from(document.querySelectorAll("header a")).map((a) =>
    a.getAttribute("href"),
  ),
);

// Command palette
await page.keyboard.press("Meta+k");
await page.waitForTimeout(600);
report.paletteOpen = await page.evaluate(
  () => !!document.querySelector("[cmdk-root]"),
);
report.paletteItems = await page.evaluate(() =>
  Array.from(document.querySelectorAll("[cmdk-item]")).map((n) =>
    n.textContent?.trim(),
  ),
);
await page.screenshot({ path: `${OUT}p2-palette-1440.png` });
await page.keyboard.press("Escape");

// Mobile drawer
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`${BASE}/`, { waitUntil: "networkidle" });
await mobile.click("button[aria-label='Open menu']");
await mobile.waitForTimeout(600);
report.sheetOpen = await mobile.evaluate(
  () => !!document.querySelector("[data-slot='sheet-content']"),
);
await mobile.screenshot({ path: `${OUT}p2-mobile-menu-390.png` });

// Redirect
const res = await mobile.goto(`${BASE}/university-collaboration`, {
  waitUntil: "domcontentloaded",
});
report.redirectFinalUrl = res?.url();

// University route still renders
await mobile.goto(`${BASE}/university`, { waitUntil: "networkidle" });
report.universityHasContent = await mobile.evaluate(
  () => document.body.innerText.length > 500,
);

console.log(JSON.stringify(report, null, 2));
await browser.close();
