# KLYRA — Design System

> **Klyra est un studio digital fondé par Corentin Queuche, spécialisé en webdesign, branding et développement.** L'agence accompagne les PME dans la création de solutions sur mesure — identités visuelles, sites web, landing pages, maintenance — avec une approche orientée métier : *« la technologie s'adapte au métier, jamais l'inverse »*.

This design system recreates KLYRA's rebrand 2026 guidelines so design agents can produce on-brand marketing pages, LinkedIn editorial, decks, webapp mockups and client deliverables. Both French (default) and French-first bilingual usage are supported.

---

## Sources used to build this system

| Source | What it gave us |
| --- | --- |
| Figma — **KLYRA Brand Guidelines** (41 pages) | The canonical Brand Book 2026. Structure: Marque · Logo · Couleurs · Typographie · Arrière-plans · Univers illustratif · Mise en page · LinkedIn. |
| Figma — **KLYRA Éditorial** (LinkedIn / Newsletter / Labs) | Live editorial social posts using the brand language — sets the tone + motifs. |
| Uploaded logos | `Logo_DARK_KLYRA.svg`, `Logo_White_KLYRA.svg`, `LogoKlyra.svg`, `Logotype_Blanc_KLYRA.png`, `Favicon_KLYRA.png`. |
| Uploaded fonts | Google Sans Flex 24pt (Thin → Black). **NOTE: the uploaded files are macOS resource-fork siblings (`._…`), not usable TTFs.** We're loading the public **Google Sans** via Google Fonts as a near-pixel-equivalent fallback. See _Caveats_ below. |

The Figma files are not publicly linked; they were mounted read-only during the build of this system and are listed here only as a record.

---

## Products represented

Klyra is one agency making things across three surfaces. The UI kits mirror that structure:

1. **Marketing site** (Next.js + Tailwind, public). Hero-forward, big display type on black/blue, halo backgrounds, pill CTAs with inner-blue glow.
2. **Client webapp chrome** (illustrative — "outils métier sur mesure"). A dashboard shell showing the brand in product form: sidebar navigation, stat cards, blue-accented tables.
3. **Editorial / LinkedIn** social post formats — square + portrait — in both Dark Mode and Blue Mode.

---

## CONTENT FUNDAMENTALS

Copy is **French**, direct, expert and warm. Klyra uses the **second-person singular (tu)** on social (*"Nous créons les outils digitaux pour booster **ta** croissance"*) and the **second-person plural (vous)** on the website and formal deliverables (*"Nous accompagnons **vos** équipes…"*). The brand book states this explicitly: *« Le tutoiement est utilisé sur les réseaux sociaux, il renforce une relation accessible. Le vouvoiement est réservé aux supports plus formels (website). »*

### Tone in three words
**Expert · Proche · Pédagogique.** — from the brand book: *« langage direct, honnête, technique mais pédagogique »*.

### Voice rules

- **"Nous"** for the studio, never a generic "Klyra Team". The founder is named (Corentin Queuche) when relevant.
- **Affirmative and specific.** Prefer *« Nous concevons »* over *« On peut concevoir »*. No hedging.
- **Numbers and outcomes are always concrete.** "+20 entreprises nous font confiance", "9 635 abonnés", "50%", "8 547 €". Never rounded vanity figures.
- **Sentence case**, always. Proper nouns aside, titles, buttons, eyebrows and section markers are sentence case — **never ALL CAPS**, never Title Case Every Word.
- **No emoji** anywhere in brand surfaces. Not in headlines, not in captions, not in UI. (The editorial set confirms: custom iconography + pixel motifs only.)
- **Ampersand (&)** is used deliberately in taglines — *"Stratégie & identité de marque"*, *"Branding & Webdesign"*. Not "and", not "et" when a brand-stamp feel is wanted.
- **Long-dash (—)** separates a label from its context: *"Brand Guidelines — Couleurs"*, *"Klyra Design — 2026"*.
- **Arrows (→)** are a motif, not emoji: *"Bleu K1 → Bleu K2"*, *"Le web n'attend pas. Vous non plus."*

### Signature phrases (use verbatim where appropriate)

| Usage | Phrase |
| --- | --- |
| Social hero | "Nous créons les **outils digitaux** pour booster **ta croissance**" |
| Website hero | "Nous créons les outils digitaux qui font grandir votre entreprise" |
| Sub-promise | "Des outils aussi performants que ceux des grandes entreprises — sans la complexité, le coût ou les délais." |
| Signature | "Klyra Design" (never "Klyra Inc", "Klyra Studio" in text — that's marketing language only) |
| Closing mention | "Stratégie & identité de marque — Tous droits réservés" |

### What NOT to write

- No tech jargon without a French equivalent. "Next.js" ok in technical context, but "stack", "pipeline", "framework" → avoid in marketing copy.
- No clichés. Banned: *"révolutionnaire"*, *"disruptif"*, *"game-changer"*, *"next-gen"*.
- No apostrophe-smart-quote mixing. Use `'` (U+2019), never `'`.
- No hashtags on editorial (the LinkedIn posts keep them out of post bodies).

---

## VISUAL FOUNDATIONS

### Palette
Three blues, a stack of neutrals, no accent colors outside of it. The brand is **monochromatic-blue by design**.

| Token | Hex | Role |
| --- | --- | --- |
| `--klyra-blue-k1` | `#003FE4` | Dominant brand blue. Carries the identity. |
| `--klyra-blue-k2` | `#01A4FF` | Lighter blue. Dynamism, shoutier surfaces. |
| `--klyra-blue-k3` | `#00DDFF` | Highest-contrast blue. Mise-en-avant only. |
| `--klyra-black` | `#000000` | Noir. Dominant dark surface. |
| `--klyra-ink` | `#202020` | Body text on light, near-black dark panels. |
| `--klyra-gray-k1` | `#E0E0E0` | Gris K1. Quiet neutral. |
| `--klyra-gray-k2` | `#DEDEE9` | Cool gray, rarely used. |
| `--klyra-white` | `#FFFFFF` | Blanc. |

Brand-sanctioned gradients (only these):

- **Noir ← Bleu K1** `#003FE4 → #000000` — hero backgrounds
- **Bleu K1 → Bleu K2** `#003FE4 → #01A4FF` — accent surfaces, CTAs
- **Noir → Gris K1** `#000000 → #202020` — dark editorial panels
- **Gris K2 → Blanc** `#E0E0E0 → #FFFFFF` — light paper

### Typography
**Google Sans Flex 24pt** across the whole identity (Regular / Medium / SemiBold / Bold; Light + Black reserved for display). Substituted via Google Fonts' **Google Sans** family (public equivalent) — see _Caveats_.

Scale rules (pulled from BG p.21):
- **Display**: `-5%` letter-spacing · `92.5%` line-height
- **Titre**: `-3.25%` letter-spacing · `90%` line-height · Medium weight
- **Paragraphe**: `-1.25%` letter-spacing · `140%` line-height
- **Mentions / small**: `0%` letter-spacing · `100%` line-height

Headlines are big, tight and sentence-case. Body copy is 16–22 px, loose leading, never all caps.

### Backgrounds
- **Full-bleed dark.** Black or `#003FE4` as entire-surface, then layer huge radial halos (blue K1 @ 75%, K2 @ 75%) off-canvas — a signature Klyra move.
- **Pixel mosaic.** Tiny colored squares (`4×4px` at `1920` canvas) scattered across hero backgrounds — the "pixel" motif tying back to the K-mark. Used subtly, at 25–50% opacity.
- **Halo diffusion.** Round 50%/50% radial gradients, 500–2700 px diameter, positioned off-screen for bloom.
- **No stock photography** in core brand surfaces (LinkedIn avatar aside). Illustrations are vector and blue.

### Iconography
See `ICONOGRAPHY.md` below in dedicated section. Short version: custom minimal stroke icons (1.5–2 px) in Bleu K1 or white; pixel motif as a graphic device, not an icon. **No emoji. No unicode dingbats.**

### Animation
The brand book does not prescribe motion, but the editorial vocabulary implies:
- **Fades + slight Y-lifts** (6–10 px, 220–480 ms, standard ease).
- **No bouncy overshoot.** Klyra's voice is "expert / confidence", so spring physics would undercut the tone.
- **Halos drift slowly** — a subtle 20–30 s background drift is on-brand for heroes.
- **Hover on CTAs**: inner-glow intensifies; background saturates toward Bleu K2.

### Hover / press states
- **Buttons (primary):** hover = glow intensifies (shadow K2 25→40%), background shifts K1 → K1+K2 gradient. Press = scale `0.98`.
- **Buttons (secondary/ghost):** hover = fg `#202020 → #003FE4`. Press = background `rgba(0,63,228,0.08)`.
- **Links / underline-pills:** hover = underline thickens from 1 px to 2 px, same color.
- **Card hover:** `translateY(-2px)`, shadow-md → shadow-lg, `transition-duration: 220 ms`.

### Borders
- **Hairlines (1 px)** separate columns and rows on brand-book pages (`#000` on light, `#FFF` on dark). This is a distinctive KLYRA device — we preserve it in slide/UI kit layouts.
- **Radius**: buttons and CTAs are **heavily rounded pills** (`999 px` / ~150 px for the showcase CTA). Cards: `12–20 px`. Inputs: `8–12 px`.

### Shadow system
Klyra favors **inner shadows** (gloss) over drop shadows. The signature CTA shadow is:

```
box-shadow:
  inset 8.254px -4.952px 41.269px 0px rgba(1,164,255,0.25),
  inset -11.555px 8.254px 33.015px 0px rgba(1,164,255,0.10);
```

External drop shadows are soft, offset, blue-tinted (`rgba(0,45,164,0.28)`) — never gray or black.

### Transparency & blur
Common. Blue K1 gets used at `75%`, `50%`, `25%`. White at `75%`, `50%`, `35%`, `25%`. Glass panels use `backdrop-filter: blur(22px)` + `rgba(0,63,228,0.125)` over dark.

### Imagery treatment
- **Cool, slightly desaturated.** The hero photography (Corentin's LinkedIn avatar) sits on dark backgrounds without warm-tone color-casting.
- **No grain**, no heavy filters. Clean, crisp, digital.
- **Blue overlay multiply** for masked hero imagery.

### Cards
- Soft radius (`12–20 px`), subtle blue shadow, 1 px tinted border on light, no border on dark.
- Content padding: `24–32 px`.
- On dark surfaces, cards use glass style (translucent + blur + inner blue glow).

### Layout rules
- Brand-book frames are **1920×1080** with a **52 px** outer margin (= `--sp-13`). We preserve this as the signature gutter.
- Column grid is **12-col** on the marketing site, **6-col** for editorial portrait posts (LinkedIn 1080×1350).
- Fixed elements: top-left logo (`52 px` inset), top-right section marker (eg `1.1`, `2.3`), bottom-left eyebrow, bottom-right "Klyra Design" signature, separated by 1 px hairlines.

### Motifs
1. **Pixel-K.** The core logo mark is built from pixels. A pixel-square grid appears as a texture in backgrounds.
2. **Half-arrow (cross / +).** The "K" geometry decomposes into a chevron — used as a decorative break between sections.
3. **Radial halos.** Two overlapping circles of `rgba(0,63,228,0.75)` + `rgba(1,164,255,0.75)`, one top-right, one bottom-left.
4. **Numeric overlays.** Large page-numbers (`01`, `1.1`) at 35% white, 60 px — quiet meta-navigation.

---

## ICONOGRAPHY

Klyra does **not** use a system icon font. The Figma file uses custom SVG elements drawn at the specific size they appear (chevrons, arrows, plus signs, the K-mark itself). There is no inherited Material / Phosphor / Lucide look.

**Our approach for this design system:**
1. **Primary — Lucide icons** (CDN). Lucide's 1.5 px stroke, squared terminals and geometric geometry match Klyra's drawn iconography best. CDN: `https://unpkg.com/lucide@latest`. **This is a substitution** — flag it to the user if icon-perfect fidelity matters.
2. **Secondary — pixel motif.** For accent, use the pixel-square texture (rendered via CSS) rather than an icon.
3. **The K-mark is an icon.** `assets/logos/klyra-logo-dark.svg` and `klyra-logo-white.svg` carry the signature; use `favicon.png` for small badges.

**Emoji** — never, in any surface. **Unicode arrows** — `→`, `↗`, `—` are OK as typographic devices (they are used explicitly in the brand book).

**Logo lockups**
- `klyra-logo.svg` / `klyra-logo-dark.svg` — signe + wordmark, on light.
- `klyra-logo-white.svg` — reversed for dark.
- `klyra-logotype-white.png` — wordmark only, reversed.
- `favicon.png` — rounded-square icon variant, `21 px` radius.

**Forbidden combinations** (from BG p.17): white logo on blue, blue logo on black, white on white, etc. The book shows 9 forbidden pairings. In short: **the K-mark must always contrast by at least 60 %** against its background.

---

## Index (what's in this folder)

| Path | What it is |
| --- | --- |
| `README.md` | This file. |
| `SKILL.md` | Skill manifest for Claude Code / Agent Skills compat. |
| `colors_and_type.css` | Every color / gradient / type token as CSS variables + utility classes. |
| `assets/logos/` | SVG + PNG brand marks. |
| `assets/brand/` | LinkedIn editorial reference (profile, cover, posts grid). |
| `preview/` | Small HTML cards rendered in the Design System tab. |
| `ui_kits/marketing/` | Marketing site recreation (hero, nav, CTAs, feature grid, footer). |
| `ui_kits/webapp/` | Client webapp shell (sidebar, dashboard, data table, pill buttons). |
| `ui_kits/editorial/` | LinkedIn post templates (portrait, square, dark + blue modes). |

---

## Caveats

1. **Fonts — still blocked.** Two attempts now: both uploads were macOS AppleDouble sidecars (`._Google…ttf`, 182 bytes, `Mac ` header) — these are resource-fork metadata, **not the real font bytes**. We remain on Google Fonts' **Google Sans** (near-metric match) via `@import`. **To fix:** zip `GoogleSansFlex_24pt-*.ttf` on macOS via *right-click → Compress* (this strips the `._` siblings) and re-upload, or send the files from a non-macOS machine. Once real TTFs land in `fonts/`, swap the `@import` in `colors_and_type.css` for `@font-face` blocks pointing at them.
2. **Iconography is substituted** (Lucide) — see ICONOGRAPHY above.
3. **Webapp UI kit is illustrative.** Klyra builds bespoke webapps per client; there's no public "Klyra product" UI. We inferred chrome from the LinkedIn post mockups (ch. 2.6 *Illustrations + Interfaces*) which depict charts / stat cards on blue.
4. **Illustrations** — only 3 hero images from the brand book were extractable (LinkedIn profile, cover, posts grid). Additional editorial photography (agency shots, case-study frames) is not included.
5. No actual **codebase** was provided for the marketing site or webapp; kits are built from the Figma brand book only.

---

## Quick sanity checklist before shipping anything KLYRA

- [ ] French, not English. `tu` on social, `vous` everywhere else.
- [ ] Google Sans / Google Sans Flex, sentence case, tight tracking on display sizes.
- [ ] Only Bleu K1 / K2 / K3 / neutrals — no rogue hues.
- [ ] Blue halos on hero / dark backgrounds.
- [ ] Pill CTAs with inner K2 glow.
- [ ] 52 px outer margin on full-bleed compositions.
- [ ] No emoji, no stock, no purple-blue gradients, no colored-left-border cards.
- [ ] Signature line at bottom: `Klyra Design` or `Stratégie & identité de marque — Tous droits réservés`.
