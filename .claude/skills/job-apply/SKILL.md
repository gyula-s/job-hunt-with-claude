---
name: job-apply
description: Apply to one or more jobs - read each advert, check fit and duplicates, tailor a CV, fill in the application in the browser up to the final submit, and log it. Use when the user shares a job link or several, asks to apply to open browser tabs, or picks jobs from a search shortlist.
---

# Apply to jobs

Before starting, read `workspace/profile.md`, `workspace/voice.md`, `workspace/tailoring-guide.md`, `reference/writing.md` and `reference/browser.md`. If setup is unfinished (`workspace/progress.md`), say so and offer to finish the CV first. Applying with a half-built CV wastes the job.

For several jobs, run steps 1 to 3 for every job first, report the fit reads together, then do steps 4 to 8 job by job, each in its own tab. Leave the finished tabs open for the user to review.

## 1. Read the whole advert

Open the link in a new tab (or read a tab the user left open) and read the full advert, including the parts behind "show more". Save the text to `workspace/jobs/<YYYY-MM-DD>-<company>-<role>.md` with the URL, the date and where it was found. Adverts get taken down, and interview prep needs them later.

If the job site only links on to the company's own page, follow the link and apply there (see `sites/` for the system it uses).

## 2. Check before spending time

- **Duplicates:** search `workspace/applications.md` for the company, including agency submissions and skipped jobs. If they've applied before, or an agency has already put them forward, stop and tell the user.
- **Search rules:** check every hard rule in `profile.md` (location and office days, seniority, right to work, salary floor, industries to avoid, the core skills they must have). A broken rule means skip, unless the user asks to go ahead.
- **Eligibility and scams:** skip, and say why, if the job is limited to a country or region the user can't work in, or shows scam signs. Scam signs include a recruiter on a personal webmail address, a test or payment before any contact, pay in crypto or gift cards, a vague company with an implausibly wide salary, or a request for bank or ID details up front.

Skipped jobs go in the Skipped section of the log with a one-line reason, so nobody evaluates them again. If the user has said a whole category is unwanted (for example "no crypto"), drop matching jobs silently: don't even list them.

## 3. Fit read

Give the user a short read, in this shape:
- the role, company, location and office pattern, salary (or "not stated"), and how old the post is;
- strong matches: the ad's must-haves the user clearly meets, with the evidence from their notes;
- gaps: must-haves they lack or only partly meet, stated plainly;
- a verdict: strong, reasonable, or a stretch. Name anything worth checking with the recruiter (office pattern, salary).

For a single link the user sent, carry on unless a hard rule broke. For a batch, wait for the user to confirm the list.

## 4. Tailor the CV

Copy `workspace/cv.md` to `workspace/tailored/<YYYY-MM>-<company>-<role>.md` and change only what earns it, following `tailoring-guide.md`:
- the title line, to match the role truthfully;
- the summary, rewritten to lead with what the ad leads with, in the user's voice;
- skills, reordered so the ad's must-haves come first, taken only from the user's real skills;
- bullets, reordered or swapped for approved variants so the most relevant story leads each job.

Never add a skill, title or result the notes don't support. Mirror two or three of the ad's own phrases where they are true for the user, and run the keyword check in `reference/writing.md`, so every skill they have appears in the advert's exact spelling.

Export and check:

```
node scripts/export.mjs workspace/tailored/<file>.md --format pdf,docx --out workspace/export --name "<Company>-<Name> - CV"
```

The page count must match the length agreed in setup. Open the PDF once and read it. New bullets or summary lines that worked go into `tailoring-guide.md`.

If the application wants a cover letter or free-text answers, draft them into `workspace/tailored/<YYYY-MM>-<company>-form-answers.md` (see "Form answers" in `reference/writing.md`). Tell the user which answers are worth rewriting in their own words.

## 5. Fill in the application

Follow `reference/browser.md` and the notes in `sites/` for the site or application system.

- Upload the tailored PDF, and check the file name shown afterwards is the new one.
- Fill standard fields from `profile.md` and `workspace/private/personal-details.md`. Use the job application email from the profile.
- Salary questions: use the profile's expectation, or "in line with the advertised range" when the ad states one within it.
- Equality monitoring: use the user's saved answers, or "prefer not to say" where none are saved.
- Leave consent, privacy, terms, marketing and talent-pool boxes unticked, and anything only the user can answer, then list them.
- Stop at the final step. Read the button label before every click; the step whose button says Submit, Send or Apply is where you stop.

If the user explicitly asked you to submit this application, press submit only after reading back to them what's filled in, and only if no consent box is involved. The user ticks consent themselves.

## 6. Hand over

Tell the user, per job: the tab it's in, the CV and answers used, what is left for them (consent boxes, fields needing their input, the submit button), and anything worth checking before sending.

## 7. Log

Add a row to `workspace/applications.md` (newest first) with status **drafted**: date, company, role (with location and salary), where it was listed and where the form lives, the files used, and notes (gaps, salary answer, anything unusual). Commit.

## 8. After the user submits

When the user says they sent it, set the status to **applied** with the date, and commit (`<Company>: applied`). If they changed anything before sending, note it. If a form went off without the user pressing submit, say so plainly, and note in the row who submitted it.
