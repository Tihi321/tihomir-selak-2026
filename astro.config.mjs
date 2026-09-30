import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://tihomir-selak.from.hr',
  output: 'static',
  integrations: [
    sitemap({
      // The style tile is a private review page, keep it out of the sitemap.
      filter: (page) => !new URL(page).pathname.startsWith('/design'),
    }),
  ],
  fonts: [
    {
      name: 'Archivo',
      cssVariable: '--font-archivo',
      provider: fontProviders.fontsource(),
      styles: ['normal'],
      weights: ['100 900'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      name: 'Martian Mono',
      cssVariable: '--font-martian-mono',
      provider: fontProviders.fontsource(),
      styles: ['normal'],
      weights: ['300 700'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
