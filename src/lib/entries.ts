/**
 * Entry types for the index (projects and writing) and the pure helper that
 * groups them for the mixed index grid. No Astro imports on purpose, so this
 * stays testable and reusable at build time.
 */

export type ProjectType = 'work' | 'side' | 'interactive';

export type PreviewKind = 'screenshot' | 'diagram' | 'demo';

export type WritingTopic = string;

export interface ImagePreview {
  kind: PreviewKind;
  /** Resolved image URL (for example `metadata.src` of an imported asset). */
  src: string;
  width: number;
  height: number;
  /** Required: describes what the still shows. */
  alt: string;
}

export interface ProjectEntry {
  kind: 'project';
  slug: string;
  title: string;
  summary: string;
  type: ProjectType;
  year: number;
  /**
   * Optional ISO date (YYYY-MM-DD) used only to order projects inside a year,
   * because projects otherwise carry just a year. Newer dates sort first.
   * Entries without one sort after dated entries, then by title, so the
   * ordering is always stable.
   */
  date?: string;
  tags: readonly string[];
  href?: string;
  preview?: ImagePreview;
  feature?: boolean;
}

export interface WritingEntry {
  kind: 'writing';
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  topic: WritingTopic;
  /** Reading time in minutes. */
  minutes: number;
  href: string;
}

export type IndexEntry = ProjectEntry | WritingEntry;

export type IndexRun =
  | { kind: 'projects'; items: ProjectEntry[] }
  | { kind: 'writing'; items: WritingEntry[] };

export interface IndexGroup {
  year: number;
  runs: IndexRun[];
}

/** Sort key, larger means newer. Year-only projects sit at the end of the year. */
function sortKey(entry: IndexEntry): string {
  if (entry.kind === 'writing') return entry.date;
  return entry.date ?? `${entry.year}-00-00`;
}

function yearOf(entry: IndexEntry): number {
  return entry.kind === 'writing'
    ? Number.parseInt(entry.date.slice(0, 4), 10)
    : entry.year;
}

function compareNewestFirst(a: IndexEntry, b: IndexEntry): number {
  const byKey = sortKey(b).localeCompare(sortKey(a));
  if (byKey !== 0) return byKey;
  return a.title.localeCompare(b.title);
}

/**
 * Groups entries by year (newest first), sorts each year newest first, then
 * chunks consecutive entries of the same kind into runs. Does not mutate the
 * input.
 */
export function groupIndex(entries: readonly IndexEntry[]): IndexGroup[] {
  const byYear = new Map<number, IndexEntry[]>();
  for (const entry of entries) {
    const year = yearOf(entry);
    const bucket = byYear.get(year);
    if (bucket) bucket.push(entry);
    else byYear.set(year, [entry]);
  }

  return [...byYear.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, bucket]) => {
      const runs: IndexRun[] = [];
      for (const entry of [...bucket].sort(compareNewestFirst)) {
        const last = runs.at(-1);
        if (entry.kind === 'project') {
          if (last?.kind === 'projects') last.items.push(entry);
          else runs.push({ kind: 'projects', items: [entry] });
        } else if (last?.kind === 'writing') {
          last.items.push(entry);
        } else {
          runs.push({ kind: 'writing', items: [entry] });
        }
      }
      return { year, runs };
    });
}
