# Writing in the user's name

Read this before writing a CV, cover letter, form answer, profile or message for the user.

## Honesty

- Every claim traces to a ✅ fact in `workspace/career-notes.md`. If it isn't there, ask, or leave it out.
- Tools are not authors. Write "I built X (using <tool>)", never "<tool> built X". The user owns what they ship.
- Don't overclaim scope. "Sole engineer" reads as the only engineer at the company. Avoid "built the whole X" when they built part of it; "owned", "built most of" and "a key part of" are accurate alternatives. Call a task a task, not a migration or a programme.
- Job titles stay as the employer gave them, so reference checks match. Seniority shows in the CV's title line, the summary and the responsibilities.
- Missing skills stay missing. Point at the nearest real evidence and the user's record of learning fast instead.
- Per-employer wording rules live in the "Wording rules" section of `career-notes.md`. Add one whenever the user corrects a claim ("I never handled payments there"), and follow them in every document afterwards.
- Keep confidential employer details (internal names, customer data, ticket numbers) out of anything that leaves the machine.
- Personal stories, reflections and motives come from the user. Leave a marked `[YOUR INPUT: ...]` gap rather than inventing one.
- Once a document has gone to an employer, leave its file as it is. It's the record of what they saw. Fix the tailoring guide for next time, and tell the user which sent documents carry old wording if it might come up in an interview.

## Voice

Recruiters notice text that sounds generated. Facts survive; rhythm gives it away. The cure is the user's own voice, recorded in `workspace/voice.md`.

Building `voice.md` from transcripts (setup step 2) means noting, with quotes:
- typical sentence length, and how they open an explanation;
- how they name a problem before the fix;
- the images and phrases they reach for;
- how they talk about gaps and mistakes;
- their humour, and how they end a story;
- "we" for team work versus "I" for their own part;
- their spelling conventions (British or American).

Defaults when `voice.md` is thin:
- Short sentences, mostly under 25 words. Plain verbs: built, ran, fixed, wrote, set up, took over, cut.
- One concrete detail per bullet or answer: a number, a name, a real constraint.
- Vary bullet shapes. Some bullets are one sentence, some two; not every bullet ends with an outcome.
- Allow honest modesty: "about", "most of", "I'm still learning X". For a gap in a form answer, "Full disclosure, I haven't used X in production" beats stretching.
- Form answers: answer the question first, then one example. Under about 80 words unless the form asks for more. No intro, no wrap-up.

AI tells to write around:
- "X, not Y" and "not just X, but Y" lines;
- a colon followed by a list of three;
- ", so [outcome]" or ", ensuring [outcome]" endings on every bullet;
- closing one-liners and aphorisms;
- em dashes and semicolons in bullets;
- stacked metaphors;
- words like pioneered, spearheaded, leveraged, robust, seamless, cutting-edge, passionate, thrive, journey, delve, landscape, empower, game-changer, "I'm excited to", "I'd love to", "deeply", "genuinely".

**Read-aloud test:** if a sentence sounds like a LinkedIn post or a press release read aloud, rewrite it the way the user would say it on a call.

Copyable text in chat goes in plain paragraphs, not quote blocks, so it pastes cleanly.

## CV format and ATS

Applicant tracking systems (ATS) extract a CV's text and parse it into fields. What matters is clean, ordered, extractable text, not the tool that made the PDF.

- Standard section headings in plain words: Summary, Skills, Work Experience, Education, Certifications.
- Each role: the title on its own line, then the employer, then the dates (`Month Year – Month Year`).
- Contact details as full text: an email, a phone number with country code where useful, and full URLs for LinkedIn or a portfolio.
- No text in images, headers or footers. No tables for layout. No icons in place of words.
- Date ranges, never running totals that go stale.
- File name: `<Company>-<Name> - CV.pdf` for tailored versions, so the recruiter's download folder makes sense.

**Keywords.** Some ATS filters and most recruiter searches match terms literally, so "React JS" can miss a search for "React.js".
- Use the advert's exact spelling for each skill the user really has: React.js or React, Node.js or Node, PostgreSQL or Postgres, Excel or Microsoft Excel.
- Write an acronym and its full form once each where both are common: "Amazon Web Services (AWS)", "Search Engine Optimisation (SEO)".
- Put the main terms in the Skills section and in at least one bullet that shows them in use, so a human reader sees evidence and not a list.
- Only keywords the notes back up. Stuffing, hidden white text and skills copied from the advert get caught at interview, and some systems flag them.

**Keyword check for every tailored CV:** list the advert's hard skills, tools and qualifications. For each one, mark it as present in the advert's spelling, present in a different spelling (fix it), or a real gap (leave it out and mention it in the fit read).

**ATS check after every new layout or master CV:** extract the PDF's text (`pdftotext <file> -`, or Python `pypdf`, or read the PDF directly) and confirm that:
- headings come out as plain words, with no spaced-out letters and no ligature glitches ("ﬁ");
- the reading order is name, contacts, summary, then each role's title, employer and dates;
- emails and URLs are complete.

## Form answers

- Employment history boxes often cap at about 100 words. Count them.
- "Why do you want to work here?": two or three specific reasons from the advert and the company's own site, tied to the user's real experience. Flag it to the user as worth rewriting in their own words.
- Salary: the profile's expectation, or "in line with the advertised range" when the advert's range is acceptable.
- Notice period, right to work, start date, relocation: from the profile.
- Years of experience per skill: from the career notes, counted honestly from first professional use.
- "How did you hear about us?": the actual site.
- Supporting statements: honest, specific, first person, one real example per criterion, with `[YOUR INPUT]` gaps for reflections. Check the employer's guidance on AI-written applications first and tell the user what it says.
