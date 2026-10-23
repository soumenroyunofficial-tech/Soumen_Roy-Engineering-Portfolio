# Soumen Roy — Professional, Editable Engineering CV

## Scope and implementation

Create a polished, responsive personal CV/portfolio site using React, TypeScript, and Vite. Present Soumen Roy’s resume content faithfully: professional summary, education, experience, projects, technical skills, leadership/achievements, certifications/training, languages, interests, location, phone, and email. Do not invent missing work, social links, achievements, or biography.

The site is a client-side app without login, server, or database. An owner-facing Edit mode allows existing profile and item content to be revised, entries and custom sections to be added, entries and sections to be reordered, and information to be deleted. Deletions expose an Undo action. Draft changes can be canceled; saved changes persist in the current browser using localStorage. A clear local-storage notice, JSON export/import for backup and transfer, reset-to-resume action, and print-friendly CV view make the editable content practical to maintain. Browser edits do not automatically sync to other devices.

A persistent selector offers five accessible color palettes. The hero uses an original abstract engineering illustration, supported by restrained CSS/SVG technical motifs. Artwork is generic technical illustration, not a generated likeness or claimed photograph of Soumen. The site includes responsive layouts, keyboard-accessible controls, contrast-conscious palettes, and page metadata. It is delivered in managed Preview and is not publicly published.

## Project structure

- `src/main.tsx` loads the React application and stylesheet.
- `src/App.tsx` coordinates the page, edit/save state, browser persistence, undo, theme switching, and import/export.
- `src/components/Field.tsx` provides accessible reusable editing inputs.
- `src/components/PortfolioSectionView.tsx` renders CV sections, entries, and their editing controls.
- `src/data/resume.ts` contains typed, resume-derived starter profile data.
- `src/styles/site.css` defines the responsive design, print rules, and five color themes.
- `public/` contains the route manifest, favicon, and managed engineering illustration.
- `index.html`, `package.json`, `pnpm-workspace.yaml`, `tsconfig.json`, and `vite.config.ts` provide the pinned Vite/React/TypeScript toolchain and application shell.

## Design exploration

- **Professional engineering editorial** — probability 0.08: restrained navy/graphite, generous whitespace, disciplined type, precise technical linework.
- **Contemporary academic** — probability 0.06: refined serif headings, cool slate, muted blue accents, structured research-note details.
- **Modern studio portfolio** — probability 0.04: crisp white, charcoal, restrained cobalt accents, geometric diagrams.

**Chosen direction: Professional engineering editorial**, paired with an in-site palette selector so the owner can change color mood without losing readability or polish.

- **Design Movement:** Contemporary Swiss editorial applied to an engineering CV: clean, composed, and information-first.
- **Core Principles:** Strong readable hierarchy; credible and specific technical content; consistent spacing and alignment; functional, discoverable editing controls.
- **Color Philosophy:** A professional navy/graphite and soft neutral default signals focus and reliability. The selector offers five coherent alternatives while maintaining accessible contrast and restrained accent use.
- **Layout Paradigm:** Compact profile identity rail alongside a clear, vertically flowing CV narrative. Education and experience use aligned timelines; projects receive breathing room rather than a crowded generic card grid.
- **Signature Elements:** Fine schematic connector lines; numbered section markers; concise metadata labels for dates, tools, and project context.
- **Interaction Philosophy:** Reading remains frictionless. Edit mode is explicit; draft changes can be canceled; deletion can be undone; theme changes preview immediately and persist.
- **Animation:** Subtle 160–220 ms transitions for theme and disclosure state, with reduced-motion support; no decorative continuous movement.
- **Typography System:** A refined, professional display serif for headings paired with a highly legible sans-serif for body and UI; monospace only for small engineering metadata and labels.
- **Brand Essence:** An emerging engineer’s portfolio connecting mathematical reasoning to embedded systems and robotics; thoughtful, practical, interdisciplinary.
- **Brand Voice:** Direct and technically grounded. Examples: “Building thoughtful systems where mathematical reasoning meets real-world hardware.” “Explore selected work, then make this profile your own.”
- **Wordmark & Logo:** A compact SR monogram formed from intersecting strokes, paired with a clean wordmark.
- **Signature Brand Color:** Deep professional navy for the default palette; the theme picker offers the requested alternatives.

## Dependencies and serving

Use the minimal React/TypeScript/Vite client stack, pinned to pnpm 11 with an explicit build-script policy. Serve on the initialized Preview port 3000. Provide `/manus-routes.json` for the single `/` route. Persist owner edits only in browser localStorage; provide JSON export/import for portability. No project database or server-side storage is needed. Public publication is not part of this task.
