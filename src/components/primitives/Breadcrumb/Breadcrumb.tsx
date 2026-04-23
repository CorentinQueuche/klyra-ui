"use client";

import {
  Children,
  createContext,
  useContext,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../../lib/cn";

/* ============================================================
   CONTEXT — suivi de l'index pour le séparateur
   ============================================================ */

const BreadcrumbIndexCtx = createContext<number>(0);

/* ============================================================
   BREADCRUMB
   ============================================================ */

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Label accessible pour la navigation. Défaut : "Fil d'Ariane". */
  ariaLabel?: string;
}

/**
 * Breadcrumb — fil d'Ariane style KLYRA.
 *
 * Style monospace eyebrow + séparateur `→`.
 * Le dernier item sans `href` représente la page courante.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
 *   <Breadcrumb.Item href="/outils">Outils</Breadcrumb.Item>
 *   <Breadcrumb.Item>Simulateur de semaine</Breadcrumb.Item>
 * </Breadcrumb>
 * ```
 */
export function Breadcrumb({
  ariaLabel = "Fil d'Ariane",
  className,
  children,
  ...rest
}: BreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel} className={cn(className)} {...rest}>
      <ol
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0,
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.04em",
        }}
      >
        {Children.map(children, (child, index) => (
          <BreadcrumbIndexCtx.Provider value={index}>
            {child}
          </BreadcrumbIndexCtx.Provider>
        ))}
      </ol>
    </nav>
  );
}

/* ============================================================
   BREADCRUMB.ITEM
   ============================================================ */

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * URL de destination. Si absent, l'item est traité comme la page courante
   * (`aria-current="page"`, fontWeight 500, couleur fg-1).
   */
  href?: string;
  /** Attribut target pour les liens. */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
}

Breadcrumb.Item = function BreadcrumbItem({
  href,
  target,
  className,
  children,
  style,
  ...rest
}: BreadcrumbItemProps) {
  const index = useContext(BreadcrumbIndexCtx);
  const isCurrent = !href;
  const isFirst = index === 0;

  return (
    <li
      className={cn(className)}
      style={{ display: "inline-flex", alignItems: "center", gap: 0, ...style }}
      {...rest}
    >
      {/* Séparateur → avant chaque item sauf le premier */}
      {!isFirst && (
        <span
          aria-hidden="true"
          style={{
            color: "var(--color-fg-3)",
            margin: "0 6px",
            userSelect: "none",
          }}
        >
          →
        </span>
      )}

      {isCurrent ? (
        <span
          aria-current="page"
          style={{
            color: "var(--color-fg-1)",
            fontWeight: 500,
          }}
        >
          {children}
        </span>
      ) : (
        <a
          href={href}
          target={target}
          style={{
            color: "var(--color-fg-2)",
            textDecoration: "none",
            transition: "color 120ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-k1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-fg-2)";
          }}
        >
          {children}
        </a>
      )}
    </li>
  );
};

Breadcrumb.displayName = "Breadcrumb";
