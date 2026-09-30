import { chromium } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Fonts are read from the Astro font cache (populated by `yarn build` / `yarn dev`).
// If the cache is missing the SVG falls back to Arial / monospace.
const fontDir = resolve('.astro/fonts');
/** @type {Array<[family: string, prefix: string, weight: string]>} */
const fonts = [
  ['Archivo', 'font-archivo-', '100 900'],
  ['Martian Mono', 'font-martian-mono-', '100 800'],
];

/**
 * Finds the cached latin woff2 for a family. The file names carry a content
 * hash, so match on the prefix instead of a fixed name.
 * @param {string} prefix
 */
function findFont(prefix) {
  if (!existsSync(fontDir)) return undefined;
  return readdirSync(fontDir).find(
    (name) =>
      name.startsWith(prefix) &&
      name.includes('-normal-latin-') &&
      name.endsWith('.woff2'),
  );
}

const fontFaces = fonts
  .map(([family, prefix, weight]) => {
    const file = findFont(prefix);
    if (!file) {
      console.warn(
        `Font not found in ${fontDir}, using fallback for ${family}`,
      );
      return '';
    }
    const data = readFileSync(resolve(fontDir, file)).toString('base64');
    return `@font-face{font-family:"${family}";font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${data}) format("woff2");}`;
  })
  .join('\n');

const svg = readFileSync(resolve('src/assets/social/social-card.svg'), 'utf8');
const html = `<!doctype html><html><head><style>${fontFaces}\nhtml,body{margin:0;background:#0F1215}svg{display:block}</style></head><body>${svg}</body></html>`;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve('public/social-card.png') });
} finally {
  await browser.close();
}
