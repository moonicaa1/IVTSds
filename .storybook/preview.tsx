import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import "../app/globals.css";
import { ThemeProvider } from "../lib/contexts/ThemeContext";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: "centered", // Default to centered for UI components
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-backgroundSecondary text-contentPrimary font-sans min-h-screen w-full">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;