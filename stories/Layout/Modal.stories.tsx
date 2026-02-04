import type { Meta, StoryObj } from "@storybook/react";
import { ContentModal, ConfirmModal } from "@/components/layout/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import React, { useState } from "react";
import { within, userEvent, expect } from "@storybook/test";

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
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const openButton = canvas.getByText('Open Content Modal');
        await userEvent.click(openButton);

        // Modal is rendered in a portal, so we might need to look at document.body
        const modal = await within(document.body).findByRole('dialog');
        await expect(modal).toBeInTheDocument();
        await expect(within(modal).getByText('Modal Title')).toBeInTheDocument();

        const closeButton = within(modal).getByText('Cancel');
        await userEvent.click(closeButton);
        await expect(modal).not.toBeInTheDocument();
    },
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
/**
 * 컴포넌트 조합 예시 (Recipe)
 */
export const MultiStepFormRecipe: StoryObj<typeof ContentModal> = {
    name: "Recipe: Profile Setup",
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [step, setStep] = useState(1);
        return (
            <div className="p-20">
                <Button onClick={() => { setIsOpen(true); setStep(1); }}>Start Profile Setup</Button>
                <ContentModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={`Profile Setup - Step ${step} of 2`}
                    footer={
                        <div className="flex justify-between w-full">
                            <Button variant="plain" onClick={() => setIsOpen(false)}>Skip</Button>
                            <div className="flex gap-3">
                                {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
                                {step < 2 ? (
                                    <Button onClick={() => setStep(2)}>Next Step</Button>
                                ) : (
                                    <Button onClick={() => setIsOpen(false)}>Complete</Button>
                                )}
                            </div>
                        </div>
                    }
                >
                    <div className="space-y-6 py-4">
                        {step === 1 ? (
                            <>
                                <Input label="Full Name" placeholder="John Doe" />
                                <Input label="Email Address" placeholder="john@example.com" />
                            </>
                        ) : (
                            <>
                                <Select
                                    label="Role"
                                    options={[
                                        { value: 'admin', label: 'Administrator' },
                                        { value: 'editor', label: 'Editor' },
                                        { value: 'viewer', label: 'Viewer' }
                                    ]}
                                />
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-0.5">
                                        <label className="text-sm font-bold text-contentPrimary">Email Notifications</label>
                                        <p className="text-xs text-contentSecondary">Receive daily summaries</p>
                                    </div>
                                    <Switch checked={true} onChange={() => { }} />
                                </div>
                            </>
                        )}
                    </div>
                </ContentModal>
            </div>
        );
    }
};
