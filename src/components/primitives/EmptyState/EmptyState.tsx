import { type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

/* ============================================================
   DEFAULT ICON — gros rond pointillé avec + centré
   ============================================================ */

function DefaultIcon() {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx={24}
        cy={24}
        r={22}
        stroke="var(--color-gray-k1)"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
      <path
        d="M24 16v16M16 24h16"
        stroke="var(--color-fg-3)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================================================
   VARIANTS
   ============================================================ */

const emptyStateVariants = cva(
  [
    "flex flex-col",
    "p-12",
    "rounded-[20px]",
    "border border-dashed",
  ],
  {
    variants: {
      tone: {
        light: [
          "bg-[var(--color-paper)]",
          "border-[var(--color-gray-k1)]",
        ],
        dark: [
          "bg-[rgba(255,255,255,0.04)]",
          "border-[rgba(255,255,255,0.12)]",
        ],
      },
      align: {
        center: "items-center text-center",
        left:   "items-start text-left",
      },
    },
    defaultVariants: {
      tone: "light",
      align: "center",
    },
  }
);

/* ============================================================
   PROPS
   ============================================================ */

export interface EmptyStateProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /**
   * Icône affichée en haut du bloc.
   * Défaut : rond pointillé avec `+` centré (48 px).
   */
  icon?: ReactNode;
  /** Titre principal (obligatoire). */
  title: string;
  /** Description optionnelle. */
  description?: string;
  /** Action CTA — typiquement un `<Button>`. */
  action?: ReactNode;
}

/**
 * EmptyState — bloc "rien à afficher" style KLYRA.
 *
 * Fond paper, bordure pointillée gray-k1, icône 48 px, titre + description + CTA optionnel.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="Aucun devis pour l'instant."
 *   description="Créez votre premier devis pour démarrer le suivi."
 *   action={<Button size="sm">Nouveau devis</Button>}
 * />
 * ```
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  tone = "light",
  align = "center",
  className,
  ...rest
}: EmptyStateProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(emptyStateVariants({ tone, align }), className)}
      {...rest}
    >
      {/* Icon */}
      <div
        style={{
          marginBottom: 16,
          opacity: isDark ? 0.6 : 1,
        }}
      >
        {icon ?? <DefaultIcon />}
      </div>

      {/* Title */}
      <p
        style={{
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: isDark ? "var(--color-fg-on-dark-1)" : "var(--color-fg-1)",
          margin: 0,
        }}
      >
        {title}
      </p>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            color: isDark ? "var(--color-fg-on-dark-2)" : "var(--color-fg-2)",
            margin: "6px 0 0 0",
            maxWidth: 360,
          }}
        >
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <div style={{ marginTop: 20 }}>
          {action}
        </div>
      )}
    </div>
  );
}
