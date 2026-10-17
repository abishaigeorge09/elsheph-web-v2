#!/usr/bin/env node
/**
 * One-shot verification for the founder change set: full-bleed hero carousel,
 * in-place search overlay, restructured menu overlay.
 *
 * Usage: node scripts/verify-founder-pass.mjs [baseUrl] [outDir]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "/tmp/elsheph-founder-pass";
await mkdir(outDir, { recursive: true });

const results = [];
const check = (name, ok, detail = "") =>
  results.push({ name, ok, detail: String(detail) });

const browser = await chromium.launch();

/* (a) non-scroll invariant at three sizes */
for (const [w, h] of [
  [1440, 900],
  [1280, 800],
  [390, 844],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const m = await page.evaluate(() => ({
    sh: document.documentElement.scrollHeight,
    ih: window.innerHeight,
  }));
  check(`non-scroll ${w}x${h}`, m.sh === m.ih, `scrollHeight=${m.sh} innerHeight=${m.ih}`);
  if (w === 1440) await page.screenshot({ path: `${outDir}/hero-1440.png` });
  if (w === 390) await page.screenshot({ path: `${outDir}/hero-390.png` });
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base + "/", { waitUntil: "networkidle" });

/* (b) hero media covers full viewport; text computes to deep ink family */
const media = await page.evaluate(() => {
  const slide = document.querySelector(".hero-slide");
  const r = slide.getBoundingClientRect();
  const h1 = document.querySelector("h1");
  const foot = document.querySelector(".band-media p.text-xs, .band-media .text-xs");
  const deepInk = getComputedStyle(document.documentElement)
    .getPropertyValue("--deep-ink")
    .trim();
  return {
    rect: { x: r.x, y: r.y, w: r.width, h: r.height },
    vw: innerWidth,
    vh: innerHeight,
    h1Color: getComputedStyle(h1).color,
    footColor: foot ? getComputedStyle(foot).color : null,
    deepInk,
  };
});
const covers =
  media.rect.x <= 0 &&
  media.rect.y <= 0 &&
  media.rect.w >= media.vw &&
  media.rect.h >= media.vh;
check("hero media covers viewport", covers, JSON.stringify(media.rect));
/* --deep-ink #f6f1e8 -> rgb(246, 241, 232) */
check(
  "h1 computes deep ink",
  media.h1Color === "rgb(246, 241, 232)",
  media.h1Color,
);
check(
  "footer text computes deep family",
  media.footColor !== null && media.footColor.startsWith("rgb(2") ,
  media.footColor,
);

/* wordmark is the cream knockout on home */
const wordmark = await page.evaluate(
  () => document.querySelector("header a[aria-label] img")?.getAttribute("src") ?? "",
);
check("home wordmark is cream knockout", wordmark.includes("elsheph-name-light"), wordmark);

/* (c) search button opens in-place overlay, no route change, no cmdk dialog */
const urlBefore = page.url();
await page.click('button[aria-label="Search (Command K)"]');
await page.waitForTimeout(600);
const searchState = await page.evaluate(() => ({
  url: location.href,
  cmdk: !!document.querySelector("[cmdk-root], [cmdk-dialog]"),
  overlay: !!document.querySelector('input.search-input'),
  focused: document.activeElement?.className ?? "",
}));
check("search opens in place (same URL)", searchState.url === urlBefore, searchState.url);
check("no cmdk dialog in DOM", !searchState.cmdk);
check("search overlay input present", searchState.overlay);
check("focus lands in input", searchState.focused.includes("search-input"), searchState.focused);

await page.keyboard.type("univ");
await page.waitForTimeout(200);
const filtered = await page.evaluate(() =>
  [...document.querySelectorAll(".menu-overlay li button span:first-child")].map(
    (n) => n.textContent,
  ),
);
check(
  "typing filters results",
  filtered.length >= 1 && filtered.every((t) => t.toLowerCase().includes("univ")),
  JSON.stringify(filtered),
);
await page.screenshot({ path: `${outDir}/search-overlay.png` });

await page.keyboard.press("Escape");
await page.waitForTimeout(500);
const afterEsc = await page.evaluate(() => ({
  overlay: !!document.querySelector("input.search-input"),
  focused: document.activeElement?.getAttribute("aria-label") ?? "",
}));
check("Esc closes search", !afterEsc.overlay);
check("focus returns to search button", afterEsc.focused === "Search (Command K)", afterEsc.focused);

/* (d) Cmd+K opens the same overlay */
await page.keyboard.press("Meta+k");
await page.waitForTimeout(500);
const cmdK = await page.evaluate(() => !!document.querySelector("input.search-input"));
check("Cmd+K opens overlay", cmdK);
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

/* (e) menu overlay grouping */
await page.click('button[aria-label="Open menu"]');
await page.waitForTimeout(700);
const menu = await page.evaluate(() => {
  const overlay = document.querySelector(".menu-overlay");
  const text = overlay?.textContent ?? "";
  const primary = [...overlay.querySelectorAll(".menu-link-a")].map((n) => n.textContent);
  return { text, primary };
});
for (const svc of ["Product Development", "IT Services", "IT Staffing", "Corporate L&D"])
  check(`menu shows "${svc}"`, menu.text.includes(svc));
check("menu shows WHAT WE DO eyebrow", /what we do/i.test(menu.text));
check("no Team section", !/\bTeam\b/.test(menu.text));
check(
  "primary order",
  JSON.stringify(menu.primary) ===
    JSON.stringify(["Products", "About", "University", "Insights", "Contact"]),
  JSON.stringify(menu.primary),
);
await page.screenshot({ path: `${outDir}/menu-overlay.png` });

/* (f) mutual exclusion */
await page.keyboard.press("Meta+k"); // search over open menu
await page.waitForTimeout(600);
const excl1 = await page.evaluate(() => ({
  search: !!document.querySelector("input.search-input"),
  menuLinks: !!document.querySelector(".menu-link-a"),
}));
check("opening search closes menu", excl1.search && !excl1.menuLinks, JSON.stringify(excl1));
/* The header sits under the overlay, so exercise the handler directly. */
await page.evaluate(() =>
  document.querySelector('button[aria-label="Open menu"]').click(),
);
await page.waitForTimeout(600);
const excl2 = await page.evaluate(() => ({
  search: !!document.querySelector("input.search-input"),
  menuLinks: !!document.querySelector(".menu-link-a"),
}));
check("opening menu closes search", excl2.menuLinks && !excl2.search, JSON.stringify(excl2));

await browser.close();

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  [${r.detail}]` : ""}`);
}
console.log(`\n${results.length - failed}/${results.length} passed. Shots in ${outDir}`);
process.exit(failed ? 1 : 0);
