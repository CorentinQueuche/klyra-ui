# Klyra UI

Library de components Next.js pour le design system **KLYRA (rebrand 2026)**.

> 41 composants TypeScript strict, 100+ stories Storybook, basés sur la charte brand book 2026 — Bleus K1/K2/K3, Google Sans Flex, pill CTAs avec inner-glow signature.

## Documentation

| Doc | Quand la lire |
|-----|---------------|
| [`INTEGRATION.md`](./INTEGRATION.md) | **Démarrer une nouvelle app KLYRA** — installer `klyra-ui`, wirer tokens/fonts/Tailwind v4 dans une app Next.js. |
| [`COMPONENTS.md`](./COMPONENTS.md) | **Catalogue complet** — 41 composants avec props, variants, exemples d'usage. |
| [`CONVENTIONS.md`](./CONVENTIONS.md) | Règles obligatoires pour écrire ou modifier un composant de la lib. |

## Quickstart

```bash
pnpm install
pnpm storybook          # Storybook sur http://localhost:6006
pnpm dev                # Page index Next.js sur http://localhost:3000 (playground)
pnpm build              # Production build Next.js
pnpm storybook:build    # Build statique Storybook dans /storybook-static
```

## Structure

```
designsystem/
├── src/
│   ├── app/                           # Next.js App Router — page index + globals
│   │   ├── globals.css                # Tokens via @theme inline (Tailwind v4)
│   │   ├── layout.tsx
│   │   └── page.tsx                   # Index de la library
│   ├── components/
│   │   ├── primitives/                # 27 composants primitifs
│   │   │   ├── Arrow/                 # Chevron + glyph motif
│   │   │   ├── Avatar/                # Initials gradient + image + Group
│   │   │   ├── Badge/                 # 12 variants + dot
│   │   │   ├── Breadcrumb/
│   │   │   ├── Button/                # 5 variants × 4 sizes × tones light/dark
│   │   │   ├── Card/                  # 6 variants + composable sub-parts
│   │   │   ├── Checkbox/              # Checked / indeterminate
│   │   │   ├── Divider/               # Hairline 1px
│   │   │   ├── EmptyState/
│   │   │   ├── Field/                 # Wrapper label + help + error
│   │   │   ├── GlassCard/             # Signature glass panel
│   │   │   ├── Halo/                  # Halos radiaux K1/K2
│   │   │   ├── IconButton/
│   │   │   ├── Input/                 # 3 variants × 3 sizes × tones
│   │   │   ├── Kbd/
│   │   │   ├── Logo/                  # 5 lockups
│   │   │   ├── PixelMotif/            # Canvas 4×4 pixels
│   │   │   ├── Radio/                 # Radio + RadioGroup
│   │   │   ├── Select/
│   │   │   ├── Spinner/
│   │   │   ├── StatCard/              # Sparkline + delta + trend
│   │   │   ├── Table/                 # Composable + StatusPill
│   │   │   ├── Tabs/                  # Segmented pill
│   │   │   ├── Tag/                   # Removable chips
│   │   │   ├── Textarea/
│   │   │   ├── Toggle/                # Switch pill
│   │   │   └── Typography/            # 14 variants (Display / H / Body / Eyebrow / Mono)
│   │   ├── layout/                    # 4 composants layout
│   │   │   ├── Container/             # Brand gutter 52 px
│   │   │   ├── Grid/
│   │   │   ├── Section/               # Variants + halos
│   │   │   └── Stack/
│   │   └── composed/                  # 10 composés prêts à l'emploi
│   │       ├── marketing/
│   │       │   ├── Nav/
│   │       │   ├── Hero/              # Halos + balanced h1
│   │       │   ├── ServicesGrid/
│   │       │   ├── ProofMetrics/
│   │       │   ├── CaseStudyBlock/    # Split dashboard + 3 cases
│   │       │   └── CtaFooter/
│   │       ├── webapp/
│   │       │   ├── Sidebar/           # Tenant card + footer CTA
│   │       │   ├── TopBar/            # Search ⌘K + actions
│   │       │   └── DashboardShell/    # Stats + chart + tasks + table
│   │       └── editorial/
│   │           └── LinkedInPost/      # Dark / blue / light
│   ├── lib/
│   │   ├── cn.ts                      # clsx + tailwind-merge
│   │   └── tokens.ts                  # Tokens TS (mirror de globals.css)
│   └── storybook/mocks/               # Mocks next/link + next/image pour Vite
├── .storybook/                        # Storybook 8.6 (React + Vite)
├── public/logos/                      # 5 lockups + favicon
├── CONVENTIONS.md                     # Conventions obligatoires
└── package.json
```

## Tokens (extrait — voir `src/app/globals.css` et `src/lib/tokens.ts`)

### Couleurs
- **Bleus KLYRA** : `#003FE4` (K1 — dominant), `#01A4FF` (K2 — CTA), `#00DDFF` (K3 — accent max)
- **Neutres** : `#000` / `#202020` ink / `#E0E0E0` gris K1 / `#FFF`
- **Dérivés** : `#002DA4` blue-deep, `#E5EEFF` blue-bg

### Gradients (seuls 4 autorisés brand book)
- `--grad-deep` : noir ← K1
- `--grad-bright` : K1 → K2
- `--grad-ink` : noir → ink
- `--grad-paper` : gris K1 → blanc

### Typographie
Google Sans Flex (substitué par Google Sans via Google Fonts).
Tracking : `-5%` display, `-3.25%` titres, `-1.25%` body.
Leading : `92.5%` display, `90%` titres, `140%` body.

### Radii
xs 4, sm 8, md 12, lg 20, xl 28, **pill 999** (CTAs — signature).

### Shadows signature
Inner-glow CTA (jamais drop-shadow gris) :
```
inset 8px -5px 41px rgba(1,164,255,0.25),
inset -12px 8px 33px rgba(1,164,255,0.10),
0 10px 30px rgba(0,63,228,0.35)
```

## Usage

```tsx
import {
  Button, Card, StatCard, Typography, Halo, PixelMotif,
  // layout
  Container, Grid, Section,
  // composed
  Marketing, Webapp, Editorial,
} from "@/components";

export default function Page() {
  return (
    <Section background="deep" halos padding="spacious">
      <Container size="lg">
        <Typography variant="display-l" balance>
          Nous créons les outils digitaux qui font grandir votre entreprise.
        </Typography>
        <Button variant="primary" size="xl">Prendre rendez-vous</Button>
      </Container>
    </Section>
  );
}
```

## Règles brand (résumé — voir [`CONVENTIONS.md`](./CONVENTIONS.md))

- Copy toujours **sentence case**, jamais ALL CAPS, jamais Title Case.
- **Pas d'emoji** sur aucune surface UI.
- **Tu** sur réseaux sociaux, **vous** sur supports formels (website, propales).
- **Pas de hashtag** dans les posts LinkedIn.
- Apostrophe typographique `'` (U+2019).
- Tiret long `—` pour séparer label/contexte. Flèches `→` comme motif typographique.
- Seuls les 3 bleus + neutres (pas de rogue couleurs).
- Pas de drop-shadow gris (shadows bleutées uniquement).
- Pas de bordure-gauche colorée sur cards (interdit brand book).
- Sur fond bleu : pas de logo blanc (contraste < 60%).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5 strict
- Tailwind CSS v4 (tokens via `@theme inline`)
- Storybook 8.6 (`@storybook/react-vite` — `@storybook/nextjs` n'est pas compatible avec Next.js 16)
- `class-variance-authority` pour les variants × sizes
- `clsx` + `tailwind-merge` via `@/lib/cn`
- pnpm

## Source

- Figma Brand Guidelines 2026 (41 pages) + Figma KLYRA Éditorial
- Skill `klyra-design` dans ce repo (`../.claude/skills/klyra-design/`)
- Conventions KLYRA — `../CLAUDE.md` + `../.claude/rules/brand-voice.md`

---

Klyra Design — 2026
