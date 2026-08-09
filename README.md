# The Inner Map — version two

This folder is the complete, publishable website. It is plain HTML, one CSS file and two small
JavaScript files. There is no build step, no framework and no dependencies.

## Publish it

1. In your GitHub repository, remove the files currently there.
2. Upload the **contents of this folder** (not the folder itself), including `.nojekyll`.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/(root)**.
4. Open the temporary Pages address and test: the homepage, Start Here, Your Map, the
   "Very little capacity" route, and the mobile menu.
5. Only after that passes, add `theinnermap.co.uk` as the custom domain and update DNS as
   GitHub instructs.

Do not add a `CNAME` file until you are ready to move the custom domain.

### A note about paths

All page and asset links are **relative**, so the site works correctly at a domain root
(`theinnermap.co.uk`) *and* at a project subpath (`username.github.io/repo/`). Version one used
root-absolute paths, which broke when previewed at the temporary Pages address.

The one exception is `404.html`. GitHub Pages serves it for any missing path, so its links have to
be root-absolute (`/start/`). That means the 404 page's links only resolve correctly once the site
is at a domain root. This is expected and is the standard trade-off.

## What is included

```
index.html              Homepage
start/                  Start here — six doorways plus the low-capacity route
map/                    The First Signal Map (the interactive tool)
approach/               The method and the eight lenses
evidence/               Evidence key, how specific terms are used, source register, change log
about/                  About the project
privacy/                Privacy notice
accessibility/          Accessibility statement
404.html                Not found
assets/css/site.css     The whole stylesheet
assets/js/site.js       Mobile navigation only
assets/js/signal-map.js The mapping tool
brand/                  Logos and the social-sharing image
favicon.svg, robots.txt, sitemap.xml, .nojekyll
CHANGELOG-v2.md         What changed from version one and why
SOURCE-REGISTER.md      Claim-by-claim source list with limitations
```

## Editing it

- **Copy changes:** edit the HTML directly. Every page is readable, indented HTML.
- **Design tokens:** the palette, type and radii live in the `:root` block at the top of
  `assets/css/site.css`. Changing a token changes the whole site.
- **Tool questions:** the options are plain HTML in `map/index.html`. Adding a `<label class="choice-card">`
  or a `<label class="condition-chip">` is enough; the JavaScript reads `data-label` for the summary
  and needs no changes.
- **Sources:** add a new `<article class="source-item">` in `evidence/index.html`, and add a line to
  the change log at the bottom of the same page. Keep the "What it supports here" and "What it does
  not support" pair — that structure is the point.

## Review dates

Two dates are written into the site and should be kept current:

- `evidence/index.html` — "Evidence page last reviewed" and "Next planned review".
- `privacy/index.html` and `accessibility/index.html` — "Last reviewed".

## Privacy behaviour to preserve

The mapping tool holds everything in memory. It does not use `localStorage`, `sessionStorage`,
cookies, or any network request. If that ever changes, the privacy notice has to change with it —
it currently makes a specific promise.
