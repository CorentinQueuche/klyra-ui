import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Calendar,
  Flag,
  Folder,
  Inbox,
  List as ListIcon,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverEmpty,
  PopoverItem,
  PopoverSearch,
  PopoverSection,
} from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Primitives/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Panneau flottant ancré. Base pour priorité, date, tag, sélecteur de liste… " +
          "Wrapper `position: relative` requis autour du bouton déclencheur.",
      },
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/* ------------------------------------------------------------------ */
/*  Boilerplate trigger + panel                                         */
/* ------------------------------------------------------------------ */

function TriggerBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 py-[7px] rounded-full border border-[rgba(0,0,0,0.12)] bg-white text-[13px] hover:border-[rgba(0,63,228,0.25)] hover:text-[var(--color-k1)] transition-colors"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Priorité                                                            */
/* ------------------------------------------------------------------ */

const PRIO = [
  { value: "P0", label: "P0 — Urgent",   color: "#E0365F", glow: true },
  { value: "P1", label: "P1 — Haute",    color: "#F59E0B" },
  { value: "P2", label: "P2 — Moyenne",  color: "#01A4FF" },
  { value: "P3", label: "P3 — Basse",    color: "transparent", border: "#B8B8C2" },
  { value: null, label: "Aucune" },
] as const;

export const Priority: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [current, setCurrent] = useState<string | null>("P1");
    return (
      <div className="relative inline-block">
        <TriggerBtn onClick={() => setOpen((v) => !v)}>
          <Flag size={13} />
          Priorité
        </TriggerBtn>
        <Popover open={open} onClose={() => setOpen(false)} minWidth={200}>
          {PRIO.map((p) => (
            <PopoverItem
              key={p.value ?? "none"}
              active={current === p.value}
              onClick={() => {
                setCurrent(p.value);
                setOpen(false);
              }}
              icon={
                p.value ? (
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: p.color,
                      border: "border" in p ? `1.5px solid ${p.border}` : undefined,
                      boxShadow: "glow" in p && p.glow ? `0 0 6px ${p.color}` : undefined,
                    }}
                  />
                ) : (
                  <span style={{ width: 9 }} />
                )
              }
            >
              {p.label}
            </PopoverItem>
          ))}
        </Popover>
      </div>
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Date — presets + input                                              */
/* ------------------------------------------------------------------ */

const DATE_PRESETS = [
  { label: "Aujourd'hui", raw: "aujourd'hui" },
  { label: "Demain", raw: "demain" },
  { label: "Dans 3 jours", raw: "dans 3 jours" },
  { label: "Semaine prochaine", raw: "semaine prochaine" },
];

export const DatePicker: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState("");
    return (
      <div className="relative inline-block">
        <TriggerBtn onClick={() => setOpen((v) => !v)}>
          <Calendar size={13} />
          Échéance
        </TriggerBtn>
        <Popover open={open} onClose={() => setOpen(false)} minWidth={220}>
          <PopoverSearch
            placeholder="demain, vendredi, 25/04…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {DATE_PRESETS.map((p) => (
            <PopoverItem
              key={p.raw}
              icon={<Calendar size={13} />}
              onClick={() => setOpen(false)}
            >
              {p.label}
            </PopoverItem>
          ))}
          <PopoverItem icon={<X size={13} />} danger onClick={() => setOpen(false)}>
            Retirer l'échéance
          </PopoverItem>
        </Popover>
      </div>
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Tag                                                                 */
/* ------------------------------------------------------------------ */

export const TagPicker: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState("");
    return (
      <div className="relative inline-block">
        <TriggerBtn onClick={() => setOpen((v) => !v)}>
          <Tag size={13} />
          Ajouter tag
        </TriggerBtn>
        <Popover open={open} onClose={() => setOpen(false)} minWidth={220}>
          <PopoverSearch
            placeholder="Nom du tag…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="px-[10px] py-[6px] text-[11px] text-[var(--color-fg-3)]">
            Astuce — tape <code>#nom</code> dans le titre.
          </div>
        </Popover>
      </div>
    );
  },
};

/* ------------------------------------------------------------------ */
/*  List picker (studio + inbox, searchable)                            */
/* ------------------------------------------------------------------ */

const LISTS = [
  { id: "inbox", name: "Inbox", kind: "inbox" as const },
  { id: "site-refonte", name: "Site — Refonte", kind: "studio" as const },
  { id: "webapp-mvp", name: "Webapp MVP Payway", kind: "studio" as const },
  { id: "marketing-q2", name: "Marketing Q2", kind: "studio" as const },
  { id: "onboarding", name: "Onboarding nouveaux clients", kind: "studio" as const },
];

export const ListPicker: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [current, setCurrent] = useState("site-refonte");
    const [query, setQuery] = useState("");
    const filtered = LISTS.filter((l) =>
      l.name.toLowerCase().includes(query.toLowerCase())
    );
    const inbox = filtered.find((l) => l.kind === "inbox");
    const studios = filtered.filter((l) => l.kind === "studio");
    return (
      <div className="relative inline-block">
        <TriggerBtn onClick={() => setOpen((v) => !v)}>
          <Folder size={13} />
          Déplacer
        </TriggerBtn>
        <Popover open={open} onClose={() => setOpen(false)} minWidth={240} placement="bottom-start">
          <PopoverSearch
            placeholder="Chercher une liste…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {filtered.length === 0 && <PopoverEmpty>Aucune liste.</PopoverEmpty>}
          {inbox && (
            <PopoverItem
              icon={<Inbox size={13} />}
              active={current === inbox.id}
              onClick={() => {
                setCurrent(inbox.id);
                setOpen(false);
              }}
            >
              {inbox.name}
            </PopoverItem>
          )}
          {studios.length > 0 && <PopoverSection>Studio</PopoverSection>}
          {studios.map((l) => (
            <PopoverItem
              key={l.id}
              icon={<ListIcon size={13} />}
              active={current === l.id}
              onClick={() => {
                setCurrent(l.id);
                setOpen(false);
              }}
            >
              {l.name}
            </PopoverItem>
          ))}
        </Popover>
      </div>
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Avec hints / danger                                                  */
/* ------------------------------------------------------------------ */

export const WithHintsAndDanger: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="relative inline-block">
        <TriggerBtn onClick={() => setOpen((v) => !v)}>
          Actions…
        </TriggerBtn>
        <Popover open={open} onClose={() => setOpen(false)} minWidth={240}>
          <PopoverItem icon={<ListIcon size={13} />} hint="⌘E" onClick={() => setOpen(false)}>
            Renommer
          </PopoverItem>
          <PopoverItem icon={<Folder size={13} />} hint="⌘M" onClick={() => setOpen(false)}>
            Déplacer vers…
          </PopoverItem>
          <PopoverItem icon={<Calendar size={13} />} hint="⌘D" onClick={() => setOpen(false)}>
            Dupliquer
          </PopoverItem>
          <div className="my-1 h-px bg-[var(--color-border-1)]" />
          <PopoverItem icon={<Trash2 size={13} />} hint="⌫" danger onClick={() => setOpen(false)}>
            Supprimer
          </PopoverItem>
        </Popover>
      </div>
    );
  },
};

/* ------------------------------------------------------------------ */
/*  Placement matrix                                                     */
/* ------------------------------------------------------------------ */

export const AllPlacements: Story = {
  render: () => {
    const placements = ["bottom-start", "bottom-end", "top-start", "top-end"] as const;
    return (
      <div className="grid grid-cols-2 gap-24 py-40">
        {placements.map((p) => (
          <div key={p} className="relative inline-block">
            <TriggerBtn onClick={() => {}}>{p}</TriggerBtn>
            <Popover open onClose={() => {}} placement={p} closeOnBackdrop={false} minWidth={160}>
              <PopoverItem>Item 1</PopoverItem>
              <PopoverItem active>Item 2 (actif)</PopoverItem>
              <PopoverItem>Item 3</PopoverItem>
            </Popover>
          </div>
        ))}
      </div>
    );
  },
};
