import { mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tihomir Selak — Personal site</title>
  </head>
  <body>
    <main>
      <h1>Tihomir Selak</h1>
      <p>The personal site is being rebuilt. The full Astro implementation will replace this repository seed.</p>
    </main>
  </body>
</html>
`;

await writeFile('dist/index.html', html, 'utf8');
