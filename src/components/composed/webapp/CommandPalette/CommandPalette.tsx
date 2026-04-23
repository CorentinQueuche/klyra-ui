"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Search } from "lucide-react";
import { cn } from "../../../../lib/cn";
import { Kbd } from "../../../primitives/Kbd/Kbd";

/**
 * KLYRA CommandPalette — modal Cmd+K.
 * Overlay + backdrop flou, recherche live, groupes de sections, highlight des matches,
 * navigation clavier (↑ ↓ ↵ Esc).
 *
 * Utilisation :
 *   const [open, setOpen] = useState(false);
 *   useEffect(() => {
 *     const h = (e: KeyboardEvent) => {
 *       if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(v => !v); }
 *     };
 *     window.addEventListener("keydown", h);
 *     return () => window.removeEventListener("keydown", h);
 *   }, []);
 *   <CommandPalette open={open} onClose={() => setOpen(false)} commands={[…]} />
 */

export interface CommandItem {
  id: string;
  label: string;
  /** Nom de la section/groupe (optionnel). Tous les items sans section sont regroupés sous "Actions". */
  section?: string;
  /** Raccourci clavier ou hint mono-space à droite. */
  hint?: ReactNode;
  /** Icône à gauche (14×14 recommandé). */
  icon?: ReactNode;
  /** Mots-clés additionnels pour le matching fuzzy. */
  keywords?: string;
  /** Handler déclenché à la sélection (appui Enter ou click). */
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: CommandItem[];
  /** Placeholder de la barre de recherche. */
  placeholder?: string;
  /** Texte affiché quand aucun match. */
  emptyLabel?: string;
  /** Nombre max de résultats affichés (défaut 50). */
  maxResults?: number;
  /** Callback déclenché sur chaque changement de query (pour ajouter des commandes contextuelles). */
  onQueryChange?: (query: string) => void;
  /** Contenu additionnel affiché en footer sous la liste (hints de raccourcis, etc.). */
  footer?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Fuzzy matching — léger, sans dépendance                             */
/* ------------------------------------------------------------------ */

type MatchResult = { score: number; indices: number[] } | null;

function fuzzyMatch(query: string, target: string): MatchResult {
  if (!query) return { score: 0, indices: [] };
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  const indices: number[] = [];
  let qi = 0;
  let score = 0;
  let consecutive = 0;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      indices.push(ti);
      // bonus for word-start match
      if (ti === 0 || t[ti - 1] === " " || t[ti - 1] === "-") score += 4;
      score += 1 + consecutive * 2;
      consecutive++;
      qi++;
    } else {
      consecutive = 0;
    }
  }
  if (qi < q.length) return null;
  score -= t.length - indices.length; // prefer shorter strings
  return { score, indices };
}

function highlight(label: string, indices: number[]): { text: string; match: boolean }[] {
  if (!indices.length) return [{ text: label, match: false }];
  const set = new Set(indices);
  const out: { text: string; match: boolean }[] = [];
  let buf = "";
  let inMatch = false;
  for (let i = 0; i < label.length; i++) {
    const isMatch = set.has(i);
    if (isMatch !== inMatch && buf) {
      out.push({ text: buf, match: inMatch });
      buf = "";
    }
    inMatch = isMatch;
    buf += label[i];
  }
  if (buf) out.push({ text: buf, match: inMatch });
  return out;
}

/* ------------------------------------------------------------------ */
/*  Composant                                                           */
/* ------------------------------------------------------------------ */

export function CommandPalette({
  open,
  onClose,
  commands,
  placeholder = "Tape une commande, cherche une page…",
  emptyLabel = "Aucun résultat.",
  maxResults = 50,
  onQueryChange,
  footer,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    onQueryChange?.(query);
  }, [query, onQueryChange]);

  const hits = useMemo(() => {
    const source = commands.map((cmd) => {
      const haystack = `${cmd.label} ${cmd.section ?? ""} ${cmd.keywords ?? ""}`;
      const m = fuzzyMatch(query, haystack);
      // also match against label alone for highlight indices
      const labelMatch = fuzzyMatch(query, cmd.label);
      return m
        ? {
            cmd,
            score: m.score,
            labelIndices: labelMatch ? labelMatch.indices : [],
          }
        : null;
    });
    return source
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);
  }, [commands, query, maxResults]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLDivElement>(
      `[data-cmd-index="${cursor}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      hits[cursor]?.cmd.onSelect();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Group hits by section (preserving sorted order)
  const grouped: { section: string; items: typeof hits }[] = [];
  for (const hit of hits) {
    const section = hit.cmd.section ?? "Actions";
    const last = grouped[grouped.length - 1];
    if (last && last.section === section) last.items.push(hit);
    else grouped.push({ section, items: [hit] });
  }

  let running = -1;

  return (
    <div
      aria-hidden={!open}
      onMouseDown={onClose}
      className={cn(
        "fixed inset-0 z-[100]",
        "bg-[rgba(16,16,24,0.32)] backdrop-blur-[6px]",
        "flex items-start justify-center",
        "pt-[14vh] px-4",
        "animate-[klyra-palette-fade_160ms_cubic-bezier(0.22,0.61,0.36,1)]"
      )}
    >
      <style>{`
        @keyframes klyra-palette-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes klyra-palette-rise {
          from { transform: translateY(8px); opacity: 0 }
          to   { transform: translateY(0); opacity: 1 }
        }
      `}</style>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Palette de commandes"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className={cn(
          "w-full max-w-[620px]",
          "bg-white/96 backdrop-blur-xl",
          "border border-[var(--color-border-1)]",
          "rounded-[var(--radius-lg)]",
          "overflow-hidden",
          "[box-shadow:0_24px_80px_rgba(0,45,164,0.18),0_4px_14px_rgba(0,45,164,0.08),0_0_0_1px_rgba(0,63,228,0.08)]",
          "animate-[klyra-palette-rise_200ms_cubic-bezier(0.2,0.8,0.2,1)]"
        )}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-[18px] py-[14px] border-b border-[var(--color-border-1)]">
          <Search size={16} className="text-[var(--color-fg-3)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "flex-1 bg-transparent outline-none border-none",
              "text-[15px] text-[var(--color-fg-1)]",
              "placeholder:text-[var(--color-fg-3)]",
              "tracking-[-0.005em]"
            )}
          />
          <Kbd>ESC</Kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="max-h-[420px] overflow-y-auto p-[6px]"
        >
          {hits.length === 0 ? (
            <div className="py-7 px-3 text-center text-[13px] text-[var(--color-fg-3)]">
              {emptyLabel}
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.section}>
                <div className="px-3 pt-2 pb-1 text-[10.5px] uppercase tracking-[0.04em] text-[var(--color-fg-3)]">
                  {group.section}
                </div>
                {group.items.map((hit) => {
                  running += 1;
                  const i = running;
                  const parts = highlight(hit.cmd.label, hit.labelIndices);
                  const active = cursor === i;
                  return (
                    <div
                      key={hit.cmd.id}
                      data-cmd-index={i}
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => hit.cmd.onSelect()}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer",
                        "text-[13.5px] tracking-[-0.005em]",
                        "transition-colors duration-120",
                        active
                          ? "bg-[rgba(0,63,228,0.1)] text-[var(--color-k1)]"
                          : "text-[var(--color-fg-1)]"
                      )}
                    >
                      {hit.cmd.icon != null && (
                        <span
                          className={cn(
                            "w-[18px] h-[18px] grid place-items-center shrink-0",
                            active
                              ? "text-[var(--color-k1)]"
                              : "text-[var(--color-fg-3)]"
                          )}
                        >
                          {hit.cmd.icon}
                        </span>
                      )}
                      <span className="flex-1 min-w-0 truncate">
                        {parts.map((p, idx) => (
                          <span
                            key={idx}
                            className={
                              p.match
                                ? "text-[var(--color-k1)] font-semibold"
                                : ""
                            }
                          >
                            {p.text}
                          </span>
                        ))}
                      </span>
                      {hit.cmd.hint != null && (
                        <span className="klyra-mono text-[11px] text-[var(--color-fg-3)] shrink-0">
                          {hit.cmd.hint}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {footer && (
          <div className="border-t border-[var(--color-border-1)] px-[14px] py-2 text-[11px] text-[var(--color-fg-3)] flex items-center gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PaletteTrigger — bouton discret qui affiche ⌘K                     */
/* ------------------------------------------------------------------ */

export interface PaletteTriggerProps {
  onOpen: () => void;
  label?: string;
  onDark?: boolean;
  className?: string;
}

export function PaletteTrigger({
  onOpen,
  label = "Commander",
  onDark = false,
  className,
}: PaletteTriggerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-[7px]",
        "text-[13px] transition-colors duration-120",
        onDark
          ? [
              "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] text-white",
              "hover:bg-[rgba(255,255,255,0.1)]",
            ]
          : [
              "bg-white border border-[rgba(0,0,0,0.12)] text-[var(--color-fg-1)]",
              "hover:border-[rgba(0,63,228,0.25)] hover:text-[var(--color-k1)]",
            ],
        className
      )}
    >
      <Search size={13} />
      {label}
      <span className="ml-1 flex items-center gap-[2px]">
        <Kbd onDark={onDark}>⌘</Kbd>
        <Kbd onDark={onDark}>K</Kbd>
      </span>
    </button>
  );
}
