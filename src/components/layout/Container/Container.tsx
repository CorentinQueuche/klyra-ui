import type { HTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "../../../lib/cn";

/* ─── Config ────────────────────────────────────────────────────── */

const maxWidthMap = {
  sm:   720,
  md:   960,
  lg:   1180,
  xl:   1440,
  full: "100%",
} as const;

const gutterMap = {
  brand: "52px",
  page:  "24px",
  none:  "0px",
} as const;

export type ContainerSize   = keyof typeof maxWidthMap;
export type ContainerGutter = keyof typeof gutterMap;

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Largeur max — défaut lg (1180px, brand book) */
  size?:   ContainerSize;
  /** Padding horizontal — brand = 52px signature, page = 24px, none = 0 */
  gutter?: ContainerGutter;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Container({
  size   = "lg",
  gutter = "page",
  className,
  children,
  style,
  ...rest
}: ContainerProps) {
  const maxWidth = maxWidthMap[size];
  const px       = gutterMap[gutter];

  return (
    <div
      className={cn("mx-auto w-full", className)}
      style={{
        maxWidth,
        paddingLeft:  px,
        paddingRight: px,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
