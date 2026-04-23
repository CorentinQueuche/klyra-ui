import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";

const spark = [0.3, 0.45, 0.4, 0.6, 0.55, 0.75, 0.7, 0.85, 0.9, 1.0];
const sparkDown = [0.9, 0.8, 0.85, 0.65, 0.7, 0.5, 0.55, 0.4, 0.3, 0.2];

const meta: Meta<typeof StatCard> = {
  title: "Primitives/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card spécialisée pour afficher une métrique clé avec label, valeur, delta de tendance et sparkline. Reprise fidèle du Dashboard KLYRA.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["light", "dark", "brand"] },
    trend:   { control: "select", options: ["up", "down", "flat"] },
    accent:  { control: "select", options: ["k1", "k2", "k3"] },
  },
  args: {
    label:    "Chiffre d'affaires",
    value:    "8 547 €",
    delta:    "+32%",
    trend:    "up",
    variant:  "light",
    accent:   "k1",
    sparkline: spark,
  },
};
export default meta;
type Story = StoryObj<typeof StatCard>;

export const LightBlueStat: Story = {
  args: { label: "Chiffre d'affaires", value: "8 547 €", delta: "+32%", trend: "up", sparkline: spark },
};

export const Dark: Story = {
  args: { variant: "dark", label: "Devis envoyés", value: "24", delta: "+6", trend: "up", sparkline: spark },
  parameters: { backgrounds: { default: "black" } },
};

export const Brand: Story = {
  args: { variant: "brand", label: "Taux de conversion", value: "42 %", delta: "+4 %", trend: "up", sparkline: spark },
  parameters: { backgrounds: { default: "black" } },
};

export const WithSparkline: Story = {
  args: { label: "Panier moyen", value: "356 €", delta: "+12 %", trend: "up", sparkline: spark },
};

export const WithDelta: Story = {
  args: { label: "+20 entreprises nous font confiance", value: "20", delta: "+3", trend: "up", sparkline: spark },
};

export const WithDeltaDown: Story = {
  args: { label: "Taux de conversion", value: "42 %", delta: "−3 %", trend: "down", sparkline: sparkDown },
};

export const AccentK1: Story = {
  name: "Accent k1",
  args: { label: "Chiffre d'affaires", value: "8 547 €", accent: "k1", sparkline: spark },
};

export const AccentK2: Story = {
  name: "Accent k2",
  args: { label: "Devis envoyés", value: "24", accent: "k2", sparkline: spark },
};

export const AccentK3: Story = {
  name: "Accent k3",
  args: { label: "Panier moyen", value: "356 €", accent: "k3", sparkline: spark },
};

export const AllVariants: Story = {
  parameters: { backgrounds: { default: "black" } },
  render: () => (
    <div style={{ display: "flex", gap: 14 }}>
      <StatCard label="Chiffre d'affaires" value="8 547 €" delta="+32 %" trend="up" variant="light" sparkline={spark} style={{ flex: 1 }} />
      <StatCard label="Devis envoyés" value="24" delta="+6" trend="up" variant="dark" sparkline={spark} style={{ flex: 1 }} />
      <StatCard label="Taux de conversion" value="42 %" delta="+4 %" trend="up" variant="brand" sparkline={spark} style={{ flex: 1 }} />
    </div>
  ),
};

export const InContextGrid: Story = {
  name: "En contexte — grille dashboard",
  parameters: { backgrounds: { default: "paper" } },
  render: () => (
    <div style={{ display: "flex", gap: 14 }}>
      <StatCard label="Chiffre d'affaires" value="8 547 €" delta="+32 %" trend="up" variant="light" sparkline={spark} style={{ flex: 1 }} />
      <StatCard label="Devis envoyés" value="24" delta="+6" trend="up" variant="light" sparkline={spark} style={{ flex: 1 }} />
      <StatCard label="Taux de conversion" value="42 %" delta="−3 %" trend="down" variant="light" sparkline={sparkDown} style={{ flex: 1 }} />
      <StatCard label="Panier moyen" value="356 €" delta="+12 %" trend="up" variant="light" sparkline={spark} style={{ flex: 1 }} />
    </div>
  ),
};
