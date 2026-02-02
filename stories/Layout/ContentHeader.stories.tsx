import type { Meta, StoryObj } from "@storybook/react";
import ContentHeader from "@/components/layout/ContentHeader";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import React from "react";

/**
 * # ContentHeader
 * 
 * The ContentHeader component sits at the top of the main content area. 
 * It provides breadcrumb navigation, page title, and primary action buttons (like creating new items).
 * 
 * ## Usage Guidelines
 * - **Do**: Use as the top-most component within a page content view.
 * - **Do**: Ensure the breadcrumbs accurately reflect the navigation hierarchy.
 * - **Don't**: Overload the action area with more than 2-3 primary buttons.
 */
const meta: Meta<typeof ContentHeader> = {
    title: "Layout & Patterns/ContentHeader",
    component: ContentHeader,
    decorators: [
        (Story) => (
            <SidebarProvider>
                <div className="p-8 bg-backgroundSecondary min-h-[200px]">
                    <Story />
                </div>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ContentHeader>;

/**
 * Standard header for the Dealers page.
 */
export const Default: Story = {
    args: {
        onAddDealer: (data) => console.log("Adding dealer:", data),
    },
};
