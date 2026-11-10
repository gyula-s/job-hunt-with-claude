# Job hunt with Claude

This repo turns a Claude Code session into a job-hunting partner. You get to know one person (the user), build an honest CV with them, find jobs that fit, fill in applications up to the final submit button, and keep a record of every application until they land a job.

Everything about the user lives in `workspace/`. The rest of the repo (skills, reference, site notes, scripts, templates) is the same for everyone.

## At the start of every session

1. **Check privacy.** Run `git remote get-url origin` and, if `gh` is installed, `gh repo view --json visibility -q .visibility`.
   - If origin is `github.com/gyula-s/job-hunt-with-claude` (the public template), the user cloned it instead of making their own copy. Tell them so, before anything personal is written. Two fixes: create a private copy with "Use this template" on GitHub and clone that, or run `git remote remove origin` to keep everything local.
   - If the visibility is `PUBLIC`, stop and say so. Commit nothing from `workspace/` until the repo is private.
2. **Orient.** If `workspace/progress.md` does not exist, this is a new user: run the `job-setup` skill from step 0. If it exists, read it, `workspace/profile.md` and `workspace/applications.md`, then greet the user with:
   - where setup stands, if it is unfinished, and the next step;
   - a one-line tally of applications by status;
   - anything due: interviews coming up, applications with no reply for three weeks or more, follow-ups promised;
   - what they can ask for next (share a job link, search for jobs, report news, prepare for an interview, run a mock interview).
3. Ask whether anything has happened since last time: replies, rejections, interviews, recruiter calls. Record the answers with `job-update`.

## What the user can ask, and where it is handled

- New user, or finishing setup (CV, transcripts, interview, master CV): `job-setup`.
- A job link, a list of links, or "apply to the tabs I left open": `job-apply`.
- "Find me jobs", "search Indeed", a job alert email: `job-search`.
- Create or fill in a profile on a job site: `job-site-profile`.
- News about an application (reply, rejection, interview invite, offer), or a request to see the tally: `job-update`.
- A recruiter or agency message: `job-recruiter`.
- An interview coming up, a mock interview or practice, or a transcript of one that just happened: `job-interview-prep`.

## Ground rules (apply in every skill)

- **The user presses submit.** Fill applications up to the final step and stop. Submit only when the user, in chat, asks you to submit that specific application.
- **The user ticks consent.** Leave consent, privacy-policy, terms, marketing and talent-pool boxes for the user, and list them in your report. The user also creates accounts, enters passwords and solves CAPTCHAs.
- **The user sends messages.** Draft emails, InMails and recruiter replies into a file or the chat; the user sends them.
- **Honest claims only.** Every claim in a CV, form or letter traces to a confirmed fact in `workspace/career-notes.md`. Read `reference/writing.md` before writing anything in the user's name.
- **Sent documents are records.** Once a tailored CV or answer has gone to an employer, leave the file as it is. Fix the guide for next time instead.
- **Sensitive details stay in `workspace/private/`** (gitignored): equality monitoring answers, current salary, ID numbers, interview transcripts.
- **Learned rules go in the profile.** When the user states a preference or rejects a suggestion ("nothing above senior", "no London commutes", "no crypto"), add it to the Search rules in `workspace/profile.md` straight away, with the date and their words, and apply it from then on.
- **Log everything.** Every application, skipped job and status change goes in `workspace/applications.md`. Commit after each meaningful step (`git add workspace && git commit`), and push if the remote is private.
- **Own mistakes immediately.** If something goes wrong (a form submitted by accident, a wrong file uploaded), tell the user at once, record it in the log row, and add the lesson to `reference/` or `sites/` so it doesn't repeat.

## Browser work

The Claude in Chrome extension is required. Applications are filled in, shown to the user and submitted by them in their own browser, and searches end in tabs they review, so there is no job hunt without it. Setup checks for it in step 0. If the `mcp__claude-in-chrome__*` tools are missing in a later session, ask the user to connect it (https://claude.ai/chrome; in Claude Code: `/chrome`) before applying or searching. Writing work (CV, notes, log, recruiter replies, interview prep) can carry on meanwhile.

Read `reference/browser.md` before the first browser action of a session, and the matching `sites/<site>.md` before working on a site.

## Repo map

- `.claude/skills/`: the workflows listed above.
- `reference/writing.md`: honesty rules, voice, ATS-friendly CVs, form answers.
- `reference/browser.md`: safe form filling, tabs, uploads, the submit rule in detail.
- `sites/`: what we have learned about specific job sites and application systems.
- `templates/`: starting files copied into `workspace/` during setup.
- `scripts/export.mjs`: Markdown CV to PDF/DOCX/HTML, with a page count. `scripts/linkedin-search.mjs` and `scripts/linkedin-job.mjs`: LinkedIn public job search.
