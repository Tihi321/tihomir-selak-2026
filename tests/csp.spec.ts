import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

// `astro preview` does not send the Netlify headers, so this test reads the
// real Content-Security-Policy from netlify.toml and injects it into every
// document response. Inline <style> blocks or style="" attributes that the
// policy forbids then show up as securitypolicyviolation events.
const toml = readFileSync('netlify.toml', 'utf8');
const csp = toml.match(/Content-Security-Policy\s*=\s*"([^"]+)"/)?.[1];

// Dark --c-carbon in src/styles/system/tokens.css is #0a1020. The default
// Playwright scheme is light, so pin dark.
test.use({ colorScheme: 'dark' });
const carbon = 'rgb(10, 16, 32)';

for (const path of ['/', '/404.html', '/design']) {
  test(`renders styled with no CSP violations at ${path}`, async ({ page }) => {
    expect(csp, 'Content-Security-Policy found in netlify.toml').toBeTruthy();

    await page.route('**/*', async (route) => {
      if (route.request().resourceType() !== 'document') {
        return route.continue();
      }
      const response = await route.fetch();
      await route.fulfill({
        response,
        headers: {
          ...response.headers(),
          'content-security-policy': csp as string,
        },
      });
    });

    await page.addInitScript(() => {
      const w = window as unknown as { __cspViolations: string[] };
      w.__cspViolations = [];
      document.addEventListener('securitypolicyviolation', (event) => {
        w.__cspViolations.push(
          `${event.violatedDirective} blocked ${event.blockedURI}`,
        );
      });
    });

    await page.goto(path);

    const violations = await page.evaluate(
      () =>
        (window as unknown as { __cspViolations: string[] }).__cspViolations,
    );
    expect(violations).toEqual([]);

    const background = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(background).toBe(carbon);
  });
}
