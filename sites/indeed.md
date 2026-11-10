# Indeed

- Searching needs the browser. Indeed blocks scripted requests, and may show a "verify you're human" check: ask the user to complete it, then carry on.
- "Apply on company site" opens the employer's system in a new tab. Before clicking, remove the link's `target` attribute (or open the URL yourself in a tab you control), so the page opens where you can work with it.
- **Indeed Apply** (applying on Indeed itself) runs over several pages: contact details, CV, employer questions, review.
  - CV page: the upload control is a file input with `data-testid="resume-selection-file-resume-radio-card-file-input"`. The file upload tool works on it directly. Afterwards make sure the radio card for the new file is selected. A plain `form_input` on the radio may not register; clicking the card does.
  - Some employers ask for a note or cover letter in the advert but the form has no field for it. Tell the user, and save the note in `workspace/tailored/` so they can send it another way.
  - The last page's button is "Submit your application". Stop there.
- Indeed's saved profile CV may be attached by default. Check which CV is selected.
