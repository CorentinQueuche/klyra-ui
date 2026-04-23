import {
  createElement,
  forwardRef,
  type ElementType,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
  type CSSProperties,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";
import { H3, BodyS, Eyebrow } from "../Typography";

/* ─── Variants ─────────────────────────────────────────────────── */

export const cardVariants = cva(
  ["flex flex-col", "transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]"],
  {
    variants: {
      variant: {
        light:    ["bg-white border border-[var(--color-gray-k1)] text-[var(--color-ink)]", "[box-shadow:var(--shadow-sm)]"],
        elevated: ["bg-white border-0 text-[var(--color-ink)]", "[box-shadow:var(--shadow-md)]"],
        dark:     ["bg-[var(--color-ink)] border border-[rgba(255,255,255,0.08)] text-white"],
        brand:    ["text-white border-0", "bg-[linear-gradient(180deg,var(--color-k1)_0%,var(--color-blue-deep)_100%)]"],
        outline:  ["bg-transparent border border-[var(--color-gray-k1)] text-[var(--color-ink)]"],
        paper:    ["bg-[var(--color-paper)] border border-[var(--color-gray-k1)] text-[var(--color-ink)]"],
      },
      radius: {
        md: ["rounded-[12px]"],
        lg: ["rounded-[20px]"],
        xl: ["rounded-[28px]"],
      },
      padding: {
        sm: ["p-4"],
        md: ["p-6"],
        lg: ["p-8"],
      },
      interactive: {
        true:  ["cursor-pointer hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-md)]"],
        false: [],
      },
    },
    defaultVariants: {
      variant:     "light",
      radius:      "lg",
      padding:     "md",
      interactive: false,
    },
  }
);

export type CardVariant  = "light" | "elevated" | "dark" | "brand" | "outline" | "paper";
export type CardRadius   = "md" | "lg" | "xl";
export type CardPadding  = "sm" | "md" | "lg";

export interface CardProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardVariants> {
  as?: ElementType;
  children?: ReactNode;
  style?: CSSProperties;
}

/* ─── Root ──────────────────────────────────────────────────────── */

const CardRoot = forwardRef<HTMLElement, CardProps>(
  (
    {
      variant = "light",
      radius  = "lg",
      padding = "md",
      interactive = false,
      as,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const Tag = (as ?? "div") as ElementType;
    return createElement(
      Tag,
      {
        ref,
        className: cn(
          cardVariants({ variant, radius, padding, interactive }),
          className
        ),
        ...rest,
      },
      children
    );
  }
);
CardRoot.displayName = "Card";

/* ─── Sub-components ────────────────────────────────────────────── */

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function CardHeader({ className, children, ...rest }: CardSectionProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3 mb-3", className)} {...rest}>
      {children}
    </div>
  );
}
CardHeader.displayName = "Card.Header";

export function CardBody({ className, children, ...rest }: CardSectionProps) {
  return (
    <div className={cn("flex-1", className)} {...rest}>
      {children}
    </div>
  );
}
CardBody.displayName = "Card.Body";

export function CardFooter({ className, children, ...rest }: CardSectionProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-[rgba(0,0,0,0.07)]", className)} {...rest}>
      {children}
    </div>
  );
}
CardFooter.displayName = "Card.Footer";

export function CardEyebrow({ className, children, ...rest }: CardSectionProps) {
  return (
    <Eyebrow
      className={cn("text-[var(--color-fg-2)] mb-2", className)}
      {...(rest as HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Eyebrow>
  );
}
CardEyebrow.displayName = "Card.Eyebrow";

export function CardTitle({ className, children, ...rest }: CardSectionProps) {
  return (
    <H3 className={cn("", className)} {...(rest as HTMLAttributes<HTMLElement>)}>
      {children}
    </H3>
  );
}
CardTitle.displayName = "Card.Title";

export function CardDescription({ className, children, ...rest }: CardSectionProps) {
  return (
    <BodyS
      className={cn("text-[var(--color-fg-2)] mt-1", className)}
      {...(rest as HTMLAttributes<HTMLElement>)}
    >
      {children}
    </BodyS>
  );
}
CardDescription.displayName = "Card.Description";

export function CardActions({ className, children, ...rest }: CardSectionProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2 mt-4", className)} {...rest}>
      {children}
    </div>
  );
}
CardActions.displayName = "Card.Actions";

/* ─── Namespace attachment ──────────────────────────────────────── */

type CardComponent = ForwardRefExoticComponent<CardProps & RefAttributes<HTMLElement>> & {
  Header:      typeof CardHeader;
  Body:        typeof CardBody;
  Footer:      typeof CardFooter;
  Eyebrow:     typeof CardEyebrow;
  Title:       typeof CardTitle;
  Description: typeof CardDescription;
  Actions:     typeof CardActions;
};

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Eyebrow: CardEyebrow,
  Title: CardTitle,
  Description: CardDescription,
  Actions: CardActions,
}) as CardComponent;
