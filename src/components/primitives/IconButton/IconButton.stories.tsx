import type { Meta, StoryObj } from "@storybook/react";
import {
  Bell,
  Search,
  Settings,
  Plus,
  X,
  ChevronRight,
  LayoutGrid,
  Bookmark,
} from "lucide-react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Primitives/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Bouton icône carré (radius 10px) pour actions de navbar, topbar ou toolbar. La prop `ariaLabel` est obligatoire pour l'accessibilité.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "subtle", "ghost", "primary", "ghost-dark"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    icon: <Bell size={16} />,
    ariaLabel: "Notifications",
    variant: "outline",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/* ---- Stories individuelles ------------------------------------------ */

export const Outline: Story = {
  args: {
    variant: "outline",
    icon: <Bell size={16} />,
    ariaLabel: "Notifications",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    icon: <Search size={16} />,
    ariaLabel: "Rechercher",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    icon: <Settings size={16} />,
    ariaLabel: "Paramètres",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <Plus size={16} />,
    ariaLabel: "Ajouter",
  },
};

export const GhostOnDark: Story = {
  args: {
    variant: "ghost-dark",
    icon: <Search size={16} />,
    ariaLabel: "Rechercher",
  },
  parameters: {
    backgrounds: { default: "black" },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <IconButton size="sm" icon={<Bell size={14} />} ariaLabel="Notifications (sm)" variant="outline" />
      <IconButton size="md" icon={<Bell size={16} />} ariaLabel="Notifications (md)" variant="outline" />
      <IconButton size="lg" icon={<Bell size={18} />} ariaLabel="Notifications (lg)" variant="outline" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3 items-center">
        <IconButton variant="outline" icon={<Bell size={16} />} ariaLabel="Notifications" />
        <IconButton variant="subtle" icon={<Search size={16} />} ariaLabel="Rechercher" />
        <IconButton variant="ghost" icon={<Settings size={16} />} ariaLabel="Paramètres" />
        <IconButton variant="primary" icon={<Plus size={16} />} ariaLabel="Ajouter" />
      </div>
      <div className="flex gap-3 items-center p-4 rounded-[12px]" style={{ background: "#000" }}>
        <IconButton variant="ghost-dark" icon={<LayoutGrid size={16} />} ariaLabel="Vue grille" />
        <IconButton variant="ghost-dark" icon={<Bookmark size={16} />} ariaLabel="Sauvegarder" />
        <IconButton variant="primary" icon={<Plus size={16} />} ariaLabel="Nouveau projet" />
      </div>
    </div>
  ),
};

export const OnDark: Story = {
  render: () => (
    <div className="flex gap-3 items-center p-6 rounded-[12px]" style={{ background: "#000" }}>
      <IconButton variant="ghost-dark" icon={<Bell size={16} />} ariaLabel="Notifications" />
      <IconButton variant="ghost-dark" icon={<Search size={16} />} ariaLabel="Rechercher" />
      <IconButton variant="primary" icon={<Plus size={16} />} ariaLabel="Ajouter" />
      <IconButton variant="ghost-dark" icon={<X size={16} />} ariaLabel="Fermer" />
      <IconButton variant="ghost-dark" icon={<ChevronRight size={16} />} ariaLabel="Suivant" />
    </div>
  ),
  parameters: {
    backgrounds: { default: "black" },
  },
};
