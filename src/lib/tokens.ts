/**
 * KLYRA design tokens — single source of truth for non-CSS usages
 * (stories, Storybook tables, TS-driven layouts). Mirror of globals.css.
 */

export const klyraColors = {
  k1: "#003FE4",
  k2: "#01A4FF",
  k3: "#00DDFF",
  blueDeep: "#002DA4",
  bluePale: "#4A7CFF",
  blueMist: "#96BCFF",
  blueBg:   "#E5EEFF",
  blueHalo: "#DBE5FF",
  black:   "#000000",
  ink:     "#202020",
  ink2:    "#303030",
  grayK1:  "#E0E0E0",
  grayK2:  "#DEDEE9",
  gray3:   "#D9D9D9",
  white:   "#FFFFFF",
  paper:   "#FAFAFB",
} as const;

export const klyraGradients = {
  deep:   "linear-gradient(180deg, #003FE4 0%, #000000 100%)",
  bright: "linear-gradient(180deg, #003FE4 0%, #01A4FF 100%)",
  ink:    "linear-gradient(180deg, #000000 0%, #202020 100%)",
  paper:  "linear-gradient(180deg, #E0E0E0 0%, #FFFFFF 100%)",
  cta:    "linear-gradient(180deg, #003FE4 0%, rgba(0, 63, 228, 0.25) 100%)",
  haloK1: "radial-gradient(50% 50% at 50% 50%, rgba(0, 63, 228, 0.75) 0%, rgba(0, 63, 228, 0) 70%)",
  haloK2: "radial-gradient(50% 50% at 50% 50%, rgba(1, 164, 255, 0.75) 0%, rgba(1, 164, 255, 0) 70%)",
} as const;

export const klyraRadii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const klyraShadows = {
  sm:  "0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04)",
  md:  "0 6px 18px rgba(0,45,164,0.10), 0 2px 6px rgba(0,45,164,0.05)",
  lg:  "0 22px 60px rgba(0,45,164,0.28), 0 8px 20px rgba(0,45,164,0.08)",
  cta: "inset 8px -5px 41px rgba(1,164,255,0.25), inset -12px 8px 33px rgba(1,164,255,0.10), 0 10px 30px rgba(0,63,228,0.35)",
  ctaHover: "inset 8px -5px 41px rgba(1,164,255,0.40), inset -12px 8px 33px rgba(1,164,255,0.18), 0 14px 38px rgba(0,63,228,0.48)",
  glass: "inset 2px -4px 22px rgba(0,63,228,0.25)",
} as const;

export const klyraTypography = {
  displayXL: { size: 160, weight: 500, lineHeight: 0.9, letterSpacing: "-0.0325em" },
  displayL:  { size: 105, weight: 400, lineHeight: 0.925, letterSpacing: "-0.05em" },
  displayM:  { size: 70,  weight: 400, lineHeight: 0.925, letterSpacing: "-0.05em" },
  displayS:  { size: 60,  weight: 500, lineHeight: 0.9,   letterSpacing: "-0.0325em" },
  h1: { size: 48, weight: 500, lineHeight: 0.9,  letterSpacing: "-0.0325em" },
  h2: { size: 40, weight: 500, lineHeight: 0.9,  letterSpacing: "-0.0325em" },
  h3: { size: 28, weight: 500, lineHeight: 1.2,  letterSpacing: "-0.0325em" },
  h4: { size: 24, weight: 500, lineHeight: 1.2,  letterSpacing: "-0.0325em" },
  bodyL:  { size: 22, weight: 400, lineHeight: 1.4, letterSpacing: "-0.0125em" },
  body:   { size: 18, weight: 400, lineHeight: 1.4, letterSpacing: "-0.0125em" },
  bodyS:  { size: 16, weight: 400, lineHeight: 1.4, letterSpacing: "-0.0125em" },
  caption:{ size: 14, weight: 500, lineHeight: 1.2, letterSpacing: "0em" },
  micro:  { size: 12, weight: 500, lineHeight: 1.2, letterSpacing: "0em" },
} as const;

export type KlyraColorKey = keyof typeof klyraColors;
export type KlyraGradientKey = keyof typeof klyraGradients;
export type KlyraRadiusKey = keyof typeof klyraRadii;
export type KlyraShadowKey = keyof typeof klyraShadows;
export type KlyraTypographyKey = keyof typeof klyraTypography;
