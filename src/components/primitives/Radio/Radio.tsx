"use client";

import {
  forwardRef,
  useId,
  createContext,
  useContext,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../../lib/cn";

/* ------------------------------------------------------------------ */
/*  Context                                                             */
/* ------------------------------------------------------------------ */
interface RadioGroupCtx {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupCtx | null>(null);

/* ------------------------------------------------------------------ */
/*  RadioGroup                                                          */
/* ------------------------------------------------------------------ */
export interface RadioGroupProps {
  /** Nom HTML partagé par tous les radios enfants. */
  name: string;
  /** Valeur sélectionnée (contrôlé). */
  value: string;
  /** Callback de changement. */
  onValueChange: (value: string) => void;
  /** Disposition des options. */
  orientation?: "column" | "row";
  /** Désactive tous les radios du groupe. */
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onValueChange,
  orientation = "column",
  disabled,
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onValueChange, disabled }}>
      <div
        role="radiogroup"
        className={cn(
          "flex",
          orientation === "column" ? "flex-col gap-3" : "flex-row gap-5 flex-wrap",
          className
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Radio dot size config                                               */
/* ------------------------------------------------------------------ */
const sizeConfig = {
  sm: { outer: 14, inner: 6, radius: 999, text: "text-[12px]" },
  md: { outer: 18, inner: 8, radius: 999, text: "text-[13px]" },
  lg: { outer: 22, inner: 10, radius: 999, text: "text-[15px]" },
} as const;

/* ------------------------------------------------------------------ */
/*  Radio Props                                                         */
/* ------------------------------------------------------------------ */
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Valeur soumise. */
  value: string;
  /** Label visible. */
  label?: ReactNode;
  /** Description sous le label. */
  description?: ReactNode;
  size?: "sm" | "md" | "lg";
}

/* ------------------------------------------------------------------ */
/*  Radio Component                                                     */
/* ------------------------------------------------------------------ */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      description,
      size = "md",
      disabled: disabledProp,
      id: idProp,
      className,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const ctx = useContext(RadioGroupContext);

    const isChecked = ctx ? ctx.value === value : rest.checked ?? false;
    const isDisabled = disabledProp ?? ctx?.disabled ?? false;
    const name = ctx?.name ?? rest.name;

    const cfg = sizeConfig[size];

    const handleChange = () => {
      ctx?.onValueChange(value);
    };

    const circle = (
      <>
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className="sr-only"
          {...rest}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "relative shrink-0 flex items-center justify-center rounded-full border-[1.5px] cursor-pointer",
            "transition-all duration-[120ms]",
            isChecked
              ? "bg-[var(--color-k1)] border-[var(--color-k1)]"
              : "bg-white border-[#D9D9E5] hover:border-[var(--color-k1)]",
            isDisabled && "opacity-50 cursor-not-allowed",
            className
          )}
          style={{ width: cfg.outer, height: cfg.outer }}
        >
          {isChecked && (
            <span
              className="rounded-full bg-white"
              style={{ width: cfg.inner, height: cfg.inner }}
            />
          )}
        </label>
      </>
    );

    if (!label && !description) return <span className="inline-flex">{circle}</span>;

    return (
      <div className={cn("flex items-start gap-[10px]", isDisabled && "opacity-50")}>
        <span className="inline-flex mt-[2px]">{circle}</span>
        <div className="flex flex-col gap-[2px]">
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "leading-tight tracking-[-0.01em] cursor-pointer select-none",
                cfg.text,
                isDisabled && "cursor-not-allowed"
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

Radio.displayName = "Radio";
