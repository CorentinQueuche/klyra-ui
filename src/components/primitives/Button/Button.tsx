import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";
import { Arrow } from "../Arrow/Arrow";

/**
 * KLYRA Button — pill CTA signature.
 * Utiliser `asChild` pour rendre un <a> (next/link, etc.).
 * Forward ref compatible pour `asChild` pattern.
 */

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-[999px] font-medium",
    "transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]",
    "select-none whitespace-nowrap",
    "active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-k1)]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-white border-none",
          "bg-[linear-gradient(180deg,var(--color-k1)_0%,rgba(0,63,228,0.25)_100%)]",
          "[box-shadow:var(--shadow-cta)]",
          "hover:[box-shadow:var(--shadow-cta-hover)]",
          "hover:brightness-110",
        ],
        dark: [
          "bg-black text-white border-none",
          "hover:bg-[var(--color-ink-2)]",
        ],
        white: [
          "bg-white text-black border-none",
          "hover:bg-[var(--color-paper)]",
        ],
        ghost: [
          "bg-transparent",
          "border border-[rgba(0,0,0,0.15)]",
          "text-black",
          "hover:text-[var(--color-k1)]",
          "hover:border-[rgba(0,63,228,0.25)]",
        ],
        "ghost-dark": [
          "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.2)] text-white",
          "hover:bg-[rgba(255,255,255,0.1)]",
        ],
        link: [
          "bg-transparent border-none rounded-none px-0 py-[6px]",
          "text-[var(--color-k1)]",
          "underline underline-offset-2 decoration-1",
          "hover:decoration-2",
        ],
        "link-dark": [
          "bg-transparent border-none rounded-none px-0 py-[6px]",
          "text-white",
          "underline underline-offset-2 decoration-1",
          "hover:decoration-2",
        ],
      },
      size: {
        sm: ["text-[13px] px-[18px] py-[10px]"],
        md: ["text-[15px] px-[24px] py-[14px]"],
        lg: ["text-[16px] px-[32px] py-[18px]"],
        xl: ["text-[17px] px-[40px] py-[22px]"],
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Affiche une flèche signature à droite (par défaut sur variant primary). */
  iconRight?: ReactNode;
  /** Icône à gauche du label. */
  iconLeft?: ReactNode;
  /** Spinner de chargement — remplace l'icône droite. */
  loading?: boolean;
  /** Rend un <a> au lieu d'un <button>. */
  asChild?: boolean;
  /** Href utilisé quand asChild est vrai. */
  href?: string;
  /** Ouvre dans un nouvel onglet (asChild). */
  target?: string;
  rel?: string;
}

function Spinner({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{
        animation: "spin 0.8s linear infinite",
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="6"
        cy="6"
        r="4.5"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 6A4.5 4.5 0 0 0 6 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      iconLeft,
      iconRight,
      loading = false,
      disabled,
      asChild = false,
      href,
      target,
      rel,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const showDefaultArrow =
      variant === "primary" && !iconRight && !loading;

    const rightSlot = loading ? (
      <Spinner size={12} />
    ) : iconRight != null ? (
      iconRight
    ) : showDefaultArrow ? (
      <Arrow direction="up-right" size={10} />
    ) : null;

    const classes = cn(
      buttonVariants({ variant, size, fullWidth }),
      loading && "pointer-events-none text-white/70",
      className
    );

    const content = (
      <>
        {iconLeft && <span className="shrink-0">{iconLeft}</span>}
        {children}
        {rightSlot && <span className="shrink-0">{rightSlot}</span>}
      </>
    );

    if (asChild && href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={classes}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
