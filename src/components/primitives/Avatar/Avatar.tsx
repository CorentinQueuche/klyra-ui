import type { HTMLAttributes, CSSProperties, ImgHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

/* ─── Size map ──────────────────────────────────────────────────── */

const sizeMap = {
  sm:  24,
  md:  32,
  lg:  40,
  xl:  56,
  "2xl": 80,
} as const;

const fontSizeMap = {
  sm:  9,
  md:  12,
  lg:  14,
  xl:  20,
  "2xl": 28,
} as const;

export type AvatarSize  = keyof typeof sizeMap;
export type AvatarShape = "rounded" | "circle";

/* ─── Variants ──────────────────────────────────────────────────── */

export const avatarVariants = cva(
  ["inline-flex items-center justify-center shrink-0 overflow-hidden font-medium select-none"],
  {
    variants: {
      shape: {
        rounded: ["rounded-[8px]"],
        circle:  ["rounded-full"],
      },
    },
    defaultVariants: {
      shape: "rounded",
    },
  }
);

/* ─── Avatar ────────────────────────────────────────────────────── */

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof avatarVariants> {
  src?:       string;
  alt?:       string;
  initials?:  string;
  size?:      AvatarSize;
  gradient?:  boolean;
  imgProps?:  ImgHTMLAttributes<HTMLImageElement>;
  style?:     CSSProperties;
}

export function Avatar({
  src,
  alt       = "",
  initials,
  size      = "md",
  shape     = "rounded",
  gradient  = true,
  className,
  style,
  imgProps,
  ...rest
}: AvatarProps) {
  const px = sizeMap[size];
  const fs = fontSizeMap[size];

  const base: CSSProperties = {
    width:  px,
    height: px,
    fontSize: fs,
    ...style,
  };

  const gradientBg: CSSProperties = gradient && !src
    ? { background: "linear-gradient(135deg, var(--color-k1) 0%, var(--color-k2) 100%)", color: "#fff" }
    : { background: "var(--color-gray-k1)", color: "var(--color-ink)" };

  return (
    <div
      className={cn(avatarVariants({ shape }), className)}
      style={{ ...base, ...gradientBg }}
      aria-label={alt || initials}
      role="img"
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          {...imgProps}
        />
      ) : (
        <span style={{ lineHeight: 1, letterSpacing: "-0.01em", fontWeight: 600 }}>
          {initials ?? "?"}
        </span>
      )}
    </div>
  );
}

/* ─── Avatar.Group ──────────────────────────────────────────────── */

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Nombre de membres supplémentaires à afficher dans le "+N" */
  overflow?: number;
  size?: AvatarSize;
}

export function AvatarGroup({
  children,
  overflow,
  size = "md",
  className,
  style,
  ...rest
}: AvatarGroupProps) {
  const px = sizeMap[size];
  const overlap = Math.round(px * 0.3);

  return (
    <div
      className={cn("flex items-center", className)}
      style={{ marginLeft: overlap, ...style }}
      {...rest}
    >
      {/* Each child gets negative margin to overlap */}
      {Array.isArray(children)
        ? (children as React.ReactNode[]).map((child, i) => (
            <div key={i} style={{ marginLeft: -overlap, zIndex: i }}>
              {child}
            </div>
          ))
        : children}

      {overflow != null && overflow > 0 && (
        <div
          style={{
            marginLeft: -overlap,
            zIndex: 99,
            width:  px,
            height: px,
            borderRadius: 8,
            background: "var(--color-blue-bg)",
            color:       "var(--color-k1)",
            fontSize:    fontSizeMap[size],
            fontWeight:  600,
            display:     "flex",
            alignItems:  "center",
            justifyContent: "center",
            border: "2px solid #fff",
            letterSpacing: "-0.01em",
          }}
          aria-label={`+${overflow} membres`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

/* ─── Namespace ─────────────────────────────────────────────────── */
Avatar.Group = AvatarGroup;
