import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/ui/Button";
import React from "react";
import { within, userEvent, expect } from "@storybook/test";
import { getIconArgTypes, iconMap } from "../utils/IconRegistry";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

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
        ...getIconArgTypes('leftIcon', 'Icon to display on the left side of the button'),
        ...getIconArgTypes('rightIcon', 'Icon to display on the right side of the button'),
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
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');
        await userEvent.click(button);
        await expect(args.onClick).toHaveBeenCalled();
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
        leftIcon: iconMap.Plus,
    },
};

export const WithRightIcon: Story = {
    args: {
        children: "Next Step",
        variant: "outline",
        rightIcon: iconMap.ArrowRight,
    },
};

export const IconOnly: Story = {
    args: {
        iconOnly: true,
        variant: "outline",
        children: null,
        leftIcon: iconMap.ArrowPath,
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

/**
 * 컴포넌트 조합 예시 (Recipe)
 */
export const SearchRecipe: Story = {
    name: "Recipe: Search Bar",
    render: () => (
        <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-borderPrimary bg-backgroundPrimary p-2 shadow-sm">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-contentTertiary"
                />
            </div>
            <Button size="sm">Search</Button>
        </div>
    ),
};

