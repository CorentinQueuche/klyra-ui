import type { Meta, StoryObj } from "@storybook/react";
import { CaseStudyBlock } from "./CaseStudyBlock";

const meta: Meta<typeof CaseStudyBlock> = {
  title: "Composed/Marketing/CaseStudyBlock",
  component: CaseStudyBlock,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Section réalisations — layout split 1.3fr/1fr. Grande case à gauche avec GlassCard + sparkline K3, 3 petites cases blanches à droite.",
      },
    },
    layout: "fullscreen",
    backgrounds: { default: "paper" },
  },
};
export default meta;
type Story = StoryObj<typeof CaseStudyBlock>;

/* ------------------------------------------------------------------ */
/* Default                                                             */
/* ------------------------------------------------------------------ */
export const Default: Story = {};

/* ------------------------------------------------------------------ */
/* WithoutDashboard — sans la GlassCard chart                        */
/* ------------------------------------------------------------------ */
export const WithoutDashboard: Story = {
  args: {
    main: {
      tag: "CS-01 · BRANDING",
      status: "Livré · 2024",
      title: "Refonte d'identité pour un cabinet de conseil.",
      description:
        "Logo, charte graphique, design system. Livré en 3 semaines.",
      metricLabel: "NPS CLIENT",
      metricValue: "4.9",
      metricDelta: "+0.4 vs. précédent",
      showDashboard: false,
    },
  },
};

/* ------------------------------------------------------------------ */
/* ThreeCases — 3 petites réalisations différentes                   */
/* ------------------------------------------------------------------ */
export const ThreeCases: Story = {
  args: {
    cases: [
      {
        tag: "CS-02 · E-COMMERCE",
        title: "Boutique Shopify pour un créateur de bijoux",
        description:
          "Thème custom, optimisation mobile-first · +55% de taux de conversion.",
      },
      {
        tag: "CS-03 · WEBAPP",
        title: "Outil de planification RH interne",
        description:
          "Next.js + Supabase · 8 utilisateurs simultanés · remplace un tableau Excel partagé.",
      },
      {
        tag: "CS-04 · SITE VITRINE",
        title: "Site pour un cabinet d'expertise comptable",
        description:
          "Refonte complète identité + web · score Lighthouse 98 · +40% de demandes entrantes.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* LongDescription — test de débordement texte                        */
/* ------------------------------------------------------------------ */
export const LongDescription: Story = {
  args: {
    main: {
      tag: "CS-01 · WEBAPP MÉTIER",
      status: "Livré · 2025",
      title: "Un outil de planification de chantiers qui remplace 4 tableurs.",
      description:
        "Entreprise de BTP · 25 utilisateurs · gestion des plannings, des ressources humaines, du matériel et des sous-traitants en un seul outil. Déployé en 10 semaines.",
      metricLabel: "TEMPS GAGNÉ / SEMAINE",
      metricValue: "12 h",
      metricDelta: "par chef de chantier",
      showDashboard: true,
    },
  },
};

/* ------------------------------------------------------------------ */
/* Mobile — layout vertical                                           */
/* ------------------------------------------------------------------ */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
    backgrounds: { default: "paper" },
  },
};
