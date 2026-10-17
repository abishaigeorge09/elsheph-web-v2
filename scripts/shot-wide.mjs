import { chromium } from "playwright";
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1999, height: 1114 } });
await p.goto("http://localhost:3005", { waitUntil: "networkidle", timeout: 30000 });
await p.waitForTimeout(1500);
await p.screenshot({ path: "/tmp/home-wide.png" });
await b.close();
console.log("done");
