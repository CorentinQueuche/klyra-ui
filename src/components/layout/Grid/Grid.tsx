import type { HTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "../../../lib/cn";

/* ─── Component ─────────────────────────────────────────────────── */

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Nombre de colonnes, ou "responsive" (auto-fill minmax 280px) */
  cols?:    number | "responsive";
  /** Gap global en px — défaut 16 */
  gap?:     number;
  /** Row gap spécifique (overwrite gap) */
  rowGap?:  number;
  /** Column gap spécifique (overwrite gap) */
  colGap?:  number;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Grid({
  cols   = 12,
  gap    = 16,
  rowGap,
  colGap,
  className,
  children,
  style,
  ...rest
}: GridProps) {
  const gridTemplateColumns =
    cols === "responsive"
      ? "repeat(auto-fill, minmax(280px, 1fr))"
      : `repeat(${cols}, minmax(0, 1fr))`;

  return (
    <div
      className={cn("grid", className)}
      style={{
        gridTemplateColumns,
        gap:           rowGap != null || colGap != null ? undefined : gap,
        rowGap:        rowGap ?? (rowGap == null && colGap != null ? gap : undefined),
        columnGap:     colGap ?? (colGap == null && rowGap != null ? gap : undefined),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
