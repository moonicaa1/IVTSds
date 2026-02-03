import type { Meta, StoryObj } from "@storybook/react";
import Select from "@/components/ui/Select";
import React, { useState } from "react";

/**
 * # Select
 * 100% Synced with components/ui/Select.tsx
 * 
 * Custom dropdown select component matching Figma design.
 * Features label, description, and fully interactive dropdown menu.
 */
const meta: Meta<typeof Select> = {
    title: "Base Components/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        options: {
            control: "object",
            description: "Available options",
        },
        value: {
            control: "text",
            description: "Selected value",
        },
        label: {
            control: "text",
            description: "Label text",
        },
        description: {
            control: "text",
            description: "Description text",
        },
        placeholder: {
            control: "text",
            description: "Placeholder text",
        },
        disabled: {
            control: "boolean",
            description: "Disabled state",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

const sampleOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
];

export const Default: Story = {
    args: {
        options: sampleOptions,
        placeholder: "Select a country",
    },
};

export const WithLabel: Story = {
    args: {
        label: "Country",
        options: sampleOptions,
        placeholder: "Select",
    },
};

export const WithDescription: Story = {
    args: {
        label: "Project Visibility",
        description: "This will be visible to clients on the project.",
        options: [
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
            { value: "team", label: "Team Only" },
        ],
        placeholder: "Select",
    },
};

export const WithValue: Story = {
    args: {
        label: "Country",
        options: sampleOptions,
        value: "uk",
    },
};

export const Disabled: Story = {
    args: {
        label: "Country",
        description: "This field is currently disabled.",
        options: sampleOptions,
        value: "us",
        disabled: true,
    },
};

export const Interactive: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>("");

        return (
            <div className="w-80">
                <Select
                    label="Choose your country"
                    description="This selection will affect your regional settings."
                    options={sampleOptions}
                    value={selected}
                    onChange={setSelected}
                    placeholder="Select a country"
                />
                {selected && (
                    <p className="mt-4 text-sm text-contentSecondary">
                        Selected: <span className="font-semibold text-tealPrimary">{selected}</span>
                    </p>
                )}
            </div>
        );
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="space-y-6 w-80">
            <div>
                <h3 className="text-sm font-semibold mb-2 text-contentPrimary">Default</h3>
                <Select options={sampleOptions} placeholder="Select" />
            </div>
            <div>
                <h3 className="text-sm font-semibold mb-2 text-contentPrimary">With Label</h3>
                <Select label="Country" options={sampleOptions} placeholder="Select" />
            </div>
            <div>
                <h3 className="text-sm font-semibold mb-2 text-contentPrimary">
                    With Label & Description
                </h3>
                <Select
                    label="Project Type"
                    description="Select the type of project you're working on."
                    options={[
                        { value: "web", label: "Web Application" },
                        { value: "mobile", label: "Mobile App" },
                        { value: "desktop", label: "Desktop Software" },
                    ]}
                    placeholder="Select"
                />
            </div>
            <div>
                <h3 className="text-sm font-semibold mb-2 text-contentPrimary">Disabled</h3>
                <Select
                    label="Country"
                    options={sampleOptions}
                    value="us"
                    disabled
                />
            </div>
        </div>
    ),
};
