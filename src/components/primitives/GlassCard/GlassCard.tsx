import type { HTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "../../../lib/cn";

/* ─── Sparkline interne pour la story WithChart ─────────────────── */

interface SparklineAreaProps {
  height?: number;
}

function SparklineArea({ height = 40 }: SparklineAreaProps) {
  const data = [0.3, 0.5, 0.45, 0.65, 0.6, 0.78, 0.72, 0.88, 0.95, 1.0];
  const w = 300;
  const h = height;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - v * h * 0.85] as [number, number]);
  const linePath = pts.reduce((acc, [x, y], i) => acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`), "");
  const areaPath = linePath + ` L${pts[pts.length - 1][0]},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height }} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="glass-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-k3)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-k3)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#glass-area)" />
      <path d={linePath} fill="none" stroke="var(--color-k3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Component ─────────────────────────────────────────────────── */

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** blur(Xpx) — défaut 20 */
  blur?: number;
  /** Padding interne en px — défaut 20 */
  padding?: number;
  /** Border-radius en px — défaut 16 */
  radius?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export function GlassCard({
  blur    = 20,
  padding = 20,
  radius  = 16,
  className,
  children,
  style,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn("klyra-shadow-glass", className)}
      style={{
        background:       "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,63,228,0.12))",
        border:           "1px solid rgba(255,255,255,0.18)",
        backdropFilter:   `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        borderRadius:     radius,
        padding:          padding,
        color:            "#fff",
        boxShadow:        "inset 2px -4px 22px rgba(0,63,228,0.25)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─── WithChart préfab ──────────────────────────────────────────── */

export function GlassCardChart() {
  return (
    <GlassCard>
      <div
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.65)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.03em",
          textTransform: "uppercase",
        }}
      >
        Évolution des ventes
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 8 }}>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
          8 547 €
        </div>
        <div style={{ fontSize: 13, color: "var(--color-k3)", fontWeight: 500 }}>
          +32% vs. M-1
        </div>
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
        Dashboard client · webapp sur mesure
      </div>
      <div style={{ marginTop: 12 }}>
        <SparklineArea height={40} />
      </div>
    </GlassCard>
  );
}
