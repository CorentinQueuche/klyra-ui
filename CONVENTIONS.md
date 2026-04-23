# Klyra UI — Conventions d'implémentation

**CE FICHIER EST LA RÉFÉRENCE POUR TOUS LES AGENTS QUI ÉCRIVENT DES COMPOSANTS.**

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 (tokens via `@theme inline` dans `src/app/globals.css`)
- Storybook 8.6 (`@storybook/react-vite`) — stories dans `*.stories.tsx`
- `class-variance-authority` pour les variants
- `clsx` + `tailwind-merge` via `@/lib/cn`

## Arborescence par composant

Chaque composant vit dans son propre dossier :
```
src/components/primitives/Button/
├── Button.tsx           # Export nommé (pas default)
├── Button.stories.tsx   # Stories exhaustives
└── index.ts             # Re-export: export * from "./Button";
```

## Règles d'API des composants

1. **Export nommé**, pas `default`. `export function Button(...)` / `export const buttonVariants = cva(...)`.
2. **Props** : interface `XProps` exportée. `extends HTMLAttributes<HTMLXElement>` quand c'est un wrapper direct.
3. **Forward refs** pour tout composant qui wrappe un élément natif interactif (button, input, a).
4. **className** : toujours accepter + merger via `cn(...)`.
5. **Variants** : utiliser `class-variance-authority` (`cva`). Exporter les `variants` types (`VariantProps<typeof xVariants>`).
6. **Pas d'emoji** nulle part. Pas de texte ALL CAPS. Sentence case toujours.
7. **Couleurs** : utiliser les tokens via CSS vars (`var(--color-k1)`) ou classes Tailwind (`bg-k1`, `text-ink`). **Pas de hex en dur** sauf pour gradients complexes.
8. **Radii** : `rounded-[999px]` pour pills, `rounded-[20px]` pour cards, `rounded-[12px]` pour inputs.
9. **Letter-spacing** : `-0.05em` display, `-0.0325em` titres, `-0.0125em` body.
10. **Shadow** : jamais de drop-shadow gris — utiliser les `--shadow-*` tokens (bleutés).
11. **Tu/vous** : copy de démo en stories = `vous` (supports formels). Réseaux sociaux = `tu`.

## Design tokens (extrait — voir `globals.css` pour tout)

### Couleurs
- **Bleus** : `k1` #003FE4 (dominant), `k2` #01A4FF (CTAs), `k3` #00DDFF (accent max)
- **Neutres** : `black` #000, `ink` #202020, `gray-k1` #E0E0E0, `white` #FFF, `paper` #FAFAFB
- **Bleus dérivés** : `blue-deep` #002DA4, `blue-bg` #E5EEFF

### Gradients (seuls 4 autorisés)
- `--grad-deep` : noir ← K1
- `--grad-bright` : K1 → K2
- `--grad-ink` : noir → ink
- `--grad-paper` : gris K1 → blanc
- `--grad-cta` : K1 → K1/25% (fond CTA pill)

### Shadows
- `--shadow-sm` / `--shadow-md` / `--shadow-lg` : teintées bleu (rgba(0,45,164,x))
- `--shadow-cta` : **signature** — inner-glow K2 25% + 10%, outer K1 35%
- `--shadow-cta-hover` : inner-glow intensifié
- `--shadow-glass` : inner-glow K1 25% pour panneaux verre

### Radii
- xs 4, sm 8, md 12, lg 20, xl 28, **pill 999** (CTAs)

### Typography
Utiliser `<Typography variant="...">` de `@/components/primitives/Typography` ou les raccourcis `<H1>`, `<Body>`, `<Eyebrow>`, etc.

### Motion
- ease : `cubic-bezier(0.22, 0.61, 0.36, 1)` standard · `cubic-bezier(0.2, 0.8, 0.2, 1)` emphatique
- durées : 120ms fast, 220ms med, 480ms slow
- pas de spring / bounce. Halos drift lent 20-30s OK.

## Pattern story (template)

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { X } from "./X";

const meta: Meta<typeof X> = {
  title: "Primitives/X",
  component: X,
  tags: ["autodocs"],
  argTypes: { /* ... */ },
  args: { /* defaults */ },
  parameters: {
    docs: { description: { component: "Courte description en français." } },
  },
};
export default meta;
type Story = StoryObj<typeof X>;

// 1 story par variant + 1 "AllVariants" grid + 1 story par state (hover/disabled/loading) + 1 "InContext"
export const Default: Story = {};
export const AllVariants: Story = { render: () => <Grid /> };
export const States: Story = { render: () => <StatesRow /> };
export const OnDark: Story = { parameters: { backgrounds: { default: "black" } }, render: () => ... };
```

**Toute variant doit avoir sa propre story nommée.** Par exemple pour Button : `Primary`, `Secondary`, `Ghost`, `Link`, `White`, `OnDark`, `WithIcon`, `Loading`, `Disabled`, `Sizes`, `AllVariants`.

## Backgrounds Storybook disponibles
`white` · `paper` · `gray` · `ink` · `black` · `k1` · `deep` (gradient) · `bright` (gradient).

## Viewports Storybook disponibles
`mobile` 375 · `tablet` 768 · `desktop` 1280 · `wide` 1920 · `linkedinPortrait` 1080×1350 · `linkedinSquare` 1080×1080.

## Copy de démo

Phrases verbatim autorisées (brand book) — à utiliser de préférence :
- "Nous créons les outils digitaux qui font grandir votre entreprise." (web)
- "Nous créons les outils digitaux pour booster ta croissance." (social)
- "Des outils aussi performants que ceux des grandes entreprises — sans la complexité, le coût ou les délais."
- "+20 entreprises nous font confiance"
- "9 635 abonnés", "8 547 €", "4.9", "47 projets livrés"
- "Stratégie & identité de marque — Tous droits réservés"
- "Klyra Design — 2026"
- CTAs : "Prendre rendez-vous", "Voir nos réalisations", "En savoir plus", "Consulter les créneaux"

## À PROSCRIRE
- emoji (UI, copy, stories)
- drop-shadow gris (utiliser shadows bleutées)
- Title Case Every Word / ALL CAPS (sauf `eyebrow` optionnellement)
- couleurs hors palette (rogue purples, reds, etc. — sauf status color sémantique dans tables)
- bordure-gauche colorée sur cards (interdit brand book)
- hashtags dans copy LinkedIn
