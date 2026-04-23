import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "./Section";
import { Container } from "../Container";

function Placeholder({ dark }: { dark?: boolean }) {
  return (
    <Container size="lg" gutter="page">
      <div
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: dark ? "rgba(255,255,255,0.8)" : "var(--color-ink)",
        }}
      >
        Nous créons les outils digitaux qui font grandir votre entreprise.
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 14,
          marginTop: 8,
          color: dark ? "rgba(255,255,255,0.45)" : "var(--color-fg-2)",
        }}
      >
        Stratégie &amp; identité de marque — Klyra Design — 2026
      </div>
    </Container>
  );
}

const meta: Meta<typeof Section> = {
  title: "Layout/Section",
  component: Section,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Wrapper de section marketing : padding vertical configurable, 6 backgrounds (dont 2 gradients), halos K1/K2 optionnels. Overflow hidden par défaut.",
      },
    },
  },
  argTypes: {
    background: { control: "select", options: ["white", "paper", "black", "ink", "deep", "bright"] },
    padding:    { control: "select", options: ["compact", "comfortable", "spacious"] },
    halos:      { control: "boolean" },
  },
  args: {
    background: "white",
    padding:    "comfortable",
    halos:      false,
  },
};
export default meta;
type Story = StoryObj<typeof Section>;

export const Light: Story = {
  args: { background: "white", padding: "comfortable" },
  render: (args) => <Section {...args}><Placeholder /></Section>,
};

export const Paper: Story = {
  args: { background: "paper", padding: "comfortable" },
  render: (args) => <Section {...args}><Placeholder /></Section>,
};

export const Dark: Story = {
  args: { background: "black", padding: "comfortable" },
  render: (args) => <Section {...args}><Placeholder dark /></Section>,
};

export const DeepGradient: Story = {
  args: { background: "deep", padding: "comfortable" },
  render: (args) => <Section {...args}><Placeholder dark /></Section>,
};

export const BrightGradient: Story = {
  args: { background: "bright", padding: "comfortable" },
  render: (args) => <Section {...args}><Placeholder dark /></Section>,
};

export const WithHalos: Story = {
  args: { background: "deep", padding: "comfortable", halos: true },
  render: (args) => <Section {...args}><Placeholder dark /></Section>,
};

export const Compact: Story = {
  args: { background: "paper", padding: "compact" },
  render: (args) => <Section {...args}><Placeholder /></Section>,
};
