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
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-backgroundSecondary text-contentPrimary font-sans min-h-screen w-full flex items-center justify-center p-12">
          <div className="w-full max-w-[1200px] flex justify-center">
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;