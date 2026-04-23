import type { Meta, StoryObj } from "@storybook/react";
import { DashboardShell, type DashboardTask, type DashboardTableRow } from "./DashboardShell";
import type { StatCardProps } from "../../../primitives/StatCard/StatCard";

/* ------------------------------------------------------------------ */
/*  Prototype data (KLYRA exact)                                        */
/* ------------------------------------------------------------------ */

const defaultStats: StatCardProps[] = [
  {
    label: "Chiffre d'affaires",
    value: "8 547 €",
    delta: "+32%",
    trend: "up",
    sparkline: [0.3, 0.45, 0.4, 0.6, 0.55, 0.7, 0.68, 0.82, 0.9, 1],
  },
  {
    label: "Devis envoyés",
    value: "24",
    delta: "+6",
    trend: "up",
    sparkline: [0.4, 0.5, 0.48, 0.65, 0.7, 0.72, 0.78, 0.85, 0.9, 1],
  },
  {
    label: "Taux conversion",
    value: "42%",
    delta: "−3%",
    trend: "down",
    sparkline: [1, 0.9, 0.85, 0.8, 0.72, 0.68, 0.65, 0.58, 0.5, 0.42],
  },
  {
    label: "Panier moyen",
    value: "356 €",
    delta: "+12%",
    trend: "up",
    sparkline: [0.2, 0.35, 0.38, 0.5, 0.52, 0.6, 0.65, 0.78, 0.88, 1],
  },
];

const defaultTasks: DashboardTask[] = [
  { task: "Relancer Cabinet Lefebvre", time: "14:30", done: true },
  { task: "Préparer devis Atelier Bois&Co", time: "16:00", done: false },
  { task: "Appel onboarding Ecole Montessori", time: "17:30", done: false },
  { task: "Rédiger newsletter mai", time: "Libre", done: false },
];

const defaultTableRows: DashboardTableRow[] = [
  {
    client: "Boulangerie Martin",
    mission: "Site vitrine + SEO",
    amount: "2 400 €",
    status: "Envoyé",
    statusColor: "blue",
  },
  {
    client: "Cabinet Lefebvre",
    mission: "Refonte + branding",
    amount: "9 800 €",
    status: "Accepté",
    statusColor: "green",
  },
  {
    client: "Atelier Bois&Co",
    mission: "Outil de devis interne",
    amount: "12 500 €",
    status: "Négociation",
    statusColor: "amber",
  },
  {
    client: "Garage Dupont",
    mission: "Landing page",
    amount: "1 200 €",
    status: "Envoyé",
    statusColor: "blue",
  },
  {
    client: "Ecole Montessori",
    mission: "Site + blog",
    amount: "4 600 €",
    status: "Brouillon",
    statusColor: "gray",
  },
];

/* ------------------------------------------------------------------ */
/*  Meta                                                                */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof DashboardShell> = {
  title: "Composed/Webapp/DashboardShell",
  component: DashboardShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Shell complet dashboard webapp : 4 StatCards, chart CA, liste de taches, table des devis récents.",
      },
    },
  },
  args: {
    stats: defaultStats,
    chartTitle: "Chiffre d'affaires · 30 derniers jours",
    chartValue: "8 547 €",
    periods: ["7J", "30J", "3M", "1A"],
    tasks: defaultTasks,
    tableRows: defaultTableRows,
    tableTitle: "Devis récents",
    tableSubtitle: "5 devis · mis à jour il y a 2 min",
    onViewAll: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof DashboardShell>;

/* ------------------------------------------------------------------ */
/*  Stories                                                             */
/* ------------------------------------------------------------------ */

/** Données exactes du prototype KLYRA */
export const Default: Story = {};

export const CompactData: Story = {
  args: {
    tableRows: defaultTableRows.slice(0, 2),
    tasks: defaultTasks.slice(0, 2),
  },
  parameters: {
    docs: { description: { story: "Moins de lignes — 2 devis, 2 taches." } },
  },
};

export const AllTasksDone: Story = {
  args: {
    tasks: defaultTasks.map((t) => ({ ...t, done: true })),
  },
};

export const ZeroStats: Story = {
  args: {
    stats: [
      { label: "Chiffre d'affaires", value: "0 €", trend: "flat" },
      { label: "Devis envoyés", value: "0", trend: "flat" },
      { label: "Taux conversion", value: "0%", trend: "flat" },
      { label: "Panier moyen", value: "0 €", trend: "flat" },
    ],
    tableRows: [],
    tasks: [],
    tableSubtitle: "Aucun devis",
  },
  parameters: {
    docs: { description: { story: "Etat vide — toutes les métriques à zéro." } },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: { description: { story: "Viewport 375px — stats en 2 colonnes, table avec scroll horizontal." } },
  },
  decorators: [
    (Story) => (
      <div style={{ overflowX: "hidden" }}>
        <Story />
      </div>
    ),
  ],
};
