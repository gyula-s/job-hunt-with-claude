# Job hunt with Claude

A workspace that turns [Claude Code](https://claude.com/claude-code) into a job-hunting partner. Clone your own copy, start Claude in it, and say hello. Claude knows what to do next, and remembers where you got to across sessions.

It came out of a real job search: dozens of tailored applications, recruiter emails, interviews and rejections. The rules in here are the lessons from that.

## What it does

1. **Explains the process**, then gets to know you.
2. **Reads your existing CV** and any other career documents (LinkedIn PDF, old CVs, reviews, certificates).
3. **Learns your voice** from meeting transcripts (Wispr Flow, Granola, Otter, Zoom, Teams...), so what it writes sounds like you, not like AI.
4. **Asks what you want**: roles, level, where, how flexible, salary, deal-breakers. One question at a time.
5. **Interviews you about your career**, one question at a time, and keeps a full private record of everything you did. The CV is an honest, curated subset of it.
6. **Builds a master CV** with you until you're both happy, and checks that applicant tracking systems can read it.
7. **Applies to jobs.** Send a link (or several, or leave tabs open). Claude reads the whole advert, checks it against your rules and your log, gives you a fit read, tailors a CV, and fills in the application in your browser. **You press submit.**
8. **Searches job sites** for roles that match your rules, reads every advert, and gives you a shortlist.
9. **Fills in job-site profiles** (Indeed, LinkedIn and others) from your CV.
10. **Keeps a log** of every application: company, role, where it was listed, when, the files used, and what happened. Tell it about replies, rejections and interviews, and it keeps the tally, chases stale applications, and gives you a "don't send my CV to these" list for recruiters.
11. **Runs mock interviews.** Claude plays the recruiter, hiring manager or technical interviewer for the real job, one question at a time, probes vague answers, and gives feedback on each answer: did it answer the question, was it the right length, was it specific, was it true to your record. Practise before every interview, or any time.
12. **Prepares you for interviews** from the advert and the CV you actually sent, then debriefs from the transcript and keeps a bank of the questions you've been asked.
13. **Handles recruiter messages**: checks them against your log and drafts replies for you to send.

## What it never does unless you ask

Submit an application, tick a consent box, send a message, create an account or type a password. It fills everything in and leaves those to you.

## You need

- [Claude Code](https://claude.com/claude-code) (terminal, desktop app or IDE)
- [Node.js](https://nodejs.org) 18 or later
- **The [Claude in Chrome](https://claude.ai/chrome) extension, installed and connected.** This is required. Claude applies, searches and shows you the filled-in forms in your own browser, so without it there's nothing to review before you submit. Claude checks for it during setup.
- Google Chrome, or another browser the extension supports (also used for PDF export)
- Optional: a GitHub account (for a private backup), and a meeting note-taker such as [Granola](https://granola.ai) or [Wispr Flow](https://wisprflow.ai)

## Start

1. **[Use this template](https://github.com/gyula-s/job-hunt-with-claude/generate)** (the green button at the top of this page) to create your own repository, and set it to **Private**. Your CV, notes and application log will live there, not here.
2. Download your new private copy and start Claude in it:
   ```
   git clone <your private repo url>
   cd <repo>
   npm install
   claude
   ```
3. Say hello. Claude checks the repo is private, explains the plan, and starts.

Using the GitHub CLI? Steps 1 and 2 in one go:

```
gh repo create my-job-hunt --template gyula-s/job-hunt-with-claude --private --clone
cd my-job-hunt && npm install && claude
```

No GitHub account? Download this repo as a ZIP, unzip it, run `git init`, then `npm install` and `claude`. Everything stays on your machine.

Next time, just run `claude` in the same folder. It picks up where you left off and asks what has happened since.

## Where things live

- `workspace/`: everything about you (created on first run). Committed to your private repo.
  - `cv.md`, `career-notes.md`, `profile.md`, `voice.md`, `applications.md`, `tailored/`, `export/`, `jobs/`, `interviews/`
  - `private/`: equality monitoring answers, current salary, transcripts. Gitignored, so never committed. Back it up yourself.
- `.claude/skills/`: the workflows (setup, apply, search, update, recruiter, interview prep, site profiles).
- `reference/`: writing rules (honesty, voice, ATS) and browser rules.
- `sites/`: notes on specific job sites and application systems.
- `scripts/`: CV export (Markdown to PDF and Word) and a LinkedIn public job search.

## Getting updates

Your copy has its own history, so pull improvements from this template like this:

```
git remote add upstream https://github.com/gyula-s/job-hunt-with-claude.git
git fetch upstream
git merge upstream/main --allow-unrelated-histories   # first time only needs the flag
```

Your data is all in `workspace/`, which the template never touches, so conflicts should only appear in files you edited yourself.

## Contributing

Found a trick for a job site, or a rule that saved you from a bad application? Add it to `sites/` or `reference/` and open a pull request. Please keep personal details out of it.

## Disclaimer

Job sites change often, and some search features here use unofficial public pages. Use them lightly and respect each site's terms. You are responsible for what you send. Read every application before you press submit.

## Licence

MIT
