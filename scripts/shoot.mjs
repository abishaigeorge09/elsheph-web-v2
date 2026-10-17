#!/usr/bin/env node
/**
 * Renders the homepage in a real browser and writes both a full-page shot at
 * each target width and a per-section viewport shot, plus the rendered text
 * and DOM.
 *
 * Screenshots are the only proof that the page looks right; a green build
 * proves only that it compiles. Kept in scripts/ so a later phase can rerun it
 * rather than reinventing it.
 *
 * Two details matter and are easy to get wrong:
 * - `scroll-behavior: smooth` is disabled first, or every capture lands
 *   mid-animation on a page that looks broken but is not.
 * - the page is scrolled end to end before the full-page capture, so every
 *   `whileInView` reveal has fired and no section is recorded at opacity 0.
 *
 * Usage: node scripts/shoot.mjs [baseUrl] [outDir]
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] ?? "http://127.0.0.1:3311";
const outDir = process.argv[3] ?? "/tmp/elsheph-shots";

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const widths = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844 },
];

const anchors = ["products", "services", "process", "about", "contact"];

for (const size of widths) {
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; }",
  });

  // The hero, with the fixed header over it, before anything is scrolled.
  await page.screenshot({ path: `${outDir}/${size.name}-00-hero.png` });

  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  });

  // One viewport shot per anchor, to read type and spacing at full scale.
  for (const [index, id] of anchors.entries()) {
    await page.evaluate((target) => {
      document.getElementById(target)?.scrollIntoView();
    }, id);
    // Longer than the 0.6s reveal plus its longest stagger, so nothing is
    // captured mid-flight and read as a rendering fault.
    await page.waitForTimeout(1400);
    await page.screenshot({
      path: `${outDir}/${size.name}-0${index + 1}-${id}.png`,
    });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: `${outDir}/home-${size.name}.png`,
    fullPage: true,
  });

  if (size.name === "1440") {
    await writeFile(
      `${outDir}/home-text.txt`,
      await page.evaluate(() => document.body.innerText),
    );
    await writeFile(
      `${outDir}/home-dom.html`,
      await page.evaluate(() => document.documentElement.outerHTML),
    );
  }

  console.log(`${size.name}px captured`);
  await context.close();
}

await browser.close();
