import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Switch on/off pill. Track gris → K1 quand activé. Knob blanc avec shadow signature. Contrôlé ou non-contrôlé.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off: Story = {
  args: { checked: false },
};

export const On: Story = {
  args: { checked: true },
};

export const WithLabel: Story = {
  args: {
    label: "Recevoir les notifications",
    description: "Vous serez informé de chaque mise à jour de votre projet.",
    defaultChecked: false,
  },
};

export const LabelLeft: Story = {
  args: {
    label: "Mode sombre",
    labelPosition: "left",
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Toggle size="sm" defaultChecked label="Petit (sm)" />
      <Toggle size="md" defaultChecked label="Moyen (md)" />
      <Toggle size="lg" defaultChecked label="Grand (lg)" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle disabled label="Désactivé (off)" />
      <Toggle disabled checked label="Désactivé (on)" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [prefs, setPrefs] = useState({
      notifications: true,
      newsletter: false,
      darkMode: false,
      autosave: true,
    });

    const toggle = (key: keyof typeof prefs) =>
      setPrefs((p) => ({ ...p, [key]: !p[key] }));

    return (
      <div className="w-[420px] p-6 bg-white border border-[var(--color-border-1)] rounded-[20px] flex flex-col gap-5">
        <p className="text-[14px] font-medium tracking-[-0.02em]">Préférences du compte</p>
        <div className="flex flex-col gap-4">
          <Toggle
            checked={prefs.notifications}
            onCheckedChange={() => toggle("notifications")}
            label="Recevoir les notifications"
            description="Alertes en temps réel pour les actions importantes."
          />
          <Toggle
            checked={prefs.newsletter}
            onCheckedChange={() => toggle("newsletter")}
            label="Newsletter mensuelle"
            description="Ressources et actualités pour les PME."
          />
          <Toggle
            checked={prefs.darkMode}
            onCheckedChange={() => toggle("darkMode")}
            label="Mode sombre"
            description="Réduit la fatigue visuelle en environnement sombre."
          />
          <Toggle
            checked={prefs.autosave}
            onCheckedChange={() => toggle("autosave")}
            label="Sauvegarde automatique"
            description="Vos modifications sont enregistrées toutes les 30 secondes."
          />
        </div>
      </div>
    );
  },
};
