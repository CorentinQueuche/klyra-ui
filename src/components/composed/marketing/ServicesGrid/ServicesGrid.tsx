import type { ReactNode } from "react";
import { cn } from "../../../../lib/cn";
import { Badge } from "../../../primitives/Badge/Badge";
import { Container } from "../../../layout/Container/Container";

export interface ServiceItem {
  num: string;
  title: string;
  body: string;
  tags: string[];
  highlight?: boolean;
}

export interface ServicesGridProps {
  /** Label eyebrow mono */
  eyebrow?: string;
  /** Titre de section — ReactNode pour highlights inline */
  title?: ReactNode;
  /** Lien "Tous nos services" */
  linkAll?: { label: string; href: string };
  /** Liste des services */
  services?: ServiceItem[];
  /** Nombre de colonnes */
  columns?: 2 | 3 | 4;
  className?: string;
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "Branding",
    body: "Nous construisons une identité visuelle cohérente et mémorable, pensée pour durer.",
    tags: ["Stratégie", "Logo", "Design system"],
  },
  {
    num: "02",
    title: "Web Design",
    body: "Nous concevons des interfaces claires, modernes et performantes pour convertir.",
    tags: ["UX", "UI", "Prototypage"],
    highlight: true,
  },
  {
    num: "03",
    title: "Développement",
    body: "Next.js, React, Tailwind. Nous codons des sites et outils métier sur mesure.",
    tags: ["Next.js", "Webapps", "E-commerce"],
  },
  {
    num: "04",
    title: "Maintenance",
    body: "Nous veillons sur votre présence en ligne pour qu'elle reste rapide et à jour.",
    tags: ["Hébergement", "Sécurité", "Support"],
  },
];

interface ServiceCardProps extends ServiceItem {
  className?: string;
}

function ServiceCard({ num, title, body, tags, highlight, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-[20px] overflow-hidden",
        className
      )}
      style={{
        padding: "28px 26px 24px",
        minHeight: 280,
        position: "relative",
        background: highlight
          ? "linear-gradient(180deg, var(--color-k1) 0%, var(--color-blue-deep) 100%)"
          : "#fff",
        color: highlight ? "#fff" : "var(--color-ink)",
        border: highlight ? "none" : "1px solid var(--color-gray-k1)",
      }}
    >
      {/* Numéro */}
      <span
        style={{
          fontSize: 12,
          fontFamily: "var(--font-mono)",
          opacity: highlight ? 0.7 : 0.45,
          letterSpacing: "0.03em",
        }}
      >
        {num}
      </span>

      {/* Titre */}
      <h3
        style={{
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: "-0.0325em",
          lineHeight: 1,
          margin: 0,
        }}
      >
        {title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.45,
          letterSpacing: "-0.0125em",
          margin: 0,
          opacity: highlight ? 0.85 : 0.72,
          flex: 1,
        }}
      >
        {body}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={highlight ? "k1" : "tinted"}
            size="sm"
            className={
              highlight
                ? "bg-[rgba(255,255,255,0.14)] text-white border-0"
                : undefined
            }
          >
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}

export function ServicesGrid({
  eyebrow = "→ CE QUE NOUS FAISONS",
  title = (
    <>
      Quatre métiers, une seule obsession&nbsp;:{" "}
      <span style={{ color: "var(--color-k1)" }}>votre impact</span>.
    </>
  ),
  linkAll = { label: "Tous nos services →", href: "#" },
  services = DEFAULT_SERVICES,
  columns = 4,
  className,
}: ServicesGridProps) {
  const gridCols = {
    2: "repeat(2, 1fr)",
    3: "repeat(3, 1fr)",
    4: "repeat(4, 1fr)",
  }[columns];

  return (
    <section
      className={cn("relative w-full", className)}
      style={{
        padding: "120px 0",
        background: "#fff",
        color: "var(--color-ink)",
      }}
    >
      <Container size="lg" gutter="brand">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontSize: 13,
                color: "var(--color-k1)",
                fontFamily: "var(--font-mono)",
                marginBottom: 12,
              }}
            >
              {eyebrow}
            </span>
            <h2
              style={{
                fontSize: 56,
                fontWeight: 500,
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                margin: 0,
                maxWidth: 720,
              }}
            >
              {title}
            </h2>
          </div>

          {linkAll && (
            <a
              href={linkAll.href}
              style={{
                color: "var(--color-ink)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.0125em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {linkAll.label}
            </a>
          )}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: 16,
          }}
        >
          {services.map((service) => (
            <ServiceCard key={service.num} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
