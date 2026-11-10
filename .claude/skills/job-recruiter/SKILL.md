---
name: job-recruiter
description: Handle a recruiter or agency message - check the role against the profile and the log, draft a reply for the user to send, and record any submission an agency makes. Use when the user pastes or forwards a message from a recruiter, headhunter or agency, or asks how to answer one.
---

# Recruiter messages

1. **Read the message and pull out:** the agency and person, the client (named or described), the role, location and office pattern, salary or rate, what they're asking for (a call, CV, right to represent, exclusivity, references, a list of companies applied to), and any deadline.
2. **Check it:**
   - against `workspace/applications.md`: has the user already applied to this client directly, or through another agency? A double submission can sink the application;
   - against the hard rules in `workspace/profile.md`;
   - for scam signs (see `job-apply` step 2).
3. **Tell the user** what the role is, how it fits, and what the recruiter is asking for, with your view on each request:
   - Right to represent: grant it per role, for the named client only. Avoid open-ended exclusivity across all jobs.
   - References: the user decides whether and when to share referees' details. It's usual to give them at offer stage, not before.
   - Companies already approached: offer `workspace/companies-approached.md` (see `job-update`).
   - Salary: give the profile's expectation unless the user says otherwise.
4. **Draft the reply** in the user's voice (`workspace/voice.md`): short, answering each request, with the user's questions (office pattern, client name, salary, interview steps). Give it as plain text they can copy. They send it.
5. **If they want to go ahead,** tailor a CV with `job-apply` steps 3 and 4 for the agency to send.
6. **Log it** when the agency submits the CV: Via = the agency, Company = "<Agency> for <client as described>", status **applied**, with the recruiter's name. Commit.
