import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";
import { Field } from "../Field/Field";

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Zone de texte multi-lignes. Mêmes variants et states que Input. Option autoGrow pour s'ajuster au contenu.",
      },
    },
  },
  args: {
    variant: "outline",
    size: "md",
    rows: 4,
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Parlez-nous de votre projet…",
  },
};

export const AutoGrow: Story = {
  args: {
    autoGrow: true,
    placeholder: "Commencez à écrire — le champ s'adapte au contenu.",
    defaultValue: "Refonte du site marketing + outil interne de gestion des devis.",
  },
};

export const WithError: Story = {
  render: () => (
    <Field
      label="Parlez-nous de votre projet"
      error="Ce champ est obligatoire pour traiter votre demande."
      required
    >
      <Textarea aria-invalid="true" placeholder="Décrivez votre besoin…" />
    </Field>
  ),
};

export const Dark: Story = {
  parameters: { backgrounds: { default: "black" } },
  render: () => (
    <div className="p-8 rounded-[20px]" style={{ background: "#000", boxShadow: "0 0 80px 30px rgba(0,63,228,0.15)" }}>
      <Textarea
        tone="dark"
        placeholder="Décrivez votre projet en quelques lignes…"
        rows={5}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Ce contenu n'est pas modifiable.",
  },
};
