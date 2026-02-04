import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import React from "react";

const meta: Meta<typeof Sidebar> = {
    title: "Layout & Patterns/Sidebar",
    component: Sidebar,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: "/",
                query: {},
            },
        },
    },
    decorators: [
        (Story) => (
            <ThemeProvider>
                <SidebarProvider>
                    <div className="relative flex w-full h-screen bg-backgroundSecondary">
                        <Story />
                        <div className="flex-1 p-8">
                            <h1 className="text-xl font-bold text-contentPrimary">Page Content</h1>
                        </div>
                    </div>
                </SidebarProvider>
            </ThemeProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};

