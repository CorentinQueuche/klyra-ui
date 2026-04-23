import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { Field } from "../Field/Field";

const OFFERS = [
  { label: "Site vitrine (10 000 €)", value: "vitrine" },
  { label: "Refonte + branding (12 000 €)", value: "refonte" },
  { label: "Outil métier sur mesure (18–35 000 €)", value: "webapp" },
];

const BUDGET = [
  { label: "Moins de 10 000 €", value: "lt10k" },
  { label: "10 000 – 20 000 €", value: "10k-20k" },
  { label: "Plus de 20 000 €", value: "gt20k" },
];

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select natif stylisé — apparence cohérente avec Input. Supporte options structurées ou children.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Outline: Story = {
  args: {
    options: OFFERS,
    placeholder: "Choisissez une offre…",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    options: BUDGET,
    placeholder: "Budget estimé",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[340px]">
      <Select size="sm" options={OFFERS} placeholder="Petit (sm)" />
      <Select size="md" options={OFFERS} placeholder="Moyen (md) — défaut" />
      <Select size="lg" options={OFFERS} placeholder="Grand (lg)" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    options: OFFERS,
    defaultValue: "vitrine",
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: OFFERS,
    placeholder: "Sélectionnez une offre…",
    defaultValue: "",
  },
};

export const Dark: Story = {
  parameters: { backgrounds: { default: "black" } },
  render: () => (
    <div className="p-8 rounded-[20px] w-[360px]" style={{ background: "#000", boxShadow: "0 0 80px 30px rgba(0,63,228,0.15)" }}>
      <Select tone="dark" options={OFFERS} placeholder="Type de projet…" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <form className="flex flex-col gap-5 w-[400px] p-6 bg-white border border-[var(--color-border-1)] rounded-[20px]">
      <p className="text-[13px] font-medium tracking-[-0.01em]">Votre projet en quelques mots</p>
      <Field label="Type de projet" required>
        <Select options={OFFERS} placeholder="Choisissez une offre…" />
      </Field>
      <Field label="Budget estimé" helpText="Indicatif — nous ajustons selon votre besoin.">
        <Select options={BUDGET} placeholder="Fourchette de budget…" />
      </Field>
    </form>
  ),
};
