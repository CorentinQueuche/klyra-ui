import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import { Eyebrow, BodyS } from "../Typography/Typography";

const meta: Meta<typeof Divider> = {
  title: "Primitives/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    tone: { control: "inline-radio", options: ["light", "dark"] },
    inset: { control: { type: "range", min: 0, max: 52, step: 4 } },
    thickness: { control: { type: "range", min: 1, max: 4, step: 1 } },
  },
  args: { orientation: "horizontal", tone: "light", inset: 0, thickness: 1 },
  parameters: {
    docs: {
      description: {
        component:
          "Hairline 1px qui sépare rows et colonnes — device signature du brand book KLYRA (#000 sur clair, #FFF/12% sur sombre).",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 640, padding: 16 }}>
      <BodyS>Au-dessus du filet.</BodyS>
      <Divider {...args} style={{ marginBlock: 16 }} />
      <BodyS>En dessous du filet.</BodyS>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 20, height: 48 }}>
      <Eyebrow>→ BRANDING</Eyebrow>
      <Divider {...args} />
      <Eyebrow>→ WEB DESIGN</Eyebrow>
      <Divider {...args} />
      <Eyebrow>→ DÉVELOPPEMENT</Eyebrow>
    </div>
  ),
};

export const OnDark: Story = {
  args: { tone: "dark" },
  parameters: { backgrounds: { default: "black" } },
  render: (args) => (
    <div style={{ width: 640, padding: 32, color: "#FFF" }}>
      <BodyS style={{ color: "rgba(255,255,255,0.85)" }}>Contenu sur fond noir.</BodyS>
      <Divider {...args} style={{ marginBlock: 16 }} />
      <BodyS style={{ color: "rgba(255,255,255,0.85)" }}>Filet blanc à 14% d&apos;opacité.</BodyS>
    </div>
  ),
};

export const Inset: Story = {
  args: { inset: 32 },
  render: (args) => (
    <div style={{ width: 640, padding: 16, background: "#FAFAFB", borderRadius: 12 }}>
      <BodyS>Haut du bloc</BodyS>
      <Divider {...args} style={{ marginBlock: 16 }} />
      <BodyS>Bas du bloc, avec 32 px d&apos;inset</BodyS>
    </div>
  ),
};
