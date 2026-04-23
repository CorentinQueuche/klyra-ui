import type { Meta, StoryObj } from "@storybook/react";
import {
  Typography,
  DisplayXL, DisplayL, DisplayM, DisplayS,
  H1, H2, H3, H4,
  BodyL, Body, BodyS,
  Caption, Eyebrow, Micro,
} from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Foundations/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Type scale KLYRA 2026. Google Sans Flex (substitué par Google Sans), sentence-case toujours, tracking -5% / -3.25% / -1.25% selon le rôle.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 32, background: "#FFF" }}>
      <Row label="display-xl · 160 / -3.25%">
        <DisplayXL>160</DisplayXL>
      </Row>
      <Row label="display-l · 105 / -5%">
        <DisplayL>Nous créons les outils digitaux.</DisplayL>
      </Row>
      <Row label="display-m · 70 / -5%">
        <DisplayM>Nous créons les outils digitaux.</DisplayM>
      </Row>
      <Row label="display-s · 60 / -3.25%">
        <DisplayS>Le web n&apos;attend pas.</DisplayS>
      </Row>
      <Row label="h1 · 48 / -3.25%">
        <H1>Quatre métiers, une seule obsession.</H1>
      </Row>
      <Row label="h2 · 40 / -3.25%">
        <H2>Des résultats concrets, pas des promesses.</H2>
      </Row>
      <Row label="h3 · 28 / -3.25%">
        <H3>Un outil de devis qui remplace 3 Excel.</H3>
      </Row>
      <Row label="h4 · 24 / -3.25%">
        <H4>Refonte pour un cabinet d&apos;avocats.</H4>
      </Row>
      <Row label="body-l · 22 / -1.25%">
        <BodyL>
          Des outils aussi performants que ceux des grandes entreprises — sans la complexité,
          le coût ou les délais.
        </BodyL>
      </Row>
      <Row label="body · 18 / -1.25%">
        <Body>
          Nous concevons des interfaces claires, modernes et performantes pour convertir.
        </Body>
      </Row>
      <Row label="body-s · 16 / -1.25%">
        <BodyS>
          BTP · 12 utilisateurs · 50% de temps gagné sur la création de devis.
        </BodyS>
      </Row>
      <Row label="caption · 14">
        <Caption>9 635 abonnés sur LinkedIn</Caption>
      </Row>
      <Row label="eyebrow · mono · 13">
        <Eyebrow>→ CE QUE NOUS FAISONS</Eyebrow>
      </Row>
      <Row label="micro · 12">
        <Micro>Mis à jour il y a 2 min</Micro>
      </Row>
    </div>
  ),
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, alignItems: "baseline" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

export const Weights: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, padding: 32 }}>
      {[
        { w: 400, l: "Regular · 400" },
        { w: 500, l: "Medium · 500" },
        { w: 600, l: "SemiBold · 600" },
        { w: 700, l: "Bold · 700" },
      ].map(({ w, l }) => (
        <div key={w}>
          <div style={{ fontSize: 60, fontWeight: w, letterSpacing: "-0.0325em", lineHeight: 1 }}>Aa</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(0,0,0,0.5)", marginTop: 8 }}>{l}</div>
        </div>
      ))}
    </div>
  ),
};

export const TrackingAndLeading: Story = {
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <Eyebrow>→ DISPLAY · -5% / 92.5%</Eyebrow>
        <DisplayL style={{ marginTop: 12 }}>Nous créons les outils digitaux pour booster ta croissance.</DisplayL>
      </div>
      <div>
        <Eyebrow>→ TITRE · -3.25% / 90%</Eyebrow>
        <H1 style={{ marginTop: 12 }}>Nous créons les outils digitaux pour booster ta croissance.</H1>
      </div>
      <div>
        <Eyebrow>→ PARAGRAPHE · -1.25% / 140%</Eyebrow>
        <Body style={{ marginTop: 12, maxWidth: 640 }}>
          Nous créons les outils digitaux pour booster ta croissance. Branding, webdesign et développement — tout
          au même endroit, conçu pour durer.
        </Body>
      </div>
    </div>
  ),
};

export const SentenceCaseRule: Story = {
  name: "Règle sentence-case",
  render: () => (
    <div style={{ padding: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div style={{ padding: 20, background: "#E5EEFF", borderRadius: 12 }}>
        <Eyebrow style={{ color: "#003FE4" }}>→ OUI</Eyebrow>
        <H2 style={{ marginTop: 12 }}>Nos réalisations récentes</H2>
      </div>
      <div style={{ padding: 20, background: "#FAFAFB", border: "1px dashed #E0E0E0", borderRadius: 12, opacity: 0.65 }}>
        <Eyebrow>→ NON</Eyebrow>
        <H2 style={{ marginTop: 12 }}>NOS RÉALISATIONS RÉCENTES</H2>
      </div>
    </div>
  ),
};
