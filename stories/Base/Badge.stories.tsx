import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@/components/ui/Badge";
import React from "react";

/**
 * # Badge
 * 100% Synced with components/ui/Badge.tsx
 * // sync-check: 2026-02-03
 */
const meta: Meta<typeof Badge> = {
    title: "Base Components/Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        color: {
            control: "select",
            options: [
                "Zinc", "Red", "Orange", "Amber", "Yellow",
                "Lime", "Green", "Emerald", "Teal", "Cyan",
                "Sky", "Blue", "Indigo", "Violet", "Purple",
                "Fuchsia", "Pink", "Rose", "Black"
            ],
        },
        showXButton: {
            control: "boolean",
        },
        onRemove: {
            action: "removed",
        },
        children: {
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: "Badge Label",
        color: "Zinc",
        showXButton: false,
    },
};

export const Colors: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2 p-4 bg-backgroundPrimary rounded-lg border border-borderSecondary">
            <Badge color="Zinc">Zinc</Badge>
            <Badge color="Red">Red</Badge>
            <Badge color="Orange">Orange</Badge>
            <Badge color="Amber">Amber</Badge>
            <Badge color="Yellow">Yellow</Badge>
            <Badge color="Lime">Lime</Badge>
            <Badge color="Green">Green</Badge>
            <Badge color="Emerald">Emerald</Badge>
            <Badge color="Teal">Teal</Badge>
            <Badge color="Cyan">Cyan</Badge>
            <Badge color="Sky">Sky</Badge>
            <Badge color="Blue">Blue</Badge>
            <Badge color="Indigo">Indigo</Badge>
            <Badge color="Violet">Violet</Badge>
            <Badge color="Purple">Purple</Badge>
            <Badge color="Fuchsia">Fuchsia</Badge>
            <Badge color="Pink">Pink</Badge>
            <Badge color="Rose">Rose</Badge>
            <Badge color="Black">Black</Badge>
        </div>
    ),
};

export const Removable: Story = {
    args: {
        children: "Removable Tag",
        color: "Blue",
        showXButton: true,
    },
};

