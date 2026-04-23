import type { Meta, StoryObj } from "@storybook/react";
import { GlassCard, GlassCardChart } from "./GlassCard";

/* Halo decorator */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #003FE4 0%, #000 100%)",
        borderRadius: 20,
        padding: "40px 24px 24px",
        overflow: "hidden",
        minHeight: 240,
      }}
    >
      {/* Halo K2 */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          top: -240,
          right: -120,
          background: "radial-gradient(50% 50% at 50% 50%, rgba(1,164,255,0.6), rgba(1,164,255,0))",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}

/* Pixel motif decorator */
function PixelStage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        background: "#000",
        borderRadius: 20,
        padding: "32px 24px",
        overflow: "hidden",
      }}
    >
      {/* Pixel pattern via repeating-linear-gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)",
          backgroundSize: "4px 4px",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}

const meta: Meta<typeof GlassCard> = {
  title: "Primitives/GlassCard",
  component: GlassCard,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "deep" },
    docs: {
      description: {
        component:
          "Panneau verre signature KLYRA — conçu pour surfaces sombres ou dégradées. Combine backdrop-filter blur, border translucide et inner-glow K1.",
      },
    },
  },
  argTypes: {
    blur:    { control: { type: "range", min: 4, max: 40, step: 2 } },
    padding: { control: { type: "range", min: 12, max: 40, step: 4 } },
    radius:  { control: { type: "range", min: 8, max: 32, step: 4 } },
  },
  args: {
    blur:    20,
    padding: 20,
    radius:  16,
  },
};
export default meta;
type Story = StoryObj<typeof GlassCard>;

export const Default: Story = {
  render: (args) => (
    <Stage>
      <GlassCard {...args}>
        <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.02em" }}>Klyra Design — 2026</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
          Des outils aussi performants que ceux des grandes entreprises — sans la complexité.
        </div>
      </GlassCard>
    </Stage>
  ),
};

export const WithChart: Story = {
  render: () => (
    <Stage>
      <GlassCardChart />
    </Stage>
  ),
};

export const Compact: Story = {
  args: { padding: 12, radius: 12 },
  render: (args) => (
    <Stage>
      <GlassCard {...args} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.03em" }}>8 547 €</div>
        <div style={{ fontSize: 12, color: "var(--color-k3)", fontWeight: 500 }}>+32% vs. M-1</div>
      </GlassCard>
    </Stage>
  ),
};

export const OnPixelMotif: Story = {
  render: () => (
    <PixelStage>
      <GlassCard>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)", letterSpacing: "0.03em", textTransform: "uppercase" }}>
          Évolution des ventes
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 8 }}>8 547 €</div>
        <div style={{ fontSize: 13, color: "var(--color-k3)", fontWeight: 500 }}>+32% vs. M-1</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
          Dashboard client · webapp sur mesure
        </div>
      </GlassCard>
    </PixelStage>
  ),
};
