import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pill statique pour labels de catégories et indicateurs de statut. 12 variants sémantiques + prop `dot` pour indicateur coloré.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "k1", "k2", "k3", "tinted", "ink", "neutral",
        "ghost", "outline-k1", "success", "warning", "danger", "info",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    dot: { control: "boolean" },
  },
  args: {
    children: "Branding",
    variant: "k1",
    size: "md",
    dot: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/* ---- Stories individuelles ------------------------------------------ */

export const K1: Story = {
  args: { variant: "k1", children: "Branding" },
};

export const K2: Story = {
  args: { variant: "k2", children: "Web Design" },
};

export const K3: Story = {
  args: { variant: "k3", children: "Développement" },
};

export const Tinted: Story = {
  args: { variant: "tinted", children: "Maintenance" },
};

export const Ink: Story = {
  args: { variant: "ink", children: "Labs" },
};

export const Neutral: Story = {
  args: { variant: "neutral", children: "En cours" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Archive" },
};

export const OutlineK1: Story = {
  args: { variant: "outline-k1", children: "Nouveau" },
};

export const Success: Story = {
  args: { variant: "success", children: "Livré" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "En attente" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Bloqué" },
};

export const Info: Story = {
  args: { variant: "info", children: "Bêta" },
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="tinted" dot>Nouveau</Badge>
      <Badge variant="success" dot>Livré</Badge>
      <Badge variant="warning" dot>En attente</Badge>
      <Badge variant="danger" dot>Bloqué</Badge>
      <Badge variant="info" dot>Bêta</Badge>
      <Badge variant="k1" dot>Branding</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge variant="k1" size="sm">Petite taille</Badge>
      <Badge variant="k1" size="md">Taille standard</Badge>
      <Badge variant="k1" size="lg">Grande taille</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="k1">Branding</Badge>
      <Badge variant="k2">Web Design</Badge>
      <Badge variant="k3">Développement</Badge>
      <Badge variant="tinted">Maintenance</Badge>
      <Badge variant="ink">Labs</Badge>
      <Badge variant="neutral">En cours</Badge>
      <Badge variant="ghost">Archive</Badge>
      <Badge variant="outline-k1">Nouveau</Badge>
      <Badge variant="success">Livré</Badge>
      <Badge variant="warning">En attente</Badge>
      <Badge variant="danger">Bloqué</Badge>
      <Badge variant="info">Bêta</Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Grille de catégories */}
      <div>
        <p className="text-[12px] text-[var(--color-fg-3)] mb-3 font-mono">
          Catégories de services
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="k1">Branding</Badge>
          <Badge variant="k2">Web Design</Badge>
          <Badge variant="k3">Développement</Badge>
          <Badge variant="tinted">Maintenance</Badge>
          <Badge variant="ink">Labs</Badge>
        </div>
      </div>
      {/* Tableau de statuts */}
      <div>
        <p className="text-[12px] text-[var(--color-fg-3)] mb-3 font-mono">
          Statuts de projets
        </p>
        <div className="border border-[var(--color-gray-k1)] rounded-[12px] overflow-hidden">
          {[
            { project: "Klyra — site vitrine", status: "Livré", variant: "success" as const },
            { project: "LocalPay — webapp", status: "En cours", variant: "neutral" as const },
            { project: "Refonte identité", status: "En attente", variant: "warning" as const },
            { project: "CRM sur mesure", status: "Bloqué", variant: "danger" as const },
          ].map((row) => (
            <div
              key={row.project}
              className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-gray-k1)] last:border-0"
            >
              <span className="text-[14px] text-[var(--color-ink)]">{row.project}</span>
              <Badge variant={row.variant} dot size="sm">{row.status}</Badge>
            </div>
          ))}
        </div>
      </div>
      {/* Chiffre clé avec badge */}
      <div className="flex items-center gap-3">
        <span className="text-[28px] font-semibold text-[var(--color-ink)] [letter-spacing:-0.0325em]">
          +20 entreprises nous font confiance
        </span>
        <Badge variant="tinted" size="sm">2026</Badge>
      </div>
    </div>
  ),
};
