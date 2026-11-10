---
name: job-update
description: Keep the application log current - record replies, rejections, interview invites, offers and silence, report the tally, chase stale applications, and regenerate the list of companies already approached. Use when the user reports news about an application, forwards an employer email, asks where things stand, or asks for the list of companies they've applied to.
---

# Update the log

`workspace/applications.md` is the single record of the job hunt. One row per application, newest first; the statuses are defined at the top of the file.

## Recording news

1. Find the row: match the company, then the role. Agency rows may name the client only vaguely, so ask if unsure. If there is no row (an application made outside these sessions), add one and note "added from the user's report".
2. Set the status and add a dated note in the user's words: who replied, what they said, the next step, and the date of anything booked. A rejection reason, if one was given, is worth keeping. It shows patterns.
3. When an interview is booked, offer `job-interview-prep`: a prep sheet and a mock interview for that stage.
4. When the user forwards an email, read all of it. Pull out dates, names, the next step and anything they're asked to send. Remind them of deadlines.
5. Commit with a message like `<Company>: rejected`.

The user may give updates in bulk ("Acme was a no, Globex no, Initech no"). Apply them all, then read back the changes in one short list.

## Tally and chasing

When asked "where are we", or at the start of a session, report:
- counts by status;
- interviews and deadlines coming up;
- applications with no reply for three weeks or more. Ask whether to mark them **closed (no response)** or draft a short follow-up for the user to send;
- interviews with no outcome for over a week: offer a follow-up draft.

Ask, rather than assume, before marking an application closed or rejected. Users often know something the log doesn't.

## Companies already approached

Recruiters ask which companies they shouldn't send the CV to. Keep `workspace/companies-approached.md` as a pasteable list, regenerated from the log whenever it's asked for:
- In process
- Rejected
- Interviewed or screened, no outcome yet
- Applied
- Already submitted by other agencies (describe the client the way the agency described it)

End it with a line asking the recruiter to check with the user first if their client sounds like one of these. Give the user the file path. They paste it themselves.
