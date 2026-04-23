import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";
import { Field } from "../Field/Field";

/* ---- Icons ---- */
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="9" cy="9" r="6" />
      <path d="M14 14l4 4" />
    </svg>
  );
}

function KbdSlot() {
  return (
    <kbd style={{
      fontSize: 10,
      color: "rgba(0,0,0,0.5)",
      border: "1px solid #D9D9E5",
      borderRadius: 4,
      padding: "1px 5px",
      fontFamily: "var(--font-mono)",
      lineHeight: 1.4,
    }}>
      ⌘K
    </kbd>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="16" height="12" rx="2" />
      <path d="M2 7l8 5 8-5" />
    </svg>
  );
}

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Input texte de base — 3 variants (outline, subtle, ghost), 3 tailles, mode dark, icônes gauche/droite, clearable et loading.",
      },
    },
  },
  args: {
    variant: "outline",
    size: "md",
    tone: "light",
    placeholder: "Votre réponse…",
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Outline: Story = {
  args: { placeholder: "Nom complet" },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    leftIcon: <SearchIcon />,
    rightIcon: <KbdSlot />,
    placeholder: "Rechercher un client, un devis…",
  },
};

export const Ghost: Story = {
  args: { variant: "ghost", placeholder: "Ajouter une note…" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[340px]">
      <Input size="sm" placeholder="Petit (sm)" />
      <Input size="md" placeholder="Moyen (md) — défaut" />
      <Input size="lg" placeholder="Grand (lg)" />
    </div>
  ),
};

export const Dark: Story = {
  parameters: { backgrounds: { default: "black" } },
  render: () => (
    <div
      className="p-8 flex flex-col gap-4 w-[400px] rounded-[20px]"
      style={{
        background: "#000",
        boxShadow: "0 0 120px 40px rgba(0,63,228,0.18)",
      }}
    >
      <Input tone="dark" placeholder="vous@entreprise.fr" leftIcon={<span style={{ color: "rgba(255,255,255,0.4)" }}><MailIcon /></span>} />
      <Input tone="dark" variant="subtle" leftIcon={<span style={{ color: "rgba(255,255,255,0.4)" }}><SearchIcon /></span>} placeholder="Rechercher…" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[320px]">
      <Input placeholder="Vide" />
      <Input defaultValue="Corentin Queuche" />
      <Input defaultValue="corentin@klyra.fr" className="border-[var(--color-k1)] [box-shadow:0_0_0_3px_rgba(0,63,228,0.18)]" />
      <Input aria-invalid="true" defaultValue="corentin@" />
      <Input disabled defaultValue="Champ désactivé" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[320px]">
      <Input leftIcon={<MailIcon />} placeholder="vous@entreprise.fr" />
      <Input
        variant="subtle"
        leftIcon={<SearchIcon />}
        rightIcon={<KbdSlot />}
        placeholder="Rechercher un client, un devis…"
      />
    </div>
  ),
};

export const Clearable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState("Cabinet Lefebvre");
    return (
      <div className="w-[320px]">
        <Input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          clearable
          onClear={() => setVal("")}
          placeholder="Nom du client…"
        />
      </div>
    );
  },
};

export const Loading: Story = {
  args: { loading: true, defaultValue: "Recherche en cours…" },
};

export const InContextForm: Story = {
  render: () => (
    <form className="flex flex-col gap-5 w-[400px] p-6 bg-white border border-[var(--color-border-1)] rounded-[20px]">
      <p className="text-[13px] font-medium tracking-[-0.01em]">Demande de diagnostic gratuit</p>
      <Field label="Nom complet" required>
        <Input placeholder="Corentin Queuche" />
      </Field>
      <Field label="Email pro" helpText="Nous utilisons cet email uniquement pour vous répondre." required>
        <Input type="email" placeholder="vous@entreprise.fr" leftIcon={<MailIcon />} />
      </Field>
      <Field label="Site actuel" helpText="Laissez vide si vous n'en avez pas.">
        <Input placeholder="https://votresite.fr" />
      </Field>
    </form>
  ),
};
