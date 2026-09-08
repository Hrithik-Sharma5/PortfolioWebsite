/**
 * Injects statically rendered HTML into dist/index.html after the Vite build.
 *
 * Without this the deployed page ships an empty <div id="root"></div>. Google
 * will eventually execute the JS and index the rendered result, but that render
 * is queued and can lag by days; Bing and most other crawlers do far less JS
 * execution, and link unfurlers do none. Prerendering puts the real copy,
 * headings and links in the initial HTML response for every one of them.
 *
 * The client hydrates this markup rather than re-rendering it (see main.tsx).
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');
const serverEntry = resolve(root, 'dist-ssr/entry-server.js');

const PLACEHOLDER = '<div id="root"></div>';
const SCHEMA_MARKER = '<!--structured-data-->';

if (!existsSync(serverEntry)) {
  console.error(`[prerender] missing SSR build at ${serverEntry}`);
  process.exit(1);
}

const { render, structuredData } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();
const schema = structuredData();

if (!appHtml || appHtml.length < 500) {
  console.error(`[prerender] refusing to write suspiciously small output (${appHtml?.length ?? 0} chars)`);
  process.exit(1);
}

const html = readFileSync(htmlPath, 'utf8');

for (const marker of [PLACEHOLDER, SCHEMA_MARKER]) {
  if (!html.includes(marker)) {
    console.error(`[prerender] could not find ${marker} in dist/index.html`);
    process.exit(1);
  }
}

const out = html
  .replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`)
  .replace(
    SCHEMA_MARKER,
    `<script type="application/ld+json">${schema.replace(/</g, '\\u003c')}</script>`
  );

writeFileSync(htmlPath, out, 'utf8');

// The SSR bundle is a build artefact, not something to deploy.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });

const text = appHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const nodes = JSON.parse(schema)['@graph'].length;
console.log(
  `[prerender] injected ${(appHtml.length / 1024).toFixed(1)} kB of HTML ` +
    `(${text.split(' ').length} words of crawlable text) and ${nodes} structured-data nodes`
);
