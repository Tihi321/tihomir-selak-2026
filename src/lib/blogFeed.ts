/**
 * Helpers that link work entries to their blog posts through the blog's RSS
 * feed. No Astro imports on purpose, so this stays testable and reusable at
 * build time. Only `fetchPublishedSlugs` does I/O.
 */

import type { ProjectEntry } from './entries';

const ITEM_PATTERN = /<item\b[^>]*>([\s\S]*?)<\/item>/g;
const LINK_PATTERN = /<link>\s*([^<]*?)\s*<\/link>/;
const SLUG_PATTERN = /\/writing\/([a-z0-9-]+)\/?$/;

/**
 * Returns the slugs of every `/writing/<slug>/` link found inside an `<item>`
 * of an RSS document. The channel-level `<link>` is ignored because it sits
 * outside any item.
 */
export function parseFeedSlugs(xml: string): Set<string> {
  const slugs = new Set<string>();
  for (const item of xml.matchAll(ITEM_PATTERN)) {
    const link = LINK_PATTERN.exec(item[1] ?? '')?.[1];
    const slug = link
      ? SLUG_PATTERN.exec(link.split(/[?#]/)[0] ?? '')?.[1]
      : undefined;
    if (slug) slugs.add(slug);
  }
  return slugs;
}

/**
 * Returns new entries where each entry whose slug is in `slugs` gets an `href`
 * to its blog post. Other entries are returned unchanged. Does not mutate the
 * input.
 */
export function linkWork(
  entries: readonly ProjectEntry[],
  slugs: ReadonlySet<string>,
  blogUrl: string,
): ProjectEntry[] {
  return entries.map((entry) =>
    slugs.has(entry.slug)
      ? { ...entry, href: `${blogUrl}/writing/${entry.slug}/` }
      : entry,
  );
}

/**
 * Fetches the blog feed and returns the slugs of published posts. Never
 * throws: on a network error, timeout or non-OK response it warns and returns
 * an empty set, so the build succeeds and the cards stay unlinked.
 */
export async function fetchPublishedSlugs(
  blogUrl: string,
): Promise<Set<string>> {
  const url = `${blogUrl}/rss.xml`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) {
      console.warn(
        `[blogFeed] ${url} responded ${response.status}; work cards stay unlinked.`,
      );
      return new Set();
    }
    return parseFeedSlugs(await response.text());
  } catch (error) {
    console.warn(
      `[blogFeed] Could not fetch ${url} (${error instanceof Error ? error.message : String(error)}); work cards stay unlinked.`,
    );
    return new Set();
  }
}
