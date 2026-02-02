import type { Meta, StoryObj } from "@storybook/react";
import AppShell from "@/components/layout/AppShell";
import React from "react";

/**
 * # AppShell
 * 
 * The AppShell is the primary layout engine for the application. 
 * It coordinates the positioning of the Navbar, Sidebar, and the main content area, 
 * ensuring a consistent user experience and responsive behavior.
 * 
 * ## Usage Guidelines
 * - **Do**: Use AppShell as the root layout for all pages in the admin dashboard.
 * - **Do**: Ensure all children are wrapped within the AppShell to benefit from global theme and navigation context.
 * - **Don't**: Use multiple AppShells within a single page.
 */
const meta: Meta<typeof AppShell> = {
    title: "Layout & Patterns/AppShell",
    component: AppShell,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

/**
 * The full application layout with mock content.
 */
export const Default: Story = {
    render: () => (
        <AppShell>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
                <p className="text-contentTertiary">
                    This is where the main application content resides. The AppShell manages the top navigation
                    and the side menu, adjusting the content width automatically.
                </p>
            </div>
        </AppShell>
    ),
};
