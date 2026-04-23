# Composants `klyra-ui` — catalogue complet

> **Setup d'abord** : voir [`INTEGRATION.md`](./INTEGRATION.md) pour câbler le package dans une nouvelle app.
> **Conventions** : voir [`CONVENTIONS.md`](./CONVENTIONS.md).
> **Stories interactives** : `pnpm ui:dev` à la racine du monorepo (Storybook port 6006).

Tout s'importe depuis `klyra-ui` :

```tsx
import { Button, Card, Typography, Container, Section, Stack, cn } from "klyra-ui";
import { Marketing, Webapp, Editorial } from "klyra-ui";
```

41 composants au total : 28 primitives, 4 layout, 9 composés (Marketing, Webapp, Editorial).

---

## Sommaire

- [Tokens & helpers](#tokens--helpers)
- [Typography](#typography)
- [Layout (4)](#layout)
  - [Section](#section) · [Container](#container) · [Grid](#grid) · [Stack](#stack)
- [Primitives — Action (4)](#primitives--action)
  - [Button](#button) · [IconButton](#iconbutton) · [Toggle](#toggle) · [Tabs](#tabs)
- [Primitives — Forms (8)](#primitives--forms)
  - [Field](#field) · [Input](#input) · [Textarea](#textarea) · [Select](#select) · [Checkbox](#checkbox) · [Radio / RadioGroup](#radio) · [Tag](#tag) · [Kbd](#kbd)
- [Primitives — Display (8)](#primitives--display)
  - [Card](#card) · [GlassCard](#glasscard) · [StatCard](#statcard) · [Table](#table) · [Badge](#badge) · [Avatar / AvatarGroup](#avatar) · [Breadcrumb](#breadcrumb) · [EmptyState](#emptystate)
- [Primitives — Feedback (2)](#primitives--feedback)
  - [Spinner](#spinner) · [Popover](#popover)
- [Primitives — Brand & motifs (5)](#primitives--brand--motifs)
  - [Logo](#logo) · [Halo](#halo) · [PixelMotif](#pixelmotif) · [Arrow](#arrow) · [Divider](#divider)
- [Composés Marketing (6)](#composés-marketing)
- [Composés Webapp (4)](#composés-webapp)
- [Composés Éditorial (1)](#composés-éditorial)
- [Patterns d'usage](#patterns-dusage)

---

## Tokens & helpers

```tsx
import { cn } from "klyra-ui";

<div className={cn("flex", isActive && "bg-k1")}>
```

Tokens directement utilisables comme classes Tailwind : `bg-k1`, `bg-k2`, `bg-k3`, `bg-ink`, `bg-paper`, `text-ink`, `text-fg-2`, `border-border-1`, `rounded-pill`, `rounded-xl`, `shadow-cta`, `shadow-glass`, etc.

Tokens CSS bruts via `var(--color-k1)`, `var(--color-blue-deep)`, `var(--shadow-cta)`, `var(--font-sans)`, `var(--tracking-display)`, etc. Voir `packages/ui/src/styles/tokens.css` pour la liste complète.

---

## Typography

14 variants couvrant toute la hiérarchie. Sentence case toujours.

```tsx
import { Typography } from "klyra-ui";

<Typography variant="display-l" balance>
  Nous créons les outils digitaux.
</Typography>
```

| Variant | Usage | Tag par défaut |
|---------|-------|----------------|
| `display-xl` | Hero gigantesque (160px) | `h1` |
| `display-l` | Hero standard (105px) | `h1` |
| `display-m` | Hero compact (70px) | `h1` |
| `display-s` | Section intro (60px) | `h2` |
| `h1` (48) · `h2` (40) · `h3` (28) · `h4` (24) | Titres standards | `h1`–`h4` |
| `body-l` (22) · `body` (18) · `body-s` (16) | Paragraphes | `p` |
| `caption` (14) · `eyebrow` (13, mono) · `micro` (12) | Petits libellés | `span` |

**Props** : `variant`, `as` (override tag), `balance` (text-wrap), `style`, `className`, `children`.

**Helpers** disponibles (zero-prop) : `<DisplayXL>`, `<DisplayL>`, `<DisplayM>`, `<DisplayS>`, `<H1>`, `<H2>`, `<H3>`, `<H4>`, `<BodyL>`, `<Body>`, `<BodyS>`, `<Caption>`, `<Eyebrow>`, `<Micro>`.

---

## Layout

### Section

Bloc plein écran avec padding et background brand.

```tsx
import { Section, Container, Typography } from "klyra-ui";

<Section background="deep" halos padding="spacious">
  <Container size="lg">
    <Typography variant="display-l">…</Typography>
  </Container>
</Section>
```

| Prop | Valeurs | Défaut |
|------|---------|--------|
| `background` | `white` · `paper` · `black` · `ink` · `deep` (gradient noir←K1) · `bright` (K1→K2) | `white` |
| `padding` | `compact` · `comfortable` · `spacious` | `comfortable` |
| `halos` | `boolean` — affiche les halos K1+K2 derrière | `false` |

### Container

Centre + max-width + gutter brand (52px par défaut).

| Prop | Valeurs | Défaut |
|------|---------|--------|
| `size` | `sm` · `md` · `lg` · `xl` · `full` | `lg` |
| `gutter` | `compact` · `brand` (52px) · `wide` | `brand` |

### Grid

CSS Grid wrapper.

```tsx
<Grid cols={3} gap={32}>…</Grid>
```

Props : `cols` (number), `gap` (number, px), `className`.

### Stack

Flex column/row avec `gap` en pixels.

```tsx
<Stack direction="row" gap={16} align="center" wrap>…</Stack>
```

| Prop | Valeurs | Défaut |
|------|---------|--------|
| `direction` | `row` · `column` | `column` |
| `gap` | `number` (px) | `16` |
| `align` | `start` · `center` · `end` · `stretch` | – |
| `justify` | `start` · `center` · `end` · `between` | – |
| `wrap` | `boolean` | `false` |

---

## Primitives — Action

### Button

Pill CTA signature KLYRA. Inner-glow K2 sur la variant `primary`.

```tsx
import { Button } from "klyra-ui";

<Button variant="primary" size="lg">Prendre rendez-vous</Button>
<Button variant="ghost-dark" size="md">En savoir plus</Button>
```

| Prop | Valeurs | Défaut |
|------|---------|--------|
| `variant` | `primary` · `dark` · `white` · `ghost` · `ghost-dark` · `link` · `link-dark` | `primary` |
| `size` | `sm` · `md` · `lg` · `xl` | `md` |
| `fullWidth` | `boolean` | `false` |
| `leftIcon`, `rightIcon` | `ReactNode` | – |
| `loading` | `boolean` | `false` |

### IconButton

Bouton carré pour icône seule.

```tsx
import { IconButton } from "klyra-ui";
import { Search } from "lucide-react";

<IconButton variant="ghost" size="md" aria-label="Rechercher">
  <Search size={16} />
</IconButton>
```

`variant` : `primary` · `ghost` · `ghost-dark` · `outline`. `size` : `sm` · `md` · `lg`.

### Toggle

Switch pill animé.

```tsx
<Toggle size="md" checked={value} onChange={(e) => setValue(e.target.checked)} />
```

`size` : `sm` · `md` · `lg`. Forward ref vers `<input type="checkbox">`.

### Tabs

Onglets segmentés (style pill).

```tsx
import { Tabs } from "klyra-ui";

<Tabs
  size="md"
  tone="light"
  options={[
    { value: "all", label: "Tout" },
    { value: "open", label: "Ouverts", count: 12 },
    { value: "done", label: "Terminés" },
  ]}
  value={tab}
  onChange={setTab}
/>
```

`size` : `sm` · `md` · `lg`. `tone` : `light` · `dark`.

---

## Primitives — Forms

### Field

Wrapper unifié label + help + error pour tout input.

```tsx
import { Field, Input } from "klyra-ui";

<Field label="Email" help="Pas de spam, promis." error={errors.email}>
  <Input type="email" name="email" />
</Field>
```

### Input

```tsx
<Input variant="default" size="md" placeholder="Votre email" />
```

`variant` : `default` · `filled` · `dark`. `size` : `sm` · `md` · `lg`. `tone` : `light` · `dark`. Props natives `<input>` héritées + `loading`, `leftIcon`, `rightIcon`.

### Textarea

Mêmes variants que Input. `rows` (number) géré nativement.

### Select

```tsx
<Select
  options={[
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
  ]}
  value={lang}
  onChange={(v) => setLang(v)}
  size="md"
/>
```

### Checkbox

```tsx
<Checkbox size="md" checked={checked} indeterminate={false} onChange={…} />
```

`size` : `sm` · `md` · `lg`. État `indeterminate` supporté.

### Radio / RadioGroup

```tsx
import { RadioGroup, Radio } from "klyra-ui";

<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="starter" label="Starter" />
  <Radio value="pro" label="Pro" />
</RadioGroup>
```

### Tag

Chips supprimables.

```tsx
<Tag variant="tinted" size="md" onRemove={() => …}>marketing</Tag>
```

`variant` : `tinted` · `k1` · `ink` · `outline` · `success` · `warning` · `danger`.

### Kbd

Touche clavier stylisée.

```tsx
<Kbd>⌘</Kbd> <Kbd>K</Kbd>
```

Prop `onDark` pour fond sombre.

---

## Primitives — Display

### Card

```tsx
import { Card } from "klyra-ui";

<Card variant="light" radius="lg" padding="md" interactive>
  …contenu
</Card>
```

| Prop | Valeurs | Défaut |
|------|---------|--------|
| `variant` | `light` · `elevated` · `dark` · `brand` (gradient K1) · `outline` · `paper` | `light` |
| `radius` | `md` · `lg` · `xl` | `lg` |
| `padding` | `sm` · `md` · `lg` | `md` |
| `interactive` | `boolean` (hover lift) | `false` |

Sous-parts composables : `Card.Header`, `Card.Body`, `Card.Footer`.

### GlassCard

Panel verre avec inner-glow K1 — usage signature pour panels overlay sur halos.

```tsx
<GlassCard padding="lg">…</GlassCard>
```

### StatCard

Métrique + trend + sparkline optionnelle.

```tsx
import { StatCard } from "klyra-ui";

<StatCard
  label="MRR"
  value="8 547 €"
  delta="+12.4 %"
  trend="up"
  accent="k1"
  sparkline={[12, 14, 13, 17, 19, 22, 24]}
/>
```

`accent` : `k1` · `k2` · `k3`. `trend` : `up` · `down` · `flat`.

### Table

```tsx
import { Table, StatusPill } from "klyra-ui";

<Table>
  <Table.Head>
    <Table.Row>
      <Table.Th>Client</Table.Th>
      <Table.Th>Statut</Table.Th>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Td>Acme</Table.Td>
      <Table.Td><StatusPill label="Actif" color="green" /></Table.Td>
    </Table.Row>
  </Table.Body>
</Table>
```

`StatusPill.color` : `blue` · `green` · `amber` · `gray` · `red`.

### Badge

```tsx
<Badge variant="tinted" size="md" dot>nouveau</Badge>
```

| Prop | Valeurs | Défaut |
|------|---------|--------|
| `variant` | `k1` · `k2` · `k3` · `tinted` · `ink` · `neutral` · `ghost` · `outline-k1` · `success` · `warning` · `danger` · `info` | `tinted` |
| `size` | `sm` · `md` · `lg` | `md` |
| `dot` | `boolean` | `false` |

### Avatar / AvatarGroup

```tsx
import { Avatar, AvatarGroup } from "klyra-ui";

<Avatar src="/avatar.jpg" name="Corentin Queuche" size="md" />
<Avatar name="Anne Dupont" size="lg" />          {/* initials gradient */}

<AvatarGroup max={4}>
  <Avatar name="A B" />
  <Avatar name="C D" />
  <Avatar name="E F" />
</AvatarGroup>
```

`size` : `xs` · `sm` · `md` · `lg` · `xl`. `shape` : `rounded` · `circle`.

### Breadcrumb

```tsx
import { Breadcrumb } from "klyra-ui";

<Breadcrumb>
  <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
  <Breadcrumb.Item href="/outils">Outils</Breadcrumb.Item>
  <Breadcrumb.Item current>Simulateur</Breadcrumb.Item>
</Breadcrumb>
```

### EmptyState

```tsx
<EmptyState
  title="Pas encore de leads"
  description="Importe ta première liste pour démarrer."
  action={<Button>Importer</Button>}
/>
```

---

## Primitives — Feedback

### Spinner

```tsx
<Spinner size={16} />
```

### Popover

Popover ancré (top, bottom, left, right + variantes start/end).

```tsx
<Popover placement="bottom-start" open={isOpen} anchorRect={rect}>
  …contenu
</Popover>
```

`placement` : 12 valeurs (`top-start`, `top`, `top-end`, `right-start`, …, `left-end`).

---

## Primitives — Brand & motifs

### Logo

```tsx
import { Logo } from "klyra-ui";

<Logo variant="dark" width={120} />
```

`variant` : `original` · `dark` · `white` · `wordmark` · `mark`.

### Halo

Halos radiaux K1/K2 — signature backgrounds dark.

```tsx
<Halo color="k1" size={1200} style={{ position: "absolute", top: -300, left: -200 }} />
<Halo color="k2" size={[800, 600]} />
```

`color` : `k1` · `k2` · `k3` · `k1-deep`. `size` : `number` ou `[w, h]`.

### PixelMotif

Motif pixel 4×4 random (signature brand).

```tsx
<PixelMotif width={400} height={120} density={0.4} />
```

### Arrow

Glyph flèche brand (chevron + motif).

```tsx
<Arrow direction="right" size={16} />
```

`direction` : 8 valeurs (`up`, `up-right`, `right`, …).

### Divider

```tsx
<Divider tone="light" />
```

`tone` : `light` · `dark`.

---

## Composés — Marketing

Importer via le namespace `Marketing` :

```tsx
import { Marketing } from "klyra-ui";

<Marketing.Hero
  variant="deep"
  eyebrow="Outils métier sur mesure"
  title="Nous créons les outils digitaux qui font grandir votre entreprise."
  subtitle="Des solutions aussi performantes que celles des grandes entreprises."
  ctas={[
    { label: "Prendre rendez-vous", href: "/diagnostic", variant: "primary" },
    { label: "Voir nos réalisations", href: "/realisations", variant: "ghost-dark" },
  ]}
/>
```

| Composant | Usage |
|-----------|-------|
| `Marketing.Nav` | Top nav (logo + links + CTA + breadcrumb optionnel) |
| `Marketing.Hero` | Hero section (3 variants : `dark`, `deep`, `bright`), halos auto |
| `Marketing.ServicesGrid` | Grille de services avec icônes |
| `Marketing.ProofMetrics` | Bandeau métriques de preuve sociale (3 backgrounds) |
| `Marketing.CaseStudyBlock` | Split dashboard + 3 cas clients |
| `Marketing.CtaFooter` | Footer + CTA final + colonnes liens |

---

## Composés — Webapp

```tsx
import { Webapp } from "klyra-ui";

<Webapp.Sidebar
  tenant={{ name: "Klyra Studio", initials: "KS" }}
  sections={[
    {
      title: "Pilotage",
      items: [
        { label: "Dashboard", href: "/", icon: Home, active: true },
        { label: "Leads", href: "/leads", icon: Users, badge: 12 },
      ],
    },
  ]}
  footerCta={{ label: "Inviter un membre", href: "/invite" }}
/>
```

| Composant | Usage |
|-----------|-------|
| `Webapp.Sidebar` | Sidebar tenant + sections + footer CTA |
| `Webapp.TopBar` | Top bar avec search ⌘K, actions, avatar |
| `Webapp.DashboardShell` | Stats + chart + tasks + table — vue dashboard prête |
| `Webapp.CommandPalette` | Palette de commandes ⌘K |

---

## Composés — Éditorial

Formats LinkedIn brand.

```tsx
import { Editorial } from "klyra-ui";

<Editorial.LinkedInPost
  variant="dark"
  eyebrow="Édito"
  title="Pourquoi vos outils SaaS ne couvrent que 60 % du job."
  body="…"
  author={{ name: "Corentin Queuche", role: "Fondateur" }}
/>
```

`variant` : `dark` · `blue` · `light`. Format 1080×1350 (portrait LinkedIn).

---

## Patterns d'usage

### Page marketing complète

```tsx
import { Marketing, Section, Container, Halo } from "klyra-ui";

export default function Page() {
  return (
    <>
      <Marketing.Nav links={[…]} cta={{ label: "Diagnostic", href: "/diagnostic" }} />
      <Marketing.Hero variant="deep" title="…" ctas={[…]} />
      <Marketing.ServicesGrid items={[…]} />
      <Marketing.ProofMetrics background="black" metrics={[…]} />
      <Marketing.CaseStudyBlock main={…} cases={[…]} />
      <Marketing.CtaFooter cta={{…}} columns={[…]} />
    </>
  );
}
```

### Page webapp avec shell

```tsx
import { Webapp } from "klyra-ui";

<div className="flex h-screen">
  <Webapp.Sidebar tenant={…} sections={[…]} footerCta={…} />
  <div className="flex-1 flex flex-col">
    <Webapp.TopBar user={…} actions={[…]} />
    <main className="flex-1 overflow-auto p-8">
      <Webapp.DashboardShell stats={[…]} chart={…} tasks={[…]} table={…} />
    </main>
  </div>
</div>
```

### Form complet

```tsx
import { Field, Input, Textarea, Select, Button, Stack } from "klyra-ui";

<form onSubmit={…}>
  <Stack gap={20}>
    <Field label="Nom" error={errors.name}>
      <Input name="name" />
    </Field>
    <Field label="Email" error={errors.email}>
      <Input type="email" name="email" />
    </Field>
    <Field label="Message">
      <Textarea name="message" rows={5} />
    </Field>
    <Button type="submit" variant="primary" size="lg" fullWidth>
      Envoyer
    </Button>
  </Stack>
</form>
```

### Empty state avec action

```tsx
import { EmptyState, Button } from "klyra-ui";

<EmptyState
  title="Aucune campagne active"
  description="Crée ta première campagne pour démarrer."
  action={<Button variant="primary">Nouvelle campagne</Button>}
/>
```

---

## Pièges à éviter

| À ne pas faire | Bonne pratique |
|---------------|----------------|
| `<button className="bg-blue-600 px-4 py-2 rounded">` | `<Button variant="primary">` |
| `<h1 className="text-5xl font-bold">` | `<Typography variant="display-m">` ou `<DisplayM>` |
| Hex en dur `bg-[#003FE4]` | `bg-k1` ou `var(--color-k1)` |
| `rounded-full` sur un CTA | `rounded-pill` (token dédié) |
| `shadow-lg` sur un CTA primaire | Déjà géré par `<Button variant="primary">` (inner-glow) |
| Couleur custom pour un Badge status | Utiliser `success` · `warning` · `danger` · `info` |
| Container fait main `max-w-6xl mx-auto px-13` | `<Container size="lg">` (gutter brand 52px) |
| Stack avec Tailwind `flex flex-col gap-4` | `<Stack gap={16}>` |

---

## Pour aller plus loin

- **Storybook** — `pnpm ui:dev` à la racine du monorepo, port 6006. Toutes les variants/states sont documentés.
- **Code source** — `packages/ui/src/components/` — chaque composant a son `*.tsx` + `*.stories.tsx`.
- **Tokens complets** — `packages/ui/src/styles/tokens.css` (couleurs, radii, shadows, motion, typography).
- **Conventions d'écriture** — [`CONVENTIONS.md`](./CONVENTIONS.md).
- **Setup d'une nouvelle app** — [`INTEGRATION.md`](./INTEGRATION.md).
