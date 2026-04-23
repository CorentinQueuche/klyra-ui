"use client";

import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../../../lib/cn";
import { Logo } from "../../../primitives/Logo/Logo";
import { Button } from "../../../primitives/Button/Button";
import { IconButton } from "../../../primitives/IconButton/IconButton";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavCta {
  label: string;
  href: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavProps {
  /** Variant de logo affiché */
  logoVariant?: "white" | "original" | "dark";
  /** Liens de navigation */
  links?: NavLink[];
  /** CTA principal */
  cta?: NavCta;
  /**
   * Variante sticky — affiche bg sombre + blur.
   * En production, déclenché au scroll. En Storybook, toujours actif si true.
   */
  sticky?: boolean;
  /**
   * Sur fond sombre (dark bg) → logo white + texte blanc.
   * Sur fond clair → logo dark + texte ink.
   */
  onDark?: boolean;
  /** Breadcrumb secondaire (variant doc/blog) */
  breadcrumb?: BreadcrumbItem[];
  className?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Services", href: "#" },
  { label: "Réalisations", href: "#" },
  { label: "À propos", href: "#" },
  { label: "Labs", href: "#" },
  { label: "Blog", href: "#" },
];

const DEFAULT_CTA: NavCta = {
  label: "Prendre rendez-vous",
  href: "#",
};

export function Nav({
  logoVariant,
  links = DEFAULT_LINKS,
  cta = DEFAULT_CTA,
  sticky = false,
  onDark = true,
  breadcrumb,
  className,
}: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const resolvedLogoVariant =
    logoVariant ?? (onDark ? "white" : "dark");

  const isSticky = sticky;

  return (
    <header
      className={cn("absolute top-0 left-0 right-0 z-50", className)}
      style={
        isSticky
          ? {
              position: "fixed",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }
          : undefined
      }
    >
      {/* Main bar */}
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 52px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Klyra Design — accueil"
          style={{ display: "inline-flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}
        >
          <Logo variant={resolvedLogoVariant} height={26} />
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Navigation principale"
          style={{
            display: "flex",
            gap: 28,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.0125em",
          }}
          className="hidden md:flex"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                textDecoration: "none",
                color: onDark
                  ? "rgba(255,255,255,0.78)"
                  : "var(--color-fg-2)",
                transition: "color 220ms cubic-bezier(0.22,0.61,0.36,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = onDark
                  ? "#fff"
                  : "var(--color-k1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = onDark
                  ? "rgba(255,255,255,0.78)"
                  : "var(--color-fg-2)";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <Button
            variant={onDark ? "white" : "primary"}
            size="sm"
            asChild
            href={cta.href}
            className="hidden md:inline-flex"
          >
            {cta.label}
          </Button>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <IconButton
              variant={onDark ? "ghost-dark" : "ghost"}
              size="md"
              icon={mobileOpen ? <X size={18} /> : <Menu size={18} />}
              ariaLabel={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMobileOpen((o) => !o)}
            />
          </div>
        </div>
      </div>

      {/* Breadcrumb bar */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div
          style={{
            borderTop: onDark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid var(--color-border-1)",
            padding: "8px 52px",
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: onDark ? "rgba(255,255,255,0.5)" : "var(--color-fg-3)",
          }}
        >
          {breadcrumb.map((crumb, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {i > 0 && <span aria-hidden>/</span>}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {crumb.label}
                </a>
              ) : (
                <span
                  style={{
                    color: onDark ? "rgba(255,255,255,0.85)" : "var(--color-fg-1)",
                  }}
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div
          style={{
            background: onDark ? "rgba(0,0,0,0.96)" : "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: onDark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid var(--color-border-1)",
            padding: "24px 32px 32px",
          }}
        >
          <nav
            aria-label="Navigation mobile"
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  textDecoration: "none",
                  padding: "12px 0",
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: onDark ? "rgba(255,255,255,0.9)" : "var(--color-ink)",
                  borderBottom: onDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid var(--color-border-1)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div style={{ marginTop: 24 }}>
            <Button
              variant={onDark ? "primary" : "primary"}
              size="lg"
              fullWidth
              asChild
              href={cta.href}
            >
              {cta.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
