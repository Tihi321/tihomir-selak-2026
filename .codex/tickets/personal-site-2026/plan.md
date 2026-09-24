# Personal site 2026 — implementation plan

Status: local implementation complete; CV publication approval pending; Netlify credentials intentionally deferred
Repository: `Tihi321/tihomir-selak-2026`
Local project: `C:\projects\Personal\tihomir-selak-2026`
Target origin: `https://tihomir-selak.from.hr/`
Prepared: 23 September 2026

## 1. Objective

Replace the repository seed with a production-quality, static Astro portfolio that makes Tihomir's current role, engineering scope, leadership value, and strongest evidence understandable within 30 seconds.

The first implementation milestone is a fully working local site. It must build to `dist/`, pass automated checks, and be ready to preview without requiring a Netlify account, token, site ID, server-side runtime, database, CMS, contact-form service, or analytics service.

## 2. Product decision

Build one concise professional front door, not a combined portfolio/blog/application portal.

- The homepage is a proof-led single page for engineering leaders, hiring managers, technical peers, and selected consulting contacts.
- The future blog remains a separate site at `blog.tihomir-selak.from.hr` and is not linked until it exists.
- The custom start page, short stories, Kobilica archive, and future German company remain separate projects.
- Contact is through direct links only. Do not add a form, cookies, analytics, newsletter, or user accounts.
- Use only verified public facts. Do not invent metrics, customer names, availability, or confidential product details.

## 3. Authoritative content sources

Use these files as facts, not merely inspiration:

- `C:\projects\Cowork\Job\cv\cv_content.json`
- `C:\projects\Cowork\Job\cv\Tihomir-Selak-CV-2026.pdf`
- `C:\projects\Cowork\Job\research\career-facts.md`
- `C:\projects\Cowork\Job\linkedin\profile-update-draft.md`
- `C:\projects\Cowork\Job\personal-websites\projects\01-personal-site\README.md`

The old `astro-blog-2024` homepage and app catalogue are migration references only. Do not copy their generic futurist introduction, AI caricature, equal-weight project grid, theme implementation, or blog routes into this repository.

### Personal data library and source precedence

Future implementers are explicitly authorized to read `C:\projects\Cowork\Job` as the maintained personal-data and planning library for this site. They must not treat the implementation repository as the only source of truth.

Use sources in this order when facts overlap:

1. `research\career-facts.md` for user-confirmed career, leadership, education, and language facts.
2. `cv\cv_content.json` for structured public copy, chronology, links, skills, and portfolio summaries.
3. `research\repository-evidence.md` for private supporting evidence and claim boundaries; its commit counts and internal details are not publication copy unless the user separately approves them.
4. `linkedin\profile-update-draft.md` for tone and profile phrasing, provided it does not conflict with the files above.
5. `source\` for original documents and certificates. These are verification inputs, not files to publish or copy into the website.

Implementation rules:

- Read only the files needed for the current section; do not copy the whole `Job` folder into the website repository.
- Public contact details already listed in this plan may be used. Private documents, certificates, repository histories, local paths, and research notes must never be shipped in `public/`, bundled assets, metadata, test fixtures, or screenshots.
- If two maintained sources disagree, prefer the higher source above and record the conflict in the plan instead of guessing.
- New metrics, availability statements, testimonials, customer names, employer screenshots/logos, internal architecture, or code require user approval even when related evidence exists locally.
- The site's prose may be shortened for clarity, but facts, dates, employer relationships, and scope must not be strengthened beyond the source material.
- Before final verification, re-read the source files' modification dates and reconcile any facts that changed while implementation was in progress.

## 4. Working public narrative

Use this as the first editorial draft. Improve rhythm and brevity during implementation without changing facts.

### Hero

**Headline:** I lead teams and build software for systems that have to work live.

**Introduction:** I’m Tihomir Selak, a Development Team Lead and Senior Software Engineer. Employed by TrackMen GmbH and working with its sister company Pixotope, I build and lead delivery across the software behind real-time augmented reality and virtual-production workflows.

**Primary action:** View selected work
**Secondary action:** Contact me
**Utility actions:** Download CV, GitHub, LinkedIn

Do not add “available for work,” “open to opportunities,” or consulting availability unless the user confirms it later.

### Selected work

Present three full-width evidence stories rather than a grid of identical project cards:

1. **Delivery leadership across a connected product suite**
   - Own work intake, triage, complex debugging, technical direction, code review, and delivery health.
   - Lead two engineers today and previously supported up to five, with formal performance responsibility and regular one-to-ones.
   - Coordinate work spanning frontend, desktop, services, networking, packaging, testing, and CI/CD.

2. **Shared foundations for frontend teams**
   - Started and stewarded a reusable React and TypeScript component library.
   - Introduced and expanded selector-based state patterns.
   - Frame the outcome as maintainability, consistency, and shared delivery foundations; do not supply invented adoption numbers.

3. **Tools for real-time systems**
   - Explain the cross-language work behind Rust services and Tauri tools, Python services, automated documentation, device simulators, and a ZeroMQ Explorer.
   - Emphasize diagnostics, service orchestration, network discovery, testing, and understandable operation under time pressure.

Until screenshots are explicitly approved, use typography, small code-free system diagrams, and factual text. Do not use company screenshots, logos, source code, UI replicas, or internal metrics.

### How I work

This is a real sequence, so numbered steps are appropriate:

1. Clarify the operational problem and constraints.
2. Break ambiguity into decisions and executable work.
3. Match ownership to engineers' strengths and growth goals.
4. Keep delivery observable through review, tests, documentation, and feedback.

### Experience

Use a compact timeline:

- TrackMen GmbH / Pixotope — Development Team Lead, July 2022 to present.
- Pixotope — JavaScript Engineer, August 2020 to July 2022.
- Kobilica — Owner and Software Consultant, June 2021 to November 2025.
- Infinum — JavaScript Developer, January to August 2020; WordPress Developer, June 2018 to December 2019.
- Earlier work — web development, technical instruction, video production, and live AV.

Keep the homepage summary concise. The CV provides the full chronology.

### Contact

- Email: `tihomir.selak@outlook.com`
- LinkedIn: `https://www.linkedin.com/in/selaktihomir/`
- GitHub: `https://github.com/Tihi321`
- Location: Augsburg, Germany / Greater Munich area
- CV: `/Tihomir-Selak-CV-2026.pdf`

## 5. Information architecture

Version 1 routes:

- `/` — the complete professional landing page.
- `/404.html` — useful static not-found page with a route back home.
- `/Tihomir-Selak-CV-2026.pdf` — copied from the authoritative CV output.
- `/social-card.png` — 1200 × 630 social preview.
- `/favicon.svg` and standard icon metadata.

Homepage landmark and section order:

1. Skip link and site header.
2. Hero / identity and value.
3. Selected work.
4. How I work.
5. Experience snapshot.
6. Contact and footer.

Header navigation: `Work`, `Approach`, `Experience`, `Contact`, plus `CV`. Omit `Blog` until the new blog has a verified live URL.

## 6. Visual direction

### Concept: signal routing for software delivery

Use the visual language of a broadcast routing surface without imitating a literal control panel. A quiet route line connects the page's major evidence sections, suggesting that ambiguous inputs become reliable delivery. The line is the one memorable motif; everything else stays restrained.

Desktop sketch:

```text
┌──────────────────────────────────────────────────────────────┐
│ Tihomir Selak       Work  Approach  Experience  Contact  CV │
├─────────────┬────────────────────────────────────────────────┤
│ signal rail │ I lead teams and build software for systems   │
│ ● live      │ that have to work live.                       │
│             │ Short verified introduction and actions       │
├─────────────┼────────────────────────────────────────────────┤
│ route ●─────│ Selected work story 1: leadership             │
│       ●─────│ Selected work story 2: shared foundations     │
│       ●─────│ Selected work story 3: real-time tooling      │
├─────────────┼────────────────────────────────────────────────┤
│ route steps │ How I work                                    │
├─────────────┼────────────────────────────────────────────────┤
│ timeline    │ Experience                                    │
├─────────────┴────────────────────────────────────────────────┤
│ Contact, location, CV, GitHub, LinkedIn                     │
└──────────────────────────────────────────────────────────────┘
```

On mobile, collapse to one content column. The signal rail becomes a short horizontal route marker at the start of each evidence section. Do not hide navigation; let essential links wrap cleanly or use a semantic, keyboard-accessible native disclosure if required at 320 px.

### Design tokens

Start with this compact palette and tune only after screenshot review:

- `--color-canvas: #F3F7F8` — cool, low-glare page background.
- `--color-surface: #FFFFFF` — primary reading surface.
- `--color-ink: #14262F` — main text and strong lines.
- `--color-muted: #587079` — secondary text.
- `--color-route: #2B7A78` — routing line and interactive emphasis.
- `--color-tally: #D84A3E` — sparing live/tally accent, never large background fill.
- `--color-rule: #B8C8CD` — structural separators.

Typography:

- Use one self-hosted variable sans family, `Archivo`, with weight and width variation to create hierarchy without a generic display/body pairing.
- Use the Astro Fonts API with a local or Fontsource provider and serve the resulting files from the site. No runtime request to Google Fonts.
- Body copy: 17–19 px, line-height 1.55–1.7, maximum line length 68 characters.
- Hero: responsive `clamp()` scale with a deliberate width treatment; no isolated accent word, gradient text, typewriter effect, or oversized decorative punctuation.
- Use tabular numerals for dates and sequence numbers. Do not introduce a monospace font merely to make labels look technical.

Layout:

- Maximum page width around 1240 px with fluid gutters.
- Desktop content follows a 12-column grid; left signal rail uses roughly 2–3 columns and content uses the rest.
- Left-align copy. Avoid centered paragraphs except tiny standalone utility text.
- Evidence stories use asymmetrical editorial rows, not identical rounded cards.
- Border radii are small and reserved for controls; section structure comes from alignment, rules, and spacing.

Motion:

- Allow one short route-line draw or tally activation in the hero after first paint.
- All other motion responds to user action.
- Disable decorative motion under `prefers-reduced-motion: reduce`.
- Do not stagger every section, animate text on scroll, or add parallax.

### Design self-critique

An initial dark “control room with neon accent” direction was rejected because it is a common developer-portfolio treatment. The chosen cool light control-surface palette, restrained tally red, single variable type family, and evidence-linked routing spine are more specific to Tihomir's broadcast/virtual-production background without turning the page into a themed dashboard.

Also reject these template patterns during implementation:

- skill percentage bars, logo clouds, and technology badge walls;
- a grid of identical project cards;
- glassmorphism, gradient blobs, and generic dark mode as the main identity;
- all-caps eyebrow text above every heading;
- decorative `01 / 02 / 03` labels where content is not sequential;
- stock imagery or an AI-generated portrait.

## 7. Technical architecture

### Foundation

- Astro 7.x, resolved to the current stable patch when implementation begins.
- Static output only; no Netlify adapter, SSR, server islands, database, or API routes.
- Node 24 and Yarn 4.9.2, preserving the existing package-manager pin.
- TypeScript strict configuration.
- Astro components and plain CSS. Add no React/Solid/Vue integration unless an actual interaction cannot be implemented accessibly with HTML and CSS.

### Suggested dependencies

Runtime/build:

- `astro`
- `@astrojs/check`
- `@astrojs/sitemap`
- `typescript`

Development and verification:

- `prettier`
- `prettier-plugin-astro`
- `@playwright/test`
- `@axe-core/playwright`

Do not add Tailwind, a component library, animation library, state manager, icon bundle, or client framework for version 1.

### Proposed source structure

```text
src/
  components/
    ContactLinks.astro
    ExperienceTimeline.astro
    HowIWork.astro
    SelectedWork.astro
    SiteFooter.astro
    SiteHeader.astro
    SignalRail.astro
  data/
    experience.ts
    selectedWork.ts
    site.ts
  layouts/
    BaseLayout.astro
  pages/
    404.astro
    index.astro
  styles/
    global.css
    tokens.css
  assets/
    fonts/
    social/
public/
  Tihomir-Selak-CV-2026.pdf
  favicon.svg
  robots.txt
tests/
  home.spec.ts
  accessibility.spec.ts
  metadata.spec.ts
astro.config.mjs
playwright.config.ts
tsconfig.json
```

Keep content in typed data modules so later edits do not require rewriting layout markup. Prefer semantic HTML and native behavior over client scripts.

## 8. Implementation phases

### Phase 0 — establish a safe baseline

1. Read this entire plan and the repository instructions before editing.
2. Verify `main` is clean and synchronized with `origin/main`.
3. Create a feature branch such as `feat/personal-site` unless the user explicitly requests direct work on `main`.
4. Record the existing successful placeholder build and workflow behavior.
5. Preserve the credential-aware Netlify deployment guard.

Exit criteria: the placeholder still builds and no uncommitted user work is overwritten.

### Phase 1 — replace the placeholder with Astro

1. Remove `scripts/build-placeholder.mjs` after Astro is installed.
2. Add Astro 7.x, strict TypeScript, sitemap, formatting, and test dependencies.
3. Create `astro.config.mjs` with:
   - `site: 'https://tihomir-selak.from.hr'`;
   - static output;
   - sitemap integration;
   - self-hosted font configuration.
4. Replace package scripts with at least:
   - `dev`;
   - `check` (`astro check`);
   - `build` (`astro check && astro build`);
   - `preview`;
   - `format` and `format:check`;
   - `test:e2e`.
5. Regenerate `yarn.lock` with Yarn 4 and verify `yarn install --immutable` succeeds.

Exit criteria: a minimal Astro page builds locally to `dist/` on Node 24.

### Phase 2 — build the design foundation

1. Implement tokens, global reset, typography, focus styles, reduced-motion behavior, and responsive grid.
2. Build `BaseLayout`, semantic header/footer, skip link, canonical metadata, and navigation.
3. Implement the signal-routing motif as HTML/CSS or an accessible decorative SVG with `aria-hidden="true"`.
4. Confirm 320 px rendering before adding all content.

Exit criteria: the shell is visually distinctive, keyboard usable, and stable from 320 to 1440 px.

### Phase 3 — implement verified content

1. Add typed data modules for site metadata, selected work, and experience.
2. Build the hero with the working narrative and real contact actions.
3. Build three selected-work evidence stories.
4. Build the four-step “How I work” sequence.
5. Build the compact experience timeline.
6. Copy the 2026 CV PDF into `public/` and verify the link.
7. Add contact/footer links with accessible names and `rel="noopener noreferrer"` on new-tab external links.

Exit criteria: every public claim traces to an authoritative source and the page contains no placeholder text.

### Phase 4 — metadata, assets, and resilience

1. Add a descriptive title and meta description focused on engineering leadership and real-time systems.
2. Add canonical URL, Open Graph, Twitter card, favicon, theme color, and a committed 1200 × 630 social image.
3. Add `Person` JSON-LD using only public fields.
4. Add `robots.txt`, generated sitemap, and a useful 404 page.
5. Extend `netlify.toml` with tested static security headers:
   - `X-Content-Type-Options`;
   - `Referrer-Policy`;
   - `Permissions-Policy`;
   - frame protection through CSP `frame-ancestors` or equivalent.
6. Test any CSP against the production build before making it strict. Do not break Astro assets or fonts.

Exit criteria: metadata validates, assets are local, and no production page depends on a third-party runtime request.

### Phase 5 — automated verification

1. Configure Playwright against `astro preview` and the production build.
2. Add tests for:
   - a single visible `h1` and correct section landmarks;
   - working anchor navigation;
   - email, GitHub, LinkedIn, and CV links;
   - canonical, description, Open Graph, and JSON-LD metadata;
   - 404 behavior;
   - no horizontal overflow at 320, 390, 768, and 1440 px;
   - keyboard-visible focus;
   - automated axe scan with no serious or critical violations.
3. Run a manual keyboard pass and 200% zoom review.
4. Run Lighthouse against the production preview. Target at least 95 for Performance, Accessibility, Best Practices, and SEO; treat Core Web Vitals and actual defects as more important than a vanity score.

Exit criteria: local checks and responsive/accessibility review pass.

### Phase 6 — CI and documentation

1. Update the quality job to run the immutable install, formatting check, Astro check, build, browser installation, and Playwright/axe smoke tests.
2. Keep production deployment conditional on both `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.
3. Add `workflow_dispatch` while preserving push and pull-request triggers.
4. Update the repository README with:
   - purpose and target audience;
   - screenshot after design approval;
   - local setup and commands;
   - architecture summary;
   - content-source and confidentiality rules;
   - deployment notes.
5. Confirm the workflow passes without Netlify credentials and reports that deployment was skipped.

Exit criteria: GitHub Actions is green and local documentation is sufficient for another agent or developer.

### Phase 7 — visual critique and polish

1. Run the local production preview.
2. Capture desktop and mobile screenshots at 1440 × 1000 and 390 × 844.
3. Critique hierarchy, line length, rhythm, contrast, and whether the route motif helps rather than decorates.
4. Remove at least one unnecessary visual element if the page feels busy.
5. Check that a first-time visitor can identify the role, domain, three proofs of work, and contact route within 30 seconds.

Exit criteria: the design reads as Tihomir's site rather than a portfolio template.

## 9. Deferred Netlify phase

Do not block local implementation on deployment.

When the user is ready:

1. Create or import the Netlify project from `Tihi321/tihomir-selak-2026`.
2. Set build command `yarn build` and publish directory `dist` (already versioned in `netlify.toml`). A static Astro site does not need the Netlify adapter.
3. Add GitHub Actions secrets:
   - `NETLIFY_AUTH_TOKEN`;
   - `NETLIFY_SITE_ID`.
4. Push a harmless change or manually dispatch after a `workflow_dispatch` trigger is added.
5. Verify the temporary `netlify.app` URL before connecting the custom domain.
6. Cut over `tihomir-selak.from.hr` only after responsive, accessibility, metadata, redirects, and security headers are verified.

Never place credentials in the repository, plan, `.env` committed files, logs, or screenshots.

## 10. Acceptance criteria

The implementation is complete when all of the following are true:

- The placeholder script is gone and Astro 7 builds the site statically.
- The homepage communicates current role, real-time/virtual-production domain, three evidence stories, leadership approach, experience, and contact path within 30 seconds.
- Every claim is verified; there are no invented metrics or confidential artifacts.
- The site has no broken, disabled, or “coming soon” navigation.
- The site works with JavaScript disabled.
- No horizontal overflow occurs at 320, 390, 768, 1024, or 1440 px.
- Keyboard navigation, focus visibility, reduced motion, 200% zoom, and automated accessibility checks pass.
- The CV, GitHub, LinkedIn, and email actions work.
- Canonical, social metadata, sitemap, robots policy, JSON-LD, favicon, and 404 are present.
- All fonts and essential assets are self-hosted.
- `yarn install --immutable`, `yarn format:check`, `yarn check`, `yarn build`, and `yarn test:e2e` pass.
- GitHub Actions passes without Netlify credentials and safely skips deployment.
- The local working tree is clean and all intended changes are reviewable on a feature branch.

## 11. Execution prompt for Codex or another coding agent

Use this prompt from the repository root:

```text
Implement the complete plan at .codex/tickets/personal-site-2026/plan.md in this repository. Read the plan and all applicable repository instructions before changing files. Work phase by phase, preserve the existing credential-aware Netlify workflow, use only the authoritative content sources named in the plan, and do not invent metrics or publish confidential Pixotope/TrackMen material. Build and verify the site locally; Netlify credentials and production cutover are explicitly out of scope. Use the frontend-design skill for the visual implementation and provide desktop and mobile screenshots for final critique. Run every verification command in the plan and report any remaining approval gates.
```

If the coding environment contains the global `implement` skill, invoke it with this complete plan file as required by the machine's global instructions.

## 12. Approval gates that do not block the local build

The coding agent may complete the site using text and diagrams. It must ask before later adding any of these:

- Pixotope or TrackMen product screenshots;
- internal UI, source code, architecture diagrams, customer names, or metrics;
- a portrait or personal photograph not already approved for the site;
- a public availability statement;
- the future blog URL before it is live;
- analytics, tracking, third-party embeds, or a contact form.

## 13. Platform references

- [Astro 7 release](https://astro.build/blog/astro-7/)
- [Astro installation and Node requirements](https://docs.astro.build/en/install-and-setup/)
- [Astro TypeScript guidance](https://docs.astro.build/en/guides/typescript/)
- [Astro testing with Playwright](https://docs.astro.build/en/guides/testing/)
- [Astro custom-font guidance](https://docs.astro.build/en/guides/fonts/)
- [Deploying a static Astro site to Netlify](https://docs.astro.build/en/guides/deploy/netlify/)

## 14. Implementation checklist and verification record

Updated: 23 September 2026. Work was completed on branch `feat/personal-site` from the clean synchronized `main`; the original untracked ticket copy was preserved, synchronized with the authoritative personal-data precedence section above, and extended with this record.

### Delivery checklist

- [x] Replaced the seed with static Astro 7.3.4, strict TypeScript, sitemap, local Archivo variable font assets, and formatter/test tooling.
- [x] Implemented the responsive signal-routing design, semantic landmarks, skip link, visible focus, reduced-motion rules, metadata, JSON-LD, favicon, robots policy, sitemap, static 404, social card, and static security headers.
- [x] Built the verified profile, three evidence-led work stories, four-step approach, experience summary, and direct contact/profile links. No invented metrics, availability statement, customer names, or confidential product assets were added. Work stories use unnumbered route markers; numbering is reserved for the actual four-step sequence.
- [x] Header links use root-relative section URLs and were tested from both the home page and a missing route. The large decorative hero route is hidden at the mobile breakpoint.
- [x] Updated CI to check/build/test and preserved the credential-aware deployment guard. Netlify project setup, production deployment, and remote GitHub Actions execution were not performed.
- [x] Updated README, `.gitignore`, and this task record. Durable visual review captures are in `screenshots/home-desktop.png` and `screenshots/home-mobile.png`; test output and Lighthouse JSON remain in ignored `.codex/temp/`.
- [ ] Public CV download is not delivered. Two attempts to copy the plan's exact source, `C:\projects\Cowork\Job\cv\Tihomir-Selak-CV-2026.pdf`, into `public/` were rejected by auto-review because explicit approval to publish this exact personal document at the public destination was not established. No PDF or CV route/action is included. Do not retry or work around this gate; request document-specific publication approval first.

### Verification results

- `yarn install --immutable`: passed (Yarn 4.9.2; existing peer-dependency warning remains).
- `yarn format:check`: passed.
- `yarn check`: passed; 0 errors, 0 warnings, 0 hints.
- `yarn build`: passed; static `/`, `/404.html`, sitemap, and local font assets generated.
- `yarn test:e2e`: final suite passed **12/12** in Chromium. An earlier 11/11 suite passed before the local-font/no-external-request assertion was added. Coverage includes landmarks, navigation from home/404, direct links, no-JS, overflow at 320/390/720/768/1024/1440 px, visible keyboard focus, axe serious/critical scan, metadata, local assets/fonts, useful 404, and desktop/mobile screenshot capture.
- 720 px viewport/reflow proxy passed for the 1440 px desktop layout, but an actual browser 200% zoom review was **not run**. Automated focus-visibility passed, but a full manual keyboard traversal was **not run**.
- Lighthouse against the final Astro preview produced Performance 99, Accessibility 100, Best Practices 96, SEO 100; LCP 2.0 s. Lighthouse wrote its JSON report, then exited with a Windows `EPERM` while cleaning its temporary Chrome profile. Scores were read from the complete report; this cleanup issue did not affect the Playwright browser suite.
- Desktop screenshot is 1440 × 1000; mobile screenshot is 390 × 844. Visual review approved the hierarchy and reflow and requested removal of selected-work numbering and the mobile hero route decoration; both were addressed and the captures refreshed.
- The credential-guarded deployment workflow was inspected locally but was not run in GitHub Actions. No remote CI result is claimed. No production deploy, Netlify setup, old-site mutation, or push was performed.
- Before final verification, source modification times were re-read: career facts (22 Sep 2026 12:51), CV structured content (22 Sep 2026 12:37), repository evidence (22 Sep 2026 11:29), LinkedIn draft (22 Sep 2026 12:51), project README (23 Sep 2026 16:17), and CV PDF (22 Sep 2026 12:42). They were unchanged during this implementation; no unresolved fact conflict was found.
- Baseline placeholder script execution was not repeated before its removal. The starting branch had no uncommitted tracked work; the existing credential-aware workflow was retained and amended only for the local build/test pipeline and explicit credential guard.
