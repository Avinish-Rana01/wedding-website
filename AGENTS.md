# AGENTS.md — Permanent Project Instructions & Workflow Rules

## 1. Project Identity & Purpose
- **Project**: Wedding Invitation Website for **Prachi & Sumit**.
- **Nature**: A bespoke, premium, cinematic, mobile-first digital wedding invitation experience.
- **Signature Feature**: An interactive 3D envelope-opening ritual featuring a golden wax seal, realistic 3D flap fold, burst of golden light rays, ambient floating particles, and an emerging luxury invitation card.
- **Event Scope**: Five sacred functions only:
  1. **Haldi**
  2. **Mehendi**
  3. **Sangeet**
  4. **Wedding Ceremony**
  5. **Reception**
- **Strict Exclusion**: **Engagement** MUST NOT be included anywhere on the website.

---

## 2. Core Operational Rules & Restrictions

### Rule 2.1 — Truth & Placeholders
- All unconfirmed details (surnames, dates, times, venue names, addresses, maps, RSVP contacts) must strictly use `__` as a placeholder.
- **Never invent or assume** dates, family names, locations, contact numbers, or quotes.
- If information is missing, leave the explicit `__` token or cleanly designed empty states as documented in `WEDDING_CONTENT.md`.

### Rule 2.2 — Separation of Concerns
- Wedding data, event itineraries, family messages, and RSVP links must be kept in a dedicated configuration file (e.g., `src/data/weddingContent.js` or `weddingData.js`), completely decoupled from UI rendering, styling, and animation logic.
- UI components must consume this configuration dynamically so content updates never require rewriting component logic or styles.

### Rule 2.3 — Privacy & Security
- Never expose private Google Sheets links, form-editing URLs, backend admin tokens, or unapproved personal contact numbers in public source code or commits.
- Only publicly designated RSVP submission endpoints or WhatsApp/form links approved for guests may be rendered.

### Rule 2.4 — Tech Stack & Dependencies
- Built on top of the existing **React 19** and **Vite** starter.
- Prioritize **Vanilla CSS** with CSS Custom Properties (Design Tokens), CSS 3D transforms, and standard Web APIs.
- Avoid bulky external animation runtimes or CSS frameworks (no Tailwind unless explicitly commanded by user).
- Keep dependencies minimal, lightweight, and performant.

---

## 3. Antigravity Workflow Rules

All agents and developers operating in this repository must abide by the following mandatory 8-step discipline:

1. **Read All Project Instruction Files**:
   - Always read `AGENTS.md`, `PROJECT_BRIEF.md`, `DESIGN_SYSTEM.md`, `ENVELOPE_ANIMATION.md`, `SEO_AND_SOCIAL_PREVIEW.md`, and `WEDDING_CONTENT.md` before implementing or refactoring features.
2. **Inspect Existing Implementation**:
   - Inspect existing files, configuration, and runtime state before making any modifications. Never make blind edits or assumptions about file presence.
3. **Formulate a Clear Plan**:
   - Create a brief, structured plan before implementing major changes or complex components.
4. **Work Incrementally & Verify**:
   - Break changes into logical, verifiable increments. Validate each stage before moving to the next.
5. **Maintain Component Modularity**:
   - Build isolated, single-responsibility components with co-located or tokenized styles.
6. **Cross-Platform & Accessibility Testing**:
   - Verify mobile screens (320px, 375px, 414px) and desktop viewports (1280px, 1440px+).
   - Test keyboard navigation (Tab, Enter, Space, Escape).
   - Test `prefers-reduced-motion` compliance across all animations.
   - Run production builds (`npm run build`) and lint checks (`npm run lint`).
7. **Report Honest Test Results**:
   - Report actual terminal, build, and visual inspection outputs truthfully. Never invent fake passing metrics.
8. **No False Completion Claims**:
   - Never declare a feature finished or tested if it has not been verified in the code and build.

---

## 4. Coding & Architecture Standards

### 4.1 React & Component Structure
- Functional components with React Hooks.
- Descriptive naming for components, props, and custom hooks.
- Semantic HTML tags (`<main>`, `<header>`, `<section>`, `<article>`, `<footer>`, `<dialog>`).
- Strict accessibility attributes (`aria-label`, `aria-expanded`, `aria-hidden`, `role="dialog"`).

### 4.2 Styling & Motion
- All design tokens (colors, fonts, shadows, transitions) defined in `src/index.css` via `:root`.
- GPU-accelerated properties for animation (`transform`, `opacity`, `filter`). Avoid animating layout properties (`width`, `height`, `top`, `left`, `margin`).
- Support `prefers-reduced-motion: reduce`: Provide immediate, elegant fallbacks without disorienting motion.

---

## 5. Instruction Files Index
- [PROJECT_BRIEF.md](file:///c:/Users/asust/OneDrive/Documents/Wedding%20website/PROJECT_BRIEF.md): Mission, user journeys, scope, and key deliverables.
- [DESIGN_SYSTEM.md](file:///c:/Users/asust/OneDrive/Documents/Wedding%20website/DESIGN_SYSTEM.md): Royal Indian luxury palette, typography, layout rules, and tokens.
- [ENVELOPE_ANIMATION.md](file:///c:/Users/asust/OneDrive/Documents/Wedding%20website/ENVELOPE_ANIMATION.md): Complete mechanical and visual specification for the 3D envelope ceremony.
- [SEO_AND_SOCIAL_PREVIEW.md](file:///c:/Users/asust/OneDrive/Documents/Wedding%20website/SEO_AND_SOCIAL_PREVIEW.md): OpenGraph, WhatsApp preview tags, Twitter cards, and favicon.
- [WEDDING_CONTENT.md](file:///c:/Users/asust/OneDrive/Documents/Wedding%20website/WEDDING_CONTENT.md): Itinerary for the 5 events, placeholder rules, and configuration schema.
