import type { ReactNode } from "react";
import { cn } from "../../../../lib/cn";
import { GlassCard } from "../../../primitives/GlassCard/GlassCard";
import { Container } from "../../../layout/Container/Container";

/* ─── Sparkline interne ────────────────────────────────────────── */

function Sparkline() {
  return (
    <svg
      viewBox="0 0 500 70"
      style={{ width: "100%", height: 70, marginTop: 10, display: "block" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="cs-spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-k3)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-k3)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 55 Q60 45 120 40 T240 28 T360 20 T500 8"
        fill="none"
        stroke="var(--color-k3)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 55 Q60 45 120 40 T240 28 T360 20 T500 8 L500 70 L0 70 Z"
        fill="url(#cs-spark-grad)"
        opacity="0.45"
      />
    </svg>
  );
}

/* ─── Types ────────────────────────────────────────────────────── */

export interface CaseStudyMain {
  /** Label mono en haut : ex. "CS-01 · WEBAPP MÉTIER" */
  tag: string;
  /** Badge statut : ex. "Livré · 2025" */
  status: string;
  /** Titre de la réalisation */
  title: string;
  /** Description courte */
  description: string;
  /** Label de la métrique (ex. "ÉVOLUTION DES VENTES") */
  metricLabel: string;
  /** Valeur principale (ex. "8 547 €") */
  metricValue: string;
  /** Delta (ex. "+32% vs. M-1") */
  metricDelta: string;
  /** Afficher le dashboard GlassCard + sparkline */
  showDashboard?: boolean;
}

export interface CaseStudyItem {
  tag: string;
  title: string;
  description: string;
}

export interface CaseStudyBlockProps {
  /** Label eyebrow mono */
  eyebrow?: string;
  /** Titre de section */
  title?: ReactNode;
  /** Grande réalisation gauche */
  main?: CaseStudyMain;
  /** 3 réalisations secondaires droite */
  cases?: CaseStudyItem[];
  className?: string;
}

const DEFAULT_MAIN: CaseStudyMain = {
  tag: "CS-01 · WEBAPP MÉTIER",
  status: "Livré · 2025",
  title: "Un outil de devis qui remplace 3 Excel.",
  description: "BTP · 12 utilisateurs · 50% de temps gagné sur la création de devis.",
  metricLabel: "ÉVOLUTION DES VENTES",
  metricValue: "8 547 €",
  metricDelta: "+32% vs. M-1",
  showDashboard: true,
};

const DEFAULT_CASES: CaseStudyItem[] = [
  {
    tag: "CS-02 · SITE MARKETING",
    title: "Refonte pour un cabinet d'avocats",
    description: "Identité + site Next.js · +38% de contacts qualifiés en 3 mois.",
  },
  {
    tag: "CS-03 · E-COMMERCE",
    title: "Boutique pour un artisan chocolatier",
    description: "Shopify custom · temps de chargement divisé par 3.",
  },
  {
    tag: "CS-04 · BRANDING",
    title: "Identité visuelle pour un cabinet RH",
    description: "Logo, charte, supports papier + digital. 2 semaines.",
  },
];

export function CaseStudyBlock({
  eyebrow = "→ RÉALISATIONS RÉCENTES",
  title = "Quelques projets dont nous sommes fiers.",
  main = DEFAULT_MAIN,
  cases = DEFAULT_CASES,
  className,
}: CaseStudyBlockProps) {
  const showDashboard = main.showDashboard !== false;

  return (
    <section
      className={cn("relative w-full", className)}
      style={{
        padding: "120px 0",
        background: "var(--color-paper)",
        color: "var(--color-ink)",
      }}
    >
      <Container size="lg" gutter="brand">
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              display: "block",
              fontSize: 13,
              color: "var(--color-k1)",
              fontFamily: "var(--font-mono)",
              marginBottom: 12,
            }}
          >
            {eyebrow}
          </span>
          <h2
            style={{
              fontSize: 56,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              margin: 0,
              maxWidth: 720,
            }}
          >
            {title}
          </h2>
        </div>

        {/* Split layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {/* Main case — left */}
          <article
            style={{
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              background:
                "linear-gradient(180deg, var(--color-k1) 0%, #000 100%)",
              color: "#fff",
              minHeight: 460,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Halo interne */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                width: 600,
                height: 600,
                borderRadius: "50%",
                top: -320,
                right: -220,
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(1,164,255,0.7), rgba(1,164,255,0) 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                padding: "32px 32px 0",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              {/* Tag + Status */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    opacity: 0.7,
                    letterSpacing: "0.02em",
                  }}
                >
                  {main.tag}
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.14)",
                    fontSize: 11,
                  }}
                >
                  {main.status}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 40,
                  fontWeight: 500,
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  margin: "20px 0 10px",
                  maxWidth: 420,
                }}
              >
                {main.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  opacity: 0.8,
                  margin: 0,
                  maxWidth: 440,
                  flex: 1,
                }}
              >
                {main.description}
              </p>

              {/* Dashboard card */}
              {showDashboard && (
                <div
                  style={{
                    marginTop: "auto",
                    marginLeft: 24,
                    marginRight: -24,
                    marginBottom: -20,
                  }}
                >
                  <GlassCard padding={18} radius={14}>
                    <div
                      style={{
                        fontSize: 11,
                        opacity: 0.65,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}
                    >
                      {main.metricLabel}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 14,
                        marginTop: 8,
                      }}
                    >
                      <div
                        className="klyra-mono"
                        style={{
                          fontSize: 34,
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                        }}
                      >
                        {main.metricValue}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--color-k3)",
                          fontWeight: 500,
                        }}
                      >
                        {main.metricDelta}
                      </div>
                    </div>
                    <Sparkline />
                  </GlassCard>
                </div>
              )}
            </div>
          </article>

          {/* Small cases — right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {cases.map((c) => (
              <article
                key={c.tag}
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-gray-k1)",
                  borderRadius: 16,
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-k1)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {c.tag}
                </span>
                <h4
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  {c.title}
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.65)",
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {c.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
