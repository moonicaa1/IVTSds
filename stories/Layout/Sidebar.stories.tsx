import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import React from "react";

/**
 * # Sidebar
 * 
 * The Sidebar is the primary navigation hub of the application. 
 * It supports a three-level hierarchical menu system, collapsible states, 
 * and a "Favorites" section for quick access to frequently used pages.
 * 
 * ## Usage Guidelines
 * - **Do**: Keep navigation items organized by function or module.
 * - **Do**: Use clear icons that represent the category or tool.
 * - **Don't**: Exceed three levels of hierarchy to maintain navigational clarity.
 */
const meta: Meta<typeof Sidebar> = {
    title: "Layout & Patterns/Sidebar",
    component: Sidebar,
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
type Story = StoryObj<typeof Sidebar>;

/**
 * Full-height sidebar with navigation items and favorites.
 */
export const Default: Story = {};
