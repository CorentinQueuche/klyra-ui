import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "./TopBar";
import { Sidebar } from "../Sidebar/Sidebar";
import { IconButton } from "../../../primitives/IconButton/IconButton";
import { Button } from "../../../primitives/Button/Button";

/* ------------------------------------------------------------------ */
/*  Default sections for context stories                               */
/* ------------------------------------------------------------------ */

function HomeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10l7-6 7 6v8a1 1 0 0 1-1 1h-4v-6h-4v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="3" />
      <path d="M10 2v2m0 12v2M2 10h2m12 0h2M4.2 4.2l1.4 1.4m9 9l1.4 1.4M4.2 15.8l1.4-1.4m9-9l1.4-1.4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Meta                                                                */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof TopBar> = {
  title: "Composed/Webapp/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Header webapp 64px. Barre de recherche subtile, shortcut Kbd, slot actions. Border-bottom alignée avec le logo row de la Sidebar.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#FAFAFB", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Bonjour Corentin",
    eyebrow: "TABLEAU DE BORD",
  },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

/* ------------------------------------------------------------------ */
/*  Stories                                                             */
/* ------------------------------------------------------------------ */

export const Default: Story = {};

export const WithNotifications: Story = {
  args: {
    notificationsCount: 3,
  },
  parameters: {
    docs: {
      description: { story: "Dot rouge sur la cloche — 3 notifications en attente." },
    },
  },
};

export const NoSearch: Story = {
  args: {
    searchPlaceholder: "",
    actions: (
      <Button variant="primary" size="sm" iconLeft={<PlusIcon />}>
        Nouveau devis
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: { story: "TopBar sans barre de recherche." },
    },
  },
};

export const NoActions: Story = {
  args: {
    actions: null,
  },
  parameters: {
    docs: {
      description: { story: "TopBar sans slot actions — titre seul." },
    },
  },
};

export const CustomActions: Story = {
  args: {
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <IconButton
          icon={<SettingsIcon />}
          ariaLabel="Paramètres"
          variant="outline"
        />
        <Button variant="primary" size="sm">
          Exporter
        </Button>
      </div>
    ),
  },
};

/** TopBar + Sidebar côte à côte — démontre l'alignement des dividers */
export const InContextWithSidebar: Story = {
  decorators: [
    () => (
      <div style={{ display: "flex", height: "100vh", background: "#FAFAFB" }}>
        <Sidebar
          sections={[
            {
              title: "Pilotage",
              items: [
                { icon: <HomeIcon />, label: "Tableau de bord", href: "#", active: true },
                { icon: <SettingsIcon />, label: "Paramètres", href: "#" },
              ],
            },
          ]}
          tenant={{ label: "Dubois & Cie", plan: "Plan Pro", avatarInitials: "DB" }}
          footerCta={{
            eyebrow: "Besoin d'aide ?",
            label: "Un accompagnement mensuel par Klyra.",
            button: { label: "Prendre rendez-vous", href: "#" },
          }}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <TopBar title="Bonjour Corentin" notificationsCount={2} />
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
            Zone de contenu principale
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Sidebar et TopBar combinés — les border-bottom s'alignent à 64px (signature brand book).",
      },
    },
  },
};
