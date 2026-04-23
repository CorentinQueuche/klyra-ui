"use client";

import {
  createContext,
  useContext,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../../lib/cn";

/**
 * Tabs — segmented pill KLYRA.
 * Reproduit le sélecteur 7J / 30J / 3M / 1A du Dashboard.
 * Controlled (value + onValueChange) ou uncontrolled (defaultValue).
 */

export interface TabOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type Size = "sm" | "md" | "lg";
type Tone = "light" | "dark";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  size: Size;
  tone: Tone;
}

const TabsCtx = createContext<TabsContextValue | null>(null);
const useTabs = () => {
  const ctx = useContext(TabsCtx);
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs>");
  return ctx;
};

export interface TabsProps {
  options?: TabOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: Size;
  tone?: Tone;
  fullWidth?: boolean;
  "aria-label"?: string;
  className?: string;
  children?: ReactNode;
}

const SIZE = {
  sm: { pad: "5px 10px", font: 11, radius: 999, gap: 2, outer: 2 },
  md: { pad: "6px 14px", font: 12, radius: 999, gap: 4, outer: 3 },
  lg: { pad: "8px 18px", font: 13, radius: 999, gap: 4, outer: 4 },
} as const;

export function Tabs({
  options,
  value: controlled,
  defaultValue,
  onValueChange,
  size = "md",
  tone = "light",
  fullWidth,
  className,
  children,
  "aria-label": ariaLabel,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? options?.[0]?.value ?? "");
  const value = controlled ?? uncontrolled;
  const setValue = (v: string) => {
    if (controlled === undefined) setUncontrolled(v);
    onValueChange?.(v);
  };

  const s = SIZE[size];
  const containerBg = tone === "dark" ? "rgba(255,255,255,0.08)" : "#F4F6FB";

  return (
    <TabsCtx.Provider value={{ value, setValue, size, tone }}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn("klyra-tabs", className)}
        style={{
          display: "inline-flex",
          gap: s.gap,
          padding: s.outer,
          borderRadius: 999,
          background: containerBg,
          width: fullWidth ? "100%" : "auto",
        }}
      >
        {options
          ? options.map((opt) => (
              <Tab key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </Tab>
            ))
          : children}
      </div>
    </TabsCtx.Provider>
  );
}

export interface TabProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function Tab({ value: ownValue, disabled, children, className }: TabProps) {
  const { value, setValue, size, tone } = useTabs();
  const active = value === ownValue;
  const s = SIZE[size];

  const activeBg = tone === "dark" ? "#FFF" : "#FFF";
  const activeFg = "#003FE4";
  const inactiveFg = tone === "dark" ? "rgba(255,255,255,0.7)" : "#202020";

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled) setValue(ownValue);
    }
  };

  return (
    <button
      role="tab"
      type="button"
      aria-selected={active}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      onClick={() => !disabled && setValue(ownValue)}
      onKeyDown={handleKey}
      className={cn("klyra-tab", className)}
      style={{
        padding: s.pad,
        borderRadius: 999,
        border: "none",
        background: active ? activeBg : "transparent",
        color: active ? activeFg : inactiveFg,
        fontFamily: "inherit",
        fontSize: s.font,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
        transition: "background 220ms var(--ease-standard), color 220ms var(--ease-standard), box-shadow 220ms var(--ease-standard)",
        flex: 1,
      }}
    >
      {children}
    </button>
  );
}
