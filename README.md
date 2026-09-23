# Tihomir Selak — personal site

Public personal landing page for Tihomir Selak, Development Team Lead and Senior Software Engineer. The target URL is [tihomir-selak.from.hr](https://tihomir-selak.from.hr/).

This is a framework-neutral repository seed. The Astro application and publishable case-study content will be added after the repository and Netlify project are created.

## Local checks

```text
corepack enable
yarn install --immutable
yarn check
yarn build
```

The temporary build writes the deployable output to `dist/`.

## Deployment

Pushes to `main` run the check and build job. A successful `main` build is deployed with the pinned official Netlify CLI (`27.8.0`) using the `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` GitHub Actions secrets. Pull requests run the quality job only.
