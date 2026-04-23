"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../../lib/cn";

/**
 * KLYRA Popover — panneau flottant ancré (priorité, date, tag, liste…).
 *
 * Usage : wrapper `<div className="relative">` contenant le bouton déclencheur,
 * puis `<Popover open={...} onClose={...} placement="bottom-end">…</Popover>`.
 *
 * Subcomponents : PopoverSearch, PopoverSection, PopoverItem, PopoverEmpty, PopoverHint.
 */

export type PopoverPlacement =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  /** Position relative à l'ancre (défaut `bottom-end`). */
  placement?: PopoverPlacement;
  /** Offset en pixels entre le déclencheur et le panneau (défaut 8). */
  offset?: number;
  /** Largeur minimale du panneau (défaut 200). */
  minWidth?: number | string;
  /** Ferme sur Escape (défaut true). */
  closeOnEscape?: boolean;
  /** Affiche un backdrop invisible qui ferme au clic (défaut true). */
  closeOnBackdrop?: boolean;
  children: ReactNode;
}

const placementStyles: Record<PopoverPlacement, (o: number) => React.CSSProperties> = {
  "bottom-start": (o) => ({ top: `calc(100% + ${o}px)`, left: 0 }),
  "bottom-end":   (o) => ({ top: `calc(100% + ${o}px)`, right: 0 }),
  "top-start":    (o) => ({ bottom: `calc(100% + ${o}px)`, left: 0 }),
  "top-end":      (o) => ({ bottom: `calc(100% + ${o}px)`, right: 0 }),
};

export function Popover({
  open,
  onClose,
  placement = "bottom-end",
  offset = 8,
  minWidth = 200,
  closeOnEscape = true,
  closeOnBackdrop = true,
  className,
  children,
  style,
  ...rest
}: PopoverProps) {
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeOnEscape, onClose]);

  if (!open) return null;

  const panelStyle: React.CSSProperties = {
    ...placementStyles[placement](offset),
    minWidth,
    ...style,
  };

  return (
    <>
      {closeOnBackdrop && (
        <div
          aria-hidden
          onMouseDown={onClose}
          className="fixed inset-0 z-40"
          style={{ cursor: "default" }}
        />
      )}
      <div
        role="menu"
        className={cn(
          "absolute z-50",
          "bg-white/95 backdrop-blur-xl",
          "border border-[var(--color-border-1)]",
          "rounded-[var(--radius-md)]",
          "p-1",
          "animate-[klyra-popover-rise_140ms_cubic-bezier(0.2,0.8,0.2,1)]",
          "[box-shadow:0_12px_40px_rgba(0,45,164,0.14),0_2px_8px_rgba(0,45,164,0.06)]",
          className
        )}
        style={panelStyle}
        onMouseDown={(e) => e.stopPropagation()}
        {...rest}
      >
        <style>{`
          @keyframes klyra-popover-rise {
            from { transform: translateY(4px); opacity: 0; }
            to   { transform: translateY(0); opacity: 1; }
          }
        `}</style>
        {children}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  PopoverSearch — input de filtre inline                              */
/* ------------------------------------------------------------------ */

export interface PopoverSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Auto-focus à l'ouverture (défaut true). */
  autoFocusOnMount?: boolean;
}

export const PopoverSearch = forwardRef<HTMLInputElement, PopoverSearchProps>(
  ({ autoFocusOnMount = true, className, ...rest }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };
    useEffect(() => {
      if (autoFocusOnMount) innerRef.current?.focus();
    }, [autoFocusOnMount]);

    return (
      <input
        ref={setRefs}
        type="text"
        className={cn(
          "w-full h-[30px] px-2",
          "bg-[var(--color-paper)]",
          "border border-[var(--color-border-1)]",
          "rounded-[6px]",
          "text-[13px] text-[var(--color-fg-1)]",
          "placeholder:text-[var(--color-fg-3)]",
          "outline-none transition-[background,border-color] duration-120",
          "focus:bg-white focus:border-[rgba(0,63,228,0.4)]",
          "mb-1",
          className
        )}
        {...rest}
      />
    );
  }
);
PopoverSearch.displayName = "PopoverSearch";

/* ------------------------------------------------------------------ */
/*  PopoverSection — titre de section                                   */
/* ------------------------------------------------------------------ */

export function PopoverSection({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-[10px] pt-2 pb-1",
        "text-[10.5px] uppercase tracking-[0.04em]",
        "text-[var(--color-fg-3)]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PopoverItem — ligne cliquable                                       */
/* ------------------------------------------------------------------ */

export interface PopoverItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  hint?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  /** Variante danger (rouge) pour actions destructives. */
  danger?: boolean;
}

export function PopoverItem({
  icon,
  hint,
  active = false,
  disabled = false,
  danger = false,
  className,
  children,
  onClick,
  ...rest
}: PopoverItemProps) {
  return (
    <div
      role="menuitem"
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={cn(
        "flex items-center gap-[10px]",
        "px-[10px] py-[7px]",
        "rounded-[6px]",
        "text-[13px] leading-tight",
        "transition-colors duration-120 cursor-pointer select-none",
        "[&>svg]:shrink-0",
        disabled && "opacity-40 cursor-not-allowed",
        !disabled && !active && !danger && [
          "text-[var(--color-fg-1)]",
          "hover:bg-[rgba(0,63,228,0.06)]",
        ],
        !disabled && active && [
          "bg-[rgba(0,63,228,0.1)] text-[var(--color-k1)] font-medium",
        ],
        !disabled && danger && [
          "text-[#C8304F]",
          "hover:bg-[rgba(200,48,79,0.08)]",
        ],
        className
      )}
      {...rest}
    >
      {icon != null && (
        <span className="flex items-center justify-center w-[14px] h-[14px] shrink-0">
          {icon}
        </span>
      )}
      <span className="flex-1 min-w-0 truncate">{children}</span>
      {hint != null && <PopoverHint>{hint}</PopoverHint>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PopoverHint — raccourci clavier ou tag de droite                    */
/* ------------------------------------------------------------------ */

export function PopoverHint({ children, className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "klyra-mono text-[11px] text-[var(--color-fg-3)] shrink-0",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  PopoverEmpty — état vide                                            */
/* ------------------------------------------------------------------ */

export function PopoverEmpty({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-3 py-3 text-center text-[12px] text-[var(--color-fg-3)]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
