import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar, type SidebarSection } from "./Sidebar";
import { TopBar } from "../TopBar/TopBar";

/* ------------------------------------------------------------------ */
/*  Icon helpers (inline SVG — 18px, stroke-only)                      */
/* ------------------------------------------------------------------ */

const commonSvg = {
  width: 18,
  height: 18,
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const HomeIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <path d="M3 10l7-6 7 6v8a1 1 0 0 1-1 1h-4v-6h-4v6H4a1 1 0 0 1-1-1z" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <path d="M5 3h7l4 4v13H5z" />
    <path d="M12 3v4h4" />
  </svg>
);

const BagIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <path d="M5 7h10l1 12H4z" />
    <path d="M8 7a2 2 0 0 1 4 0" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <path d="M4 17V7M10 17v-6M16 17V4" />
  </svg>
);

const SparkIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <path d="M10 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <circle cx="10" cy="10" r="3" />
    <path d="M10 2v2m0 12v2M2 10h2m12 0h2M4.2 4.2l1.4 1.4m9 9l1.4 1.4M4.2 15.8l1.4-1.4m9-9l1.4-1.4" />
  </svg>
);

const LayersIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <path d="M10 2L2 7l8 5 8-5-8-5zM2 12l8 5 8-5M2 17l8 5 8-5" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <path d="M11 2L4 11h7l-2 7 9-9h-7l2-7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 20 20" {...commonSvg}>
    <path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Default sections (prototype-exact)                                  */
/* ------------------------------------------------------------------ */

const defaultSections: SidebarSection[] = [
  {
    title: "Pilotage",
    items: [
      { icon: <HomeIcon />, label: "Tableau de bord", href: "#", active: false },
      { icon: <DocumentIcon />, label: "Devis", href: "#" },
      { icon: <BagIcon />, label: "Clients", href: "#" },
      { icon: <ChartIcon />, label: "Statistiques", href: "#" },
      { icon: <SparkIcon />, label: "Automatisations", href: "#" },
      { icon: <GearIcon />, label: "Paramètres", href: "#" },
    ],
  },
];

const multiSections: SidebarSection[] = [
  {
    title: "Pilotage",
    items: [
      { icon: <HomeIcon />, label: "Tableau de bord", href: "#" },
      { icon: <DocumentIcon />, label: "Devis", href: "#" },
      { icon: <BagIcon />, label: "Clients", href: "#" },
    ],
  },
  {
    title: "Automatisations",
    items: [
      { icon: <SparkIcon />, label: "Séquences", href: "#" },
      { icon: <LayersIcon />, label: "Modèles", href: "#" },
      { icon: <BoltIcon />, label: "Déclencheurs", href: "#" },
    ],
  },
  {
    title: "Admin",
    items: [
      { icon: <ShieldIcon />, label: "Sécurité", href: "#" },
      { icon: <GearIcon />, label: "Paramètres", href: "#" },
    ],
  },
];

const defaultTenant = {
  label: "Dubois & Cie",
  plan: "Plan Pro",
  avatarInitials: "DB",
};

const defaultFooterCta = {
  eyebrow: "Besoin d'aide ?",
  label: "Un accompagnement mensuel par Klyra.",
  button: { label: "Prendre rendez-vous", href: "#" },
};

/* ------------------------------------------------------------------ */
/*  Meta                                                                */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof Sidebar> = {
  title: "Composed/Webapp/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sidebar webapp 240px. Logo row 64px aligné avec le TopBar. Active item avec accent bar K1.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "100vh", background: "#FAFAFB" }}>
        <Story />
        <div style={{ flex: 1 }} />
      </div>
    ),
  ],
  args: {
    sections: defaultSections,
    tenant: defaultTenant,
    footerCta: defaultFooterCta,
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/* ------------------------------------------------------------------ */
/*  Stories                                                             */
/* ------------------------------------------------------------------ */

export const Default: Story = {};

export const Collapsed: Story = {
  args: { collapsed: true },
  parameters: {
    docs: {
      description: { story: "Mode icon-only — sidebar réduite à 64px." },
    },
  },
};

export const MultipleSections: Story = {
  args: {
    sections: multiSections,
  },
  parameters: {
    docs: {
      description: { story: "Trois sections : Pilotage, Automatisations, Admin." },
    },
  },
};

export const WithBadges: Story = {
  args: {
    sections: [
      {
        title: "Pilotage",
        items: [
          { icon: <HomeIcon />, label: "Tableau de bord", href: "#" },
          { icon: <DocumentIcon />, label: "Devis", href: "#", badge: "12" },
          { icon: <BagIcon />, label: "Clients", href: "#", badge: "3" },
          { icon: <ChartIcon />, label: "Statistiques", href: "#" },
          { icon: <SparkIcon />, label: "Automatisations", href: "#" },
          { icon: <GearIcon />, label: "Paramètres", href: "#" },
        ],
      },
    ],
  },
};

export const WithoutTenant: Story = {
  args: { tenant: undefined },
};

export const WithoutFooterCta: Story = {
  args: { footerCta: undefined },
};

export const WithActiveState: Story = {
  args: {
    sections: [
      {
        title: "Pilotage",
        items: [
          { icon: <HomeIcon />, label: "Tableau de bord", href: "#" },
          { icon: <DocumentIcon />, label: "Devis", href: "#" },
          { icon: <BagIcon />, label: "Clients", href: "#", active: true },
          { icon: <ChartIcon />, label: "Statistiques", href: "#" },
          { icon: <SparkIcon />, label: "Automatisations", href: "#" },
          { icon: <GearIcon />, label: "Paramètres", href: "#" },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "3e item actif — accent bar K1 alignée au bord gauche, bg bleu atténué.",
      },
    },
  },
};

/** Sidebar + TopBar côte à côte — démontre l'alignement exact des dividers à 64px */
export const InContext: Story = {
  decorators: [
    () => (
      <div style={{ display: "flex", height: "100vh", background: "#FAFAFB" }}>
        <Sidebar
          sections={defaultSections}
          tenant={defaultTenant}
          footerCta={defaultFooterCta}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <TopBar
            title="Bonjour Corentin"
            actions={
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.4)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                header slot
              </span>
            }
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(0,0,0,0.35)",
              fontSize: 13,
            }}
          >
            Contenu principal — les bordures horizontales de la Sidebar et du TopBar s'alignent exactement à 64px.
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Sidebar + TopBar en contexte réel. Le divider du logo row et le border-bottom du TopBar sont alignés à la même hauteur (64px).",
      },
    },
  },
};
