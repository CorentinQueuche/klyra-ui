import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../../lib/cn";

/**
 * KLYRA Tag — chip interactif. Similaire au Badge mais avec bouton X optionnel
 * pour suppression (pattern filtre, sélection multiple).
 */

export const tagVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-[999px] font-medium select-none whitespace-nowrap",
    "[letter-spacing:-0.01em]",
    "transition-colors duration-[120ms]",
  ],
  {
    variants: {
      variant: {
        default: "bg-[#F2F4FB] text-[var(--color-k1)]",
        solid: "bg-[var(--color-k1)] text-white",
        outline: "bg-transparent border border-[var(--color-k1)] text-[var(--color-k1)]",
      },
      size: {
        sm: "text-[12px] px-2.5 py-[4px]",
        md: "text-[13px] px-3 py-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TagProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof tagVariants> {
  children: ReactNode;
  /** Callback de suppression — affiche un bouton X si fourni. */
  onRemove?: () => void;
  /** Icône à gauche du label. */
  leftIcon?: ReactNode;
  disabled?: boolean;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = "default",
      size = "md",
      children,
      onRemove,
      leftIcon,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        aria-disabled={disabled || undefined}
        className={cn(
          tagVariants({ variant, size }),
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...rest}
      >
        {leftIcon && (
          <span aria-hidden="true" className="shrink-0 flex items-center">
            {leftIcon}
          </span>
        )}
        {children}
        {onRemove && (
          <button
            type="button"
            aria-label="Supprimer"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            disabled={disabled}
            className={cn(
              "shrink-0 flex items-center justify-center rounded-full",
              "opacity-60 hover:opacity-100",
              "transition-opacity duration-[120ms]",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-k1)]",
              "cursor-pointer border-none bg-transparent p-0",
              "-mr-0.5"
            )}
          >
            <X size={size === "sm" ? 10 : 12} strokeWidth={2.5} />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";
