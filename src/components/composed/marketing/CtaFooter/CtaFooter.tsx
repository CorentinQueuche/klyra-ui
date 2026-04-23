import type { ReactNode } from "react";
import { cn } from "../../../../lib/cn";
import { Button } from "../../../primitives/Button/Button";
import { Halo } from "../../../primitives/Halo/Halo";
import { Logo } from "../../../primitives/Logo/Logo";
import { Container } from "../../../layout/Container/Container";

export interface FooterColumn {
  heading: string;
  items: string[];
}

export interface CtaFooterProps {
  /** Label eyebrow mono */
  eyebrow?: string;
  /** Titre big CTA */
  title?: ReactNode;
  /** CTA principal */
  cta?: { label: string; href: string };
  /** Colonnes de liens */
  columns?: FooterColumn[];
  /** Baseline sous le logo */
  logoSlogan?: string;
  /** Texte copyright gauche + droite */
  copyright?: { left: string; right: string };
  className?: string;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  { heading: "Services", items: ["Branding", "Web Design", "Développement", "Maintenance"] },
  { heading: "Studio", items: ["À propos", "Réalisations", "Labs", "Blog"] },
  { heading: "Contact", items: ["corentin@klyra.fr", "LinkedIn", "Strasbourg, FR"] },
];

export function CtaFooter({
  eyebrow = "→ PRÊT À EMBARQUER ?",
  title = (
    <>
      Le web n'attend pas.
      <br />
      <span style={{ color: "var(--color-k2)" }}>Vous non plus.</span>
    </>
  ),
  cta = {
    label: "Prendre rendez-vous avec Corentin →",
    href: "#",
  },
  columns = DEFAULT_COLUMNS,
  logoSlogan = "Agence digitale · Strasbourg, France. Nous construisons des outils métier sur mesure pour les PME.",
  copyright = {
    left: "Stratégie & identité de marque — Tous droits réservés",
    right: "Klyra Design · 2026",
  },
  className,
}: CtaFooterProps) {
  return (
    <footer
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        background: "#000",
        color: "#fff",
        padding: "120px 0 52px",
      }}
    >
      {/* Halo central */}
      <Halo
        color="k1"
        opacity={0.9}
        size={1100}
        position={{ top: -480, left: "50%" }}
        style={{ transform: "translateX(-50%)" }}
      />

      <Container size="lg" gutter="brand" style={{ position: "relative" }}>
        {/* Big CTA block */}
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              display: "block",
              fontSize: 13,
              color: "var(--color-k3)",
              fontFamily: "var(--font-mono)",
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </span>

          <h2
            style={{
              fontSize: 96,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              margin: 0,
              maxWidth: 1000,
              marginInline: "auto",
            }}
          >
            {title}
          </h2>

          <div style={{ marginTop: 48 }}>
            <Button variant="primary" size="xl" asChild href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </div>

        {/* Footer links grid */}
        <div
          style={{
            marginTop: 100,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            display: "grid",
            gridTemplateColumns: `1.4fr ${columns.map(() => "1fr").join(" ")}`,
            gap: 24,
          }}
        >
          {/* Logo + slogan */}
          <div>
            <Logo variant="white" height={26} />
            {logoSlogan && (
              <p
                style={{
                  marginTop: 14,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                  maxWidth: 260,
                }}
              >
                {logoSlogan}
              </p>
            )}
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 14,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {col.heading}
              </div>
              {col.items.map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.82)",
                    padding: "6px 0",
                    letterSpacing: "-0.0125em",
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Copyright bar */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "-0.0125em",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span>{copyright.left}</span>
          <span>{copyright.right}</span>
        </div>
      </Container>
    </footer>
  );
}
