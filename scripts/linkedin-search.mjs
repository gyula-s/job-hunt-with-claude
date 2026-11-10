#!/usr/bin/env node
// Search LinkedIn's public (signed-out) job listings. Unofficial endpoint: keep usage light.
// Prints one tab-separated line per job: id, title, company, location, salary, posted, url.
const HELP = `Usage: node scripts/linkedin-search.mjs --keywords "<text>" [options]
  --keywords <text>   search text (repeat the flag for several searches)
  --location <text>   e.g. "United Kingdom" or "Manchester, England, United Kingdom" (default: United Kingdom)
  --remote | --hybrid | --onsite   workplace type (combine freely; default: any)
  --distance <miles>  radius around --location (useful with --hybrid/--onsite)
  --days <n>          posted within n days (default 7)
  --level <list>      experience levels, comma separated: 1 internship, 2 entry, 3 associate, 4 mid-senior, 5 director, 6 executive
  --pages <n>         result pages of 25 per search (default 2)`;

const args = process.argv.slice(2);
if (!args.length || args.includes('--help') || args.includes('-h')) { console.log(HELP); process.exit(0); }
const opts = { keywords: [], location: 'United Kingdom', wt: [], distance: null, days: 7, level: null, pages: 2 };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--keywords') opts.keywords.push(args[++i]);
  else if (a === '--location') opts.location = args[++i];
  else if (a === '--remote') opts.wt.push(2);
  else if (a === '--hybrid') opts.wt.push(3);
  else if (a === '--onsite') opts.wt.push(1);
  else if (a === '--distance') opts.distance = args[++i];
  else if (a === '--days') opts.days = Number(args[++i]);
  else if (a === '--level') opts.level = args[++i];
  else if (a === '--pages') opts.pages = Number(args[++i]);
  else { console.error(`Unknown option ${a}\n\n${HELP}`); process.exit(1); }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decode = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const pick = (card, re) => { const m = card.match(re); return m ? decode(m[1]) : ''; };

async function get(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) return res.text();
    if (res.status === 429) { await sleep(15000 * (attempt + 1)); continue; }
    return '';
  }
  console.error('Rate limited by LinkedIn; try again later.');
  return '';
}

const seen = new Set();
for (const kw of opts.keywords) {
  for (let page = 0; page < opts.pages; page++) {
    const q = new URLSearchParams({ keywords: kw, location: opts.location, f_TPR: `r${opts.days * 86400}`, start: String(page * 25) });
    if (opts.wt.length) q.set('f_WT', opts.wt.join(','));
    if (opts.distance) q.set('distance', opts.distance);
    if (opts.level) q.set('f_E', opts.level);
    const html = await get(`https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?${q}`);
    const cards = html.split('<li>').slice(1);
    for (const card of cards) {
      const id = (card.match(/jobPosting:(\d+)/) || [])[1];
      if (!id || seen.has(id)) continue;
      seen.add(id);
      console.log([
        id,
        pick(card, /base-search-card__title">([\s\S]*?)<\/h3>/),
        pick(card, /base-search-card__subtitle">[\s\S]*?>([\s\S]*?)<\/a>/),
        pick(card, /job-search-card__location">([\s\S]*?)<\/span>/),
        pick(card, /job-search-card__salary-info">([\s\S]*?)<\/span>/),
        (card.match(/datetime="([^"]+)"/) || [])[1] || '',
        `https://www.linkedin.com/jobs/view/${id}`,
      ].join('\t'));
    }
    if (cards.length < 25) break;
    await sleep(2000);
  }
}
