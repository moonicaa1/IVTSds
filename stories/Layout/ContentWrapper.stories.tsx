import type { Meta, StoryObj } from "@storybook/react";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import React from "react";

/**
 * # ContentWrapper
 * 
 * The ContentWrapper is a functional layout component that provides the main scrollable area for page content. 
 * It automatically adjusts its left margin based on the state of the Sidebar.
 * 
 * ## Usage Guidelines
 * - **Do**: Wrap all main page content within this component to ensure correct alignment with fixed navigation elements.
 * - **Don't**: Apply manual margins to children that might conflict with the dynamic margin of the wrapper.
 */
const meta: Meta<typeof ContentWrapper> = {
    title: "Layout & Patterns/ContentWrapper",
    component: ContentWrapper,
    decorators: [
        (Story) => (
            <SidebarProvider>
                <Story />
            </SidebarProvider>
        ),
    ],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof ContentWrapper>;

/**
 * Displays the wrapper with sample content inside.
 */
export const Default: Story = {
    render: () => (
        <div className="flex h-screen w-full relative">
            <div className="fixed left-0 top-0 h-full w-[292px] bg-backgroundQuaternary border-r border-borderPrimary flex items-center justify-center text-xs text-contentTertiary">
                Sidebar Placeholder (292px)
            </div>
            <ContentWrapper>
                <div className="p-8">
                    <h2 className="text-xl font-bold mb-4">Main Page Content</h2>
                    <p className="text-contentSecondary">
                        This area will scroll if the content exceeds the screen height.
                        The left margin is currently 292px, matching the open sidebar placeholder.
                    </p>
                    <div className="h-[200vh] mt-4 border-2 border-dashed border-borderPrimary flex items-center justify-center text-contentTertiary">
                        Long Content Area
                    </div>
                </div>
            </ContentWrapper>
        </div>
    ),
};
