import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Primitives/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Spinner — indicateur de chargement circulaire discret. Cercle SVG stroke currentColor, arc 75%, rotation 720 ms linéaire. Utilisé dans Button[loading] et partout où un état de traitement doit être signalé.",
      },
    },
    backgrounds: { default: "white" },
  },
  argTypes: {
    size: { control: { type: "range", min: 10, max: 64, step: 2 } },
    color: { control: "color" },
    ariaLabel: { control: "text" },
  },
  args: {
    size: 16,
    color: "currentColor",
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/** Spinner par défaut — 16 px, currentColor. */
export const Default: Story = {};

/** Comparaison des tailles : 12, 16, 24, 40 px. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 16 }}>
      {[12, 16, 24, 40].map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Spinner size={s} color="var(--color-k1)" />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>{s} px</span>
        </div>
      ))}
    </div>
  ),
};

/** Couleurs : K1, K2, K3, blanc sur fond sombre. */
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 0 }}>
      {/* Spinners sur fond clair */}
      <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 24, background: "#fff" }}>
        {[
          { color: "var(--color-k1)", label: "K1" },
          { color: "var(--color-k2)", label: "K2" },
          { color: "var(--color-k3)", label: "K3" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Spinner size={24} color={color} />
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>{label}</span>
          </div>
        ))}
      </div>
      {/* Blanc sur fond sombre */}
      <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 24, background: "#000" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Spinner size={24} color="#fff" />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>white</span>
        </div>
      </div>
    </div>
  ),
  parameters: { backgrounds: { default: "white" } },
};
