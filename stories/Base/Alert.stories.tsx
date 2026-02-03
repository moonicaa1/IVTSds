import type { Meta, StoryObj } from "@storybook/react";
import Alert from "@/components/ui/Alert";
import React from "react";

/**
 * # Alert
 * 100% Synced with components/ui/Alert.tsx
 * 
 * Alert component for displaying contextual feedback messages.
 * Supports 4 severity levels: info, success, warning, and error.
 */
const meta: Meta<typeof Alert> = {
    title: "Base Components/Alert",
    component: Alert,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        type: {
            control: "select",
            options: ["info", "success", "warning", "error"],
            description: "The type of alert",
        },
        title: {
            control: "text",
            description: "Optional title for the alert",
        },
        description: {
            control: "text",
            description: "Main message content",
        },
        onClose: {
            action: "closed",
            description: "Callback when close button is clicked",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
    args: {
        type: "info",
        title: "Information",
        description: "This is an informational message to keep you updated.",
    },
};

export const Success: Story = {
    args: {
        type: "success",
        title: "Success!",
        description: "Your changes have been saved successfully.",
    },
};

export const Warning: Story = {
    args: {
        type: "warning",
        title: "Warning",
        description: "Please review your input before proceeding.",
    },
};

export const Error: Story = {
    args: {
        type: "error",
        title: "Error",
        description: "An error occurred while processing your request.",
    },
};

export const WithCloseButton: Story = {
    args: {
        type: "info",
        title: "Dismissible Alert",
        description: "This alert can be closed by clicking the X button.",
        onClose: () => console.log("Alert closed"),
    },
};

export const WithoutTitle: Story = {
    args: {
        type: "success",
        description: "This alert has no title, only a description.",
    },
};

export const AllTypes: Story = {
    render: () => (
        <div className="space-y-4 w-full max-w-2xl">
            <Alert
                type="info"
                title="Information"
                description="This is an informational message."
            />
            <Alert
                type="success"
                title="Success"
                description="Operation completed successfully."
            />
            <Alert
                type="warning"
                title="Warning"
                description="Please proceed with caution."
            />
            <Alert
                type="error"
                title="Error"
                description="Something went wrong."
            />
        </div>
    ),
};
