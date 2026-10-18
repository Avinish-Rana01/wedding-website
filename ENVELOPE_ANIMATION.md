# ENVELOPE_ANIMATION.md — 3D Interactive Envelope Experience

## 1. Overview & Cinematic Vision
The interactive envelope is the central showpiece of the Prachi & Sumit wedding invitation website. It bridges the tangible tactile delight of unboxing a royal physical card with the magic of modern web cinematography.

Guests should feel the anticipation and joy of unveiling a sacred, royal invitation.

---

## 2. Structural Layering & DOM Architecture

To create an authentic 3D unboxing illusion in pure CSS and React, the envelope consists of distinct geometric layers arranged along the Z-axis:

```
[Layer 0: Background Backdrop & Particle Field] (z-index: 1)
[Layer 1: Ambient Radial Light Burst / Rays]   (z-index: 2)
[Layer 2: Envelope Back Plate]                 (z-index: 3)
[Layer 3: Invitation Card (Initially Hidden)]  (z-index: 4, rises to z-index: 10)
[Layer 4: Envelope Pocket (Left & Right Flaps)](z-index: 5)
[Layer 5: Envelope Bottom Front Flap]          (z-index: 6)
[Layer 6: Envelope Top Folding Flap (3D)]      (z-index: 7, flips back to z-index: 2)
[Layer 7: Golden Wax Seal (P & S Monogram)]    (z-index: 8, breaks/fades on click)
[Layer 8: Interaction Prompt & Tap Ripple]     (z-index: 9)
```

---

## 3. Choreography & State Timeline

The animation sequence is split into 4 distinct lifecycle states:

```
[State 0: IDLE_CLOSED]
       │
       ▼ (User tap / Enter key)
[State 1: SEAL_BREAKING & FLAP_OPENING] (0ms – 700ms)
       │
       ▼
[State 2: LIGHT_BURST & CARD_EMERGENCE] (500ms – 1400ms)
       │
       ▼
[State 3: FULL_VIEW_REVELATION]         (1200ms – 2000ms)
```

### Detailed Timeline:

| Time Offset | Component | Visual Effect | CSS / State Trigger |
| :--- | :--- | :--- | :--- |
| **0ms** | Wax Seal | Seal scales down slightly (`scale(0.92)`), emits a micro gold sparkle, then fades out with a split animation (`opacity: 0`). | `.seal-breaking` |
| **150ms** | Top Flap | 3D fold begins: `rotateX(0deg)` to `rotateX(180deg)`. The flap's `z-index` swaps behind the card at `90deg` (`transform-style: preserve-3d`). | `transform: rotateX(180deg)` |
| **500ms** | Light Burst | Conic radial golden rays explode from inside the envelope cavity, expanding from `scale(0.2)` to `scale(1.8)` with opacity fading from 0.9 to 0. | `@keyframes rayBurst` |
| **600ms** | Particle Field | 18–24 golden micro-sparkles scatter upward and outward with organic floating paths. | Floating particle canvas or CSS particles |
| **700ms** | Invitation Card | Card begins rising out of the envelope cavity: `translateY(0)` to `translateY(-110%)`. | `transform: translateY(-110%)` |
| **1200ms** | Transition to Full View | Card scales smoothly to full reading dimensions (`scale(1.05)` then settles to `scale(1)`). Envelope container softens into the background or transitions gracefully into the main wedding timeline page. | `.is-revealed` |

---

## 4. Technical Implementation Specifications

### 4.1 3D Perspective Container
```css
.envelope-stage {
  perspective: 1400px;
  perspective-origin: 50% 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100vh;
}
```

### 4.2 Top Flap 3D Physics
- **Origin**: `transform-origin: top center;`
- **Transition**: `transform 0.85s cubic-bezier(0.4, 0, 0.2, 1);`
- **Double-sided rendering**: The underside of the flap should feature an inner lining (gold foil or silk pattern) visible once inverted at 180 degrees.

### 4.3 The Golden Wax Seal
- Circular SVG/CSS seal bearing the initials **"P & S"**.
- Ambient breathing animation while in idle state:
  ```css
  @keyframes sealPulse {
    0%, 100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.4); transform: scale(1); }
    50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.7); transform: scale(1.04); }
  }
  ```

### 4.4 Golden Light Rays & Sparkles
- Constructed using CSS conic gradients or lightweight 2D canvas:
  ```css
  .light-rays {
    background: radial-gradient(circle, rgba(251, 238, 164, 0.8) 0%, rgba(212, 175, 55, 0.4) 40%, transparent 70%);
    mix-blend-mode: screen;
    pointer-events: none;
  }
  ```
- No heavy WebGL libraries required; pure hardware-accelerated CSS transforms ensure 60fps even on budget Android devices.

---

## 5. Mobile & Touch Ergonomics
- The entire envelope surface acts as a tap target on touchscreens (min touch target: `320px x 240px`).
- Prevent accidental scroll interception while the opening animation is in progress.
- Once State 3 (Full View) is active, natural page scrolling is enabled.

---

## 6. Accessibility & Reduced Motion Modes
- **Semantic Element**: The closed envelope is wrapped in a `<button type="button" aria-label="Open wedding invitation from Prachi and Sumit" aria-expanded={isOpen}>`.
- **Keyboard Handling**: Accessible via `Tab`, triggered by `Enter` or `Space`.
- **Prefers Reduced Motion**:
  - When `prefers-reduced-motion: reduce` is detected:
    - The envelope bypasses the 3D rotation, ray explosion, and sliding sequence.
    - Instantly opens upon click/tap with a simple 200ms opacity cross-fade.
