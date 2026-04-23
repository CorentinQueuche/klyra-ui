import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Case à cocher KLYRA — carré 18px, bg K1 quand cochée, état indeterminate supporté. Label + description optionnels.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const WithLabel: Story = {
  args: {
    label: "J'accepte la politique de confidentialité.",
    description: "Vos données ne seront jamais revendues ni partagées.",
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox disabled label="Option désactivée (non cochée)" />
      <Checkbox disabled checked label="Option désactivée (cochée)" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Checkbox size="sm" defaultChecked label="Petit (sm)" />
      <Checkbox size="md" defaultChecked label="Moyen (md)" />
      <Checkbox size="lg" defaultChecked label="Grand (lg)" />
    </div>
  ),
};

export const Group: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<string[]>(["newsletter"]);

    const toggle = (val: string) =>
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );

    return (
      <fieldset className="flex flex-col gap-4 border-none p-0 m-0">
        <legend className="text-[13px] font-medium tracking-[-0.01em] mb-2">
          Communications souhaitées
        </legend>
        {[
          {
            value: "newsletter",
            label: "Newsletter mensuelle",
            description: "Actualités, ressources et bonnes pratiques pour les PME.",
          },
          {
            value: "offres",
            label: "Offres et promotions",
            description: "Accédez en avant-première à nos nouvelles offres.",
          },
          {
            value: "rapports",
            label: "Rapports sectoriels",
            description: "Études et benchmarks publiés chaque trimestre.",
          },
        ].map((item) => (
          <Checkbox
            key={item.value}
            checked={selected.includes(item.value)}
            onCheckedChange={() => toggle(item.value)}
            label={item.label}
            description={item.description}
          />
        ))}
      </fieldset>
    );
  },
};
