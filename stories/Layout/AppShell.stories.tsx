import type { Meta, StoryObj } from "@storybook/react";
import AppShell from "@/components/layout/AppShell";
import React from "react";

/**
 * # AppShell
 * 100% Synced with components/layout/AppShell.tsx
 */
const meta: Meta<typeof AppShell> = {
    title: "Layout & Patterns/AppShell",
    component: AppShell,
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
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
    render: () => (
        <AppShell>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4 text-contentPrimary">Dashboard Content</h1>
                <p className="text-contentTertiary">
                    This is the standard application shell providing navigation and layout.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-backgroundPrimary rounded-xl border border-borderPrimary shadow-sm flex items-center justify-center text-contentQuaternary">
                            Card {i}
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    ),
};

