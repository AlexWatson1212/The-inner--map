# The Inner Map — version two change summary

Reviewed and rebuilt: 9 August 2026.

Version two keeps the visual identity, the contour motif, the palette, the editorial typography, the
low-capacity route, the First Signal Map concept and the tone. What changed is the rigour underneath
them.

---

## 1. Ethical and evidence changes

**The five-part evidence key is now used, not just declared.**
Version one described five kinds of claim on the evidence page and then never applied the labels
anywhere else. Version two attaches a visible label to the things that carry risk: the eight mapping
lenses on the approach page are marked *Inner Map tool*, and each term on the new "words that carry
the most risk" section carries its own label.

**Every claim type now states its own limits.** Each card in the evidence key gained a closing line
naming what that kind of claim cannot do — for example, that recognising a lived-experience
description is not evidence that it applies to you.

**A new section handles the six highest-risk terms explicitly**: autistic burnout, masking and
camouflaging, sensory experience, executive function, "nervous system" language, rejection
sensitivity (RSD), and late identification. Each one states what the evidence supports and where it
stops.

- Autistic burnout is described as a community-originated concept studied in qualitative research,
  **not** a diagnosis in DSM-5-TR or ICD-11, with no validated test, and with a pointer to a GP if
  exhaustion is persistent.
- Masking is described as *associated with* poorer mental health, with the systematic review authors'
  own statement that causality cannot be inferred. The site does not say masking causes burnout.
- RSD is no longer usable as a condition anywhere. The text says plainly it is not a diagnosis, has
  no agreed definition and no validated measure, and that a strong reaction to rejection does not
  indicate ADHD.
- "Nervous system" language is named as something that often outruns the evidence, and the site
  states that when it talks about overload it means the experience as you would describe it, not a
  measured physiological state.
- Executive function is described as a useful shorthand and a poor explanation.

**"Neurodivergence does not explain everything" is now said out loud** — on the homepage principles
section, inside the tool at the explanations step, and in the summary output itself.

**The "what it is not" list was extended** with: neurodivergence explaining every difficulty, and
being a substitute for support a GP, clinician or specialist service can give.

**Cautious language throughout.** Copy was rewritten to "may", "can", "seems to", "one possible
reading", "your answers may change with context and capacity". Examples: "how capacity … shape daily
life" became "may shape a particular day"; "Mark the conditions that may have increased or reduced
the cost" became "Presence is not proof of cause"; the impact options became "It seemed to increase
the cost" rather than "It increased the cost".

**Trainee status is no longer softened.** The about page now says directly: "Being a student is not a
clinical qualification. I am not a diagnostician, a medical expert, a psychologist or an authority on
every neurodivergent life, and nothing on this site is offered as clinical opinion." It also invites
corrections.

**Separation from the counselling practice was strengthened** and extended to cover the personal
writing and the web-design business, and repeated in the site footer on every page.

**Crisis signposting was corrected to match the NHS page wording** ("get help from 111 online or call
111 and select the mental health option"), a note was added that arrangements differ outside England,
and the Samaritans Welsh-language line was added. Signposting stays proportionate: it appears on the
homepage boundary section, the evidence page, inside the low-capacity route, and in the summary
output — and nowhere else.

**A change log and a next-review date were added to the evidence page.**

---

## 2. Tool and visitor-journey changes

**A new step 4: "Hold more than one reading."** Version one moved from conditions straight to an
experiment, which quietly invited a single explanation to become the answer. There are now two
free-text boxes, a caution that neurodivergence will not explain everything, and eight borrowable
sentences the visitor can insert and edit — including "This may be an ordinary human limit rather
than anything specific to how I am wired." Nothing is pre-selected and the tool never writes an
interpretation for the visitor.

**Explicit stopping points.** Every step carries a "Stop here and keep what I have" control, and step
one carries a panel saying that reading this far is a complete outcome. Stopping early produces a
real summary; stopping before answering anything produces a summary that says so, without implying
failure.

**The summary is labelled as what it is.** It opens with "This is a personal reflection I wrote
myself. It is not an assessment, a screening result or a diagnosis", carries a "Personal reflection"
badge, and closes with five reminders — including that conditions being present does not prove cause,
that answers change with context and capacity, and where to get real support.

**A review question was added** ("When might you look back at this?"), so an experiment has a point
at which it can be revised rather than becoming a rule.

**The experiment list was made less prescriptive.** "Reduce or postpone one thing" now reads
"Reduce or postpone one thing, if that is possible", with a note that some demands cannot be moved.
"Observe once more" is stated as a valid choice.

**Conditions list extended** with "A change in medication, hormones or health" and "Something
happening in life outside this moment", so the tool does not implicitly frame every cause as
neurological.

**The low-capacity route was rebuilt around usability in under a minute.** Each of the four options
now gives three concrete actions plus a sentence the person can borrow, rather than a single
paragraph. A permanent "If none of these fit" panel says that sometimes nothing can be reduced,
nobody can be asked and the decision cannot wait — that this is a real situation, not a failure of
effort — and gives UK support routes. The intro says plainly that not all of these are possible in
every situation.

**Doorway links now preselect the matching area** (`/map/?area=overload`), so choosing a doorway does
not mean answering the same question twice.

**Choosing a doorway is explicitly decoupled from diagnosis:** "Choosing a doorway describes a
situation. It does not describe a diagnosis, and it does not commit you to an explanation."

---

## 3. Accessibility changes

Target: WCAG 2.2 AA. Verified with axe-core (0 violations across all pages, the mobile viewport, and
the tool's summary state), html-validate (0 errors), and scripted keyboard, reduced-motion and no-JS
tests.

- **Focus indicator fixed.** Version one used a 3px coral outline (`#f1a48d`), which is 1.9:1 against
  the page background and failed SC 1.4.11. Version two uses a dark ring that meets contrast on light
  surfaces and switches to the signal colour on dark sections.
- **Focus is now visible on the tool's cards.** The radio and checkbox inputs are visually hidden
  inside their labels, so the label now takes a `:focus-within` ring — previously keyboard users had
  no visible focus at all inside the tool.
- **All micro-text raised.** Nine rules used 10–11px (0.62–0.68rem) for eyebrows, badges, numbers and
  labels. The floor is now 0.78rem.
- **Contrast fixed** on the summary caveat, which was mid-grey on the dark summary panel.
- **State is never colour-only.** Selected chips and low-capacity options gained a drawn tick; the
  five evidence badges gained distinct drawn shapes (filled square, outlined diamond, circle, half
  circle, double square). All markers use empty CSS content so screen readers are not given
  redundant symbol noise on top of the real checked/pressed state.
- **Mobile menu is now properly modal:** focus moves into it, is trapped while open, Escape closes
  it, and focus returns to the menu button. The button also has an accessible name in text, not only
  in `aria-label`.
- **`aria-current="page"`** marks the current nav item, with an underline so it is not colour-only.
- **Tool progress is announced** through a visually hidden `role="status"` region, and each step in
  the progress bar carries a hidden text label and `aria-current="step"`.
- **Progressive enhancement.** Every content page now works with JavaScript switched off. The tool
  degrades to a readable, printable list of every question with a `<noscript>` explanation, instead
  of an empty page.
- **Enter submits.** The Continue control is the form's submit button, so pressing Enter in a field
  advances the step.
- **Reduced motion** is respected for the tool's scrolling as well as for CSS transitions.
- **Forced-colors mode** gets explicit selected-state and focus styling.
- **Verified: no horizontal scrolling at 320px** on any page, one `h1` per page, no heading-level
  jumps, landmarks present, all decorative images with empty `alt`.

---

## 4. Copy changes

- Homepage hero, doorways and principles rewritten for tentative phrasing.
- Principles section now names the limits of the frame: "Context, health, history, responsibilities,
  money and support all affect what is possible — and neurodivergence will not be the explanation for
  everything that is hard."
- Start-here route notes changed from "Useful for…" to "Often used for…", so they describe how people
  use the doorway rather than prescribing who it is for.
- The approach page's "possible explanation" card now lists competing causes explicitly (tiredness,
  illness, hunger, stress, medication, the content of the message).
- The privacy notice now states that nothing is written to cookies, `localStorage` or
  `sessionStorage`, names GitHub Pages as the host, and adds a short "your rights" section.
- The accessibility statement was rewritten with what changed in version two and a specific,
  honest list of what is still missing — including that no screen-reader user has tested it yet.
- The 404 page now lists every route rather than offering two buttons.
- Footer gained a one-line statement of independence, on every page.

Nothing was added purely to increase the amount of content. The evidence page grew because each
source now carries a "what it does not support" note; the tool grew by one step. Everything else is
the same length or shorter.

---

## 5. Technical changes

- **Next.js build output replaced with hand-authored static files.** Version one shipped ~800KB of
  minified React chunks to render text that never changes, and the tool's wording was locked inside a
  minified bundle where it could not be reviewed or corrected. Version two is plain HTML, one
  stylesheet and two small scripts — roughly 90% smaller, editable without a toolchain, and with the
  tool's questions visible in the HTML where they can be audited.
- **Relative paths throughout**, so the site works at a domain root and at a GitHub Pages project
  subpath. Version one's root-absolute paths broke the temporary Pages preview described in its own
  README.
- **Metadata:** canonical URLs added to every page, `noindex` on the 404, Open Graph and Twitter tags
  kept, JSON-LD moved from inside `<main>` to the document head and reduced to one accurate
  `WebSite` object. The `keywords` meta tag was dropped (ignored by search engines, and it listed
  diagnostic terms).
- **Sitemap and robots.txt** rewritten with real routes, `lastmod` and priorities.
- **`ol`/`li` used for ordered content** that version one marked up as divs and spans.
- **Print stylesheet** extended so the summary prints legibly on white.
- Duplicate `/404/index.html` and `/_not-found/index.html` artefacts removed.
- Removed: `_next/` (12 files), the `codex-preview` meta tag left in from development.

---

## Known limitations, stated plainly

- No screen-reader user has tested this. Automated tooling and keyboard testing do not substitute.
- The evidence base for autistic burnout and camouflaging is genuinely thin — small, self-selected,
  mostly cross-sectional samples. The site says so, but a reader in distress may still read more
  certainty into it than is there.
- The eight lenses on the approach page are one person's organising device. They are labelled as
  such, but they are not validated and should not become a taxonomy.
- Print styles have been checked in one browser engine.
