import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import React from "react";

/**
 * # Navbar
 * 100% Synced with components/layout/Navbar.tsx
 */
const meta: Meta<typeof Navbar> = {
    title: "Layout & Patterns/Navbar",
    component: Navbar,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <SidebarProvider>
                    <div className="relative w-full h-[300px] bg-backgroundSecondary">
                        <Story />
                    </div>
                </SidebarProvider>
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};

