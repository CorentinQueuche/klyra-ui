import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Inbox,
  List as ListIcon,
  Plus,
  Settings,
  Undo2,
  User,
} from "lucide-react";
import {
  CommandPalette,
  PaletteTrigger,
  type CommandItem,
} from "./CommandPalette";
import { Kbd } from "../../../primitives/Kbd/Kbd";

const meta: Meta<typeof CommandPalette> = {
  title: "Composed/Webapp/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Modal Cmd+K. Recherche fuzzy intégrée, groupes de sections, navigation clavier " +
          "(↑ ↓ ↵ Esc), highlight des matches. Passer le raccourci global via `useEffect` côté parent.",
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

/* ------------------------------------------------------------------ */
/*  Commandes d'exemple                                                  */
/* ------------------------------------------------------------------ */

function buildCommands(onNavigate: (s: string) => void): CommandItem[] {
  return [
    {
      id: "goto-today",
      label: "Aller à — Aujourd'hui",
      section: "Navigation",
      icon: <Clock size={14} />,
      hint: "G A",
      onSelect: () => onNavigate("today"),
    },
    {
      id: "goto-upcoming",
      label: "Aller à — À venir",
      section: "Navigation",
      icon: <Calendar size={14} />,
      onSelect: () => onNavigate("upcoming"),
    },
    {
      id: "goto-inbox",
      label: "Aller à — Inbox",
      section: "Navigation",
      icon: <Inbox size={14} />,
      onSelect: () => onNavigate("inbox"),
    },
    {
      id: "goto-done",
      label: "Aller à — Terminées",
      section: "Navigation",
      icon: <CheckCircle2 size={14} />,
      onSelect: () => onNavigate("done"),
    },
    {
      id: "action-new-task",
      label: "Créer une nouvelle tâche",
      section: "Actions",
      icon: <Plus size={14} />,
      hint: "⌘N",
      onSelect: () => onNavigate("new-task"),
    },
    {
      id: "action-new-list",
      label: "Créer une nouvelle liste Studio",
      section: "Actions",
      icon: <ListIcon size={14} />,
      onSelect: () => onNavigate("new-list"),
    },
    {
      id: "action-new-client",
      label: "Créer un client",
      section: "Actions",
      icon: <User size={14} />,
      onSelect: () => onNavigate("new-client"),
    },
    {
      id: "action-undo",
      label: "Annuler la dernière action",
      section: "Actions",
      icon: <Undo2 size={14} />,
      hint: "⌘Z",
      onSelect: () => onNavigate("undo"),
    },
    {
      id: "settings",
      label: "Paramètres",
      section: "Application",
      icon: <Settings size={14} />,
      hint: "⌘,",
      onSelect: () => onNavigate("settings"),
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Wrappers                                                             */
/* ------------------------------------------------------------------ */

function PaletteDemo({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands = buildCommands((action) => {
    setLastAction(action);
    setOpen(false);
  });

  return (
    <div className="min-h-[100vh] bg-[var(--color-paper)] p-14 flex flex-col items-start gap-8">
      <div className="flex items-center gap-3">
        <PaletteTrigger onOpen={() => setOpen(true)} />
        <span className="text-[13px] text-[var(--color-fg-3)]">
          ou appuie sur <Kbd>⌘</Kbd> <Kbd>K</Kbd>
        </span>
      </div>

      {lastAction && (
        <div className="px-4 py-3 rounded-[var(--radius-md)] bg-white border border-[var(--color-border-1)] text-[13px]">
          Dernière action : <code>{lastAction}</code>
        </div>
      )}

      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={commands}
        placeholder="Tape une commande, cherche une page…"
        footer={
          <>
            <span className="flex items-center gap-[4px]">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> naviguer
            </span>
            <span className="flex items-center gap-[4px]">
              <Kbd>↵</Kbd> sélectionner
            </span>
            <span className="flex items-center gap-[4px]">
              <Kbd>ESC</Kbd> fermer
            </span>
          </>
        }
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <PaletteDemo defaultOpen={true} />,
};

export const Closed: Story = {
  render: () => <PaletteDemo defaultOpen={false} />,
};

export const OnDarkShell: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const commands = buildCommands(() => setOpen(false));
    return (
      <div className="min-h-[100vh] bg-black p-14 flex items-start gap-4">
        <PaletteTrigger onOpen={() => setOpen(true)} onDark />
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={commands}
        />
      </div>
    );
  },
};

export const WithFooterHints: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const commands = buildCommands(() => setOpen(false));
    return (
      <div className="min-h-[100vh] bg-[var(--color-paper)] p-14">
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          commands={commands}
          footer={
            <>
              <span className="flex items-center gap-[4px]">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> naviguer
              </span>
              <span className="flex items-center gap-[4px]">
                <Kbd>↵</Kbd> valider
              </span>
              <span className="flex items-center gap-[4px]">
                <Kbd>ESC</Kbd> fermer
              </span>
            </>
          }
        />
      </div>
    );
  },
};
