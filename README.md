# G11 Physics — one course, two renderings

*Fundamentals of Physics* for Grade 11 at Druk Gyalpo's Institute, by Tashi
Wangchuk. One body of chapter content, rendered two ways (modeled on
[Seeing Theory](https://seeing-theory.brown.edu)):

1. **The interactive site** (`site/`) — the primary experience. A minimal
   homepage of chapter cards; each chapter is one page of short sections,
   each pairing a couple of paragraphs with one focused inline
   visualization.
2. **The PDF textbook** (`textbook/`) — the same content as a complete
   written treatment, for reading offline or printing. Not a summary.

Both deploy together: the site via GitHub Pages, with the freshly built PDF
copied in so every "Download the textbook (PDF)" button serves the current
build.

## What's in here

```
g11-physics/
├── textbook/
│   ├── main.tex            entry point — compile this
│   ├── chapters/           one .tex file per chapter
│   ├── frontmatter/        acknowledgements etc.
│   ├── figures/            images used by the textbook
│   └── build/              compiled output (gitignored)
├── site/                   interactive site (GitHub Pages source)
│   ├── index.html          homepage: chapter cards + PDF button
│   ├── style.css           shared minimal design
│   └── <chapter>.html      one self-contained page per chapter,
│                           prose + inline visualizations, no build step
├── syllabus/
│   ├── syllabus.md         working copy of the syllabus
│   └── g11_physics_syllabus.pdf
└── .github/workflows/
    └── build.yml           CI: builds the PDF and deploys the site
```

## Building the textbook locally

You need a TeX Live installation (MacTeX on macOS). Then:

```sh
cd textbook
latexmk -pdf -output-directory=build main.tex
```

The PDF lands in `textbook/build/main.pdf`.

## Continuous builds

Every push to `main`:

1. compiles the textbook in CI (full TeX Live container),
2. uploads the PDF as a build artifact and attaches it to the rolling
   `latest` release, and
3. deploys `site/` to GitHub Pages, with the fresh PDF included so the site's
   "Download the textbook" button always serves the current build.

One-time repository setup on GitHub: **Settings → Pages → Source: "GitHub
Actions"**.

## Previewing the site locally

The site is plain HTML/CSS/JS — no build step. Serve it with anything, e.g.:

```sh
python3 -m http.server 8000 --directory site
```

(The PDF download link on the landing page only works on the deployed site,
where CI copies `main.pdf` in.)

## Conventions (for anyone editing the textbook)

- Vectors wear arrows; the normal force is always script N (`\mathscr{N}`,
  from the `mathrsfs` package), never italic N — that's reserved for the
  unit newton.
- Derivatives in Leibniz notation.
- TikZ figures in the same clean, minimal style as the existing ones (warm
  `paper` background, `myblue`/`myred`/`mygreen` accent colors).
- Boxes: `keybox` for laws/definitions, `workedexample`, `tryit`,
  `formulabox`. Supplementary (enriching but not required) material goes in
  its own clearly marked section or box so the core path stays short.
- Voice: conversational and first-principles — motivate the question before
  stating the law, use concrete numbers, let history in when it earns its
  place.
