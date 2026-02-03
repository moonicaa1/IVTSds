import type { Meta, StoryObj } from "@storybook/react";
import Radio from "@/components/ui/Radio";
import React, { useState } from "react";

/**
 * # Radio
 * 100% Synced with components/ui/Radio.tsx
 * 
 * Radio button component for selecting single options from a group.
 */
const meta: Meta<typeof Radio> = {
    title: "Base Components/Radio",
    component: Radio,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        name: {
            control: "text",
            description: "Name attribute for radio group",
        },
        value: {
            control: "text",
            description: "Value of the radio option",
        },
        label: {
            control: "text",
            description: "Label text for the radio",
        },
        checked: {
            control: "boolean",
            description: "Whether the radio is checked",
        },
        disabled: {
            control: "boolean",
            description: "Whether the radio is disabled",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
    args: {
        name: "default",
        value: "option1",
        label: "Default Radio",
        checked: false,
        disabled: false,
    },
};

export const Checked: Story = {
    args: {
        name: "checked",
        value: "option1",
        label: "Checked Radio",
        checked: true,
        disabled: false,
    },
};

export const Disabled: Story = {
    args: {
        name: "disabled",
        value: "option1",
        label: "Disabled Radio",
        checked: false,
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        name: "disabled-checked",
        value: "option1",
        label: "Disabled Checked Radio",
        checked: true,
        disabled: true,
    },
};

export const WithoutLabel: Story = {
    args: {
        name: "no-label",
        value: "option1",
        checked: false,
        disabled: false,
    },
};

export const RadioGroup: Story = {
    render: () => {
        const [selected, setSelected] = useState("option2");

        return (
            <div className="space-y-3">
                <Radio
                    name="group"
                    value="option1"
                    label="Option 1"
                    checked={selected === "option1"}
                    onChange={setSelected}
                />
                <Radio
                    name="group"
                    value="option2"
                    label="Option 2"
                    checked={selected === "option2"}
                    onChange={setSelected}
                />
                <Radio
                    name="group"
                    value="option3"
                    label="Option 3"
                    checked={selected === "option3"}
                    onChange={setSelected}
                />
                <Radio
                    name="group"
                    value="option4"
                    label="Option 4 (Disabled)"
                    checked={selected === "option4"}
                    onChange={setSelected}
                    disabled
                />
            </div>
        );
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-semibold mb-2 text-contentPrimary">Unchecked</h3>
                <Radio name="states1" value="1" label="Normal" />
            </div>
            <div>
                <h3 className="text-sm font-semibold mb-2 text-contentPrimary">Checked</h3>
                <Radio name="states2" value="2" label="Checked" checked />
            </div>
            <div>
                <h3 className="text-sm font-semibold mb-2 text-contentPrimary">Disabled</h3>
                <Radio name="states3" value="3" label="Disabled Unchecked" disabled />
            </div>
            <div>
                <h3 className="text-sm font-semibold mb-2 text-contentPrimary">Disabled Checked</h3>
                <Radio name="states4" value="4" label="Disabled Checked" checked disabled />
            </div>
        </div>
    ),
};
