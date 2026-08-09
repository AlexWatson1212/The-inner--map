# The Inner Map — strategy and handover

## 1. Strategic diagnosis

The project is trying to give neurodivergent adults a repeatable way to learn from their own lives. Its strongest differentiator is not another explanation of ADHD or autism; it is the movement from a specific moment to a careful observation, a working hypothesis and one small experiment.

The editorial calm, direct voice and principles from the earlier site were worth retaining. The old version needed to change from a manifesto about future content into a useful first-visit journey. The strongest first version therefore contains recognisable doorways, a low-capacity route, one complete private mapping tool, evidence boundaries and clear stopping points.

Deliberately postponed: accounts, an app, email capture, paid products, a large article library, multiple unfinished maps, counselling promotion and a universal “AuDHD operating system.” The First Signal Map should be tested before expanding the product.

## 2. Final concept

- **Promise:** Understand your mind. Map your patterns. Build a life that fits.
- **Primary visitor:** A late-identified, diagnosed, self-identifying or questioning neurodivergent adult experiencing masking, fluctuating capacity, overload, burnout, difficult task initiation or hidden effort.
- **Outcome:** Leave the first visit with one specific observation and one reversible experiment—not a score or diagnosis.
- **Process:** Pause → Notice → Make sense → Test → Review. It is a loop, not a ladder.
- **Brand position:** A calm, intelligent field guide beside the visitor. Independent from Alexander Watson’s counselling, reflective writing and web-design brands.
- **Counselling relationship:** Quiet, optional and transparent. Maps may give someone language for therapy, but the website is not therapy and does not push visitors towards it.
- **Ethical boundary:** Educational, reflective, practical and evidence-aware. Not diagnostic, medical advice, clinical assessment or crisis support.

## 3. Sitemap and visitor journey

| Page | Purpose |
| --- | --- |
| `/` | Explain the promise, offer recognisable doorways and show the process. |
| `/start` | Let the visitor enter through the difficulty that feels most relevant. |
| `/map` | Complete the First Signal Map, or switch to a 30-second low-capacity version. |
| `/approach` | Explain the five-move process and the eight possible map areas. |
| `/evidence` | Define evidence types, limitations, sources and current UK urgent-help routes. |
| `/about` | Explain the project’s origin, creator and separation from counselling. |
| `/privacy` | Explain that reflection content stays in the current browser tab. |
| `/accessibility` | Record accessibility decisions and current testing limitations. |

Primary route: Home → Start Here → First Signal Map → copy/download/print → review the experiment later.

Reduced-capacity route: “Very little capacity” → one choice → one possible action and communication script → stop.

Returning visitors can open `/map`, capture another specific moment and compare saved summaries themselves. No behavioural or sensitive data is stored by the site.

## 4. Visual identity

### Concept: contour and waypoint

Open contour lines represent an incomplete, revisable understanding. The single high-visibility waypoint represents one useful observation rather than a final destination. The mark is deliberately neither a brain nor a literal navigation pin.

### Colour roles

| Token | Hex | Role |
| --- | --- | --- |
| Ink deep | `#0b2529` | High-emphasis backgrounds and footer |
| Ink | `#132f33` | Primary text and actions |
| Paper | `#f7faf9` | Main background |
| Mist | `#e8f1f0` | Section background |
| Sky | `#c7e3e5` | Calm supporting panels |
| Lilac | `#dfdcf0` | Secondary variation without wellness beige |
| Signal | `#d3e86f` | Waypoints, selected states and low-capacity emphasis |
| Coral | `#f1a48d` | Keyboard focus indication |

Typography uses a system editorial serif stack for headings and a clear system sans-serif stack for body text. This avoids external font requests and keeps the site fast and resilient.

## 5. Asset manifest

The finished site does not require photography or generated raster illustration. The visual family is expressed by typography, colour, CSS contour fields and the included editable SVG identity. This is intentional: it reduces cognitive noise, download weight and the risk of generic wellness imagery.

| File | Format and dimensions | Use and code reference | Accessibility and crop | Generation or editing direction |
| --- | --- | --- | --- | --- |
| `public/brand/logo-mark.svg` | SVG, 64×64 viewBox | Header, About; `app/components/logo.tsx`, `app/about/page.tsx` | Decorative when beside wordmark: empty alt. No crop. | Included precision vector; do not regenerate with a raster AI tool. Edit paths and colours directly if revised. |
| `public/brand/logo-mark-light.svg` | SVG, 64×64 viewBox | Footer; `app/components/logo.tsx` | Decorative when beside wordmark: empty alt. No crop. | Included precision vector; retain open contours and signal waypoint. |
| `public/brand/logo-horizontal.svg` | SVG, 420×96 viewBox | External light-background brand use | Informative standalone logo; alt: “The Inner Map”. Keep 12% clear space. | Included editable vector. Convert type to outlines only when sending to a printer that cannot use the font stack. |
| `public/brand/logo-horizontal-light.svg` | SVG, 420×96 viewBox | External dark-background brand use | Informative standalone logo; alt: “The Inner Map”. Keep 12% clear space. | Included editable vector. Do not add shadows, gradients or a filled map pin. |
| `public/favicon.svg` | SVG, 64×64 viewBox | Browser icon; `app/layout.tsx` | Informative browser mark. No crop. | Included. Preserve the simplified two-contour form at small sizes. |
| `public/brand/social-share.png` | PNG, 1200×630, 1.90:1; target under 300 KB | Social previews; `app/layout.tsx` | Alt: “The Inner Map — Understand what changes. Build around what helps.” Text and mark sit inside a 72 px safe area. | Exported from the included `social-share.svg`. Re-export at 1200×630 after copy or colour changes. |

### Optional future editorial-image family

No code currently expects these files. Add them only when a real article requires an image; do not create them merely to decorate the current site.

Suggested filename pattern: `public/images/editorial-[topic]-01.webp`, 1600×1000 px, 8:5, maximum 180 KB.

Generation prompt:

> Abstract editorial still life exploring neurodivergent self-observation through layered translucent paper, hand-drawn contour lines, one small yellow-green waypoint, cool daylight, deep teal and pale blue palette, tactile but uncluttered, premium independent magazine art direction, generous negative space, subtle grain, no people, no text, no literal maps, 8:5 landscape composition.

Avoid: puzzle pieces, brains, rainbow infinity symbols, medical imagery, beige wellness styling, glowing effects, productivity dashboards, phones, legible writing, clutter, sentimental stock-photo mood or childlike illustration.

Export action: choose one coherent image style first; crop with the subject in the outer third so article text can occupy the opposite side; convert to WebP at 75–82 quality; strip metadata; verify at 320 px and 1600 px widths; add specific alt text only when the image communicates article meaning.

## 6. Quality review

The production build, route generation, internal links, keyboard focus styles, responsive breakpoints, reduced-motion rules, semantic form labelling, metadata, sitemap, robots, 404, privacy wording and tool export controls were reviewed. The primary interaction still needs real-user testing with neurodivergent adults and a representative mix of screen readers, browsers, zoom levels and mobile devices. Automated checks cannot decide whether the wording feels calming, whether the number of choices is right or whether the mapping result is genuinely useful.

## 7. Next actions

1. Test the Start Here → First Signal Map route with three to five people from the intended audience. Ask what they expected, where effort rose and what they did with the summary.
2. Revise only the doorway language and tool choices that repeatedly cause friction; do not add new maps yet.
3. Connect `theinnermap.co.uk` to the chosen production host and verify HTTPS, redirects, the sitemap and social preview.
4. Add a real contact route only when there is a monitored project email and a clear privacy basis for receiving messages.
5. After evidence that the tool helps, develop one focused downloadable Capacity Map before considering the broader AuDHD Operating System.
