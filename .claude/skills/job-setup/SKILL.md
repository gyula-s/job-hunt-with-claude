---
name: job-setup
description: Onboard a job seeker or resume their onboarding - explain the process, collect their CV and documents, read their meeting transcripts for their voice, learn what job they want, interview them about their career, and build the master CV with them. Use when workspace/progress.md is missing or shows setup unfinished, or when the user wants to redo their CV or job preferences.
---

# Job setup

Setup runs once, across as many sessions as it takes. `workspace/progress.md` records which step is done; resume at the first unfinished step and tell the user where you are picking up. Update `progress.md` and commit at the end of every step.

Ask **one question per message**, always. A list of questions overwhelms people and gets half-answered. Keep each question easy to answer, offer an example when the user seems stuck, and accept rough answers.

## Step 0: Welcome and workspace

Tell the user, in a short message, what is about to happen:

1. They share their CV and any other career documents.
2. They share meeting transcripts if they have any, so you can write the way they talk.
3. You ask what job they want and where, one question at a time.
4. You interview them about their career, one question at a time. This is the longest part, and it can be spread over several sessions.
5. Together you build a master CV that you're both happy with and that applicant tracking systems can read.
6. Then the job hunt: they send you job links (or ask you to search), you tailor a CV for each job and fill in the application, and they review and press submit. You keep a log of every application and its outcome.

Also tell them what you will never do without being asked: submit an application, tick a consent box, send a message, create an account or enter a password. And tell them their sensitive details stay in `workspace/private/`, which is never committed.

Then create the workspace: copy `templates/` to `workspace/` (including `templates/private/` to `workspace/private/`), create `workspace/source/`, `workspace/tailored/`, `workspace/export/`, `workspace/jobs/` and `workspace/interviews/`, and check that the scripts run: `npm install`, then `node scripts/export.mjs workspace/cv.md --format pdf`. If PDF export fails, tell the user it needs Chrome, Edge or Chromium installed.

Check the browser extension: the `mcp__claude-in-chrome__*` tools must be available and list the user's tabs. If they aren't, explain that the extension is required for applying and searching, and ask the user to install it from https://claude.ai/chrome and connect it (in Claude Code: `/chrome`). Steps 1 to 5 don't need it, so carry on and check again before step 6.

Done when: the user has seen the plan, `workspace/` exists, the export works, and the extension is connected or the user is setting it up.

## Step 1: Documents

Ask for their current CV first: a file path, a file dragged into the terminal, or pasted text. Then ask, one at a time, for anything else that holds career facts: a LinkedIn profile PDF (LinkedIn: Me, View profile, More, Save to PDF), old CVs, cover letters, references, performance reviews, certificates, portfolio or GitHub links.

For each document:
- Copy it into `workspace/source/` (or `workspace/private/` if it holds ID numbers, payslips or references with contact details).
- Read all of it and transcribe the facts into `workspace/career-notes.md`, marked ❓ until the user confirms them in step 4.
- Note weaknesses: running totals that go stale ("6y 5m"; use date ranges), long summaries, no numbers, missing recent roles, gaps in dates.

If they have no CV at all, say that's fine: the interview in step 4 builds it from scratch.

Done when: the user says there is nothing else to share, and every document's facts are in the notes.

## Step 2: Transcripts and voice

Ask whether they use a meeting note-taker or dictation app: Wispr Flow, Granola, Otter, Fireflies, or the transcripts built into Zoom, Teams or Google Meet. Interview transcripts are the most useful; any call where they talk about their work helps.

- If a connector for the app is available in this session (for example Wispr Flow or Granola tools), search it for interviews and work calls, with the user's go-ahead.
- Otherwise ask them to export transcripts as text and drop them into `workspace/private/transcripts/`.

Read every transcript and write `workspace/voice.md` from the user's own words (see the voice section in `reference/writing.md`): sentence length, how they explain problems, their stock phrases and images, how they describe gaps, their humour. Quote them. Also lift any new career facts into the notes as ❓.

If there are no transcripts, build `voice.md` from their written answers in this chat and any writing samples, and tell them it will get better once transcripts exist. Recommend they start using Granola or Wispr Flow (or their video tool's transcript feature) for interviews and recruiter calls from now on. It helps with interview prep, follow-ups and their voice. Remind them to follow local rules on recording and to tell the other side when that's required.

Done when: `voice.md` has at least ten real quotes or observations, or the user has no transcripts and you've recommended a note-taker.

## Step 3: What they want

Fill in `workspace/profile.md` by asking, one at a time:

1. What kind of role they want next (titles, field) and what they'd consider at a stretch.
2. Seniority: the level they want, and anything above or below they'd rule out.
3. Where: their home town, how far they'll commute and how often, whether they want remote, hybrid or office work, and whether they'd relocate.
4. Country and right to work: where they can work without sponsorship, and whether they need a visa.
5. Salary: what they're aiming for, and their floor. Currency and day rate too, if they'd take contracts.
6. Employment type: permanent, contract, part-time, freelance.
7. Industries or companies they want, and any they won't work for.
8. When they can start, and their notice period.
9. Deal-breakers or must-haves that haven't come up yet (hours, travel, on-call, company size, mission).
10. Which job sites they use or want searched, and whether they already have accounts there.

Also ask how flexible each answer is ("hard rule" or "preference"). Hard rules become Search rules, so you never shortlist a job that breaks them.

Done when: every section of `profile.md` has an answer or "no preference".

## Step 4: Career interview

Interview them role by role, most recent first, using `interview-questions.md` in this skill's folder. After each answer, write it into `career-notes.md` straight away and mark it ✅. Follow up on vague answers ("what did you do yourself?", "roughly how many?"). Where records exist (git history, tickets, certificates, payslips), offer to check claims against them.

Cover education, certifications, languages, tools and interests too.

Then offer the optional personal details, clearly marked optional, one at a time. Explain that application forms ask for them, so having them saved makes forms faster. For each one they can say "prefer not to say":
- equality monitoring: ethnicity, gender, sexual orientation, disability, religion, pronouns, veteran status;
- current or last salary;
- notice period, driving licence, security clearance, criminal record declaration;
- nationality or passport and visa details, if relevant to right to work.

Save these only in `workspace/private/personal-details.md`.

Done when: every role, education entry and certification in the notes is ✅, or is marked "user doesn't remember", and the user agrees nothing is missing.

## Step 5: Master CV

1. Agree the length: one page is the default that has worked best. Two pages are normal for long careers in some countries (UK, EU) and some fields; ask.
2. Write `workspace/cv.md` from the notes, following `reference/writing.md` and `voice.md`. The CV is a curated subset of the notes: the strongest, most relevant facts, each one ✅.
3. Export: `node scripts/export.mjs workspace/cv.md --format pdf,docx --out workspace/export --name "<Name> - CV"`. The script prints the page count.
4. Run the ATS check in `reference/writing.md` (extract the PDF's text and confirm it reads cleanly in order).
5. Show the user the PDF path and the main choices you made. Ask for feedback one point at a time, revise, and re-export, until the user says they are happy with it. Point out anything you're unsure about, too.
6. Start `workspace/tailoring-guide.md` with the summary, bullet variants and skill list from the master CV.

Done when: the user says the CV is good, it exports at the agreed length, and the ATS check passes.

## Step 6: Ready

Make sure the browser extension is connected (see step 0). Then mark setup complete in `progress.md`, commit, and tell the user what they can do now:
- send one job link, or several, and you'll tailor a CV and fill in each application up to submit;
- ask you to search for jobs. Offer to search the sites from their profile right away;
- ask you to fill in their profile on a job site;
- practise with a mock interview at any time, not only when one is booked;
- tell you about any reply, rejection or interview, so the log stays current.

Ask them to share every job update with you (forwarded emails are fine), and to start sessions with "anything new?" if they forget.
