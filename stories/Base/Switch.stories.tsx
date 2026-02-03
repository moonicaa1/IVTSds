import type { Meta, StoryObj } from "@storybook/react";
import Switch from "@/components/ui/Switch";
import React, { useState } from "react";

/**
 * # Switch
 * 100% Synced with components/ui/Switch.tsx
 */
const meta: Meta<typeof Switch> = {
    title: "Base Components/Switch",
    component: Switch,
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
        },
        checked: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);
        return <div className="p-8 bg-backgroundPrimary rounded-lg border border-borderSecondary">
            <Switch {...args} checked={checked} onChange={setChecked} />
        </div>;
    },
    args: {
        label: "Enable Analytics",
    },
};

