import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('has a visible keyboard focus indicator', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await expect(page.getByRole('link', { name: 'Skip to content' })).toHaveCSS(
    'outline-style',
    'solid',
  );
});

test('has no serious or critical automated accessibility violations', async ({
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
