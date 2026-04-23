"use client";

import { useState, type ReactNode } from "react";
import { cn } from "../../../../lib/cn";
import { StatCard, type StatCardProps } from "../../../primitives/StatCard/StatCard";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type StatusColor = "blue" | "green" | "amber" | "gray" | "red";

export interface DashboardTask {
  task: string;
  time: string;
  done?: boolean;
}

export interface DashboardTableRow {
  client: string;
  mission: string;
  amount: string;
  status: string;
  statusColor: StatusColor;
}

export interface DashboardShellProps {
  stats: StatCardProps[];
  chartTitle?: string;
  chartValue?: string;
  periods?: string[];
  onPeriodChange?: (period: string) => void;
  tasks?: DashboardTask[];
  tableRows?: DashboardTableRow[];
  tableTitle?: string;
  tableSubtitle?: string;
  onViewAll?: () => void;
  className?: string;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Status color map                                                    */
/* ------------------------------------------------------------------ */

const statusColorMap: Record<StatusColor, { bg: string; text: string }> = {
  blue:  { bg: "rgba(0,63,228,0.09)",  text: "#003FE4" },
  green: { bg: "rgba(12,157,76,0.09)", text: "#0C9D4C" },
  amber: { bg: "rgba(197,122,0,0.09)", text: "#C57A00" },
  gray:  { bg: "rgba(106,106,106,0.1)", text: "#6A6A6A" },
  red:   { bg: "rgba(192,53,53,0.09)", text: "#C03535" },
};

/* ------------------------------------------------------------------ */
/*  Area chart (inline SVG — reproduit le prototype exactement)        */
/* ------------------------------------------------------------------ */

function AreaChart() {
  return (
    <svg
      viewBox="0 0 700 200"
      style={{ width: "100%", height: 200, marginTop: 16 }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-k1)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-k1)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" x2="700" y1={y} y2={y} stroke="#F0F0F5" />
      ))}
      {/* Line */}
      <path
        d="M0 160 Q60 140 120 130 T240 100 T360 95 T480 70 T600 55 T700 30"
        fill="none"
        stroke="var(--color-k1)"
        strokeWidth="2.5"
      />
      {/* Area fill */}
      <path
        d="M0 160 Q60 140 120 130 T240 100 T360 95 T480 70 T600 55 T700 30 L700 200 L0 200 Z"
        fill="url(#dash-area)"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Period selector                                                     */
/* ------------------------------------------------------------------ */

function PeriodSelector({
  periods,
  active,
  onChange,
}: {
  periods: string[];
  active: string;
  onChange: (p: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        background: "#F4F6FB",
        padding: 3,
        borderRadius: 999,
      }}
    >
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            padding: "4px 12px",
            borderRadius: 999,
            border: "none",
            background: p === active ? "#fff" : "transparent",
            color: p === active ? "var(--color-k1)" : "var(--color-ink)",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: p === active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            transition: "all 120ms cubic-bezier(0.22,0.61,0.36,1)",
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Task checkbox row                                                   */
/* ------------------------------------------------------------------ */

function TaskRow({ task, time, done = false }: DashboardTask) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 5,
          background: done ? "var(--color-k1)" : "transparent",
          border: done ? "none" : "1.5px solid #D9D9E5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {done && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            stroke="#fff"
            strokeWidth="1.8"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 5l2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div
        style={{
          flex: 1,
          fontSize: 13,
          color: done ? "rgba(0,0,0,0.4)" : "var(--color-ink)",
          textDecoration: done ? "line-through" : "none",
          letterSpacing: "-0.01em",
        }}
      >
        {task}
      </div>
      <div
        className="klyra-mono"
        style={{ fontSize: 11, color: "rgba(0,0,0,0.5)" }}
      >
        {time}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DashboardShell                                                      */
/* ------------------------------------------------------------------ */

export function DashboardShell({
  stats,
  chartTitle = "Chiffre d'affaires · 30 derniers jours",
  chartValue = "8 547 €",
  periods = ["7J", "30J", "3M", "1A"],
  onPeriodChange,
  tasks = [],
  tableRows = [],
  tableTitle = "Devis récents",
  tableSubtitle,
  onViewAll,
  className,
}: DashboardShellProps) {
  const [activePeriod, setActivePeriod] = useState(periods[1] ?? periods[0]);

  function handlePeriodChange(p: string) {
    setActivePeriod(p);
    onPeriodChange?.(p);
  }

  return (
    <div
      className={cn(className)}
      style={{
        padding: "24px 28px",
        background: "var(--color-paper)",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      {/* ── Stats row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
          gap: 14,
        }}
      >
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* ── Chart + tasks ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 14,
          marginTop: 14,
        }}
      >
        {/* Chart card */}
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--color-gray-k1)",
            borderRadius: 14,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
                {chartTitle}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  marginTop: 4,
                }}
              >
                {chartValue}
              </div>
            </div>
            <PeriodSelector
              periods={periods}
              active={activePeriod}
              onChange={handlePeriodChange}
            />
          </div>
          <AreaChart />
        </div>

        {/* Tasks card */}
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--color-gray-k1)",
            borderRadius: 14,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            A faire aujourd&apos;hui
          </div>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {tasks.length > 0 ? (
              tasks.map((t, i) => <TaskRow key={i} {...t} />)
            ) : (
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(0,0,0,0.35)",
                  padding: "24px 0",
                  textAlign: "center",
                }}
              >
                Aucune tache pour aujourd&apos;hui
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--color-gray-k1)",
          borderRadius: 14,
          marginTop: 14,
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--color-gray-k1)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              {tableTitle}
            </div>
            {tableSubtitle && (
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.5)",
                  marginTop: 2,
                }}
              >
                {tableSubtitle}
              </div>
            )}
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              style={{
                fontSize: 12,
                color: "var(--color-k1)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                letterSpacing: "-0.01em",
              }}
            >
              Tout voir →
            </button>
          )}
        </div>

        {/* Table body */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
            }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--color-paper)",
                  color: "rgba(0,0,0,0.55)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                }}
              >
                <th
                  style={{
                    textAlign: "left",
                    padding: "10px 20px",
                    fontWeight: 500,
                  }}
                >
                  Client
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "10px 20px",
                    fontWeight: 500,
                  }}
                >
                  Mission
                </th>
                <th
                  style={{
                    textAlign: "right",
                    padding: "10px 20px",
                    fontWeight: 500,
                  }}
                >
                  Montant
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "10px 20px",
                    fontWeight: 500,
                  }}
                >
                  Statut
                </th>
                <th style={{ width: 30 }} />
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => {
                const colors = statusColorMap[row.statusColor];
                return (
                  <tr
                    key={i}
                    style={{ borderTop: "1px solid #F0F0F5" }}
                  >
                    <td
                      style={{
                        padding: "14px 20px",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {row.client}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        color: "rgba(0,0,0,0.7)",
                      }}
                    >
                      {row.mission}
                    </td>
                    <td
                      className="klyra-mono"
                      style={{
                        padding: "14px 20px",
                        textAlign: "right",
                        fontWeight: 500,
                      }}
                    >
                      {row.amount}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 500,
                          background: colors.bg,
                          color: colors.text,
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        color: "rgba(0,0,0,0.4)",
                        cursor: "pointer",
                      }}
                    >
                      →
                    </td>
                  </tr>
                );
              })}
              {tableRows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      padding: "32px 20px",
                      textAlign: "center",
                      color: "rgba(0,0,0,0.35)",
                      fontSize: 13,
                    }}
                  >
                    Aucun devis pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
