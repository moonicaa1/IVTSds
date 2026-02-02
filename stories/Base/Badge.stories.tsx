import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@/components/ui/Badge";
import React from "react";

/**
 * # Badge
 * 
 * Badges are used to highlight an item's status for quick recognition. 
 * They are small, visual indicators that provide concise information like "Active", "Pending", or categories.
 * 
 * ## Usage Guidelines
 * - **Do**: Use labels that are short and easy to understand at a glance.
 * - **Do**: Assign semantic colors if the badge represents a status (e.g., Red for "High Risk").
 * - **Don't**: Use badges for interactive elements that should be buttons.
 * - **Don't**: Overcrowd the UI with too many badges in close proximity.
 */
const meta: Meta<typeof Badge> = {
    title: "Base Components/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
        color: {
            control: "select",
            options: [
                "Zinc", "Red", "Orange", "Amber", "Yellow",
                "Lime", "Green", "Emerald", "Teal", "Cyan",
                "Sky", "Blue", "Indigo", "Violet", "Purple",
                "Fuchsia", "Pink", "Rose", "Black"
            ],
            description: "The color theme of the badge.",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "Zinc" },
            },
        },
        showXButton: {
            control: "boolean",
            description: "Whether to show a removal button (X).",
        },
        onRemove: {
            action: "removed",
            description: "Callback fired when the removal button is clicked.",
        },
        children: {
            control: "text",
            description: "The content of the badge.",
        },
        className: {
            control: "text",
            description: "Additional CSS classes for custom styling.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Standard badge with default Zinc color.
 */
export const Default: Story = {
    args: {
        children: "Status Label",
        color: "Zinc",
    },
};

/**
 * Badge indicating an active or success state.
 */
export const Success: Story = {
    args: {
        children: "Active",
        color: "Green",
    },
};

/**
 * Badge indicating a critical error or high priority.
 */
export const Error: Story = {
    args: {
        children: "Critical",
        color: "Red",
    },
};

/**
 * Badge used for filters that can be removed.
 */
export const Removable: Story = {
    args: {
        children: "Filter Tag",
        color: "Blue",
        showXButton: true,
    },
};

/**
 * Showcase of different color variants.
 */
export const Colors: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Badge color="Zinc">Zinc</Badge>
            <Badge color="Blue">Blue</Badge>
            <Badge color="Green">Green</Badge>
            <Badge color="Red">Red</Badge>
            <Badge color="Orange">Orange</Badge>
            <Badge color="Purple">Purple</Badge>
            <Badge color="Black">Black</Badge>
        </div>
    ),
};
