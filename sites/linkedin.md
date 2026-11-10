# LinkedIn

## Searching without a browser

LinkedIn's public (signed-out) job listings can be searched with:

```
node scripts/linkedin-search.mjs --keywords "senior accountant" --location "United Kingdom" --remote --days 3 --level 4
node scripts/linkedin-job.mjs <job id> [<job id> ...]      # saves full adverts to workspace/jobs/linkedin/
```

Run `--help` on either script for every option. These use unofficial public endpoints: keep it light (a few dozen queries a session), and expect HTTP 429 rate limits. `linkedin-job.mjs` waits and retries, and pauses between jobs. If a session hits repeated 429s, stop for a while or switch to the browser.

`--level` maps to LinkedIn's experience filter: 1 internship, 2 entry level, 3 associate, 4 mid-senior, 5 director, 6 executive. The search tolerates loose matches, so read every advert; titles and locations are often wrong.

## Easy Apply

- The dialog runs on several pages (contact details, CV, questions, review). Its footer button changes from "Next" to "Review" to "Submit application" in the same spot. Read the label before every click (see `reference/browser.md`).
- The dialog renders inside a shadow DOM, so plain `document.querySelector` from the page won't find its fields. Use `find` and the page-reading tools.
- Prefilled answers (years of experience, phone, a CV saved from a previous application) come from the user's earlier applications. Check each one.
- "Follow company" is often ticked at the end. Leave the choice to the user and mention it.

### Uploading a tailored CV

"Upload resume" opens a native file chooser through a hidden input, which the upload tool can't reach directly. What worked (Nov 2026):

1. Patch the click, so the hidden input is captured instead of opening the chooser:

```js
window.__origClick = window.__origClick || HTMLInputElement.prototype.click;
HTMLInputElement.prototype.click = function () {
  if (this.type === 'file') {
    this.setAttribute('aria-label', 'resume file input');
    this.style.cssText = 'display:block;opacity:1;width:220px;height:30px';
    return;   // don't move the input: LinkedIn listens on it where it is
  }
  return window.__origClick.call(this);
};
```

2. Click "Upload resume" through its `find` reference.
3. `find` "resume file input" and use the file upload tool on it with the tailored PDF.
4. Restore: `HTMLInputElement.prototype.click = window.__origClick;`
5. Check the selected CV in the list is the new file.

### Applying on the company's site instead

Jobs without Easy Apply link out to the employer's own system (Greenhouse, Ashby, Workable, Lever and others). Follow the link and check `sites/` for that system.

## Profile

- "Open to work" can be shown to everyone or to recruiters only. That choice is the user's: their current employer may see it.
- Profile PDF export (Me, View profile, More, Save to PDF) is a quick source of career facts during setup.
