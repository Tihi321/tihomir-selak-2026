/**
 * Placeholder content for the /design style tile. Facts come from the safe
 * claims in the career notes; anything marked invented is not real work.
 * Links point at in-page anchors so hover and focus can be tried.
 */
import type { IndexEntry, ProjectEntry, WritingEntry } from '../lib/entries';
import clockDrift from '../assets/design/preview-clock-drift.svg';
import discovery from '../assets/design/preview-discovery.svg';
import zmqExplorer from '../assets/design/preview-zmq-explorer.svg';

const anchor = (slug: string) => `#entry-${slug}`;

export const sampleProjects: ProjectEntry[] = [
  {
    kind: 'project',
    slug: 'zeromq-traffic-explorer',
    title: 'ZeroMQ traffic explorer',
    summary: 'Desktop tool to watch, filter and debug message traffic.',
    type: 'work',
    year: 2023,
    date: '2023-06-01',
    tags: ['Rust', 'Tauri', 'React', 'TypeScript', 'ZeroMQ'],
    href: anchor('zeromq-traffic-explorer'),
    preview: {
      kind: 'screenshot',
      src: zmqExplorer.src,
      width: zmqExplorer.width,
      height: zmqExplorer.height,
      alt: 'Placeholder still of a message traffic table with a filter bar and a detail pane.',
    },
  },
  {
    kind: 'project',
    slug: 'daemon-services-in-rust',
    title: 'Daemon services in Rust',
    summary:
      'Network discovery, disk and metadata services running as Windows services.',
    type: 'work',
    year: 2024,
    date: '2024-04-01',
    tags: ['Rust', 'ZeroMQ'],
    href: anchor('daemon-services-in-rust'),
    preview: {
      kind: 'diagram',
      src: discovery.src,
      width: discovery.width,
      height: discovery.height,
      alt: 'Generic sketch of two machines, each running a discovery daemon, linked by a broadcast.',
    },
  },
  {
    kind: 'project',
    slug: 'source-to-confluence-api-docs',
    title: 'Source-to-Confluence API docs',
    summary:
      'Parses TypeScript, Python, Rust and C++ doc comments and publishes them to Confluence.',
    type: 'work',
    year: 2026,
    date: '2026-03-10',
    tags: ['Python', 'TypeScript'],
    href: anchor('source-to-confluence-api-docs'),
  },
  {
    kind: 'project',
    slug: 'device-simulators-for-testing',
    title: 'Device simulators for testing',
    summary: 'Simulated devices that let the team test without hardware.',
    type: 'work',
    year: 2025,
    date: '2025-08-20',
    tags: ['Node.js', 'TypeScript'],
    href: anchor('device-simulators-for-testing'),
  },
  {
    kind: 'project',
    slug: 'shared-react-component-library',
    title: 'Shared React component library',
    summary: 'Reusable interface components documented in Storybook.',
    type: 'work',
    year: 2021,
    tags: ['React', 'TypeScript', 'Storybook'],
    href: anchor('shared-react-component-library'),
  },
  {
    kind: 'project',
    slug: 'start-page',
    title: 'Start page',
    summary: 'A small personal start page, built for fun.',
    type: 'side',
    year: 2026,
    date: '2026-01-20',
    tags: ['Astro', 'TypeScript'],
    href: anchor('start-page'),
  },
  {
    // Invented placeholder, not real work.
    kind: 'project',
    slug: 'clock-drift-simulator',
    title: 'Clock drift simulator',
    summary:
      'Drag two clocks apart and watch their readings disagree. Placeholder project.',
    type: 'interactive',
    year: 2026,
    date: '2026-09-12',
    tags: ['TypeScript', 'D3'],
    href: anchor('clock-drift-simulator'),
    feature: true,
    preview: {
      kind: 'demo',
      src: clockDrift.src,
      width: clockDrift.width,
      height: clockDrift.height,
      alt: 'Placeholder still of two clock traces drifting apart over time.',
    },
  },
  {
    // Invented placeholder, not real work.
    kind: 'project',
    slug: 'light-cone-explorer',
    title: 'Light-cone explorer',
    summary: 'Pick an event and see what it can reach. Placeholder project.',
    type: 'interactive',
    year: 2025,
    date: '2025-12-05',
    tags: ['TypeScript', 'Canvas'],
    href: anchor('light-cone-explorer'),
  },
];

export const sampleWriting: WritingEntry[] = [
  {
    kind: 'writing',
    slug: 'what-a-studio-clock-teaches-about-simultaneity',
    title: 'What a studio clock teaches about simultaneity',
    date: '2026-08-14',
    topic: 'Physics',
    minutes: 9,
    href: anchor('what-a-studio-clock-teaches-about-simultaneity'),
  },
  {
    kind: 'writing',
    slug: 'lessons-from-software-that-has-to-work-live',
    title: 'Lessons from software that has to work live',
    date: '2026-05-02',
    topic: 'Engineering',
    minutes: 11,
    href: anchor('lessons-from-software-that-has-to-work-live'),
  },
  {
    kind: 'writing',
    slug: 'a-fermi-estimate-for-a-dyson-swarm',
    title: 'A Fermi estimate for a Dyson swarm',
    date: '2025-11-09',
    topic: 'Futurism',
    minutes: 12,
    href: anchor('a-fermi-estimate-for-a-dyson-swarm'),
  },
  {
    kind: 'writing',
    slug: 'why-error-bars-belong-in-the-headline',
    title: 'Why error bars belong in the headline',
    date: '2025-06-18',
    topic: 'Science',
    minutes: 6,
    href: anchor('why-error-bars-belong-in-the-headline'),
  },
  {
    // Real legacy title.
    kind: 'writing',
    slug: 'the-observer-effect',
    title: 'The Observer Effect',
    date: '2024-09-22',
    topic: 'Physics',
    minutes: 8,
    href: anchor('the-observer-effect'),
  },
  {
    // Real legacy title.
    kind: 'writing',
    slug: 'the-invisible-helper',
    title: 'The Invisible Helper',
    date: '2024-01-02',
    topic: 'Engineering',
    minutes: 7,
    href: anchor('the-invisible-helper'),
  },
];

const bySlug = <T extends { slug: string }>(
  list: readonly T[],
  slug: string,
) => {
  const found = list.find((item) => item.slug === slug);
  if (!found) throw new Error(`Missing sample entry: ${slug}`);
  return found;
};

/** The four project card variants shown in the Project card section. */
export const cardVariants: ProjectEntry[] = [
  bySlug(sampleProjects, 'daemon-services-in-rust'),
  bySlug(sampleProjects, 'zeromq-traffic-explorer'),
  bySlug(sampleProjects, 'start-page'),
  bySlug(sampleProjects, 'clock-drift-simulator'),
];

/** Five rows for the Writing list section, newest first. */
export const writingRows: WritingEntry[] = sampleWriting.slice(0, 5);

/** Entries for the Index section: two years, so the rhythm is visible. */
export const indexEntries: IndexEntry[] = [
  ...sampleProjects,
  ...sampleWriting,
].filter((entry) => {
  const year =
    entry.kind === 'writing'
      ? Number.parseInt(entry.date.slice(0, 4), 10)
      : entry.year;
  return year === 2026 || year === 2025;
});
