"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../../lib/cn";

/* ------------------------------------------------------------------ */
/*  Size config                                                         */
/* ------------------------------------------------------------------ */
const sizeConfig = {
  sm: { track: "w-[28px] h-[16px]", knob: "w-[12px] h-[12px]", offset: 2, translateOn: 12 },
  md: { track: "w-[36px] h-[20px]", knob: "w-[16px] h-[16px]", offset: 2, translateOn: 16 },
  lg: { track: "w-[44px] h-[24px]", knob: "w-[20px] h-[20px]", offset: 2, translateOn: 20 },
} as const;

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */
export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  size?: "sm" | "md" | "lg";
  /** Label visible. */
  label?: ReactNode;
  /** Description sous le label. */
  description?: ReactNode;
  /** Position du label par rapport au switch. */
  labelPosition?: "left" | "right";
  /** Contrôlé. */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Callback. */
  onCheckedChange?: (checked: boolean) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = "md",
      label,
      description,
      labelPosition = "right",
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      className,
      id: idProp,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const cfg = sizeConfig[size];

    const textSize =
      size === "sm" ? "text-[12px]" : size === "lg" ? "text-[15px]" : "text-[13px]";

    const track = (
      <>
        {/* Hidden input for a11y */}
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="sr-only"
          {...rest}
        />
        {/* Visual track */}
        <label
          htmlFor={inputId}
          className={cn(
            "relative inline-flex shrink-0 items-center rounded-[999px] cursor-pointer",
            "transition-colors duration-[220ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]",
            checked ? "bg-[var(--color-k1)]" : "bg-[var(--color-gray-k1)]",
            disabled && "opacity-50 cursor-not-allowed",
            cfg.track,
            className
          )}
        >
          {/* Knob */}
          <span
            className={cn(
              "absolute rounded-full bg-white transition-transform duration-[220ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]",
              cfg.knob
            )}
            style={{
              left: cfg.offset,
              transform: checked
                ? `translateX(${cfg.translateOn}px)`
                : "translateX(0)",
              boxShadow: "var(--shadow-sm)",
            }}
          />
        </label>
      </>
    );

    if (!label && !description) return <span className="inline-flex">{track}</span>;

    const labelBlock = (
      <div className="flex flex-col gap-[2px]">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "leading-tight tracking-[-0.01em] cursor-pointer select-none",
              textSize,
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}
        {description && (
          <span className="text-[12px] text-[var(--color-fg-3)] leading-tight tracking-[-0.01em]">
            {description}
          </span>
        )}
      </div>
    );

    return (
      <div
        className={cn(
          "flex items-center gap-[10px]",
          labelPosition === "left" && "flex-row-reverse justify-end"
        )}
      >
        <span className="inline-flex">{track}</span>
        {labelBlock}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";
