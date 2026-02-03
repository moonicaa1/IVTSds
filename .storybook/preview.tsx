import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import "../app/globals.css";
import { ThemeProvider } from "../lib/contexts/ThemeContext";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // layout: "fullscreen" 을 제거하고 기본값(centered 등)을 따르거나 각 스토리에서 결정하도록 합니다.
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-backgroundSecondary" style={{ minHeight: '100%', padding: '1rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;