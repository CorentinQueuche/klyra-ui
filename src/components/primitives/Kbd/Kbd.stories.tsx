import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "./Kbd";

const meta: Meta<typeof Kbd> = {
  title: "Primitives/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Indicateur de raccourci clavier en police monospace. Utilisé dans les topbars, tooltips et raccourcis de commande (ex. ⌘K pour la palette de commandes).",
      },
    },
  },
  argTypes: {
    onDark: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "⌘K",
    onDark: false,
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

/* ---- Stories individuelles ------------------------------------------ */

export const Default: Story = {
  args: {
    children: "⌘K",
  },
};

export const OnDark: Story = {
  args: {
    children: "⌘K",
    onDark: true,
  },
  parameters: {
    backgrounds: { default: "black" },
  },
};

export const Combo: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Sur fond clair */}
      <div className="flex flex-col gap-3">
        <p className="text-[12px] text-[var(--color-fg-3)] font-mono">Sur fond clair</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Recherche globale", keys: ["⌘", "K"] },
            { label: "Nouveau projet", keys: ["⌘", "N"] },
            { label: "Sauvegarder", keys: ["⌘", "S"] },
            { label: "Copier", keys: ["⌘", "C"] },
            { label: "Coller", keys: ["⌘", "V"] },
            { label: "Annuler", keys: ["⌘", "Z"] },
          ].map(({ label, keys }) => (
            <div key={label} className="flex items-center justify-between gap-4 max-w-xs">
              <span className="text-[13px] text-[var(--color-fg-2)]">{label}</span>
              <span className="flex items-center gap-1">
                {keys.map((k, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <Kbd>{k}</Kbd>
                    {i < keys.length - 1 && (
                      <span className="text-[10px] text-[var(--color-fg-3)] font-mono">+</span>
                    )}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const InTopbar: Story = {
  render: () => (
    <div
      className="flex items-center justify-between px-4 h-12 rounded-[10px]"
      style={{ background: "#000" }}
    >
      <span className="text-[13px] text-white font-medium">Klyra Command Center</span>
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-[rgba(255,255,255,0.5)]">Rechercher</span>
        <div className="flex items-center gap-0.5">
          <Kbd onDark>⌘</Kbd>
          <Kbd onDark>K</Kbd>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "black" },
  },
};
