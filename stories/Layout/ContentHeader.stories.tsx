import type { Meta, StoryObj } from "@storybook/react";
import ContentHeader from "@/components/layout/ContentHeader";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import React from "react";

/**
 * # ContentHeader
 * 100% Synced with components/layout/ContentHeader.tsx
 */
const meta: Meta<typeof ContentHeader> = {
    title: "Layout & Patterns/ContentHeader",
    component: ContentHeader,
    decorators: [
        (Story) => (
            <SidebarProvider>
                <div className="p-8 bg-backgroundSecondary min-h-[400px]">
                    <Story />
                </div>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ContentHeader>;

export const Default: Story = {
    args: {
        onAddDealer: (data) => console.log("Adding dealer:", data),
    },
};

