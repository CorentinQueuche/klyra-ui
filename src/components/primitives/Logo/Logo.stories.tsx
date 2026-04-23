import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Primitives/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["original", "dark", "white", "wordmark", "mark"] },
    height: { control: { type: "range", min: 16, max: 96, step: 2 } },
  },
  args: { variant: "original", height: 32 },
  parameters: {
    docs: {
      description: {
        component:
          "Logo KLYRA — 5 lockups. `original` (K Bleu K1 + wordmark noir) = défaut. `white` / `wordmark` uniquement sur fond sombre. Le K-mark doit contraster ≥ 60% avec son fond.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Logo>;

export const Original: Story = { args: { variant: "original" } };
export const Dark: Story = { args: { variant: "dark" } };
export const White: Story = {
  args: { variant: "white" },
  parameters: { backgrounds: { default: "black" } },
  render: (args) => (
    <div style={{ padding: 32, background: "#000" }}>
      <Logo {...args} />
    </div>
  ),
};
export const Wordmark: Story = {
  args: { variant: "wordmark" },
  render: (args) => (
    <div style={{ padding: 32, background: "#000" }}>
      <Logo {...args} />
    </div>
  ),
};
export const Mark: Story = { args: { variant: "mark", height: 48 } };

export const AllLockups: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <Swatch bg="#FFFFFF">
        <Logo variant="original" height={32} />
      </Swatch>
      <Swatch bg="#FFFFFF">
        <Logo variant="dark" height={32} />
      </Swatch>
      <Swatch bg="#000000">
        <Logo variant="white" height={32} />
      </Swatch>
      <Swatch bg="linear-gradient(180deg,#003FE4 0%,#000 100%)">
        <Logo variant="white" height={32} />
      </Swatch>
      <Swatch bg="#000000">
        <Logo variant="wordmark" height={28} />
      </Swatch>
      <Swatch bg="#FFFFFF">
        <Logo variant="mark" height={48} />
      </Swatch>
    </div>
  ),
};

function Swatch({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 32, background: bg, borderRadius: 12 }}>{children}</div>
  );
}
