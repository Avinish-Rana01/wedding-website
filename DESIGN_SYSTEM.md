# DESIGN_SYSTEM.md — Royal Indian Luxury Design System

## 1. Visual Direction & Aesthetic Philosophy
The visual language balances the timeless nobility of royal Indian heritage with contemporary haute couture digital design. The mood is warm, celebratory, intimate, and unmistakably grand.

Key metaphors:
- **Royal Velvet & Silk**: Deep burgundy, regal maroon, and midnight hues providing dramatic contrast.
- **24K Gold Leaf & Metallic Filigree**: Shimmering gold foils, embossed wax seals, and delicate ornamental borders.
- **Handmade Parchment & Ivory Paper**: Warm, tactile cream and pearl backgrounds for invitation cards.
- **Golden Hour Illuminations**: Soft warm radial glows, light rays, and celebratory micro-sparkles.

---

## 2. Color Palette & CSS Tokens

```css
:root {
  /* --- Primary Heritage Colors --- */
  --color-royal-crimson: #5c0618;     /* Rich royal Indian wedding crimson */
  --color-burgundy-deep: #3b030e;     /* Deep velvet background base */
  --color-night-maroon: #210107;      /* Shadow depth / midnight backdrop */
  
  /* --- Metallic Gold Spectrum --- */
  --color-gold-light: #fbeea4;        /* Highlight & sparkle shimmer */
  --color-gold-primary: #d4af37;      /* Classic metallic gold */
  --color-gold-rich: #c59b27;         /* Antique warm gold */
  --color-gold-dark: #8c6d1a;         /* Foil shadow & border depth */
  --gradient-gold: linear-gradient(135deg, #fbeea4 0%, #d4af37 50%, #aa820a 100%);
  --gradient-gold-foil: linear-gradient(45deg, #c59b27 0%, #fbeea4 25%, #d4af37 50%, #fef3c7 75%, #aa820a 100%);

  /* --- Parchment & Neutral Card Tones --- */
  --color-paper-light: #fffdf9;       /* Ivory card surface */
  --color-paper-warm: #fcf8ee;        /* Warm parchment card back */
  --color-paper-border: #e8d9bd;      /* Subtle inner card border */
  --color-text-dark: #2a1b12;         /* Deep espresso ink for card text */
  --color-text-muted: #6b5c52;        /* Secondary typography on card */
  --color-text-light: #fef7ea;        /* Light text on dark backgrounds */
  --color-text-gold: #e5c158;         /* Subheading gold text */

  /* --- Event Specific Accents --- */
  --color-haldi-yellow: #f59e0b;      /* Auspicious turmeric gold */
  --color-mehendi-green: #15803d;     /* Rich henna emerald */
  --color-sangeet-violet: #7e22ce;    /* Festive royal purple */
  --color-vivah-red: #b91c1c;         /* Sacred vermillion / sindoor */
  --color-reception-navy: #1e3a8a;    /* Regal celebration midnight blue */

  /* --- Shadows & Glows --- */
  --shadow-envelope: 0 20px 50px rgba(0, 0, 0, 0.65), 0 5px 15px rgba(0, 0, 0, 0.4);
  --shadow-card: 0 15px 35px rgba(42, 27, 18, 0.25);
  --glow-gold: 0 0 25px rgba(212, 175, 55, 0.45), 0 0 50px rgba(212, 175, 55, 0.2);
  --glow-seal: 0 4px 15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.4);

  /* --- Geometry & Spacing --- */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  --envelope-width: min(92vw, 440px);
  --envelope-aspect: 4 / 3;
}
```

---

## 3. Typography Scale & Fonts

### Font Pairings
- **Display & Monograms**: Elegant Serif with stately ligature support.
  - *Recommended Web Font*: `'Cinzel Decorative'`, `'Playfair Display'`, or `'Cormorant Garamond'`.
  - *Fallback Stack*: `Georgia, 'Times New Roman', serif`.
- **Primary Body & Titles**: Crisp, readable Roman Serif / Clean Geometric Sans.
  - *Recommended Web Font*: `'Cinzel'`, `'Montserrat'`, or `'Inter'`.
  - *Fallback Stack*: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

### Type Scale
- **Display Hero (Couple Names)**: `clamp(2rem, 5vw + 1rem, 3.75rem)` — Bold, gold foil gradient fill, centered.
- **Section Headers (H2)**: `clamp(1.5rem, 3vw + 0.5rem, 2.25rem)` — Small caps, tracking `0.15em`.
- **Card Subheadings (H3)**: `1.15rem – 1.35rem` — Warm gold or deep espresso.
- **Body / Descriptive Text**: `0.95rem – 1.05rem` — Line height `1.65`, comfortable reading on OLED/LCD screens.
- **Small Metadata (Timings, Dress codes)**: `0.8rem – 0.875rem` — Uppercase, letter-spacing `0.08em`.

---

## 4. UI Elements & Motifs

### 4.1 Golden Wax Seal
- Circular embossed badge (diameter: 64px–72px).
- Crimson or antique gold wax texture with a raised rim and embossed monogram **"P & S"**.
- Subtle 3D inner bevel and drop shadow (`--glow-seal`).

### 4.2 Gold Foil Borders & Card Frames
- Double fine-line borders with delicate floral or geometric corner flourishes.
- Outer border: 1px solid `var(--color-gold-rich)`.
- Inner inset border: 1px dashed or solid `var(--color-gold-light)` with `6px` padding.

### 4.3 Interactive Buttons
- **Primary CTA ("Open Invitation", "RSVP via WhatsApp")**:
  - Background: `var(--gradient-gold)`.
  - Text: `var(--color-burgundy-deep)`, bold, letter-spacing `0.05em`.
  - Hover / Active: Lift `translateY(-2px)`, expanded gold aura (`--glow-gold`).
  - Active: `scale(0.98)`.
- **Secondary Buttons ("View Map", "Add to Calendar")**:
  - Background: Transparent with 1.5px gold border.
  - Text: `var(--color-gold-light)`.

---

## 5. Motion & Animation Principles

| Principle | Execution |
| :--- | :--- |
| **Cinematic Weight** | Transitions should feel physical and luxurious, not instantaneous or jittery. Use durations between `700ms` and `1400ms` for major card movements. |
| **Natural Easing** | Use smooth bezier curves: `cubic-bezier(0.22, 1, 0.36, 1)` or `cubic-bezier(0.4, 0, 0.2, 1)`. |
| **3D Dimensionality** | Enable `perspective: 1200px` and `transform-style: preserve-3d` on the envelope container for authentic fold physics. |
| **Layered Staggering** | Sequence animations logically: Seal breaks (0s) -> Flap opens (0.3s) -> Light burst (0.7s) -> Card emerges (0.9s) -> Content fades in (1.4s). |

---

## 6. Accessibility & Inclusivity (WCAG 2.1 AA)
- **Contrast**: All card body text must maintain a minimum 4.5:1 contrast ratio against the parchment background.
- **Touch Target Sizes**: All interactive triggers (wax seal, buttons, accordions, links) must have at least `48px x 48px` clickable/tap area.
- **Reduced Motion**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
  When reduced motion is preferred, clicking the envelope instantly renders the opened invitation card without 3D rotations or flashing light bursts.
- **Keyboard Navigation**: The wax seal / envelope button must be a native `<button>` element with clear `:focus-visible` styling (outline: 2px solid `var(--color-gold-light)`).
