# The Inner Map — version three change summary

Built: 10 August 2026.

Version three keeps everything version two established: the palette, the editorial typography, the
contour motif, the evidence discipline, the First Signal Map, the low-capacity route and the tone.
No design tokens were changed, no new colours or type families were introduced, and no existing page
was rewritten except where a new feature made the old wording untrue.

What changed is scope. Version two was a reflective website. Version three is the first step towards
a private, low-pressure support layer someone can use from their phone — while staying an
educational resource rather than a product that asks anything of them.

---

## 1. The low-capacity route is now a front door

It was previously a navigation button and a thin strip inside the doorway section. It is now:

- a lime button in the hero, beside the primary call to action, rather than a quiet text link;
- a full-width ink section, **"When thinking is hard, start smaller"**, that names all four options
  before you click anything, so the choice is visible without committing to a page;
- a route to real-world support printed on the homepage itself, rather than only inside the tool.

The 30-second tool behind it is unchanged. It was already right.

---

## 2. A new optional page: My day (`/today/`)

For days with enough capacity to think a little further ahead. It is described as optional in the
hero, in the navigation context and in the closing section, and it points back to the 30-second
version whenever capacity is low.

Four short steps, then a draft:

1. **What matters today?** Including "None of these need to happen today", which clears the others.
2. **What is already fixed?** Commitments, anything that cannot wait, and caring or practical
   responsibilities. Blank is stated as a normal answer.
3. **What capacity do you have?** Five plainly-worded options with no scores, no streaks, no
   metrics, and no good-or-bad colour coding. Choosing "Very little" immediately offers to skip the
   rest and go straight to a small shape, or to leave for the 30-second version.
4. **What tends to cost more than it looks?** Optional, and framed as an observation rather than an
   explanation.

The draft is a **today map**, not a timetable: an anchor, a meaningful possibility, a form of
recovery, and one small life-giving thing. Every card is editable, and every card can be made
smaller, moved to another day, replaced with recovery, or removed — and brought back. Underneath sit
a good-enough version, a fallback for when capacity drops, an optional experiment, and the words
"This is a draft, not a promise."

Capacity shapes the starting draft rather than the person's options. At "Very little" the meaningful
and connection cards start held for another day, with a sentence saying so and a one-tap way to
bring them back. The tool never decides anything the person cannot immediately undo.

There is no scoring, no history, no streaks, no reminders and no notion of a day being completed.

---

## 3. Optional export to ChatGPT — no embedded AI

No chatbot, no API, no key, no request leaves the site. At the end of a completed day, and at the
end of a signal map, a collapsed panel builds a structured prompt from what that person entered in
that session and shows it on screen with copy and download controls.

The panel states, before it is opened, that copying it into ChatGPT means giving it to a different
company under their terms, and asks the person to read it and remove anything they would rather not
share. It also states that an AI assistant is not a therapist, a clinician or a crisis service and
can be confidently wrong.

The prompt itself instructs the assistant to think *with* the person: to prioritise capacity and
recovery, to treat suggestions as optional experiments, to reduce demands rather than optimise them
when capacity is low, and not to offer a diagnosis or turn the day into a schedule.

---

## 4. Local saving, off by default

Version two promised that nothing was written to cookies, local storage or session storage. That
promise is kept for everyone who does not opt in, and it is kept unconditionally for the First
Signal Map, which is still memory-only.

My day adds a switch labelled **Keep this on this device**. Until it is switched on, nothing at all
is written to the browser. When it is on, one draft is stored under keys beginning `innermap.v3.`,
on the device only — not synchronised, not on a server, not in an account, because there is no
account system and no server that could receive it.

- **Clear this device's maps** deletes it, behind a confirmation that names what will be lost.
- Switching saving off does the same thing, with its own confirmation, rather than leaving orphaned
  data behind.
- If a saved day exists, the page offers it rather than silently restoring it, and says how old it
  is so a stale day can be discarded without guilt.
- The privacy notice was rewritten to describe all of this, including what the installed copy caches
  and what happens if the prompt is pasted elsewhere.

---

## 5. A new homepage illustration

The version two graphic was attractive but did not show what the tool does. It has been replaced
with a fragment of the actual interface: a capacity reading at the centre of a small map, connected
to three editable signals, with the caption "A draft you can change. Nothing is sent anywhere."

It is built from text and shapes rather than an image, so it scales with browser zoom and stays
legible; below 760 pixels the scattered layout becomes a plain stack rather than overlapping. It
carries a description for assistive technology instead of being hidden from it. No brain imagery, no
fake chat window, no stock photography.

---

## 6. Progressive web app foundation

- A web app manifest with name, scope, theme colours, three shortcuts, and icons at 192, 512 and 512
  maskable, drawn from the existing logo mark.
- A service worker that precaches the shell, serves pages network-first so corrections still arrive,
  and falls back to a cached page and then to an offline page.
- An offline page that can still show a day saved on that device, and copy or print it.
- No native wrapper, no push notifications, no background sync, no analytics.

The worker is registered from a path worked out at runtime, so the site still installs correctly at
a project subpath as well as at the domain root.

---

## 7. Language

New copy was written to the same rules as the rest of the site: map, notice, draft, option,
experiment, capacity, support, what fits — not optimise, fix, perform, achieve, hack, symptoms or
treatment.

Specific decisions worth recording:

- Nothing in My day describes an unfinished day as a failure. Stopping is named as a complete
  outcome at every step, and the closing section is titled "A draft you can abandon is doing its
  job."
- Capacity is called *a reading of today*, never a measurement or a score.
- The draft's cards are described as possibilities and protections rather than tasks.
- The hidden-cost step says that noticing a cost is an observation and that why it costs what it
  does is a separate question the page does not need answered — keeping observation and explanation
  apart, as the approach page requires.
- Nothing implies tracking. There is no history, no trend, no comparison with a previous day.

---

## 8. Accessibility

Mobile was treated as the primary context. Every control in the new flow is at least 44 pixels tall,
each step asks few questions, progress is announced through a status region without implying
pressure, and every step has a visible exit that keeps what already exists.

- The saving switch prints "On" or "Off" as text, so its state never depends on colour or position
  alone.
- Deleting anything asks for confirmation and moves focus to the confirming control.
- Card actions restore focus to the equivalent control after the list is redrawn.
- Automated checks (axe-core, WCAG 2.2 AA rule set) report no violations on the homepage, Start
  here, My day at both the first step and the draft, the low-capacity tool, the privacy notice and
  the offline page.
- New text and non-text contrast was checked by hand; the lowest ratio in the new components is
  5.5:1.
- Layouts reflow to 320 pixels without horizontal scrolling.

---

## What deliberately did not change

- The First Signal Map's questions, wording and memory-only behaviour.
- The evidence page, the source register and the claim labelling.
- The approach page and the eight lenses.
- The palette, radii, type scale and spacing tokens.
- The absence of accounts, analytics, cookies, advertising and email capture.
