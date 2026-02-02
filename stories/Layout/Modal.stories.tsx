import type { Meta, StoryObj } from "@storybook/react";
import { ContentModal, ConfirmModal } from "@/components/layout/Modal";
import Button from "@/components/ui/Button";
import React, { useState } from "react";

/**
 * # Modal
 * 
 * Modals are overlays that interrupt the user's current task to capture attention or request information. 
 * We provide two main types: `ContentModal` for complex forms and `ConfirmModal` for simple alerts or confirmations.
 * 
 * ## Usage Guidelines
 * - **Do**: Use `ConfirmModal` for destructive actions with a "destructive" variant.
 * - **Do**: Use meaningful titles and concise descriptions.
 * - **Don't**: Use modals for information that could be displayed inline.
 * - **Don't**: Nest modals on top of each other.
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

/**
 * Standard content modal used for forms or detailed views.
 */
export const DialogModal: StoryObj<typeof ContentModal> = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Content Modal</Button>
                <ContentModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Create New Dealer"
                    footer={
                        <>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button variant="default" onClick={() => setIsOpen(false)}>Create</Button>
                        </>
                    }
                >
                    <div className="space-y-4 py-2">
                        <p className="text-sm text-contentSecondary">Please fill out the details below to add a new dealership to the system.</p>
                        <div className="h-32 bg-backgroundSecondary rounded border border-dashed border-borderPrimary flex items-center justify-center text-contentTertiary">
                            [Form Fields Placeholder]
                        </div>
                    </div>
                </ContentModal>
            </>
        );
    }
};

/**
 * Simple confirmation modal for critical actions.
 */
export const Confirmation: StoryObj<typeof ConfirmModal> = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button variant="outline" onClick={() => setIsOpen(true)}>Delete Item</Button>
                <ConfirmModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onConfirm={() => setIsOpen(false)}
                    title="Delete Dealer?"
                    description="Are you sure you want to delete this dealer? This action cannot be undone and will remove all associated data."
                    confirmText="Delete"
                    variant="destructive"
                />
            </>
        );
    }
};
