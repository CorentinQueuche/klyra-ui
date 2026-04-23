import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "../../../../lib/cn";
import { Logo } from "../../../primitives/Logo/Logo";
import { Button } from "../../../primitives/Button/Button";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface SidebarItem {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarTenant {
  label: string;
  plan: string;
  avatarInitials: string;
}

export interface SidebarFooterCta {
  eyebrow: string;
  label: string;
  button: { label: string; href: string };
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  width?: number;
  logoSlot?: ReactNode;
  sections: SidebarSection[];
  tenant?: SidebarTenant;
  footerCta?: SidebarFooterCta;
  collapsed?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Nav Item                                                            */
/* ------------------------------------------------------------------ */

function NavItem({
  icon,
  label,
  href = "#",
  active = false,
  badge,
  collapsed = false,
}: SidebarItem & { collapsed?: boolean }) {
  return (
    <a
      href={href}
      style={{ position: "relative" }}
      className={cn(
        "flex items-center gap-3 h-[38px] px-3 rounded-[8px] no-underline",
        "text-[14px] font-[400] tracking-[-0.01em] transition-all duration-[120ms]",
        active
          ? "text-[var(--color-k1)] bg-[rgba(0,63,228,0.08)] font-[500]"
          : "text-[var(--color-ink)] hover:bg-[rgba(0,0,0,0.04)]",
        collapsed && "justify-center px-0"
      )}
    >
      {/* Active left accent — sits outside item padding */}
      {active && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -12,
            top: 9,
            bottom: 9,
            width: 3,
            background: "var(--color-k1)",
            borderRadius: "0 3px 3px 0",
          }}
        />
      )}

      <span className="shrink-0 flex items-center">{icon}</span>

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge && (
            <span
              className={cn(
                "inline-flex items-center justify-center text-[11px] font-[500] leading-none",
                "px-[7px] py-[2px] rounded-[999px] ml-auto",
                active
                  ? "bg-[rgba(0,63,228,0.15)] text-[var(--color-k1)]"
                  : "bg-[rgba(0,0,0,0.07)] text-[rgba(0,0,0,0.55)]"
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Section title                                                       */
/* ------------------------------------------------------------------ */

function SectionTitle({ title }: { title: string }) {
  return (
    <div
      className="klyra-mono"
      style={{
        padding: "4px 12px 10px",
        fontSize: 10,
        color: "rgba(0,0,0,0.45)",
        letterSpacing: "0.06em",
        textTransform: "uppercase" as const,
      }}
    >
      {title}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                             */
/* ------------------------------------------------------------------ */

export function Sidebar({
  width = 240,
  logoSlot,
  sections,
  tenant,
  footerCta,
  collapsed = false,
  className,
  style,
  ...rest
}: SidebarProps) {
  const effectiveWidth = collapsed ? 64 : width;

  return (
    <aside
      className={cn("flex flex-col bg-white h-full", className)}
      style={{
        width: effectiveWidth,
        minWidth: effectiveWidth,
        borderRight: "1px solid var(--color-gray-k1)",
        transition: "width 220ms cubic-bezier(0.22,0.61,0.36,1)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {/* ── Logo row — exactly 64px, full-width border-bottom ── */}
      <div
        style={{
          height: 64,
          boxSizing: "border-box",
          borderBottom: "1px solid var(--color-gray-k1)",
          display: "flex",
          alignItems: "center",
          padding: collapsed ? "0" : "0 20px",
          justifyContent: collapsed ? "center" : "flex-start",
          flexShrink: 0,
        }}
      >
        {logoSlot ?? <Logo variant="original" height={24} alt="Klyra Design" />}
      </div>

      {/* ── Nav sections ── */}
      <nav
        style={{
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          overflowY: "auto",
        }}
      >
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && !collapsed && (
              <SectionTitle title={section.title} />
            )}
            {section.items.map((item, ii) => (
              <NavItem key={ii} {...item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </nav>

      {/* ── Footer area (tenant + CTA) ── */}
      {(tenant || footerCta) && (
        <div
          style={{
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flexShrink: 0,
          }}
        >
          {/* Tenant card */}
          {tenant && !collapsed && (
            <div
              style={{
                padding: "10px 12px",
                background: "#F4F6FB",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* Avatar initials */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background:
                    "linear-gradient(180deg,var(--color-k1),var(--color-k2))",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {tenant.avatarInitials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {tenant.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(0,0,0,0.5)",
                    marginTop: 3,
                  }}
                >
                  {tenant.plan}
                </div>
              </div>
              {/* Chevron */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 8l3-3 3 3M7 12l3 3 3-3" />
              </svg>
            </div>
          )}

          {/* Footer CTA card */}
          {footerCta && !collapsed && (
            <div
              style={{
                padding: 14,
                borderRadius: 12,
                background:
                  "linear-gradient(180deg,var(--color-k1) 0%,var(--color-blue-deep) 100%)",
                color: "#fff",
                boxShadow: "inset 2px -4px 22px rgba(1,164,255,0.3)",
              }}
            >
              <div
                className="klyra-mono"
                style={{
                  fontSize: 11,
                  opacity: 0.75,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase" as const,
                }}
              >
                {footerCta.eyebrow}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  marginTop: 6,
                  lineHeight: 1.3,
                }}
              >
                {footerCta.label}
              </div>
              <Button
                asChild
                href={footerCta.button.href}
                variant="white"
                size="sm"
                className="mt-3 w-full"
              >
                {footerCta.button.label}
              </Button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
