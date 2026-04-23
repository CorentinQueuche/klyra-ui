import Link from "next/link";

/**
 * Index de la design library KLYRA.
 * Une page statique qui liste tous les composants disponibles + pointe vers Storybook.
 * Pour voir les composants en action : `pnpm storybook` → http://localhost:6006.
 */

const GROUPS = [
  {
    title: "Foundations",
    subtitle: "Tokens, type scale, palette, gradients.",
    items: ["Typography (14 variants)", "Colors (Bleus K1/K2/K3 + neutres)", "Gradients sanctionnés (4)", "Radii (pill 999 = CTA signature)", "Shadows (inner-glow K2 signature)"],
  },
  {
    title: "Primitives — Brand",
    subtitle: "Marques, motifs, flèches.",
    items: ["Logo (5 lockups)", "Arrow (8 directions × motif/chevron)", "Halo (dual K1/K2, halos off-canvas)", "PixelMotif (canvas 4×4 pixels)"],
  },
  {
    title: "Primitives — Actions & Indicators",
    subtitle: "Boutons, badges, tags.",
    items: ["Button (5 variants × 4 sizes × tones light/dark)", "IconButton (5 variants × 3 sizes)", "Badge (12 variants × dots)", "Tag (removable chips)", "Kbd (keyboard shortcut)", "Spinner"],
  },
  {
    title: "Primitives — Surfaces",
    subtitle: "Cards, cartes stat, verre.",
    items: ["Card (6 variants, interactive, composable)", "StatCard (sparkline + delta + trend)", "GlassCard (signature glass panel on dark)", "Avatar (initials gradient + image + Group)", "Divider (hairline)"],
  },
  {
    title: "Primitives — Forms",
    subtitle: "Inputs, textarea, select, radio, toggle.",
    items: ["Field (wrapper label + help + error)", "Input (3 variants × 3 sizes × tones)", "Textarea", "Select (native stylisé)", "Checkbox (checked / indeterminate)", "Radio + RadioGroup", "Toggle (switch pill)", "Tabs (segmented pill)"],
  },
  {
    title: "Primitives — Data",
    subtitle: "Tableaux, empty states, fils d'Ariane.",
    items: ["Table (composable + StatusPill)", "EmptyState", "Breadcrumb"],
  },
  {
    title: "Primitives — Overlays",
    subtitle: "Panneaux flottants, popovers ancrés.",
    items: ["Popover (bottom-start/end, top-start/end)", "PopoverSearch (input inline filtrable)", "PopoverSection / PopoverItem / PopoverHint / PopoverEmpty"],
  },
  {
    title: "Layout",
    subtitle: "Conteneurs, grilles, sections.",
    items: ["Container (brand gutter 52 px)", "Stack (row / column)", "Grid (responsive / fixed cols)", "Section (background variants + halos)"],
  },
  {
    title: "Composés — Marketing",
    subtitle: "Sections site klyra.fr.",
    items: ["Nav (sticky, mobile)", "Hero (halos + balanced h1)", "ServicesGrid (4 métiers)", "ProofMetrics (band dark)", "CaseStudyBlock (split dashboard + 3 cases)", "CtaFooter"],
  },
  {
    title: "Composés — Webapp",
    subtitle: "Shell d'outils métier sur mesure.",
    items: ["Sidebar (tenant card + footer CTA)", "TopBar (search ⌘K + notifications + CTA)", "DashboardShell (stats + chart + tasks + table)", "CommandPalette (⌘K modal, fuzzy, keyboard nav)", "PaletteTrigger (bouton ⌘K)"],
  },
  {
    title: "Composés — Éditorial",
    subtitle: "Posts LinkedIn portrait/square.",
    items: ["LinkedInPost (dark / blue / light)"],
  },
];

export default function Page() {
  return (
    <main style={{ background: "#FAFAFB", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#000",
          color: "#FFF",
          padding: "120px 52px 80px",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: "50%",
            top: -380,
            right: -260,
            background: "radial-gradient(50% 50% at 50% 50%, rgba(0,63,228,0.85) 0%, rgba(0,63,228,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            borderRadius: "50%",
            bottom: -440,
            left: -260,
            background: "radial-gradient(50% 50% at 50% 50%, rgba(1,164,255,0.6) 0%, rgba(1,164,255,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 999,
              fontSize: 13,
              color: "rgba(255,255,255,0.8)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00DDFF" }} />
            Klyra UI — design system 2026
          </div>
          <h1
            style={{
              fontSize: 96,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              margin: "32px 0 0",
              maxWidth: 1080,
              textWrap: "balance",
            }}
          >
            Une library de composants
            {" "}
            <span style={{ color: "#01A4FF", whiteSpace: "nowrap" }}>pensée pour durer.</span>
          </h1>
          <p
            style={{
              marginTop: 28,
              maxWidth: 640,
              fontSize: 20,
              lineHeight: 1.45,
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            41 composants Next.js + TypeScript strict, basés sur la charte KLYRA 2026.
            Bleus K1/K2/K3, Google Sans Flex, pill CTAs avec inner-glow signature, halos radiaux
            — toutes les règles du brand book encodées en tokens.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="/storybook"
              style={{
                padding: "18px 32px",
                borderRadius: 999,
                background: "linear-gradient(180deg,#003FE4 0%,rgba(0,63,228,0.45) 100%)",
                color: "#FFF",
                fontSize: 16,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow:
                  "inset 8px -5px 41px rgba(1,164,255,0.3), inset -12px 8px 33px rgba(1,164,255,0.15), 0 18px 40px rgba(0,63,228,0.45)",
              }}
            >
              Ouvrir Storybook →
            </Link>
            <a
              href="https://github.com"
              style={{
                padding: "18px 32px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.04)",
                color: "#FFF",
                fontSize: 16,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Voir les conventions
            </a>
          </div>
        </div>
      </section>

      {/* Index des composants */}
      <section style={{ padding: "120px 52px", background: "#FFF" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 13,
              color: "#003FE4",
              fontFamily: "var(--font-mono)",
              marginBottom: 16,
            }}
          >
            → INVENTAIRE
          </div>
          <h2
            style={{
              fontSize: 56,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              margin: 0,
              maxWidth: 820,
            }}
          >
            Tout ce que vous pouvez utiliser, maintenant.
          </h2>
          <div
            style={{
              marginTop: 64,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {GROUPS.map((g) => (
              <article
                key={g.title}
                style={{
                  background: "#FFF",
                  border: "1px solid #E0E0E0",
                  borderRadius: 20,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition: "transform 220ms var(--ease-standard), box-shadow 220ms var(--ease-standard)",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.025em" }}>
                  {g.title}
                </div>
                <div style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", lineHeight: 1.4 }}>
                  {g.subtitle}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {g.items.map((it) => (
                    <li
                      key={it}
                      style={{
                        fontSize: 13,
                        color: "#202020",
                        padding: "6px 10px",
                        background: "#F4F6FB",
                        borderRadius: 6,
                      }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "52px",
          borderTop: "1px solid #E0E0E0",
          background: "#FFF",
          fontSize: 12,
          color: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span>Stratégie &amp; identité de marque — Tous droits réservés</span>
        <span>Klyra Design · 2026</span>
      </footer>
    </main>
  );
}
