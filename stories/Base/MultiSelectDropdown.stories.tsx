import type { Meta, StoryObj } from "@storybook/react";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import React, { useState } from "react";

/**
 * # MultiSelectDropdown
 * 
 * A specialized dropdown for selecting multiple filter criteria. 
 * Selected items are displayed as removable badges, and the dropdown supports searching/filtering within its options.
 * 
 * ## Usage Guidelines
 * - **Do**: Use for complex filtering where users need to select multiple categories.
 * - **Do**: Provide a clear label indicating what the filter represents (e.g., "Status").
 * - **Do**: Use semantic colors for badges if they correspond to known states.
 * - **Don't**: Use for simple binary choices (use Switch or Checkbox instead).
 */
const meta: Meta<typeof MultiSelectDropdown> = {
    title: "Base Components/MultiSelectDropdown",
    component: MultiSelectDropdown,
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
            description: "The title of the filter group.",
        },
        placeholder: {
            control: "text",
            description: "Default text when no items are selected.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof MultiSelectDropdown>;

const STATUS_OPTIONS = ["Active", "Inactive", "Pending", "Archived"];

/**
 * Standard multi-select dropdown with sample status options.
 */
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

/**
 * Demonstrates a dropdown with many options.
 */
export const ManyOptions: Story = {
    render: (args) => {
        const [selected, setSelected] = useState<Set<string>>(new Set());
        const options = Array.from({ length: 15 }, (_, i) => `Option ${i + 1}`);
        return (
            <div className="h-96">
                <MultiSelectDropdown
                    {...args}
                    label="Categories"
                    options={options}
                    selectedValues={selected}
                    onChange={setSelected}
                />
            </div>
        );
    },
};

/**
 * Dropdown with an empty initial state.
 */
export const Empty: Story = {
    render: (args) => {
        const [selected, setSelected] = useState<Set<string>>(new Set());
        return (
            <div className="h-64">
                <MultiSelectDropdown
                    {...args}
                    label="Region"
                    options={["North America", "Europe", "Asia", "Africa"]}
                    selectedValues={selected}
                    onChange={setSelected}
                    placeholder="All Regions"
                />
            </div>
        );
    },
};
