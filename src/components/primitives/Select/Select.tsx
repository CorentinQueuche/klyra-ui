import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

export const selectVariants = cva(
  [
    "w-full font-[inherit] appearance-none outline-none transition-all",
    "duration-[120ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "cursor-pointer",
    // padding-right réservé pour le chevron
    "pr-[36px]",
  ],
  {
    variants: {
      variant: {
        outline: [
          "bg-white border border-[var(--color-border-1)] rounded-[10px] text-[var(--color-fg-1)]",
          "focus:border-[var(--color-k1)] focus:[box-shadow:0_0_0_3px_rgba(0,63,228,0.18)]",
          "aria-invalid:border-[#C03535] aria-invalid:[box-shadow:0_0_0_3px_rgba(192,53,53,0.16)]",
        ],
        subtle: [
          "bg-[#F4F6FB] border-none rounded-[999px] text-[var(--color-fg-1)]",
          "focus:bg-white focus:border focus:border-[var(--color-k1)] focus:[box-shadow:0_0_0_3px_rgba(0,63,228,0.18)]",
        ],
        ghost: [
          "bg-transparent border-none border-b border-[var(--color-border-1)] rounded-none text-[var(--color-fg-1)]",
          "focus:border-[var(--color-k1)]",
        ],
      },
      size: {
        sm: ["text-[13px] py-[8px] px-[12px]"],
        md: ["text-[15px] py-[12px] px-[14px]"],
        lg: ["text-[16px] py-[14px] px-[16px]"],
      },
      tone: {
        light: [],
        dark: [
          "bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.18)] text-white",
          "focus:border-[var(--color-k2)] focus:[box-shadow:0_0_0_3px_rgba(1,164,255,0.22)]",
        ],
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      tone: "light",
    },
  }
);

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    Omit<VariantProps<typeof selectVariants>, "hasLeftIcon" | "hasRightSlot"> {
  variant?: "outline" | "subtle" | "ghost";
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  /** Options structurées (alternatif à children). */
  options?: SelectOption[];
  /** Texte de l'option vide (disabled). */
  placeholder?: string;
  /** Render custom d'options via children (option HTML). */
  children?: ReactNode;
}

function ChevronDown({ dark }: { dark?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none"
    >
      <path
        d="M3 5l4 4 4-4"
        stroke={dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = "outline",
      size = "md",
      tone = "light",
      options,
      placeholder,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          className={cn(selectVariants({ variant, size, tone }), className)}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className="absolute right-[12px] flex items-center pointer-events-none">
          <ChevronDown dark={tone === "dark"} />
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";
