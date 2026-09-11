# Symmetry Care Planning prototype

A clickable React + TypeScript recreation of the Symmetry Care Planning Claude Design handoff — an NHS-number
login/start screen and two competing concepts (A and B) for browsing and editing a patient's care plans (ReSPECT,
About Me, End of Life, etc.), including draft/publish states, autosave simulation, and conflict/recovery modals.

Built on the same stack, lint/format rules, and `@synanetics/syn-library` component set as the team's other
prototypes (see `../SAG`, `../SymmetryReporting`).

## Design reference

The original Claude Design handoff (the `.dc.html` prototype files, the design-system token excerpt, and the full
written spec) is kept under [`design-reference/`](./design-reference) for provenance. It is **not** used by the app —
this project's screens are a from-scratch React/TypeScript recreation per the handoff's own instructions
(`design-reference/HANDOFF.md`), not a port of that markup.

## Getting started

```
npm install
npm run dev
```

Then open `http://localhost:9091`. Enter any 10-digit NHS number on the start screen (e.g. `9658216913`, the seeded
patient) to reach Concept A or Concept B.

## What's here

- `/` — Start (NHS-number login) screen
- `/concept-a` — Concept A: plans list + full-page edit mode with a left section nav
- `/concept-b` — Concept B: "In progress" toggle, completeness icons, sticky info bar
- `/analytics` — stub destination for the area-switcher menu

Theming is the Symmetry tenant palette (`src/styles/theme-symmetry.css`, sourced from the
`synanetics-design-system` skill) layered over `@synanetics/syn-library`'s base `synanetics` theme.

A "Dev sim" panel in the bottom-right corner of Concept A/B triggers the crash-recovery, stale-draft, and
template-mismatch modals for demo purposes — it is a prototype-only aid, not something to ship.

## Before committing, always

```
npm run lint
npm run format:check
```

(`npm run lint:fix` and `npm run format` will fix most issues automatically.)
