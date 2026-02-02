import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/ui/Button";
import React from "react";
import {
    PlusIcon,
    ArrowRightIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";

/**
 * # Button
 * 
 * Buttons allow users to take actions, and make choices, with a single tap. 
 * They are primarily used for interactive elements like forms, dialogs, and toolbars.
 * 
 * ## Usage Guidelines
 * - **Do**: Use buttons for primary actions that change state or submit data.
 * - **Do**: Use clear, concise labels that describe the action (e.g., "Save", "Delete").
 * - **Don't**: Use buttons for navigation if a simple link is more appropriate.
 * - **Don't**: Overuse primary buttons; typically one primary action per view is recommended.
 */
const meta: Meta<typeof Button> = {
    title: "Base Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "outline", "plain"],
            description: "The visual style of the button.",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "default" },
            },
        },
        size: {
            control: "select",
            options: ["xs", "sm", "base", "l", "xl"],
            description: "The size of the button.",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "base" },
            },
        },
        disabled: {
            control: "boolean",
            description: "Whether the button is interactive.",
        },
        iconOnly: {
            control: "boolean",
            description: "If true, renders as a square button optimized for icons.",
        },
        href: {
            control: "text",
            description: "If provided, renders the button as an <a> tag.",
        },
        className: {
            control: "text",
            description: "Additional CSS classes for custom styling.",
        },
        onClick: { action: "clicked" },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * The standard button for most actions.
 */
export const Default: Story = {
    args: {
        children: "Default Button",
        variant: "default",
        size: "base",
    },
};

/**
 * Used for secondary actions to reduce visual weight.
 */
export const Outline: Story = {
    args: {
        children: "Outline Button",
        variant: "outline",
        size: "base",
    },
};

/**
 * Used for tertiary actions or when embedded in text.
 */
export const Plain: Story = {
    args: {
        children: "Plain Button",
        variant: "plain",
        size: "base",
    },
};

/**
 * Button with a leading icon.
 */
export const WithLeftIcon: Story = {
    args: {
        children: "Add New",
        variant: "default",
        leftIcon: <PlusIcon className="w-4 h-4" />,
    },
};

/**
 * Button with a trailing icon.
 */
export const WithRightIcon: Story = {
    args: {
        children: "Next Step",
        variant: "outline",
        rightIcon: <ArrowRightIcon className="w-4 h-4" />,
    },
};

/**
 * Optimized for displaying only an icon.
 */
export const IconOnly: Story = {
    args: {
        iconOnly: true,
        variant: "outline",
        children: null,
        leftIcon: <ArrowPathIcon className="w-5 h-5" />,
    },
};

/**
 * Demonstration of all available sizes.
 */
export const Sizes: Story = {
    render: (args) => (
        <div className="flex items-end gap-4">
            <Button {...args} size="xs">Extra Small</Button>
            <Button {...args} size="sm">Small</Button>
            <Button {...args} size="base">Base</Button>
            <Button {...args} size="l">Large</Button>
            <Button {...args} size="xl">Extra Large</Button>
        </div>
    ),
};
