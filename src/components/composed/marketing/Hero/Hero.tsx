import type { ReactNode } from "react";
import { cn } from "../../../../lib/cn";
import { Button } from "../../../primitives/Button/Button";
import { Halo } from "../../../primitives/Halo/Halo";
import { PixelMotif } from "../../../primitives/PixelMotif/PixelMotif";
import { Container } from "../../../layout/Container/Container";

export interface HeroCta {
  label: string;
  href: string;
}

export type HeroVariant = "dark" | "deep" | "bright";

export interface HeroProps {
  /** Pill badge en haut — dot K3 + texte */
  eyebrowBadge?: string;
  /** Titre principal — ReactNode pour les highlights inline */
  title?: ReactNode;
  /** Description sous le titre */
  description?: string;
  /** CTA primaire (bleu avec shadow signature) */
  primaryCta?: HeroCta;
  /** CTA secondaire (ghost dark) */
  secondaryCta?: HeroCta;
  /** Liste de services mono en bas */
  services?: string[];
  /** Afficher les halos de fond */
  showHalos?: boolean;
  /** Afficher le motif pixel (optionnel) */
  showPixels?: boolean;
  /** Variante de fond */
  variant?: HeroVariant;
  className?: string;
}

const DEFAULT_TITLE: ReactNode = (
  <>
    Nous créons les{" "}
    <span style={{ color: "var(--color-k2)", whiteSpace: "nowrap" }}>
      outils digitaux
    </span>{" "}
    qui font grandir{" "}
    <span
      style={{
        background: "linear-gradient(180deg, var(--color-k2), var(--color-k3))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        whiteSpace: "nowrap",
      }}
    >
      votre entreprise.
    </span>
  </>
);

const DEFAULT_SERVICES = ["BRANDING", "WEB DESIGN", "DÉVELOPPEMENT", "MAINTENANCE"];

const bgMap: Record<HeroVariant, string> = {
  dark: "#000",
  deep: "linear-gradient(180deg, var(--color-k1) 0%, #000 100%)",
  bright: "linear-gradient(180deg, var(--color-k1) 0%, var(--color-k2) 100%)",
};

export function Hero({
  eyebrowBadge = "+20 entreprises nous font confiance",
  title = DEFAULT_TITLE,
  description = "Des outils aussi performants que ceux des grandes entreprises — sans la complexité, le coût ou les délais. Stratégie, branding, webapps sur mesure.",
  primaryCta = { label: "Prendre rendez-vous", href: "#" },
  secondaryCta = { label: "Voir nos réalisations", href: "#" },
  services = DEFAULT_SERVICES,
  showHalos = true,
  showPixels = false,
  variant = "dark",
  className,
}: HeroProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        minHeight: 720,
        background: bgMap[variant],
        color: "#fff",
        padding: "120px 0 80px",
      }}
    >
      {/* Halos radials signature */}
      {showHalos && (
        <>
          <Halo
            color="k1"
            opacity={0.85}
            size={900}
            position={{ top: -380, right: -260 }}
          />
          <Halo
            color="k2"
            opacity={0.6}
            size={800}
            position={{ bottom: -440, left: -260 }}
          />
        </>
      )}

      {/* Pixel motif en fond (optionnel) */}
      {showPixels && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.35,
          }}
        >
          <PixelMotif
            width={1400}
            height={800}
            seed={42}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Content */}
      <Container size="lg" gutter="brand" style={{ position: "relative" }}>
        {/* Eyebrow badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 999,
            fontSize: 13,
            color: "rgba(255,255,255,0.8)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            letterSpacing: "-0.0125em",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-k3)",
              flexShrink: 0,
            }}
          />
          {eyebrowBadge}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 104,
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
            margin: "32px 0 0",
            maxWidth: 1080,
            textWrap: "balance",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            style={{
              marginTop: 28,
              maxWidth: 640,
              fontSize: 20,
              lineHeight: 1.45,
              letterSpacing: "-0.0125em",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {description}
          </p>
        )}

        {/* CTAs */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {primaryCta && (
            <Button variant="primary" size="lg" asChild href={primaryCta.href}>
              {primaryCta.label}
            </Button>
          )}
          {secondaryCta && (
            <Button
              variant="ghost-dark"
              size="lg"
              asChild
              href={secondaryCta.href}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>

        {/* Services mono list */}
        {services && services.length > 0 && (
          <div
            style={{
              marginTop: 72,
              display: "flex",
              alignItems: "center",
              gap: 32,
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              letterSpacing: "-0.0125em",
              fontFamily: "var(--font-mono)",
              flexWrap: "wrap",
            }}
          >
            {services.map((s) => (
              <span key={s}>
                <span aria-hidden style={{ marginRight: 6, opacity: 0.7 }}>
                  →
                </span>
                {s}
              </span>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
