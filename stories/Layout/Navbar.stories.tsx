import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import React from "react";

/**
 * # Navbar
 * 
 * The Navbar is a fixed header that provides global utility actions, search functionality, 
 * and user-specific information. It adapts to the application's theme and provides 
 * multilingual search suggestions.
 * 
 * ## Usage Guidelines
 * - **Do**: Use as the global navigation header for all dashboard pages.
 * - **Do**: Ensure it remains fixed at the top of the viewport.
 * - **Don't**: Modify the navbar height (80px) as it is synchronized with the AppShell layout.
 */
const meta: Meta<typeof Navbar> = {
    title: "Layout & Patterns/Navbar",
    component: Navbar,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <SidebarProvider>
                    <div className="relative w-full h-screen bg-backgroundSecondary">
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

/**
 * Default Navbar showing global search, language selector, and user profile.
 */
export const Default: Story = {};
