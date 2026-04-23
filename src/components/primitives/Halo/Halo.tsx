"use client";

import { type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

/** Couleurs de halo autorisées par le brand book KLYRA 2026. */
type HaloColor = "k1" | "k2" | "k3" | "k1-deep";

const colorMap: Record<HaloColor, string> = {
  k1: "0,63,228",
  k2: "1,164,255",
  k3: "0,221,255",
  "k1-deep": "0,45,164",
};

export interface HaloProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Couleur du halo.
   * - `k1` : bleu KLYRA dominant #003FE4 (défaut)
   * - `k2` : bleu clair #01A4FF
   * - `k3` : cyan accent #00DDFF
   * - `k1-deep` : bleu profond #002DA4
   */
  color?: HaloColor;
  /** Opacité du centre du halo (0–1). Défaut : 0.75. */
  opacity?: number;
  /**
   * Diamètre en px. Si tuple [w, h], forme elliptique.
   * Brand book : 500–2700 px. Défaut : 500.
   */
  size?: number | [number, number];
  /**
   * Flou CSS filter appliqué au halo (px).
   * Utile pour les grands halos très diffus (40–60 recommandé).
   * Défaut : 0 (pas de flou additionnel).
   */
  blur?: number;
  /**
   * Position absolue du centre du halo.
   * Valeurs en px ou chaîne CSS ("50%", "-120px", etc.).
   */
  position?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
}

function toCss(val: number | string): string {
  return typeof val === "number" ? `${val}px` : val;
}

/**
 * Halo — motif radial signature KLYRA.
 *
 * Toujours positionné en `absolute` dans un conteneur `relative overflow-hidden`.
 * Pensé pour être off-canvas (partiellement ou totalement hors du viewport).
 * `pointerEvents: none` — jamais interactif.
 */
export function Halo({
  color = "k1",
  opacity = 0.75,
  size = 500,
  blur = 0,
  position,
  className,
  style,
  ...rest
}: HaloProps) {
  const [w, h] = Array.isArray(size) ? size : [size, size];
  const rgb = colorMap[color];

  const inlineStyle: CSSProperties = {
    position: "absolute",
    width: w,
    height: h,
    borderRadius: "50%",
    background: `radial-gradient(50% 50% at 50% 50%, rgba(${rgb},${opacity}) 0%, rgba(${rgb},0) 70%)`,
    pointerEvents: "none",
    filter: blur > 0 ? `blur(${blur}px)` : undefined,
    top: position?.top !== undefined ? toCss(position.top) : undefined,
    right: position?.right !== undefined ? toCss(position.right) : undefined,
    bottom: position?.bottom !== undefined ? toCss(position.bottom) : undefined,
    left: position?.left !== undefined ? toCss(position.left) : undefined,
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      className={cn(className)}
      style={inlineStyle}
      {...rest}
    />
  );
}
