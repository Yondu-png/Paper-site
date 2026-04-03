# OCD × behavioural addictions — conference prep

Structured extraction and an interactive “field manual” style course for **Rai et al. (2022)**, *Behavioural addictions in obsessive compulsive disorder – Prevalence and clinical correlates* (*Psychiatry Research Communications*).

## Repository layout

| Path | Purpose |
|------|--------|
| `paper/Behavioural-addictions-in-OCD.pdf` | Local copy of the source PDF (copied from your supplied path). |
| `content/meta.json` | Citation, DOI, journal metadata. |
| `content/extraction.json` | Substantive extraction by section (methods, results narrative, etc.). |
| `content/course.json` | Pedagogy: plain summaries, glossary, quizzes, presenter cues. |
| `content/tables/table1.json` … `table4.json` | All four results tables as data (with column/role notes). |
| `content/figures/figure1.json` | Numeric values for the BIS figure (reconstructed chart in the app). |
| `content/stats-map.json` | RQ → analysis mapping and SPSS workflow notes. |
| `content/comparisons.json` | Measure-vs-measure comparison grid. |
| `content/ambiguities.json` | Items to verify (e.g. one inconsistent statistic in Table 4, missing *r* values). |
| `content/section-map.json` | Ordered section IDs and sidebar labels. |
| `web/` | Vite + React + TypeScript interactive app. |

## Interactive app

```bash
cd web
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

- **Linear course:** use the rig-panel outline or **Next / Prev** (keyboard **← →** or **p / n**).
- **Day / Night:** theme toggle (tokens in `web/src/styles/theme.css`).
- **Print one-pager:** triggers the browser print dialog; sidebar is hidden in print CSS and a compact summary block is shown.

Production build:

```bash
cd web
npm run build
npm run preview
```

## Accuracy

All table cells, *n*, test names, and *p*-values in `content/tables/` were transcribed from the PDF text. Ambiguities and missing reporting are listed in `content/ambiguities.json` — do not cite those cells without double-checking the original table in the journal PDF.
