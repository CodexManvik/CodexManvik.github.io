#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const username = process.env.GITHUB_USERNAME || 'CodexManvik';
const url = `https://ghchart.rshah.org/${username}`;

async function main() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
    let svg = await res.text();

    // Make the SVG responsive and inject dark-theme-friendly styles that override inline fills.
    svg = svg.replace(/<svg([^>]*)>/, (match, attrs) => {
      const cleaned = attrs.replace(/\s(width|height)="[^"]*"/g, '');
      return `<svg${cleaned} style="width:100%;height:auto;max-width:720px" aria-hidden="true">`;
    });

    const style = `\n<style>\n  rect[data-score="0"]{fill:transparent !important;stroke:rgba(148,163,184,0.06) !important}\n  rect[data-score="1"]{fill:#164e63 !important}\n  rect[data-score="2"]{fill:#16a34a !important}\n  rect[data-score="3"]{fill:#059669 !important}\n  rect[data-score="4"]{fill:#0f5132 !important}\n  text{fill:#94a3b8 !important}\n  svg{background:transparent}\n</style>\n`;

    svg = svg.replace(/(<svg[^>]*>)/, `$1\n${style}`);

    const outDir = path.join(process.cwd(), 'public', 'assets');
    await fs.mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, 'github-contrib.svg');
    await fs.writeFile(outPath, svg, 'utf8');
    console.log('Wrote', outPath);
  } catch (err) {
    console.error('Error fetching/converting SVG:', err);
    process.exit(1);
  }
}

main();
