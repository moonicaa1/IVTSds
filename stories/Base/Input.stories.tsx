import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/ui/Input";
import { within, userEvent, expect } from "@storybook/test";
import React from "react";
import { DoDontLayout, DoCard, DontCard } from "../DocComponents";

const meta: Meta<typeof Input> = {
    title: "Base Components/Input",
    component: Input,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
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
        label: "Label",
        placeholder: "Placeholder...",
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText('Placeholder...');
        await userEvent.type(input, 'Hello World');
        await expect(input).toHaveValue('Hello World');
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
        label: "Domain",
        placeholder: "example",
        helperText: "Enter your custom domain name without extension.",
    },
};

/**
 * 컴포넌트 조합 예시 (Recipe)
 */
export const LoginForm: Story = {
    name: "Recipe: Login Form",
    render: () => (
        <div className="w-80 space-y-4 rounded-2xl border border-borderPrimary bg-backgroundPrimary p-6 shadow-xl">
            <h3 className="text-lg font-bold text-contentPrimary">Sign In</h3>
            <Input label="Email" type="email" placeholder="name@company.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <button className="w-full rounded-lg bg-tealPrimary py-2.5 text-sm font-semibold text-white hover:bg-tealPrimary/90">
                Continue
            </button>
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
                    title="명확한 레이블과 플레이스홀더"
                    example={
                        <Input label="Email Address" placeholder="example@domain.com" />
                    }
                >
                    필드 상단에 명확한 레이블을 제공하고, 입력값의 예시를 플레이스홀더로 보여주어 사용자 입력을 돕습니다.
                </DoCard>

                <DontCard
                    title="레이블 생략 금지"
                    example={
                        <Input placeholder="Enter your email" />
                    }
                >
                    플레이스홀더가 레이블을 대신할 수 없습니다. 입력이 시작되면 플레이스홀더가 사라지기 때문에 레이블은 반드시 필요합니다.
                </DontCard>

                <DoCard
                    title="의미 있는 에러 메시지"
                    example={
                        <Input
                            label="Password"
                            type="password"
                            error="Password must be at least 8 characters long."
                        />
                    }
                >
                    입력값이 잘못된 경우, 무엇이 잘못되었는지와 어떻게 해결해야 하는지 구체적인 에러 메시지를 제공하세요.
                </DoCard>

                <DontCard
                    title="너무 많은 헬퍼 텍스트 지양"
                    example={
                        <Input
                            label="Username"
                            helperText="It must be unique, contain only numbers and letters, and be between 5-15 characters long. You cannot change this later once set."
                        />
                    }
                >
                    헬퍼 텍스트가 너무 길면 정보 과부하가 발생합니다. 필수적인 정보만 간결하게 설명하세요.
                </DontCard>
            </DoDontLayout>
        </div>
    ),
};
