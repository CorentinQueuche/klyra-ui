import type { CSSProperties } from "react";
import { cn } from "../../../lib/cn";

/**
 * KLYRA signature arrow — used both as a textual motif (→) and as a 45°
 * chevron on CTAs. Never an emoji.
 */

type ArrowDirection = "up-right" | "right" | "down-right" | "down" | "down-left" | "left" | "up-left" | "up";

const rotateFor: Record<ArrowDirection, number> = {
  "up-right": 45,
  right: 90,
  "down-right": 135,
  down: 180,
  "down-left": 225,
  left: 270,
  "up-left": 315,
  up: 0,
};

export interface ArrowProps {
  /** Chevron direction, based on an arrow pointing up-right at rotation 0. */
  direction?: ArrowDirection;
  /** Size in px (width/height). */
  size?: number;
  /** Stroke thickness. */
  thickness?: number;
  /** Explicit CSS color. Defaults to `currentColor`. */
  color?: string;
  /** Render as an inline motif glyph (`→`, `↗`, `↘`, …) instead of an SVG chevron. */
  motif?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

const motifGlyphFor: Record<ArrowDirection, string> = {
  "up-right": "↗",
  right: "→",
  "down-right": "↘",
  down: "↓",
  "down-left": "↙",
  left: "←",
  "up-left": "↖",
  up: "↑",
};

export function Arrow({
  direction = "up-right",
  size = 12,
  thickness = 1.5,
  color,
  motif = false,
  className,
  style,
  ariaLabel,
}: ArrowProps) {
  if (motif) {
    return (
      <span
        className={cn("klyra-arrow-motif", className)}
        style={{ color, display: "inline-block", ...style }}
        aria-label={ariaLabel}
        role={ariaLabel ? "img" : undefined}
      >
        {motifGlyphFor[direction]}
      </span>
    );
  }
  return (
    <span
      className={cn("klyra-arrow", className)}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        position: "relative",
        color,
        transform: `rotate(${rotateFor[direction]}deg)`,
        ...style,
      }}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderTop: `${thickness}px solid currentColor`,
          borderRight: `${thickness}px solid currentColor`,
          transform: "translate(-1px, 1px)",
        }}
      />
    </span>
  );
}
