// Injects server-rendered HTML into dist/ per route, so search engines and AI crawlers
// (GPTBot, ClaudeBot, PerplexityBot don't run JS) read real content, not an empty #root.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { render } from '../dist-ssr/entry-server.js';

const SITE = 'https://codexmanvik.github.io';
const template = readFileSync('dist/index.html', 'utf8');

const routes = [
  { url: '/', out: 'dist/index.html' },
  {
    url: '/certifications/',
    out: 'dist/certifications/index.html',
    title: 'Certifications — Manvik Talwar, AI/ML Engineer',
    description: 'Generative AI, LLM, Azure AI, Google Cloud, deep learning and machine learning certifications earned by Manvik Talwar, AI/ML engineer.',
  },
];

function page({ url, title, description }) {
  let html = template.replace('<!--app-->', render(url));
  if (title) {
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
      .replace(/(property="og:title" content=")[^"]*/, `$1${title}`)
      .replace(/(name="twitter:title" content=")[^"]*/, `$1${title}`);
  }
  if (description) {
    html = html.replace(/((?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*/g, `$1${description}`);
  }
  return html
    .replace(/(rel="canonical" href=")[^"]*/, `$1${SITE}${url}`)
    .replace(/(property="og:url" content=")[^"]*/, `$1${SITE}${url}`);
}

for (const r of routes) {
  mkdirSync(r.out.replace(/\/[^/]+$/, ''), { recursive: true });
  writeFileSync(r.out, page(r));
}
// GitHub Pages serves 404.html for unknown paths; the SPA takes over from there.
writeFileSync('dist/404.html', template.replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'));
rmSync('dist-ssr', { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes`);
