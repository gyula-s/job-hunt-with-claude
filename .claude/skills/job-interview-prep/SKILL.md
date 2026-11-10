---
name: job-interview-prep
description: Prepare the user for an interview, run mock interviews with feedback, and debrief afterwards from the transcript. Use when an interview, screening call or technical test is booked, when the user wants to practise or asks for a mock interview, or when they share how an interview went or a transcript of it.
---

# Interview prep, mock interviews and debrief

## Before

Gather:
- the advert in `workspace/jobs/`, and the tailored CV and form answers they actually sent. The interviewer has those in front of them, so prep must match what was sent, even if the wording has changed since;
- the company: what it does, its products, size, funding or results, recent news, and the interviewers on LinkedIn if the user gives names;
- the stage: who they're meeting, how long, what format (screening, technical, case study, panel, values), and anything the invite said to prepare;
- earlier transcripts with the same company, if any.

Write `workspace/interviews/<YYYY-MM-DD>-<company>-<stage>.md` with:
1. Logistics: date, time (in the user's time zone), link or address, names.
2. A 30-second "about me" for this role, in the user's voice.
3. Why this company and role: two or three honest reasons tied to the advert.
4. Likely questions, each with the matching story from `career-notes.md` (situation, what the user did, the result). Use only the stories they have.
5. Gaps the advert exposes, and an honest way to talk about each one.
6. Questions for them to ask the interviewers.
7. The salary answer, and their notice period and start date.

Then offer a mock interview (below) for this stage. Most people skip practice; the ones who do it answer shorter and calmer. Offer it again the day before the interview.

Remind them to record or transcribe the call if they can (Granola, Wispr Flow, or the video tool's transcript), within local recording rules.

## Mock interview

Run one whenever an interview is booked, or any time the user asks to practise, even with no interview lined up (then base it on their target role in `profile.md` and a typical advert from `workspace/jobs/`).

**Set up**, in one short message, then start:
- the stage and interviewer you'll play: recruiter screen, hiring manager, technical, behavioural or values, or a panel. Match the real one if it's booked;
- the length: about 5 questions for a quick round, 8 to 10 for a full one;
- the mode: **coach** (feedback after every answer) or **real** (no feedback until the end, like the real thing). Default to coach for the first round, real for later ones;
- a tip: answering out loud with a dictation app (Wispr Flow, or the system's own dictation) is much closer to the real thing than typing.

**Run it:**
- Stay in character. Ask one question per message, the way that interviewer would phrase it, using the advert, the company and the CV they sent.
- Mix the question types: the opener ("tell me about yourself"), why this company, two or three experience stories, at least one question aimed at a gap the advert exposes, one awkward one (salary, why leaving, a failure), and the "any questions for us?" close.
- Follow up like a real interviewer: when an answer is vague, ask "what did you do yourself?" or "what happened in the end?" before moving on.

**Feedback on each answer**, short:
- Did it answer the question asked, in the first sentence or two?
- Length: about one to two minutes spoken (roughly 150 to 300 words). Flag rambling or a thin answer.
- One concrete detail, a number or a real constraint? Situation, what they did themselves, the result?
- Honesty: anything claimed that `career-notes.md` doesn't support, or that contradicts the CV they sent. An interviewer can probe it, so flag it plainly.
- Gaps: did they own the gap honestly and point at the nearest real evidence?
- Then one thing that worked, one thing to change, and a tighter version written in their voice (`voice.md`), for them to say their own way, not memorise.

**Finish** with a short summary: their strongest answers, the two or three to redo, and an offer to run those again now. Save the questions, the best version of each answer and the feedback to the interview's prep file (or `workspace/interviews/practice-<YYYY-MM-DD>.md` for general practice).

Keep `workspace/interviews/question-bank.md` as a running list of questions asked in mocks and in real interviews (from debriefs), each with the user's best answer so far. Use it to pick weak spots for the next mock.

## After

Ask how it went, or read the transcript (from the connector, or from `workspace/private/transcripts/`). Then:
- update the row in `applications.md` with the stage, the date, what was said about next steps and timing;
- add new career facts and good stories to `career-notes.md`;
- add new phrases and patterns to `voice.md`;
- note any question they struggled with, add it to `workspace/interviews/question-bank.md` with a better answer, and offer a mock round on it before the next stage;
- draft a short thank-you or follow-up if it fits, for the user to send.

Commit.
