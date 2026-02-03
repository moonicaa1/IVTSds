import type { Meta, StoryObj } from "@storybook/react";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import React, { useState } from "react";

/**
 * # MultiSelectDropdown
 * 100% Synced with components/ui/MultiSelectDropdown.tsx
 */
const meta: Meta<typeof MultiSelectDropdown> = {
    title: "Base Components/MultiSelectDropdown",
    component: MultiSelectDropdown,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: {
            control: "text",
        },
        placeholder: {
            control: "text",
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof MultiSelectDropdown>;

const STATUS_OPTIONS = ["Active", "Inactive", "Pending", "Archived"];

export const Default: Story = {
    render: (args) => {
        const [selected, setSelected] = useState<Set<string>>(new Set(["Active"]));
        return (
            <div className="h-64">
                <MultiSelectDropdown
                    {...args}
                    label="Status"
                    options={STATUS_OPTIONS}
                    selectedValues={selected}
                    onChange={setSelected}
                    getBadgeColor={(val) => {
                        if (val === "Active") return "Green";
                        if (val === "Inactive") return "Zinc";
                        if (val === "Pending") return "Amber";
                        return "Red";
                    }}
                />
            </div>
        );
    },
};

