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
    // 컴포넌트가 기본적으로 중앙에 정렬되게 하여 가독성을 높입니다.
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        {/* 컴포넌트가 돋보이도록 최소 너비와 고급스러운 배경 및 여백을 설정합니다. */}
        <div
          className="bg-backgroundSecondary text-contentPrimary font-sans"
          style={{
            minWidth: '500px',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem',
            borderRadius: '12px'
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;