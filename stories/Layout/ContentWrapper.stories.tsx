import type { Meta, StoryObj } from "@storybook/react";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import React from "react";

const meta: Meta<typeof ContentWrapper> = {
    title: "Layout & Patterns/ContentWrapper",
    component: ContentWrapper,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "메인 콘텐츠 영역을 감싸는 래퍼 컴포넌트입니다. 100% Synced with code.",
            },
        },
    },
    decorators: [
        (Story) => (
            <SidebarProvider>
                <div className="flex h-screen w-full relative">
                    <div className="fixed left-0 top-0 h-full w-[292px] bg-backgroundQuaternary border-r border-borderPrimary flex items-center justify-center text-xs text-contentTertiary">
                        Sidebar (292px)
                    </div>
                    <Story />
                </div>
            </SidebarProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ContentWrapper>;

export const Default: Story = {
    render: () => (
        <ContentWrapper>
            <div className="p-8">
                <h2 className="text-xl font-bold mb-4 text-contentPrimary">Main Page Content</h2>
                <div className="h-[1000px] border-2 border-dashed border-borderPrimary rounded-xl flex items-center justify-center text-contentTertiary">
                    Scrollable Content Area
                </div>
            </div>
        </ContentWrapper>
    ),
};

