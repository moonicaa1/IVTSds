import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/ui/Input";
import React from "react";

/**
 * # Input
 * 
 * Inputs are used to collect data from the user. 
 * They support labels, placeholder text, validation errors, and helper messages.
 * 
 * ## Usage Guidelines
 * - **Do**: Provide a clear label for every input field.
 * - **Do**: Use placeholder text as a hint, not as a replacement for labels.
 * - **Do**: Show specific error messages to help users recover from validation failures.
 * - **Don't**: Use input fields for long-form text (use Textarea instead).
 */
const meta: Meta<typeof Input> = {
    title: "Base Components/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
            description: "The text displayed above the input field.",
        },
        error: {
            control: "text",
            description: "An error message to display below the input.",
        },
        helperText: {
            control: "text",
            description: "Auxiliary text to guide the user.",
        },
        disabled: {
            control: "boolean",
            description: "Whether the input is interactive.",
        },
        required: {
            control: "boolean",
            description: "Adds a required marker (*) to the label.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Standard text input with a label.
 */
export const Default: Story = {
    args: {
        label: "Username",
        placeholder: "Enter your username",
    },
};

/**
 * Input field for passwords.
 */
export const Password: Story = {
    args: {
        label: "Password",
        type: "password",
        placeholder: "••••••••",
    },
};

/**
 * Demonstrates a validation error state.
 */
export const ErrorState: Story = {
    args: {
        label: "Email Address",
        defaultValue: "invalid-email",
        error: "Please enter a valid email address.",
    },
};

/**
 * Input with guidance text.
 */
export const WithHelperText: Story = {
    args: {
        label: "Phone Number",
        placeholder: "010-0000-0000",
        helperText: "Format: 000-0000-0000",
    },
};

/**
 * Required field indicator.
 */
export const Required: Story = {
    args: {
        label: "Full Name",
        placeholder: "John Doe",
        required: true,
    },
};

/**
 * Non-interactive state.
 */
export const Disabled: Story = {
    args: {
        label: "User ID",
        value: "UID-12345",
        disabled: true,
    },
};
