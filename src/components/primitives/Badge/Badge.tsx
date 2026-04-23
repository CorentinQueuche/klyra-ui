import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

/**
 * KLYRA Badge — pill statique pour labels, catégories et statuts.
 * Utiliser `dot` pour afficher un indicateur coloré à gauche.
 */

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-[999px] font-medium select-none whitespace-nowrap",
    "[letter-spacing:-0.01em]",
  ],
  {
    variants: {
      variant: {
        k1: "bg-[var(--color-k1)] text-white",
        k2: "bg-[var(--color-k2)] text-white",
        k3: "bg-[var(--color-k3)] text-[var(--color-blue-deep)]",
        tinted: "bg-[rgba(0,63,228,0.1)] text-[var(--color-k1)]",
        ink: "bg-[var(--color-ink)] text-white",
        neutral: "bg-[var(--color-gray-k1)] text-[var(--color-ink)]",
        ghost: "bg-transparent border border-[rgba(0,0,0,0.12)] text-[var(--color-ink)]",
        "outline-k1": "bg-transparent border border-[var(--color-k1)] text-[var(--color-k1)]",
        success: "bg-[rgba(12,157,76,0.12)] text-[#0C9D4C]",
        warning: "bg-[rgba(197,122,0,0.12)] text-[#C57A00]",
        danger: "bg-[rgba(192,53,53,0.12)] text-[#C03535]",
        info: "bg-[rgba(0,221,255,0.2)] text-[var(--color-blue-deep)]",
      },
      size: {
        sm: "text-[11px] px-2 py-[3px]",
        md: "text-[13px] px-3 py-[6px]",
        lg: "text-[14px] px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "tinted",
      size: "md",
    },
  }
);

/** Couleur du dot selon la variant */
const dotColorFor: Record<string, string> = {
  k1: "var(--color-k1)",
  k2: "var(--color-k2)",
  k3: "var(--color-blue-deep)",
  tinted: "var(--color-k1)",
  ink: "var(--color-white)",
  neutral: "var(--color-ink)",
  ghost: "var(--color-ink)",
  "outline-k1": "var(--color-k1)",
  success: "#0C9D4C",
  warning: "#C57A00",
  danger: "#C03535",
  info: "var(--color-blue-deep)",
};

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
  /** Affiche un dot 6px de la couleur du texte à gauche. */
  dot?: boolean;
}

export function Badge({
  variant = "tinted",
  size = "md",
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  const dotColor = dotColorFor[variant ?? "tinted"] ?? "currentColor";

  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: dotColor,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}
