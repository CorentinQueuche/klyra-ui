import type { HTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "../../../lib/cn";

/* ─── Types ─────────────────────────────────────────────────────── */

export type StackDirection = "row" | "column";
export type StackAlign     = "start" | "center" | "end" | "stretch";
export type StackJustify   = "start" | "center" | "end" | "between";

const alignMap: Record<StackAlign, string> = {
  start:   "flex-start",
  center:  "center",
  end:     "flex-end",
  stretch: "stretch",
};

const justifyMap: Record<StackJustify, string> = {
  start:   "flex-start",
  center:  "center",
  end:     "flex-end",
  between: "space-between",
};

/* ─── Component ─────────────────────────────────────────────────── */

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?:       number;
  align?:     StackAlign;
  justify?:   StackJustify;
  wrap?:      boolean;
  children?:  ReactNode;
  style?:     CSSProperties;
}

export function Stack({
  direction = "column",
  gap       = 16,
  align,
  justify,
  wrap      = false,
  className,
  children,
  style,
  ...rest
}: StackProps) {
  return (
    <div
      className={cn("flex", className)}
      style={{
        flexDirection:  direction,
        gap:            gap,
        alignItems:     align     ? alignMap[align]   : undefined,
        justifyContent: justify   ? justifyMap[justify] : undefined,
        flexWrap:       wrap      ? "wrap"             : "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
