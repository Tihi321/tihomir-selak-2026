import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('shows one clear headline and the expected landmarks', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Tihomir Selak');
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }),
  ).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.locator('#work')).toBeVisible();
  await expect(page.locator('#systems')).toBeAttached();
  await expect(page.locator('#approach')).toBeAttached();
  await expect(page.locator('#experience')).toBeAttached();
  await expect(page.locator('#contact')).toBeAttached();
});

test('lists six unlinked work cards and seven blog writing rows', async ({
  page,
}) => {
  await page.goto('/');

  const cards = page.locator('.project-card');
  await expect(cards).toHaveCount(6);
  await expect(cards.locator('a')).toHaveCount(0);

  const rows = page.locator('.writing-item');
  await expect(rows).toHaveCount(7);
  for (const row of await rows.all()) {
    await expect(row.locator('time[datetime]')).toHaveCount(1);
    await expect(row.locator('a')).toHaveAttribute(
      'href',
      /^https:\/\/blog\.tihomir-selak\.from\.hr\/writing\//,
    );
  }
});

test('header routes land on their sections from home and not found', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole('link', { name: 'Approach', exact: true }).click();
  await expect(page).toHaveURL(/#approach$/);

  await page.goto('/404.html');
  await page.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.locator('#work')).toBeVisible();
});

test('provides working contact and profile links', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.locator('a[href="mailto:tihomir.selak@outlook.com"]'),
  ).toHaveCount(2);
  await expect(
    page.locator('a[href="https://github.com/Tihi321"]'),
  ).toHaveCount(2);
  await expect(
    page.locator('a[href="https://www.linkedin.com/in/selaktihomir/"]'),
  ).toHaveCount(2);
});

test('works without client-side JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(
    page.locator('a[href="mailto:tihomir.selak@outlook.com"]').first(),
  ).toBeVisible();
  await context.close();
});

test('does not overflow the viewport at common widths', async ({ page }) => {
  for (const width of [320, 390, 720, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
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

test('keeps all header links visible at a narrow viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  for (const label of ['Work', 'Approach', 'Experience', 'Contact', 'Blog']) {
    await expect(
      page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: label, exact: true }),
    ).toBeVisible();
  }
});

test('captures review screenshots at desktop and mobile sizes', async ({
  page,
}) => {
  await mkdir('.codex/temp/screenshots', { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.screenshot({
    path: '.codex/temp/screenshots/home-desktop.png',
    fullPage: true,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.screenshot({
    path: '.codex/temp/screenshots/home-mobile.png',
    fullPage: true,
  });

  await page.setViewportSize({ width: 768, height: 1024 });
  await page.reload();
  await page.screenshot({
    path: '.codex/temp/screenshots/home-tablet.png',
    fullPage: true,
  });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/404.html');
  await page.screenshot({ path: '.codex/temp/screenshots/404-desktop.png' });
});
