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
 * 100% Synced with components/ui/Button.tsx
 */
const meta: Meta<typeof Button> = {
    title: "Base Components/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "outline", "plain"],
        },
        size: {
            control: "select",
            options: ["xs", "sm", "base", "l", "xl"],
        },
        disabled: {
            control: "boolean",
        },
        iconOnly: {
            control: "boolean",
        },
        href: {
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Button",
        variant: "default",
        size: "base",
    },
};

export const Outline: Story = {
    args: {
        children: "Outline Button",
        variant: "outline",
        size: "base",
    },
};

export const Plain: Story = {
    args: {
        children: "Plain Button",
        variant: "plain",
        size: "base",
    },
};

export const WithLeftIcon: Story = {
    args: {
        children: "Add New",
        variant: "default",
        leftIcon: <PlusIcon className="w-4 h-4" />,
    },
};

export const WithRightIcon: Story = {
    args: {
        children: "Next Step",
        variant: "outline",
        rightIcon: <ArrowRightIcon className="w-4 h-4" />,
    },
};

export const IconOnly: Story = {
    args: {
        iconOnly: true,
        variant: "outline",
        children: null,
        leftIcon: <ArrowPathIcon className="w-5 h-5" />,
    },
};

export const AllSizes: Story = {
    render: (args) => (
        <div className="flex items-end gap-4 p-4 bg-backgroundPrimary rounded-lg border border-borderSecondary">
            <Button {...args} size="xs">Extra Small</Button>
            <Button {...args} size="sm">Small</Button>
            <Button {...args} size="base">Base</Button>
            <Button {...args} size="l">Large</Button>
            <Button {...args} size="xl">Extra Large</Button>
        </div>
    ),
};

