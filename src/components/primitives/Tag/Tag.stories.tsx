"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Briefcase, Globe } from "lucide-react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Primitives/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Chip interactif avec suppression optionnelle (bouton X). Idéal pour les filtres, sélections multiples et taxonomies de contenu.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "solid", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Branding",
    variant: "default",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

/* ---- Stories individuelles ------------------------------------------ */

export const Default: Story = {
  args: {
    variant: "default",
    children: "Branding",
  },
};

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Web Design",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Développement",
  },
};

export const Removable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag onRemove={() => {}}>Branding</Tag>
      <Tag variant="solid" onRemove={() => {}}>Web Design</Tag>
      <Tag variant="outline" onRemove={() => {}}>Développement</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag leftIcon={<Briefcase size={12} />}>Identité de marque</Tag>
      <Tag leftIcon={<Globe size={12} />} variant="solid">Site vitrine</Tag>
      <Tag leftIcon={<Globe size={12} />} variant="outline" onRemove={() => {}}>
        Maintenance
      </Tag>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Tag variant="default">Branding</Tag>
        <Tag variant="solid">Web Design</Tag>
        <Tag variant="outline">Développement</Tag>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag variant="default" size="sm">Branding</Tag>
        <Tag variant="solid" size="sm">Web Design</Tag>
        <Tag variant="outline" size="sm">Développement</Tag>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag variant="default" onRemove={() => {}}>Branding</Tag>
        <Tag variant="solid" onRemove={() => {}}>Web Design</Tag>
        <Tag variant="outline" onRemove={() => {}}>Développement</Tag>
        <Tag variant="default" disabled>Désactivé</Tag>
      </div>
    </div>
  ),
};

function InteractiveDemoComponent() {
  const all = ["Branding", "Web Design", "Développement", "Maintenance", "Labs", "SEO"];
  const [selected, setSelected] = useState<string[]>(["Branding", "Web Design"]);

  function toggle(label: string) {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-[var(--color-fg-2)]">
        Filtres actifs — cliquer pour ajouter / supprimer :
      </p>
      {/* Tags actifs */}
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {selected.length === 0 && (
          <span className="text-[13px] text-[var(--color-fg-3)] italic">Aucun filtre sélectionné</span>
        )}
        {selected.map((label) => (
          <Tag key={label} variant="solid" onRemove={() => toggle(label)}>
            {label}
          </Tag>
        ))}
      </div>
      {/* Palette disponible */}
      <div className="flex flex-wrap gap-2">
        {all.map((label) => (
          <Tag
            key={label}
            variant={selected.includes(label) ? "default" : "outline"}
            onClick={() => toggle(label)}
            style={{ cursor: "pointer" }}
          >
            {label}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
  parameters: {
    docs: {
      description: {
        story: "Démonstration interactive : cliquer un tag pour l'activer / désactiver, cliquer le X pour le retirer.",
      },
    },
  },
};
