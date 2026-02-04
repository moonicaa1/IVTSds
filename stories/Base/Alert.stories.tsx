import type { Meta, StoryObj } from "@storybook/react";
import Alert from "@/components/ui/Alert";
import React from "react";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

const meta: Meta<typeof Alert> = {
    title: "Base Components/Alert",
    component: Alert,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: '사용자 작업에 대한 상황별 피드백 메시지를 표시하는 알림 컴포넌트입니다.',
            },
        },
    },
    argTypes: {
        type: {
            control: "select",
            options: ["info", "success", "warning", "error"],
            description: "알림의 타입을 지정합니다.",
        },
        title: {
            control: "text",
            description: "알림의 제목입니다.",
        },
        description: {
            control: "text",
            description: "알림의 내용입니다.",
        },
        onClose: {
            description: "닫기 버튼 클릭 시 호출되는 함수입니다.",
        },
        icon: {
            description: "커스텀 아이콘을 지정합니다.",
        },
        className: {
            control: "text",
            description: "추가 CSS 클래스를 지정합니다.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
    args: {
        type: "info",
        title: "Information",
        description: "There is a new update available.",
    },
};

export const Success: Story = {
    args: {
        type: "success",
        title: "Success",
        description: "Your changes have been saved successfully.",
    },
};

export const Warning: Story = {
    args: {
        type: "warning",
        title: "Warning",
        description: "This action cannot be undone.",
    },
};

export const Error: Story = {
    args: {
        type: "error",
        title: "Error",
        description: "An error occurred. Please try again.",
    },
};

export const WithCloseButton: Story = {
    args: {
        type: "info",
        title: "Dismissible Alert",
        description: "This alert can be closed by clicking the X button.",
        onClose: () => alert("Alert closed"),
    },
};

export const WithoutTitle: Story = {
    args: {
        type: "success",
        description: "This alert only displays a description without a title.",
    },
};

export const AllTypes: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
            <Alert
                type="info"
                title="Information"
                description="This is an informational message to keep you updated."
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
                description="An error occurred while processing your request."
            />
        </div>
    ),
};

export const Guidelines: Story = {
    tags: ['!dev'],
    parameters: {
        controls: { disable: true },
        actions: { disable: true },
    },
    render: () => (
        <div className="sb-unstyled max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">Guidelines (Do's & Don'ts)</h2>

            <DoDontLayout>
                <DoCard
                    title="적절한 알림 타입 선택"
                    example={
                        <div className="flex flex-col gap-2">
                            <Alert type="success" description="Operation completed successfully." />
                            <Alert type="error" description="An error occurred." />
                        </div>
                    }
                >
                    각 알림의 심각도에 맞는 타입을 선택하세요. 성공은 success, 오류는 error를 사용하여 사용자에게 명확한 피드백을 제공합니다.
                </DoCard>

                <DontCard
                    title="과도한 알림 사용 지양"
                    example={
                        <div className="flex flex-col gap-2">
                            <Alert type="info" description="Page loaded." />
                            <Alert type="info" description="Data fetched." />
                            <Alert type="info" description="UI rendered." />
                        </div>
                    }
                >
                    모든 작업마다 알림을 표시하면 사용자가 피로감을 느낍니다. 중요한 이벤트에만 알림을 사용하세요.
                </DontCard>

                <DoCard
                    title="명확하고 간결한 메시지"
                    example={
                        <Alert
                            type="warning"
                            title="Unsaved Changes"
                            description="Your changes haven't been saved. Would you like to save them?"
                        />
                    }
                >
                    사용자가 빠르게 이해할 수 있도록 제목과 설명을 명확하고 간결하게 작성하세요.
                </DoCard>

                <DontCard
                    title="기술적인 에러 메시지 노출 지양"
                    example={
                        <Alert
                            type="error"
                            description="Error: ECONNREFUSED at TCP.onStreamRead (internal/stream_base_commons.js:209:20)"
                        />
                    }
                >
                    기술적인 에러 메시지는 사용자에게 혼란을 줍니다. 사용자 친화적인 메시지로 변환하여 표시하세요.
                </DontCard>
            </DoDontLayout>
        </div>
    ),
};
