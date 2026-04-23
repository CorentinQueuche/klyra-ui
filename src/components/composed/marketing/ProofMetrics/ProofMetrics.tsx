import type { ReactNode } from "react";
import { cn } from "../../../../lib/cn";
import { Halo } from "../../../primitives/Halo/Halo";
import { PixelMotif } from "../../../primitives/PixelMotif/PixelMotif";
import { Container } from "../../../layout/Container/Container";

export interface Metric {
  /** Valeur affichée en grand (72px) */
  big: string;
  /** Label sous la valeur */
  label: string;
}

export type ProofBackground = "black" | "ink" | "k1";

export interface ProofMetricsProps {
  /** Label eyebrow mono */
  eyebrow?: string;
  /** Titre de section */
  title?: ReactNode;
  /** Métriques à afficher */
  metrics?: Metric[];
  /** Couleur de fond */
  background?: ProofBackground;
  /** Afficher le halo top-center */
  showHalo?: boolean;
  /** Afficher le motif pixel */
  showPixels?: boolean;
  className?: string;
}

const DEFAULT_METRICS: Metric[] = [
  { big: "+20", label: "Entreprises accompagnées" },
  { big: "4.9", label: "Note moyenne client" },
  { big: "47", label: "Projets livrés depuis 2023" },
  { big: "9 635", label: "Abonnés LinkedIn" },
];

const bgMap: Record<ProofBackground, string> = {
  black: "#000",
  ink: "var(--color-ink)",
  k1: "var(--color-k1)",
};

export function ProofMetrics({
  eyebrow = "→ PREUVES",
  title = "Des résultats concrets, pas des promesses.",
  metrics = DEFAULT_METRICS,
  background = "black",
  showHalo = true,
  showPixels = false,
  className,
}: ProofMetricsProps) {
  const haloColor = background === "k1" ? "k2" : "k1";

  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        padding: "120px 0",
        background: bgMap[background],
        color: "#fff",
      }}
    >
      {/* Halo top-center */}
      {showHalo && (
        <Halo
          color={haloColor}
          opacity={0.6}
          size={700}
          position={{ top: -300, left: "40%" }}
        />
      )}

      {/* Pixel motif en fond */}
      {showPixels && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.4,
          }}
        >
          <PixelMotif
            width={1400}
            height={600}
            seed={99}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <Container size="lg" gutter="brand" style={{ position: "relative" }}>
        {/* Eyebrow */}
        <span
          style={{
            display: "block",
            fontSize: 13,
            color: "var(--color-k2)",
            fontFamily: "var(--font-mono)",
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </span>

        {/* Title */}
        <h2
          style={{
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: 0.95,
            margin: 0,
            maxWidth: 820,
          }}
        >
          {title}
        </h2>

        {/* Metrics grid */}
        <div
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: `repeat(${metrics.length}, 1fr)`,
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              style={{
                padding: "32px 28px 8px",
                borderRight:
                  i < metrics.length - 1
                    ? "1px solid rgba(255,255,255,0.16)"
                    : "none",
              }}
            >
              {/* Big value */}
              <div
                className="klyra-mono"
                style={{
                  fontSize: 72,
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "#fff",
                }}
              >
                {metric.big}
              </div>

              {/* Label */}
              <div
                style={{
                  marginTop: 14,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "-0.0125em",
                  lineHeight: 1.4,
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
