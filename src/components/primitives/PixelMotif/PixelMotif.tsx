"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

export interface PaletteEntry {
  color: string;
  probability: number;
}

/** Palette par défaut — reprise exacte de `background-pixels.html`. */
export const DEFAULT_PALETTE: PaletteEntry[] = [
  { color: "rgba(1,164,255,0.85)", probability: 0.22 },
  { color: "rgba(0,221,255,0.85)", probability: 0.12 },
  { color: "rgba(255,255,255,0.40)", probability: 0.08 },
  { color: "rgba(0,63,228,0.90)", probability: 0.15 },
];

/**
 * PRNG déterministe mulberry32 — reproductibilité via `seed`.
 * Source : https://github.com/nicowillis/mulberry32
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface PixelMotifProps extends HTMLAttributes<HTMLCanvasElement> {
  /** Largeur du canvas en pixels. Défaut : 1400. */
  width?: number;
  /** Hauteur du canvas en pixels. Défaut : 440. */
  height?: number;
  /**
   * Taille d'une cellule (px logiques).
   * Brand book : 20 px (4×4 visuels à 5 px de cell = ~4px apparent avec padding).
   * Défaut : 20.
   */
  cellSize?: number;
  /**
   * Palette de couleurs avec probabilités d'apparition.
   * La somme des probabilités détermine la densité globale.
   * Les cellules dont r > somme(p) restent transparentes.
   */
  palette?: PaletteEntry[];
  /**
   * Graine pour le PRNG (reproductibilité).
   * Si absent, `Math.random()` est utilisé.
   */
  seed?: number;
  /**
   * Espace entre les pixels (px logiques).
   * Défaut : 2 — crée l'espacement "carrés 4 px" du brand book.
   */
  padding?: number;
}

/**
 * PixelMotif — mosaïque pixel signature KLYRA.
 *
 * Reprend exactement le rendu de `background-pixels.html` :
 * carrés 4 px (cellSize 20 + padding 2), palette K1/K2/K3/white.
 * Canvas 2D, rendu côté client.
 */
export function PixelMotif({
  width = 1400,
  height = 440,
  cellSize = 20,
  palette = DEFAULT_PALETTE,
  seed,
  padding = 2,
  className,
  style,
  ...rest
}: PixelMotifProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const rand = seed !== undefined ? mulberry32(seed) : Math.random.bind(Math);
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const r = rand();
        let acc = 0;
        let drawn = false;
        for (const entry of palette) {
          acc += entry.probability;
          if (r < acc) {
            ctx.fillStyle = entry.color;
            ctx.fillRect(
              x * cellSize + padding,
              y * cellSize + padding,
              cellSize - padding * 2,
              cellSize - padding * 2,
            );
            drawn = true;
            break;
          }
        }
        void drawn; // explicitly unused — cells outside probability range stay transparent
      }
    }
  }, [width, height, cellSize, palette, seed, padding]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      aria-hidden="true"
      className={cn(className)}
      style={{ display: "block", ...style }}
      {...rest}
    />
  );
}
