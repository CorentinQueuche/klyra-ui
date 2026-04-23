import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "../../../../lib/cn";
import { Input } from "../../../primitives/Input/Input";
import { Kbd } from "../../../primitives/Kbd/Kbd";
import { IconButton } from "../../../primitives/IconButton/IconButton";
import { Button } from "../../../primitives/Button/Button";

/* ------------------------------------------------------------------ */
/*  Bell icon                                                           */
/* ------------------------------------------------------------------ */

function BellIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8a6 6 0 0 1 12 0v4l1 2H3l1-2z" />
      <path d="M8 16a2 2 0 0 0 4 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="M14 14l4 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  kbdShortcut?: string;
  /** Slot droite — IconButton + Button principal */
  actions?: ReactNode;
  /** Si > 0, affiche un dot rouge sur la cloche */
  notificationsCount?: number;
}

/* ------------------------------------------------------------------ */
/*  TopBar                                                              */
/* ------------------------------------------------------------------ */

export function TopBar({
  eyebrow = "TABLEAU DE BORD",
  title,
  searchPlaceholder = "Rechercher un client, un devis…",
  onSearch,
  kbdShortcut = "⌘K",
  actions,
  notificationsCount = 0,
  className,
  style,
  ...rest
}: TopBarProps) {
  return (
    <header
      className={cn("flex items-center justify-between bg-white shrink-0", className)}
      style={{
        height: 64,
        boxSizing: "border-box",
        borderBottom: "1px solid var(--color-gray-k1)",
        padding: "0 28px",
        ...style,
      }}
      {...rest}
    >
      {/* ── Left: eyebrow + title ── */}
      <div>
        <div
          className="klyra-mono"
          style={{
            fontSize: 11,
            color: "rgba(0,0,0,0.5)",
            letterSpacing: "0.04em",
            textTransform: "uppercase" as const,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 19,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginTop: 4,
          }}
        >
          {title}
        </div>
      </div>

      {/* ── Right: search + actions ── */}
      <div className="flex items-center gap-3">
        {/* Search bar */}
        {searchPlaceholder !== "" && (
          <div style={{ width: 280 }}>
            <Input
              variant="subtle"
              size="sm"
              placeholder={searchPlaceholder}
              leftIcon={<SearchIcon />}
              rightIcon={<Kbd>{kbdShortcut}</Kbd>}
              onChange={(e) => onSearch?.(e.target.value)}
              aria-label="Recherche"
            />
          </div>
        )}

        {/* Actions slot or default bell + CTA */}
        {actions !== undefined ? (
          actions
        ) : (
          <>
            {/* Bell */}
            <div className="relative">
              <IconButton
                icon={<BellIcon />}
                ariaLabel="Notifications"
                variant="outline"
                size="md"
              />
              {notificationsCount > 0 && (
                <span
                  aria-label={`${notificationsCount} notifications`}
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -3,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#C03535",
                    border: "1.5px solid #fff",
                  }}
                />
              )}
            </div>

            {/* Primary CTA */}
            <Button variant="primary" size="sm">
              + Nouveau devis
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
