import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Composed/Marketing/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Section Hero plein écran avec halos radials signature, badge eyebrow, titre 104px, 2 CTAs et liste services mono. Fond configurable : dark, deep ou bright.",
      },
    },
    layout: "fullscreen",
    backgrounds: { default: "black" },
  },
  argTypes: {
    variant: { control: "select", options: ["dark", "deep", "bright"] },
    showHalos: { control: "boolean" },
    showPixels: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Hero>;

/* ------------------------------------------------------------------ */
/* Default — fond noir                                                 */
/* ------------------------------------------------------------------ */
export const Default: Story = {
  args: {
    variant: "dark",
    showHalos: true,
    showPixels: false,
  },
};

/* ------------------------------------------------------------------ */
/* DeepGradient — fond K1 → noir                                      */
/* ------------------------------------------------------------------ */
export const DeepGradient: Story = {
  args: {
    variant: "deep",
    showHalos: true,
  },
};

/* ------------------------------------------------------------------ */
/* BrightGradient — fond K1 → K2                                      */
/* ------------------------------------------------------------------ */
export const BrightGradient: Story = {
  args: {
    variant: "bright",
    showHalos: false,
  },
};

/* ------------------------------------------------------------------ */
/* WithPixels — fond noir + motif pixel                               */
/* ------------------------------------------------------------------ */
export const WithPixels: Story = {
  args: {
    variant: "dark",
    showHalos: true,
    showPixels: true,
  },
};

/* ------------------------------------------------------------------ */
/* MinimalNoServices — sans liste services                            */
/* ------------------------------------------------------------------ */
export const MinimalNoServices: Story = {
  args: {
    variant: "dark",
    showHalos: true,
    services: [],
    eyebrowBadge: "Studio indépendant · Strasbourg",
    description:
      "Nous concevons et développons les outils digitaux dont votre entreprise a besoin pour croître.",
    primaryCta: { label: "Voir nos réalisations", href: "#" },
    secondaryCta: undefined,
  },
};

/* ------------------------------------------------------------------ */
/* LongTitle — pour tester le textWrap balance                        */
/* ------------------------------------------------------------------ */
export const LongTitle: Story = {
  args: {
    variant: "dark",
    showHalos: true,
    title: (
      <>
        Nous construisons des outils métier sur mesure pour les PME qui veulent
        aller plus vite que leurs concurrents.
      </>
    ),
  },
};

/* ------------------------------------------------------------------ */
/* MobileView — titre réduit sur mobile                              */
/* ------------------------------------------------------------------ */
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
    backgrounds: { default: "black" },
  },
  args: {
    variant: "dark",
    showHalos: true,
  },
};
