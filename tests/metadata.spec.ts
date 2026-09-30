import { expect, test } from '@playwright/test';

test('publishes canonical, social, and Person metadata', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Tihomir Selak | Development Team Lead/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://tihomir-selak.from.hr/',
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /real-time/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    /Tihomir Selak | Development Team Lead/,
  );
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    'content',
    '#0F1215',
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://tihomir-selak.from.hr/social-card.png',
  );

  const person = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((node) => JSON.parse(node.textContent ?? '{}'));
  expect(person['@type']).toBe('Person');
  expect(person.name).toBe('Tihomir Selak');
  expect(person.jobTitle).toBe('Development Team Lead');
  expect(person.sameAs).toContain('https://github.com/Tihi321');
});

test('loads Archivo, Martian Mono and page assets from the local site origin', async ({
  page,
}) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    const url = request.url();
    if (url.startsWith('http') && !url.startsWith('http://127.0.0.1:4321/')) {
      externalRequests.push(url);
    }
  });

  await page.goto('/');
  const loadedFonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].map(({ family, status }) => ({
      family,
      status,
    }));
  });
  expect(
    loadedFonts.some(
      ({ family, status }) =>
        family.startsWith('Archivo-') && status === 'loaded',
    ),
  ).toBe(true);
  expect(
    loadedFonts.some(
      ({ family, status }) =>
        family.replace(/["']/g, '').startsWith('Martian Mono') &&
        status === 'loaded',
    ),
  ).toBe(true);
  expect(externalRequests).toEqual([]);
});

test('provides a useful static 404 page and assets', async ({
  page,
  request,
}) => {
  const response = await page.goto('/a-route-that-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'This page has no destination.' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return home' })).toHaveAttribute(
    'href',
    '/',
  );

  for (const path of [
    '/favicon.svg',
    '/robots.txt',
    '/sitemap-index.xml',
    '/social-card.png',
  ]) {
    const asset = await request.get(path);
    expect(asset.ok(), `${path} should be available`).toBeTruthy();
  }
});
