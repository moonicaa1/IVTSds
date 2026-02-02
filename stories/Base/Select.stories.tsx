import type { Meta, StoryObj } from "@storybook/react";
import Select from "@/components/ui/Select";
import React from "react";

/**
 * # Select
 * 
 * A standard dropdown menu that allows a user to select one value from a list of options. 
 * It is a styled wrapper around the native HTML select element.
 * 
 * ## Usage Guidelines
 * - **Do**: Use for choices where only one option can be selected.
 * - **Do**: Use for 5-15 options. For fewer, consider Radio buttons; for more, consider a searchable dropdown.
 * - **Don't**: Use for boolean On/Off states (use Switch).
 */
const meta: Meta<typeof Select> = {
    title: "Base Components/Select",
    component: Select,
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
            description: "Label text displayed above the select field.",
        },
        error: {
            control: "text",
            description: "Error message displayed below the field.",
        },
        required: {
            control: "boolean",
            description: "Shows a required marker (*).",
        },
        disabled: {
            control: "boolean",
            description: "Disables interaction.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

const SAMPLE_OPTIONS = [
    { value: "us", label: "United States" },
    { value: "kr", label: "South Korea" },
    { value: "jp", label: "Japan" },
    { value: "de", label: "Germany" },
];

/**
 * Standard single-select dropdown.
 */
export const Default: Story = {
    args: {
        label: "Country",
        options: SAMPLE_OPTIONS,
    },
};

/**
 * Select field indicating a validation error.
 */
export const ErrorState: Story = {
    args: {
        label: "Language",
        options: [{ value: "", label: "Select language..." }, ...SAMPLE_OPTIONS],
        error: "Please select your preferred language.",
    },
};

/**
 * Required select field.
 */
export const Required: Story = {
    args: {
        label: "Role",
        options: [
            { value: "admin", label: "Administrator" },
            { value: "editor", label: "Editor" },
            { value: "viewer", label: "Viewer" },
        ],
        required: true,
    },
};

/**
 * Non-interactive state.
 */
export const Disabled: Story = {
    args: {
        label: "Organization",
        options: [{ value: "ivts", label: "IVTS Enterprise" }],
        value: "ivts",
        disabled: true,
    },
};
