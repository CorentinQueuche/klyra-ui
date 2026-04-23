# Intégrer `klyra-ui` dans une app

> Pour démarrer une nouvelle app KLYRA en partant d'un template prêt-à-l'emploi : voir [`templates/app-starter-minimal/`](../../templates/app-starter-minimal/) — il a déjà tout le wiring décrit ci-dessous.

Ce guide s'adresse à une app **Next.js 16 (App Router) + React 19 + Tailwind CSS v4** qui veut consommer le design system KLYRA. Stack obligatoire — la lib n'est pas testée hors de ce périmètre.

## 1 — Ajouter la dépendance workspace

Ton app doit vivre dans le monorepo (`apps/*`, `packages/*`, ou racine). Dans son `package.json` :

```json
{
  "dependencies": {
    "klyra-ui": "workspace:*"
  }
}
```

Puis depuis la racine du repo :

```bash
pnpm install
```

`pnpm` créera le symlink `node_modules/klyra-ui` → `packages/ui`.

## 2 — Importer les tokens dans `globals.css`

Dans `src/app/globals.css` :

```css
@import "tailwindcss";
@import "klyra-ui/styles/tokens.css";

/* (optionnel) self-host les fonts — voir étape 3 */
@import "klyra-ui/styles/fonts.css";
```

`tokens.css` injecte tous les tokens KLYRA (couleurs k1/k2/k3, ink, paper, gradients, radii, shadows, motion, typography) via `@theme inline`. Tailwind v4 les expose automatiquement comme classes utilitaires : `bg-k1`, `text-ink`, `rounded-pill`, `shadow-cta`, etc.

## 3 — Fonts (deux options)

### Option A — Google Sans CDN (rapide, fallback brand-approved)

Ajoute dans `src/app/layout.tsx` :

```tsx
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
/>
```

Le brand book autorise « Google Sans » comme substitut à « Google Sans Flex » quand le self-hosting n'est pas possible.

### Option B — Google Sans Flex self-hosted (brand-fidèle)

Copier les TTF de `packages/ui/public/fonts/` vers `<ton-app>/public/fonts/` :

```bash
# depuis la racine de ton app
mkdir -p public/fonts
cp ../../packages/ui/public/fonts/* public/fonts/
```

Le `@import "klyra-ui/styles/fonts.css"` dans `globals.css` chargera alors les neuf graisses de Google Sans Flex 24pt depuis `/fonts/`.

> Pour un postinstall automatique, tu peux ajouter dans `package.json` :
> ```json
> "scripts": { "postinstall": "node ../../templates/scripts/sync-fonts.mjs" }
> ```

## 4 — Configurer Tailwind v4

`postcss.config.mjs` :

```js
const config = { plugins: { '@tailwindcss/postcss': {} } };
export default config;
```

C'est tout. Pas de `tailwind.config.ts` — Tailwind v4 lit la config depuis `@theme inline` dans `globals.css`.

Pour que Tailwind scanne le code source de `klyra-ui` (afin de garder ses classes utilitaires dans le CSS final), ajoute dans `globals.css` :

```css
@source "../../packages/ui/src";
```

(Ajuste le chemin relatif depuis ton fichier `globals.css`.)

## 5 — Importer les composants

```tsx
import { Button, Card, Typography, Container, Section } from "klyra-ui";
import { cn } from "klyra-ui";
import { Marketing, Webapp, Editorial } from "klyra-ui";

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

Catégories disponibles :

- **Primitives** (27) — `Button`, `Card`, `Input`, `Badge`, `Avatar`, `Logo`, `Halo`, `PixelMotif`, `Typography`, `Tabs`, `Toggle`, etc.
- **Layout** (4) — `Container` (gutter 52px), `Grid`, `Section` (avec halos), `Stack`.
- **Composés** — `Marketing.Nav`, `Marketing.Hero`, `Marketing.CtaFooter`, `Webapp.Sidebar`, `Webapp.TopBar`, `Webapp.DashboardShell`, `Editorial.LinkedInPost`.

Liste complète et stories : `pnpm --filter klyra-ui storybook` (port 6006).

## 6 — Conventions à respecter

Voir [`CONVENTIONS.md`](./CONVENTIONS.md). Résumé :

- **Pas d'emoji**. **Pas de hashtag** sur LinkedIn. **Sentence case** toujours.
- **Tu** sur réseaux sociaux, **vous** sur supports formels.
- Couleurs : seulement la palette tokens (k1, k2, k3, neutres). Pas de hex en dur.
- Border-radius : `rounded-pill` (CTAs), `rounded-[20px]` (cards), `rounded-[12px]` (inputs).
- Shadow : utiliser les tokens `shadow-cta`, `shadow-glass`. Pas de drop-shadow gris.

## 7 — Storybook (optionnel)

Si ton app veut son propre Storybook (pour ses composants spécifiques), réutilise la config de `packages/ui/.storybook/` comme base. Sinon, le Storybook commun de la lib (`pnpm ui:dev` à la racine) suffit pour explorer les composants partagés.

## Checklist intégration

- [ ] `klyra-ui` ajouté en `dependencies` (workspace:*)
- [ ] `pnpm install` lancé depuis la racine du monorepo
- [ ] `globals.css` importe `tokens.css`
- [ ] Fonts wired (option A ou B)
- [ ] `@source` pointe vers `packages/ui/src` dans `globals.css`
- [ ] Premier composant `<Button>` rendu sans erreur
- [ ] `next build` passe

## Problèmes courants

| Symptôme | Cause | Fix |
|----------|-------|-----|
| `Cannot find module 'klyra-ui'` | pnpm pas relancé après ajout dep | `pnpm install` à la racine |
| Classes `bg-k1` invisibles | tokens.css pas importé | Ajouter `@import "klyra-ui/styles/tokens.css"` |
| Composants stylés mais classes purgées | `@source` manque | Ajouter `@source "../../packages/ui/src"` |
| Fonts génériques au lieu de Google Sans | Step 3 oublié | Voir options A ou B |
| Erreur Storybook `next/config` | `@storybook/nextjs` au lieu de `@storybook/react-vite` | Migrer vers Vite (incompatible Next 16) |
