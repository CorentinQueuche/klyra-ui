import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Primitives/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Breadcrumb — fil d'Ariane style KLYRA. Police monospace eyebrow, séparateur `→` (motif typographique brand), dernier item = page courante (`aria-current=\"page\"`).",
      },
    },
    backgrounds: { default: "white" },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/** Deux niveaux — cas minimal. */
export const TwoLevels: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item>Outils</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

/** Quatre niveaux — navigation profonde. */
export const FourLevels: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item href="/outils">Outils</Breadcrumb.Item>
      <Breadcrumb.Item href="/outils/webapps">Web apps</Breadcrumb.Item>
      <Breadcrumb.Item>Simulateur de semaine</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

/** Dernier item sans href — page courante mise en évidence. */
export const Current: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
      <Breadcrumb.Item href="/realisations">Réalisations</Breadcrumb.Item>
      <Breadcrumb.Item>Boulangerie Martin</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

/** Sur fond sombre — couleurs adaptées manuellement. */
export const OnDark: Story = {
  render: () => (
    <div style={{ padding: 24, background: "#000", display: "inline-block", borderRadius: 12 }}>
      <Breadcrumb>
        <Breadcrumb.Item
          href="/"
          style={{ color: "rgba(255,255,255,0.55)" } as React.CSSProperties}
        >
          <a
            href="/"
            style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-k2)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
          >
            Accueil
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/outils">Outils</Breadcrumb.Item>
        <Breadcrumb.Item>Diagnostic PME</Breadcrumb.Item>
      </Breadcrumb>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace", marginTop: 8 }}>
        Note : les couleurs on-dark nécessitent un override via className ou style.
      </p>
    </div>
  ),
  parameters: { backgrounds: { default: "black" } },
};
