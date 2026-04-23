import type { HTMLAttributes, CSSProperties, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

/* ─── Config ────────────────────────────────────────────────────── */

const paddingMap = {
  compact:     "40px 0",
  comfortable: "80px 0",
  spacious:    "120px 0",
} as const;

const backgroundMap: Record<string, CSSProperties> = {
  white: { background: "#fff" },
  paper: { background: "var(--color-paper)" },
  black: { background: "#000" },
  ink:   { background: "var(--color-ink)" },
  deep:  { background: "linear-gradient(180deg, var(--color-k1) 0%, #000 100%)" },
  bright: { background: "linear-gradient(180deg, var(--color-k1) 0%, var(--color-k2) 100%)" },
};

export type SectionBackground = "white" | "paper" | "black" | "ink" | "deep" | "bright";
export type SectionPadding    = "compact" | "comfortable" | "spacious";

/* ─── Variants ──────────────────────────────────────────────────── */

export const sectionVariants = cva(
  ["relative w-full overflow-hidden"],
  {
    variants: {},
    defaultVariants: {},
  }
);

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  background?: SectionBackground;
  padding?:    SectionPadding;
  halos?:      boolean;
  children?:   ReactNode;
  style?:      CSSProperties;
}

export function Section({
  background = "white",
  padding    = "comfortable",
  halos      = false,
  className,
  children,
  style,
  ...rest
}: SectionProps) {
  const isDark = ["black", "ink", "deep", "bright"].includes(background);

  return (
    <section
      className={cn(sectionVariants(), className)}
      style={{
        padding:    paddingMap[padding],
        color:      isDark ? "#fff" : "var(--color-ink)",
        ...backgroundMap[background],
        ...style,
      }}
      {...rest}
    >
      {halos && (
        <>
          {/* Halo K1 — top right */}
          <div
            aria-hidden
            style={{
              position:     "absolute",
              width:        700,
              height:       700,
              borderRadius: "50%",
              top:          -300,
              right:        -200,
              background:   "var(--grad-halo-k1)",
              pointerEvents: "none",
              opacity:       0.7,
            }}
          />
          {/* Halo K2 — bottom left */}
          <div
            aria-hidden
            style={{
              position:     "absolute",
              width:        500,
              height:       500,
              borderRadius: "50%",
              bottom:       -200,
              left:         -100,
              background:   "var(--grad-halo-k2)",
              pointerEvents: "none",
              opacity:       0.55,
            }}
          />
        </>
      )}
      {children}
    </section>
  );
}
