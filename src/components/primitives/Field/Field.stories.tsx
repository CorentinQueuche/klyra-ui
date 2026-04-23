import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "./Field";
import { Input } from "../Input/Input";

const meta: Meta<typeof Field> = {
  title: "Primitives/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Wrapper layout qui associe un label, un texte d'aide et un message d'erreur à n'importe quel input.",
      },
    },
  },
  args: {
    label: "Nom complet",
  },
};
export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <Input placeholder="Corentin Queuche" />
    </Field>
  ),
};

export const WithHelp: Story = {
  args: {
    label: "Email pro",
    helpText: "Nous utilisons cet email uniquement pour vous répondre.",
  },
  render: (args) => (
    <Field {...args}>
      <Input type="email" placeholder="vous@entreprise.fr" />
    </Field>
  ),
};

export const WithError: Story = {
  args: {
    label: "Email pro",
    error: "Ce champ est obligatoire.",
  },
  render: (args) => (
    <Field {...args}>
      <Input type="email" placeholder="vous@entreprise.fr" />
    </Field>
  ),
};

export const Required: Story = {
  args: {
    label: "Nom complet",
    required: true,
    helpText: "Tel qu'il apparaîtra sur vos livrables.",
  },
  render: (args) => (
    <Field {...args}>
      <Input placeholder="Corentin Queuche" />
    </Field>
  ),
};

export const SrOnly: Story = {
  args: {
    label: "Recherche",
    srOnly: true,
  },
  render: (args) => (
    <Field {...args}>
      <Input variant="subtle" placeholder="Rechercher un client, un devis…" />
    </Field>
  ),
};
