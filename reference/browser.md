# Working in the browser

Applications and searches run in the user's own Chrome through the Claude in Chrome extension, with their sign-ins. Everything you click is real.

## Setup

- The extension is required. If the `mcp__claude-in-chrome__*` tools are missing or don't respond, stop the browser work and ask the user to install or reconnect it (https://claude.ai/chrome; in Claude Code: `/chrome`). Wait for them.
- Start each browser session by listing the open tabs. Work in new tabs you open, unless the user points you at tabs they left open ("apply to the tabs I kept").
- For several applications, use one tab per job and leave each finished tab open on its final step for the user.
- Tabs the extension didn't open may be out of reach. If you can't close or read one, tell the user.

## The submit rule

The user presses the final submit, send or apply button. You stop on the last step.

The footer button sits in the same place on every step of a multi-step form, so "Next", "Review" and "Submit" are easy to confuse:
- **Read the button's label at the moment you click it.** Use a `find` reference or read the DOM, rather than coordinates from an earlier screenshot.
- **After the extension disconnects or reconnects, take a fresh look before clicking anything.** A stale screenshot once sent an application the user never reviewed: what showed as "Review" had become "Submit application".
- When the label says Submit, Send, Apply or Confirm, stop and hand over.

Submit only when the user asks you to submit that specific application, in the chat. Read back what's filled in first.

## What the user does

- Creating accounts, signing in, passwords, two-factor codes, CAPTCHAs and "verify you're human" checks. Ask, and wait until they say it's done.
- Ticking consent, privacy policy, terms, marketing and talent-pool boxes. List the ones left in your hand-over.
- Changing account-wide settings: visibility, "open to work", alerts, and saved searches or filters that change their profile.
- Sending messages to recruiters or employers.

## Filling forms

- Prefer `find` references and form inputs over coordinate clicks. If a value doesn't register (radio buttons, custom dropdowns), click the option itself, then check the field shows it.
- Custom dropdowns: open the list, find the option by its text, and click it. Typing into some lists scrolls the page instead of filtering.
- File uploads: use the file upload tool on the page's file input. Some sites hide the input; see `sites/` for workarounds. After uploading, check that the file name shown is the new tailored CV, not one saved from an earlier application.
- Prefilled values from the site's saved profile (years of experience, phone, old CV) may be stale. Check each one.
- Long pages: scroll and read the whole form before declaring it filled. Required fields are often below the fold.
- Iframes: some company career pages embed the form in an iframe. Opening the form's own URL directly is often easier (see `sites/`).
- If a page asks for something you don't have (a reference's details, a portfolio password, a test), leave it and list it.

## When things go wrong

- After two or three failed attempts at the same action, stop and tell the user what you tried.
- If a dialog or alert blocks the page, ask the user to dismiss it.
- If you submit, upload or change something by mistake, tell the user straight away, note it in the log row, and add the lesson here or in `sites/`.
