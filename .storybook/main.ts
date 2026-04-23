import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
      "next/link": path.resolve(__dirname, "../src/storybook/mocks/next-link.tsx"),
      "next/image": path.resolve(__dirname, "../src/storybook/mocks/next-image.tsx"),
    };
    config.css = config.css || {};
    config.css.postcss = path.resolve(__dirname, "..");
    return config;
  },
};

export default config;
