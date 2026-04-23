import type { Meta, StoryObj } from "@storybook/react";
import { ServicesGrid } from "./ServicesGrid";

const meta: Meta<typeof ServicesGrid> = {
  title: "Composed/Marketing/ServicesGrid",
  component: ServicesGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Grille des 4 métiers KLYRA. Une card highlighted avec gradient K1. Tags en pills Badge.",
      },
    },
    layout: "fullscreen",
    backgrounds: { default: "white" },
  },
  argTypes: {
    columns: { control: "select", options: [2, 3, 4] },
  },
};
export default meta;
type Story = StoryObj<typeof ServicesGrid>;

/* ------------------------------------------------------------------ */
/* Default — 4 services officiels KLYRA                               */
/* ------------------------------------------------------------------ */
export const Default: Story = {
  args: {
    columns: 4,
  },
};

/* ------------------------------------------------------------------ */
/* ThreeColumns — grille 3 colonnes                                    */
/* ------------------------------------------------------------------ */
export const ThreeColumns: Story = {
  args: {
    columns: 3,
    services: [
      {
        num: "01",
        title: "Stratégie",
        body: "Positionnement, messaging, proposition de valeur — nous clarifions votre cap avant de construire.",
        tags: ["Audit", "Positionnement", "Messaging"],
        highlight: true,
      },
      {
        num: "02",
        title: "Design",
        body: "UX/UI, design system, maquettes. Des interfaces pensées pour l'usage, pas pour les prix.",
        tags: ["UX", "UI", "Figma"],
      },
      {
        num: "03",
        title: "Développement",
        body: "Next.js, React, Tailwind. Code propre, performant et maintenable sur le long terme.",
        tags: ["Next.js", "TypeScript", "Vercel"],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* AllHighlighted — toutes les cards en mode brand                    */
/* ------------------------------------------------------------------ */
export const AllHighlighted: Story = {
  args: {
    columns: 4,
    services: [
      {
        num: "01",
        title: "Branding",
        body: "Identité visuelle cohérente et mémorable.",
        tags: ["Stratégie", "Logo"],
        highlight: true,
      },
      {
        num: "02",
        title: "Web Design",
        body: "Interfaces claires et performantes.",
        tags: ["UX", "UI"],
        highlight: true,
      },
      {
        num: "03",
        title: "Développement",
        body: "Sites et outils métier sur mesure.",
        tags: ["Next.js", "Webapps"],
        highlight: true,
      },
      {
        num: "04",
        title: "Maintenance",
        body: "Présence en ligne rapide et à jour.",
        tags: ["Support", "Sécurité"],
        highlight: true,
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* CustomServices — autre liste thématique                            */
/* ------------------------------------------------------------------ */
export const CustomServices: Story = {
  args: {
    eyebrow: "→ NOTRE APPROCHE",
    title: "Trois phases, un seul objectif : votre croissance.",
    linkAll: undefined,
    columns: 3,
    services: [
      {
        num: "01",
        title: "Découverte",
        body: "Call diagnostic gratuit, brief structuré, analyse concurrentielle. On comprend avant de construire.",
        tags: ["Brief", "Audit", "Diagnostic"],
        highlight: true,
      },
      {
        num: "02",
        title: "Production",
        body: "Design + développement en itérations. Checkpoint client à chaque jalon.",
        tags: ["Design", "Dev", "Itérations"],
      },
      {
        num: "03",
        title: "Livraison",
        body: "Déploiement, formation, support inclus. On reste disponibles après la mise en ligne.",
        tags: ["Déploiement", "Formation", "Support"],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* MobileStack — viewport mobile                                       */
/* ------------------------------------------------------------------ */
export const MobileStack: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
    backgrounds: { default: "white" },
  },
  args: {
    columns: 4,
  },
};
