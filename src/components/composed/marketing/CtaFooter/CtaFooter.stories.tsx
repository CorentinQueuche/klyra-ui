import type { Meta, StoryObj } from "@storybook/react";
import { CtaFooter } from "./CtaFooter";

const meta: Meta<typeof CtaFooter> = {
  title: "Composed/Marketing/CtaFooter",
  component: CtaFooter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Footer big-CTA avec halo central K1, titre 96px, CTA pill primaire, grille de liens et copyright. Fond noir signature.",
      },
    },
    layout: "fullscreen",
    backgrounds: { default: "black" },
  },
};
export default meta;
type Story = StoryObj<typeof CtaFooter>;

/* ------------------------------------------------------------------ */
/* Default                                                             */
/* ------------------------------------------------------------------ */
export const Default: Story = {};

/* ------------------------------------------------------------------ */
/* MinimalNoLinks — sans colonnes de liens                            */
/* ------------------------------------------------------------------ */
export const MinimalNoLinks: Story = {
  args: {
    columns: [],
    logoSlogan: undefined,
    eyebrow: "→ DÉMARRONS",
    title: (
      <>
        Un projet en tête ?
        <br />
        <span style={{ color: "var(--color-k2)" }}>On en parle.</span>
      </>
    ),
    cta: { label: "Réserver un créneau gratuit →", href: "#" },
  },
};

/* ------------------------------------------------------------------ */
/* WithSocials — colonne Contact avec liens LinkedIn + email         */
/* ------------------------------------------------------------------ */
export const WithSocials: Story = {
  args: {
    columns: [
      {
        heading: "Services",
        items: ["Branding", "Web Design", "Développement", "Maintenance"],
      },
      {
        heading: "Studio",
        items: ["À propos", "Réalisations", "Labs", "Blog"],
      },
      {
        heading: "Contact",
        items: ["corentin@klyra.fr", "LinkedIn → Corentin Queuche", "Strasbourg, FR"],
      },
    ],
    cta: { label: "Prendre rendez-vous →", href: "#" },
  },
};

/* ------------------------------------------------------------------ */
/* CustomCTA — variante message différent                             */
/* ------------------------------------------------------------------ */
export const CustomCTA: Story = {
  args: {
    eyebrow: "→ TRAVAILLONS ENSEMBLE",
    title: (
      <>
        Votre outil métier,
        <br />
        <span style={{ color: "var(--color-k2)" }}>livré en 10 semaines.</span>
      </>
    ),
    cta: { label: "Consulter les créneaux disponibles →", href: "#" },
    copyright: {
      left: "Stratégie & identité de marque — Tous droits réservés",
      right: "Klyra Design · 2026",
    },
  },
};
