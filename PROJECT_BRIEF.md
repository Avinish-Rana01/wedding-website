# PROJECT_BRIEF.md — Wedding Invitation Website for Prachi & Sumit

## 1. Executive Summary
The goal of this project is to create an enchanting, royal, and deeply personal digital wedding invitation website celebrating the union of **Prachi & Sumit**. 

Designed as a mobile-first web experience intended primarily to be shared via WhatsApp and social messaging, the website replicates the intimacy and grandeur of receiving a luxury physical royal wedding invite—enhanced by modern digital cinematography, interactive 3D motion, and smooth transitions.

---

## 2. Core Objectives
1. **Unforgettable First Impression**: Delight guests from the first tap with an interactive, lifelike envelope opening ceremony.
2. **Crystal-Clear Itinerary**: Elegantly showcase the 5 wedding festivities with all pertinent timings, themes, and venue locations.
3. **Flawless Mobile Experience**: Over 90% of guests will open this on iOS and Android devices; the website must feel like a native, fluid application.
4. **Effortless Content Management**: Complete separation of wedding data and copy from the codebase, facilitating instant updates when placeholder dates or venues are confirmed.
5. **Respect for Privacy & Accuracy**: Strictly adhere to verified family details; maintain placeholders (`__`) for unconfirmed data without speculation.

---

## 3. Scope of Events
The invitation covers strictly **five official wedding functions**:
1. **Haldi Ceremony**: The auspicious yellow ceremony filled with turmeric, blessing, and joy.
2. **Mehendi Ceremony**: The artistic celebration of intricate henna motifs and music.
3. **Sangeet Night**: A night of vibrant dance performances, musical celebration, and festive glamour.
4. **Wedding Ceremony (Pheras / Vivah Sanskar)**: The sacred vows around the holy fire.
5. **Reception**: The grand evening of dinner, congratulations, and celebratory blessings.

> [!IMPORTANT]
> **Strict Scope Restriction**: The **Engagement** ceremony is concluded/private and **MUST NOT** be included in this website.

---

## 4. Guest Experience & User Journey

### Phase 1: The Invitation Link & Social Preview
- The guest receives the wedding invitation link on WhatsApp, iMessage, or email.
- The link renders a custom Open Graph preview image (royal monogram / golden envelope), a warm title (*"Wedding Invitation | Prachi & Sumit"*), and an inviting description (*"Join us in celebrating our wedding festivities!"*).

### Phase 2: The Royal Envelope Ceremony (Signature Experience)
- The site loads with a dark, regal backdrop (deep royal crimson / midnight navy with warm ambient glow).
- A 3D luxury envelope sits centrally with a golden wax seal embossed with the monogram **"P & S"**.
- A gentle pulsating glow and subtle prompt (*"Tap to Open Your Invitation"*) invites the guest to interact.
- Upon tap/click:
  - The wax seal breaks with a golden sparkle.
  - The top flap folds open upward in realistic 3D perspective (`transform: rotateX(180deg)`).
  - A radiant burst of golden light rays and delicate sparkles emanates from within the envelope.
  - The gold-bordered luxury invitation card rises smoothly from inside the envelope and expands to full view.

### Phase 3: The Hero Welcome & Couple Reveal
- The invitation card reveals the formal announcement:
  - Sacred invocation / blessing emblem (e.g., *Shree Ganeshay Namah* / *Om* or traditional blessing motif).
  - Couple's names: **Prachi & Sumit**.
  - Wedding announcement phrasing: *"Together with their families, cordially invite you..."*.
  - Countdown timer / Save-the-Date summary badge.

### Phase 4: Event Itinerary (The 5 Functions)
- Interactive event cards or timeline presenting:
  - Function title (Haldi, Mehendi, Sangeet, Wedding Ceremony, Reception).
  - Date & Time (`__` until confirmed).
  - Venue & Hall Name (`__` until confirmed).
  - Dress Code / Attire Palette suggestions (`__` until confirmed).
  - Map link / Directions button (`__` placeholder).
  - Add-to-Calendar action.

### Phase 5: Venue & Map Directions
- Dedicated venue section with location cards.
- Integrated Google Maps placeholder button (*"Get Directions"*).

### Phase 6: RSVP & Blessings
- Welcoming RSVP section with guest inquiry options (WhatsApp RSVP link, phone contact, or response form).
- Note of hospitality (*"We look forward to celebrating with you"*).

### Phase 7: Footer & Warm Closing
- Traditional warm closing message from the families.
- Hashtag / Couple branding: `#PrachiWedsSumit` (or `__`).

---

## 5. Non-Functional Requirements

| Category | Requirement |
| :--- | :--- |
| **Mobile First** | Optimized for 320px–430px viewports (iPhone SE to Pro Max, Samsung Galaxy, Pixel). Flawless scaling to tablets and desktops. |
| **Performance** | Fast First Contentful Paint (<1.5s), 60fps animations, minimal bundle size. |
| **Accessibility** | Semantic HTML, full keyboard navigation, ARIA dialog roles, high contrast text on backgrounds, `prefers-reduced-motion` compliance. |
| **Browser Compatibility**| Modern Safari (iOS 15+), Chrome (Android/Desktop), Edge, Firefox. |
| **Offline/Data Saver** | Graceful degradation on poor network connections; all essential text readable without heavy assets. |
