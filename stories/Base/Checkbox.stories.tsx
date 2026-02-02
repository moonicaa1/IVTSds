import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "@/components/ui/Checkbox";
import React, { useState } from "react";

/**
 * # Checkbox
 * 
 * Checkboxes are used to select one or more items from a list, or to toggle a setting.
 * They support a third "indeterminate" state, which is useful for nested selection logic.
 * 
 * ## Usage Guidelines
 * - **Do**: Use labels that clearly describe the option or setting.
 * - **Do**: Use the "indeterminate" state when a subset of sub-items is selected.
 * - **Don't**: Use checkboxes if only one choice is allowed (use Radio buttons instead).
 * - **Don't**: Forget to handle the `onCheckedChange` callback for interactivity.
 */
const meta: Meta<typeof Checkbox> = {
    title: "Base Components/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    argTypes: {
        checked: {
            control: "select",
            options: [true, false, "indeterminate"],
            description: "The checked state of the checkbox.",
        },
        disabled: {
            control: "boolean",
            description: "Whether the checkbox is interactive.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Standard unchecked state.
 */
export const Default: Story = {
    args: {
        checked: false,
    },
};

/**
 * Standard checked state.
 */
export const Checked: Story = {
    args: {
        checked: true,
    },
};

/**
 * Indeterminate state, often used in header rows for partially selected tables.
 */
export const Indeterminate: Story = {
    args: {
        checked: "indeterminate",
    },
};

/**
 * Interactive version of the checkbox.
 */
export const Interactive: Story = {
    render: () => {
        const [checked, setChecked] = useState<boolean | "indeterminate">(false);
        return (
            <div className="flex items-center gap-2">
                <Checkbox checked={checked} onCheckedChange={(val) => setChecked(val)} />
                <span className="text-sm text-contentPrimary">
                    {checked === "indeterminate" ? "Partially Selected" : checked ? "Selected" : "Not Selected"}
                </span>
            </div>
        );
    },
};

/**
 * Demonstrates the disabled state.
 */
export const Disabled: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Checkbox disabled checked={false} />
                <span className="text-sm text-contentTertiary">Disabled Unchecked</span>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox disabled checked={true} />
                <span className="text-sm text-contentTertiary">Disabled Checked</span>
            </div>
        </div>
    ),
};
