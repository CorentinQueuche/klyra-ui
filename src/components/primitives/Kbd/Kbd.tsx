import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

/**
 * KLYRA Kbd — indicateur de raccourci clavier.
 * Utiliser `onDark` pour les surfaces sombres (navbar, topbar noire).
 * Exemple : <Kbd>⌘</Kbd><Kbd>K</Kbd> ou <Kbd>⌘K</Kbd>
 */

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Adapte les couleurs pour les fonds sombres. */
  onDark?: boolean;
}

export function Kbd({ children, onDark = false, className, ...rest }: KbdProps) {
  return (
    <kbd
      className={cn(
        "klyra-mono inline-flex items-center justify-center",
        "rounded-[4px] select-none",
        "text-[10px] font-medium leading-none",
        "px-[5px] py-[1px]",
        onDark
          ? [
              "border border-[rgba(255,255,255,0.2)]",
              "text-[rgba(255,255,255,0.7)]",
              "bg-transparent",
            ]
          : [
              "border border-[#D9D9E5]",
              "text-[rgba(0,0,0,0.5)]",
              "bg-white",
            ],
        className
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
}
