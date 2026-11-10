#!/usr/bin/env node
// Export a CV markdown file to PDF, HTML, DOCX (and plain MD copy).
// Usage: node scripts/export.mjs [input.md] [--format pdf,html,docx,md] [--out dir] [--name file-base]
// Defaults: workspace/cv.md -> workspace/export/. Prints the PDF page count.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { marked } from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const opts = { input: path.join(root, 'workspace', 'cv.md'), formats: ['pdf', 'html', 'docx'], out: path.join(root, 'workspace', 'export'), name: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--format') opts.formats = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--out') opts.out = path.resolve(argv[++i]);
    else if (a === '--name') opts.name = argv[++i];
    else if (a === '--help' || a === '-h') { console.log('Usage: node scripts/export.mjs [input.md] [--format pdf,html,docx,md] [--out dir] [--name file-base]'); process.exit(0); }
    else if (!a.startsWith('--')) opts.input = path.resolve(a);
    else throw new Error(`Unknown option ${a}`);
  }
  return opts;
}

// The CV header (name, title, contact list) comes before the first "## " heading.
function splitHeader(md) {
  const idx = md.search(/^## /m);
  const head = md.slice(0, idx).split('\n');
  const body = md.slice(idx);
  const name = (head.find((l) => l.startsWith('# ')) || '# CV').slice(2).trim();
  const title = ((head.find((l) => /^\*\*.+\*\*$/.test(l.trim())) || '').trim()).replace(/^\*\*|\*\*$/g, '');
  // Drop the "Label: " prefix so the contact line stays compact on one row.
  const contacts = head.filter((l) => l.startsWith('- ')).map((l) => l.slice(2).trim().replace(/^[A-Za-z]+:\s*/, ''));
  return { name, title, contacts, body };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Emails and URLs in the contact line become links so parsers can identify them.
const linkify = (c) => /@/.test(c) ? `<a href="mailto:${esc(c)}">${esc(c)}</a>` : /^[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(c) ? `<a href="https://${esc(c)}">${esc(c)}</a>` : esc(c);

const CSS = `
:root { --accent: #e8eef5; } /* header colour: change to taste */
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; color: #2b2b2b; font-size: 9pt; line-height: 1.33; margin: 0; font-variant-ligatures: none; }
header { background: var(--accent); padding: 7mm 13mm 5mm; }
header h1 { margin: 0; font-size: 24pt; text-transform: uppercase; line-height: 1.1; }
header .title { margin-top: 2px; font-size: 10.5pt; font-weight: 700; text-transform: uppercase; color: #3a3a3a; }
header .contacts { margin-top: 6px; font-size: 8.4pt; color: #333; }
main { padding: 2mm 13mm 4mm; }
h2 { font-size: 10.5pt; text-transform: uppercase; margin: 8px 0 3px; border-bottom: 1px solid #ddd; padding-bottom: 2px; }
h3 { font-size: 10.4pt; margin: 6px 0 0; }
h3 + p { margin: 0 0 3px; color: #666; }
.org { margin: 0 0 2px !important; color: #444 !important; font-weight: 600; font-style: normal; }
.dates { color: #666; font-weight: 400; font-style: italic; }
header a { color: inherit; text-decoration: none; }
p { margin: 3px 0; }
ul { margin: 3px 0 3px 4mm; padding-left: 3mm; }
li { margin: 1px 0; }
h2 + ul { columns: 3; column-gap: 8mm; margin-left: 0; padding-left: 4mm; }
h2 + ul li { break-inside: avoid; }
h2 + ul.short { columns: 1; }
.skillbox + ul { }
.two { display: grid; grid-template-columns: 1.7fr 1.2fr 0.8fr 1.3fr; gap: 0 6mm; }
.two h3 { font-size: 9.6pt; }
.two > div > h2:first-child { margin-top: 8px; }
`;

function buildHtml(md, opts) {
  const { name, title, contacts, body } = splitHeader(md);
  // Strip HTML comments (TODO notes) so they never reach any export.
  const cleaned = body.replace(/<!--[\s\S]*?-->/g, '');
  const sections = cleaned.split(/^(?=## )/m).filter(Boolean);
  const render = (s) => {
    let html = marked.parse(s);
    // "### Company: Title" renders as the title on its own line with the company beneath, which parsers read reliably.
    html = html.replace(/<h3>([^<]*?):\s*([^<]+)<\/h3>\s*<p><em>([^<]+)<\/em><\/p>/g, '<h3>$2</h3><p class="org">$1 <span class="dates">· $3</span></p>');
    html = html.replace(/<h3>([^<]*?):\s*([^<]+)<\/h3>/g, '<h3>$2</h3><p class="org">$1</p>');
    // Only the Skills list gets columns; other lists in the first position stay single-column.
    if (!/^## Skills/m.test(s)) html = html.replace(/<h2>([\s\S]*?)<\/h2>\s*<ul>/g, '<h2>$1</h2><ul class="short">');
    return html;
  };
  const byName = (n) => sections.find((s) => s.startsWith(`## ${n}`)) || '';
  const used = new Set();
  const take = (n) => { const s = byName(n); if (s) used.add(s); return s ? render(s) : ''; };
  // Footer sections sit in two columns at the bottom; every other section renders in source order.
  const FOOT_A = ['Education', 'Certifications'];
  const FOOT_B = ['Languages', 'Interests'];
  const isFoot = (s) => [...FOOT_A, ...FOOT_B].some((n) => s.startsWith(`## ${n}`));
  const main = sections.filter((s) => !isFoot(s)).map(render).join('\n');
  const foot = [...FOOT_A, ...FOOT_B].map((n) => `<div>${take(n)}</div>`).join('');
  const rest = '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(name)} - CV</title><style>${CSS}</style></head><body>
<header><h1>${esc(name)}</h1><div class="title">${esc(title)}</div><div class="contacts">${contacts.map(linkify).join(' · ')}</div></header>
<main>${main}<div class="two">${foot}</div>${rest}</main></body></html>`;
}

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) throw new Error('No Chrome, Edge or Chromium found for PDF export. Install one, or set CHROME_PATH.');
  return found;
}

// Count pages by their /Type /Page objects (not /Pages).
const pageCount = (pdfPath) => (fs.readFileSync(pdfPath, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const md = fs.readFileSync(opts.input, 'utf8');
  const base = opts.name || path.basename(opts.input, '.md');
  fs.mkdirSync(opts.out, { recursive: true });
  const html = buildHtml(md, opts);
  const htmlPath = path.join(opts.out, `${base}.html`);
  const written = [];

  // HTML is always written because the PDF step needs it.
  fs.writeFileSync(htmlPath, html);
  if (opts.formats.includes('html')) written.push(htmlPath);

  if (opts.formats.includes('pdf')) {
    const pdfPath = path.join(opts.out, `${base}.pdf`);
    execFileSync(chromePath(), ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href], { stdio: 'ignore' });
    written.push(pdfPath);
    console.log(`PDF pages: ${pageCount(pdfPath)}`);
  }
  if (opts.formats.includes('docx')) {
    const { default: HTMLtoDOCX } = await import('html-to-docx');
    const buf = await HTMLtoDOCX(html, null, { table: { row: { cantSplit: true } }, font: 'Arial', fontSize: 20, margins: { top: 720, right: 720, bottom: 720, left: 720 } });
    const p = path.join(opts.out, `${base}.docx`);
    fs.writeFileSync(p, buf);
    written.push(p);
  }
  if (opts.formats.includes('md')) {
    const p = path.join(opts.out, `${base}.md`);
    fs.writeFileSync(p, md.replace(/<!--[\s\S]*?-->/g, ''));
    written.push(p);
  }
  if (!opts.formats.includes('html')) fs.rmSync(htmlPath, { force: true });
  written.forEach((p) => console.log(`wrote ${path.relative(process.cwd(), p)}`));
}

main().catch((e) => { console.error(e.message); process.exit(1); });
