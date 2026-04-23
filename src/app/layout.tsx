import type { Metadata } from "next";
import { googleSansFlex } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klyra UI — Design system (rebrand 2026)",
  description:
    "Library de components Next.js pour le design system KLYRA. Bleus K1/K2/K3, Google Sans Flex, pill CTAs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={googleSansFlex.variable}>
      <body>{children}</body>
    </html>
  );
}
