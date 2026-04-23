import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

/* ------------------------------------------------------------------ */
/*  Spinner                                                             */
/* ------------------------------------------------------------------ */
function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M12.5 7A5.5 5.5 0 0 0 7 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Variants                                                            */
/* ------------------------------------------------------------------ */
export const inputVariants = cva(
  [
    "w-full font-[inherit] outline-none transition-all",
    "duration-[120ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]",
    "placeholder:text-[var(--color-fg-3)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        outline: [
          "bg-white border border-[var(--color-border-1)] rounded-[10px]",
          "focus:border-[var(--color-k1)] focus:[box-shadow:0_0_0_3px_rgba(0,63,228,0.18)]",
          "aria-invalid:border-[#C03535] aria-invalid:[box-shadow:0_0_0_3px_rgba(192,53,53,0.16)]",
        ],
        subtle: [
          "bg-[#F4F6FB] border-none rounded-[999px]",
          "focus:bg-white focus:border focus:border-[var(--color-k1)] focus:[box-shadow:0_0_0_3px_rgba(0,63,228,0.18)]",
          "aria-invalid:border aria-invalid:border-[#C03535] aria-invalid:[box-shadow:0_0_0_3px_rgba(192,53,53,0.16)]",
        ],
        ghost: [
          "bg-transparent border-none border-b border-[var(--color-border-1)] rounded-none",
          "focus:border-[var(--color-k1)]",
          "aria-invalid:border-[#C03535]",
        ],
      },
      size: {
        sm: ["text-[13px] py-[8px] px-[12px]"],
        md: ["text-[15px] py-[12px] px-[14px]"],
        lg: ["text-[16px] py-[14px] px-[16px]"],
      },
      tone: {
        light: ["text-[var(--color-fg-1)]"],
        dark: [
          "bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.18)] text-white",
          "placeholder:text-[rgba(255,255,255,0.5)]",
          "focus:border-[var(--color-k2)] focus:[box-shadow:0_0_0_3px_rgba(1,164,255,0.22)]",
        ],
      },
      hasLeftIcon: {
        true: "",
        false: "",
      },
      hasRightSlot: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { size: "sm", hasLeftIcon: true, class: "pl-[32px]" },
      { size: "md", hasLeftIcon: true, class: "pl-[38px]" },
      { size: "lg", hasLeftIcon: true, class: "pl-[44px]" },
      { size: "sm", hasRightSlot: true, class: "pr-[32px]" },
      { size: "md", hasRightSlot: true, class: "pr-[40px]" },
      { size: "lg", hasRightSlot: true, class: "pr-[48px]" },
    ],
    defaultVariants: {
      variant: "outline",
      size: "md",
      tone: "light",
      hasLeftIcon: false,
      hasRightSlot: false,
    },
  }
);

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputVariants>, "hasLeftIcon" | "hasRightSlot"> {
  variant?: "outline" | "subtle" | "ghost";
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  /** Icône ou ReactNode placé à gauche (ex: loupe). */
  leftIcon?: ReactNode;
  /** Icône ou ReactNode placé à droite (ex: kbd "⌘K"). */
  rightIcon?: ReactNode;
  /** Affiche un bouton ✕ qui vide le champ. */
  clearable?: boolean;
  /** Callback appelé quand l'utilisateur clique sur ✕. */
  onClear?: () => void;
  /** Affiche un spinner à droite. */
  loading?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size = "md",
      tone = "light",
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      loading,
      className,
      value,
      onChange,
      ...rest
    },
    ref
  ) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightSlot = !!(rightIcon || clearable || loading);

    const rightSlot = loading ? (
      <Spinner />
    ) : clearable && value ? (
      <button
        type="button"
        onClick={onClear}
        aria-label="Effacer le champ"
        className="flex items-center justify-center text-[var(--color-fg-3)] hover:text-[var(--color-fg-1)] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    ) : rightIcon ? (
      rightIcon
    ) : null;

    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span
            className={cn(
              "absolute left-0 flex items-center pointer-events-none text-[var(--color-fg-3)]",
              size === "sm" && "pl-[10px]",
              size === "md" && "pl-[12px]",
              size === "lg" && "pl-[14px]"
            )}
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          value={value}
          onChange={onChange}
          className={cn(
            inputVariants({ variant, size, tone, hasLeftIcon, hasRightSlot }),
            className
          )}
          {...rest}
        />

        {rightSlot && (
          <span
            className={cn(
              "absolute right-0 flex items-center",
              size === "sm" && "pr-[10px]",
              size === "md" && "pr-[12px]",
              size === "lg" && "pr-[14px]"
            )}
          >
            {rightSlot}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
