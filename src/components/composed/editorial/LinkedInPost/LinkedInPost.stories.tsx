import type { Meta, StoryObj } from "@storybook/react";
import { LinkedInPost } from "./LinkedInPost";
import { GlassCard, GlassCardChart } from "../../../primitives/GlassCard/GlassCard";

/* ------------------------------------------------------------------ */
/*  Meta                                                                */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof LinkedInPost> = {
  title: "Composed/Editorial/LinkedInPost",
  component: LinkedInPost,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Post LinkedIn portrait 1080×1350 (affiché à 540×675 par défaut). Trois variants : dark, blue, light. Highlight K3 cyan sur dark/blue, K1 bleu sur light.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["dark", "blue", "light"],
    },
    width: { control: { type: "number", min: 270, max: 1080, step: 10 } },
    showHalo: { control: "boolean" },
  },
  args: {
    variant: "dark",
    eyebrow: "KLYRA · 2026",
    title: "Ton site ne te rapporte rien ?",
    highlight: "Voici pourquoi.",
    footer: "Klyra Design — 2026",
    width: 540,
  },
};

export default meta;
type Story = StoryObj<typeof LinkedInPost>;

/* ------------------------------------------------------------------ */
/*  Stories                                                             */
/* ------------------------------------------------------------------ */

/** Variant dark — gradient noir → K1. Highlight K3 cyan */
export const Dark: Story = {
  args: {
    variant: "dark",
    title: "Ton site ne te rapporte rien ?",
    highlight: "Voici pourquoi.",
  },
  parameters: {
    backgrounds: { default: "gray" },
    docs: {
      description: {
        story: "Fond gradient noir → K1. Halo atténué off-canvas. Highlight en K3 #00DDFF.",
      },
    },
  },
};

/** Variant blue — gradient K1 → K2. Highlight K3 cyan */
export const Blue: Story = {
  args: {
    variant: "blue",
    title: "Nous créons les outils digitaux pour booster",
    highlight: "ta croissance",
  },
  parameters: {
    backgrounds: { default: "gray" },
    docs: {
      description: {
        story: "Fond gradient K1 → K2. Highlight en K3 #00DDFF pour contraste max.",
      },
    },
  },
};

/** Variant light — fond blanc, logo original, highlight K1 */
export const Light: Story = {
  args: {
    variant: "light",
    logoVariant: "original",
    title: "Des outils aussi performants",
    highlight: "sans la complexité.",
    showHalo: false,
  },
  parameters: {
    backgrounds: { default: "paper" },
    docs: {
      description: {
        story: "Fond blanc. Logo original (K1 + noir). Highlight en K1 #003FE4.",
      },
    },
  },
};

/** Version carrée — ratio 1:1 */
export const Square: Story = {
  args: {
    variant: "dark",
    title: "47 projets livrés.",
    highlight: "+20 entreprises nous font confiance",
    width: 540,
    style: { height: 540, borderRadius: 20 },
  },
  parameters: {
    backgrounds: { default: "gray" },
    docs: {
      description: { story: "Format carré — height overridée via style." },
    },
  },
};

/** Avec chart preview dans le slot enfants */
export const WithChartPreview: Story = {
  args: {
    variant: "dark",
    title: "9 635 abonnés.",
    highlight: "Et ca continue.",
    children: (
      <GlassCard padding={16} radius={12} style={{ marginTop: 8 }}>
        <GlassCardChart />
      </GlassCard>
    ),
  },
  parameters: {
    backgrounds: { default: "black" },
    docs: {
      description: {
        story: "Slot enfants occupé par une GlassCard avec chart — illustre la zone middle.",
      },
    },
  },
};

/** Galerie des 3 variants côte à côte */
export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
      <LinkedInPost
        variant="dark"
        title="Ton site ne te rapporte rien ?"
        highlight="Voici pourquoi."
        width={320}
      />
      <LinkedInPost
        variant="blue"
        title="Nous créons les outils digitaux pour booster"
        highlight="ta croissance"
        width={320}
      />
      <LinkedInPost
        variant="light"
        title="Des outils aussi performants"
        highlight="sans la complexité."
        width={320}
        showHalo={false}
      />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "gray" },
    docs: {
      description: { story: "Les 3 variants côte à côte à 320px." },
    },
  },
};

/** Format 1080px — LinkedIn natif */
export const LargeFormat: Story = {
  args: {
    variant: "dark",
    title: "Ton site ne te rapporte rien ?",
    highlight: "Voici pourquoi.",
    width: 1080,
  },
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "linkedinPortrait" },
    backgrounds: { default: "black" },
    docs: {
      description: { story: "Format natif 1080×1350 — viewport linkedinPortrait." },
    },
  },
};
