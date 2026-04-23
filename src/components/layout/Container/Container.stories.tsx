import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        color: "var(--color-k1)",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.04em",
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

function Box({ label, maxWidth }: { label: string; maxWidth: string | number }) {
  return (
    <div
      style={{
        background: "var(--color-blue-bg)",
        border: "1px dashed var(--color-k1)",
        borderRadius: 8,
        padding: "16px 20px",
        textAlign: "center",
        fontSize: 13,
        color: "var(--color-k1)",
      }}
    >
      {label} — max {maxWidth}
    </div>
  );
}

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Conteneur centralisé avec max-width et padding horizontal. Signature brand : gutter 52px (brand book 1920×1080). Taille par défaut lg (1180px).",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    size:   { control: "select", options: ["sm", "md", "lg", "xl", "full"] },
    gutter: { control: "select", options: ["brand", "page", "none"] },
  },
  args: {
    size:   "lg",
    gutter: "page",
  },
};
export default meta;
type Story = StoryObj<typeof Container>;

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px 0" }}>
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <Container key={size} size={size} gutter="page">
          <Label>{size}</Label>
          <Box label={size.toUpperCase()} maxWidth={size === "full" ? "100%" : { sm: 720, md: 960, lg: 1180, xl: 1440 }[size]!} />
        </Container>
      ))}
    </div>
  ),
};

export const BrandGutter: Story = {
  render: () => (
    <Container size="lg" gutter="brand">
      <Label>gutter brand — 52px</Label>
      <Box label="52px de marge de chaque côté" maxWidth="1180px" />
    </Container>
  ),
};

export const PageGutter: Story = {
  render: () => (
    <Container size="lg" gutter="page">
      <Label>gutter page — 24px</Label>
      <Box label="24px de marge de chaque côté" maxWidth="1180px" />
    </Container>
  ),
};

export const NoGutter: Story = {
  render: () => (
    <Container size="lg" gutter="none">
      <Label>gutter none — 0px</Label>
      <Box label="Pas de marge horizontale" maxWidth="1180px" />
    </Container>
  ),
};
