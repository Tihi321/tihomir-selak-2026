import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('serves the style tile as a single-h1, noindex page on carbon', async ({
  page,
}) => {
  const response = await page.goto('/design');
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Style tile');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
  const background = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );
  expect(background).toBe('rgb(15, 18, 21)');
});

test('keeps the style tile out of the sitemap', async ({ request }) => {
  const sitemap = await request.get('/sitemap-0.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).not.toContain('/design');
});

test('renders every component variant', async ({ page }) => {
  await page.goto('/design');

  for (const label of ['Work', 'Side project', 'Interactive']) {
    await expect(
      page.locator('.type-badge', { hasText: label }).first(),
    ).toBeVisible();
  }

  await expect(page.locator('section#project-card .project-card')).toHaveCount(
    4,
  );

  const items = page.locator('.writing-item');
  expect(await items.count()).toBeGreaterThanOrEqual(5);
  const withTime = await page.locator('.writing-item time[datetime]').count();
  expect(withTime).toBe(await items.count());

  // The card without a preview stays compact, with no empty frame.
  const startPage = page
    .locator('.project-card')
    .filter({ hasText: 'Start page' })
    .first();
  await expect(startPage.locator('.project-card__frame')).toHaveCount(0);
});

test('exposes the diagram as a named image', async ({ page }) => {
  await page.goto('/design');
  const diagram = page.locator('svg[role="img"]').first();
  await expect(diagram).toBeAttached();
  const name = await diagram.evaluate((node) =>
    (node.getAttribute('aria-labelledby') ?? '')
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' '),
  );
  expect(name.length).toBeGreaterThan(10);
});

test('does not overflow the viewport at common widths', async ({ page }) => {
  for (const width of [320, 390, 720, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/design');
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(
      dimensions.document,
      `horizontal overflow at ${width}px`,
    ).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test('scrolls the diagram inside its own frame on a phone', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/design');
  const scroller = page.locator('.dg__scroll').first();
  const { scrollWidth, clientWidth } = await scroller.evaluate((node) => ({
    scrollWidth: node.scrollWidth,
    clientWidth: node.clientWidth,
  }));
  expect(scrollWidth).toBeGreaterThan(clientWidth);
  await expect(scroller).toHaveAttribute('tabindex', '0');
});

test('stacks writing rows and the index into one column on a phone', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/design');

  const item = page.locator('.writing-item').first();
  const date = await item.locator('time').boundingBox();
  const title = await item.locator('.writing-item__title').boundingBox();
  expect(date).not.toBeNull();
  expect(title).not.toBeNull();
  expect(title!.y).toBeGreaterThan(date!.y + date!.height - 1);

  const cards = page.locator('.index-grid .project-card');
  expect(await cards.count()).toBeGreaterThanOrEqual(3);
  const lefts = await cards.evaluateAll((nodes) =>
    nodes.map((node) => Math.round(node.getBoundingClientRect().left)),
  );
  expect(new Set(lefts).size).toBe(1);
});

test('lays the index out in two columns of cards on a laptop', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/design');
  const cards = page
    .locator('.index-run--projects')
    .filter({ has: page.locator('.project-card[data-layout="stack"]') })
    .first()
    .locator('.project-card[data-layout="stack"]');
  const lefts = await cards.evaluateAll((nodes) =>
    nodes.map((node) => Math.round(node.getBoundingClientRect().left)),
  );
  expect(new Set(lefts).size).toBe(2);
});

test('spans a lone project card across its run and aligns the index to the page grid', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/design');

  const lone = page
    .locator('.index-run--projects')
    .filter({ has: page.locator('.project-card[data-layout="wide"]') })
    .first();
  await expect(lone.locator('.project-card')).toHaveCount(1);
  const [runBox, cardBox] = await Promise.all([
    lone.boundingBox(),
    lone.locator('.project-card').boundingBox(),
  ]);
  expect(cardBox!.width).toBeGreaterThan(runBox!.width - 1);

  // Year margin lines up with the section labels, entries with the section body.
  const labelLeft = await page
    .locator('#index-title')
    .evaluate((node) => node.getBoundingClientRect().left);
  const yearLeft = await page
    .locator('.index-year__label')
    .first()
    .evaluate((node) => node.getBoundingClientRect().left);
  expect(Math.abs(yearLeft - labelLeft)).toBeLessThan(1);
  const bodyLeft = await page
    .locator('#index-title + .tile-section__body')
    .evaluate((node) => node.getBoundingClientRect().left);
  expect(Math.abs(runBox!.x - bodyLeft)).toBeLessThan(1);
});

test('has no serious or critical automated accessibility violations', async ({
  page,
}) => {
  await page.goto('/design');
  const results = await new AxeBuilder({ page }).analyze();
  const severe = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact ?? ''),
  );
  expect(
    severe,
    JSON.stringify(
      severe.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        targets: nodes.map(({ target }) => target),
      })),
      null,
      2,
    ),
  ).toEqual([]);
});

test('shows a phosphor focus ring on keyboard focus', async ({ page }) => {
  await page.goto('/design');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Tihomir Selak' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'Tihomir Selak' })).toHaveCSS(
    'outline-color',
    'rgb(224, 164, 88)',
  );
});

test('loads Archivo and Martian Mono locally', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    const url = request.url();
    if (url.startsWith('http') && !url.startsWith('http://127.0.0.1:4321/')) {
      externalRequests.push(url);
    }
  });

  await page.goto('/design');
  const loadedFonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].map(({ family, status }) => ({
      family,
      status,
    }));
  });
  for (const prefix of ['Archivo', 'Martian Mono']) {
    expect(
      loadedFonts.some(
        ({ family, status }) =>
          family.replace(/["']/g, '').startsWith(prefix) && status === 'loaded',
      ),
      `${prefix} should be loaded`,
    ).toBe(true);
  }
  expect(externalRequests).toEqual([]);
});

test('captures review screenshots at desktop, tablet and mobile sizes', async ({
  page,
}) => {
  await mkdir('.codex/temp/screenshots', { recursive: true });
  const shots = [
    { width: 1440, height: 1000, name: 'design-desktop' },
    { width: 768, height: 1024, name: 'design-tablet' },
    { width: 390, height: 844, name: 'design-mobile' },
  ];
  for (const { width, height, name } of shots) {
    await page.setViewportSize({ width, height });
    await page.goto('/design');
    // Lazy images only load once scrolled near, so walk down the page first.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      window.scrollTo(0, 0);
      await document.fonts.ready;
    });
    await page.screenshot({
      path: `.codex/temp/screenshots/${name}.png`,
      fullPage: true,
    });
  }
});
