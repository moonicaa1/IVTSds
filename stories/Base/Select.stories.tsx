import type { Meta, StoryObj } from "@storybook/react";
import Select from "@/components/ui/Select";
import React from "react";

/**
 * # Select
 * 100% Synced with components/ui/Select.tsx
 */
const meta: Meta<typeof Select> = {
    title: "Base Components/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: {
            control: "text",
        },
        error: {
            control: "text",
        },
        required: {
            control: "boolean",
        },
        disabled: {
            control: "boolean",
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

export const Default: Story = {
    args: {
        label: "Country",
        options: SAMPLE_OPTIONS,
    },
};

export const ErrorState: Story = {
    args: {
        label: "Language",
        options: [{ value: "", label: "Select language..." }, ...SAMPLE_OPTIONS],
        error: "Please select your preferred language.",
    },
};

