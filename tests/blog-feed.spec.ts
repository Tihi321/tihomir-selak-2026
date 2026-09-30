import { expect, test } from '@playwright/test';
import type { ProjectEntry } from '../src/lib/entries';
import {
  fetchPublishedSlugs,
  linkWork,
  parseFeedSlugs,
} from '../src/lib/blogFeed';

const blog = 'https://blog.tihomir-selak.from.hr';

const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Field notes</title><description>Notes.</description><link>${blog}/</link><item><title>One</title><link>${blog}/writing/python-services/</link><guid isPermaLink="true">${blog}/writing/python-services/</guid><pubDate>Thu, 24 Sep 2026 00:00:00 GMT</pubDate></item><item><title>Two</title><link>${blog}/writing/device-simulators/</link><guid isPermaLink="true">${blog}/writing/device-simulators/</guid></item></channel></rss>`;

function project(slug: string): ProjectEntry {
  return {
    kind: 'project',
    slug,
    title: slug,
    summary: 'Summary.',
    type: 'work',
    year: 2024,
    tags: [],
  };
}

test('parseFeedSlugs returns item slugs and ignores the channel link', () => {
  expect([...parseFeedSlugs(feed)].sort()).toEqual([
    'device-simulators',
    'python-services',
  ]);
  expect(parseFeedSlugs('<rss><channel></channel></rss>').size).toBe(0);
});

test('linkWork sets href only for matches and does not mutate input', () => {
  const entries = [project('python-services'), project('rust-daemon-services')];
  const snapshot = structuredClone(entries);

  const linked = linkWork(entries, new Set(['python-services']), blog);

  expect(linked[0]?.href).toBe(`${blog}/writing/python-services/`);
  expect(linked[1]).toBe(entries[1]);
  expect(linked[1]?.href).toBeUndefined();
  expect(entries).toEqual(snapshot);
});

test('fetchPublishedSlugs resolves to an empty set when unreachable', async () => {
  const originalWarn = console.warn;
  const warnings: unknown[][] = [];
  console.warn = (...args: unknown[]) => void warnings.push(args);
  try {
    const slugs = await fetchPublishedSlugs('http://127.0.0.1:9');
    expect(slugs.size).toBe(0);
    expect(warnings).toHaveLength(1);
  } finally {
    console.warn = originalWarn;
  }
});
