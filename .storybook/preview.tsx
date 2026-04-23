import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
    nextjs: { appDirectory: true },
    backgrounds: {
      default: "paper",
      values: [
        { name: "white", value: "#FFFFFF" },
        { name: "paper", value: "#FAFAFB" },
        { name: "gray", value: "#E0E0E0" },
        { name: "ink", value: "#202020" },
        { name: "black", value: "#000000" },
        { name: "k1", value: "#003FE4" },
        { name: "deep", value: "linear-gradient(180deg,#003FE4 0%,#000000 100%)" },
        { name: "bright", value: "linear-gradient(180deg,#003FE4 0%,#01A4FF 100%)" },
      ],
    },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1280px", height: "900px" } },
        wide: { name: "Wide (1920)", styles: { width: "1920px", height: "1080px" } },
        linkedinPortrait: { name: "LinkedIn portrait", styles: { width: "1080px", height: "1350px" } },
        linkedinSquare: { name: "LinkedIn square", styles: { width: "1080px", height: "1080px" } },
      },
    },
  },
};

export default preview;
