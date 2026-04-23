import type { Meta, StoryObj } from "@storybook/react";
import { Table, StatusPill, type StatusColor } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Primitives/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Table — tableau de données style Dashboard KLYRA. Composition par sous-composants : Toolbar, Header, HeaderCell, Body, Row, Cell, Footer. Reprend exactement le pattern de `Dashboard.jsx`.",
      },
    },
    backgrounds: { default: "paper" },
  },
  argTypes: {
    compact: { control: "boolean" },
    zebra:   { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

/* ── Données Dashboard exactes ─────────────────────────────────────── */

const DEALS: Array<{
  name: string;
  mission: string;
  amount: string;
  status: string;
  statusColor: StatusColor;
}> = [
  { name: "Boulangerie Martin",  mission: "Site vitrine + SEO",        amount: "2 400 €",  status: "Envoyé",      statusColor: "blue"  },
  { name: "Cabinet Lefebvre",    mission: "Refonte + branding",         amount: "9 800 €",  status: "Accepté",     statusColor: "green" },
  { name: "Atelier Bois&Co",     mission: "Outil de devis interne",     amount: "12 500 €", status: "Négociation", statusColor: "amber" },
  { name: "Garage Dupont",       mission: "Landing page",               amount: "1 200 €",  status: "Envoyé",      statusColor: "blue"  },
  { name: "École Montessori",    mission: "Site + blog",                amount: "4 600 €",  status: "Brouillon",   statusColor: "gray"  },
];

/* ── Stories ─────────────────────────────────────────────────────────── */

/** Tableau simple 3 colonnes — Nom, Catégorie, Prix. */
export const Simple: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.HeaderCell>Nom</Table.HeaderCell>
        <Table.HeaderCell>Catégorie</Table.HeaderCell>
        <Table.HeaderCell align="right">Prix HT</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell variant="strong">Site vitrine standard</Table.Cell>
          <Table.Cell variant="muted">Sites web</Table.Cell>
          <Table.Cell align="right" variant="mono">10 000 €</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell variant="strong">Site vitrine premium</Table.Cell>
          <Table.Cell variant="muted">Sites web</Table.Cell>
          <Table.Cell align="right" variant="mono">12 000 €</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell variant="strong">Web app MVP standard</Table.Cell>
          <Table.Cell variant="muted">Web apps</Table.Cell>
          <Table.Cell align="right" variant="mono">22 000 €</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

/** Tableau avec statuts — données exactes du Dashboard KLYRA. */
export const WithStatus: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Mission</Table.HeaderCell>
        <Table.HeaderCell align="right">Montant</Table.HeaderCell>
        <Table.HeaderCell>Statut</Table.HeaderCell>
        <Table.HeaderCell style={{ width: 30 }} />
      </Table.Header>
      <Table.Body>
        {DEALS.map((deal) => (
          <Table.Row key={deal.name}>
            <Table.Cell variant="strong">{deal.name}</Table.Cell>
            <Table.Cell variant="muted">{deal.mission}</Table.Cell>
            <Table.Cell align="right" variant="mono">{deal.amount}</Table.Cell>
            <Table.Cell>
              <StatusPill label={deal.status} color={deal.statusColor} />
            </Table.Cell>
            <Table.Cell variant="muted" style={{ color: "rgba(0,0,0,0.4)" }}>→</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

/** Avec Toolbar — titre, sous-titre, action "Tout voir →". */
export const WithToolbar: Story = {
  render: () => (
    <Table>
      <Table.Toolbar
        title="Devis récents"
        subtitle="5 devis · mis à jour il y a 2 min"
        action={
          <a
            href="#"
            style={{
              fontSize: 12,
              color: "var(--color-k1)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
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
        <Table.HeaderCell style={{ width: 30 }} />
      </Table.Header>
      <Table.Body>
        {DEALS.map((deal) => (
          <Table.Row key={deal.name}>
            <Table.Cell variant="strong">{deal.name}</Table.Cell>
            <Table.Cell variant="muted">{deal.mission}</Table.Cell>
            <Table.Cell align="right" variant="mono">{deal.amount}</Table.Cell>
            <Table.Cell>
              <StatusPill label={deal.status} color={deal.statusColor} />
            </Table.Cell>
            <Table.Cell style={{ color: "rgba(0,0,0,0.4)" }}>→</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

/** Tableau compact — padding réduit, adapté aux espaces denses. */
export const Compact: Story = {
  render: () => (
    <Table compact>
      <Table.Header>
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Mission</Table.HeaderCell>
        <Table.HeaderCell align="right">Montant</Table.HeaderCell>
        <Table.HeaderCell>Statut</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {DEALS.map((deal) => (
          <Table.Row key={deal.name}>
            <Table.Cell variant="strong">{deal.name}</Table.Cell>
            <Table.Cell variant="muted">{deal.mission}</Table.Cell>
            <Table.Cell align="right" variant="mono">{deal.amount}</Table.Cell>
            <Table.Cell>
              <StatusPill label={deal.status} color={deal.statusColor} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

/** Zebra stripes — alternance de couleur sur les lignes paires. */
export const Zebra: Story = {
  render: () => (
    <Table zebra>
      <Table.Header>
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Mission</Table.HeaderCell>
        <Table.HeaderCell align="right">Montant</Table.HeaderCell>
        <Table.HeaderCell>Statut</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {DEALS.map((deal, i) => (
          <Table.Row key={deal.name} rowIndex={i}>
            <Table.Cell variant="strong">{deal.name}</Table.Cell>
            <Table.Cell variant="muted">{deal.mission}</Table.Cell>
            <Table.Cell align="right" variant="mono">{deal.amount}</Table.Cell>
            <Table.Cell>
              <StatusPill label={deal.status} color={deal.statusColor} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

/** Lignes interactives — hover visible, cursor pointer. */
export const Interactive: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Mission</Table.HeaderCell>
        <Table.HeaderCell align="right">Montant</Table.HeaderCell>
        <Table.HeaderCell>Statut</Table.HeaderCell>
        <Table.HeaderCell style={{ width: 30 }} />
      </Table.Header>
      <Table.Body>
        {DEALS.map((deal, i) => (
          <Table.Row
            key={deal.name}
            clickable
            selected={i === 1}
            style={{
              // hover géré via CSS inline hover — on simule avec onMouseEnter/Leave en Story
            }}
            onMouseEnter={(e) => {
              if (i !== 1) (e.currentTarget as HTMLTableRowElement).style.background = "#FAFAFB";
            }}
            onMouseLeave={(e) => {
              if (i !== 1) (e.currentTarget as HTMLTableRowElement).style.background = "";
            }}
          >
            <Table.Cell variant="strong">{deal.name}</Table.Cell>
            <Table.Cell variant="muted">{deal.mission}</Table.Cell>
            <Table.Cell align="right" variant="mono">{deal.amount}</Table.Cell>
            <Table.Cell>
              <StatusPill label={deal.status} color={deal.statusColor} />
            </Table.Cell>
            <Table.Cell style={{ color: "rgba(0,0,0,0.4)" }}>→</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

/** En-têtes avec chevrons de tri (visuel uniquement). */
export const Sortable: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.HeaderCell sortDirection="asc">Client</Table.HeaderCell>
        <Table.HeaderCell>Mission</Table.HeaderCell>
        <Table.HeaderCell align="right" sortDirection="desc">Montant</Table.HeaderCell>
        <Table.HeaderCell sortDirection="none">Statut</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {DEALS.map((deal) => (
          <Table.Row key={deal.name}>
            <Table.Cell variant="strong">{deal.name}</Table.Cell>
            <Table.Cell variant="muted">{deal.mission}</Table.Cell>
            <Table.Cell align="right" variant="mono">{deal.amount}</Table.Cell>
            <Table.Cell>
              <StatusPill label={deal.status} color={deal.statusColor} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};
