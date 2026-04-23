import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button/Button";
import { Table, StatusPill } from "../Table/Table";

const meta: Meta<typeof EmptyState> = {
  title: "Primitives/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "EmptyState — bloc 'rien à afficher' KLYRA. Fond paper, bordure pointillée, icône 48 px, titre + description + action CTA optionnel. Deux tons : light (défaut) et dark.",
      },
    },
    backgrounds: { default: "paper" },
  },
  argTypes: {
    tone:  { control: "select", options: ["light", "dark"] },
    align: { control: "select", options: ["center", "left"] },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    title: "Aucun élément pour l'instant.",
    description: "Les éléments apparaîtront ici une fois créés.",
    tone: "light",
    align: "center",
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/** État vide par défaut — sans action. */
export const Default: Story = {};

/** Avec bouton d'action primaire. */
export const WithAction: Story = {
  args: {
    title: "Aucun devis pour l'instant.",
    description: "Créez votre premier devis pour démarrer le suivi.",
    action: (
      <Button size="sm">
        Nouveau devis
      </Button>
    ),
  },
};

/** Alignement à gauche. */
export const LeftAligned: Story = {
  args: {
    align: "left",
    title: "Aucune réalisation publiée.",
    description: "Publiez votre première réalisation pour renseigner votre portfolio.",
    action: (
      <Button size="sm" variant="ghost">
        Ajouter une réalisation
      </Button>
    ),
  },
};

/** Ton sombre — pour les sections sur fond noir ou dégradé. */
export const Dark: Story = {
  args: {
    tone: "dark",
    title: "Aucune campagne active.",
    description: "Lancez votre première campagne pour suivre les performances ici.",
    action: (
      <Button size="sm" variant="ghost-dark">
        Créer une campagne
      </Button>
    ),
  },
  parameters: { backgrounds: { default: "black" } },
};

/**
 * En contexte dans un tableau — message "Aucun devis pour l'instant."
 * Reproduit l'état vide du Dashboard KLYRA.
 */
export const InContextTable: Story = {
  render: () => (
    <Table>
      <Table.Toolbar
        title="Devis récents"
        subtitle="0 devis"
        action={
          <a
            href="#"
            style={{ fontSize: 12, color: "var(--color-k1)", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Tout voir →
          </a>
        }
      />
      <Table.Header>
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Mission</Table.HeaderCell>
        <Table.HeaderCell align="right">Montant</Table.HeaderCell>
        <Table.HeaderCell>Statut</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        <tr>
          <td colSpan={4} style={{ padding: 0 }}>
            <EmptyState
              title="Aucun devis pour l'instant."
              description="Créez votre premier devis pour démarrer le suivi."
              action={
                <Button size="sm">
                  Nouveau devis
                </Button>
              }
              style={{ borderRadius: 0, border: "none", background: "transparent" }}
            />
          </td>
        </tr>
      </Table.Body>
    </Table>
  ),
  parameters: { backgrounds: { default: "paper" } },
};
