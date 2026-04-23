import type { ReactNode, CSSProperties } from "react";
import { cn } from "../../../../lib/cn";
import { Logo } from "../../../primitives/Logo/Logo";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type LinkedInPostVariant = "dark" | "blue" | "light";

export interface LinkedInPostProps {
  variant?: LinkedInPostVariant;
  eyebrow?: string;
  title: ReactNode;
  highlight?: string;
  footer?: string;
  rightTag?: ReactNode;
  logoVariant?: "auto" | "white" | "original";
  /** Largeur en px — ratio 4:5 préservé. Défaut 540 */
  width?: number;
  /** Afficher le halo atténué (défaut true sur dark/blue) */
  showHalo?: boolean;
  /** Slot milieu optionnel */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* ------------------------------------------------------------------ */
/*  Config par variant                                                  */
/* ------------------------------------------------------------------ */

const variantConfig = {
  dark: {
    background: "linear-gradient(180deg, #000000 0%, #003FE4 100%)",
    foreground: "#ffffff",
    highlightColor: "#00DDFF",
    logoVariant: "white" as const,
    eyebrowBorder: "1px solid rgba(255,255,255,0.22)",
    eyebrowColor: "rgba(255,255,255,0.82)",
    dividerColor: "rgba(255,255,255,0.18)",
    footerColor: "rgba(255,255,255,0.85)",
  },
  blue: {
    background: "linear-gradient(180deg, #003FE4 0%, #01A4FF 100%)",
    foreground: "#ffffff",
    highlightColor: "#00DDFF",
    logoVariant: "white" as const,
    eyebrowBorder: "1px solid rgba(255,255,255,0.22)",
    eyebrowColor: "rgba(255,255,255,0.82)",
    dividerColor: "rgba(255,255,255,0.18)",
    footerColor: "rgba(255,255,255,0.85)",
  },
  light: {
    background: "#ffffff",
    foreground: "#000000",
    highlightColor: "#003FE4",
    logoVariant: "original" as const,
    eyebrowBorder: "1px solid rgba(0,0,0,0.12)",
    eyebrowColor: "rgba(0,0,0,0.62)",
    dividerColor: "rgba(0,0,0,0.08)",
    footerColor: "rgba(0,0,0,0.65)",
  },
};

/* ------------------------------------------------------------------ */
/*  LinkedInPost                                                        */
/* ------------------------------------------------------------------ */

export function LinkedInPost({
  variant = "dark",
  eyebrow = "KLYRA · 2026",
  title,
  highlight,
  footer = "Klyra Design — 2026",
  rightTag,
  logoVariant = "auto",
  width = 540,
  showHalo,
  children,
  className,
  style,
}: LinkedInPostProps) {
  const cfg = variantConfig[variant];
  const isDark = variant !== "light";

  // Halo visible par défaut sur dark/blue
  const displayHalo = showHalo !== undefined ? showHalo : isDark;

  // Logo variant
  const resolvedLogoVariant =
    logoVariant === "auto" ? cfg.logoVariant : logoVariant;

  // Ratio 4:5 (1080×1350)
  const height = Math.round(width * (5 / 4));

  return (
    <article
      className={cn("relative overflow-hidden", className)}
      style={{
        width,
        height,
        background: cfg.background,
        color: cfg.foreground,
        borderRadius: 20,
        padding: "30px 32px 28px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...style,
      }}
    >
      {/* ── Halo atténué (off-canvas, haut-droite) ── */}
      {displayHalo && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: "50%",
            top: -620,
            right: -400,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(1,164,255,0.16), rgba(1,164,255,0) 65%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── TOP : logo + eyebrow pill ── */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo variant={resolvedLogoVariant} height={24} alt="Klyra Design" />
        <span
          className="klyra-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.04em",
            padding: "4px 10px",
            borderRadius: 999,
            border: cfg.eyebrowBorder,
            color: cfg.eyebrowColor,
          }}
        >
          {eyebrow}
        </span>
      </div>

      {/* ── MIDDLE : slot enfants optionnel ── */}
      {children && (
        <div style={{ position: "relative", marginTop: 18, flex: 1 }}>
          {children}
        </div>
      )}

      {/* ── BOTTOM : titre + séparateur + signature ── */}
      <div style={{ position: "relative" }}>
        <h2
          style={{
            fontSize: width >= 1000 ? 108 : 54,
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          {title}
          {highlight && (
            <>
              <br />
              <span style={{ color: cfg.highlightColor }}>{highlight}</span>
            </>
          )}
        </h2>

        {/* Divider + signature */}
        <div
          style={{
            marginTop: 22,
            paddingTop: 14,
            borderTop: `1px solid ${cfg.dividerColor}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            color: cfg.footerColor,
          }}
        >
          <span>{footer}</span>
          <span className="klyra-mono">
            {rightTag !== undefined ? rightTag : "→ swipe"}
          </span>
        </div>
      </div>
    </article>
  );
}
