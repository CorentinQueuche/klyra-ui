import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background:   "var(--color-blue-bg)",
        color:        "var(--color-k1)",
        borderRadius: 8,
        padding:      "10px 16px",
        fontSize:     13,
        fontWeight:   500,
        whiteSpace:   "nowrap",
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Conteneur flex colonne ou ligne avec gap contrôlé, alignement et justification. Primitif fondamental pour la composition de layouts.",
      },
    },
  },
  argTypes: {
    direction: { control: "select", options: ["row", "column"] },
    gap:       { control: { type: "range", min: 0, max: 64, step: 4 } },
    align:     { control: "select", options: ["start", "center", "end", "stretch"] },
    justify:   { control: "select", options: ["start", "center", "end", "between"] },
    wrap:      { control: "boolean" },
  },
  args: {
    direction: "column",
    gap:       16,
  },
};
export default meta;
type Story = StoryObj<typeof Stack>;

export const Column: Story = {
  render: (args) => (
    <Stack {...args} style={{ maxWidth: 320 }}>
      <Chip>Site vitrine sur mesure</Chip>
      <Chip>Web App MVP — 10 semaines</Chip>
      <Chip>Retainer mensuel</Chip>
    </Stack>
  ),
};

export const Row: Story = {
  args: { direction: "row", align: "center" },
  render: (args) => (
    <Stack {...args}>
      <Chip>+20 entreprises</Chip>
      <Chip>4,9 / 5</Chip>
      <Chip>47 projets livrés</Chip>
    </Stack>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {([4, 8, 16, 32] as const).map((gap) => (
        <div key={gap}>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>gap {gap}px</div>
          <Stack direction="row" gap={gap}>
            <Chip>Stratégie</Chip>
            <Chip>Design</Chip>
            <Chip>Développement</Chip>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const AlignJustify: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {(["start", "center", "end", "between"] as const).map((justify) => (
        <div key={justify}>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>justify {justify}</div>
          <Stack direction="row" justify={justify} style={{ background: "var(--color-blue-bg)", padding: 12, borderRadius: 8 }}>
            <Chip>Voir nos réalisations</Chip>
            <Chip>En savoir plus</Chip>
          </Stack>
        </div>
      ))}
    </div>
  ),
};
