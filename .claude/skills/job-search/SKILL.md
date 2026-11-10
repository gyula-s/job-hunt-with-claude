---
name: job-search
description: Search job sites for roles that match the user's profile and search rules, read each advert, and present a deduplicated shortlist. Use when the user asks to find or search for jobs, names a site to search, shares a job alert, or when offering a search at the end of setup or at the start of a session.
---

# Search for jobs

Read `workspace/profile.md` (what they want, Search rules, sites) and `workspace/applications.md` (applied and skipped jobs) first. Read `reference/browser.md` and the `sites/<site>.md` note for each site you'll use.

## Where to search

- If the user names a site, search only that site. Matches you find elsewhere can wait until they ask.
- Otherwise search the sites listed in the profile. When offering a search, name them: "Shall I check LinkedIn, Indeed and Jobgether for new roles since Monday?"
- Use the user's signed-in session in Chrome where the site needs it (their saved matches, Easy Apply). For LinkedIn, `scripts/linkedin-search.mjs` and `scripts/linkedin-job.mjs` search the public listings without a browser (see `sites/linkedin.md`).
- Avoid changing saved search settings, alerts or filters on the user's account. Some sites (Jobgether) write filter changes back to the user's profile. Use the public search instead, or ask first.

## How to search

1. Build queries from the profile: two to six variations of the target titles and core skills, and each acceptable location (remote in their country, plus each nearby town they'd commute to with a sensible radius).
2. Limit to recent posts (the last week, or since the last search; the date of the last search is in `progress.md`).
3. Collect the results and drop anything already in `applications.md` (applied, skipped or agency-submitted) or already seen.
4. Drop titles that break a hard rule (seniority, location, field). Drop silently any category the user said they don't want to hear about.
5. **Read the full advert** of every remaining job before shortlisting it. Titles hide the primary language or skill, office days, country limits, agency clients and scam signs.
6. Rank what's left by fit.

## Present the shortlist as tabs

1. Open every shortlisted job in its own new browser tab, on the advert itself (the page with the Apply button), best fit first.
2. In chat, list them in the same order: company, role, location and office pattern, salary, post age and applicant count if shown, a fit verdict with the main gap. Under it, a short "left out" list: the jobs you skipped with a reason each, except the categories the user asked never to see.
3. Ask the user to read the tabs, close the ones they don't want, and tell you when they're done.
4. When they say so, list the open tabs again. Whatever is still open is the user's pick: run `job-apply` on each of those tabs. Jobs whose tabs they closed go in the Skipped section of the log as "not chosen".

Log every skipped job in the Skipped section of `applications.md`, and set "last search" in `progress.md` to today. Commit.

## Learn from the answer

When the user rejects a suggestion with a reason ("anything beyond senior shouldn't be considered", "I can't travel to London twice a week"), add it to the Search rules in `profile.md` with the date and their words, and re-filter the current shortlist straight away.
