#!/usr/bin/env node
// Fetch full LinkedIn job adverts from the public (signed-out) endpoint and save them as text.
// Usage: node scripts/linkedin-job.mjs <job id> [<job id> ...] [--out workspace/jobs/linkedin]
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (!args.length || args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node scripts/linkedin-job.mjs <job id> [<job id> ...] [--out workspace/jobs/linkedin]');
  process.exit(0);
}
let out = 'workspace/jobs/linkedin';
const ids = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') out = args[++i];
  else ids.push(args[i].replace(/\D/g, ''));
}
fs.mkdirSync(out, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const text = (s) => s.replace(/<br\s*\/?>|<\/(p|li|h\d)>/gi, '\n').replace(/<li>/gi, '- ').replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
const pick = (html, re) => { const m = html.match(re); return m ? text(m[1]) : ''; };

for (const id of ids) {
  const file = path.join(out, `${id}.txt`);
  if (fs.existsSync(file) && fs.statSync(file).size > 500) { console.log(`${id}\tcached\t${file}`); continue; }
  let html = '';
  for (let attempt = 0; attempt < 4 && !html; attempt++) {
    const res = await fetch(`https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${id}`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) html = await res.text();
    else if (res.status === 429) await sleep(20000 * (attempt + 1));
    else break;
  }
  if (!html) { console.log(`${id}\tFAILED`); continue; }
  const title = pick(html, /topcard__title"[^>]*>([\s\S]*?)<\/h2>/);
  const company = pick(html, /topcard__org-name-link[^>]*>([\s\S]*?)<\/a>/);
  const location = pick(html, /topcard__flavor--bullet"[^>]*>([\s\S]*?)<\/span>/);
  const body = pick(html, /show-more-less-html__markup[^>]*>([\s\S]*?)<\/div>/);
  const criteria = [...html.matchAll(/description__job-criteria-subheader">([\s\S]*?)<\/h3>[\s\S]*?description__job-criteria-text[^>]*>([\s\S]*?)<\/span>/g)]
    .map((m) => `${text(m[1])}: ${text(m[2])}`).join('\n');
  fs.writeFileSync(file, `${title} | ${company} | ${location}\nhttps://www.linkedin.com/jobs/view/${id}\n\n${criteria}\n\n${body}\n`);
  console.log(`${id}\tok\t${title} | ${company}`);
  await sleep(6000);
}
