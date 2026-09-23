#!/usr/bin/env node
// Splices the Plausible snippet into every built page. Kept out of build.mjs
// (upstream-tracked) so upstream syncs never need to touch this file.

import { readdir, readFile, writeFile } from 'node:fs/promises';

const OUT = 'dist';
const SNIPPET = `<script async src="https://plausible.io/js/pa-ruTjFdt7ehFDY_M63D2u9.js"></script>
<script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()</script>`;

const files = (await readdir(OUT)).filter((f) => f.endsWith('.html'));
await Promise.all(files.map(async (file) => {
  const path = `${OUT}/${file}`;
  const html = await readFile(path, 'utf8');
  if (!html.includes('</head>')) {
    throw new Error(`${path}: no </head> to inject analytics into`);
  }
  await writeFile(path, html.replace('</head>', `${SNIPPET}\n</head>`));
}));
console.log(`Injected Plausible analytics into ${files.length} page(s).`);
