import type { HTMLAttributes, CSSProperties } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

/* ─── Sparkline ─────────────────────────────────────────────────── */

interface SparklineProps {
  data: number[]; // values normalised 0-1
  color?: string;
  height?: number;
}

function Sparkline({ data, color = "var(--color-k1)", height = 36 }: SparklineProps) {
  if (data.length < 2) return null;

  const w = 180;
  const h = height;
  const pad = 2;
  const usableH = h - pad * 2;
  const step = w / (data.length - 1);

  const pts = data.map((v, i) => [i * step, pad + usableH - v * usableH] as [number, number]);
  const linePath = pts.reduce((acc, [x, y], i) => acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`), "");
  const areaPath = linePath + ` L${pts[pts.length - 1][0]},${h} L0,${h} Z`;

  const uid = Math.random().toString(36).slice(2, 8);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height }} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`sg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sg-${uid})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Variants ──────────────────────────────────────────────────── */

export const statCardVariants = cva(
  ["flex flex-col gap-2 rounded-[14px] p-[18px_20px]"],
  {
    variants: {
      variant: {
        light: ["bg-white border border-[var(--color-gray-k1)] text-[var(--color-ink)]", "[box-shadow:0_1px_2px_rgba(0,45,164,0.04)]"],
        dark:  ["bg-[var(--color-ink)] border border-[rgba(255,255,255,0.08)] text-white"],
        brand: ["text-white border-0", "bg-[linear-gradient(180deg,var(--color-k1)_0%,var(--color-blue-deep)_100%)]"],
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

export type StatCardAccent = "k1" | "k2" | "k3";

const accentColor: Record<StatCardAccent, string> = {
  k1: "var(--color-k1)",
  k2: "var(--color-k2)",
  k3: "var(--color-k3)",
};

export interface StatCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  sparkline?: number[];
  accent?: StatCardAccent;
  style?: CSSProperties;
}

const trendColor = {
  up:   "#0C9D4C",
  down: "#C03535",
  flat: "rgba(0,0,0,0.4)",
};

const trendColorDark = {
  up:   "#34D475",
  down: "#FF6B6B",
  flat: "rgba(255,255,255,0.4)",
};

export function StatCard({
  label,
  value,
  delta,
  trend = "flat",
  sparkline,
  variant = "light",
  accent = "k1",
  className,
  ...rest
}: StatCardProps) {
  const isDark = variant === "dark" || variant === "brand";
  const valueColor = isDark ? "#fff" : accentColor[accent];
  const labelColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const deltaColor = isDark ? trendColorDark[trend] : trendColor[trend];
  const sparkColor = isDark ? "var(--color-k3)" : accentColor[accent];

  return (
    <div className={cn(statCardVariants({ variant }), className)} {...rest}>
      {/* Label */}
      <div
        style={{
          fontSize: 12,
          letterSpacing: "-0.01em",
          color: labelColor,
          lineHeight: 1.2,
        }}
      >
        {label}
      </div>

      {/* Value + delta */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: 1,
            color: valueColor,
          }}
        >
          {value}
        </div>
        {delta && (
          <div style={{ fontSize: 12, fontWeight: 500, color: deltaColor }}>
            {delta}
          </div>
        )}
      </div>

      {/* Sparkline */}
      {sparkline && sparkline.length >= 2 && (
        <Sparkline data={sparkline} color={sparkColor} height={36} />
      )}
    </div>
  );
}
