import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const light = 'rgb(238, 242, 248)';
const dark = 'rgb(10, 16, 32)';

const background = (page: import('@playwright/test').Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe('OS scheme', () => {
  test.describe('light', () => {
    test.use({ colorScheme: 'light' });
    test('follows a light OS setting', async ({ page }) => {
      await page.goto('/');
      expect(await background(page)).toBe(light);
    });
  });

  test.describe('dark', () => {
    test.use({ colorScheme: 'dark' });
    test('follows a dark OS setting', async ({ page }) => {
      await page.goto('/');
      expect(await background(page)).toBe(dark);
    });

    test('applies a stored light choice with no flash', async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem('ts-theme', 'light'));
      await page.goto('/');
      // First evaluate after goto: theme-init.js already ran in <head>.
      expect(await background(page)).toBe(light);
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    });
  });
});

test.describe('theme toggle', () => {
  test.use({ colorScheme: 'dark' });

  test('flips the theme, updates the label and persists', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /Switch to .* theme/ });
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');

    await toggle.click();
    expect(await background(page)).toBe(light);
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark theme');
    await expect(
      page.locator('meta[name="theme-color"]').first(),
    ).toHaveAttribute('content', '#EEF2F8');

    await page.reload();
    expect(await background(page)).toBe(light);
    await expect(
      page.getByRole('button', { name: 'Switch to dark theme' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    expect(await background(page)).toBe(dark);
  });
});

test.describe('shared theme cookie', () => {
  test.use({ colorScheme: 'light' });

  test('wins over localStorage on load and is written on toggle', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: 'ts-theme', value: 'dark', url: 'http://127.0.0.1:4321' },
    ]);
    await page.addInitScript(() => localStorage.setItem('ts-theme', 'light'));
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    expect(await background(page)).toBe(dark);

    await page.getByRole('button', { name: 'Switch to light theme' }).click();
    const cookies = await context.cookies();
    expect(cookies.find(({ name }) => name === 'ts-theme')?.value).toBe(
      'light',
    );
  });
});

test.describe('field toggle', () => {
  test('hides the canvas, flips aria-pressed and persists', async ({
    page,
  }) => {
    await page.goto('/');
    const field = page.locator('.neural-field');
    const toggle = page.getByRole('button', { name: 'Background animation' });
    await expect(field).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(field).not.toBeVisible();

    await page.reload();
    await expect(
      page.getByRole('button', { name: 'Background animation' }),
    ).toHaveAttribute('aria-pressed', 'false');
    await expect(field).not.toBeVisible();
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, colorScheme: 'dark' });

  test('hides JS-only UI and keeps the OS theme', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.site-controls')).not.toBeVisible();
    await expect(page.locator('.neural-field')).not.toBeVisible();
    expect(await background(page)).toBe(dark);
  });
});

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`axe in ${scheme}`, () => {
    test.use({ colorScheme: scheme });

    test(`has no serious or critical violations on / (${scheme})`, async ({
      page,
    }) => {
      await page.goto('/');
      const results = await new AxeBuilder({ page }).analyze();
      const severe = results.violations.filter((violation) =>
        ['serious', 'critical'].includes(violation.impact ?? ''),
      );
      expect(
        severe,
        JSON.stringify(
          severe.map(({ id, impact, nodes }) => ({
            id,
            impact,
            targets: nodes.map(({ target }) => target),
          })),
          null,
          2,
        ),
      ).toEqual([]);
    });
  });
}
