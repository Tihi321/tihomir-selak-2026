import type { ProjectEntry } from '../lib/entries';

/**
 * Pixotope work, text only. Summaries stick to the claims that are safe to
 * publish: no metrics, customer names or internal architecture. Years are
 * start years; `date` only keeps the order inside a year stable. A card links
 * to the blog post with the same slug once that post appears in the blog's RSS
 * feed (resolved at build time in `src/lib/blogFeed.ts`).
 */
export const work: readonly ProjectEntry[] = [
  {
    kind: 'project',
    slug: 'react-component-library',
    title: 'Shared React component library',
    summary: 'Reusable components with Storybook and versioned releases.',
    type: 'work',
    year: 2021,
    date: '2021-11-01',
    tags: ['React', 'TypeScript', 'Storybook'],
  },
  {
    kind: 'project',
    slug: 'zeromq-traffic-explorer',
    title: 'ZeroMQ traffic explorer',
    summary: 'Desktop tool to watch, filter and debug message traffic.',
    type: 'work',
    year: 2023,
    date: '2023-05-01',
    tags: ['Rust', 'Tauri', 'React', 'ZeroMQ'],
  },
  {
    kind: 'project',
    slug: 'rust-daemon-services',
    title: 'Daemon services in Rust',
    summary: 'Network discovery, disk and metadata services.',
    type: 'work',
    year: 2023,
    date: '2023-11-01',
    tags: ['Rust', 'ZeroMQ'],
  },
  {
    kind: 'project',
    slug: 'python-services',
    title: 'Python services and build tooling',
    summary: 'Python services with packaging and build tooling.',
    type: 'work',
    year: 2024,
    date: '2024-07-01',
    tags: ['Python'],
  },
  {
    kind: 'project',
    slug: 'device-simulators',
    title: 'Device simulators for testing without hardware',
    summary: 'Simulated devices so the team can test without hardware.',
    type: 'work',
    year: 2025,
    date: '2025-02-01',
    tags: ['Node.js', 'TypeScript'],
  },
  {
    kind: 'project',
    slug: 'source-to-confluence-docs',
    title: 'Source-to-Confluence API docs',
    summary:
      'Parses docs from TypeScript, Python, Rust and C++ and publishes to Confluence.',
    type: 'work',
    year: 2026,
    date: '2026-03-01',
    tags: ['Python', 'TypeScript'],
  },
];
