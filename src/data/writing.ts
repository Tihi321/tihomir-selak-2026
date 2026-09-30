import { site } from './site';
import type { WritingEntry } from '../lib/entries';

/**
 * Hand-synced copy of the published posts on the blog
 * (tihomir-selak-blog-2026, src/content/writing) until the blog-sync ticket.
 * Topic is the first blog topic as a label. Minutes use the blog's
 * getReadingMinutes(): ceil(words / 220) on the body, computed once.
 */
export const writing: readonly WritingEntry[] = [
  {
    kind: 'writing',
    slug: 'why-rebuilding-this-blog',
    title: 'Why I’m rebuilding this blog',
    date: '2026-09-24',
    topic: 'Experiments',
    minutes: 1,
    href: `${site.blog}/writing/why-rebuilding-this-blog/`,
  },
  {
    kind: 'writing',
    slug: 'what-physics-means-by-observation',
    title: 'What physics means by observation',
    date: '2024-09-22',
    topic: 'Physics',
    minutes: 3,
    href: `${site.blog}/writing/what-physics-means-by-observation/`,
  },
  {
    kind: 'writing',
    slug: 'fast-judgments-and-modern-decisions',
    title: 'Fast judgments and modern decisions',
    date: '2024-04-20',
    topic: 'Psychology',
    minutes: 3,
    href: `${site.blog}/writing/fast-judgments-and-modern-decisions/`,
  },
  {
    kind: 'writing',
    slug: 'growth-culture-and-reinvention-in-games',
    title: 'Growth, culture, and reinvention in game studios',
    date: '2024-02-04',
    topic: 'Leadership',
    minutes: 3,
    href: `${site.blog}/writing/growth-culture-and-reinvention-in-games/`,
  },
  {
    kind: 'writing',
    slug: 'storytelling-and-product-placement',
    title: 'When a story becomes an advertisement',
    date: '2024-01-25',
    topic: 'Writing',
    minutes: 3,
    href: `${site.blog}/writing/storytelling-and-product-placement/`,
  },
  {
    kind: 'writing',
    slug: 'building-an-ai-visual-story',
    title: 'Building an AI-assisted visual story',
    date: '2024-01-21',
    topic: 'AI',
    minutes: 3,
    href: `${site.blog}/writing/building-an-ai-visual-story/`,
  },
  {
    kind: 'writing',
    slug: 'from-code-completion-to-architecture',
    title: 'From code completion to architecture',
    date: '2024-01-02',
    topic: 'AI',
    minutes: 3,
    href: `${site.blog}/writing/from-code-completion-to-architecture/`,
  },
];
