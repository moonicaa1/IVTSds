import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "@/components/ui/Checkbox";
import React, { useState } from "react";

/**
 * # Checkbox
 * 100% Synced with components/ui/Checkbox.tsx
 */
const meta: Meta<typeof Checkbox> = {
    title: "Base Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        checked: {
            control: "select",
            options: [true, false, "indeterminate"],
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        checked: false,
    },
};

export const Checked: Story = {
    args: {
        checked: true,
    },
};

export const Indeterminate: Story = {
    args: {
        checked: "indeterminate",
    },
};

export const Interactive: Story = {
    render: () => {
        const [checked, setChecked] = useState<boolean | "indeterminate">(false);
        return (
            <div className="flex items-center gap-2 p-4 bg-backgroundPrimary rounded-lg border border-borderSecondary">
                <Checkbox checked={checked} onCheckedChange={(val) => setChecked(val)} />
                <span className="text-sm text-contentPrimary">
                    {checked === "indeterminate" ? "Partially Selected" : checked ? "Selected" : "Not Selected"}
                </span>
            </div>
        );
    },
};

