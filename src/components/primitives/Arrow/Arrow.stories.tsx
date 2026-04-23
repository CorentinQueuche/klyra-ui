import type { Meta, StoryObj } from "@storybook/react";
import { Arrow } from "./Arrow";

const meta: Meta<typeof Arrow> = {
  title: "Primitives/Arrow",
  component: Arrow,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["up-right", "right", "down-right", "down", "down-left", "left", "up-left", "up"],
    },
    size: { control: { type: "range", min: 8, max: 40, step: 1 } },
    thickness: { control: { type: "range", min: 1, max: 3, step: 0.25 } },
    motif: { control: "boolean" },
    color: { control: "color" },
  },
  args: { direction: "up-right", size: 14, thickness: 1.5, motif: false },
};
export default meta;
type Story = StoryObj<typeof Arrow>;

export const Default: Story = {};

export const AllDirections: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, padding: 24 }}>
      {(["up-right", "right", "down-right", "down", "down-left", "left", "up-left", "up"] as const).map((d) => (
        <div key={d} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <Arrow direction={d} size={24} thickness={2} color="#003FE4" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>{d}</span>
        </div>
      ))}
    </div>
  ),
};

export const MotifGlyphs: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 24, fontSize: 24, color: "#003FE4", fontFamily: "var(--font-mono)" }}>
      <Arrow motif direction="up-right" />
      <Arrow motif direction="right" />
      <Arrow motif direction="down-right" />
      <Arrow motif direction="down" />
      <Arrow motif direction="down-left" />
      <Arrow motif direction="left" />
      <Arrow motif direction="up-left" />
      <Arrow motif direction="up" />
    </div>
  ),
};

export const InContextCTA: Story = {
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      <a href="#" style={{ color: "#003FE4", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6 }}>
        Consulter les créneaux <Arrow />
      </a>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(0,0,0,0.55)", display: "inline-flex", gap: 8 }}>
        <Arrow motif direction="right" /> BRANDING
        <Arrow motif direction="right" /> WEB DESIGN
        <Arrow motif direction="right" /> DÉVELOPPEMENT
      </div>
    </div>
  ),
};
