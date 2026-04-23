import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Primitives/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    tone: { control: "inline-radio", options: ["light", "dark"] },
    fullWidth: { control: "boolean" },
  },
  args: {
    size: "md",
    tone: "light",
    options: [
      { label: "7J", value: "7d" },
      { label: "30J", value: "30d" },
      { label: "3M", value: "3m" },
      { label: "1A", value: "1y" },
    ],
    defaultValue: "30d",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Segmented pill — sélecteur de période du Dashboard KLYRA. Active tab : bg blanc + shadow-sm + texte K1. Controlled (`value` + `onValueChange`) ou uncontrolled (`defaultValue`).",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ width: 560 }}>
      <Tabs {...args} />
    </div>
  ),
};

export const OnDark: Story = {
  args: { tone: "dark" },
  parameters: { backgrounds: { default: "black" } },
  render: (args) => (
    <div style={{ padding: 32, background: "#000" }}>
      <Tabs {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
      <Tabs
        size="sm"
        options={[
          { label: "7J", value: "7d" },
          { label: "30J", value: "30d" },
          { label: "3M", value: "3m" },
          { label: "1A", value: "1y" },
        ]}
        defaultValue="30d"
      />
      <Tabs
        size="md"
        options={[
          { label: "7J", value: "7d" },
          { label: "30J", value: "30d" },
          { label: "3M", value: "3m" },
          { label: "1A", value: "1y" },
        ]}
        defaultValue="30d"
      />
      <Tabs
        size="lg"
        options={[
          { label: "7J", value: "7d" },
          { label: "30J", value: "30d" },
          { label: "3M", value: "3m" },
          { label: "1A", value: "1y" },
        ]}
        defaultValue="30d"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState("30d");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Tabs
            value={value}
            onValueChange={setValue}
            options={[
              { label: "7J", value: "7d" },
              { label: "30J", value: "30d" },
              { label: "3M", value: "3m" },
              { label: "1A", value: "1y" },
            ]}
          />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
            Valeur sélectionnée : <b>{value}</b>
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { label: "Vue liste", value: "list" },
      { label: "Vue grille", value: "grid" },
      { label: "Vue calendrier", value: "calendar", disabled: true },
    ],
    defaultValue: "list",
  },
};

export const InContextChart: Story = {
  name: "In context · sélecteur période",
  render: () => (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E0E0E0",
        borderRadius: 14,
        padding: "18px 20px",
        width: 560,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
            Chiffre d&apos;affaires · 30 derniers jours
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.03em", marginTop: 4 }}>
            8 547 €
          </div>
        </div>
        <Tabs
          options={[
            { label: "7J", value: "7d" },
            { label: "30J", value: "30d" },
            { label: "3M", value: "3m" },
            { label: "1A", value: "1y" },
          ]}
          defaultValue="30d"
        />
      </div>
    </div>
  ),
};
