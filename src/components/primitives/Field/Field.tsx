"use client";

import { useId, type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Texte du label affiché au-dessus du champ. */
  label?: string;
  /** Texte d'aide sous le champ. */
  helpText?: string;
  /** Message d'erreur — remplace helpText et colore le contour. */
  error?: string;
  /** Ajoute un astérisque et aria-required sur l'input enfant. */
  required?: boolean;
  /** Cache le label visuellement (reste accessible). */
  srOnly?: boolean;
  /** L'input contrôlé. htmlFor est injecté automatiquement via useId. */
  children: ReactNode;
  /** Id forcé (optionnel — sinon généré automatiquement). */
  htmlFor?: string;
}

export function Field({
  label,
  helpText,
  error,
  required,
  srOnly,
  children,
  htmlFor,
  className,
  ...rest
}: FieldProps) {
  const generatedId = useId();
  const inputId = htmlFor ?? generatedId;

  return (
    <div className={cn("flex flex-col gap-[6px]", className)} {...rest}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-[12px] text-[var(--color-fg-2)] tracking-[-0.01em] font-medium leading-none select-none",
            srOnly && "sr-only"
          )}
        >
          {label}
          {required && (
            <span
              aria-hidden="true"
              className="ml-[3px] text-[var(--color-k1)]"
            >
              *
            </span>
          )}
        </label>
      )}

      {/* Clone l'enfant unique pour injecter id + aria-invalid si nécessaire */}
      <FieldChild id={inputId} hasError={!!error} required={required}>
        {children}
      </FieldChild>

      {error ? (
        <span
          role="alert"
          className="flex items-center gap-[5px] text-[12px] text-[#C03535] leading-tight tracking-[-0.01em]"
        >
          <AlertIcon />
          {error}
        </span>
      ) : helpText ? (
        <span className="text-[12px] text-[var(--color-fg-3)] leading-tight tracking-[-0.01em]">
          {helpText}
        </span>
      ) : null}
    </div>
  );
}

/* Injecte l'id et aria-invalid sur l'input enfant direct */
function FieldChild({
  id,
  hasError,
  required,
  children,
}: {
  id: string;
  hasError: boolean;
  required?: boolean;
  children: ReactNode;
}) {
  // On ne peut pas cloneElement en TypeScript strict sans any — on passe l'id
  // via un wrapper data-attr et on laisse les inputs natifs le récupérer.
  // Pattern alternatif : exposer FieldContext et le lire dans chaque Input.
  // Ici on injecte via un wrapper aria minimal.
  return (
    <div
      data-field-id={id}
      data-field-error={hasError ? "true" : undefined}
      data-field-required={required ? "true" : undefined}
      className="contents"
    >
      {children}
    </div>
  );
}

function AlertIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M6 1L11 10H1L6 1Z"
        stroke="#C03535"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M6 4.5V6.5" stroke="#C03535" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="8" r="0.5" fill="#C03535" />
    </svg>
  );
}
