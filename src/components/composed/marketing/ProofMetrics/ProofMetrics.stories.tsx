import type { Meta, StoryObj } from "@storybook/react";
import { ProofMetrics } from "./ProofMetrics";

const meta: Meta<typeof ProofMetrics> = {
  title: "Composed/Marketing/ProofMetrics",
  component: ProofMetrics,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Band sombre avec 4 métriques géantes 72px séparées par des hairlines verticales. Halo top-center configurable.",
      },
    },
    layout: "fullscreen",
    backgrounds: { default: "black" },
  },
  argTypes: {
    background: { control: "select", options: ["black", "ink", "k1"] },
    showHalo: { control: "boolean" },
    showPixels: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof ProofMetrics>;

/* ------------------------------------------------------------------ */
/* Default — fond noir, 4 métriques                                   */
/* ------------------------------------------------------------------ */
export const Default: Story = {
  args: {
    background: "black",
    showHalo: true,
    showPixels: false,
  },
};

/* ------------------------------------------------------------------ */
/* WithPixelMotif — fond noir + motif pixel opacity 0.4              */
/* ------------------------------------------------------------------ */
export const WithPixelMotif: Story = {
  args: {
    background: "black",
    showHalo: true,
    showPixels: true,
  },
};

/* ------------------------------------------------------------------ */
/* BlueBrand — fond K1                                                 */
/* ------------------------------------------------------------------ */
export const BlueBrand: Story = {
  parameters: {
    backgrounds: { default: "k1" },
  },
  args: {
    background: "k1",
    showHalo: true,
    eyebrow: "→ CHIFFRES CLÉS",
    title: "La preuve par les chiffres.",
  },
};

/* ------------------------------------------------------------------ */
/* ThreeMetrics — 3 métriques                                         */
/* ------------------------------------------------------------------ */
export const ThreeMetrics: Story = {
  args: {
    background: "black",
    showHalo: true,
    metrics: [
      { big: "+20", label: "Entreprises accompagnées" },
      { big: "4.9", label: "Note moyenne client" },
      { big: "47", label: "Projets livrés depuis 2023" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* SixMetrics — 6 métriques                                           */
/* ------------------------------------------------------------------ */
export const SixMetrics: Story = {
  args: {
    background: "ink",
    showHalo: true,
    metrics: [
      { big: "+20", label: "Clients actifs" },
      { big: "4.9", label: "Note client" },
      { big: "47", label: "Projets livrés" },
      { big: "9 635", label: "Abonnés LinkedIn" },
      { big: "6 sem.", label: "Délai moyen site" },
      { big: "100%", label: "Satisfaction garantie" },
    ],
  },
};
