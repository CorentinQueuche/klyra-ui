import { type SVGAttributes } from "react";
import { cn } from "../../../lib/cn";

export interface SpinnerProps extends SVGAttributes<SVGSVGElement> {
  /** Taille du spinner en px. Défaut : 16. */
  size?: number;
  /**
   * Couleur du trait. Défaut : `currentColor` — hérite de la couleur du texte parent.
   * Exemples : `"var(--color-k1)"`, `"#fff"`, `"currentColor"`.
   */
  color?: string;
  /** Label accessible (masqué visuellement). Défaut : "Chargement en cours". */
  ariaLabel?: string;
}

/**
 * Spinner — indicateur de chargement circulaire discret.
 *
 * Cercle SVG stroke currentColor, arc 75%, rotation 720 ms linéaire.
 * Utilisé notamment dans Button[loading].
 */
export function Spinner({
  size = 16,
  color = "currentColor",
  ariaLabel = "Chargement en cours",
  className,
  style,
  ...rest
}: SpinnerProps) {
  const r = (size - 2) / 2; // rayon avec marge pour strokeWidth
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashArray = circumference * 0.75; // arc 75%
  const dashOffset = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-label={ariaLabel}
      role="status"
      className={cn(className)}
      style={{
        animation: "klyra-spin 720ms linear infinite",
        ...style,
      }}
      {...rest}
    >
      <style>{`
        @keyframes klyra-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      {/* Piste de fond (25% restants) */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={color}
        strokeOpacity={0.2}
        strokeWidth={1.75}
      />
      {/* Arc principal 75% */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeDasharray={`${dashArray} ${circumference}`}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}
