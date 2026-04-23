import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Avatar KLYRA — carré arrondi (radius 8) avec gradient K1→K2 et initiales blanches. Supporte image, initiales, groupe avec overlap et débordement.",
      },
    },
  },
  argTypes: {
    size:     { control: "select", options: ["sm", "md", "lg", "xl", "2xl"] },
    shape:    { control: "select", options: ["rounded", "circle"] },
    gradient: { control: "boolean" },
  },
  args: {
    initials: "CQ",
    size:     "md",
    shape:    "rounded",
    gradient: true,
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: { initials: "CQ", size: "lg" },
};

export const Image: Story = {
  args: {
    src: "https://i.pravatar.cc/80",
    alt: "Corentin Queuche",
    size: "lg",
  },
};

export const Circle: Story = {
  args: { initials: "KD", shape: "circle", size: "lg" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
      {(["sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Avatar initials="KD" size={size} />
          <span style={{ fontSize: 11, color: "rgba(0,0,0,0.5)" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup overflow={8} size="md">
      <Avatar initials="CQ" />
      <Avatar initials="ML" />
      <Avatar initials="AB" />
      <Avatar initials="PD" />
    </AvatarGroup>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar initials="CQ" size="xl" shape="rounded" />
        <Avatar initials="KD" size="xl" shape="circle" />
        <Avatar src="https://i.pravatar.cc/56" alt="Avatar" size="xl" shape="rounded" />
        <Avatar src="https://i.pravatar.cc/56?img=5" alt="Avatar" size="xl" shape="circle" />
        <Avatar initials="PM" size="xl" gradient={false} />
      </div>
      <AvatarGroup overflow={12} size="lg">
        <Avatar initials="+20" />
        <Avatar initials="ML" />
        <Avatar initials="AB" />
        <Avatar src="https://i.pravatar.cc/40" alt="Avatar" />
      </AvatarGroup>
    </div>
  ),
};
