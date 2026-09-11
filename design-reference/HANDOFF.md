# Handoff: Symmetry Care Planning Prototype (React + TypeScript)

## Overview
A prototype for Symmetry, a Synanetics-powered NHS care planning product. Covers three screens: an NHS-number login/start page, and two competing concepts (A and B) for browsing and editing a patient's care plans (ReSPECT, About Me, End of Life, etc.), including draft/publish states, autosave simulation, and conflict/recovery modals.

## About the Design Files
The bundled files are **design references built as interactive HTML prototypes** (a custom component framework, not React) — they show intended look, layout, and behavior, not production code to copy directly. The task is to **recreate these designs in React + TypeScript**, using whatever component library / design-token setup best fits the target codebase (or scaffold a fresh Vite/Next React+TS app if none exists), reproducing the DOM structure, styling and interactions described below rather than porting the prototype's markup as-is.

## Fidelity
**High-fidelity.** Colors, type, spacing and copy below are final. Recreate pixel-accurately using the design tokens in themes.css / colors.css (translate CSS custom properties into your app's theme system — CSS variables, a Tailwind config, or a TS theme object, whichever the codebase already uses).

## Design system context
All three screens consume the **Synanetics Design System** ("Symmetry" tenant theme). One design-system file is included in this package for token reference:
- design-system/themes.css — tenant color/font overrides. Only the `:root[data-mode="symmetry"]` block matters for this build; it overrides the SYN base palette (navy, aqua, red, purple, etc.) and sets `--font-family-header: Zilla Slab`, `--font-family-body: Niramit`.
- The full base token set (colors.css, typography.css, spacing.css, shadows.css) and the component bundle (Toggle, Button, etc.) live in the Synanetics Design System project — request access to that project/repo to pull the base layer and Toggle component source; only the Symmetry overrides are bundled here.

If the target codebase does not already have this design system installed, recreate a minimal TypeScript theme with the values under **Design Tokens** below — don't invent new colors.

## Screens

### 1. Start (login) — "Symmetry Care Plan Start.dc.html"
**Purpose:** Clinician enters a patient's NHS number to open their care plan record.

**Layout:** Full-height column. 48px utility header (white, bottom border) → centered content column (flex, gap 40px, padding 32px 20px 20px) → "Powered by Synanetics" footer line.

**Header (left to right):** 28px rounded Symmetry logo mark, "Symmetry" wordmark (Quicksand 600, 20px, navy), 1px grey vertical divider, "Powered by Synanetics" (13px, secondary text), divider, version pill "v1.11.0" (12px, charcoal-90 text on grey-90 pill, fully rounded). Right side: 32×32 hamburger-menu icon button (1px grey-110 border, 6px radius, hover fills aqua #78D5D7), user name "Lesley Rooney" (14px), exit icon button (borderless).

**Hero:** Row: "Welcome to" (Poppins 300, 56px) + 56×56 rounded logo + "Symmetry" (Quicksand 600, 48px, navy #172a3a).

**Card:** 410px wide (max-width 100%), background #f7f9f9, 1px #c8d3d9 border, 4px radius, shadow 0 8px 20px rgba(0,0,0,.1), 40px padding, 20px gap column.
- Intro text: "To begin, please provide a patient NHS number" (Lato 14px)
- Label: "NHS number" (Poppins 13px, #54626c)
- Row: text input (flex:1, 40px tall, numeric-only, 10-digit max, 1px #172a3a border default, hover fill #C7EDEE + aqua-110 border, focus 2px aqua border #78D5D7) + "Find patient" button (36px tall, 6px radius, navy fill/white text when 10 digits entered, else disabled grey #e6ebee/#54626c text)
- Helper/error text below: "Enter a 10-digit NHS number" (grey) normally; "Enter a valid 10-digit NHS number" (red) on invalid submit, with a 400ms horizontal shake animation on the input row.
- Footer: "Powered by [diamond mark] Synanetics" (Zilla Slab, 14px)

**Toast (bottom-right, appears on load):** width 340px, background #FFDEC6 (amber), 2px radius, shadow-200. Warning triangle icon + "Unsaved changes" (14px) header row with a dismiss (×) button top-right. Body text (13px): "Welcome back. We detected you had unsaved changes. Use the link below to return to your last care plan and submit changes." Below it, left-aligned (indented to align with text, not icon): small primary button "Open care plan" (24px tall, 12px Poppins, navy fill/white text, uses standard-primary hover/focus tokens) — navigates to Concept A with the NHS number pre-filled.

### 2. Concept A — "Symmetry Care Plan concept A.dc.html"
**Purpose:** Browse-then-edit flow: a read-only plan preview page, and a full editing page with a left section nav.

**Shared chrome (both concepts):**
- Utility header as above but with a version pill "v8.01", plus a centered pill toggle "Concept A / Concept B" (navy active-segment slides between the two links) and a right-side notification bell, area-switcher menu (dropdown: Care planning, Designer*, Analytics, Patient audit*, Admin* — *disabled/greyed; Analytics navigates to a separate Analytics screen), user name "Joe Bloggs", exit icon.
- **Patient banner:** solid aqua #78D5D7 strip, grid layout, left cluster "RUMBLE, Olive (Olive, she/her) | [NHS number, grouped 3-3-4] | 80y | Female" (Lato 14px), right-aligned "Change patient" button (aqua-tinted #C7EDEE fill, #51c9cb border, 6px radius).

**Plans (read-only) page — left rail (220px, white, right border):**
- "Active plans" header + navy "+ Create" button (top)
- Two ACTIVE rows (ReSPECT v2, About Me v1) — plain rows, hover fill #C7EDEE, red "ACTIVE" pill badge
- "Personal drafts" section label (grey-90 background band)
- One draft row (Advance Care Plan) — no status badge
- "Collaborative drafts" section label
- ReSPECT (v3) row — 3px aqua-110 left border accent, selected state fills #C7EDEE; "Last updated" / "Last updated by" two-line meta text; unsaved-changes indicator = small in-draft icon + a small red dot badge top-right of the icon, with a dark tooltip on hover reading "This care plan has unsaved changes"

**Plans page — content pane (right):**
- Navy header bar: back-chevron + plan title (Poppins 500, 22px) on the left, "In draft" pill (yellow #FFE693, black text, in-draft icon) on the right
- Sub-toolbar (white, bottom border): navy "Edit" button, version label (14px bold), timestamp (13px secondary), "History" button (outlined), and a Toggle labelled "Subscribed" pinned right
- Preview card (white, 1px grey-100 border, shadow-100, max-width 900px): renders the selected plan's read-only content (ReSPECT sections use purple #C8BDDF section headers; unfinished fields show a dashed border "Not provided" placeholder)

**Edit mode (full-page, entered via the Edit button):**
- Action subheader (white, bottom border): left — "Cancel" (outlined, tooltip "We will discard this session's autosave."), "Discharge" and "Delete draft" (both secondary/error style — white fill, red border+text, hover fills light red); center — status pill: idle = "In Draft" (yellow pill, tooltip shows who/when started), saving = pulsing-dot "Saving snapshot…" (grey pill), saved = checkmark "Saved session snapshot" (grey pill, tooltip explains it's a private, unshared snapshot); right — Subscribed toggle, split "Save" button (navy, chevron opens a menu: "Personal draft" / "Collaborative draft"), and "Publish" (navy when dirty/enabled, disabled grey otherwise — becomes enabled only once a field has changed)
- Detail body: centered white card (max 1120px) with a 200px left section nav (Consent — read-only checkmark row, Overview, ReSPECT) over a light-grey wash background (#E6EBEE); selected nav item gets a 3px aqua left border and light aqua hover fill (#78D5D7)
- Main content per section:
  - **Overview ("About Me")**: amber warning banner "Snapshot autosave is not working right now please save changes.", title + italic helper text, three labeled textareas with live character-remaining counters (2000 max) — "What is most important to me", "People who are important to me", "My wellness" — each with an info tooltip icon
  - **ReSPECT**: 4 numbered sections with purple #C8BDDF header bars: (1) date/preferred-name/interpreter checkbox, (2) summary textarea + welfare-proxy radio (Yes/No) + 5 document checkboxes, (3, collapsible, default open) 1–5 slider "What is most important to you?" plus two textareas, (4, collapsible, default closed) clinical recommendation textarea
  - Autosave: any field edit marks the draft dirty, sets status to idle, and — 5s after the last edit — transitions to "saving" (800ms) then "saved" (auto-reverts to idle after 2s)

**Modals (triggered by the bottom-right "Dev sim" panel, which is a prototype-only testing aid and should NOT ship):** Cancel confirmation ("Leave without saving?"), post-crash recovery ("Restore unsaved work?"), returning-user stale-draft resume (plain and conflict variants), and template-mismatch notice. All share one modal chrome: white body, navy header bar (Poppins 24px title + × close), body copy, footer button row split space-between. Confirmation checkboxes ("I understand") gate the destructive action and shake red if skipped.

### 3. Concept B — "Symmetry Care Plan.dc.html"
Same chrome, patient banner (NHS number moved to the front of the banner text here), and edit-mode/detail page as Concept A, with these differences:
- Left rail header reads "Care plans" (not "Active plans"); Create button is outline/ghost style, not filled
- **"In progress" toggle** pinned directly under the header — a track/knob switch plus a count badge (circular, grey-90) showing how many drafts are in progress, and an info icon (tooltip: "Care plans we detect are in progress") — toggling it collapses/expands the "Published/ live" section via a width/opacity/transform transition
- **Published/live** section sits above **Private drafts** and **Collaborative**; rows show a completeness icon (complete/partial/empty SVG) instead of an ACTIVE badge; no dividers between Published rows — dividers are kept only between the End of Life row and the Private drafts header
- Row hover state: light grey fill + inset 3px aqua-110 left accent (class .care-row:hover)
- Selected/unsaved rows can carry a small red completeness-alert dot (e.g. "S117 after care", "End of Life (v2)")
- **Sticky info bar** (replaces Concept A's navy header + separate sub-toolbar): one white sticky bar with, left to right: care-plan title | vertical divider | version label | timestamp | divider | status icon+label | divider | "History" button; right side: Subscribed toggle, then **Edit** and **Publish** buttons (both navy, standard-primary tokens) side by side
- In edit mode, **Consent** is removed from the left section nav (Overview/ReSPECT only)

## Interactions & Behavior
- **Routing:** three static pages, navigated via full page links carrying "?nhs=<10 digits>" in the query string. The two concepts read this on mount; missing/invalid NHS number on a concept page redirects back to Start.
- **NHS number formatting:** stored as raw 10 digits, displayed grouped 3-3-4 with a space (e.g. "965 821 6913").
- Concept switch (the pill toggle) preserves the current NHS number across navigation.
- Dropdown menus (area switcher, save-split-button menu) close on outside click.
- Accordions (ReSPECT sections 3/4) are independently expand/collapsible; section 3 defaults open, section 4 defaults closed.
- Slider (1–5) drives a "0/20/40/60/80/100%" label via a lookup table, not raw percentage math.
- All destructive/irreversible actions (discard snapshot, discard stale draft) require checking "I understand" first; unchecking and submitting anyway triggers a 400ms red shake on the checkbox.
- No real backend: all data is local component state seeded with static prototype content; "Save"/"Publish" only update local status pills, they do not persist anywhere.

## State Management
Per screen, track roughly:
- **Start:** nhsInput: string, showError: boolean, showToast: boolean
- **Concept A / B (shared shape):** screenMode: 'plans' | 'edit', selectedPlanId, activeNav (section id), dirty: boolean, saveStatus: 'idle' | 'saving' | 'saved', subscribed: boolean, one field per form input (about-me textareas, ReSPECT fields, checkboxes, radio, slider), plus modal-visibility booleans (cancel / recover / stale / template-mismatch) and their "I understand" checkbox + error-shake state.
- Concept B additionally tracks showCompletePlans: boolean (the in-progress toggle) and per-row hover/tooltip state for the completeness-icon tooltips.
- Debounced autosave: on any field change, reset a 5s timer; on fire, set "saving" for 800ms then "saved" for 2s, then back to "idle".

## Design Tokens
Pull these from design-system/themes.css (the `:root[data-mode="symmetry"]` block) — key values used across these screens:
- **Navy (primary/nav):** --color-navy-100: rgb(23,42,58) #172a3a
- **Aqua (interactive/focus):** --color-aqua-100: rgb(120,213,215) #78D5D7; light aqua fill --color-aqua-90: rgb(159,225,227); hover fill used ad hoc: #C7EDEE
- **Red (error):** --color-red-100: rgb(217,3,3) #D90303
- **Purple (section headers):** used as literal #C8BDDF (light lavender) for ReSPECT/plan section headers — not a semantic token, applied directly
- **Amber/warning surface:** #FFDEC6 (toast + inline warning banners), warning icon stroke #B5540A
- **Yellow (in-draft badge):** #FFE693 fill, black text
- Neutral card background: #f7f9f9; card border #c8d3d9; page section wash: --color-fill-surface-section
- **Fonts:** Zilla Slab (--font-family-header) for "Synanetics" wordmark context; Quicksand 500/600/700 for the "Symmetry" wordmark; Poppins 400/500/600 for buttons/labels/form controls; Lato 400/700 for body copy; Niramit (--font-family-body) as the design-system's default body font — this prototype layers Lato/Poppins on top for the Symmetry-specific screens
- **Radii:** buttons/inputs 6px (--border-radius-input, Symmetry override), pills/badges fully rounded, cards 4px, modals 0–8px
- **Shadows:** card/login shadow 0 8px 20px rgba(0,0,0,.1); content-card shadow --shadow-100; modal shadow --shadow-200
- **Button states:** primary buttons use the semantic chain --color-fill/text/border-button-standard-primary-{default,hover,focus} — under the Symmetry theme, hover fills aqua (#78D5D7) with navy text, focus keeps navy fill with a 2px aqua focus ring

## Assets
All under assets/ in this package:
- symmetry-logo-icon.png, symmetry-logo.png — Symmetry brand mark
- in-draft-icon.png / .svg — in-draft status icon
- check-circle.png — read-only nav checkmark
- completeness-complete.svg, completeness-icon.svg, completeness-empty.svg — Concept B row completeness indicators

## Files in this package
- Symmetry Care Plan Start.dc.html — Start/login screen source
- Symmetry Care Plan concept A.dc.html — Concept A source
- Symmetry Care Plan.dc.html — Concept B source
- design-system/themes.css — tenant token overrides (Symmetry block is what applies)
- assets/ — image assets referenced above

These .dc.html files use a small custom templating syntax ({{ }} bindings, sc-if, sc-for, style-hover/style-focus pseudo-state attributes) — read them as a spec of markup structure, inline styles and conditional logic, not as literal code to paste into a React project. Translate each sc-if to a conditional render, each sc-for to a .map(), and each inline style/style-hover/style-focus cluster to your styling approach's normal/hover/focus states (CSS modules, styled-components, Tailwind, etc).
