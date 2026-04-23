"use client";

import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../../lib/cn";

/* ============================================================
   STATUS BADGE — inline (pas de dépendance Badge externe).
   Utilisé uniquement dans Table.Cell pour les statuts métier.
   ============================================================ */

/** Couleurs de statuts métier autorisées dans les tableaux KLYRA. */
export type StatusColor =
  | "blue"    // Envoyé → K1 #003FE4
  | "green"   // Accepté → #0C9D4C
  | "amber"   // Négociation → #C57A00
  | "gray"    // Brouillon → #6A6A6A
  | "red";    // Refusé → #C03535

const STATUS_COLOR_MAP: Record<StatusColor, { bg: string; fg: string }> = {
  blue:  { bg: "rgba(0,63,228,0.09)",   fg: "#003FE4" },
  green: { bg: "rgba(12,157,76,0.09)",  fg: "#0C9D4C" },
  amber: { bg: "rgba(197,122,0,0.10)",  fg: "#C57A00" },
  gray:  { bg: "rgba(106,106,106,0.10)", fg: "#6A6A6A" },
  red:   { bg: "rgba(192,53,53,0.09)",  fg: "#C03535" },
};

export interface StatusPillProps {
  label: string;
  color: StatusColor;
}

/** Pill de statut inline — usage exclusif dans les cellules de tableau. */
export function StatusPill({ label, color }: StatusPillProps) {
  const { bg, fg } = STATUS_COLOR_MAP[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 500,
        background: bg,
        color: fg,
        letterSpacing: "0.01em",
        lineHeight: 1.5,
      }}
    >
      {label}
    </span>
  );
}

/* ============================================================
   TABLE WRAPPER
   ============================================================ */

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Mode compact — réduit le padding des cellules.
   * Row : 10 px vertical (au lieu de 14 px).
   */
  compact?: boolean;
  /**
   * Alternance de couleur sur les lignes paires (zebra stripes).
   * Lignes paires → `#FAFAFB`.
   */
  zebra?: boolean;
}

interface TableContextValue {
  compact: boolean;
  zebra: boolean;
}

const TableCtx = createContext<TableContextValue>({ compact: false, zebra: false });

/**
 * Table — tableau de données style Dashboard KLYRA.
 *
 * Composition : `Table > Table.Toolbar? > Table.Header > Table.HeaderCell > Table.Body > Table.Row > Table.Cell > Table.Footer?`
 *
 * @example
 * ```tsx
 * <Table>
 *   <Table.Header>
 *     <Table.HeaderCell>Client</Table.HeaderCell>
 *     <Table.HeaderCell align="right">Montant</Table.HeaderCell>
 *   </Table.Header>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>Boulangerie Martin</Table.Cell>
 *       <Table.Cell align="right">2 400 €</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
export function Table({ compact = false, zebra = false, className, children, ...rest }: TableProps) {
  return (
    <TableCtx.Provider value={{ compact, zebra }}>
      <div
        className={cn(className)}
        style={{
          background: "#fff",
          border: "1px solid #E0E0E0",
          borderRadius: 14,
          overflow: "hidden",
        }}
        {...rest}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          {children}
        </table>
      </div>
    </TableCtx.Provider>
  );
}

/* ============================================================
   TABLE.TOOLBAR
   ============================================================ */

export interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Titre de la section. */
  title: string;
  /** Sous-titre (ex : "5 devis · mis à jour il y a 2 min"). */
  subtitle?: string;
  /** Action à droite (lien, bouton, etc.). */
  action?: ReactNode;
}

Table.Toolbar = function TableToolbar({
  title,
  subtitle,
  action,
  className,
  ...rest
}: TableToolbarProps) {
  return (
    <div
      className={cn(className)}
      style={{
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E0E0E0",
      }}
      {...rest}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--color-fg-1)" }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: "var(--color-fg-3)", marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

/* ============================================================
   TABLE.HEADER
   ============================================================ */

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

Table.Header = function TableHeader({ className, children, ...rest }: TableHeaderProps) {
  return (
    <thead
      className={cn(className)}
      style={{
        background: "#FAFAFB",
        color: "rgba(0,0,0,0.55)",
        fontSize: 11,
        letterSpacing: "0.04em",
        fontFamily: "var(--font-mono)",
      }}
      {...rest}
    >
      <tr>{children}</tr>
    </thead>
  );
};

/* ============================================================
   TABLE.HEADER CELL
   ============================================================ */

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Alignement du contenu. Défaut : "left". */
  align?: "left" | "center" | "right";
  /** Affiche un chevron indiquant l'ordre de tri (visuel uniquement). */
  sortDirection?: "asc" | "desc" | "none";
}

Table.HeaderCell = function TableHeaderCell({
  align = "left",
  sortDirection,
  className,
  children,
  style,
  ...rest
}: TableHeaderCellProps) {
  return (
    <th
      className={cn(className)}
      style={{
        textAlign: align,
        padding: "10px 20px",
        fontWeight: 500,
        ...style,
      }}
      {...rest}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {children}
        {sortDirection && sortDirection !== "none" && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            style={{ opacity: 0.6 }}
          >
            {sortDirection === "asc" ? (
              <path d="M2 7 L5 3 L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M2 3 L5 7 L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        )}
      </span>
    </th>
  );
};

/* ============================================================
   TABLE.BODY
   ============================================================ */

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

Table.Body = function TableBody({ className, children, ...rest }: TableBodyProps) {
  return (
    <tbody className={cn(className)} {...rest}>
      {children}
    </tbody>
  );
};

/* ============================================================
   TABLE.ROW
   ============================================================ */

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Marque la ligne comme sélectionnée (bg bleu très léger). */
  selected?: boolean;
  /** Rend la ligne cliquable (cursor pointer). */
  clickable?: boolean;
  /** Index de la ligne pour les zebra stripes (fourni par Table.Body si nécessaire). */
  rowIndex?: number;
}

Table.Row = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { selected = false, clickable = false, rowIndex, className, style, children, ...rest },
  ref
) {
  const { compact, zebra } = useContext(TableCtx);
  const isEven = typeof rowIndex === "number" && rowIndex % 2 === 0;
  const zebraBg = zebra && isEven ? "#FAFAFB" : undefined;

  return (
    <tr
      ref={ref}
      className={cn(className)}
      style={{
        borderTop: "1px solid #F0F0F5",
        background: selected
          ? "rgba(0,63,228,0.06)"
          : zebraBg,
        cursor: clickable ? "pointer" : undefined,
        transition: "background 120ms ease",
        ...style,
      }}
      data-compact={compact || undefined}
      {...rest}
    />
  );
});

/* ============================================================
   TABLE.CELL
   ============================================================ */

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Alignement du contenu. Défaut : "left". */
  align?: "left" | "center" | "right";
  /** Style de texte. `mono` active la police monospace + tabular-nums. */
  variant?: "default" | "mono" | "muted" | "strong";
}

Table.Cell = function TableCell({
  align = "left",
  variant = "default",
  className,
  style,
  children,
  ...rest
}: TableCellProps) {
  const { compact } = useContext(TableCtx);

  const variantStyles: React.CSSProperties =
    variant === "mono"
      ? { fontFamily: "var(--font-mono)", fontWeight: 500, fontVariantNumeric: "tabular-nums" }
      : variant === "muted"
      ? { color: "rgba(0,0,0,0.55)" }
      : variant === "strong"
      ? { fontWeight: 500 }
      : {};

  return (
    <td
      className={cn(className)}
      style={{
        padding: compact ? "10px 20px" : "14px 20px",
        textAlign: align,
        color: "var(--color-fg-1)",
        ...variantStyles,
        ...style,
      }}
      {...rest}
    >
      {children}
    </td>
  );
};

/* ============================================================
   TABLE.FOOTER
   ============================================================ */

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Lien "Tout voir →" ou autre action. */
  action?: ReactNode;
}

Table.Footer = function TableFooter({ action, className, children, ...rest }: TableFooterProps) {
  return (
    <tfoot className={cn(className)} {...rest}>
      <tr>
        <td
          colSpan={999}
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #E0E0E0",
            textAlign: "center",
            fontSize: 12,
            color: "var(--color-fg-3)",
          }}
        >
          {action ?? children}
        </td>
      </tr>
    </tfoot>
  );
};

Table.displayName = "Table";
