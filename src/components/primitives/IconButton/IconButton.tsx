import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

/**
 * KLYRA IconButton — bouton carré à coin 10px pour actions de navbar / topbar.
 * Toujours fournir `ariaLabel` pour l'accessibilité.
 */

export const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0 rounded-[10px]",
    "transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]",
    "active:scale-[0.95]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-k1)]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "cursor-pointer border-none",
  ],
  {
    variants: {
      variant: {
        outline: [
          "bg-white border border-[var(--color-gray-k1)] text-[var(--color-ink)]",
          "hover:border-[var(--color-k1)] hover:text-[var(--color-k1)]",
        ],
        subtle: [
          "bg-[rgba(0,63,228,0.08)] text-[var(--color-k1)] border-none",
          "hover:bg-[rgba(0,63,228,0.14)]",
        ],
        ghost: [
          "bg-transparent text-[var(--color-ink)] border-none",
          "hover:bg-[rgba(0,0,0,0.06)] hover:text-[var(--color-k1)]",
        ],
        primary: [
          "text-white border-none",
          "bg-[linear-gradient(180deg,var(--color-k1)_0%,rgba(0,63,228,0.25)_100%)]",
          "[box-shadow:var(--shadow-cta)]",
          "hover:[box-shadow:var(--shadow-cta-hover)] hover:brightness-110",
        ],
        "ghost-dark": [
          "bg-transparent text-white border-none",
          "hover:bg-[rgba(255,255,255,0.08)]",
        ],
      },
      size: {
        sm: ["w-7 h-7"],
        md: ["w-9 h-9"],
        lg: ["w-11 h-11"],
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconButtonVariants> {
  /** Icône React (16-18px recommandé). */
  icon: ReactNode;
  /** Obligatoire pour l'accessibilité. */
  ariaLabel: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant, size, icon, ariaLabel, className, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        disabled={disabled}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...rest}
      >
        <span aria-hidden="true" className="flex items-center justify-center">
          {icon}
        </span>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
