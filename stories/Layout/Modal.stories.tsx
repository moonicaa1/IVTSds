import type { Meta, StoryObj } from "@storybook/react";
import { ContentModal, ConfirmModal } from "@/components/layout/Modal";
import Button from "@/components/ui/Button";
import React, { useState } from "react";

/**
 * # Modal
 * 100% Synced with components/layout/Modal.tsx
 */
const meta: Meta<typeof ContentModal> = {
    title: "Layout & Patterns/Modal",
    component: ContentModal,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;

export const DialogModal: StoryObj<typeof ContentModal> = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="p-20">
                <Button onClick={() => setIsOpen(true)}>Open Content Modal</Button>
                <ContentModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Modal Title"
                    footer={
                        <>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button variant="default" onClick={() => setIsOpen(false)}>Confirm</Button>
                        </>
                    }
                >
                    <div className="py-4">
                        <p className="text-sm text-contentSecondary">Modal content area.</p>
                    </div>
                </ContentModal>
            </div>
        );
    }
};

export const Confirmation: StoryObj<typeof ConfirmModal> = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="p-20">
                <Button variant="outline" onClick={() => setIsOpen(true)}>Open Confirm Modal</Button>
                <ConfirmModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onConfirm={() => setIsOpen(false)}
                    title="Delete Item?"
                    description="This action cannot be undone."
                    confirmText="Delete"
                    variant="destructive"
                />
            </div>
        );
    }
};

