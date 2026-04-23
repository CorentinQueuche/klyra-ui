import type { Meta, StoryObj } from "@storybook/react";
import { Halo } from "./Halo";

const meta: Meta<typeof Halo> = {
  title: "Primitives/Halo",
  component: Halo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Halo radial — motif signature KLYRA. Toujours positionné en `absolute` dans un conteneur `relative overflow-hidden`. Off-canvas par convention brand (500–2700 px). Non interactif (`pointer-events: none`).",
      },
    },
    backgrounds: { default: "black" },
  },
  argTypes: {
    color: {
      control: "select",
      options: ["k1", "k2", "k3", "k1-deep"],
      description: "Couleur du halo (palette KLYRA 2026)",
    },
    opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
      description: "Opacité du centre",
    },
    size: {
      control: { type: "number" },
      description: "Diamètre en px (ou tuple [w, h] pour ellipse)",
    },
    blur: {
      control: { type: "range", min: 0, max: 120, step: 5 },
      description: "Flou CSS additionnel (px)",
    },
  },
  args: {
    color: "k1",
    opacity: 0.75,
    size: 500,
    blur: 0,
    position: { top: -180, right: -120 },
  },
};

export default meta;
type Story = StoryObj<typeof Halo>;

/** Stage de référence : fond noir 600×300, halo K1 top-right off-canvas. */
function Stage({
  children,
  bg = "#000",
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 300,
        background: bg,
        overflow: "hidden",
        borderRadius: 0,
      }}
    >
      {children}
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <Stage>
      <Halo {...args} />
    </Stage>
  ),
};

/** Les 3 bleus KLYRA côte à côte sur fond noir. */
export const PaletteK1K2K3: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {(["k1", "k2", "k3"] as const).map((color) => (
        <div key={color} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <Stage>
            <Halo color={color} opacity={0.85} size={380} position={{ top: -60, left: -60 }} />
          </Stage>
          <span style={{ color: "#fff", fontFamily: "monospace", fontSize: 12 }}>{color.toUpperCase()}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { backgrounds: { default: "black" } },
};

/** Palette d'opacités : 0.25, 0.5, 0.75, 0.9. */
export const Opacities: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {[0.25, 0.5, 0.75, 0.9].map((op) => (
        <div key={op} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <Stage>
            <Halo color="k1" opacity={op} size={360} position={{ top: -60, left: -60 }} />
          </Stage>
          <span style={{ color: "#fff", fontFamily: "monospace", fontSize: 12 }}>{op}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { backgrounds: { default: "black" } },
};

/**
 * Double halo — recommandation brand book :
 * K1 en haut à droite + K2 en bas à gauche.
 * Reproduit exactement `background-halos.html`.
 */
export const DualHalo: Story = {
  render: () => (
    <Stage>
      <Halo color="k1" opacity={0.95} size={480} position={{ top: -180, right: -120 }} />
      <Halo color="k2" opacity={0.9} size={440} position={{ bottom: -220, left: -80 }} />
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
            Halos radiaux
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
            Superposition K1 (95%) + K2 (90%) — off-canvas
          </div>
        </div>
      </div>
    </Stage>
  ),
  parameters: { backgrounds: { default: "black" } },
};

/** Halo très diffus avec blur 60 — pour fonds de sections. */
export const Blurred: Story = {
  render: () => (
    <Stage>
      <Halo color="k1" opacity={0.9} size={600} blur={60} position={{ top: -200, right: -200 }} />
    </Stage>
  ),
  parameters: { backgrounds: { default: "black" } },
};

/** Comparaison de tailles : 300, 500, 900, 1500 px. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {([300, 500, 900, 1500] as const).map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#fff", fontFamily: "monospace", fontSize: 12, width: 40 }}>{s}</span>
          <Stage>
            <Halo color="k1" opacity={0.8} size={s} position={{ top: -(s / 2 - 60), right: -(s / 2 - 80) }} />
          </Stage>
        </div>
      ))}
    </div>
  ),
  parameters: { backgrounds: { default: "black" } },
};

/** Halo sur fond dégradé `--grad-deep` (noir ← K1). */
export const OnGradient: Story = {
  render: () => (
    <Stage bg="linear-gradient(180deg, #003FE4 0%, #000000 100%)">
      <Halo color="k2" opacity={0.6} size={500} position={{ top: -100, right: -80 }} />
      <Halo color="k3" opacity={0.4} size={320} position={{ bottom: -120, left: -60 }} />
    </Stage>
  ),
  parameters: { backgrounds: { default: "black" } },
};
