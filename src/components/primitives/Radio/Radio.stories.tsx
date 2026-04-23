import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio, RadioGroup } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Primitives/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Bouton radio KLYRA — cercle 18px avec point blanc centré quand sélectionné. RadioGroup gère name + value partagés.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Single: Story = {
  render: () => <Radio value="single" label="Option unique" />,
};

export const Group: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState("standard");
    return (
      <RadioGroup name="delai" value={val} onValueChange={setVal}>
        <Radio value="starter" label="Starter" description="Délai indicatif : 2 jours ouvrés." />
        <Radio value="standard" label="Standard" description="Délai indicatif : 5 jours ouvrés." />
        <Radio value="premium" label="Premium" description="Délai indicatif : 10 jours ouvrés." />
      </RadioGroup>
    );
  },
};

export const RowOrientation: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState("vitrine");
    return (
      <RadioGroup name="type-row" value={val} onValueChange={setVal} orientation="row">
        <Radio value="vitrine" label="Site vitrine" />
        <Radio value="webapp" label="Outil métier" />
        <Radio value="refonte" label="Refonte" />
      </RadioGroup>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState("");
    return (
      <RadioGroup name="offre" value={val} onValueChange={setVal}>
        <Radio
          value="starter"
          label="Starter — 2 jours"
          description="Idéal pour une demande simple et bien définie."
        />
        <Radio
          value="standard"
          label="Standard — 5 jours"
          description="Notre formule la plus choisie par les PME."
        />
        <Radio
          value="premium"
          label="Premium — 10 jours"
          description="Accompagnement complet, itérations illimitées."
        />
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState("standard");
    return (
      <RadioGroup name="disabled-group" value={val} onValueChange={setVal} disabled>
        <Radio value="starter" label="Starter" />
        <Radio value="standard" label="Standard" />
        <Radio value="premium" label="Premium" />
      </RadioGroup>
    );
  },
};

export const InContext: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState("standard");
    return (
      <div className="w-[440px] p-6 bg-white border border-[var(--color-border-1)] rounded-[20px] flex flex-col gap-5">
        <div>
          <p className="text-[13px] font-medium tracking-[-0.01em]">Choisissez votre formule</p>
          <p className="text-[12px] text-[var(--color-fg-3)] mt-1">
            Toutes les formules incluent un support dédié après livraison.
          </p>
        </div>
        <RadioGroup name="pricing-ctx" value={val} onValueChange={setVal}>
          <Radio
            value="starter"
            label="Starter — 2 jours"
            description="Idéal pour les demandes courtes et bien cadrées."
          />
          <Radio
            value="standard"
            label="Standard — 5 jours"
            description="Notre formule la plus choisie par les PME."
          />
          <Radio
            value="premium"
            label="Premium — 10 jours"
            description="Accompagnement complet, itérations illimitées."
          />
        </RadioGroup>
        <p className="text-[11px] text-[var(--color-fg-3)]">
          Formule sélectionnée : <strong>{val}</strong>
        </p>
      </div>
    );
  },
};
