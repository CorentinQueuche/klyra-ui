import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "./Nav";

const meta: Meta<typeof Nav> = {
  title: "Composed/Marketing/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Header de navigation marketing. Position absolute top pour se poser sur le fond du Hero. Supporte mobile (hamburger), breadcrumb (blogs/docs) et mode sticky.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    logoVariant: { control: "select", options: ["white", "original", "dark"] },
    onDark: { control: "boolean" },
    sticky: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Nav>;

/* ------------------------------------------------------------------ */
/* DefaultOnDark — fond deep gradient                                  */
/* ------------------------------------------------------------------ */
export const DefaultOnDark: Story = {
  parameters: {
    backgrounds: { default: "deep" },
  },
  args: {
    onDark: true,
    sticky: false,
  },
};

/* ------------------------------------------------------------------ */
/* OnLight — fond clair (paper)                                        */
/* ------------------------------------------------------------------ */
export const OnLight: Story = {
  parameters: {
    backgrounds: { default: "paper" },
  },
  args: {
    onDark: false,
    logoVariant: "dark",
    sticky: false,
  },
};

/* ------------------------------------------------------------------ */
/* Sticky — simulé visuellement (bg blur + border)                    */
/* ------------------------------------------------------------------ */
export const Sticky: Story = {
  parameters: {
    backgrounds: { default: "deep" },
  },
  args: {
    sticky: true,
    onDark: true,
  },
};

/* ------------------------------------------------------------------ */
/* LongLinks — 6 liens pour tester le débordement                     */
/* ------------------------------------------------------------------ */
export const LongLinks: Story = {
  parameters: {
    backgrounds: { default: "deep" },
  },
  args: {
    onDark: true,
    links: [
      { label: "Services", href: "#" },
      { label: "Réalisations", href: "#" },
      { label: "À propos", href: "#" },
      { label: "Labs", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Ressources", href: "#" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Mobile — hamburger visible                                          */
/* ------------------------------------------------------------------ */
export const Mobile: Story = {
  parameters: {
    backgrounds: { default: "deep" },
    viewport: { defaultViewport: "mobile" },
  },
  args: {
    onDark: true,
    sticky: false,
  },
};

/* ------------------------------------------------------------------ */
/* WithBreadcrumb — variante blog/doc avec fil d'Ariane               */
/* ------------------------------------------------------------------ */
export const WithBreadcrumb: Story = {
  parameters: {
    backgrounds: { default: "paper" },
  },
  args: {
    onDark: false,
    logoVariant: "dark",
    breadcrumb: [
      { label: "Accueil", href: "#" },
      { label: "Ressources", href: "#" },
      { label: "Comment choisir un outil métier" },
    ],
  },
};
