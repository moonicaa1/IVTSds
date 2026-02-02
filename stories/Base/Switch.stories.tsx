import type { Meta, StoryObj } from "@storybook/react";
import Switch from "@/components/ui/Switch";
import React, { useState } from "react";

/**
 * # Switch
 * 
 * Switches toggle the state of a single setting on or off. 
 * They are best used when the effect of the change is immediate.
 * 
 * ## Usage Guidelines
 * - **Do**: Use for binary settings like "Enable Notifications".
 * - **Do**: Provide clear labels explaining what is being toggled.
 * - **Don't**: Use if the user needs to press a "Submit" button for the change to take effect (use Checkbox).
 */
const meta: Meta<typeof Switch> = {
    title: "Base Components/Switch",
    component: Switch,
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
            description: "Label text next to the switch.",
        },
        checked: {
            control: "boolean",
            description: "The On/Off state.",
        },
        disabled: {
            control: "boolean",
            description: "Disables interaction.",
        },
        className: {
            control: "text",
            description: "Additional CSS classes.",
        },
        onChange: { action: "toggled" },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Standard unchecked switch.
 */
export const Default: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);
        return <Switch {...args} checked={checked} onChange={setChecked} />;
    },
    args: {
        label: "Enable Analytics",
    },
};

/**
 * Initialized in the On state.
 */
export const Checked: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(true);
        return <Switch {...args} checked={checked} onChange={setChecked} />;
    },
    args: {
        label: "Dark Mode",
    },
};

/**
 * Non-interactive switch.
 */
export const Disabled: Story = {
    args: {
        label: "System Status (Read-only)",
        checked: true,
        disabled: true,
    },
    // Ensure we don't use the stateful render for a static disabled example
};
