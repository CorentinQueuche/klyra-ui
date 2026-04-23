import type { Meta, StoryObj } from "@storybook/react";
import { PixelMotif, type PaletteEntry } from "./PixelMotif";

const meta: Meta<typeof PixelMotif> = {
  title: "Primitives/PixelMotif",
  component: PixelMotif,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Mosaïque pixel — motif signature KLYRA. Carrés 4 px (cellSize 20 + padding 2), palette K1/K2/K3/white. Canvas 2D côté client. Reprend exactement `background-pixels.html`.",
      },
    },
    backgrounds: { default: "deep" },
  },
  argTypes: {
    width: { control: { type: "number" } },
    height: { control: { type: "number" } },
    cellSize: { control: { type: "range", min: 8, max: 80, step: 4 } },
    padding: { control: { type: "range", min: 0, max: 10, step: 1 } },
    seed: { control: { type: "number" } },
  },
  args: {
    width: 700,
    height: 220,
  },
};

export default meta;
type Story = StoryObj<typeof PixelMotif>;

/** Rendu standard — palette et dimensions par défaut. */
export const Default: Story = {};

/** Grille dense : cellSize 10 — pixels très petits. */
export const DenseGrid: Story = {
  args: { cellSize: 10, padding: 1, seed: 42 },
};

/** Grille grossière : cellSize 40 — blocs larges. */
export const CoarseGrid: Story = {
  args: { cellSize: 40, padding: 4, seed: 42 },
};

/** Graine fixe — snapshot stable pour tests visuels. */
export const Seeded: Story = {
  args: { seed: 12345 },
};

/** Palette monochrome K1 avec 3 niveaux d'opacité. */
export const CustomPalette: Story = {
  args: {
    palette: [
      { color: "rgba(0,63,228,0.25)", probability: 0.2 },
      { color: "rgba(0,63,228,0.55)", probability: 0.15 },
      { color: "rgba(0,63,228,0.90)", probability: 0.1 },
    ] satisfies PaletteEntry[],
    seed: 7,
    cellSize: 20,
  },
};

/**
 * En contexte sur fond dégradé deep — reprend l'ambiance de `background-pixels.html`.
 * "Mosaïque pixel — Carrés 4 px, rappel du K-mark."
 */
export const OnGradient: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        width: 700,
        height: 220,
        background: "linear-gradient(180deg,#003FE4 0%, #000 100%)",
        overflow: "hidden",
      }}
    >
      <PixelMotif width={700} height={220} seed={2026} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          padding: "20px 28px",
          color: "#fff",
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em" }}>
            Mosaïque pixel
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
            Carrés 4 px, rappel du K-mark, opacités 25–85%
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: { backgrounds: { default: "black" } },
};
