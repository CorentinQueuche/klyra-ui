import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Phone, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { Arrow } from "../Arrow/Arrow";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pill CTA signature KLYRA. Variants primary, dark, white, ghost, ghost-dark, link, link-dark. Utiliser `asChild` pour rendre un élément `<a>` (next/link compatible).",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "dark", "white", "ghost", "ghost-dark", "link", "link-dark"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    children: "Prendre rendez-vous",
    variant: "primary",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ---- Stories individuelles ------------------------------------------ */

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Prendre rendez-vous",
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    children: "Voir nos réalisations",
  },
};

export const White: Story = {
  args: {
    variant: "white",
    children: "Nos réalisations",
  },
  parameters: {
    backgrounds: { default: "black" },
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "En savoir plus",
  },
};

export const GhostOnDark: Story = {
  args: {
    variant: "ghost-dark",
    children: "Démo produit",
  },
  parameters: {
    backgrounds: { default: "black" },
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Consulter les créneaux",
    iconRight: <Arrow direction="up-right" size={10} />,
  },
};

export const LinkOnDark: Story = {
  args: {
    variant: "link-dark",
    children: "Consulter les créneaux",
    iconRight: <Arrow direction="up-right" size={10} />,
  },
  parameters: {
    backgrounds: { default: "black" },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Taille sm</Button>
      <Button size="md">Taille md</Button>
      <Button size="lg">Taille lg</Button>
      <Button size="xl">Taille xl</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button iconLeft={<Mail size={16} />}>Nous contacter</Button>
      <Button iconRight={<ChevronRight size={16} />}>En savoir plus</Button>
      <Button iconLeft={<Phone size={16} />} iconRight={<ChevronRight size={16} />}>
        Réserver un appel
      </Button>
      <Button variant="ghost" iconLeft={<Mail size={16} />}>
        Nous écrire
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Envoi en cours…",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Prendre rendez-vous",
  },
};

export const AsLink: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button asChild href="https://klyra.fr" target="_blank" rel="noopener noreferrer">
        Visiter klyra.fr
      </Button>
      <Button
        asChild
        href="https://klyra.fr/realisations"
        variant="ghost"
        iconRight={<Arrow direction="up-right" size={10} />}
      >
        Voir nos réalisations
      </Button>
    </div>
  ),
};

export const OnDarkHalo: Story = {
  render: () => (
    <div
      className="relative flex flex-wrap gap-6 items-center justify-center p-16 overflow-hidden rounded-[20px]"
      style={{ background: "#000" }}
    >
      {/* Halos brand */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-60%)",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(0,63,228,0.45) 0%, rgba(0,63,228,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          right: "-10%",
          bottom: "-20%",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(1,164,255,0.3) 0%, rgba(1,164,255,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <Button variant="primary">Prendre rendez-vous</Button>
      <Button variant="white">Nos réalisations</Button>
      <Button variant="ghost-dark">Démo produit</Button>
      <Button variant="link-dark" iconRight={<Arrow direction="up-right" size={10} />}>
        Consulter les créneaux
      </Button>
    </div>
  ),
  parameters: {
    backgrounds: { default: "black" },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Sur fond clair */}
      <div>
        <p className="text-[12px] text-[var(--color-fg-3)] mb-4 font-mono tracking-wider">
          Sur fond clair
        </p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">Prendre rendez-vous</Button>
          <Button variant="dark">Voir nos offres</Button>
          <Button variant="ghost">En savoir plus</Button>
          <Button variant="link" iconRight={<Arrow direction="right" size={10} />}>
            Consulter les créneaux
          </Button>
        </div>
      </div>
      {/* Sur fond sombre */}
      <div
        className="p-8 rounded-[20px] flex flex-wrap gap-3 items-center"
        style={{ background: "#000" }}
      >
        <p className="w-full text-[12px] text-[rgba(255,255,255,0.45)] mb-1 font-mono tracking-wider">
          Sur fond sombre
        </p>
        <Button variant="primary">Prendre rendez-vous</Button>
        <Button variant="white">Nos réalisations</Button>
        <Button variant="ghost-dark">Démo produit</Button>
        <Button variant="link-dark" iconRight={<Arrow direction="right" size={10} />}>
          Consulter les créneaux
        </Button>
      </div>
    </div>
  ),
};
