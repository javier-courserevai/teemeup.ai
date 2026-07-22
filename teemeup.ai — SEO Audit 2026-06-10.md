# teemeup.ai — Full SEO Audit Report

**Date:** June 9, 2026
**Business Type:** SaaS / AI Consumer App (invite-only beta)
**Hosted on:** Vercel
**Audited URL:** https://www.teemeup.ai/
**Skill used:** agricidaniel/claude-seo v2.0.0

---

## SEO Health Score: **58 / 100** — Needs Work

| Category | Score | Weight | Contribution |
|---|---|---|---|
| Technical SEO | 62/100 | 22% | 13.6 |
| Content Quality | 52/100 | 23% | 12.0 |
| On-Page SEO | 76/100 | 20% | 15.2 |
| Schema / Structured Data | 72/100 | 10% | 7.2 |
| Performance (CWV) | 48/100 | 10% | 4.8 |
| AI Search Readiness | 38/100 | 10% | 3.8 |
| Images | 35/100 | 5% | 1.75 |
| **TOTAL** | **58/100** | 100% | **58.35** |

The homepage is well-crafted on-page, but the site is held back by zero content marketing, a canonical conflict on inner pages, missing GEO infrastructure (critical for an AI-first product), and unoptimized images that will hurt Core Web Vitals.

---

## CRITICAL — Fix Immediately

### 1. Canonical / URL mismatch on `/about` and `/media-kit`

**What's happening:**
- `/about.html` redirects **308** → `/about`
- `/about` page has `<link rel="canonical" href="https://www.teemeup.ai/about.html">` ← points back to the redirect source
- Sitemap lists `about.html` (the redirect), not `/about` (the canonical URL)
- Same issue on `/media-kit`

**Fix:**
1. Update canonical on `/about` → `https://www.teemeup.ai/about`
2. Update canonical on `/media-kit` → `https://www.teemeup.ai/media-kit`
3. Update sitemap to list `/about` and `/media-kit` (not the `.html` variants)

**Verification:** Google Search Console → URL Inspection on `/about`.

---

## HIGH — Fix Within 1 Week

### 2. No `llms.txt` — major GEO gap for an AI product

teemeup is a native ChatGPT integration and has no `llms.txt`. LLMs (ChatGPT, Perplexity, Claude, Gemini) use this file to understand how to represent a brand in AI-generated answers.

**Add `/llms.txt`:**

```
# teemeup.ai — LLM-readable site summary
# https://llmstxt.org

# teemeup
> Book golf tee times through natural conversation with Bob, your AI golf caddie.
> Available on WhatsApp, SMS, iMessage, ChatGPT and the teemeup app.
> Powered by Courserev.ai.

## Core product
- [Homepage](https://www.teemeup.ai/): Full product overview, features, how it works, FAQ
- [About](https://www.teemeup.ai/about): Company story, team, mission

## Key facts
- Bob is an AI agent that handles course search, weather-smart ranking, booking and reminders
- Currently in invite-only industry preview
- Integrates with GolfNow, Chronogolf, TeeOff and other booking networks
- Partner platform for golf courses: Courserev.ai

## Contact
- hello@teemeup.ai
```

**Leading indicator:** Check if Perplexity cites teemeup in golf booking queries after 30 days.

---

### 3. `Google-Extended: Disallow` — blocks Gemini AI Overviews

`robots.txt` disallows `Google-Extended`, the crawler Google uses to feed AI Overviews. For an AI-native product, appearing in AI Overviews for "best way to book golf tee times" is high value.

**Fix:** Remove the `Google-Extended: Disallow` line from `robots.txt`.

**Verification:** GSC AI Overview impressions for golf booking queries within 60 days.

---

### 4. Large unoptimized images — LCP and CLS risk

| Image | Size | Format | Issue |
|---|---|---|---|
| `teemeup_home.png` | **500 KB** | PNG | LCP image, no dimensions, no WebP |
| `og-image.png` | **474 KB** | PNG | OG image should be ≤150KB |
| `hero-voice.png` | 22 KB | PNG | No width/height attributes |
| `hero-chat.png` | 26 KB | PNG | No width/height attributes |

**Fix:**
1. Convert all PNGs → WebP (target: teemeup_home < 80KB, og-image < 150KB)
2. Add explicit `width` and `height` to all `<img>` tags to prevent CLS
3. The 474KB OG image is pulled on every WhatsApp/iMessage link preview — bad for mobile shares

---

### 5. Zero content marketing — no non-branded keyword rankings

The entire site is a single marketing page plus legal boilerplate. teemeup ranks for zero non-branded queries today.

**High-intent keywords not being targeted:**

| Query | Intent |
|---|---|
| "book golf tee times near me" | Transactional |
| "best golf booking app" | Commercial |
| "AI golf assistant" | Informational (growing fast) |
| "book tee times on WhatsApp" | Navigational |
| "golf tee time booking ChatGPT" | Informational / Emerging |
| "GolfNow alternative" | Commercial |

**Minimum viable content plan:**
1. "How to book golf tee times in 2026"
2. "AI golf booking: how it works"
3. "Tee time booking apps compared"
4. Per-city tee time guides (geo-specific long-tail)

---

## MEDIUM — Fix Within 1 Month

### 6. FAQPage schema on commercial site
Google no longer shows FAQ rich results for commercial sites (Aug 2023 update). The existing FAQPage is worth keeping for AI/LLM citation purposes — but don't expect Google rich results from it, and don't add more expecting that benefit.

### 7. Apex domain returns `307` (Temporary) instead of `308` (Permanent)
`teemeup.ai` → `307 Temporary Redirect` → `https://www.teemeup.ai/`. Change to 308 in `vercel.json` to signal permanence and pass PageRank cleanly.

### 8. No hreflang despite multi-market coverage
`og:locale: en_GB` but copy targets US, UK, Europe, Asia. Add `hreflang="en-GB"` and `hreflang="en-US"` to homepage as a foundation for international targeting.

### 9. Organization schema missing social profiles
```json
"sameAs": [
  "https://www.instagram.com/teemeup.ai/",
  "https://www.facebook.com/Teemeupai"
  // add LinkedIn, Twitter/X when accounts exist
]
```

### 10. SearchAction schema URL won't resolve
WebSite schema has `?q={search_term_string}` but the site has no search functionality. Either implement search or remove the `SearchAction` from the WebSite schema.

---

## LOW — Backlog

| Issue | Fix |
|---|---|
| Meta `keywords` tag | Remove — ignored by Google since 2009 |
| Avatar alt text (`"teemeup member"`) | Change to `alt=""` (decorative intent) |
| Nav logo missing `loading` attribute | Add `loading="eager"` |
| GSAP loaded from CDN (2 scripts) | Self-host or defer — external CDN dependency |

---

## Technical SEO Summary

| Check | Status | Notes |
|---|---|---|
| HTTPS | ✅ | HSTS with 63-day max-age |
| robots.txt | ⚠️ | Correct structure, but Google-Extended blocked |
| Sitemap | ⚠️ | 6 URLs, but 2 are redirect sources not canonicals |
| Canonical (homepage) | ✅ | `https://www.teemeup.ai/` — correct |
| Canonical (about, media-kit) | ❌ | Points to redirect source |
| Non-www redirect | ⚠️ | 307 should be 308 |
| Security headers | ✅ | HSTS present via Vercel |
| Server response time | ✅ | ~130ms TTFB (Vercel CDN, excellent) |
| 404 handling | ✅ | Custom 404 page exists |
| Mobile viewport | ✅ | Correct viewport meta |

---

## Schema Summary

| Schema Type | Status | Notes |
|---|---|---|
| `WebSite` + `SearchAction` | ⚠️ | SearchAction URL won't resolve |
| `Organization` | ✅ | Good, add LinkedIn/Twitter |
| `SoftwareApplication` | ✅ | Strong implementation |
| `FAQPage` | ℹ️ | No Google rich results, but good for AI citations |

---

## AI Search Readiness (GEO)

| Signal | Status |
|---|---|
| llms.txt | ❌ Missing — high priority for an AI product |
| GPTBot allowed | ✅ |
| ClaudeBot allowed | ✅ |
| PerplexityBot allowed | ✅ |
| Google-Extended | ❌ Blocked |
| Structured data for AI citation | ✅ FAQPage, SoftwareApplication |
| Citable "about" content | ✅ About page exists |

---

## Prioritised Action Plan

| # | Action | Priority | Effort |
|---|---|---|---|
| 1 | Fix canonical on /about and /media-kit, update sitemap | **Critical** | 30 min |
| 2 | Add `/llms.txt` | **High** | 1 hour |
| 3 | Remove `Google-Extended: Disallow` from robots.txt | **High** | 5 min |
| 4 | Convert hero images to WebP, add width/height attributes | **High** | 2–4 hours |
| 5 | Start content marketing — 2 articles/month minimum | **High** | Ongoing |
| 6 | Remove `SearchAction` or implement real search | Medium | 1 hour |
| 7 | Change apex redirect 307 → 308 in vercel.json | Medium | 10 min |
| 8 | Add hreflang en-GB / en-US to homepage | Medium | 30 min |
| 9 | Add LinkedIn, Twitter/X to Organization sameAs | Low | 15 min |
| 10 | Remove meta keywords tag | Low | 5 min |
| 11 | Fix avatar alt text → empty string | Low | 5 min |
| 12 | Self-host or defer GSAP scripts | Low | 1 hour |

---

## Top 5 Quick Wins (< 1 hour total)

1. Fix `/about` and `/media-kit` canonicals + sitemap
2. Remove `Google-Extended: Disallow` — one line deletion
3. Add `llms.txt` — especially critical given native ChatGPT integration
4. Change `307` → `308` in Vercel config for apex redirect
5. Remove `SearchAction` from WebSite schema (or implement search)

---

## What to Monitor

- **Google Search Console** → Core Web Vitals + Index Coverage for `/about` and `/media-kit`
- **Perplexity / ChatGPT** → search "book golf tee times AI" — check if teemeup appears within 60 days of llms.txt being added
- **Organic traffic** → near-zero today; first content pieces should show impression data within 3–6 months

---

*Next steps: `/seo cluster "golf tee time booking"` for full keyword content architecture, `/seo geo https://teemeup.ai` for expanded AI search readiness.*

---
*Audited with agricidaniel/claude-seo v2.0.0 — https://github.com/AgriciDaniel/claude-seo*
