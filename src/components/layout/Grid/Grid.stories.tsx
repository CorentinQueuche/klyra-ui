import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

function Cell({ children, span = 1 }: { children?: React.ReactNode; span?: number }) {
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        background: "var(--color-blue-bg)",
        border: "1px solid rgba(0,63,228,0.15)",
        borderRadius: 8,
        padding: "14px 16px",
        fontSize: 12,
        color: "var(--color-k1)",
        fontFamily: "var(--font-mono)",
        minHeight: 48,
        display: "flex",
        alignItems: "center",
      }}
    >
      {children ?? `col span ${span}`}
    </div>
  );
}

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "CSS Grid simplifié. Supporte n colonnes fixes ou mode responsive auto-fill minmax(280px). Gap row/col indépendants.",
      },
    },
  },
  argTypes: {
    gap:  { control: { type: "range", min: 4, max: 48, step: 4 } },
  },
  args: {
    cols: 4,
    gap:  16,
  },
};
export default meta;
type Story = StoryObj<typeof Grid>;

export const FourCols: Story = {
  name: "4 colonnes",
  args: { cols: 4, gap: 14 },
  render: (args) => (
    <Grid {...args}>
      <Cell>Chiffre d&apos;affaires</Cell>
      <Cell>Devis envoyés</Cell>
      <Cell>Taux de conversion</Cell>
      <Cell>Panier moyen</Cell>
    </Grid>
  ),
};

export const TwelveCols: Story = {
  name: "12 colonnes",
  args: { cols: 12, gap: 8 },
  render: (args) => (
    <Grid {...args}>
      <Cell span={8}>Contenu principal — span 8</Cell>
      <Cell span={4}>Panneau latéral — span 4</Cell>
      <Cell span={4}>Card — span 4</Cell>
      <Cell span={4}>Card — span 4</Cell>
      <Cell span={4}>Card — span 4</Cell>
    </Grid>
  ),
};

export const Responsive: Story = {
  args: { cols: "responsive", gap: 16 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Cell key={i}>{["Site vitrine", "Web App MVP", "Retainer", "Branding", "SEO", "Audit"][i]}</Cell>
      ))}
    </Grid>
  ),
};

export const AsymmetricAuto: Story = {
  name: "Asymétrique (1.6fr / 1fr)",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr",
        gap: 14,
      }}
    >
      <Cell>Graphique — 1.6fr</Cell>
      <Cell>Panneau latéral — 1fr</Cell>
    </div>
  ),
};
