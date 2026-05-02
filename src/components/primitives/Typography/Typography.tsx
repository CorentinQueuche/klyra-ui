import { createElement, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../../lib/cn";

/**
 * KLYRA Typography — 10 type roles, sentence-case by default.
 * Scale, tracking and leading come from Brand Guidelines p.21.
 * Prefer these over raw classes so the system stays consistent.
 */

type TypeVariant =
  | "display-xl"
  | "display-l"
  | "display-m"
  | "display-s"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-l"
  | "body"
  | "body-s"
  | "caption"
  | "eyebrow"
  | "micro";

const styleMap: Record<TypeVariant, CSSProperties> = {
  "display-xl": { fontSize: 160, fontWeight: 500, lineHeight: 0.9,  letterSpacing: "-0.0325em" },
  "display-l":  { fontSize: 105, fontWeight: 400, lineHeight: 0.925, letterSpacing: "-0.05em" },
  "display-m":  { fontSize: 70,  fontWeight: 400, lineHeight: 0.925, letterSpacing: "-0.05em" },
  "display-s":  { fontSize: 60,  fontWeight: 500, lineHeight: 0.9,   letterSpacing: "-0.0325em" },
  h1:           { fontSize: 48,  fontWeight: 500, lineHeight: 0.95,  letterSpacing: "-0.0325em" },
  h2:           { fontSize: 40,  fontWeight: 500, lineHeight: 0.95,  letterSpacing: "-0.0325em" },
  h3:           { fontSize: 28,  fontWeight: 500, lineHeight: 1.15,  letterSpacing: "-0.0325em" },
  h4:           { fontSize: 24,  fontWeight: 500, lineHeight: 1.2,   letterSpacing: "-0.0325em" },
  "body-l":     { fontSize: 22,  fontWeight: 400, lineHeight: 1.4,   letterSpacing: "-0.0125em" },
  body:         { fontSize: 18,  fontWeight: 400, lineHeight: 1.4,   letterSpacing: "-0.0125em" },
  "body-s":     { fontSize: 16,  fontWeight: 400, lineHeight: 1.4,   letterSpacing: "-0.0125em" },
  caption:      { fontSize: 14,  fontWeight: 500, lineHeight: 1.2,   letterSpacing: 0 },
  eyebrow:      { fontSize: 13,  fontWeight: 500, lineHeight: 1,     letterSpacing: 0, fontFamily: "var(--font-mono)" },
  micro:        { fontSize: 12,  fontWeight: 500, lineHeight: 1.2,   letterSpacing: 0 },
};

const defaultTagFor: Record<TypeVariant, ElementType> = {
  "display-xl": "h1",
  "display-l":  "h1",
  "display-m":  "h1",
  "display-s":  "h2",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  "body-l": "p",
  body: "p",
  "body-s": "p",
  caption: "span",
  eyebrow: "span",
  micro: "span",
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypeVariant;
  as?: ElementType;
  balance?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

export function Typography({
  variant = "body",
  as,
  balance,
  className,
  style,
  children,
  ...rest
}: TypographyProps) {
  const Tag = (as || defaultTagFor[variant]) as ElementType;
  return createElement(
    Tag,
    {
      className: cn("klyra-type", className),
      style: {
        // margin: 0 retiré (laissait l'inline style écraser mx-auto Tailwind
        // utilisé par les consommateurs pour centrer un bloc texte). Tailwind
        // preflight gère déjà le reset des marges des h1/p, donc inutile ici.
        fontFamily: variant === "eyebrow" ? "var(--font-mono)" : "inherit",
        textWrap: balance ? "balance" : undefined,
        ...styleMap[variant],
        ...style,
      },
      ...rest,
    },
    children
  );
}

/* -- Convenience exports — one per variant, no options to think about. */
export const DisplayXL  = (p: Omit<TypographyProps, "variant">) => <Typography variant="display-xl" {...p} />;
export const DisplayL   = (p: Omit<TypographyProps, "variant">) => <Typography variant="display-l" {...p} />;
export const DisplayM   = (p: Omit<TypographyProps, "variant">) => <Typography variant="display-m" {...p} />;
export const DisplayS   = (p: Omit<TypographyProps, "variant">) => <Typography variant="display-s" {...p} />;
export const H1         = (p: Omit<TypographyProps, "variant">) => <Typography variant="h1" {...p} />;
export const H2         = (p: Omit<TypographyProps, "variant">) => <Typography variant="h2" {...p} />;
export const H3         = (p: Omit<TypographyProps, "variant">) => <Typography variant="h3" {...p} />;
export const H4         = (p: Omit<TypographyProps, "variant">) => <Typography variant="h4" {...p} />;
export const BodyL      = (p: Omit<TypographyProps, "variant">) => <Typography variant="body-l" {...p} />;
export const Body       = (p: Omit<TypographyProps, "variant">) => <Typography variant="body" {...p} />;
export const BodyS      = (p: Omit<TypographyProps, "variant">) => <Typography variant="body-s" {...p} />;
export const Caption    = (p: Omit<TypographyProps, "variant">) => <Typography variant="caption" {...p} />;
export const Eyebrow    = (p: Omit<TypographyProps, "variant">) => <Typography variant="eyebrow" {...p} />;
export const Micro      = (p: Omit<TypographyProps, "variant">) => <Typography variant="micro" {...p} />;
