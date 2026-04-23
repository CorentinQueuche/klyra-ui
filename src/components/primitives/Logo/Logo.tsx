import type { CSSProperties } from "react";
import { cn } from "../../../lib/cn";

/**
 * KLYRA logo — 3 lockups, sized by height (width auto).
 * - `original` = K-mark in Bleu K1 + black wordmark (primary lockup).
 * - `dark`     = fully black (on light bg).
 * - `white`    = fully white (on dark / blue bg).
 * - `wordmark` = white wordmark only, no K-mark (PNG).
 * - `mark`     = favicon / K-mark only, rounded-square badge.
 *
 * Brand book rule: never use `white` on blue; `mark` on blue/white is OK.
 * Respect ≥ 60% contrast against background.
 */

type LogoVariant = "original" | "dark" | "white" | "wordmark" | "mark";

const srcMap: Record<LogoVariant, string> = {
  original: "/logos/klyra-logo-original.svg",
  dark:     "/logos/klyra-logo-dark.svg",
  white:    "/logos/klyra-logo-white.svg",
  wordmark: "/logos/klyra-logotype-white.png",
  mark:     "/logos/favicon.png",
};

export interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
  style?: CSSProperties;
  /** Accessible name. Pass "" to treat as decoration. */
  alt?: string;
}

export function Logo({
  variant = "original",
  height = 28,
  className,
  style,
  alt = "Klyra Design",
}: LogoProps) {
  return (
    <img
      src={srcMap[variant]}
      alt={alt}
      className={cn("klyra-logo", className)}
      style={{ height, width: "auto", display: "inline-block", ...style }}
    />
  );
}
