import { chromium } from "playwright";
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1999, height: 1114 } });
for (const [name, path] of [
  ["newsletters", "/newsletters"],
  ["insights", "/insights"],
  ["internships", "/internships"],
]) {
  await p.goto(`http://localhost:3005${path}`, { waitUntil: "networkidle", timeout: 30000 });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `/tmp/polish-${name}.png`, fullPage: true });
}
await b.close();
console.log("done");
