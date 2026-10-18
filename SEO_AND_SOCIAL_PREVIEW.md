# SEO_AND_SOCIAL_PREVIEW.md — Search Metadata & WhatsApp Sharing Specifications

## 1. Overview
The primary distribution channel for this wedding website will be direct messaging platforms—specifically **WhatsApp**, iMessage, and SMS—alongside social networks. When a guest receives the link, the chat application renders an automated rich preview card.

This document outlines the required Open Graph (OG), Twitter Card, HTML meta tags, and asset specifications to ensure a flawless, luxurious preview across all platforms.

---

## 2. Meta Tags Specification

These tags must be embedded in the `<head>` of [index.html](file:///c:/Users/asust/OneDrive/Documents/Wedding%20website/index.html):

```html
<!-- Primary Page Metadata -->
<title>Wedding Invitation | Prachi &amp; Sumit</title>
<meta name="title" content="Wedding Invitation | Prachi &amp; Sumit" />
<meta name="description" content="Together with their families, Prachi &amp; Sumit cordially invite you to join them in celebrating their wedding festivities." />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
<meta name="theme-color" content="#3b030e" />

<!-- Open Graph / WhatsApp / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://__" />
<meta property="og:title" content="Wedding Invitation | Prachi &amp; Sumit" />
<meta property="og:description" content="Together with their families, Prachi &amp; Sumit cordially invite you to celebrate their wedding festivities." />
<meta property="og:image" content="https://__/og-preview.jpg" />
<meta property="og:image:secure_url" content="https://__/og-preview.jpg" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Royal Wedding Invitation for Prachi &amp; Sumit" />
<meta property="og:site_name" content="Prachi &amp; Sumit Wedding" />
<meta property="og:locale" content="en_IN" />

<!-- Twitter / X Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://__" />
<meta name="twitter:title" content="Wedding Invitation | Prachi &amp; Sumit" />
<meta name="twitter:description" content="Together with their families, Prachi &amp; Sumit cordially invite you to celebrate their wedding festivities." />
<meta name="twitter:image" content="https://__/og-preview.jpg" />

<!-- Icons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

## 3. WhatsApp Preview Specifics & Best Practices

WhatsApp's crawler (`WhatsApp/2.x.x`) enforces strict caching and asset limits:
1. **File Size Limit**: The preview image (`og:image`) must be strictly **under 300 KB** (optimally between 80 KB and 200 KB). WhatsApp will silently drop previews that exceed 300 KB.
2. **Aspect Ratio & Dimensions**:
   - Optimal standard: `1200 x 630 px` (1.91:1 aspect ratio).
   - Safe zone for WhatsApp square crop: Ensure the couple's monogram ("P & S") and names are positioned within the central `630 x 630 px` square, as older WhatsApp clients may crop to 1:1.
3. **Absolute HTTPS URL**: Relative URLs (e.g. `/og-preview.jpg`) fail on WhatsApp. The URL must be fully qualified (`https://...`).
4. **HTTPS SSL Requirement**: The server must deliver valid TLS certificates; self-signed certificates fail scraper checks.
5. **Direct JPEG Format**: WhatsApp parses standard progressive JPEGs with the highest reliability.

---

## 4. Visual Content of the Social Preview Image (`og-preview.jpg`)
The social image should be designed to immediately convey royal prestige:
- **Background**: Deep velvet royal crimson with a subtle ornamental gold mandala / damask watermark.
- **Center**: Embossed golden wax seal with the monogram **"P & S"**.
- **Top Text**: *"WEDDING INVITATION"* (Golden small caps serif).
- **Primary Text**: *"Prachi & Sumit"* (Cursive/calligraphy royal typography).
- **Subtext**: *"Save the Date | Celebrations & Details Inside"*.

---

## 5. Schema.org Structured Data (JSON-LD)

Place inside `<head>` to assist search engine indexing and Google rich cards:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Wedding of Prachi & Sumit",
  "startDate": "__",
  "endDate": "__",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "__",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "__",
      "addressRegion": "__",
      "addressCountry": "IN"
    }
  },
  "image": [
    "https://__/og-preview.jpg"
  ],
  "description": "Wedding celebration and festivities of Prachi and Sumit.",
  "organizer": {
    "@type": "Person",
    "name": "Families of Prachi & Sumit"
  }
}
</script>
```
