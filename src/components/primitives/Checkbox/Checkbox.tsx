"use client";

import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../../lib/cn";

/* ------------------------------------------------------------------ */
/*  Checkmark SVG                                                       */
/* ------------------------------------------------------------------ */
function Checkmark() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 5l2 2.5 4-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IndeterminateLine() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 5h6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Size config                                                         */
/* ------------------------------------------------------------------ */
const sizeConfig = {
  sm: { box: 14, radius: 4, text: "text-[12px]" },
  md: { box: 18, radius: 5, text: "text-[13px]" },
  lg: { box: 22, radius: 6, text: "text-[15px]" },
} as const;

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  size?: "sm" | "md" | "lg";
  /** Label visible à droite. */
  label?: ReactNode;
  /** Description sous le label. */
  description?: ReactNode;
  /** État tri-state. */
  indeterminate?: boolean;
  /** Callback checked/unchecked. */
  onCheckedChange?: (checked: boolean) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      label,
      description,
      indeterminate = false,
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
    const internalRef = useRef<HTMLInputElement | null>(null);

    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref]
    );

    // Sync indeterminate state — impossible via HTML attr
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const cfg = sizeConfig[size];
    const isChecked = indeterminate ? true : checked;

    const boxClasses = cn(
      "relative shrink-0 flex items-center justify-center",
      "border-[1.5px] transition-all duration-[120ms]",
      "cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed",
      isChecked || indeterminate
        ? "bg-[var(--color-k1)] border-[var(--color-k1)]"
        : "bg-white border-[#D9D9E5] hover:border-[var(--color-k1)]"
    );

    const inner = (
      <>
        {/* Hidden native input — accessibilité */}
        <input
          ref={setRef}
          id={inputId}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="sr-only"
          {...rest}
        />
        {/* Custom visual box */}
        <label
          htmlFor={inputId}
          className={cn(boxClasses, className)}
          style={{
            width: cfg.box,
            height: cfg.box,
            borderRadius: cfg.radius,
          }}
        >
          {indeterminate ? (
            <IndeterminateLine />
          ) : isChecked ? (
            <Checkmark />
          ) : null}
        </label>
      </>
    );

    if (!label && !description) return <span className="inline-flex">{inner}</span>;

    return (
      <div className={cn("flex items-start gap-[10px]", disabled && "opacity-50")}>
        <span className="inline-flex mt-[1px]">{inner}</span>
        <div className="flex flex-col gap-[2px]">
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "leading-tight tracking-[-0.01em] cursor-pointer select-none",
                cfg.text,
                disabled && "cursor-not-allowed"
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
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
