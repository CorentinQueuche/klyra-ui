import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter, CardEyebrow, CardTitle, CardDescription, CardActions } from "./Card";
import { Button } from "../Button";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Conteneur générique polymorphique. Supporte 6 variants de surface, 3 radii et 3 niveaux de padding. Composable via Card.Header, Card.Body, Card.Footer, Card.Eyebrow, Card.Title, Card.Description, Card.Actions.",
      },
    },
  },
  argTypes: {
    variant:     { control: "select", options: ["light", "elevated", "dark", "brand", "outline", "paper"] },
    radius:      { control: "select", options: ["md", "lg", "xl"] },
    padding:     { control: "select", options: ["sm", "md", "lg"] },
    interactive: { control: "boolean" },
  },
  args: {
    variant:     "light",
    radius:      "lg",
    padding:     "md",
    interactive: false,
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

/* ─── Variants ─────────────────────────────────────────────────── */

export const Light: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardEyebrow>Réalisation</CardEyebrow>
      <CardTitle>Refonte pour un cabinet d&apos;avocats</CardTitle>
      <CardDescription>
        Site vitrine sur mesure avec moteur de prise de rendez-vous intégré.
      </CardDescription>
    </Card>
  ),
};

export const Elevated: Story = {
  args: { variant: "elevated" },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardTitle>Plan Pro</CardTitle>
      <CardDescription>
        Des outils aussi performants que ceux des grandes entreprises — sans la complexité, le coût ou les délais.
      </CardDescription>
    </Card>
  ),
};

export const Dark: Story = {
  args: { variant: "dark" },
  parameters: { backgrounds: { default: "black" } },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardEyebrow style={{ color: "rgba(255,255,255,0.5)" }}>Partenaire</CardEyebrow>
      <CardTitle style={{ color: "#fff" }}>+20 entreprises nous font confiance</CardTitle>
      <CardDescription style={{ color: "rgba(255,255,255,0.55)" }}>
        PME ambitieuses accompagnées sur leurs outils métier.
      </CardDescription>
    </Card>
  ),
};

export const Brand: Story = {
  args: { variant: "brand" },
  parameters: { backgrounds: { default: "black" } },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardTitle style={{ color: "#fff" }}>Nous créons les outils digitaux qui font grandir votre entreprise.</CardTitle>
      <CardDescription style={{ color: "rgba(255,255,255,0.7)" }}>
        Stratégie &amp; identité de marque — Klyra Design
      </CardDescription>
    </Card>
  ),
};

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardTitle>Devis gratuit en 24 h</CardTitle>
      <CardDescription>Remplissez le formulaire, nous vous répondons sous un jour ouvré.</CardDescription>
    </Card>
  ),
};

export const Paper: Story = {
  args: { variant: "paper" },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <CardTitle>47 projets livrés</CardTitle>
      <CardDescription>Depuis 2023, notre note moyenne est de 4,9 / 5.</CardDescription>
    </Card>
  ),
};

export const Interactive: Story = {
  args: { variant: "light", interactive: true },
  render: (args) => (
    <div style={{ display: "flex", gap: 16 }}>
      {["Site vitrine", "Web App MVP", "Retainer mensuel"].map((label) => (
        <Card key={label} {...args} style={{ maxWidth: 240, flex: 1 }}>
          <CardTitle>{label}</CardTitle>
          <CardDescription>Survolez pour voir l&apos;effet interactif.</CardDescription>
        </Card>
      ))}
    </div>
  ),
};

/* ─── Radii ────────────────────────────────────────────────────── */

export const Radii: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      {(["md", "lg", "xl"] as const).map((r) => (
        <Card key={r} variant="light" radius={r} padding="md" style={{ width: 160 }}>
          <CardTitle style={{ fontSize: 14 }}>radius {r === "md" ? "12" : r === "lg" ? "20" : "28"}px</CardTitle>
          <CardDescription style={{ fontSize: 12 }}>{r}</CardDescription>
        </Card>
      ))}
    </div>
  ),
};

/* ─── Paddings ─────────────────────────────────────────────────── */

export const Paddings: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      {(["sm", "md", "lg"] as const).map((p) => (
        <Card key={p} variant="light" padding={p} style={{ width: 180 }}>
          <CardTitle style={{ fontSize: 14 }}>padding {p === "sm" ? "16" : p === "md" ? "24" : "32"}px</CardTitle>
          <CardDescription style={{ fontSize: 12 }}>{p}</CardDescription>
        </Card>
      ))}
    </div>
  ),
};

/* ─── Composed ─────────────────────────────────────────────────── */

export const Composed: Story = {
  render: () => (
    <Card variant="light" radius="lg" padding="md" style={{ maxWidth: 400 }}>
      <CardHeader>
        <div>
          <CardEyebrow>Proposition commerciale</CardEyebrow>
          <CardTitle>Refonte complète — Cabinet Lefebvre</CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <CardDescription>
          Refonte du site vitrine, création de l&apos;identité visuelle et intégration d&apos;un outil de devis interne sur mesure.
        </CardDescription>
      </CardBody>
      <CardFooter>
        <CardActions>
          <Button variant="ghost" size="sm">En savoir plus</Button>
          <Button size="sm">Prendre rendez-vous</Button>
        </CardActions>
      </CardFooter>
    </Card>
  ),
};

/* ─── All Variants ─────────────────────────────────────────────── */

export const AllVariants: Story = {
  parameters: { backgrounds: { default: "paper" } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 280px)", gap: 20 }}>
      {(["light", "elevated", "dark", "brand", "outline", "paper"] as const).map((v) => (
        <Card key={v} variant={v} padding="md">
          <CardTitle style={{ color: ["dark", "brand"].includes(v) ? "#fff" : undefined, fontSize: 15 }}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </CardTitle>
          <CardDescription
            style={{
              color: v === "dark" ? "rgba(255,255,255,0.55)" : v === "brand" ? "rgba(255,255,255,0.7)" : undefined,
              fontSize: 13,
            }}
          >
            9 635 abonnés · Klyra Design — 2026
          </CardDescription>
        </Card>
      ))}
    </div>
  ),
};
