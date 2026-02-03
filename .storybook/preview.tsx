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
        {/* 테마 배경색만 입히고 여백을 주어 컴포넌트가 돋보이게 합니다. */}
        <div className="bg-backgroundSecondary text-contentPrimary font-sans p-10 rounded-lg">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;