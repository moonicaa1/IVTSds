import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/ui/Input";
import React from "react";

/**
 * # Input
 * 100% Synced with components/ui/Input.tsx
 */
const meta: Meta<typeof Input> = {
    title: "Base Components/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
        },
        placeholder: {
            control: "text",
        },
        type: {
            control: "select",
            options: ["text", "password", "email", "number", "search", "tel", "url"],
        },
        error: {
            control: "text",
        },
        helperText: {
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        label: "Username",
        placeholder: "Enter your username",
    },
};

export const Password: Story = {
    args: {
        label: "Password",
        type: "password",
        placeholder: "••••••••",
    },
};

export const ErrorState: Story = {
    args: {
        label: "Email Address",
        defaultValue: "invalid-email",
        error: "Please enter a valid email address.",
    },
};

export const WithHelperText: Story = {
    args: {
        label: "Phone Number",
        placeholder: "010-0000-0000",
        helperText: "Format: 000-0000-0000",
    },
};

