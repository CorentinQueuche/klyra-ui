import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Klyra class-name merger. Combines clsx (conditional classes) with
 * tailwind-merge (dedupe conflicting Tailwind utilities).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
