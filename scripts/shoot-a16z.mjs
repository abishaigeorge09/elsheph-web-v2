import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const [name, path] of [['home', '/'], ['products', '/products'], ['insights', '/insights']]) {
  await p.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle', timeout: 20000 });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `/tmp/shots-a16z-${name}.png`, fullPage: name !== 'home' });
}
await b.close();
console.log('done');
