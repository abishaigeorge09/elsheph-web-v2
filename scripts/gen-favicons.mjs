#!/usr/bin/env node
/**
 * gen-favicons.mjs — rasterise the brand seal into the favicon set.
 *
 * Inlines public/brand/seal.svg (so currentColor inherits) on the brand
 * ground — cream mark on --brand-deep — and screenshots it at each size
 * with Playwright (a devDependency). Writes:
 *   public/favicon/favicon-16x16.png
 *   public/favicon/favicon-32x32.png
 *   public/favicon/favicon-48x48.png
 *   public/favicon/apple-touch-icon.png   (180px)
 *
 * The .ico is assembled from the three small PNGs afterwards (PIL):
 *   python3 -c "from PIL import Image; im=Image.open('public/favicon/favicon-48x48.png'); im.save('public/favicon/favicon.ico', sizes=[(16,16),(32,32),(48,48)])"
 *
 * Deterministic: same seal in, same pixels out.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const ROOT = join(import.meta.dirname, "..");
const svg = readFileSync(join(ROOT, "public", "brand", "seal.svg"), "utf8");

/* Brand ground + cream mark — the two Layer A hexes this asset bakes in.
   (An asset generator, like gen-art.mjs, is the sanctioned place for raw
   colour; components still never carry any.) */
const GROUND = "#582008";
const INK = "#faf8f3";

const page = (size) => `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0}body{width:${size}px;height:${size}px;background:${GROUND};color:${INK};display:flex;align-items:center;justify-content:center}svg{width:${Math.round(size * 0.92)}px;height:${Math.round(size * 0.92)}px}</style>
${svg}`;

const browser = await chromium.launch();
for (const [size, name] of [
  [180, "apple-touch-icon.png"],
  [48, "favicon-48x48.png"],
  [32, "favicon-32x32.png"],
  [16, "favicon-16x16.png"],
]) {
  const p = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await p.setContent(page(size));
  const buf = await p.screenshot({ clip: { x: 0, y: 0, width: size, height: size } });
  writeFileSync(join(ROOT, "public", "favicon", name), buf);
  console.log(`wrote public/favicon/${name}`);
  await p.close();
}
await browser.close();
