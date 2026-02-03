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
      toc: true, // 목차 추가
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div
          className="bg-backgroundSecondary text-contentPrimary font-sans"
          style={{
            minHeight: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
          }}
        >
          <div style={{ width: '100%', maxWidth: '1200px' }}>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;