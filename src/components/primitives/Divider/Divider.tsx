import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

/**
 * Divider — hairline 1px. Signature KLYRA : préserve les filets qui séparent
 * colonnes et rows sur les pages du brand book.
 */

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** Marge sur les deux extrémités (en px). */
  inset?: number;
  /** Ton selon la surface d'accueil. */
  tone?: "light" | "dark";
  /** Épaisseur (px). 1 par défaut — signature. */
  thickness?: number;
}

export function Divider({
  orientation = "horizontal",
  inset = 0,
  tone = "light",
  thickness = 1,
  className,
  style,
  role = "separator",
  ...rest
}: DividerProps) {
  const color = tone === "dark" ? "rgba(255, 255, 255, 0.14)" : "#E0E0E0";
  const s: CSSProperties =
    orientation === "horizontal"
      ? {
          width: `calc(100% - ${inset * 2}px)`,
          height: thickness,
          marginLeft: inset,
          marginRight: inset,
          background: color,
        }
      : {
          width: thickness,
          height: `calc(100% - ${inset * 2}px)`,
          marginTop: inset,
          marginBottom: inset,
          background: color,
          alignSelf: "stretch",
        };

  return (
    <div
      role={role}
      aria-orientation={orientation}
      className={cn("klyra-divider", className)}
      style={{ ...s, ...style }}
      {...rest}
    />
  );
}
