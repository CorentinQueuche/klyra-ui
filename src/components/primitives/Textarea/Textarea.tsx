"use client";

import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  type TextareaHTMLAttributes,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

export const textareaVariants = cva(
  [
    "w-full font-[inherit] outline-none resize-none transition-all",
    "duration-[120ms] [transition-timing-function:cubic-bezier(0.22,0.61,0.36,1)]",
    "placeholder:text-[var(--color-fg-3)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        outline: [
          "bg-white border border-[var(--color-border-1)] rounded-[10px]",
          "focus:border-[var(--color-k1)] focus:[box-shadow:0_0_0_3px_rgba(0,63,228,0.18)]",
          "aria-invalid:border-[#C03535] aria-invalid:[box-shadow:0_0_0_3px_rgba(192,53,53,0.16)]",
        ],
        subtle: [
          "bg-[#F4F6FB] border-none rounded-[20px]",
          "focus:bg-white focus:border focus:border-[var(--color-k1)] focus:[box-shadow:0_0_0_3px_rgba(0,63,228,0.18)]",
        ],
        ghost: [
          "bg-transparent border-none border-b border-[var(--color-border-1)] rounded-none",
          "focus:border-[var(--color-k1)]",
          "aria-invalid:border-[#C03535]",
        ],
      },
      size: {
        sm: ["text-[13px] py-[8px] px-[12px]"],
        md: ["text-[15px] py-[12px] px-[14px]"],
        lg: ["text-[16px] py-[14px] px-[16px]"],
      },
      tone: {
        light: ["text-[var(--color-fg-1)]"],
        dark: [
          "bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.18)] text-white",
          "placeholder:text-[rgba(255,255,255,0.5)]",
          "focus:border-[var(--color-k2)] focus:[box-shadow:0_0_0_3px_rgba(1,164,255,0.22)]",
        ],
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      tone: "light",
    },
  }
);

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  variant?: "outline" | "subtle" | "ghost";
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  /** Ajuste automatiquement la hauteur au contenu. */
  autoGrow?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "outline",
      size = "md",
      tone = "light",
      autoGrow = false,
      rows = 4,
      className,
      value,
      onChange,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const setRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref]
    );

    const grow = useCallback(() => {
      const el = internalRef.current;
      if (!el || !autoGrow) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [autoGrow]);

    useEffect(() => {
      grow();
    }, [value, grow]);

    return (
      <textarea
        ref={setRef}
        rows={autoGrow ? 1 : rows}
        value={value}
        onChange={(e) => {
          grow();
          onChange?.(e);
        }}
        className={cn(
          textareaVariants({ variant, size, tone }),
          autoGrow && "overflow-hidden",
          className
        )}
        {...rest}
      />
    );
  }
);

Textarea.displayName = "Textarea";
